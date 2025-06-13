import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validSession = user.sessions.find(session => session.token === token);
    if (!validSession) return res.status(401).json({ message: 'Session expired' });

    req.user = user; // ✅ assign full user

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};
