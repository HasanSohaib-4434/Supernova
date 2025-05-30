import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';

const SEOOptimization = () => {
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
          SEO Optimization
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-4xl leading-relaxed text-gray-300">
          Dominate search rankings with our advanced SEO strategies powered by AI analytics and data-driven insights.
        </p>
      </div>

      <div className="relative z-10 py-20 px-4 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 text-white border border-blue-600/30">
          <h2 className="text-3xl font-bold mb-6 text-gray-300">What We Offer</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Our SEO Optimization service leverages cutting-edge AI tools to boost your website's visibility and drive organic traffic.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Keyword Research & Analysis: Identify high-impact keywords.</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-gray-300">On-Page Optimization: Enhance content and meta tags.</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="text-gray-300">Technical SEO Audits: Fix site performance issues.</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span className="text-gray-300">Content Strategy: Develop SEO-friendly content.</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
              <span className="text-gray-300">Link Building: Acquire high-quality backlinks.</span>
            </div>
          </div>
          <button 
            onClick={navigateToContact}
            className="w-full bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 animate-glow"
          >
            Get Started
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SEOOptimization;