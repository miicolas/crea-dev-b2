import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ImageTransition from "./ImageTransition";
import ParallaxImages from "./ParallaxImages";
import "../emotionAnimations.css";

const EmotionScene = ({ emotion }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [transitionType, setTransitionType] = useState("fade");

  // Images pour chaque émotion
  const emotionImages = {
    desespoir: [
      "/images/desespoir/scene1.jpg",
      "/images/desespoir/scene2.jpg",
      "/images/desespoir/scene3.jpg",
    ],
    acceptation: [
      "/images/acceptation/scene1.jpg",
      "/images/acceptation/scene2.jpg",
      "/images/acceptation/scene3.jpg",
    ],
    espoir: [
      "/images/espoir/scene1.jpg",
      "/images/espoir/scene2.jpg",
      "/images/espoir/scene3.jpg",
    ],
  };

  // Styles d'animation pour chaque émotion
  const emotionStyles = {
    desespoir: {
      filter: "saturate(0.7) contrast(1.2) brightness(0.7)",
      background:
        "radial-gradient(circle at center, rgba(30, 45, 64, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%)",
    },
    acceptation: {
      filter: "saturate(0.9) contrast(1.1) brightness(0.9)",
      background:
        "radial-gradient(circle at center, rgba(70, 87, 117, 0.6) 0%, rgba(30, 40, 60, 0.8) 100%)",
    },
    espoir: {
      filter: "saturate(1.1) contrast(1) brightness(1.1)",
      background:
        "radial-gradient(circle at center, rgba(118, 148, 159, 0.5) 0%, rgba(40, 60, 80, 0.7) 100%)",
    },
  };

  // Transitions pour chaque émotion - enhanced with emotion-specific effects
  const emotionTransitions = {
    desespoir: ["dissolve", "sink", "blur", "fade"],
    acceptation: ["flow", "wave", "slide", "reveal"],
    espoir: ["glow", "ascend", "zoom", "fade"],
  };

  // Modifier l'image et le type de transition à intervalle régulier
  useEffect(() => {
    const images = emotionImages[emotion.id] || [];
    const transitions = emotionTransitions[emotion.id] || ["fade"];

    if (images.length === 0) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
      setTransitionType(
        transitions[Math.floor(Math.random() * transitions.length)]
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [emotion.id]);

  // Mots d'émotion qui apparaissent et disparaissent
  const emotionWords = {
    desespoir: ["solitude", "vide", "obscurité", "perte", "lourdeur"],
    acceptation: ["réalité", "présent", "conscience", "chemin", "transition"],
    espoir: ["lumière", "possible", "demain", "renouveau", "souffle"],
  };

  const currentStyle = emotionStyles[emotion.id] || {};
  const currentImages = emotionImages[emotion.id] || [];
  const currentWords = emotionWords[emotion.id] || [];

  // Generate emotion-specific overlay elements
  const renderEmotionOverlay = () => {
    switch (emotion.id) {
      case "desespoir":
        return (
          <div className="desespoir-overlay">
            <div className="dark-mist intensity-pulse"></div>
            {/* Generate falling particles */}
            {Array.from({ length: 15 }, (_, i) => (
              <motion.div
                key={`falling-${i}`}
                className="falling-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}px`,
                  height: `${Math.random() * 15 + 5}px`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
          </div>
        );
      case "acceptation":
        return (
          <div className="acceptation-overlay">
            {/* Generate gentle waves */}
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="gentle-wave"
                style={{
                  top: `${20 + i * 30}%`,
                  opacity: 0.1 - i * 0.02,
                  animationDelay: `${i * 2}s`,
                }}
              />
            ))}
            {/* Generate floating particles */}
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={`floating-${i}`}
                className="floating-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 3}px`,
                  height: `${Math.random() * 10 + 3}px`,
                  opacity: Math.random() * 0.3 + 0.1,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 15 + 15}s`,
                }}
              />
            ))}
            {/* Generate ripples */}
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={`ripple-${i}`}
                className="ripple"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
        );
      case "espoir":
        return (
          <div className="espoir-overlay">
            {/* Generate light rays */}
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="light-ray"
                style={{
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.2 + 0.1,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 15}s`,
                }}
              />
            ))}
            {/* Generate rising particles */}
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={`rising-${i}`}
                className="rising-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `-${Math.random() * 20}px`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
            <div className="shimmer subtle-movement"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="emotion-scene" style={{ ...currentStyle }}>
      <div className="scene-background subtle-movement">
        <ImageTransition
          images={currentImages}
          currentIndex={imageIndex}
          transitionType={transitionType}
          duration={1.2}
          emotionId={emotion.id}
        />
      </div>

      <ParallaxImages emotionId={emotion.id} />
      {renderEmotionOverlay()}

      <div className="emotion-words">
        {currentWords.map((word, index) => (
          <motion.span
            key={word}
            className={`floating-word ${
              emotion.id === "desespoir"
                ? "heartbeat-text"
                : emotion.id === "acceptation"
                ? "breathing-text"
                : "glowing-text"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [20, 0, -20],
            }}
            transition={{
              duration: 8,
              delay: index * 2,
              repeat: Infinity,
              repeatDelay: currentWords.length * 2,
            }}
            style={{
              left: `${((index * 20) % 80) + 10}%`,
              top: `${((index * 15) % 70) + 15}%`,
              fontSize: `${1 + (index % 3) * 0.5}rem`,
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
