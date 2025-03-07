import React, { useEffect } from 'react';
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
  style = {}
}) => {
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value > threshold) {
        controls.start({
          ...animatedPosition,
          transition: {
            ...transition,
            delay
          }
        });
      } else {
        controls.start(initialPosition);
      }
    });

    return () => unsubscribe();
  }, [controls, scrollYProgress, initialPosition, animatedPosition, threshold, transition, delay]);

  return (
    <motion.div
      className={`scroll-image-wrapper ${className || ''}`}
      initial={initialPosition}
      animate={controls}
      style={{
        overflow: 'hidden',
        ...style
      }}
    >
      <img 
        src={src} 
        alt={alt || 'Image animée'}
        className="scroll-image"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </motion.div>
  );
};

export default ScrollImage; 