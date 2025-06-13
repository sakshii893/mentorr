import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
console.log(res.data.admin.name);

        setAdminData(res.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Access denied');
        navigate('/unauthorized');
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (!adminData) {
    return <div className="text-center mt-20">Loading Admin Data...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Admin Dashboard</h2>
        <p className="text-gray-700 mb-4">Welcome back, {adminData.admin?.name} 👑</p>

        <div className="bg-gray-50 p-4 rounded border">
          <p><strong>Total Users:</strong> {adminData.totalUsers}</p>
          {/* Add more stats here if you want */}
        </div>

        <button
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
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

export default AdminDashboard;
