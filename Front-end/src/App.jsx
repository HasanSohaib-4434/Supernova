import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '../src/componests/Home';
import Services from '../src/componests/Services';
import AboutUs from '../src/componests/AboutUs';
import ContactUs from '../src/componests/ContactUs';
import Testimonials from '../src/componests/Testimonials';
import Location from '../src/componests/Location';

import SEOOptimization from '../src/componests/services/SEOOptimization';
import GraphicDesign from '../src/componests/services/GraphicDesign';
import GoogleMyBusiness from '../src/componests/services/GoogleMyBusiness';
import SocialMediaMarketing from '../src/componests/services/SocialMediaMarketing';
import WebsiteDevelopment from '../src/componests/services/WebsiteDevelopment';
import AIMarketingAutomation from '../src/componests/services/AIMarketingAutomation';

import AnalyticsReporting from '../src/componests/services/AnalyticsReporting';
import ContentMarketing from '../src/componests/services/ContentMarketing';
import EmailMarketing from '../src/componests/services/EmailMarketing';
import PayPerClickAdvertising from '../src/componests/services/PayPerClickAdvertising';
import BrandingReputationManagement from '../src/componests/services/BrandingReputationManagement';


import PrivacyPolicy from '../src/componests/terms/PrivacyPolicy.jsx';
import TermsAndConditions from '../src/componests/terms/TermsAndConditions.jsx';
import CancellationRefundPolicy from '../src/componests/terms/CancellationRefundPolicy.jsx';
import SecureCardTransmissionPolicy from '../src/componests/terms/SecureCardTransmissionPolicy.jsx';


import Logo from '../src/componests/Logo.jsx';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(scrollToTop);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/location" element={<Location />} />
          <Route path="/services/seo-optimization" element={<SEOOptimization />} />
        <Route path="/services/graphic-design" element={<GraphicDesign />} />
        <Route path="/services/google-my-business" element={<GoogleMyBusiness />} />
        <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
        <Route path="/services/ai-marketing-automation" element={<AIMarketingAutomation />} />
        <Route path="/services/AnalyticsReporting" element={<AnalyticsReporting />} />
        <Route path="/services/ContentMarketing" element={<ContentMarketing />} />
        <Route path="/services/EmailMarketing" element={<EmailMarketing />} />
        <Route path="/services/PayPerClickAdvertising" element={<PayPerClickAdvertising />} />
          <Route path="/services/BrandingReputationManagement" element={<BrandingReputationManagement />} />
          
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />
          <Route path="/secure-card-transmission-policy" element={<SecureCardTransmissionPolicy/>} />
                    <Route path="/logo" element={<Logo/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;