import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Testimonials = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
            console.log(`Element visible: ${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const elementsToObserve = [heroRef.current, testimonialsRef.current, ctaRef.current];
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

  // Scroll handler
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
        .testimonial-card:hover .testimonial-avatar {
          transform: scale(1.15) rotate(5deg);
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Dynamic Background */}
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
        <GlowingOrb size={150} color="blue" position={{ bottom: '20%', right: '15%' }} />
      </div>

      <Navbar />

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 sm:px-6 lg:px-8 pt-20">
        <div 
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-hero-title ${isVisible('section-0') ? 'visible' : ''}`}
          style={{ 
            textShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
            animationDelay: '0.2s'
          }}
        >
          Our Clients' Success Stories
        </div>
        <p 
          className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl leading-relaxed text-gray-300 animate-bounce-in stagger-1 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          Discover what our clients say about their transformative experiences with Novatec Sol’s AI-powered digital solutions.
        </p>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <h2 
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${isVisible('section-1') ? 'visible' : ''}`}
        >
          Testimonials
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              name: "Emily Carter",
              role: "CEO, TechTrend Innovations",
              quote: "Novatec Sol revolutionized our digital marketing with AI-driven strategies. Our ROI tripled in just six months!",
              avatar: "👩‍💼",
              rating: 5
            },
            {
              name: "Michael Lee",
              role: "Founder, GrowEasy Analytics",
              quote: "Their team’s expertise in AI and data analytics transformed our customer engagement. Highly recommend!",
              avatar: "👨‍💻",
              rating: 5
            },
            {
              name: "Sophia Nguyen",
              role: "Marketing Director, Visionary Brands",
              quote: "Working with Novatec Sol was a game-changer. Their innovative solutions gave us a competitive edge.",
              avatar: "👩‍🎓",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              id={`testimonial-${index}`}
              className={`testimonial-card bg-gradient-to-br from-gray-900/60 to-blue-900/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-white text-center border border-blue-600/40 card-hover animate-fade-scale stagger-${index + 1} ${isVisible('section-1') ? 'visible' : ''}`}
              style={{ boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)' }}
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl sm:text-2xl animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>⭐</span>
                ))}
              </div>
              <div className="testimonial-avatar text-4xl sm:text-5xl mb-4 transform transition-all duration-300">{testimonial.avatar}</div>
              <p className="text-gray-300 italic mb-4 text-sm sm:text-base">"{testimonial.quote}"</p>
              <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-300">{testimonial.name}</h4>
              <p className="text-gray-300 text-xs sm:text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div ref={ctaRef} className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <div 
          className={`max-w-4xl mx-auto text-center text-white animate-bounce-in ${isVisible('section-2') ? 'visible' : ''}`}
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in stagger-1 ${isVisible('section-2') ? 'visible' : ''}`}>
            Ready to Write Your Success Story?
          </h2>
          <p className={`text-base sm:text-lg md:text-xl mb-8 text-gray-300 animate-slide-left stagger-2 ${isVisible('section-2') ? 'visible' : ''}`}>
            Join our satisfied clients and transform your business with Novatec Sol. Contact us today!
          </p>
          <Link
            to="/contact"
            className={`inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-500 hover:scale-110 animate-glow animate-bounce-in stagger-3 ${isVisible('section-2') ? 'visible' : ''}`}
            style={{
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testimonials;