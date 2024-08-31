import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))
