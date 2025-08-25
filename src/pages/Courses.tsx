import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import CourseCard from '../components/course/CourseCard';
import { mockCourses, categoryLabels } from '../data/mockData';
import { CourseCategory } from '../types';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popular');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'free' && course.price === 0) ||
                        (priceRange === 'under-50' && course.price < 50) ||
                        (priceRange === '50-100' && course.price >= 50 && course.price <= 100) ||
                        (priceRange === 'over-100' && course.price > 100);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
      default:
        return b.enrollmentCount - a.enrollmentCount;
    }
  });

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Explore Courses
          </h1>
          <p className="text-xl text-gray-400">
            Discover courses to accelerate your AI learning journey
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-800 rounded-xl p-6 mb-8 border border-dark-700"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CourseCategory | 'all')}
              className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">Over $100</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-dark-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-400'} transition-colors`}
              >
                <Grid className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-400'} transition-colors`}
              >
                <List className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              Showing {sortedCourses.length} of {mockCourses.length} courses
            </p>
            <button className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-6"
          }
        >
          {sortedCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {sortedCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg mb-4">No courses found</div>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;
