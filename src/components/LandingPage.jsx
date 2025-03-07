import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const LandingPage = ({ onExplore }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const logoVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: 1.05,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  // Particules flottantes pour l'ambiance
  const particleCount = 20;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }));

  // Animation circulaire pour l'arrière-plan
  const circleCount = 3;
  const circles = Array.from({ length: circleCount }, (_, i) => ({
    id: i,
    radius: Math.random() * 300 + 100,
    startAngle: Math.random() * 360,
    speed: Math.random() * 20 + 10,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.2 + 0.1,
    clockwise: Math.random() > 0.5
  }));

  return (
    <motion.div 
      className="landing-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      
      {/* Cercles animés en arrière-plan */}
      {circles.map((circle, i) => (
        <motion.div
          key={`circle-${i}`}
          className="landing-circle"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: `${circle.radius}px`,
            height: `${circle.radius}px`,
            borderRadius: '50%',
            border: `1px solid rgba(104, 109, 176, ${circle.opacity})`,
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }}
          animate={{
            rotate: circle.clockwise ? 360 : -360
          }}
          transition={{
            duration: circle.speed,
            repeat: Infinity,
            ease: "linear",
            delay: circle.delay
          }}
        />
      ))}

      {/* Particules d'ambiance */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="ambient-particle"
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            filter: 'blur(2px)'
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: particle.delay
          }}
        />
      ))}

      <div className="landing-content">
        <motion.div className="logo-container" variants={logoVariants}>
          <h1 className="logo">M<span>S</span></h1>
        </motion.div>

        <motion.h2 
          variants={logoVariants} 
          className="studio-name"
          animate={{
            textShadow: ['0 0 20px rgba(104, 109, 176, 0.3)', '0 0 30px rgba(104, 109, 176, 0.6)', '0 0 20px rgba(104, 109, 176, 0.3)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          THE MOOD STUDIO
        </motion.h2>

        <motion.div
          className="cta-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="explore-button"
            onClick={onExplore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={pulseVariants}
            animate={isReady ? 'animate' : 'initial'}
          >
            Commencer
          </motion.button>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            delay: 2
          }}
        >
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage; 