import mongoose from 'mongoose'
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser:true 
})

export default mongoose