import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'motion/react';

const ScrollImage = ({ 
  src, 
  alt, 
  className, 
  initialPosition = { x: 0, y: 100, opacity: 0 },
  animatedPosition = { x: 0, y: 0, opacity: 1 },
  threshold = 0.3,
  transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  delay = 0,
  style = {},
  emotionId = 'default',
  effectIntensity = 1
}) => {
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const [isInView, setIsInView] = useState(false);

  // Enhanced emotion-specific effects
  const getEmotionEffects = () => {
    switch(emotionId) {
      case 'desespoir':
        return {
          filter: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [
              `saturate(${0.7 * effectIntensity}) contrast(${1.2 * effectIntensity}) brightness(${0.8 * effectIntensity})`,
              `saturate(${0.8 * effectIntensity}) contrast(${1.1 * effectIntensity}) brightness(${0.85 * effectIntensity})`,
              `saturate(${0.9 * effectIntensity}) contrast(${1.0 * effectIntensity}) brightness(${0.9 * effectIntensity})`
            ]
          ),
          rotate: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [-2 * effectIntensity, 0, 2 * effectIntensity]
          )
        };
      case 'acceptation':
        return {
          filter: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [
              `saturate(${0.9 * effectIntensity}) contrast(${1.0 * effectIntensity}) brightness(${0.9 * effectIntensity})`,
              `saturate(${1.0 * effectIntensity}) contrast(${1.0 * effectIntensity}) brightness(${1.0 * effectIntensity})`,
              `saturate(${1.1 * effectIntensity}) contrast(${1.0 * effectIntensity}) brightness(${1.1 * effectIntensity})`
            ]
          ),
          scale: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [1, 1 + (0.05 * effectIntensity), 1]
          )
        };
      case 'espoir':
        return {
          filter: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [
              `saturate(${1.0 * effectIntensity}) contrast(${1.0 * effectIntensity}) brightness(${1.0 * effectIntensity})`,
              `saturate(${1.1 * effectIntensity}) contrast(${1.0 * effectIntensity}) brightness(${1.2 * effectIntensity})`,
              `saturate(${1.2 * effectIntensity}) contrast(${1.0 * effectIntensity}) brightness(${1.3 * effectIntensity})`
            ]
          ),
          y: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [0, -10 * effectIntensity, -20 * effectIntensity]
          )
        };
      default:
        return {};
    }
  };

  const emotionEffects = getEmotionEffects();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value > threshold) {
        setIsInView(true);
        controls.start({
          ...animatedPosition,
          transition: {
            ...transition,
            delay
          }
        });
      } else {
        setIsInView(false);
        controls.start(initialPosition);
      }
    });

    return () => unsubscribe();
  }, [controls, scrollYProgress, initialPosition, animatedPosition, threshold, transition, delay]);
  return (
    <motion.div
      className={`scroll-image-wrapper ${className || ''} ${isInView ? 'in-view' : ''}`}
      initial={initialPosition}
      animate={controls}
      style={{
        overflow: 'hidden',
        ...style
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
    >
      <motion.img 
        src={src} 
        alt={alt || 'Image animée'}
        className={`scroll-image ${emotionId}-image`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...emotionEffects
        }}
        whileHover={{
          scale: 1.05,
          filter: emotionId === 'desespoir' ? 'brightness(1.1)' :
                 emotionId === 'acceptation' ? 'brightness(1.05)' :
                 'brightness(1.2)',
          transition: { duration: 0.3 }
        }}
      />
      {isInView && (
        <motion.div 
          className="image-text-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 5,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2rem'
          }}
        >
          {emotionId === 'desespoir' && (
            <>
              <motion.span 
                className="overlay-text desespoir-text hover-shadow"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{ alignSelf: 'flex-end', marginTop: '10%' }}
              >
                Darkness
              </motion.span>
              <motion.span 
                className="overlay-text desespoir-text hover-blur"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                style={{ alignSelf: 'flex-start', marginBottom: '15%' }}
              >
                Fading
              </motion.span>
            </>
          )}
          {emotionId === 'acceptation' && (
            <>
              <motion.span 
                className="overlay-text acceptation-text hover-float"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{ alignSelf: 'flex-start', marginLeft: '15%' }}
              >
                Flowing
              </motion.span>
              <motion.span 
                className="overlay-text acceptation-text hover-scale-rotate"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                style={{ alignSelf: 'flex-end', marginRight: '15%' }}
              >
                Harmony
              </motion.span>
            </>
          )}
          {emotionId === 'espoir' && (
            <>
              <motion.span 
                className="overlay-text espoir-text hover-glow"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{ alignSelf: 'center' }}
              >
                Radiance
              </motion.span>
              <motion.span 
                className="overlay-text espoir-text hover-grow"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                style={{ alignSelf: 'flex-end', marginBottom: '20%' }}
              >
                Ascension
              </motion.span>
            </>
          )}
        </motion.div>
      )}
      {isInView && emotionId === 'espoir' && (
        <motion.div
          className="image-overlay shimmer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'overlay'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        />
      )}
    </motion.div>
  );
};

export default ScrollImage;