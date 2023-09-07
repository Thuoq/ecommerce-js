import { keyTokenModel } from '../models/index.js'
import crypto from 'crypto'
import { createTokenPair } from '../auth/authUtils.js'
import { BadRequestError } from '../core/index.js'
import { Schema } from 'mongoose'

export default class KeyTokenService {
  static async createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    const filter = {
      user: userId
    }
    const update = {
      publicKey,
      privateKey,
      refreshToken,
      refreshTokensUsed: []
    }
    const options = {
      upsert: true,
      new: true
    }
    const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

    return tokens ? tokens.publicKey : null
  }

  static async generateTokens(payload) {
    // created privateKey, publicKey
    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    const tokens = await createTokenPair(
      { email: payload.email, userId: payload._id },
      { privateKey, publicKey }
    )
    const keyStore = await this.createKeyToken({
      userId: payload._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken
    })

    if (!keyStore) {
      throw new BadRequestError('Public key string error')
    }
    return tokens
  }

  static findByUserId(userId) {
    return keyTokenModel
      .findOne({ user: userId })
      .populate('user', 'name _id')
      .lean()
  }
  static removeById(id) {
    return keyTokenModel.findByIdAndRemove(id)
  }
  static removeByUserId(userId) {
    return keyTokenModel.findOneAndDelete({ user: userId })
  }

  static updateRefreshTokenByUserId(userId, newTokens, oldRefreshToken) {
    return keyTokenModel.findOneAndUpdate(
      {
        user: userId
      },
      {
        $set: {
          refreshToken: newTokens.refreshToken
        },
        $addToSet: {
          refreshTokensUsed: oldRefreshToken
        }
      }
    )
  }
}
