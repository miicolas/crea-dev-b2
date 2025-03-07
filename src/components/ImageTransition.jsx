import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ImageTransition = ({ 
  images,
  currentIndex,
  transitionType = "fade",
  duration = 0.8,
  emotionId = "default"
}) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      initial: { x: 300, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -300, opacity: 0 }
    },
    zoom: {
      initial: { scale: 1.5, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 }
    },
    reveal: {
      initial: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      animate: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
      exit: { clipPath: 'inset(0 0 0 100%)', opacity: 1 }
    },
    blur: {
      initial: { filter: 'blur(20px)', opacity: 0 },
      animate: { filter: 'blur(0px)', opacity: 1 },
      exit: { filter: 'blur(20px)', opacity: 0 }
    }
  };

  const currentVariant = variants[transitionType] || variants.fade;
  const currentImage = images && images.length > 0 ? images[currentIndex % images.length] : null;

  const transition = {
    duration: duration,
    ease: [0.16, 1, 0.3, 1]
  };

  const renderContent = () => {
    if (currentImage) {
      return (
        <img 
          src={currentImage} 
          alt={`Transition ${currentIndex}`} 
          className="transition-image"
          onError={(e) => {
            const target = e.target;
            const div = document.createElement('div');
            div.className = `transition-image placeholder-image placeholder-${emotionId}`;
            target.parentNode.replaceChild(div, target);
          }}
        />
      );
    } else {
      return (
        <div className={`transition-image placeholder-image placeholder-${emotionId}`} />
      );
    }
  };

  return (
    <div className="image-transition-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="image-wrapper"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={currentVariant}
          transition={transition}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ImageTransition; 