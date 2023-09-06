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

// INIT ROUTER
app.use(indexRouter)

// HANDLING ERROR WHEN NOT FOUND ROUTE
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// CATCH ERROR GLOBAL
app.use((error, req, res, next) => {
  const status = error.status || 500
  return res.status(status).json({
    status: 'error',
    code: status,
    message: error.message || 'Internal server'
  })
})
