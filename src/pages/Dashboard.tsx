import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Welcome, {user.firstName}!
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            This is your dashboard. Your AI learning journey starts here.
          </p>

          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Account Details</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Account Type:</strong> <span className="capitalize bg-primary-900 text-primary-300 px-2 py-1 rounded-full text-sm">{user.accountType}</span></p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 px-6 py-3 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
