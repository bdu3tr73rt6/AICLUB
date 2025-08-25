import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const PricingCard = ({ plan, index }: { plan: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
    className={`bg-dark-800 p-8 rounded-2xl border ${plan.featured ? 'border-primary-500' : 'border-dark-700'} flex flex-col`}
  >
    {plan.featured && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
        Most Popular
      </div>
    )}
    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
    <p className="text-gray-400 mb-6 flex-grow">{plan.description}</p>
    
    <div className="mb-8">
      <span className="text-5xl font-extrabold text-white">${plan.price}</span>
      <span className="text-gray-400 text-lg ml-1">/{plan.period}</span>
    </div>

    <ul className="space-y-4 mb-8">
      {plan.features.map((feature: string) => (
        <li key={feature} className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>

    <Link
      to="/signup"
      className={`mt-auto w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-opacity ${
        plan.featured 
        ? 'bg-red-gradient text-white hover:opacity-90' 
        : 'bg-dark-700 text-white hover:bg-dark-600'
      }`}
    >
      {plan.cta}
    </Link>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <details className="bg-dark-800 border border-dark-700 rounded-lg p-4 group">
    <summary className="flex justify-between items-center font-medium text-white cursor-pointer">
      {question}
      <motion.div
        className="transform transition-transform duration-200 group-open:rotate-90"
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

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Student Pass',
      price: 29,
      period: 'month',
      description: 'Perfect for individuals looking to master AI and grow their skills.',
      features: [
        'Access to all courses',
        'Downloadable resources',
        'Course completion certificates',
        'Community access',
        'Email support'
      ],
      cta: 'Get Student Pass',
      featured: false,
    },
    {
      name: 'Creator Pro',
      price: 99,
      period: 'month',
      description: 'For creators who want to build, market, and sell their courses.',
      features: [
        'All Student Pass features',
        'Publish unlimited courses',
        'Advanced analytics dashboard',
        'Marketing & promotion tools',
        'Priority support'
      ],
      cta: 'Start Creating',
      featured: true,
    },
    {
      name: 'Business',
      price: 'Custom',
      period: 'year',
      description: 'For teams and organizations needing a scalable learning solution.',
      features: [
        'All Creator Pro features',
        'Team management dashboard',
        'Bulk license management',
        'Custom branding options',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      featured: false,
    },
  ];

  const faqs = [
    {
      question: 'Is there a free trial available?',
      answer: 'While we don\'t offer a traditional free trial, we have several free introductory courses available. The Student Pass also comes with a 7-day money-back guarantee.'
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel your monthly or yearly subscription at any time from your account dashboard. You will retain access until the end of your current billing period.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, including Visa, Mastercard, and American Express, as well as PayPal.'
    },
    {
      question: 'Can I switch between plans?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. The change will be prorated and reflected in your next billing cycle.'
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
              Find the Perfect Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Whether you're a student, creator, or business, we have a plan that fits your needs. Start your AI journey with AI Club today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
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
    </div>
  );
};

export default Pricing;
