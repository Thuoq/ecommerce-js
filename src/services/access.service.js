import { shopModel } from '../models/index.js'
import * as bcrypt from 'bcrypt'
import { ROLE_SHOP, SALT_PASSWORD } from '../constants/index.js'
import crypto from 'crypto'
import KeyTokenService from './keyToken.service.js'
import { createTokenPair } from '../auth/authUtils.js'
import { getInfoData } from '../utils/index.js'
import { BadRequestError } from '../core/index.js'
class AccessService {
  static async signUp({ name, email, password }) {
    // Step 1: check email exits ?
    const holderShop = await shopModel
      .findOne({
        email
      })
      .lean()

    if (holderShop) {
      throw new BadRequestError('Error: Shop already register')
    }

    const passwordHash = await bcrypt.hash(password, SALT_PASSWORD)

    const newShop = await shopModel.create({
      name,
      password: passwordHash,
      email,
      roles: [ROLE_SHOP.SHOP]
    })
    if (newShop) {
      // created privateKey, publicKey
      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')
      // save collection keyStore

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey
      })

      if (!keyStore) {
        throw new BadRequestError('Public key string error')
      }

      // create token pair
      const tokens = await createTokenPair(
        {
          userId: newShop._id,
          email: newShop.email
        },
        { privateKey, publicKey }
      )
      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ['_id', 'name', 'email'],
            object: newShop
          }),
          tokens
        }
      }
    }
    return {
      code: 200,
      metadata: null
    }
  }
}

export default AccessService
