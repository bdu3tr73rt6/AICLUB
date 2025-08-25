import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import { SearchProvider } from './hooks/useSearch.tsx';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Creators from './pages/Creators';
import Pricing from './pages/Pricing';
import CourseDetail from './pages/CourseDetail';

function App() {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <SearchProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/creators" element={<Creators />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
        </Router>
      </SearchProvider>
    </AuthContext.Provider>
  );
}

export default App;
