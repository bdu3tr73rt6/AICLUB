import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, BarChart3, Users, Megaphone, CheckCircle } from 'lucide-react';

const FeatureCard = ({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-primary-600 transition-colors"
  >
    <div className="w-12 h-12 bg-red-gradient rounded-lg mb-4 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <details className="bg-dark-800 border border-dark-700 rounded-lg p-4 group">
    <summary className="flex justify-between items-center font-medium text-white cursor-pointer">
      {question}
      <motion.div
        className="transform transition-transform duration-200 group-open:rotate-45"
        whileHover={{ scale: 1.1 }}
      >
        <ArrowRight className="h-5 w-5 text-primary-400" />
      </motion.div>
    </summary>
    <p className="text-gray-400 mt-4 text-sm">
      {answer}
    </p>
  </details>
);

const Creators: React.FC = () => {
  const features = [
    {
      icon: <DollarSign className="h-6 w-6 text-white" />,
      title: 'Flexible Monetization',
      description: 'Set your own prices, offer subscriptions, or create course bundles. You control your earnings.',
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      title: 'Powerful Analytics',
      description: 'Get insights into student engagement, revenue, and course performance with our detailed dashboard.',
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: 'Engage Your Community',
      description: 'Connect with your students through Q&A sections, discussion forums, and direct messaging.',
    },
    {
      icon: <Megaphone className="h-6 w-6 text-white" />,
      title: 'Marketing & Promotion',
      description: 'Create promotional codes, run affiliate programs, and leverage our platform to reach a wider audience.',
    },
  ];

  const faqs = [
    {
      question: 'What is the revenue share for creators?',
      answer: 'We offer a competitive revenue share model. You receive 80% of the revenue for sales made through your own promotional efforts and 50% for sales made through our platform\'s organic discovery channels.'
    },
    {
      question: 'What kind of support do you offer creators?',
      answer: 'Our dedicated creator support team is here to help you with course creation, marketing strategies, and technical issues. We also provide a comprehensive knowledge base and community forums.'
    },
    {
      question: 'Are there any upfront costs to become a creator?',
      answer: 'No, it\'s completely free to sign up and start building your courses on AI Club. We only make money when you do.'
    },
    {
      question: 'What types of courses can I create?',
      answer: 'You can create courses on any topic related to AI, content creation, monetization, and business development for the creator economy. We welcome a wide range of expertise and teaching styles.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative bg-dark-900 overflow-hidden py-20">
        <div className="absolute inset-0 bg-red-gradient opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Share Your Expertise.
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Build Your Business.
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join AI Club as a creator and turn your knowledge into a thriving online business. We provide the tools, community, and support you need to succeed.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
            >
              Start Creating Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tools for Your Success
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We've built a powerful suite of tools to help you create, market, and sell your courses effortlessly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get Started in 3 Simple Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Build Your Course', description: 'Use our intuitive course builder to upload videos, create quizzes, and structure your content.' },
              { title: 'Set Your Price', description: 'Choose your pricing model. Offer one-time purchases, subscriptions, or bundles.' },
              { title: 'Launch & Earn', description: 'Publish your course and start earning. We handle payments and provide you with powerful analytics.' },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="w-16 h-16 bg-dark-800 border-2 border-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-primary-400 font-bold text-2xl">
                  {index + 1}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-gradient opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Become a Creator?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of expert instructors and start sharing your passion with the world.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
            >
              Apply to Be an Instructor
              <CheckCircle className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Creators;
