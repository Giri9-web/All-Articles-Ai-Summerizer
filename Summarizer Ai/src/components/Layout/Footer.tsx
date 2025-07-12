import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Globe, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Summarizer</h3>
                <p className="text-sm text-gray-400">Advanced AI for Indian Languages</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering users with advanced multilingual text summarization technology. 
              Supporting 22+ Indian languages with state-of-the-art AI algorithms.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-red-500" />
              Made with love in India
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/compare" className="text-gray-300 hover:text-white transition-colors">Compare</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@summarizer.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91-XXX-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Bangalore, India</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Globe className="w-4 h-4" />
                <span className="text-sm">24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Summarizer. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Supported Languages:</span>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 bg-gray-800 rounded">हिन्दी</span>
              <span className="px-2 py-1 bg-gray-800 rounded">বাংলা</span>
              <span className="px-2 py-1 bg-gray-800 rounded">தமிழ்</span>
              <span className="px-2 py-1 bg-gray-800 rounded">తెలుగు</span>
              <span className="px-2 py-1 bg-gray-800 rounded">+18 more</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}