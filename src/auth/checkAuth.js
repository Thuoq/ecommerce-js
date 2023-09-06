import { HEADER } from '../core/index.js'
import { ApiKeyService } from '../services/apiKey.service.js'

export const checkApiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }
    const objKey = await ApiKeyService.findApiKeyById(key)

    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }

    req.objKey = objKey
    return next()
  } catch (e) {
    next(e)
  }
}
export const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey?.permissions) {
      return res.status(403).json({
        message: 'Permission denied'
      })
    }
    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission) {
      return res.status(403).json({
        message: 'Permission denied'
      })
    }
    return next()
  }
}
