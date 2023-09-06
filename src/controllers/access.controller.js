import AccessService from '../services/access.service.js'
import { CREATED } from '../core/index.js'

class AccessController {
  async signUp(req, res) {
    new CREATED({
      message: 'Dang ky thanh cong',
      metadata: await AccessService.signUp(req.body)
    }).send(res)
  }
}

export default new AccessController()
