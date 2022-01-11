import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser:true 
})

export default mongoose