import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-red-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-white text-xl font-bold">Club</span>
            </div>
            <p className="text-gray-400 mb-4">
              The premier AI education platform for creators looking to master AI and build sustainable income streams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?category=ai-fundamentals" className="text-gray-400 hover:text-white transition-colors">
                  AI Fundamentals
                </Link>
              </li>
              <li>
                <Link to="/courses?category=content-creation" className="text-gray-400 hover:text-white transition-colors">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link to="/courses?category=monetization" className="text-gray-400 hover:text-white transition-colors">
                  Monetization
                </Link>
              </li>
              <li>
                <Link to="/courses?category=tool-mastery" className="text-gray-400 hover:text-white transition-colors">
                  Tool Mastery
                </Link>
              </li>
              <li>
                <Link to="/courses?category=business-development" className="text-gray-400 hover:text-white transition-colors">
                  Business Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="text-gray-400 hover:text-white transition-colors">
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 AI Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
