import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ImageTransition from './ImageTransition';
import ParallaxImages from './ParallaxImages';

const EmotionScene = ({ emotion, progress }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [transitionType, setTransitionType] = useState('fade');
  
  // Images pour chaque émotion
  const emotionImages = {
    desespoir: [
      '/images/desespoir/scene1.jpg',
      '/images/desespoir/scene2.jpg',
      '/images/desespoir/scene3.jpg',
    ],
    acceptation: [
      '/images/acceptation/scene1.jpg',
      '/images/acceptation/scene2.jpg',
      '/images/acceptation/scene3.jpg',
    ],
    espoir: [
      '/images/espoir/scene1.jpg',
      '/images/espoir/scene2.jpg',
      '/images/espoir/scene3.jpg',
    ]
  };
  
  // Styles d'animation pour chaque émotion
  const emotionStyles = {
    desespoir: {
      filter: 'saturate(0.7) contrast(1.2) brightness(0.7)',
      background: 'radial-gradient(circle at center, rgba(30, 45, 64, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%)'
    },
    acceptation: {
      filter: 'saturate(0.9) contrast(1.1) brightness(0.9)',
      background: 'radial-gradient(circle at center, rgba(70, 87, 117, 0.6) 0%, rgba(30, 40, 60, 0.8) 100%)'
    },
    espoir: {
      filter: 'saturate(1.1) contrast(1) brightness(1.1)',
      background: 'radial-gradient(circle at center, rgba(118, 148, 159, 0.5) 0%, rgba(40, 60, 80, 0.7) 100%)'
    }
  };
  
  // Transitions pour chaque émotion
  const emotionTransitions = {
    desespoir: ['fade', 'blur'],
    acceptation: ['slide', 'reveal'],
    espoir: ['zoom', 'fade']
  };
  
  // Modifier l'image et le type de transition à intervalle régulier
  useEffect(() => {
    const images = emotionImages[emotion.id] || [];
    const transitions = emotionTransitions[emotion.id] || ['fade'];
    
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setImageIndex(prev => (prev + 1) % images.length);
      setTransitionType(transitions[Math.floor(Math.random() * transitions.length)]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [emotion.id]);
  
  // Mots d'émotion qui apparaissent et disparaissent
  const emotionWords = {
    desespoir: ['solitude', 'vide', 'obscurité', 'perte', 'lourdeur'],
    acceptation: ['réalité', 'présent', 'conscience', 'chemin', 'transition'],
    espoir: ['lumière', 'possible', 'demain', 'renouveau', 'souffle']
  };
  
  const currentStyle = emotionStyles[emotion.id] || {};
  const currentImages = emotionImages[emotion.id] || [];
  const currentWords = emotionWords[emotion.id] || [];
  
  return (
    <div className="emotion-scene" style={{ ...currentStyle }}>
      <div className="scene-background">
        <ImageTransition 
          images={currentImages}
          currentIndex={imageIndex}
          transitionType={transitionType}
          duration={1.2}
          emotionId={emotion.id}
        />
      </div>
      
      <ParallaxImages emotionId={emotion.id} />
      
      <div className="emotion-words">
        {currentWords.map((word, index) => (
          <motion.span
            key={word}
            className="floating-word"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              y: [20, 0, -20]
            }}
            transition={{
              duration: 8,
              delay: index * 2,
              repeat: Infinity,
              repeatDelay: currentWords.length * 2
            }}
            style={{
              left: `${(index * 20) % 80 + 10}%`,
              top: `${(index * 15) % 70 + 15}%`,
              fontSize: `${1 + (index % 3) * 0.5}rem`
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default EmotionScene; 