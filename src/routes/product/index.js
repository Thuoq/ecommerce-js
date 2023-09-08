import express from 'express'
import { asyncHandler } from '../../core/index.js'
import productController from '../../controllers/product.controller.js'
import { authentication } from '../../auth/authUtils.js'

const router = express.Router()

router.use(authentication)
router.post('/', asyncHandler(productController.createProduct))

export default router