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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button 
            className={`nav-dot hover-grow ${currentSection === 'landing' ? 'active' : ''}`}
            onClick={() => navigateToEmotion('landing')}
            aria-label="Aller à la page d'accueil"
            whileHover={{ 
              scale: 1.2, 
              transition: { duration: 0.2 } 
            }}
            whileTap={{ 
              scale: 0.9, 
              transition: { duration: 0.1 } 
            }}
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ 
              scale: currentSection === 'landing' ? 1.1 : 1, 
              opacity: currentSection === 'landing' ? 1 : 0.7,
              boxShadow: currentSection === 'landing' ? '0 0 8px rgba(255,255,255,0.5)' : 'none'
            }}
            transition={{ duration: 0.3 }}
          />
          {emotions.map((emotion, index) => (
            <motion.button 
              key={emotion.id}
              className={`nav-dot hover-grow ${currentSection === emotion.id ? 'active' : ''}`}
              onClick={() => navigateToEmotion(emotion.id)}
              aria-label={`Aller à la section ${emotion.name}`}
              whileHover={{ 
                scale: 1.2, 
                backgroundColor: emotion.accent,
                transition: { duration: 0.2 } 
              }}
              whileTap={{ 
                scale: 0.9, 
                transition: { duration: 0.1 } 
              }}
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ 
                scale: currentSection === emotion.id ? 1.1 : 1, 
                opacity: currentSection === emotion.id ? 1 : 0.7,
                backgroundColor: currentSection === emotion.id ? emotion.accent : '',
                boxShadow: currentSection === emotion.id ? `0 0 8px ${emotion.accent}` : 'none'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

