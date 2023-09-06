import express from 'express'
import accessController from '../../controllers/access.controller.js'
import { asyncHandler } from '../../core/index.js'

const router = express.Router()

router.post('/shop/sign-up', asyncHandler(accessController.signUp))

export default router
