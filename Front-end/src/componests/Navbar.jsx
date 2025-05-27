import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

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
      `}</style>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-center">
          <ul className="flex space-x-6 lg:space-x-8 text-white font-semibold bg-purple-900/30 rounded-full px-6 lg:px-8 py-3 backdrop-blur-md border border-purple-500/30 animate-glow">
            <li>
              <Link 
                to="/" 
                className={`hover:text-purple-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap ${location.pathname === '/' ? 'text-purple-300' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className={`hover:text-purple-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap ${location.pathname === '/services' ? 'text-purple-300' : ''}`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`hover:text-purple-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap ${location.pathname === '/about' ? 'text-purple-300' : ''}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`hover:text-purple-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap ${location.pathname === '/contact' ? 'text-purple-300' : ''}`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/testimonials" 
                className={`hover:text-purple-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap ${location.pathname === '/testimonials' ? 'text-purple-300' : ''}`}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link 
                to="/location" 
                className={`hover:text-purple-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap ${location.pathname === '/location' ? 'text-purple-300' : ''}`}
              >
                Location
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;