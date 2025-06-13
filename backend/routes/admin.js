// Assuming you're inside routes/userRoutes.js or routes/authRoutes.js
import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      console.log('User not found in admin check:', req.user.id);
      return res.status(404).json({ 
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    if (user.role !== 'admin') {
      console.log('Non-admin user attempted admin access:', req.user.id);
      return res.status(403).json({ 
        message: 'Access denied. Admin only.',
        code: 'ADMIN_REQUIRED'
      });
    }

    console.log('Admin access granted:', req.user.id);
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ 
      message: 'Server error during admin check',
      code: 'SERVER_ERROR'
    });
  }
};

// Get admin profile
router.get('/profile', auth, isAdmin, async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select('-password');
    
    if (!admin) {
      console.log('Admin profile not found:', req.user.id);
      return res.status(404).json({ 
        message: 'Admin profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    console.log('Admin profile retrieved:', req.user.id);
    res.json(admin);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ 
      message: 'Server error while fetching admin profile',
      code: 'SERVER_ERROR'
    });
  }
});

// Get all users
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    console.log('Users list retrieved by admin:', req.user.id);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users list:', error);
    res.status(500).json({ 
      message: 'Server error while fetching users list',
      code: 'SERVER_ERROR'
    });
  }
});

// Delete user
router.delete('/users/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      console.log('User to delete not found:', req.params.id);
      return res.status(404).json({ 
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      console.log('Admin attempted to delete own account:', req.user.id);
      return res.status(400).json({ 
        message: 'Cannot delete your own account',
        code: 'SELF_DELETE_ATTEMPT'
      });
    }

    await user.deleteOne();
    console.log('User deleted by admin:', req.params.id);
    res.json({ 
      message: 'User deleted successfully',
      code: 'USER_DELETED'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      message: 'Server error while deleting user',
      code: 'SERVER_ERROR'
    });
  }
});

// Update user role
router.patch('/users/:id/role', auth, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      console.log('Invalid role update attempt:', role);
      return res.status(400).json({ 
        message: 'Invalid role',
        code: 'INVALID_ROLE'
      });
    }

    const user = await User.findById(req.params.id);
    
    if (!user) {
      console.log('User to update not found:', req.params.id);
      return res.status(404).json({ 
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Prevent admin from changing their own role
    if (user._id.toString() === req.user.id) {
      console.log('Admin attempted to change own role:', req.user.id);
      return res.status(400).json({ 
        message: 'Cannot change your own role',
        code: 'SELF_ROLE_CHANGE_ATTEMPT'
      });
    }

    user.role = role;
    await user.save();
    console.log('User role updated by admin:', req.params.id, 'to', role);
    
    res.json({ 
      message: 'User role updated successfully',
      code: 'ROLE_UPDATED'
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ 
      message: 'Server error while updating user role',
      code: 'SERVER_ERROR'
    });
  }
});

export default router;
