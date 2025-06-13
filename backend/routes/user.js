import express from 'express';
import { protect, isAdmin } from '../middlewares/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  console.log(user);
  
  res.json(user);
});

router.get('/all', protect, isAdmin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit).select('-password');
  const total = await User.countDocuments();

  res.json({ users, total });
});

export default router;
