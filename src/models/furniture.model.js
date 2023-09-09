import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Furniture'
const COLLECTION_NAME = 'Furniture'

const furnitureSchema = new Schema({
  branch: { type: String, required: true },
  size: String,
  material: String,
  product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }

}, {
  timestamps: true,
  collection: COLLECTION_NAME
})


export const furnitureModel = model(DOCUMENT_NAME, furnitureSchema)