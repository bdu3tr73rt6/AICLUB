export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  accountType: 'student' | 'creator';
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  category: CourseCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  instructor: Instructor;
  curriculum: Lesson[];
  tags: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  createdAt: Date;
  updatedAt: Date;
  enrollmentCount: number;
  featured: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  resources: Resource[];
  completed?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'download';
  url: string;
}

export type CourseCategory = 
  | 'ai-fundamentals'
  | 'content-creation'
  | 'monetization'
  | 'tool-mastery'
  | 'business-development';

export interface CartItem {
  course: Course;
  quantity: number;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: Date;
  lastAccessedAt: Date;
}
