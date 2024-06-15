import mongoose from 'mongoose'
import config from './config'
import app from './app'

async function boostrap() {
  try {
    await mongoose.connect(config.db_uri as string)
    console.log(`🛢️ DB connected successfully!!`)

    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`)
    })
  } catch (err) {
    // console.log(err)
    console.log('Failed to connect database', err)
  }
}

boostrap()
