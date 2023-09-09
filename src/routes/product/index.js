import express from 'express'
import { asyncHandler } from '../../core/index.js'
import productController from '../../controllers/product.controller.js'
import { authentication } from '../../auth/authUtils.js'

const router = express.Router()

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))
router.use(authentication)
router.post('/', asyncHandler(productController.createProduct))
router.get('/drafts/all', asyncHandler(productController.getAllDraft4Shop))
router.get('/published/all', asyncHandler(productController.getAllPublish4Shop))

// PUT
router.put('/publish/:id', asyncHandler(productController.publishProductByShop))
router.put('/un-publish/:id', asyncHandler(productController.unPublishProductByShop))
export default router     