import AccessService from '../services/access.service.js'

class AccessController {
  async signUp(req, res) {
    const resx = await AccessService.signUp(req.body)
    return res.status(201).json(resx)
  }
}

export default new AccessController()
