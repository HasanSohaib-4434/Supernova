import { useState, useEffect, useRef } from "react";
import Navbar from './Navbar.jsx';

const Home = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);
  const teamRef = useRef(null);
  const reviewsRef = useRef(null);
  const heroRef = useRef(null);
  const digitalExcellenceRef = useRef(null);

  const services = ["Google My Business", "Graphic Designing", "Search Engine Optimization", "AI-Driven Marketing", "Digital Transformation"];

  // // Scroll to top when component mounts
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe all sections and elements
    const elementsToObserve = [
      heroRef.current,
      digitalExcellenceRef.current,
      servicesRef.current,
      pricingRef.current,
      teamRef.current,
      reviewsRef.current
    ];

    elementsToObserve.forEach((el, index) => {
      if (el) {
        el.id = `section-${index}`;
        observer.observe(el);
      }
    });

    // Also observe individual cards and elements
    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    const currentService = services[currentServiceIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && typewriterText === currentService) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typewriterText === "") {
        setIsDeleting(false);
        setCurrentServiceIndex((prev) => (prev + 1) % services.length);
      } else {
        setTypewriterText(prev => 
          isDeleting ? prev.slice(0, -1) : currentService.slice(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, currentServiceIndex, services]);

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

  const GlowingOrb = ({ size = 100, color = "blue", position }) => (
    <div
      className={`absolute rounded-full bg-gradient-to-r from-${color}-600/20 to-${color}-800/20 blur-xl`}
      style={{
        width: size,
        height: size,
        ...position,
        animation: `pulse 4s ease-in-out infinite`,
      }}
    />
  );

  // Helper function to check if element is visible
  const isVisible = (elementId) => visibleElements.has(elementId);

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

      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 8s ease-in-out infinite' }} />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 6s ease-in-out infinite 2s' }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 10s ease-in-out infinite 4s' }} />
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

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 pt-20">
        <div 
          className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${isVisible('section-0') ? 'visible' : ''}`}
          style={{ 
            textShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
          }}
        >
          Novatec Sol
        </div>
        
        <div 
          className={`text-2xl md:text-4xl mb-4 text-gray-200 animate-on-scroll stagger-1 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          We provide{' '}
          <span className="text-gradient bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent font-bold">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        <div 
          className={`text-2xl md:text-4xl font-semibold mb-8 text-gray-300 animate-on-scroll stagger-2 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          Innovative Digital AI Solutions Hub
        </div>
        
        <p 
          className={`text-lg md:text-xl mb-12 max-w-4xl leading-relaxed text-gray-300 animate-on-scroll stagger-3 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          At Novatec Sol, we're dedicated to elevating your online presence with cutting-edge AI-powered solutions. 
          Transform your digital landscape with our innovative strategies that drive exponential growth and unlock 
          unprecedented potential for your business in the digital age.
        </p>
        
        <button 
          className={`bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 animate-glow animate-on-scroll stagger-4 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          Start Your Journey
        </button>
      </div>

      {/* Digital Excellence Section */}
      <div ref={digitalExcellenceRef} className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h3 
              className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-slide-left ${isVisible('section-1') ? 'visible' : ''}`}
            >
              Digital Excellence Creators
            </h3>
            <p 
              className={`text-lg md:text-xl text-gray-300 leading-relaxed mb-8 animate-slide-left stagger-1 ${isVisible('section-1') ? 'visible' : ''}`}
            >
              We craft revolutionary strategies that drive unprecedented success through cutting-edge innovation and 
              creative excellence, ensuring your brand dominates the digital landscape with unmatched presence and impact.
            </p>
            <div className="space-y-4">
              <div 
                className={`flex items-center space-x-3 animate-slide-left stagger-2 ${isVisible('section-1') ? 'visible' : ''}`}
              >
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="text-gray-300">AI-Powered Marketing Solutions</span>
              </div>
              <div 
                className={`flex items-center space-x-3 animate-slide-left stagger-3 ${isVisible('section-1') ? 'visible' : ''}`}
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-gray-300">Data-Driven Growth Strategies</span>
              </div>
              <div 
                className={`flex items-center space-x-3 animate-slide-left stagger-4 ${isVisible('section-1') ? 'visible' : ''}`}
              >
                <div className="w-3 h-3 bg-purple-700 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-gray-300">Premium Digital Transformation</span>
              </div>
            </div>
          </div>
          
          <div 
            className={`relative animate-slide-right ${isVisible('section-1') ? 'visible' : ''}`}
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/20 to-blue-700/20 rounded-2xl backdrop-blur-md border border-blue-600/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-spin opacity-20"></div>
                  <p className="text-gray-300 font-semibold">AI Innovation Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="relative z-10 py-20 px-4">
        <h3 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${isVisible('section-2') ? 'visible' : ''}`}
        >
          Explore Our Premium Services
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { title: "SEO Optimization", desc: "Dominate search results with our advanced SEO strategies and AI-powered optimization techniques.", icon: "🚀" },
            { title: "Graphic Designing", desc: "Create stunning, conversion-focused visuals that captivate audiences and drive engagement.", icon: "🎨" },
            { title: "Google My Business", desc: "Maximize local visibility and attract high-quality customers with optimized GMB profiles.", icon: "📍" },
          ].map((service, index) => (
            <div
              key={index}
              id={`service-${index}`}
              className={`bg-gradient-to-br from-gray-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 text-white text-center border border-blue-600/30 card-hover animate-on-scroll stagger-${index + 1} ${isVisible('section-2') ? 'visible' : ''}`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h4 className="text-2xl font-bold mb-4 text-gray-300">{service.title}</h4>
              <p className="text-gray-300 leading-relaxed">{service.desc}</p>
              <button className="mt-6 bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div ref={pricingRef} className="relative z-10 py-20 px-4">
        <h3 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${isVisible('section-3') ? 'visible' : ''}`}
        >
          Investment Plans That Scale
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { name: "Starter", price: "$249", popular: false },
            { name: "Professional", price: "$299", popular: true },
            { name: "Enterprise", price: "$349", popular: false },
          ].map((plan, index) => (
            <div
              key={index}
              id={`plan-${index}`}
              className={`relative bg-gradient-to-br from-gray-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 text-white border ${plan.popular ? 'border-blue-600 scale-105' : 'border-blue-600/30'} card-hover animate-on-scroll stagger-${index + 1} ${isVisible('section-3') ? 'visible' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm py-1 px-4 rounded-full font-semibold">
                  MOST POPULAR
                </div>
              )}
              <h4 className="text-2xl font-bold mb-4 text-center text-gray-300">{plan.name}</h4>
              <p className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
                {plan.price}<span className="text-lg text-gray-400">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-400 mr-3">✓</span>Premium GBP/Website Optimization</li>
                <li className="flex items-center"><span className="text-green-400 mr-3">✓</span>Advanced Citations & Listings</li>
                <li className="flex items-center"><span className="text-green-400 mr-3">✓</span>Professional Design Assets</li>
                <li className="flex items-center"><span className="text-green-400 mr-3">✓</span>AI-Powered Analytics</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105">
                Get Started Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div ref={teamRef} className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <h3 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${isVisible('section-4') ? 'visible' : ''}`}
        >
          Meet Our Visionary Team
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { name: "John Williams", role: "Business Development Manager", avatar: "👨‍💼" },
            { name: "Allen Hendrix", role: "Executive Sales Representative", avatar: "👨‍💻" },
            { name: "Ryan Zee", role: "Manager CST", avatar: "👨‍🔧" },
            { name: "Mark Edward", role: "Customer Success Manager", avatar: "👨‍🎓" },
          ].map((member, index) => (
            <div
              key={index}
              id={`team-${index}`}
              className={`bg-gradient-to-br from-gray-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-6 text-white text-center border border-blue-600/30 card-hover animate-on-scroll stagger-${index + 1} ${isVisible('section-4') ? 'visible' : ''}`}
            >
              <div className="text-6xl mb-4">{member.avatar}</div>
              <h4 className="text-xl font-bold mb-2 text-gray-300">{member.name}</h4>
              <p className="text-gray-300 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div ref={reviewsRef} className="relative z-10 py-20 px-4">
        <h3 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${isVisible('section-5') ? 'visible' : ''}`}
        >
          What Our Clients Say
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            { review: "Absolutely revolutionary! Novatec Sol transformed our digital presence beyond our wildest expectations. The AI-driven strategies delivered phenomenal results!", author: "Sarah Johnson", rating: 5 },
            { review: "Outstanding service and incredible results. The team's expertise in digital marketing is unmatched. Highly recommend for serious business growth!", author: "Michael Chen", rating: 5 },
          ].map((testimonial, index) => (
            <div
              key={index}
              id={`review-${index}`}
              className={`bg-gradient-to-br from-gray-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 text-white border border-blue-600/30 card-hover ${index % 2 === 0 ? 'animate-slide-left' : 'animate-slide-right'} stagger-${index + 1} ${isVisible('section-5') ? 'visible' : ''}`}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-lg italic mb-4 text-gray-300">"{testimonial.review}"</p>
              <p className="font-semibold text-gray-300">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
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
    </div>
  );
};

export default Home;