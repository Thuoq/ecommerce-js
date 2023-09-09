import { SuccessResponse } from '../core/index.js'
import ProductFactoryService from '../services/product.service.js'

class ProductController {

  async createProduct(req, res) {
    const { user } = req
    new SuccessResponse({
      message: 'Create product successfully',
      metadata: await ProductFactoryService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: user._id
      })
    }).send(res)
  }

  async getAllDraft4Shop(req, res) {
    const { user } = req
    new SuccessResponse({
      message: 'Get products draft success fully',
      metadata: await ProductFactoryService.findAllDrafts4Shop({ ...req.query, product_shop: user._id })
    }).send(res)
  }

  async getAllPublish4Shop(req, res) {
    const { user } = req
    new SuccessResponse({
      message: 'Get products draft success fully',
      metadata: await ProductFactoryService.findAllPublish4Shop({ ...req.query, product_shop: user._id })
    }).send(res)
  }

  async publishProductByShop(req, res) {
    const product_id = req.params.id
    const product_shop = req.user._id
    new SuccessResponse({
      metadata: await ProductFactoryService.publishProductByShop({
        product_shop,
        product_id
      })
    }).send(res)
  }

  async unPublishProductByShop(req, res) {
    const product_id = req.params.id
    const product_shop = req.user._id
    new SuccessResponse({
      metadata: await ProductFactoryService.unPublishProductByShop({
        product_shop,
        product_id
      })
    }).send(res)
  }

  async getListSearchProduct(req, res) {
    new SuccessResponse({
      message: 'Search product successfully',
      metadata: await ProductFactoryService.getListSearchProductByUser({ keySearch: req.params.keySearch })
    }).send(res)

  }
}

export default new ProductController()