import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Location = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [mapError, setMapError] = useState(false);

  const heroRef = useRef(null);
  const locationRef = useRef(null);
  const ctaRef = useRef(null);
  const mapRef = useRef(null);

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

    const elementsToObserve = [heroRef.current, locationRef.current, ctaRef.current];
    elementsToObserve.forEach((el, index) => {
      if (el) {
        el.id = `section-${index}`;
        observer.observe(el);
      }
    });

    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach(card => observer.observe(card));

    if (mapRef.current) {
      mapRef.current.id = 'map-section';
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMap = () => {
      if (mapRef.current) {
        const iframe = mapRef.current.querySelector('iframe');
        if (iframe && !iframe.contentWindow) {
          setMapError(true);
        } else {
          setMapError(false);
        }
      }
    };
    const timer = setTimeout(checkMap, 2000);
    return () => clearTimeout(timer);
  }, []);

  const isVisible = (elementId) => visibleElements.has(elementId);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 overflow-hidden">
      <style jsx>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3) translateY(50px); }
          50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
          70% { transform: scale(0.9) translateY(5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.4); }
        }
        .animate-bounceIn {
          animation: bounceIn 1.2s ease-out forwards;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .map-container {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.5);
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
          z-index: 10;
        }
        .map-error {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 99, 71, 0.5);
          border-radius: 1rem;
          padding: 1rem;
          text-align: center;
          color: #f9fafb;
        }
      `}</style>

      <Navbar />

      <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 pt-20">
        <div className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ${isVisible('section-0') ? 'animate-bounceIn' : ''}`}>Visit Us</div>
        <p className={`text-lg md:text-xl mb-12 max-w-4xl leading-relaxed text-gray-300 ${isVisible('section-0') ? 'animate-bounceIn' : ''}`}>
          Find Supernova Solutions LLC at our office in Albuquerque, NM, near Jerry Cline Park, where innovation drives your digital success.
        </p>
        <Link
          to="/contact"
          className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-500 hover:scale-110 animate-glow ${isVisible('section-0') ? 'animate-bounceIn' : ''}`}
        >
          Get in Touch
        </Link>
      </div>

      <div ref={locationRef} className="relative z-10 py-20 px-4">
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ${isVisible('section-1') ? 'animate-bounceIn' : ''}`}>Our Location</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-gradient-to-br from-gray-900/60 to-blue-900/60 backdrop-blur-md rounded-3xl p-8 border border-blue-600/40 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-300">Headquarters</h3>
              <p className="text-gray-300 mb-4">
                Supernova Solutions LLC<br />
                1209 Mountain Rd Pl NE, Albuquerque, NM 87110, USA
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Phone:</strong> +1 (646) 930-8617<br />
                <strong>Email:</strong> <a href="mailto:info@supernovasolutionsllc.com" className="text-blue-400 hover:underline">info@supernovasolutionsllc.com</a>
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Landmark:</strong> Near Jerry Cline Park (~0.5 miles)
              </p>
              <Link to="/contact" className="inline-block mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:scale-105 animate-glow">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <div ref={mapRef} className="map-container">
              {mapError ? (
                <div className="map-error h-96 flex flex-col items-center justify-center">
                  <p className="text-red-200 mb-2">Unable to load map. Please try again later.</p>
                  <a
                    href="https://www.google.com/maps/place/1209+Mountain+Rd+Pl+NE,+Albuquerque,+NM+87110,+USA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              ) : (
                <iframe
                  className="w-full h-96 rounded-lg border-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.6082772764125!2d-106.558027!3d35.0915191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87220a95517c54df%3A0x3e76bfbf9c67468!2s1209%20Mountain%20Rd%20Pl%20NE%2C%20Albuquerque%2C%20NM%2087110%2C%20USA!5e0!3m2!1sen!2s!4v1751976817901!5m2!1sen!2s"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Supernova Solutions LLC Location"
                  onError={() => setMapError(true)}
                ></iframe>
              )}
              <p className="text-gray-300 mt-4 text-center px-4">
                Our office is located just 0.5 miles from Jerry Cline Park in Albuquerque’s Uptown area.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div ref={ctaRef} className="relative z-10 py-20 px-4">
        <div className={`max-w-4xl mx-auto text-center text-white ${isVisible('section-2') ? 'animate-bounceIn' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Connect With Us
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Drop by our Albuquerque office near Jerry Cline Park or reach out online to start your digital transformation journey with Supernova Solutions LLC.
          </p>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-500 hover:scale-110 animate-glow"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Location;
