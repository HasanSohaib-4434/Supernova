import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md text-center text-white py-12 border-t border-blue-600/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-300">Quick Links</h4>
            <div className="space-y-2">
              <p className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</p>
              <p className="hover:text-blue-400 cursor-pointer transition-colors">Terms & Conditions</p>
              <p className="hover:text-blue-400 cursor-pointer transition-colors">Refund Policy</p>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-300">Contact</h4>
            <p className="text-lg font-semibold">+1 (646) 930-8617</p>
            <p className="text-gray-300">info@novatecsol.com</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-300">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">📘</div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">📷</div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">🐦</div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">📌</div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-600/30 pt-8">
          <p className="text-gray-300">Copyright © 2025 All Rights Reserved by Novatec Sol - Transforming Digital Futures</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;