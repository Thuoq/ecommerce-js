import { apiKeyModel } from '../models/index.js'

export default class ApiKeyService {
  static async findApiKeyById(key) {
    const apiKey = await apiKeyModel.findOne({ status: true, key }).lean()
    return apiKey
  }
}
