import { keyTokenModel } from '../models/keytoken.model.js'

export default class KeyTokenService {
  static async createKeyToken({ userId, publicKey, privateKey }) {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey
      })
      return tokens
    } catch (error) {
      return error
    }
  }
}
