import { shopModel } from '../models/index.js'
import * as bcrypt from 'bcrypt'
import { ROLE_SHOP, SALT_PASSWORD } from '../constants/index.js'
import * as crypto from 'crypto'
import KeyTokenService from './keyToken.service.js'
import { createTokenPair } from '../auth/authUtils.js'
import { getInfoData } from '../utils/index.js'

class AccessService {
  static async signUp({ name, email, password }) {
    try {
      // Step 1: check email exits ?
      const holderShop = await shopModel
        .findOne({
          email
        })
        .lean()

      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already exits'
        }
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
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
          }
        })
        // save collection keyStore

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey
        })

        if (!publicKeyString) {
          return {
            code: 'xxxx',
            message: 'public Key String errror'
          }
        }
        const publicKeyObject = crypto.createPublicKey(publicKeyString)

        // create token pair
        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email: newShop.email
          },
          { privateKey, publicKey: publicKeyObject }
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
        // const tokens = a
      }
      return {
        code: 200,
        metadata: null
      }
    } catch (error) {
      console.log(error)
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
}

export default AccessService
