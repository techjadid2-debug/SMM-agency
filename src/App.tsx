import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './components/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppInner() {
  const { theme } = useAppContext();
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedService, setSelectedService] = useState('');

  // Smooth scroll handler
  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(elementId);
    }
  };

  // Select a service from card and scroll to contact form with prepopulation
  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    handleScrollTo('contact');
  };

  // Dynamic active section intersection observer
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'results', 'testimonials', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header trigger height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`transition-all duration-350 min-h-screen font-sans selection:bg-indigo-550 selection:text-white antialiased ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Dynamic Navigation Header */}
      <Header onScrollTo={handleScrollTo} activeSection={activeSection} />

      {/* Main Sections */}
      <main>
        {/* Hero Banner Section */}
        <Hero onScrollTo={handleScrollTo} />

        {/* About Agency Section */}
        <About />

        {/* Pricing / Packages options */}
        <Services onSelectService={handleSelectService} />

        {/* Results / Business case studies */}
        <Results />

        {/* Client Reviews */}
        <Testimonials />

        {/* Lead Generation form with Server & Telegram webhook trigger */}
        <Contact selectedService={selectedService} />
      </main>

      {/* Footer block */}
      <Footer onScrollTo={handleScrollTo} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
