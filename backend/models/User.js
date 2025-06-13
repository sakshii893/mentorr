import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  sessions: [
    {
      token: String,
      createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d'
      }
    }
  ]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
