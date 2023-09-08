import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Clothing'
const COLLECTION_NAME = 'Clothes'

const clothingSchema = new Schema({
  branch: { type: String, required: true },
  size: String,
  material: String,
  product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }

}, {
  timestamps: true,
  collection: COLLECTION_NAME
})


export const clothingModel = model(DOCUMENT_NAME, clothingSchema)