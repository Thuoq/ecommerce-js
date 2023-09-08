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


}

export default new ProductController()