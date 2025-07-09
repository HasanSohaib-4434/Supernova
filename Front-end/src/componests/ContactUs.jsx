import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar.jsx';

const ContactUs = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const ctaRef = useRef(null);
  const servicesRef = useRef(null);
    const navigate = useNavigate();


  // Intersection Observer setup for all sections
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
      infoRef.current,
      ctaRef.current,
      servicesRef.current
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
        @keyframes morphing {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes floatingIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
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
        .info-card:hover .info-icon {
          transform: scale(1.2) rotate(10deg);
          transition: all 0.3s ease;
        }
        .morphing-bg {
          animation: morphing 15s ease-in-out infinite;
        }
        .floating-icon {
          animation: floatingIcon 3s ease-in-out infinite;
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 2000px 100%;
          animation: shimmer 3s infinite;
        }
        .contact-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #8B5CF6, #3B82F6);
          border-radius: 9999px;
          padding: 1rem 2rem;
          font-weight: bold;
          color: white;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }
        .contact-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
        }
        .contact-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        .contact-button:hover::before {
          left: 100%;
        }
        .service-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(55, 65, 81, 0.6), rgba(37, 99, 235, 0.6));
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid rgba(59, 130, 246, 0.4);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .service-card:hover::before {
          opacity: 1;
        }
        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3);
        }
      `}</style>

      {/* Enhanced Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 md:w-[500px] md:h-[500px] bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full filter blur-3xl animate-pulse morphing-bg"
            style={{ animation: 'pulse 8s ease-in-out infinite, morphing 15s ease-in-out infinite' }}
          />
          <div
            className="absolute top-3/4 right-1/4 w-80 h-80 md:w-[400px] md:h-[400px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full filter blur-3xl animate-pulse morphing-bg"
            style={{ animation: 'pulse 6s ease-in-out infinite 2s, morphing 12s ease-in-out infinite 3s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse morphing-bg"
            style={{ animation: 'pulse 10s ease-in-out infinite 4s, morphing 20s ease-in-out infinite 1s' }}
          />
        </div>

        {[...Array(40)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={Math.random() * 5}
            size={Math.random() * 8 + 2}
            duration={Math.random() * 6 + 3}
          />
        ))}

        <GlowingOrb size={250} color="purple" position={{ top: '10%', left: '5%' }} />
        <GlowingOrb size={200} color="blue" position={{ top: '60%', right: '5%' }} />
        <GlowingOrb size={180} color="purple" position={{ bottom: '20%', left: '20%' }} />
      </div>

  <Navbar />
      {/* Enhanced Hero Section */}
      <div
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 pt-20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-6xl opacity-10 floating-icon">⚡</div>
          <div className="absolute top-40 right-20 text-5xl opacity-10 floating-icon" style={{ animationDelay: '1s' }}>🚀</div>
          <div className="absolute bottom-40 left-20 text-4xl opacity-10 floating-icon" style={{ animationDelay: '2s' }}>✨</div>
        </div>

        <div
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-hero-title ${
            isVisible('section-0') ? 'visible' : ''
          }`}
          style={{ 
            textShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
            animationDelay: '0.2s',
            backgroundSize: '200% 100%',
            animation: 'heroTitle 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards, shimmer 3s infinite'
          }}
        >
          Let's Connect & Create
        </div>
        
        <p
          className={`text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl leading-relaxed text-gray-300 animate-bounce-in stagger-1 ${
            isVisible('section-0') ? 'visible' : ''
          }`}
        >
          Ready to transform your digital presence? We're here to turn your vision into reality. Let's start an amazing journey together!
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 animate-bounce-in stagger-2 ${isVisible('section-0') ? 'visible' : ''}`}>
          <button
            onClick={() => infoRef.current.scrollIntoView({ behavior: 'smooth' })}
            className="contact-button"
          >
            Get Started Now
          </button>
          <button
            onClick={() => servicesRef.current.scrollIntoView({ behavior: 'smooth' })}
            className="contact-button"
            style={{ 
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
              border: '2px solid rgba(59, 130, 246, 0.5)'
            }}
          >
            Our Services
          </button>
        </div>
      </div>

      {/* New Services Preview Section */}
      <div
        ref={servicesRef}
        className="relative z-10 py-20 px-4"
      >
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${
            isVisible('section-3') ? 'visible' : ''
          }`}
        >
          What We Do Best
        </h2>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Web Development",
              description: "Cutting-edge websites that captivate and convert",
              icon: "🌐",
              gradient: "from-purple-500 to-blue-500"
            },
        {
  title: "Google My Business",
  description: "Boost local visibility with optimized listings",
  icon: "📍",
  gradient: "from-green-500 to-emerald-500"
},
            {
  title: "PPC Advertising",
  description: "Drive targeted traffic through paid ads",
  icon: "💰",
  gradient: "from-pink-500 to-red-500"
},
           {
  title: "SEO Optimization",
  description: "Improve rankings and organic traffic",
  icon: "🔍",
  gradient: "from-yellow-500 to-orange-500"
},
           {
  title: "Social Media Marketing",
  description: "Boost brand presence across platforms",
  icon: "📣",
  gradient: "from-purple-500 to-pink-500"
},
           {
  title: "Email Marketing",
  description: "Engage customers with targeted emails",
  icon: "📧",
  gradient: "from-yellow-500 to-orange-500"
}

          ].map((service, index) => (
            <div
              key={index}
              className={`service-card animate-fade-scale stagger-${index + 1} ${
                isVisible('section-3') ? 'visible' : ''
              }`}
            >
              <div className="relative z-10">
                <div className={`text-4xl mb-4 floating-icon`} style={{ animationDelay: `${index * 0.2}s` }}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Contact Information Section */}
      <div
        ref={infoRef}
        className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30"
      >
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-bounce-in ${
            isVisible('section-1') ? 'visible' : ''
          }`}
        >
          Ready to Connect?
        </h2>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Call Us",
              value: "+1 (646) 930-8617",
              description: "Let's talk about your project",
              icon: "📞",
              action: "tel:+16469308617",
              gradient: "from-green-500 to-emerald-500"
            },
            {
              title: "Email Us",
              value: "info@nsupernovasolutions.com",
              description: "Send us your requirements",
              icon: "📧",
              action: "mailto:info@supernovasolutions.com?subject=Project%20Inquiry",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              title: "Follow Us",
              value: "Stay Connected",
              description: "Join our growing community",
              icon: "🌐",
              action: "#",
              gradient: "from-purple-500 to-pink-500"
            }
          ].map((info, index) => (
            <div
              key={index}
              className={`info-card bg-gradient-to-br from-gray-900/80 to-blue-900/80 backdrop-blur-md rounded-3xl p-8 text-white text-center border border-blue-600/40 card-hover animate-fade-scale stagger-${index + 1} ${
                isVisible('section-1') ? 'visible' : ''
              }`}
              style={{ 
                boxShadow: '0 15px 35px rgba(59, 130, 246, 0.2)',
              }}
            >
              <div className="relative">
                <div className={`info-icon text-6xl mb-6 floating-icon`} style={{ animationDelay: `${index * 0.3}s` }}>
                  {info.icon}
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-20 rounded-full blur-xl`}></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-gray-200">{info.title}</h3>
              <p className="text-lg font-semibold mb-2 text-white">{info.value}</p>
              <p className="text-gray-400 mb-6 text-sm">{info.description}</p>
              
              <a
                href={info.action}
                className={`inline-block bg-gradient-to-r ${info.gradient} hover:shadow-lg hover:shadow-blue-500/25 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 animate-glow`}
              >
                {info.title === "Follow Us" ? "Connect" : "Contact Now"}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Call to Action Section */}
      <div
        ref={ctaRef}
        className="relative z-10 py-20 px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
        
        <div
          className={`max-w-5xl mx-auto text-center text-white relative z-10 animate-bounce-in ${
            isVisible('section-2') ? 'visible' : ''
          }`}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-2xl animate-pulse"></div>
          </div>
          
          <h2
            className={`text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-bounce-in stagger-1 ${
              isVisible('section-2') ? 'visible' : ''
            }`}
            style={{ 
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s infinite'
            }}
          >
            Ready to Transform Your Business?
          </h2>
          
          <p
            className={`text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto animate-slide-left stagger-2 ${
              isVisible('section-2') ? 'visible' : ''
            }`}
          >
            Don't let your competitors get ahead. Let's build something extraordinary together and take your business to the next level!
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in stagger-3 ${isVisible('section-2') ? 'visible' : ''}`}>
            <button
              onClick={() => window.location.href = 'tel:+16469308617'}
              className="contact-button"
            >
              Call Now - Let's Talk!
            </button>
            <button
              onClick={() => window.location.href = 'mailto:info@supernovasolutions.com?subject=Project%20Inquiry'}
              className="contact-button"
              style={{ 
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
                border: '2px solid rgba(59, 130, 246, 0.6)'
              }}
            >
              Email Us Today
            </button>
          </div>
        </div>
      </div>

      {/* Footer would go here */}
      <div className="relative z-10 py-20 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md text-center text-white border-t border-blue-600/30">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-300 hover:text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text transition-all duration-300 cursor-default">
            Copyright © 2025 All Rights Reserved by Supernova Solutions - Transforming Digital Futures
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;