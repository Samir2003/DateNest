import express from 'express'
import router from './routes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: './sample.env' })
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser:true 
})
const app = express()
const port = process.env.PORT || 3002

app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log("Server connected on port " + port)
})
