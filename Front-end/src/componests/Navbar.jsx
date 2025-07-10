import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/location', label: 'Location' }
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <style jsx>{`
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.3); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center">
          <ul className="flex space-x-8 text-white font-semibold bg-purple-900/30 rounded-full px-8 py-3 backdrop-blur-md border border-purple-500/30 animate-glow">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`hover:text-purple-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap ${
                    location.pathname === item.path ? 'text-purple-300' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center bg-purple-900/30 rounded-full px-4 py-3 backdrop-blur-md border border-purple-500/30 animate-glow">
            {/* Logo/Brand */}
            <Link to="/" className="text-white font-bold text-lg">
              Menu
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-full hover:bg-purple-800/30 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="mt-2 bg-purple-900/90 backdrop-blur-md rounded-2xl border border-purple-500/30 animate-slideDown overflow-hidden">
              <ul className="py-2">
                {navItems.map((item, index) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      className={`block px-6 py-3 text-white font-medium transition-all duration-300 hover:bg-purple-800/50 hover:text-purple-300 ${
                        location.pathname === item.path ? 'text-purple-300 bg-purple-800/30' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden justify-center">
          <ul className="flex flex-wrap justify-center gap-4 text-white font-semibold bg-purple-900/30 rounded-full px-6 py-3 backdrop-blur-md border border-purple-500/30 animate-glow">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`hover:text-purple-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap text-sm ${
                    location.pathname === item.path ? 'text-purple-300' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 lg:hidden"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;