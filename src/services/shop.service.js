import { shopModel } from '../models/index.js'

export default class ShopService {
  static findByEmail({
    email,
    select = { email: 1, password: 1, name: 1, status: 1, roles: 1 }
  }) {
    return shopModel.findOne({ email }).select(select).lean()
  }
}
