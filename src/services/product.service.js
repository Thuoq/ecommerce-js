import { clothingModel, furnitureModel, productModel } from '../models/index.js'
import { BadRequestError, PRODUCT_TYPE } from '../core/index.js'
import { electronicModel } from '../models/electronic.model.js'
import ProductRepo from '../models/repositories/product.repo.js'
import InventoryRepo from '../models/repositories/inventory.repo.js'

export default class ProductFactoryService {

  //  key- class
  static productRegistry = {}

  static registerProductType(type, classRef) {
    ProductFactoryService.productRegistry[type] = classRef
  }

  /**
   * Type:
   *
   * */
  static async createProduct(type, payload) {
    const productClass = ProductFactoryService.productRegistry[type]
    if (!productClass) throw new BadRequestError(`Invalid product types ${type}`)
    return new productClass(payload).createProduct()
  }

  static findAllDrafts4Shop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true }
    return ProductRepo.findAllDrafts4Shop({ query, limit, skip })
  }

  static findAllPublish4Shop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublish: true }
    return ProductRepo.findAllPublish4Shop({ query, limit, skip })
  }

  static async publishProductByShop({ product_id, product_shop }) {
    const publishShopUpdated = await ProductRepo.publishProductByShop({
      product_id,
      product_shop
    })

    if (!publishShopUpdated) throw new BadRequestError('Do not updated')
    return publishShopUpdated
  }

  static async unPublishProductByShop({ product_id, product_shop }) {
    const publishShopUpdated = await ProductRepo.unPublishProductByShop({
      product_id,
      product_shop
    })

    if (!publishShopUpdated) throw new BadRequestError('Do not updated')
    return publishShopUpdated
  }

  static getListSearchProductByUser({ keySearch }) {
    return ProductRepo.searchProductByUser({ keySearch })
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


  async createProduct(model) {
    const newProductDetails = await model.create({
      product_shop: this.product_shop,
      ...this.product_attributes
    })

    if (!newProductDetails) throw new BadRequestError(`Create error with product type is ${this.product_type}`)

    const newProduct = await productModel.create({
      ...this,
      _id: newProductDetails._id
    })

    if (!newProduct) throw new BadRequestError('Create new Product')

    await InventoryRepo.insertInventory({
      shopId: this.product_shop,
      productId: newProduct._id,
      stock: this.product_quantity
    })
    return newProduct
  }
}


class Clothing extends Product {
  async createProduct() {
    return super.createProduct(clothingModel)
  }
}

class Electronic extends Product {
  async createProduct() {
    return super.createProduct(electronicModel)
  }
}

class Furniture extends Product {
  async createProduct() {
    return super.createProduct(furnitureModel)
  }
}

ProductFactoryService.registerProductType(PRODUCT_TYPE.ELECTRONICS, Electronic)
ProductFactoryService.registerProductType(PRODUCT_TYPE.CLOTHING, Clothing)
ProductFactoryService.registerProductType(PRODUCT_TYPE.FURNITURE, Furniture)