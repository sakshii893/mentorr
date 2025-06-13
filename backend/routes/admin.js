// Assuming you're inside routes/userRoutes.js or routes/authRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middlewares/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Admin-only route
router.get('/dashboard', protect, isAdmin, async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select('-password');
    const totalUsers = await User.countDocuments();

    res.json({
      admin: {
        name: admin.name,
        email: admin.email,
      },
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
