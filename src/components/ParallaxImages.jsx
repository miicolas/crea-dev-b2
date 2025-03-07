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

  // Rendu des couches de parallaxe
  const renderParallaxLayer = (image, index) => {
    const y = useTransform(
      scrollYProgress, 
      [0, 1], 
      [0, 100 * image.depth]
    );
    
    const scale = useTransform(
      scrollYProgress,
      [0, 1],
      [1, 1 + (image.depth * 0.2)]
    );
    
    const opacity = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [1, 0.8, 0.6]
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
                animate={{
                  x: [0, 20, 0],
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 5 + i * 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="parallax-container">
      {currentImages.map((image, index) => renderParallaxLayer(image, index))}
    </div>
  );
};

export default ParallaxImages; 