import 'dotenv/config'
import { app } from './src/app.js'
import config from './src/configs/index.js'
const server = app.listen(config.app.port, () => {
  console.log('SERVER is running on port::', config.app.port)
})

process.on('SIGINT', () => {
  server.close(() => console.log('EXIT'))
})
