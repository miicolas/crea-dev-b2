import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import EmotionScene from './EmotionScene';
import AudioPlayer from './AudioPlayer';

const EmotionSection = ({ emotion, onNext, onPrev, totalEmotions, currentIndex }) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setScrollProgress(value);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  useEffect(() => {
    // Change background color based on the emotion
    document.documentElement.style.setProperty('--emotion-color', emotion.color);
    document.documentElement.style.setProperty('--emotion-accent', emotion.accent);
    
    return () => {
      // Reset on cleanup
      document.documentElement.style.setProperty('--emotion-color', '');
      document.documentElement.style.setProperty('--emotion-accent', '');
    };
  }, [emotion]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        onNext();
      } else if (e.deltaY < 0) {
        onPrev();
      }
    };

    const currentRef = sectionRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [onNext, onPrev]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.8
      }
    }
  };

  // Animation pour le titre flottant
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -30, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.8, 0.5, 0.2]);
  
  // Animation variants spécifiques à chaque émotion
  const emotionAnimations = {
    desespoir: {
      ambient: (
        <motion.div 
          className="ambient-animation desespoir"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="shadow-particle"></div>
          <div className="shadow-particle"></div>
          <div className="shadow-particle"></div>
        </motion.div>
      ),
      textEffect: {
        initial: { 
          letterSpacing: "0em",
          color: "rgba(255, 255, 255, 0.7)" 
        },
        animate: { 
          letterSpacing: "0.05em",
          color: "rgba(255, 255, 255, 0.9)",
          transition: { 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      }
    },
    acceptation: {
      ambient: (
        <motion.div 
          className="ambient-animation acceptation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="wave"
            initial={{ y: 0 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          ></motion.div>
        </motion.div>
      ),
      textEffect: {
        initial: { 
          y: 0,
          opacity: 0.7
        },
        animate: { 
          y: [-5, 0, -5],
          opacity: [0.7, 1, 0.7],
          transition: { 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      }
    },
    espoir: {
      ambient: (
        <motion.div 
          className="ambient-animation espoir"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="light-source"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              className="light-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                scale: Math.random() * 0.8 + 0.4
              }}
              animate={{
                y: [0, -Math.random() * 20 - 10, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            ></motion.div>
          ))}
        </motion.div>
      ),
      textEffect: {
        initial: { 
          filter: "brightness(1)" 
        },
        animate: { 
          filter: "brightness(1.3)",
          transition: { 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      }
    }
  };

  // Animation spécifique à l'émotion courante
  const currentAnimation = emotionAnimations[emotion.id] || emotionAnimations.desespoir;
  
  return (
    <motion.div 
      ref={sectionRef}
      className={`emotion-section ${emotion.id}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Scène immersive */}
      <EmotionScene emotion={emotion} progress={scrollProgress} />
      
      {/* Audio player */}
      <AudioPlayer emotionId={emotion.id} />
      
      <div className="emotion-content">
        <motion.div 
          className="emotion-title-floating"
          style={{ 
            y: titleY,
            opacity: titleOpacity,
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}
        >
          <h2 className="emotion-name">{emotion.name}</h2>
        </motion.div>
        
        {/* Navigation minimale */}
        <motion.div 
          className="emotion-minimal-nav"
          variants={itemVariants}
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '0',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            zIndex: 10
          }}
        >
          <motion.button 
            onClick={onPrev}
            className="nav-button prev"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentIndex === 0}
          >
            ←
          </motion.button>
          
          <div className="nav-indicator">
            {currentIndex + 1}/{totalEmotions}
          </div>
          
          <motion.button 
            onClick={onNext}
            className="nav-button next"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentIndex === totalEmotions - 1}
          >
            →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmotionSection; 