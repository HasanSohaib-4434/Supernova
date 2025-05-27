import { useState, useEffect, useRef } from "react";
import Navbar from './Navbar.jsx';

const Testimonials = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    // Observe sections
    const elementsToObserve = [
      heroRef.current,
      testimonialsRef.current,
      ctaRef.current
    ];

    elementsToObserve.forEach((el, index) => {
      if (el) {
        el.id = `section-${index}`;
        observer.observe(el);
      }
    });

    // Observe individual cards
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
          className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${isVisible('section-0') ? 'visible' : ''}`}
          style={{ 
            textShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
          }}
        >
          Our Clients' Success Stories
        </div>
        
        <p 
          className={`text-lg md:text-xl mb-12 max-w-4xl leading-relaxed text-gray-300 animate-on-scroll stagger-1 ${isVisible('section-0') ? 'visible' : ''}`}
        >
          Discover what our clients say about their transformative experiences with Novatec Sol’s AI-powered digital solutions.
        </p>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="relative z-10 py-20 px-4">
        <h2 
          className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent animate-on-scroll ${isVisible('section-1') ? 'visible' : ''}`}
        >
          Testimonials
        </h2>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Emily Carter",
              role: "CEO, TechTrend Innovations",
              quote: "Novatec Sol revolutionized our digital marketing with AI-driven strategies. Our ROI tripled in just six months!",
              avatar: "👩‍💼"
            },
            {
              name: "Michael Lee",
              role: "Founder, GrowEasy Analytics",
              quote: "Their team’s expertise in AI and data analytics transformed our customer engagement. Highly recommend!",
              avatar: "👨‍💻"
            },
            {
              name: "Sophia Nguyen",
              role: "Marketing Director, Visionary Brands",
              quote: "Working with Novatec Sol was a game-changer. Their innovative solutions gave us a competitive edge.",
              avatar: "👩‍🎓"
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              id={`testimonial-${index}`}
              className={`bg-gradient-to-br from-gray-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-6 text-white text-center border border-blue-600/30 card-hover animate-on-scroll stagger-${index + 1} ${isVisible('section-1') ? 'visible' : ''}`}
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              <h4 className="text-xl font-bold mb-2 text-gray-300">{testimonial.name}</h4>
              <p className="text-gray-300 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div ref={ctaRef} className="relative z-10 py-20 px-4">
        <div 
          className={`max-w-4xl mx-auto text-center text-white animate-on-scroll ${isVisible('section-2') ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our satisfied clients and transform your business with Novatec Sol. Contact us today!
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-glow"
          >
            Get in Touch
          </a>
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
              <p className="text-lg font-semibold text-white">+1 (646) 930-8617</p>
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

export default Testimonials;