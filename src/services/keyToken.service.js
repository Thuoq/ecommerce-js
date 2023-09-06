import { keyTokenModel } from '../models/keytoken.model.js'

export default class KeyTokenService {
  static async createKeyToken({ userId, publicKey }) {
    try {
      const publicKeyString = publicKey.toString()
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString
      })
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}
