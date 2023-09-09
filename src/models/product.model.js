import { model, Schema } from 'mongoose'
import { PRODUCT_TYPE } from '../core/index.js'
import slugify from 'slugify'

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
  product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  product_slug: String,
  product_ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Must be gt 1'],
    max: [5, 'Must be lt 5'],
    set: (val) => Math.round(val * 10) / 10
  },
  product_variations: {
    type: Array,
    default: []
  },
  isDraft: { type: Boolean, default: true, index: true, select: false },
  isPublish: { type: Boolean, default: false, index: true, select: false }
}, {
  collection: COLLECTION_NAME,
  timestamps: true
})

// Document middleware: run before .save() and .create()
productSchema.pre('save', function(next) {
  this.product_slug = slugify(this.product_name, {
    lower: true
  })
  next()
})
productSchema.index({
  product_description: 'text',
  product_name: 'text'
})
export const productModel = model(DOCUMENT_NAME, productSchema)


