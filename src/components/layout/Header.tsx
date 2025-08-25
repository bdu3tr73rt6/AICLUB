import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSearch } from '../../hooks/useSearch.tsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { openSearch } = useSearch();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'For Creators', path: '/creators' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const activeLinkStyle = {
    color: '#f87171', // primary-400
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-lg border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-white text-xl font-bold">Club</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="text-gray-300 hover:text-primary-400 transition-colors font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <button onClick={openSearch} className="text-gray-300 hover:text-primary-400">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-300 hover:text-primary-400 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!isUserMenuOpen)} className="flex items-center">
                  <img
                    src={user.avatar || `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40/8B0000/FFFFFF.png?text=${user.firstName?.charAt(0)}`}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full border-2 border-primary-500"
                  />
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-1"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-dark-700">
                        <p className="text-sm text-white font-semibold truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-dark-700 hover:text-red-300">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-primary-400 transition-colors font-medium">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity font-semibold">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={openSearch} className="text-gray-300 mr-4">
              <Search className="h-6 w-6" />
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="text-gray-300">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-dark-900 z-50 p-4 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AI</span>
                </div>
                <span className="text-white text-xl font-bold">Club</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-300">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-lg py-2"
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className="mt-8 border-t border-dark-800 pt-8">
              {user ? (
                 <div className="space-y-4">
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center w-full px-4 py-3 bg-dark-800 text-white rounded-lg">
                      <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
                    </Link>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 bg-red-gradient text-white rounded-lg">
                      <LogOut className="mr-3 h-5 w-5" /> Logout
                    </button>
                 </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center px-6 py-3 border border-primary-600 text-primary-400 rounded-lg hover:bg-primary-600 hover:text-white transition-colors font-semibold">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="text-center px-6 py-3 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity font-semibold">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
