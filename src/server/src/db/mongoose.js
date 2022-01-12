import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '../sample.env' })
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser:true 
})

export default mongoose