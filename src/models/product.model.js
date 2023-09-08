import { model, Schema } from 'mongoose'
import { PRODUCT_TYPE } from '../core/index.js'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'


const productSchema = new Schema({
  product_name: { type: String, required: true },
  product_thumb: { type: String, required: true },
  product_description: { type: String },
  product_price: { type: Number, required: true },
  product_quantity: { type: Number, required: true },
  product_type: { type: String, required: true, enum: Object.values(PRODUCT_TYPE) },
  product_attributes: { type: Schema.Types.Mixed, required: true },
  product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
}, {
  collection: COLLECTION_NAME,
  timestamps: true
})

// defined the product type = clothing

export const productModel = model(DOCUMENT_NAME, productSchema)


