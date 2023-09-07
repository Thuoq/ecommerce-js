import express from 'express'
import accessController from '../../controllers/access.controller.js'
import { asyncHandler } from '../../core/index.js'
import { authentication } from '../../auth/authUtils.js'

const router = express.Router()

router.post('/shop/sign-up', asyncHandler(accessController.signUp))

router.post('/shop/login', asyncHandler(accessController.logIn))

router.use(authentication)

router.post('/shop/log-out', asyncHandler(accessController.logOut))
export default router
