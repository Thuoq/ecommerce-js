import { inventoryModel } from '../inventory.model.js'

export default class InventoryRepo {
  static insertInventory({
                           productId,
                           shopId,
                           stock
                         }) {
    return inventoryModel.create({
      inven_productId: productId,
      inven_stock: stock,
      inven_shopId: shopId
    })
  }
}