import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch.tsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen } from 'lucide-react';
import { mockCourses, categoryLabels } from '../../data/mockData';
import { Course, CourseCategory } from '../../types';

const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeSearch]);

  const searchResults = useMemo(() => {
    if (!query) return [];
    
    const lowerCaseQuery = query.toLowerCase();
    return mockCourses.filter(course =>
      course.title.toLowerCase().includes(lowerCaseQuery) ||
      course.shortDescription.toLowerCase().includes(lowerCaseQuery) ||
      course.instructor.name.toLowerCase().includes(lowerCaseQuery)
    );
  }, [query]);

  const groupedResults = useMemo(() => {
    return searchResults.reduce((acc, course) => {
      const category = course.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {} as Record<CourseCategory, Course[]>);
  }, [searchResults]);

  const popularCourses = useMemo(() => mockCourses.slice(0, 5), []);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-dark-800/90 border border-dark-700 rounded-2xl shadow-2xl mt-20"
          >
            {/* Search Input */}
            <div className="relative p-4 border-b border-dark-700">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses, instructors, or skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-lg text-white placeholder-gray-500 pl-10 pr-10 py-2 focus:outline-none"
              />
              <button onClick={closeSearch} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {query && searchResults.length > 0 && (
                Object.entries(groupedResults).map(([category, courses]) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-sm font-semibold text-primary-400 px-2 mb-2">
                      {categoryLabels[category as CourseCategory]}
                    </h3>
                    <ul>
                      {courses.map(course => (
                        <li key={course.id}>
                          <Link
                            to={`/course/${course.id}`}
                            onClick={closeSearch}
                            className="flex items-center p-3 rounded-lg hover:bg-dark-700 transition-colors"
                          >
                            <div className="w-10 h-10 bg-dark-900 rounded-md flex-shrink-0 flex items-center justify-center mr-4">
                              <BookOpen className="h-5 w-5 text-primary-500" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{course.title}</p>
                              <p className="text-sm text-gray-400 line-clamp-1">{course.shortDescription}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}

              {query && searchResults.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-300">No results found for "{query}"</p>
                  <p className="text-sm text-gray-500 mt-1">Try a different search term.</p>
                </div>
              )}

              {!query && (
                <div>
                  <h3 className="text-sm font-semibold text-primary-400 px-2 mb-2">
                    Popular Courses
                  </h3>
                  <ul>
                    {popularCourses.map(course => (
                      <li key={course.id}>
                        <Link
                          to={`/course/${course.id}`}
                          onClick={closeSearch}
                          className="flex items-center p-3 rounded-lg hover:bg-dark-700 transition-colors"
                        >
                          <div className="w-10 h-10 bg-dark-900 rounded-md flex-shrink-0 flex items-center justify-center mr-4">
                            <BookOpen className="h-5 w-5 text-primary-500" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{course.title}</p>
                            <p className="text-sm text-gray-400 line-clamp-1">{course.shortDescription}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-3 bg-dark-900/50 border-t border-dark-700 text-right text-xs text-gray-500 rounded-b-2xl">
              Press <kbd className="px-2 py-1 bg-dark-700 rounded-md">Esc</kbd> to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
