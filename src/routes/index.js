import express from 'express'
import accessRouter from './access/index.js'
import { checkApiKey, checkPermission } from '../auth/checkAuth.js'
const router = express.Router()
// check apiKey

router.use('/v1/api', accessRouter)
// check permission
router.use(checkPermission('0000'))
router.use(checkApiKey)
export default router
