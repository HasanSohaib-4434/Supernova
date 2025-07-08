import { useState, useEffect, useRef } from "react";
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);

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

    const elementsToObserve = [
      heroRef.current,
      storyRef.current,
      teamRef.current,
      ctaRef.current
    ];

    elementsToObserve.forEach((el, index) => {
      if (el) {
        el.id = `section-${index}`;
        observer.observe(el);
      }
    });

    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach(card => observer.observe(card));

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
        .stagger-1 { transition-delay: 0.2s; }
        .stagger-2 { transition-delay: 0.4s; }
        .stagger-3 { transition-delay: 0.6s; }
        .stagger-4 { transition-delay: 0.8s; }
        .stagger-5 { transition-delay: 1s; }
        .stagger-6 { transition-delay: 1.2s; }
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

        <GlowingOrb size={200} color="purple" position={{ top: '10%', left: '10%' }} />
        <GlowingOrb size={150} color="blue" position={{ top: '70%', right: '10%' }} />
      </div>

      <Navbar />

      {/* Enhanced Hero Section */}
      <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 pt-20">
        <div 
          className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-hero-title ${isVisible('section-0') ? 'visible' : ''}`}
          style={{ 
            textShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
            animationDelay: '0.2s'
          }}
        >
          About Novatec Sol
        </div>
        
        <p 
          className={`text-lg md:text-xl mb-12 max-w-4xl leading-relaxed text-gray-300 animate-bounce-in stagger-1 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          At Novatec Sol, we are pioneers in AI-powered digital solutions, dedicated to transforming businesses through innovation, creativity, and data-driven strategies.
        </p>

        <button 
          className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-500 hover:scale-110 animate-glow animate-bounce-in stagger-2 ${isVisible('section-0') ? 'visible' : ''}`}
          style={{ 
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
            transform: 'translateY(0)',
          }}
        >
          Discover Our Vision
        </button>
      </div>

      {/* Enhanced Our Story Section */}
      <div ref={storyRef} className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <h2 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${isVisible('section-1') ? 'visible' : ''}`}
        >
          Our Story
        </h2>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            className={`text-white animate-slide-left ${isVisible('section-1') ? 'visible' : ''}`}
          >
            <h3 
              className={`text-2xl font-bold mb-4 text-gray-300 animate-slide-left stagger-1 ${isVisible('section-1') ? 'visible' : ''}`}
            >
              Who We Are
            </h3>
            <p 
              className={`text-gray-300 leading-relaxed mb-6 animate-slide-left stagger-2 ${isVisible('section-1') ? 'visible' : ''}`}
            >
              Founded in 2020, Novatec Sol emerged with a vision to revolutionize digital marketing through artificial intelligence. Our team of experts combines technical prowess with creative excellence to deliver unparalleled results for businesses worldwide.
            </p>
            <h3 
              className={`text-2xl font-bold mb-4 text-gray-300 animate-slide-left stagger-3 ${isVisible('section-1') ? 'visible' : ''}`}
            >
              Our Mission
            </h3>
            <p 
              className={`text-gray-300 leading-relaxed animate-şi-left stagger-4 ${isVisible('section-1') ? 'visible' : ''}`}
            >
              We empower businesses to achieve exponential growth by leveraging cutting-edge AI technologies, innovative strategies, and a passion for transforming digital landscapes.
            </p>
          </div>
          <div 
            className={`relative animate-slide-right ${isVisible('section-1') ? 'visible' : ''}`}
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 to-blue-700/30 rounded-3xl backdrop-blur-md border border-blue-600/40 flex items-center justify-center transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-spin opacity-30" style={{ animationDuration: '8s' }}></div>
                  <p className="text-gray-300 font-semibold text-xl">Innovation Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Team Section */}
      <div ref={teamRef} className="relative z-10 py-20 px-4">
        <h2 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${isVisible('section-2') ? 'visible' : ''}`}
        >
          Our Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { name: "John Williams", role: "Business Development Manager", avatar: "👨‍💼" },
            { name: "Sarah Johnson", role: "AI Strategy Lead", avatar: "👩‍💻" },
            { name: "Mark Edward", role: "Customer Success Manager", avatar: "👨‍🎓" },
          ].map((member, index) => (
            <div
              key={index}
              id={`team-${index}`}
              className={`team-card bg-gradient-to-br from-gray-900/60 to-blue-900/60 backdrop-blur-md rounded-3xl p-8 text-white text-center border border-blue-600/40 card-hover animate-fade-scale stagger-${index + 1} ${isVisible('section-2') ? 'visible' : ''}`}
              style={{ 
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
              }}
            >
              <div className="team-avatar text-8xl mb-6 transform transition-all duration-300">{member.avatar}</div>
              <h4 className="text-xl font-bold mb-2 text-gray-300">{member.name}</h4>
              <p className="text-gray-300 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Call to Action Section */}
      <div ref={ctaRef} className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <div 
          className={`max-w-4xl mx-auto text-center text-white animate-bounce-in ${isVisible('section-3') ? 'visible' : ''}`}
        >
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in stagger-1 ${isVisible('section-3') ? 'visible' : ''}`}
          >
            Join Our Journey
          </h2>
          <p 
            className={`text-xl mb-8 text-gray-300 animate-slide-left stagger-2 ${isVisible('section-3') ? 'visible' : ''}`}
          >
            Partner with Novatec Sol to unlock your business’s digital potential. Let’s create the future together.
          </p>
          <button 
            className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-500 hover:scale-110 animate-glow animate-bounce-in stagger-3 ${isVisible('section-3') ? 'visible' : ''}`}
            style={{ 
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
              transform: 'translateY(0)',
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;