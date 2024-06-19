import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

async function boostrap() {
  try {
    await mongoose.connect(config.db_uri as string)
    logger.info(`🛢️ DB connected successfully!!`)

    app.listen(config.port, () => {
      logger.info(`Server is running on http://localhost:${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database', err)
  }
}

boostrap()
