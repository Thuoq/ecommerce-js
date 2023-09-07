import { shopModel } from '../models/index.js'
import * as bcrypt from 'bcrypt'
import { ROLE_SHOP, SALT_PASSWORD } from '../constants/index.js'
import KeyTokenService from './keyToken.service.js'
import { getInfoData } from '../utils/index.js'
import { AuthFailureError, BadRequestError } from '../core/index.js'
import ShopService from './shop.service.js'
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

  static async logOut({ keyStore }) {
    const delKey = await KeyTokenService.removeById(keyStore._id)
    console.log(delKey)
    return delKey
  }
}

export default AccessService
