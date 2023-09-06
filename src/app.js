import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import indexRouter from './routes/index.js'
import bodyParser from 'body-parser'
// INIT MIDDLEWARE
export const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// INIT DB
import './dbs/init.mongo-db.js'

app.use(indexRouter)
// INIT ROUTER

// HANDLING ROUTER
