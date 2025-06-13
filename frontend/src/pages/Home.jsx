import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Our App 🚀</h1>
        <p className="text-gray-600 mb-6">
          A secure and modern web application built using the MERN stack. Login or Register to get started!
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
