import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

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
  const navigate = useNavigate();


  const services = ["Google My Business", "Graphic Designing", "Search Engine Optimization", "AI-Driven Marketing", "Digital Transformation"];

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
          from { opacity: 0; transform: translateX(-200px) scale(0.8); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(200px) scale(0.8); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(100px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-100px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3) translateY(50px); }
          50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
          70% { transform: scale(0.9) translateY(5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          50% { opacity: 0.7; transform: scale(1.1) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.4); }
        }
        @keyframes heroTitle {
          0% { opacity: 0; transform: translateY(-50px) scale(0.9); }
          50% { opacity: 0.8; transform: translateY(-10px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typewriter {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardHover {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-15px) scale(1.05); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .card-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.2);
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(100px) scale(0.8);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .animate-slide-left {
          opacity: 0;
          transform: translateX(-200px) scale(0.8);
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-slide-left.visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        .animate-slide-right {
          opacity: 0;
          transform: translateX(200px) scale(0.8);
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-slide-right.visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        .animate-bounce-in {
          opacity: 0;
          transform: scale(0.3) translateY(50px);
          transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-bounce-in.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .animate-fade-scale {
          opacity: 0;
          transform: scale(0.5) rotate(-10deg);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fade-scale.visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .animate-hero-title {
          opacity: 0;
          transform: translateY(-50px) scale(0.9);
          animation: heroTitle 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-typewriter {
          animation: typewriter 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .stagger-1 { transition-delay: 0.2s; }
        .stagger-2 { transition-delay: 0.4s; }
        .stagger-3 { transition-delay: 0.6s; }
        .stagger-4 { transition-delay: 0.8s; }
        .stagger-5 { transition-delay: 1s; }
        .stagger-6 { transition-delay: 1.2s; }
        
        /* Enhanced hover effects */
        .service-card:hover .service-icon {
          transform: scale(1.2) rotate(10deg);
          transition: all 0.3s ease;
        }
        .pricing-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.4);
        }
        .team-card:hover .team-avatar {
          transform: scale(1.15) rotate(5deg);
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Enhanced Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 8s ease-in-out infinite' }} />
          <div className="absolute top-3/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 6s ease-in-out infinite 2s' }} />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse" 
               style={{ animation: 'pulse 10s ease-in-out infinite 4s' }} />
        </div>

        {[...Array(30)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={Math.random() * 5} 
            size={Math.random() * 6 + 2}
            duration={Math.random() * 4 + 3}
          />
        ))}
      </div>

      <Navbar />

      {/* Enhanced Hero Section */}
      <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 pt-20">
        <div 
          className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-hero-title ${isVisible('section-0') ? 'visible' : ''}`}
          style={{ 
            textShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
            animationDelay: '0.2s'
          }}
        >
          Supernova Sol.
        </div>
        
        <div 
          className={`text-2xl md:text-4xl mb-4 text-gray-200 animate-bounce-in stagger-1 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          We provide{' '}
          <span className="text-gradient bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold animate-typewriter">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* <div 
          className={`text-2xl md:text-4xl font-semibold mb-8 text-gray-300 animate-fade-scale stagger-2 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          Innovative Digital Solutions Hub
        </div> */}
{/*         
        <p 
          className={`text-lg md:text-xl mb-12 max-w-4xl leading-relaxed text-gray-300 animate-slide-left stagger-3 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          At Supernova Solutions, we're dedicated to elevating your online presence with cutting-edge solutions. 
          Transform your digital landscape with our innovative strategies that drive exponential growth and unlock 
          unprecedented potential for your business in the digital age.
        </p> */}
        
        <button 
          className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-full transition-all duration-500 hover:scale-110 animate-glow animate-bounce-in stagger-4 ${isVisible('section-0') ? 'visible' : ''}`}
          style={{ 
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
            transform: 'translateY(0)',
          }}
        >
          Start Your Journey
        </button>
      </div>

      {/* Enhanced Digital Excellence Section */}
      <div ref={digitalExcellenceRef} className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h3 
              className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-slide-left ${isVisible('section-1') ? 'visible' : ''}`}
            >
              Digital Excellence Creators
            </h3>
            <p 
              className={`text-lg md:text-xl text-gray-300 leading-relaxed mb-8 animate-slide-left stagger-1 ${isVisible('section-1') ? 'visible' : ''}`}
            >
             At Supernova Solutions, we're dedicated to elevating your online presence with cutting-edge solutions. 
          Transform your digital landscape with our innovative strategies that drive exponential growth and unlock 
          unprecedented potential for your business in the digital age.
            </p>
            <div className="space-y-4">
              <div 
                className={`flex items-center space-x-3 animate-slide-left stagger-2 ${isVisible('section-1') ? 'visible' : ''}`}
              >
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-lg"> Marketing Solutions</span>
              </div>
              <div 
                className={`flex items-center space-x-3 animate-slide-left stagger-3 ${isVisible('section-1') ? 'visible' : ''}`}
              >
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-gray-300 text-lg">Data-Driven Growth Strategies</span>
              </div>
              <div 
                className={`flex items-center space-x-3 animate-slide-left stagger-4 ${isVisible('section-1') ? 'visible' : ''}`}
              >
                <div className="w-4 h-4 bg-purple-700 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-gray-300 text-lg">Premium Digital Transformation</span>
              </div>
            </div>
          </div>
          
          <div 
            className={`relative animate-slide-right ${isVisible('section-1') ? 'visible' : ''}`}
          >
            <div className="relative w-96 h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 to-blue-700/30 rounded-3xl backdrop-blur-md border border-blue-600/40 flex items-center justify-center transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-spin opacity-30" style={{ animationDuration: '8s' }}></div>
                  <p className="text-gray-300 font-semibold text-xl">Supernova</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Services Section */}
      <div ref={servicesRef} className="relative z-10 py-20 px-4">
        <h3 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${isVisible('section-2') ? 'visible' : ''}`}
        >
          Explore Our Premium Services
        </h3>
        
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
  {[
    { title: "SEO Optimization", desc: "Dominate search results with our advanced SEO strategies and optimization techniques.", icon: "🚀", path: "/services/seo-optimization" },
    { title: "Website Design & Development", desc: "Build modern, responsive, and SEO-friendly websites tailored to your business goals.", icon: "💻", path: "/services/website-development" },
    { title: "Google My Business", desc: "Maximize local visibility and attract high-quality customers with optimized GMB profiles.", icon: "📍", path: "/services/google-my-business" },
  ].map((service, index) => (
    <div
      key={index}
      id={`service-${index}`}
      className={`service-card bg-gradient-to-br from-gray-900/60 to-blue-900/60 backdrop-blur-md rounded-3xl p-8 text-white text-center border border-blue-600/40 card-hover animate-fade-scale stagger-${index + 1} ${isVisible('section-2') ? 'visible' : ''}`}
      style={{ 
        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
      }}
    >
      <div className="service-icon text-6xl mb-6 transform transition-all duration-300">{service.icon}</div>
      <h4 className="text-2xl font-bold mb-4 text-gray-300">{service.title}</h4>
      <p className="text-gray-300 leading-relaxed mb-6">{service.desc}</p>
      <button
        onClick={() => navigate(service.path)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
      >
        Learn More
      </button>
    </div>
  ))}
</div>

      </div>

      {/* Enhanced Pricing Section */}
      <div ref={pricingRef} className="relative z-10 py-20 px-4">
        <h3 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${isVisible('section-3') ? 'visible' : ''}`}
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
              className={`pricing-card relative bg-gradient-to-br from-gray-900/60 to-blue-900/60 backdrop-blur-md rounded-3xl p-8 text-white border transition-all duration-500 ${plan.popular ? 'border-blue-500 scale-105 shadow-2xl' : 'border-blue-600/40'} card-hover animate-fade-scale stagger-${index + 1} ${isVisible('section-3') ? 'visible' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm py-2 px-6 rounded-full font-semibold animate-pulse">
                  MOST POPULAR
                </div>
              )}
              <h4 className="text-2xl font-bold mb-4 text-center text-gray-300">{plan.name}</h4>
              <p className="text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {plan.price}<span className="text-lg text-gray-400">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-lg"><span className="text-green-400 mr-3 text-xl">✓</span>Premium GBP/Website Optimization</li>
                <li className="flex items-center text-lg"><span className="text-green-400 mr-3 text-xl">✓</span>Advanced Citations & Listings</li>
                <li className="flex items-center text-lg"><span className="text-green-400 mr-3 text-xl">✓</span>Professional Design Assets</li>
                <li className="flex items-center text-lg"><span className="text-green-400 mr-3 text-xl">✓</span>Analytics</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Team Section */}
      <div ref={teamRef} className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <h3 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${isVisible('section-4') ? 'visible' : ''}`}
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
              className={`team-card bg-gradient-to-br from-gray-900/60 to-blue-900/60 backdrop-blur-md rounded-3xl p-8 text-white text-center border border-blue-600/40 card-hover animate-fade-scale stagger-${index + 1} ${isVisible('section-4') ? 'visible' : ''}`}
            >
              <div className="team-avatar text-8xl mb-6 transform transition-all duration-300">{member.avatar}</div>
              <h4 className="text-xl font-bold mb-2 text-gray-300">{member.name}</h4>
              <p className="text-gray-300 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Customer Reviews */}
      <div ref={reviewsRef} className="relative z-10 py-20 px-4">
        <h3 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${isVisible('section-5') ? 'visible' : ''}`}
        >
          What Our Clients Say
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            { review: "Absolutely revolutionary! Supernova Solutions transformed our digital presence beyond our wildest expectations. The strategies delivered phenomenal results!", author: "Sarah Johnson", rating: 5 },
            { review: "Outstanding service and incredible results. The team's expertise in digital marketing is unmatched. Highly recommend for serious business growth!", author: "Michael Chen", rating: 5 },
          ].map((testimonial, index) => (
            <div
              key={index}
              id={`review-${index}`}
              className={`bg-gradient-to-br from-gray-900/60 to-blue-900/60 backdrop-blur-md rounded-3xl p-8 text-white border border-blue-600/40 card-hover transition-all duration-500 ${index % 2 === 0 ? 'animate-slide-left' : 'animate-slide-right'} stagger-${index + 1} ${isVisible('section-5') ? 'visible' : ''}`}
            >
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>⭐</span>
                ))}
              </div>
              <p className="text-xl italic mb-6 text-gray-300">"{testimonial.review}"</p>
              <p className="font-semibold text-gray-300 text-lg">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;