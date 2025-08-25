import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockCourses } from '../data/mockData';
import { motion } from 'framer-motion';
import { Clock, BookOpen, BarChart3, Star, Users, PlayCircle, CheckCircle, Download } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const CourseCurriculum = ({ curriculum }: { curriculum: any[] }) => {
  return (
    <div className="space-y-3">
      {curriculum.map((lesson, index) => (
        <details key={lesson.id} className="bg-dark-800 border border-dark-700 rounded-lg p-4 group">
          <summary className="flex justify-between items-center font-medium text-white cursor-pointer">
            <div className="flex items-center">
              <span className="text-primary-400 mr-3">{String(index + 1).padStart(2, '0')}</span>
              <span>{lesson.title}</span>
            </div>
            <span className="text-sm text-gray-400">{lesson.duration}m</span>
          </summary>
          <p className="text-gray-400 mt-3 ml-8 text-sm">{lesson.description}</p>
        </details>
      ))}
    </div>
  );
};

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = mockCourses.find(c => c.id === id);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!course) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <h1 className="text-2xl text-white">Course not found</h1>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      navigate('/login', { state: { from: `/course/${id}` } });
    } else {
      // Logic for enrollment
      alert(`Enrolling in ${course.title}`);
    }
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Hero Section */}
      <div className="bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Link to="/courses" className="text-sm text-primary-400 hover:underline mb-4 inline-block">
              &larr; Back to Courses
            </Link>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-gray-300 mb-6">{course.shortDescription}</p>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Created by</p>
                  <p className="font-semibold">{course.instructor.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                <span>{course.rating} ({course.reviewsCount} reviews)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Last updated: {new Date(course.updatedAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* What you'll learn */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Curriculum */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
              <CourseCurriculum curriculum={course.curriculum} />
            </motion.div>
            
            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{course.description}</p>
            </motion.div>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:sticky top-24 self-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden"
            >
              <div className="relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/80 hover:text-white cursor-pointer transition" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-lg text-gray-400 line-through ml-2">${course.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={handleEnroll}
                  className="w-full py-3 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg mb-4"
                >
                  Enroll Now
                </button>
                <p className="text-xs text-center text-gray-400 mb-6">30-Day Money-Back Guarantee</p>
                
                <h3 className="font-semibold mb-3">This course includes:</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center"><Clock className="h-4 w-4 mr-3 text-primary-400" /> {formatDuration(course.duration)} on-demand video</li>
                  <li className="flex items-center"><BookOpen className="h-4 w-4 mr-3 text-primary-400" /> {course.lessonsCount} lessons</li>
                  <li className="flex items-center"><Download className="h-4 w-4 mr-3 text-primary-400" /> Downloadable resources</li>
                  <li className="flex items-center"><Users className="h-4 w-4 mr-3 text-primary-400" /> Access on mobile and TV</li>
                  <li className="flex items-center"><BarChart3 className="h-4 w-4 mr-3 text-primary-400" /> {course.difficulty} level</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-3 text-primary-400" /> Certificate of completion</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
