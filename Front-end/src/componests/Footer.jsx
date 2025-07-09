import React from 'react';

const Footer = () => {
  const navigate = (path) => {
    // Simulate navigation - in your real app, replace this with actual router navigation
    window.location.href = path;
  };

  return (
    <footer className="relative z-10 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md text-center text-white py-8 sm:py-12 border-t border-blue-600/30 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          <div className="group">
            <h4 className="text-lg sm:text-xl font-bold mb-4 text-gray-300 relative">
              Quick Links
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></div>
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <p
                className="hover:text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text cursor-pointer transition-all duration-300 hover:scale-105 transform hover:translate-x-1 text-sm sm:text-base"
                onClick={() => navigate('/privacy-policy')}
              >
                Privacy Policy
              </p>
              <p
                className="hover:text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text cursor-pointer transition-all duration-300 hover:scale-105 transform hover:translate-x-1 text-sm sm:text-base"
                onClick={() => navigate('/terms-conditions')}
              >
                Terms & Conditions
              </p>
              <p
                className="hover:text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text cursor-pointer transition-all duration-300 hover:scale-105 transform hover:translate-x-1 text-sm sm:text-base"
                onClick={() => navigate('/cancellation-refund-policy')}
              >
                Cancellation and Refund Policy
              </p>
              <p
                className="hover:text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text cursor-pointer transition-all duration-300 hover:scale-105 transform hover:translate-x-1 text-sm sm:text-base"
                onClick={() => navigate('/secure-card-transmission-policy')}
              >
                Secure Card Transmission Policy
              </p>
            </div>
          </div>
          
          <div className="group">
            <h4 className="text-lg sm:text-xl font-bold mb-4 text-gray-300 relative">
              Contact
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></div>
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <a href="tel:+16469308617" className="text-base sm:text-lg font-semibold hover:text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text transition-all duration-300 cursor-pointer hover:scale-105 block">
                +1 (646) 930-8617
              </a>
              <a href="mailto:info@Supernovasoltuions.com?subject=Inquiry%20from%20Website" className="text-gray-300 hover:text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text transition-all duration-300 cursor-pointer hover:scale-105 text-sm sm:text-base block">
                info@supernovasolutions.com
              </a>
            </div>
          </div>
          
          <div className="group sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-bold mb-4 text-gray-300 relative">
              Follow Us
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></div>
            </h4>
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <div className="relative group/icon">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/30">
                  <span className="text-base sm:text-lg">📘</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-300 animate-pulse"></div>
              </div>
              <div className="relative group/icon">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/30">
                  <span className="text-base sm:text-lg">📷</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-300 animate-pulse"></div>
              </div>
              <div className="relative group/icon">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/30">
                  <span className="text-base sm:text-lg">🐦</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-300 animate-pulse"></div>
              </div>
              <div className="relative group/icon">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/30">
                  <span className="text-base sm:text-lg">📌</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-300 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-600/30 pt-6 sm:pt-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent h-px top-0"></div>
          <p className="text-gray-300 hover:text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text transition-all duration-300 cursor-default text-xs sm:text-sm lg:text-base leading-relaxed">
            Copyright © 2025 All Rights Reserved by Supernova Solutions - Transforming Digital Futures
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;