import { productModel } from '../product.model.js'

export default class ProductRepo {
  static findAllDrafts4Shop({
                              query,
                              limit,
                              skip
                            }) {
    return ProductRepo.queryProduct({
      query,
      limit,
      skip
    })
  }

  static async publishProductByShop({ product_shop, product_id }) {
    const foundShop = await productModel.findOne({ _id: product_id, product_shop })

    if (!foundShop) return null


    return foundShop.findOneAndUpdate({ _id: product_id }, {
      isDraft: false,
      isPublish: true
    }, {
      new: true
    })
  }

  static async unPublishProductByShop({ product_shop, product_id }) {
    const foundShop = await productModel.findOne({ _id: product_id, product_shop })

    if (!foundShop) return null


    return foundShop.findOneAndUpdate({ _id: product_id }, {
      isDraft: true,
      isPublish: false
    }, {
      new: true
    })
  }

  static findAllPublish4Shop({
                               query,
                               limit,
                               skip
                             }) {
    return ProductRepo.queryProduct({
      query,
      limit,
      skip
    })
  }

  static queryProduct({
                        query,
                        limit,
                        skip
                      }) {
    return productModel
      .find(query).populate('product_shop', 'name email')
      .sort({ updateAt: -1 })
      .skip(skip)
      .limit(limit).lean()
  }

  static searchProductByUser({ keySearch }) {
    const regexSearch = new RegExp(keySearch)
    // TODO: check text production_description
    return productModel.find({
      isPublish: true,
      $text: { $search: regexSearch }
    }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .lean()

  }
}
