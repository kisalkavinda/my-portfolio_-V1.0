import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import DigitalRainBackground from './common/DigitalRainBackground';
import CursorTrail from './common/CursorTrail';

import Header from './common/Header';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Timeline from './sections/Timeline.jsx';
import Skills from './sections/Skills.jsx';
import NeuralNetwork3D from './sections/NeuralNetwork3D.jsx';
import LiveStats from './sections/LiveStats.jsx';
import Projects from './sections/Projects.jsx';
import Certificates from './sections/Certificates.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './common/Footer';
import SocialLinks from './common/SocialLinks';
import ScrollProgress from './common/ScrollProgress';
import ChatbotAssistant from './common/ChatbotAssistant';
import Preloader from './common/Preloader';

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSocialLinksOpen, setIsSocialLinksOpen] = useState(false);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <DigitalRainBackground />
          <CursorTrail />
          
          <ScrollProgress />
          <Header />
          <main className="w-full relative z-10">
            <Hero />
            <About />
            <Timeline />
            <Skills />
            <LiveStats />
            <Projects />
            {/* GitHubStats REMOVED - LiveStats has better real-time data */}
            <Certificates />
            <NeuralNetwork3D />
            <Contact />
          </main>
          <Footer />
          <SocialLinks 
            isSocialLinksOpen={isSocialLinksOpen} 
            setIsSocialLinksOpen={setIsSocialLinksOpen} 
            setIsChatbotOpen={setIsChatbotOpen}
          />
          <ChatbotAssistant 
            isChatbotOpen={isChatbotOpen} 
            setIsChatbotOpen={setIsChatbotOpen} 
            setIsSocialLinksOpen={setIsSocialLinksOpen}
          />
        </>
      )}
    </>
  );
};

export default MainLayout;