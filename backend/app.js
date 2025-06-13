import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js'

dotenv.config();
const app = express();



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin',adminRoutes)

mongoose.connect("mongodb://localhost:27017/mern-auth")
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.log(err));
