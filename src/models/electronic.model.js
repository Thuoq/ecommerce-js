import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Electronic'
const COLLECTION_NAME = 'Electronics'

const electronicSchema = new Schema({
  manufacturer: { type: String, required: true },
  model: String,
  color: String,
  product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }

}, {
  timestamps: true,
  collection: COLLECTION_NAME
})


export const electronicModel = model(DOCUMENT_NAME, electronicSchema)