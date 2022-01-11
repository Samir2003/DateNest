import mongoose from 'mongoose';
import ExDate from './date.js';

const userSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Mixed,
    required: true, 
    trim: true
  },
  dates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExDate' }]
});

const User = mongoose.model('User', userSchema);

export default User;
