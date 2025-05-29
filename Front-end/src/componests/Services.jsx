import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import Navbar from './Navbar.jsx';
import ContactUs from './ContactUs.jsx';

const Services = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);
  const contactRef = useRef(null);

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const elementsToObserve = [
      heroRef.current,
      servicesRef.current,
      processRef.current,
      ctaRef.current,
      contactRef.current,
    ];

    elementsToObserve.forEach((el, index) => {
      if (el) {
        el.id = `section-${index}`;
        observer.observe(el);
      }
    });

    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const FloatingParticle = ({ delay = 0, size = 2, duration = 3 }) => (
    <div
      className="absolute bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-70"
      style={{
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${duration}s ease-in-out infinite ${delay}s`,
      }}
    />
  );

  const isVisible = (elementId) => visibleElements.has(elementId);

  const navigateToContact = () => {
    navigate('/contact'); // Navigate to /contact route
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
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.7); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-slide-left {
          opacity: 0;
          transform: translateX(-100px);
          transition: all 1s ease-out;
        }
        .animate-slide-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .animate-slide-right {
          opacity: 0;
          transform: translateX(100px);
          transition: all 1s ease-out;
        }
        .animate-slide-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse"
            style={{ animation: 'pulse 8s ease-in-out infinite' }}
          />
          <div
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse"
            style={{ animation: 'pulse 6s ease-in-out infinite 2s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse"
            style={{ animation: 'pulse 10s ease-in-out infinite 4s' }}
          />
        </div>

        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={Math.random() * 5}
            size={Math.random() * 3 + 1}
            duration={Math.random() * 4 + 3}
          />
        ))}
      </div>

      <Navbar />

      <div
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 pt-20"
      >
        <div
          className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${
            isVisible('section-0') ? 'visible' : ''
          }`}
          style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
        >
          Our Services
        </div>

        <p
          className={`text-lg md:text-xl mb-12 max-w-4xl leading-relaxed text-gray-300 animate-on-scroll stagger-1 ${
            isVisible('section-0') ? 'visible' : ''
          }`}
        >
          Discover our comprehensive suite of AI-powered digital marketing solutions designed to transform your business
          and drive exponential growth in the digital landscape.
        </p>
      </div>

      <div ref={servicesRef} className="relative z-10 py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: 'SEO Optimization',
              desc: 'Dominate search rankings with our advanced SEO strategies powered by AI analytics and data-driven insights.',
              icon: '🚀',
              features: [
                'Keyword Research & Analysis',
                'On-Page Optimization',
                'Technical SEO Audits',
                'Content Strategy',
                'Link Building',
              ],
              path: '/services/seo-optimization',
            },
            {
              title: 'Graphic Design',
              desc: 'Create stunning visual identities that captivate audiences and drive engagement across all platforms.',
              icon: '🎨',
              features: ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Print Materials', 'Web Design'],
              path: '/services/graphic-design',
            },
            {
              title: 'Google My Business',
              desc: 'Maximize local visibility and attract high-quality customers with optimized GMB profiles and management.',
              icon: '📍',
              features: ['Profile Optimization', 'Review Management', 'Local SEO', 'Post Scheduling', 'Analytics Tracking'],
              path: '/services/google-my-business',
            },
            {
              title: 'Social Media Marketing',
              desc: 'Build powerful social presence with strategic content creation and community management.',
              icon: '📱',
              features: [
                'Content Creation',
                'Community Management',
                'Paid Advertising',
                'Influencer Partnerships',
                'Analytics & Reporting',
              ],
              path: '/services/social-media-marketing',
            },
            {
              title: 'Website Development',
              desc: 'Create responsive, high-performance websites that convert visitors into customers.',
              icon: '💻',
              features: [
                'Responsive Design',
                'E-commerce Solutions',
                'CMS Development',
                'Performance Optimization',
                'Security Implementation',
              ],
              path: '/services/website-development',
            },
            {
              title: 'AI Marketing Automation',
              desc: 'Leverage cutting-edge AI technology to automate and optimize your marketing campaigns.',
              icon: '🤖',
              features: [
                'Email Automation',
                'Lead Scoring',
                'Predictive Analytics',
                'Chatbot Development',
                'Customer Journey Mapping',
              ],
              path: '/services/ai-marketing-automation',
            },
          ].map((service, index) => (
            <div
              key={index}
              id={`service-${index}`}
              className={`bg-gradient-to-br from-gray-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 text-white border border-blue-600/30 card-hover animate-on-scroll stagger-${
                index + 1
              } ${isVisible('section-1') ? 'visible' : ''}`}
            >
              <div className="text-5xl mb-6 text-center">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-300 text-center">{service.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{service.desc}</p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                      style={{ animationDelay: `${featureIndex * 0.2}s` }}
                    ></div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-4">
                <Link
                  to={service.path}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 animate-glow text-center"
                >
                  Learn More
                </Link>
                <button
                  onClick={navigateToContact}
                  className="w-full bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 animate-glow"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={processRef}
        className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
      >
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${
            isVisible('section-2') ? 'visible' : ''
          }`}
        >
          Our Process
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We analyze your business goals and target audience' },
              { step: '02', title: 'Strategy', desc: 'We create a customized digital marketing plan' },
              { step: '03', title: 'Implementation', desc: 'We execute the strategy with precision' },
              { step: '04', title: 'Optimization', desc: 'We continuously improve and scale results' },
            ].map((process, index) => (
              <div
                key={index}
                id={`process-${index}`}
                className={`text-center text-white animate-on-scroll stagger-${index + 1} ${
                  isVisible('section-2') ? 'visible' : ''
                }`}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 animate-glow">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-300">{process.title}</h3>
                <p className="text-gray-300">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={ctaRef} className="relative z-10 py-20 px-4">
        <div
          className={`max-w-4xl mx-auto text-center text-white animate-on-scroll ${
            isVisible('section-3') ? 'visible' : ''
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Let's discuss how our services can drive your business to new heights of success.
          </p>
          <button
            onClick={navigateToContact}
            className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-glow"
          >
            Get Free Consultation
          </button>
        </div>
      </div>

      <div ref={contactRef} className="relative z-10 py-20 px-4">
        <ContactUs />
      </div>

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
              <p className="text-lg font-semibold text-white">+1 (646) 930-8617</p>
              <p className="text-gray-300">info@novatecsol.com</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-gray-300">Follow Us</h4>
              <div className="flex justify-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  📘
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  📷
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  🐦
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  📌
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-600/30 pt-8">
            <p className="text-gray-300">
              Copyright © 2025 All Rights Reserved by Novatec Sol - Transforming Digital Futures
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;