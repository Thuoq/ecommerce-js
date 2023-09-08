import { model, Schema } from "mongoose";
const DOCUMENT_NAME = 'Clothing'
const COLLECTION_NAME = 'Clothes'

const clothingSchema = new Schema({
  branch: {type: String, required: true},
  size: String,
  material: String
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})


export const clothingModel = model(DOCUMENT_NAME, clothingSchema)