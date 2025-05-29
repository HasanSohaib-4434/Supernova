import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar.jsx';

const AIMarketingAutomation = () => {
  const navigate = useNavigate();

  const navigateToContact = () => {
    navigate('/contact');
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.7); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 8s ease-in-out infinite' }} />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 6s ease-in-out infinite 2s' }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 10s ease-in-out infinite 4s' }} />
        </div>
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 pt-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
          AI Marketing Automation
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-4xl leading-relaxed text-gray-300">
          Leverage cutting-edge AI technology to automate and optimize your marketing campaigns.
        </p>
      </div>

      <div className="relative z-10 py-20 px-4 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 text-white border border-blue-600/30">
          <h2 className="text-3xl font-bold mb-6 text-gray-300">What We Offer</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Our AI Marketing Automation service uses advanced algorithms to streamline your marketing processes and maximize efficiency.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Email Automation: Personalize email campaigns.</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-gray-300">Lead Scoring: Prioritize high-potential leads.</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="text-gray-300">Predictive Analytics: Forecast campaign outcomes.</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span className="text-gray-300">Chatbot Development: Automate customer interactions.</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
              <span className="text-gray-300">Customer Journey Mapping: Optimize touchpoints.</span>
            </div>
          </div>
          <button 
            onClick={navigateToContact}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 transition-transform animate-glow"
          >
            Get Started
          </button>
        </div>
      </div>

      <footer className="relative z-10 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md text-center text-white py-16 border-t border-blue-600/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                <p className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Privacy Policy</p>
                <p className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Terms & Conditions</p>
                <p className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Refund Policy</p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Contact</h4>
              <p className="text-lg font-semibold text-white mb-2">+1 (646) 930-4417</p>
              <p className="text-gray-300">info@novatecsol.com</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Follow Us</h4>
              <div className="flex justify-center space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">📘</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">📷</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">🐦</a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">📌</a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-600/30 pt-6">
            <p className="text-gray-300 text-sm">© 2025 All Rights Reserved by Novatec Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIMarketingAutomation;