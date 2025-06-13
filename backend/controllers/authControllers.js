import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

const MAX_SESSIONS = 3;

export const register = async (req, res) => {
   const { username, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed, role: role || 'user'  });
  res.status(201).json({ message: 'Registered successfully' });
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Step 1: Check active sessions
    const activeSessions = user.sessions || [];
    console.log(activeSessions);
    

    // Clean up expired ones (if needed manually)
    const validSessions = activeSessions.filter(
      (session) => new Date(session.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000 > Date.now()
    );

    // Step 2: If sessions >= MAX, block login
    if (validSessions.length >= MAX_SESSIONS) {
      return res.status(403).json({
        message: `Maximum login sessions reached (${MAX_SESSIONS}). Please logout from another device.`,
      });
    }

    // Step 3: Generate token & push new session
    const token = generateToken(user._id, user.role);
    const newSession = { token, createdAt: new Date() };

    user.sessions = [...validSessions, newSession];
    await user.save();

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


export const logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = await User.findById(req.user.id);
  user.sessions = user.sessions.filter(session => session.token !== token);
  await user.save();
  res.json({ message: 'Logged out' });
};
