export const IS_PRODUCTION_ENV = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT_ENV = process.env.NODE_ENV === 'development'
export const SALT_PASSWORD = 11
export const ROLE_SHOP = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}
export const DISCOUNT_TYPE = {
  FIXED_AMOUNT: 'FIXED_AMOUNT',
  PERCENTAGE: 'PERCENTAGE'
}