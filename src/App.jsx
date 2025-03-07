import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './App.css';
import LandingPage from './components/LandingPage';
import EmotionSection from './components/EmotionSection';

export default function App() {
  const [currentSection, setCurrentSection] = useState('landing');
  const [hasVisitedLanding, setHasVisitedLanding] = useState(false);

  const emotions = [
    {
      id: 'desespoir',
      name: 'Désespoir',
      color: '#1E2D40',
      accent: '#5D84A6',
      description: "Obscurité"
    },
    {
      id: 'acceptation',
      name: 'Acceptation',
      color: '#465775',
      accent: '#A69CAC',
      description: "Présent"
    },
    {
      id: 'espoir',
      name: 'Espoir',
      color: '#76949F',
      accent: '#CBBFBB',
      description: "Lumière"
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        navigateNextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        navigatePrevSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection]);

  const navigateToEmotion = (emotionId) => {
    setCurrentSection(emotionId);
    if (!hasVisitedLanding && currentSection === 'landing') {
      setHasVisitedLanding(true);
    }
  };

  const navigateNextSection = () => {
    if (currentSection === 'landing') {
      navigateToEmotion('desespoir');
    } else {
      const currentIndex = emotions.findIndex(emotion => emotion.id === currentSection);
      if (currentIndex < emotions.length - 1) {
        navigateToEmotion(emotions[currentIndex + 1].id);
      }
    }
  };

  const navigatePrevSection = () => {
    if (currentSection !== 'landing') {
      const currentIndex = emotions.findIndex(emotion => emotion.id === currentSection);
      if (currentIndex > 0) {
        navigateToEmotion(emotions[currentIndex - 1].id);
      } else if (currentIndex === 0) {
        navigateToEmotion('landing');
      }
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {currentSection === 'landing' ? (
          <LandingPage 
            key="landing" 
            onExplore={navigateNextSection} 
          />
        ) : (
          <EmotionSection 
            key={currentSection}
            emotion={emotions.find(emotion => emotion.id === currentSection)}
            onNext={navigateNextSection}
            onPrev={navigatePrevSection}
            totalEmotions={emotions.length}
            currentIndex={emotions.findIndex(emotion => emotion.id === currentSection)}
          />
        )}
      </AnimatePresence>

      {hasVisitedLanding && (
        <motion.div 
          className="navigation-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button 
            className={`nav-dot ${currentSection === 'landing' ? 'active' : ''}`}
            onClick={() => navigateToEmotion('landing')}
            aria-label="Aller à la page d'accueil"
          />
          {emotions.map((emotion, index) => (
            <button 
              key={emotion.id}
              className={`nav-dot ${currentSection === emotion.id ? 'active' : ''}`}
              onClick={() => navigateToEmotion(emotion.id)}
              aria-label={`Aller à la section ${emotion.name}`}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

