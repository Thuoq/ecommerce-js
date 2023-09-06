'use strict'
import mongoose from 'mongoose'
import { IS_DEVELOPMENT_ENV } from '../constants/index.js'
import config from '../configs/index.js'
const { mongoDb } = config

const MONGO_URI = `mongodb://${mongoDb.host}:${mongoDb.port}/${mongoDb.databaseName}`
class Database {
  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {
    if (IS_DEVELOPMENT_ENV) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true
      })
      .then((_) => {
        console.log('Connect successfully')
      })
      .catch((error) => console.log('ERROR Connect Database', error))
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}
export const instanceMongodb = Database.getInstance()
