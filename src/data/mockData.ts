import { faker } from '@faker-js/faker';
import { Course, Instructor, CourseCategory } from '../types';

const categories: CourseCategory[] = [
  'ai-fundamentals',
  'content-creation',
  'monetization',
  'tool-mastery',
  'business-development'
];

const categoryLabels: Record<CourseCategory, string> = {
  'ai-fundamentals': 'AI Fundamentals',
  'content-creation': 'Content Creation',
  'monetization': 'Monetization',
  'tool-mastery': 'Tool Mastery',
  'business-development': 'Business Development'
};

const generateInstructor = (): Instructor => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  avatar: `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/8B0000/FFFFFF.png?text=${faker.person.firstName().charAt(0)}`,
  bio: faker.lorem.paragraph(3),
  expertise: faker.helpers.arrayElements(['AI', 'Machine Learning', 'Content Strategy', 'Business', 'Marketing'], { min: 2, max: 4 }),
  coursesCount: faker.number.int({ min: 3, max: 25 }),
  studentsCount: faker.number.int({ min: 100, max: 10000 }),
  rating: parseFloat(faker.number.float({ min: 4.2, max: 5.0 }).toFixed(1)),
});

const generateCourse = (): Course => {
  const instructor = generateInstructor();
  const category = faker.helpers.arrayElement(categories);
  const lessonsCount = faker.number.int({ min: 8, max: 30 });
  const price = faker.number.int({ min: 49, max: 299 });
  
  return {
    id: faker.string.uuid(),
    title: `${categoryLabels[category]}: ${faker.lorem.words(3)}`,
    description: faker.lorem.paragraphs(3),
    shortDescription: faker.lorem.sentence(),
    thumbnail: `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x450/8B0000/FFFFFF.png?text=${categoryLabels[category]}`,
    price,
    originalPrice: faker.datatype.boolean(0.3) ? price + faker.number.int({ min: 50, max: 100 }) : undefined,
    category,
    difficulty: faker.helpers.arrayElement(['beginner', 'intermediate', 'advanced']),
    duration: faker.number.int({ min: 180, max: 720 }),
    lessonsCount,
    rating: parseFloat(faker.number.float({ min: 4.0, max: 5.0 }).toFixed(1)),
    reviewsCount: faker.number.int({ min: 10, max: 500 }),
    instructor,
    curriculum: Array.from({ length: lessonsCount }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(4),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 5, max: 45 }),
      videoUrl: '',
      resources: []
    })),
    tags: faker.helpers.arrayElements(['AI', 'Beginner-Friendly', 'Hands-on', 'Advanced', 'Practical', 'Theory'], { min: 2, max: 4 }),
    prerequisites: faker.helpers.arrayElements(['Basic computer skills', 'No prior experience', 'Basic programming', 'Business fundamentals'], { min: 0, max: 2 }),
    learningOutcomes: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => faker.lorem.sentence()),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    enrollmentCount: faker.number.int({ min: 50, max: 2000 }),
    featured: faker.datatype.boolean(0.2),
  };
};

export const mockCourses: Course[] = Array.from({ length: 24 }, generateCourse);

export const featuredCourses = mockCourses.filter(course => course.featured);

export { categoryLabels };
