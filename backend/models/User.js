import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  sessions: [
    {
      token: String,
      createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d', // this auto-deletes after 7 days (optional)
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);
export default User;
