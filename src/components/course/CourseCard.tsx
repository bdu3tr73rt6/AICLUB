import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  index?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index = 0 }) => {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-600 transition-all duration-300 group"
    >
      <Link to={`/course/${course.id}`}>
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {course.originalPrice && (
            <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded text-sm font-medium">
              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black bg-opacity-50 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
            {course.difficulty}
          </div>
        </div>

        <div className="p-6">
          {/* Category */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-primary-900 text-primary-300 text-sm rounded-full">
              {course.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {course.shortDescription}
          </p>

          {/* Instructor */}
          <div className="flex items-center mb-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="text-gray-300 text-sm">{course.instructor.name}</span>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDuration(course.duration)}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.lessonsCount} lessons</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
              <span>{course.rating}</span>
              <span className="text-gray-500 ml-1">({course.reviewsCount})</span>
            </div>
          </div>

          {/* Enrollment Count */}
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.enrollmentCount.toLocaleString()} students enrolled</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">{formatPrice(course.price)}</span>
              {course.originalPrice && (
                <span className="text-gray-400 line-through">{formatPrice(course.originalPrice)}</span>
              )}
            </div>
            <button className="px-4 py-2 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity">
              Enroll Now
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
