import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const ParallaxImages = ({ emotionId }) => {
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState({});
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Images spécifiques à chaque émotion
  const imageData = {
    desespoir: [
      { src: '/images/desespoir/shadow1.jpg', depth: 0.2 },
      { src: '/images/desespoir/shadow2.jpg', depth: 0.5 },
      { src: '/images/desespoir/shadow3.jpg', depth: 0.8 },
    ],
    acceptation: [
      { src: '/images/acceptation/wave1.jpg', depth: 0.3 },
      { src: '/images/acceptation/wave2.jpg', depth: 0.6 },
      { src: '/images/acceptation/wave3.jpg', depth: 0.9 },
    ],
    espoir: [
      { src: '/images/espoir/light1.jpg', depth: 0.2 },
      { src: '/images/espoir/light2.jpg', depth: 0.5 },
      { src: '/images/espoir/light3.jpg', depth: 0.8 },
    ]
  };
  
  const currentImages = imageData[emotionId] || [];
  
  // Préchargement des images et suivi de leur statut
  useEffect(() => {
    const newLoadState = {};
    
    currentImages.forEach((image, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [index]: true
        }));
      };
      img.onerror = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [index]: false
        }));
      };
      img.src = image.src;
      newLoadState[index] = false;
    });
    
    setImagesLoaded(newLoadState);
  }, [emotionId]);

  // Rendu des couches de parallaxe avec animations améliorées
  const renderParallaxLayer = (image, index) => {
    const y = useTransform(
      scrollYProgress, 
      [0, 1], 
      [0, 100 * image.depth]
    );
    
    const scale = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [1, 1 + (image.depth * 0.1), 1 + (image.depth * 0.2)]
    );
    
    const opacity = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [1, 0.8, 0.6]
    );
    
    // Effets spécifiques à chaque émotion - enhanced with more dynamic animations
    const rotation = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      emotionId === 'desespoir' ? [-3 * image.depth, 0, 3 * image.depth] : 
      emotionId === 'acceptation' ? [-1 * image.depth, 0, 1 * image.depth] : 
      [-2 * image.depth, 0, 2 * image.depth]
    );
    
    const blur = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      emotionId === 'desespoir' ? [0, 1.5 * image.depth, 3 * image.depth] : 
      emotionId === 'acceptation' ? [0, 0.7 * image.depth, 1.4 * image.depth] : 
      [1.5 * image.depth, 0.7 * image.depth, 0]
    );
    
    // New animation effects based on emotion
    const saturation = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      emotionId === 'desespoir' ? [0.8, 0.7, 0.6] : 
      emotionId === 'acceptation' ? [0.9, 1, 1.1] : 
      [1, 1.2, 1.4]
    );
    
    const brightness = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      emotionId === 'desespoir' ? [0.9, 0.8, 0.7] : 
      emotionId === 'acceptation' ? [0.9, 1, 1.1] : 
      [1, 1.2, 1.4]
    );
    
    const skew = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      emotionId === 'desespoir' ? [2 * image.depth, 0, -2 * image.depth] : 
      emotionId === 'acceptation' ? [1 * image.depth, 0, -1 * image.depth] : 
      [0, 0, 0]
    );
    
    // Déterminer si on affiche l'image ou un placeholder
    const isLoaded = imagesLoaded[index];
    
    return (
      <motion.div
        key={index}
        className="parallax-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: Math.floor(image.depth * 10),
          y,
          scale,
          opacity
        }}
      >
        {isLoaded === true ? (
          <img 
            src={image.src} 
            alt={`Parallax ${index}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute'
            }}
          />
        ) : (
          <div 
            className={`placeholder-image placeholder-${emotionId}`}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              opacity: 0.7 - (image.depth * 0.3)
            }}
          >
            {/* Formes générées pour remplacer l'image */}
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={`shape-${i}`}
                style={{
                  position: 'absolute',
                  width: `${30 + i * 20}px`,
                  height: `${30 + i * 20}px`,
                  borderRadius: '50%',
                  backgroundColor: `rgba(255, 255, 255, ${0.05 + i * 0.02})`,
                  top: `${30 + i * 15}%`,
                  left: `${20 + i * 20}%`,
                  filter: `blur(${5 + i * 2}px)`
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: [0, 20, 0],
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.7, 0.5]
                }}
                transition={{
                  duration: 5 + i * 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: i * 0.8 // Staggered delay for each shape
                }}
                whileHover={{
                  filter: `blur(${3 + i * 1.5}px)`,
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className={`parallax-container ${emotionId}-container`}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {currentImages.map((image, index) => renderParallaxLayer(image, index))}
      
      {/* Add text overlays distributed around the screen */}
      <motion.div 
        className="parallax-text-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 20
        }}
      >
        {emotionId === 'desespoir' && (
          <>
            <motion.span 
              className="overlay-text desespoir-text hover-shadow"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ 
                position: 'absolute',
                top: '15%',
                left: '20%',
                fontSize: '1.4rem'
              }}
            >
              Abyss
            </motion.span>
            <motion.span 
              className="overlay-text desespoir-text hover-blur"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{ 
                position: 'absolute',
                bottom: '25%',
                right: '15%',
                fontSize: '1.2rem'
              }}
            >
              Silence
            </motion.span>
          </>
        )}
        {emotionId === 'acceptation' && (
          <>
            <motion.span 
              className="overlay-text acceptation-text hover-float"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ 
                position: 'absolute',
                top: '20%',
                right: '25%',
                fontSize: '1.3rem'
              }}
            >
              Serenity
            </motion.span>
            <motion.span 
              className="overlay-text acceptation-text hover-scale-rotate"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{ 
                position: 'absolute',
                bottom: '20%',
                left: '20%',
                fontSize: '1.2rem'
              }}
            >
              Embrace
            </motion.span>
          </>
        )}
        {emotionId === 'espoir' && (
          <>
            <motion.span 
              className="overlay-text espoir-text hover-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ 
                position: 'absolute',
                top: '30%',
                left: '15%',
                fontSize: '1.3rem'
              }}
            >
              Brilliance
            </motion.span>
            <motion.span 
              className="overlay-text espoir-text hover-grow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{ 
                position: 'absolute',
                bottom: '15%',
                right: '20%',
                fontSize: '1.4rem'
              }}
            >
              Horizon
            </motion.span>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ParallaxImages;