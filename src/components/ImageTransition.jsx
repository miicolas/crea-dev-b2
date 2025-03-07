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
