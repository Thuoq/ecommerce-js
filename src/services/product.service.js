import { clothingModel, productModel } from '../models/index.js'
import { BadRequestError, PRODUCT_TYPE } from '../core/index.js'
import { electronicModel } from '../models/electronic.model.js'

export default class ProductFactoryService {

  /**
   * Type:
   *
   * */
  static async createProduct(type, payload) {
    switch (type) {

      case PRODUCT_TYPE.CLOTHING:
        return new Clothing(payload).createProduct()
      case PRODUCT_TYPE.ELECTRONICS:
        return new Electronic(payload).createProduct()
      default:
        throw new BadRequestError(`Invalid product types ${type}`)
    }
  }
}

// product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
class Product {
  constructor({
                product_name,
                product_thumb,
                product_description,
                product_price,
                product_quantity,
                product_type,
                product_shop,
                product_attributes
              }) {
    this.product_name = product_name
    this.product_thumb = product_thumb
    this.product_description = product_description
    this.product_price = product_price
    this.product_quantity = product_quantity
    this.product_type = product_type
    this.product_shop = product_shop
    this.product_attributes = product_attributes
  }

  createProduct(productId) {
    return productModel.create({
      ...this,
      _id: productId
    })
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothingModel.create({
      product_shop: this.product_shop,
      ...this.product_attributes
    })
    if (!newClothing) throw new BadRequestError('Create new clothing')


    const newProduct = await super.createProduct(newClothing._id)

    if (!newProduct) throw new BadRequestError('Create new Product')
    return newProduct
  }
}


class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronicModel.create({
      product_shop: this.product_shop,
      ...this.product_attributes
    })
    if (!newElectronic) throw new BadRequestError('Create new clothing')


    const newProduct = await super.createProduct(newElectronic._id)

    if (!newProduct) throw new BadRequestError('Create new Product')
    return newProduct
  }
}