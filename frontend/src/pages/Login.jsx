import React, { useState } from 'react';
import api from '../utils/axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../app/redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await api.post('/auth/login', { email, password });

    const { token, user } = res.data;
    const isAdmin = user?.role?.toLowerCase() === 'admin';

    console.log("User Role:", user.role);
    console.log("isAdmin stored as:", isAdmin ? 'true' : 'false');

    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');

    dispatch(setCredentials({ token, user }));

    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          className="border p-2 mb-2 w-full"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
