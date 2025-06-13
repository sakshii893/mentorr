import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
        
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="text-center mt-20">Loading...</div>;
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {user.username}!</h2>
        <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700 mb-2"><strong>Role:</strong> {user.role}</p>

        {/* ✅ Show Admin Panel button if user is admin */}
        {user.role === 'admin' && (
          <button
            className="bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full"
            onClick={() => navigate('/admin/dashboard')}
          >
            Go to Admin Panel
          </button>
        )}

        <button
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded w-full"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
