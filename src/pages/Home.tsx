import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, Award, TrendingUp } from 'lucide-react';
import CourseCard from '../components/course/CourseCard';
import { mockCourses, featuredCourses, categoryLabels } from '../data/mockData';

const Home: React.FC = () => {
  const popularCourses = mockCourses.slice(0, 6);
  const categories = Object.entries(categoryLabels);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-dark-900 overflow-hidden">
        <div className="absolute inset-0 bg-red-gradient opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Master AI &{' '}
                <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Build Your Creator Economy
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of creators learning AI fundamentals, content strategies, and monetization techniques 
                to build sustainable income streams in the creator economy.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/courses"
                  className="flex items-center justify-center px-8 py-4 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
                >
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="flex items-center justify-center px-8 py-4 border border-primary-600 text-primary-400 rounded-lg hover:bg-primary-600 hover:text-white transition-colors text-lg font-semibold">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/8B0000/FFFFFF.png?text=AI+Education"
                  alt="AI Education"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent rounded-2xl"></div>
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-dark-800 border border-dark-700 rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">50,000+</div>
                    <div className="text-gray-400 text-sm">Active Students</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 -right-6 bg-dark-800 border border-dark-700 rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-white fill-current" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">4.9/5</div>
                    <div className="text-gray-400 text-sm">Average Rating</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Students', value: '50,000+' },
              { icon: Award, label: 'Courses', value: '500+' },
              { icon: Star, label: 'Expert Instructors', value: '100+' },
              { icon: TrendingUp, label: 'Success Rate', value: '95%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Explore Course Categories
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From AI fundamentals to advanced monetization strategies, find the perfect learning path for your creator journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(([key, label], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/courses?category=${key}`}
                  className="block p-6 bg-dark-800 border border-dark-700 rounded-xl hover:border-primary-600 transition-colors group"
                >
                  <div className="w-12 h-12 bg-red-gradient rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">
                      {label.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{label}</h3>
                  <p className="text-gray-400 text-sm">
                    Master the skills and strategies in {label.toLowerCase()} to grow your creator business.
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of students in our most popular courses designed to accelerate your AI learning journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-gradient opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Creator Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of successful creators and start building your AI-powered business today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
              >
                Start Learning Today
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 border border-primary-600 text-primary-400 rounded-lg hover:bg-primary-600 hover:text-white transition-colors text-lg font-semibold"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
