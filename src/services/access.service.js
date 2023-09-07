import { shopModel } from '../models/index.js'
import * as bcrypt from 'bcrypt'
import { ROLE_SHOP, SALT_PASSWORD } from '../constants/index.js'
import KeyTokenService from './keyToken.service.js'
import { getInfoData } from '../utils/index.js'
import {
  AuthFailureError,
  BadRequestError,
  ForbiddenError
} from '../core/index.js'
import ShopService from './shop.service.js'
import { createTokenPair } from '../auth/authUtils.js'
class AccessService {
  /**
   *  1 - Check mail in dbs
   *  2 - match password
   *  3 - create AT vs RT and save
   *  4 - generate tokens
   *  5 - get data return login
   * */
  static async login({ email, password, refreshToken = null }) {
    const foundShop = await ShopService.findByEmail({ email })

    if (!foundShop) throw new BadRequestError('ERROR: Wrong email or password')

    const match = await bcrypt.compare(password, foundShop.password)

    if (!match) throw new AuthFailureError('auth failure')

    const tokens = await KeyTokenService.generateTokens(foundShop)

    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email'],
        object: foundShop
      }),
      tokens
    }
  }
  static async signUp({ name, email, password }) {
    // Step 1: check email exits ?
    const holderShop = await shopModel
      .findOne({
        email
      })
      .lean()

    if (holderShop) throw new BadRequestError('Error: Shop already register')

    const passwordHash = await bcrypt.hash(password, SALT_PASSWORD)

    const newShop = await shopModel.create({
      name,
      password: passwordHash,
      email,
      roles: [ROLE_SHOP.SHOP]
    })

    if (newShop) {
      const tokens = await KeyTokenService.generateTokens(newShop)

      return {
        shop: getInfoData({
          fields: ['_id', 'name', 'email'],
          object: newShop
        }),
        tokens
      }
    }
    return null
  }

  static logOut({ keyStore }) {
    return KeyTokenService.removeById(keyStore._id)
  }

  /** Refresh Token and check token had used
   * 1 check refresh token had used
   *
   * */
  static async handleRefreshToken({ keyStore, user, refreshToken }) {
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.removeByUserId(user._id)
      throw new ForbiddenError('Something happen !! please login again')
    }
    const tokens = await createTokenPair(
      { email: user.email, userId: user._id },
      { privateKey: keyStore.privateKey, publicKey: keyStore.publicKey }
    )

    await KeyTokenService.updateRefreshTokenByUserId(
      user._id,
      tokens,
      refreshToken
    )

    return tokens
  }
}

export default AccessService
