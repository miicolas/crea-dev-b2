import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react";
import { Smile, X, Sun, Heart, Star, CloudSun } from "lucide-react";

export default function Happy() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [joyBubbles, setJoyBubbles] = useState([]);
  const [isFloatingObjectsActive, setIsFloatingObjectsActive] = useState(false);
  const [followingHearts, setFollowingHearts] = useState([]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      setTimeout(() => {
        controls.start({
          y: [0, -5, 0, -3, 0],
          opacity: 1,
          transition: { duration: 2, ease: "easeInOut" },
        });

        const interval = setInterval(() => {
          controls.start({
            y: [0, -3, 0, -2, 0],
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" },
          });
        }, 3000);

        return () => clearInterval(interval);
      }, 300);

      const bubbleInterval = setInterval(() => {
        createJoyBubble();
      }, 800);

      setTimeout(() => {
        setIsFloatingObjectsActive(true);
      }, 1000);

      return () => {
        clearInterval(bubbleInterval);
      };
    } else {
      controls.start("hidden");
      setIsFloatingObjectsActive(false);
    }
  }, [isInView, controls]);

  const createFollowingHeart = () => {
    if (!isInView) return;

    const newHeart = {
      id: Date.now(),
      x: mousePosition.x,
      y: mousePosition.y,
      size: 15 + Math.random() * 15,
      color: getRandomColor(),
      angle: Math.random() * 360,
      speed: 1 + Math.random() * 1.5,
    };

    setFollowingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFollowingHearts((prev) =>
        prev.filter((heart) => heart.id !== newHeart.id)
      );
    }, 3000);
  };

  const createJoyBubble = () => {
    const shapes = ["circle", "star", "heart", "flower", "butterfly", "cloud"];
    const colors = [
      "rgba(255, 220, 100, 0.9)",
      "rgba(100, 200, 255, 0.9)",
      "rgba(255, 150, 50, 0.9)",
      "rgba(180, 230, 100, 0.9)",
      "rgba(255, 180, 220, 0.9)",
      "rgba(220, 180, 255, 0.9)",
    ];

    const newBubble = {
      id: Date.now(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    };

    setJoyBubbles((prev) => [...prev, newBubble]);

    setTimeout(() => {
      setJoyBubbles((prev) =>
        prev.filter((bubble) => bubble.id !== newBubble.id)
      );
    }, 3000);
  };

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 60) + 20;
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getShapeStyle = (shape, color, rotation) => {
    const baseStyle = {
      position: "absolute",
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      pointerEvents: "none",
      backgroundColor: color,
    };

    switch (shape) {
      case "circle":
        return {
          ...baseStyle,
          borderRadius: "50%",
        };
      case "star":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        };
      case "heart":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          clipPath:
            'path("M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z")',
        };
      case "flower":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          clipPath:
            "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
          borderRadius: "50%",
        };
      case "butterfly":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          clipPath:
            "polygon(0% 35%, 30% 0%, 50% 35%, 70% 0%, 100% 35%, 70% 60%, 100% 90%, 50% 70%, 0% 90%, 30% 60%)",
        };
      case "cloud":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          clipPath:
            "polygon(25% 50%, 25% 40%, 35% 30%, 65% 30%, 75% 40%, 75% 50%, 85% 60%, 75% 70%, 65% 70%, 50% 80%, 35% 70%, 25% 70%, 15% 60%)",
          borderRadius: "50%",
        };
      default:
        return baseStyle;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        staggerChildren: 0.15,
      },
    },
  };

  const floatingObjectVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    },
  };

  // Variantes pour le dialogue
  const dialogVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: { duration: 0.4 },
    },
  };

  const sparkles = Array(30)
    .fill()
    .map((_, i) => (
      <motion.div
        key={`sparkle-${i}`}
        className="absolute"
        style={{
          width: `${3 + Math.random() * 8}px`,
          height: `${3 + Math.random() * 8}px`,
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "50%",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
          zIndex: 5,
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 1 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ));

  const floatingObjects = [
    {
      icon: <Sun size={40} />,
      color: "text-yellow-400",
      x: "20%",
      y: "30%",
      duration: 8,
    },
    {
      icon: <Heart size={30} />,
      color: "text-pink-400",
      x: "80%",
      y: "40%",
      duration: 7,
    },
    {
      icon: <Star size={25} />,
      color: "text-purple-400",
      x: "65%",
      y: "20%",
      duration: 9,
    },
    {
      icon: <Star size={35} />,
      color: "text-yellow-300",
      x: "30%",
      y: "70%",
      duration: 6,
    },
    {
      icon: <CloudSun size={45} />,
      color: "text-blue-300",
      x: "75%",
      y: "65%",
      duration: 10,
    },
    {
      icon: <Smile size={28} />,
      color: "text-orange-300",
      x: "40%",
      y: "25%",
      duration: 5,
    },
  ];

  const softClouds = Array(10)
    .fill()
    .map((_, i) => (
      <motion.div
        key={`cloud-${i}`}
        className="absolute"
        style={{
          width: `${180 + Math.random() * 220}px`,
          height: `${100 + Math.random() * 120}px`,
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 70}vh`,
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "50%",
          filter: "blur(30px)",
          zIndex: 2,
        }}
        animate={{
          x: [0, 20, 0, -20, 0],
          scale: [1, 1.05, 1, 0.95, 1],
          opacity: [0.6, 0.7, 0.6, 0.7, 0.6],
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    ));

  return (
    <motion.div
      ref={ref}
      className="w-full h-screen overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100" />

      {softClouds}

      <motion.div
        className="absolute z-50"
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,230,150,1) 0%, rgba(255,210,100,0.8) 40%, rgba(255,180,0,0) 70%)",
          top: "15%",
          right: "15%",
          boxShadow:
            "0 0 100px rgba(255,200,70,0.4), 0 0 200px rgba(255,180,0,0.2)",
          zIndex: 10,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {followingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute z-40"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            color: heart.color,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [1, 0],
            scale: [0, 1],
            y: [0, -100],
            x: [0, Math.sin(heart.angle) * 50],
            rotate: [0, heart.angle],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        >
          <Heart fill={heart.color} size={heart.size} />
        </motion.div>
      ))}

      {isFloatingObjectsActive &&
        floatingObjects.map((obj, index) => (
          <motion.div
            key={`floating-${index}`}
            className={`absolute ${obj.color} z-10`}
            style={{
              left: obj.x,
              top: obj.y,
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
            }}
            variants={floatingObjectVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
            whileHover={{
              scale: 1.2,
              rotate: 15,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0, -10, 0],
                rotate: [-5, 5, -3, 3, 0],
              }}
              transition={{
                duration: obj.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {obj.icon}
            </motion.div>
          </motion.div>
        ))}

      {joyBubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            ...getShapeStyle(bubble.shape, bubble.color, bubble.rotation),
            left: `${bubble.x}vw`,
            top: `${bubble.y}vh`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
          initial={{ opacity: 0, scale: 0.2, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.2, 1, 1.1, 0.9],
            y: [-20, -40, -60],
            rotate: [
              bubble.rotation,
              bubble.rotation + (Math.random() > 0.5 ? 20 : -20),
            ],
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: "easeOut",
          }}
        />
      ))}

      {sparkles}

      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h1
          className="text-7xl font-extrabold tracking-wide text-yellow-50 cursor-pointer"
          style={{
            textShadow:
              "0 0 20px rgba(255,200,100,0.7), 0 0 40px rgba(255,180,0,0.5)",
          }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.03, 1],
            textShadow: [
              "0 0 20px rgba(255,200,100,0.7), 0 0 40px rgba(255,180,0,0.5)",
              "0 0 25px rgba(255,220,150,0.9), 0 0 50px rgba(255,200,50,0.7)",
              "0 0 20px rgba(255,200,100,0.7), 0 0 40px rgba(255,180,0,0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          whileHover={{
            scale: 1.1,
            color: "#FFF9C4",
            transition: { duration: 0.3 },
          }}
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.1 },
          }}
          onClick={() => {
            for (let i = 0; i < 10; i++) {
              setTimeout(() => createJoyBubble(), i * 100);
            }
          }}
        >
          BONHEUR
        </motion.h1>
      </motion.div>

      <div className="absolute bottom-0 right-0 p-4 z-50">
        <motion.button
          className="bg-yellow-400 text-blue-900 p-2 rounded-full shadow-lg"
          onClick={() => setIsDialogOpen(true)}
          aria-label="Ouvrir le dialogue du bonheur"
          whileHover={{
            scale: 1.1,
            rotate: 10,
            boxShadow: "0 0 15px rgba(255,220,100,0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            zIndex: 10,
          }}
        >
          <Smile className="w-4 h-4" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-500/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDialogOpen(false)}
            />

            <motion.div
              className="bg-gradient-to-br from-blue-400 to-sky-600 rounded-xl shadow-2xl p-8 m-4 max-w-lg relative z-10 border border-blue-300"
              variants={dialogVariants}
            >
              <div className="absolute top-3 right-3">
                <motion.button
                  className="text-white hover:text-yellow-200 bg-blue-500/50 rounded-full p-1"
                  onClick={() => setIsDialogOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <motion.h2
                className="text-yellow-100 text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              >
                Le bonheur est un état d'esprit
              </motion.h2>

              <motion.p
                className="text-white mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              >
                Le bonheur naît souvent de notre capacité à apprécier les
                petites choses, à savourer l'instant présent et à cultiver la
                gratitude. C'est une émotion qui nous élève et nous connecte aux
                autres.
              </motion.p>

              <motion.p
                className="text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              >
                Nourrir son bonheur, c'est choisir chaque jour de voir ce qui va
                bien, de célébrer les victoires et d'accepter que la joie puisse
                coexister avec les défis de la vie.
              </motion.p>

              <motion.div
                className="mt-6 flex justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.5, type: "spring" },
                }}
              >
                <motion.button
                  className="bg-yellow-300 text-blue-800 px-4 py-2 rounded-full font-bold shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,100,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsDialogOpen(false);
                    for (let i = 0; i < 15; i++) {
                      setTimeout(() => createJoyBubble(), i * 100);
                    }
                  }}
                >
                  Célébrer la joie !
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
