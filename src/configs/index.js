const production = {
  app: {
    port: process.env.PROD_APP_PORT || 3000
  },
  mongoDb: {
    host: process.env.PROD_DB_HOST || 'localhost',
    port: process.env.PROD_DB_PORT || 27017,
    databaseName: process.env.PROD_DB_DATABASE_NAME || 'ecommerce_prod',
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD
  }
}

const development = {
  app: {
    port: process.env.DEV_APP_PORT || 3000
  },
  mongoDb: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    databaseName: process.env.DEV_DB_DATABASE_NAME || 'ecommerce_dev'
    // user: process.env.DEV_DB_USER,
    // password: process.env.DEV_DB_PASSWORD
  }
}

const config = { development, production }
export default config[process.env.NODE_ENV || 'development']
