import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'Inventory'
const COLLECTION_NAME = 'Inventories'


const inventorySchema = new Schema({
  inven_productId: { type: Schema.Types.ObjectId, ref: 'product' },
  inven_location: { type: String, default: null },
  inven_stock: { type: Number, default: true },
  inven_shopId: { type: Schema.Types.ObjectId, ref: 'Shop' },
  inven_reservations: { type: Array, default: [] }
}, {
  collection: COLLECTION_NAME,
  timestamps: true
})
export const inventoryModel = model(DOCUMENT_NAME, inventorySchema)


