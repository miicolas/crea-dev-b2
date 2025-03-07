import React from "react";
import { motion, AnimatePresence } from "motion/react";

const ImageTransition = ({
  images,
  currentIndex,
  transitionType = "fade",
  duration = 0.8,
  emotionId = "default",
}) => {
  const variants = {
    // Basic transitions
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: 300, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -300, opacity: 0 },
    },
    zoom: {
      initial: { scale: 1.5, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
    reveal: {
      initial: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      animate: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
      exit: { clipPath: "inset(0 0 0 100%)", opacity: 1 },
    },
    blur: {
      initial: { filter: "blur(20px)", opacity: 0 },
      animate: { filter: "blur(0px)", opacity: 1 },
      exit: { filter: "blur(20px)", opacity: 0 },
    },
    // New basic transitions
    flip: {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90 },
    },
    swing: {
      initial: { opacity: 0, rotate: -10, transformOrigin: "top center" },
      animate: { opacity: 1, rotate: 0, transformOrigin: "top center" },
      exit: { opacity: 0, rotate: 10, transformOrigin: "top center" },
    },
    bounce: {
      initial: { opacity: 0, y: -50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5 } },
      exit: { opacity: 0, y: 50, scale: 0.9 },
    },
    // Enhanced emotional transitions
    // Despair transitions
    dissolve: {
      initial: { filter: "grayscale(1) blur(10px)", opacity: 0 },
      animate: { filter: "grayscale(0.7) blur(0px)", opacity: 1 },
      exit: { filter: "grayscale(1) blur(15px)", opacity: 0 },
    },
    sink: {
      initial: { y: -50, filter: "brightness(0.7)", opacity: 0 },
      animate: { y: 0, filter: "brightness(0.9)", opacity: 1 },
      exit: { y: 50, filter: "brightness(0.7)", opacity: 0 },
    },
    shatter: {
      initial: {
        opacity: 0,
        filter: "contrast(1.2) brightness(0.7)",
        clipPath:
          "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      },
      animate: {
        opacity: 1,
        filter: "contrast(1) brightness(0.9)",
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%)",
      },
      exit: {
        opacity: 0,
        filter: "contrast(0.8) brightness(0.7)",
        clipPath:
          "polygon(25% 25%, 75% 25%, 75% 75%, 75% 75%, 25% 75%, 25% 25%)",
      },
    },
    // New despair transitions
    fracture: {
      initial: {
        opacity: 0,
        filter: "grayscale(0.9) contrast(1.3) brightness(0.6)",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scale: 1.1,
      },
      animate: {
        opacity: 1,
        filter: "grayscale(0.7) contrast(1.2) brightness(0.8)",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scale: 1,
      },
      exit: {
        opacity: 0,
        filter: "grayscale(1) contrast(1.4) brightness(0.5)",
        clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
        scale: 0.95,
      },
    },
    vortex: {
      initial: {
        opacity: 0,
        filter: "grayscale(0.8) blur(8px)",
        transform: "rotate(-5deg) scale(1.2)",
      },
      animate: {
        opacity: 1,
        filter: "grayscale(0.6) blur(0px)",
        transform: "rotate(0deg) scale(1)",
      },
      exit: {
        opacity: 0,
        filter: "grayscale(1) blur(12px)",
        transform: "rotate(5deg) scale(0.9)",
      },
    },
    // Acceptance transitions
    flow: {
      initial: {
        filter: "hue-rotate(20deg) blur(5px)",
        opacity: 0,
        scale: 1.1,
      },
      animate: { filter: "hue-rotate(0deg) blur(0px)", opacity: 1, scale: 1 },
      exit: { filter: "hue-rotate(-20deg) blur(5px)", opacity: 0, scale: 0.95 },
    },
    wave: {
      initial: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        opacity: 1,
      },
      animate: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
      },
      exit: {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        opacity: 1,
      },
    },
    ripple: {
      initial: {
        opacity: 0,
        filter: "hue-rotate(0deg) saturate(0.9)",
        transform: "scale(0.85) translateY(10px)",
      },
      animate: {
        opacity: 1,
        filter: "hue-rotate(0deg) saturate(1)",
        transform: "scale(1) translateY(0px)",
      },
      exit: {
        opacity: 0,
        filter: "hue-rotate(10deg) saturate(0.9)",
        transform: "scale(1.05) translateY(-10px)",
      },
    },
    // New acceptance transitions
    balance: {
      initial: {
        opacity: 0,
        filter: "saturate(0.8) sepia(0.2)",
        transform: "translateX(-20px) scale(0.95)",
      },
      animate: {
        opacity: 1,
        filter: "saturate(1) sepia(0)",
        transform: "translateX(0) scale(1)",
      },
      exit: {
        opacity: 0,
        filter: "saturate(0.8) sepia(0.2)",
        transform: "translateX(20px) scale(0.95)",
      },
    },
    unfold: {
      initial: {
        opacity: 0,
        filter: "brightness(0.9) contrast(1.1)",
        clipPath: "circle(0% at 50% 50%)",
      },
      animate: {
        opacity: 1,
        filter: "brightness(1) contrast(1)",
        clipPath: "circle(100% at 50% 50%)",
      },
      exit: {
        opacity: 0,
        filter: "brightness(0.9) contrast(1.1)",
        clipPath: "circle(0% at 50% 50%)",
      },
    },
    // Hope transitions
    glow: {
      initial: { filter: "brightness(1.5) blur(10px)", opacity: 0 },
      animate: { filter: "brightness(1.1) blur(0px)", opacity: 1 },
      exit: { filter: "brightness(1.5) blur(10px)", opacity: 0 },
    },
    ascend: {
      initial: { y: 50, filter: "brightness(1.2)", opacity: 0 },
      animate: { y: 0, filter: "brightness(1)", opacity: 1 },
      exit: { y: -50, filter: "brightness(1.2)", opacity: 0 },
    },
    radiate: {
      initial: {
        opacity: 0,
        filter: "brightness(1.5) contrast(1.1)",
        transform: "scale(0.9)",
        boxShadow: "0 0 0 rgba(255,255,255,0)",
      },
      animate: {
        opacity: 1,
        filter: "brightness(1.1) contrast(1)",
        transform: "scale(1)",
        boxShadow: "0 0 30px rgba(255,255,255,0.3)",
      },
      exit: {
        opacity: 0,
        filter: "brightness(1.5) contrast(0.9)",
        transform: "scale(1.1)",
        boxShadow: "0 0 50px rgba(255,255,255,0)",
      },
    },
    // New hope transitions
    illuminate: {
      initial: {
        opacity: 0,
        filter: "brightness(0.8) saturate(0.9)",
        clipPath: "polygon(50% 0%, 50% 100%, 50% 100%, 50% 0%)",
      },
      animate: {
        opacity: 1,
        filter: "brightness(1.2) saturate(1.1)",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      exit: {
        opacity: 0,
        filter: "brightness(1.5) saturate(1.2)",
        clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
      },
    },
    sparkle: {
      initial: {
        opacity: 0,
        filter: "brightness(1.3) contrast(1.1) saturate(1.1)",
        transform: "scale(0.95) rotate(-1deg)",
      },
      animate: {
        opacity: 1,
        filter: "brightness(1.1) contrast(1) saturate(1.05)",
        transform: "scale(1) rotate(0deg)",
      },
      exit: {
        opacity: 0,
        filter: "brightness(1.4) contrast(0.9) saturate(1.2)",
        transform: "scale(1.05) rotate(1deg)",
      },
    }
  };

  const currentVariant = variants[transitionType] || variants.fade;
  const currentImage =
    images && images.length > 0 ? images[currentIndex % images.length] : null;

  // Enhanced transition with emotion-specific easing
  const getTransition = () => {
    const baseTransition = {
      duration: duration,
      ease: [0.16, 1, 0.3, 1],
    };

    // Add emotion-specific transition properties
    switch (emotionId) {
      case "desespoir":
        return {
          ...baseTransition,
          duration: duration * 1.2, // Slower for despair
          ease: [0.1, 0.4, 0.3, 1], // More dramatic easing
        };
      case "acceptation":
        return {
          ...baseTransition,
          duration: duration,
          ease: [0.25, 0.8, 0.5, 1], // Balanced easing
        };
      case "espoir":
        return {
          ...baseTransition,
          duration: duration * 0.9, // Faster for hope
          ease: [0.34, 1.2, 0.64, 1], // More energetic easing
        };
      default:
        return baseTransition;
    }
  };

  const transition = getTransition();

  const renderContent = () => {
    if (currentImage) {
      // Add emotion-specific class to enhance the image appearance
      const emotionClass =
        emotionId === "desespoir"
          ? "desespoir-image"
          : emotionId === "acceptation"
          ? "acceptation-image"
          : emotionId === "espoir"
          ? "espoir-image"
          : "";

      return (
        <div className="image-container">
          <img
            src={currentImage}
            alt={`Transition ${currentIndex}`}
            className={`transition-image ${emotionClass}`}
            style={{
              filter:
                emotionId === "desespoir"
                  ? "contrast(1.1) saturate(0.8)"
                  : emotionId === "acceptation"
                  ? "contrast(1) saturate(0.95)"
                  : emotionId === "espoir"
                  ? "contrast(1) saturate(1.1) brightness(1.05)"
                  : "none",
            }}
            onError={(e) => {
              const target = e.target;
              const div = document.createElement("div");
              div.className = `transition-image placeholder-image placeholder-${emotionId}`;
              target.parentNode.replaceChild(div, target);
            }}
          />
          {/* Add overlaid text with staggered animations */}
          <motion.div 
            className="text-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2rem'
            }}
          >
            {emotionId === "desespoir" && (
              <>
                <motion.span 
                  className="overlay-text desespoir-text hover-shadow"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  style={{ alignSelf: 'flex-start' }}
                >
                  Shadows
                </motion.span>
                <motion.span 
                  className="overlay-text desespoir-text hover-blur"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  style={{ alignSelf: 'flex-end' }}
                >
                  Fade
                </motion.span>
              </>
            )}
            {emotionId === "acceptation" && (
              <>
                <motion.span 
                  className="overlay-text acceptation-text hover-float"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  style={{ alignSelf: 'center' }}
                >
                  Balance
                </motion.span>
                <motion.span 
                  className="overlay-text acceptation-text hover-scale-rotate"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  style={{ alignSelf: 'flex-end', marginRight: '20%' }}
                >
                  Flow
                </motion.span>
              </>
            )}
            {emotionId === "espoir" && (
              <>
                <motion.span 
                  className="overlay-text espoir-text hover-glow"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  style={{ alignSelf: 'flex-start', marginLeft: '20%' }}
                >
                  Light
                </motion.span>
                <motion.span 
                  className="overlay-text espoir-text hover-grow"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  style={{ alignSelf: 'center' }}
                >
                  Rise
                </motion.span>
              </>
            )}
          </motion.div>
        </div>
      );
    } else {
      return (
        <div
          className={`transition-image placeholder-image placeholder-${emotionId}`}
        />
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
