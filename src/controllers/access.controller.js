import AccessService from '../services/access.service.js'
import { CREATED, SuccessResponse } from '../core/index.js'

class AccessController {
  //  TODO: VALIDATION BODY
  async signUp(req, res) {
    new CREATED({
      message: 'Dang ky thanh cong',
      metadata: await AccessService.signUp(req.body)
    }).send(res)
  }
  async logIn(req, res) {
    new SuccessResponse({
      message: 'Login successfully',
      metadata: await AccessService.login(req.body)
    }).send(res)
  }
  async logOut(req, res) {
    new SuccessResponse({
      message: 'Logout successfully',
      metadata: await AccessService.logOut(req)
    }).send(res)
  }
}

export default new AccessController()
