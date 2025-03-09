import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

export default function Scared() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fearElements, setFearElements] = useState([]);
  const [stalkers, setStalkers] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flashingLight, setFlashingLight] = useState(false);
  const [jumpScare, setJumpScare] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const [eyesOpen, setEyesOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      setTimeout(() => {
        setShowTitle(true);
      }, 2000);

      const flickerInterval = setInterval(() => {
        setFlashingLight((prev) => !prev);

        if (Math.random() < 0.05) {
          triggerJumpScare();
        }
      }, 3000 + Math.random() * 4000);

      const heartbeatInterval = setInterval(() => {
        setHeartbeat(true);
        setTimeout(() => setHeartbeat(false), 300);
      }, 2000);

      const eyeInterval = setInterval(() => {
        setEyesOpen(true);
        setTimeout(() => setEyesOpen(false), 300 + Math.random() * 700);
      }, 4000 + Math.random() * 3000);

      const stalkerInterval = setInterval(() => {
        if (Math.random() < 0.3) {
          createStalker();
        }
      }, 2000);

      return () => {
        clearInterval(flickerInterval);
        clearInterval(heartbeatInterval);
        clearInterval(eyeInterval);
        clearInterval(stalkerInterval);
      };
    } else {
      controls.start("hidden");
      setShowTitle(false);
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const triggerJumpScare = () => {
    setJumpScare(true);
    setTimeout(() => setJumpScare(false), 200);
    createFearElement("jumpscare");
  };

  const createStalker = () => {
    if (!isInView) return;

    const newStalker = {
      id: Date.now(),
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      size: 10 + Math.random() * 20,
      speed: 0.03 + Math.random() * 0.05,
      delay: Math.random() * 1000,
      type: Math.random() > 0.5 ? "eye" : "shadow",
      opacity: 0.5 + Math.random() * 0.5,
    };

    setStalkers((prev) => [...prev, newStalker]);

    setTimeout(() => {
      setStalkers((prev) =>
        prev.filter((stalker) => stalker.id !== newStalker.id)
      );
    }, 5000 + Math.random() * 5000);
  };

  const createFearElement = (trigger = "user") => {
    if (!isInView) return;

    const shapes = [
      "shadow",
      "wisp",
      "creature",
      "crack",
      "hand",
      "distortion",
    ];
    const appearances = ["sudden", "fade", "grow", "flicker"];

    const positions = {
      user: {
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
      },
      jumpscare: {
        x: 40 + Math.random() * 20,
        y: 40 + Math.random() * 20,
      },
      corners: {
        x: Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20,
        y: Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20,
      },
    };

    const position = positions[trigger] || positions["corners"];

    const newElement = {
      id: Date.now(),
      x: position.x,
      y: position.y,
      size:
        trigger === "jumpscare"
          ? 100 + Math.random() * 150
          : 30 + Math.random() * 50,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      appearance: appearances[Math.floor(Math.random() * appearances.length)],
      rotation: Math.random() * 360,
      duration: 0.5 + Math.random() * 1.5,
    };

    setFearElements((prev) => [...prev, newElement]);

    setTimeout(() => {
      setFearElements((prev) => prev.filter((el) => el.id !== newElement.id));
    }, newElement.duration * 1000);
  };

  const getElementStyle = (element) => {
    const baseStyle = {
      position: "absolute",
      left: `${element.x}vw`,
      top: `${element.y}vh`,
      width: `${element.size}px`,
      height: `${element.size}px`,
      transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
      zIndex: 20,
      pointerEvents: "none",
    };

    switch (element.shape) {
      case "shadow":
        return {
          ...baseStyle,
          borderRadius: "40% 60% 30% 70% / 50% 30% 70% 50%",
          background: "rgba(0, 0, 0, 0.8)",
          boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.6)",
          filter: "blur(4px)",
        };
      case "wisp":
        return {
          ...baseStyle,
          background: "transparent",
          boxShadow: "0 0 30px 10px rgba(100, 100, 150, 0.3)",
          filter: "blur(8px)",
          borderRadius: "50%",
        };
      case "crack":
        return {
          ...baseStyle,
          background: "transparent",
          border: "2px solid rgba(255, 255, 255, 0.7)",
          clipPath:
            "polygon(50% 0%, 55% 40%, 100% 50%, 55% 60%, 50% 100%, 45% 60%, 0% 50%, 45% 40%)",
          transform: `translate(-50%, -50%) rotate(${element.rotation}deg) scaleY(4) scaleX(0.2)`,
        };
      case "distortion":
        return {
          ...baseStyle,
          background: "transparent",
          border: "1px solid rgba(150, 150, 180, 0.4)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          boxShadow: "inset 0 0 20px rgba(200, 200, 220, 0.2)",
          filter: "blur(1px)",
        };
      default:
        return baseStyle;
    }
  };

  const getElementAnimation = (element) => {
    switch (element.appearance) {
      case "sudden":
        return {
          initial: { opacity: 0, scale: 0.2 },
          animate: {
            opacity: [0, 1, 1, 0],
            scale: [0.2, 1.2, 1, 0.8],
          },
          transition: {
            duration: element.duration,
            times: [0, 0.1, 0.9, 1],
          },
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 0.8, 0.8, 0],
          },
          transition: {
            duration: element.duration,
          },
        };
      case "grow":
        return {
          initial: { opacity: 0, scale: 0.1 },
          animate: {
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.1, 1, 1.3, 1.5],
          },
          transition: {
            duration: element.duration,
          },
        };
      case "flicker":
        return {
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 0.8, 0.1, 0.9, 0.2, 1, 0],
          },
          transition: {
            duration: element.duration,
          },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: [0, 1, 0] },
          transition: { duration: element.duration },
        };
    }
  };

  const fogElements = Array(15)
    .fill()
    .map((_, i) => (
      <motion.div
        key={`fog-${i}`}
        className="absolute"
        style={{
          width: `${200 + Math.random() * 300}px`,
          height: `${100 + Math.random() * 200}px`,
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          background: `rgba(20, 20, 30, ${0.2 + Math.random() * 0.3})`,
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 5,
        }}
        animate={{
          x: [0, Math.random() > 0.5 ? 30 : -30, 0],
          y: [0, Math.random() > 0.5 ? 20 : -20, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10 + Math.random() * 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ));

  return (
    <motion.div
      ref={ref}
      className="w-full h-screen overflow-hidden relative"
      initial="hidden"
      animate={controls}
      onClick={() => createFearElement("user")}
      style={{
        background: flashingLight
          ? "linear-gradient(to bottom, #1a1a2e, #16213e, #1a1a2e)"
          : "linear-gradient(to bottom, #0f0f1a, #070720, #000000)",
        transition: "background 0.3s ease-out",
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, flashingLight ? 0.15 : 0, 0],
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: "white",
          zIndex: 2,
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          x: jumpScare ? [0, -10, 10, -5, 5, 0] : 0,
          y: jumpScare ? [0, 5, -5, 3, -3, 0] : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: heartbeat ? [1, 1.03, 1] : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {fogElements}

          {fearElements.map((element) => {
            const { initial, animate, transition } =
              getElementAnimation(element);
            return (
              <motion.div
                key={element.id}
                style={getElementStyle(element)}
                initial={initial}
                animate={animate}
                transition={transition}
              />
            );
          })}

          {stalkers.map((stalker) => (
            <motion.div
              key={stalker.id}
              className="absolute z-30"
              style={{
                width: `${stalker.size}px`,
                height: `${stalker.size}px`,
                opacity: stalker.opacity,
              }}
              initial={{
                x: stalker.initialX,
                y: stalker.initialY,
                opacity: 0,
              }}
              animate={{
                x: mousePosition.x - stalker.size / 2,
                y: mousePosition.y - stalker.size / 2,
                opacity: stalker.opacity,
              }}
              transition={{
                x: {
                  duration: 1,
                  delay: stalker.delay,
                  ease: [0.3, 0.7, 0.5, 1],
                },
                y: {
                  duration: 1,
                  delay: stalker.delay,
                  ease: [0.3, 0.7, 0.5, 1],
                },
                opacity: { duration: 0.5 },
              }}
            ></motion.div>
          ))}

          <AnimatePresence>
            {showTitle && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.h1
                  className="text-7xl font-extrabold tracking-widest text-gray-300 cursor-pointer select-none"
                  style={{
                    fontFamily: "monospace",
                    letterSpacing: "0.2em",
                    textShadow: "0 0 10px rgba(150,150,150,0.5)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: [0, 1, 0.8, 1],
                    y: [30, 0],
                    filter: ["blur(8px)", "blur(0px)"],
                  }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 2 }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 15px rgba(200,200,220,0.8)",
                    color: "#f1f1f1",
                  }}
                  onClick={triggerJumpScare}
                >
                  <motion.span
                    animate={{
                      opacity: [1, 0.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    TERREUR
                  </motion.span>
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-0 right-0 p-4 z-50">
            <motion.button
              className="bg-gray-900 text-red-300 p-2 rounded-full shadow-lg"
              onClick={() => setIsDialogOpen(true)}
              aria-label="Confronter la peur"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(150,0,0,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <AlertTriangle className="w-4 h-4" />
            </motion.button>
          </div>

          <AnimatePresence>
            {isDialogOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsDialogOpen(false)}
                />

                <motion.div
                  className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 m-4 max-w-lg relative border border-gray-800"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -50,
                    scale: 0.9,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="absolute top-3 right-3">
                    <motion.button
                      className="text-gray-400 hover:text-red-300 bg-gray-800/50 rounded-full p-1"
                      onClick={() => setIsDialogOpen(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.h2
                      className="text-red-400 text-2xl font-bold mb-6 border-b border-gray-800 pb-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      La terreur nous paralyse
                    </motion.h2>

                    <motion.p
                      className="text-gray-400 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      La peur intense se transforme en terreur, figeant le corps
                      et l'esprit dans un état de paralysie. Les battements de
                      cœur s'accélèrent, la respiration se bloque, et le temps
                      lui-même semble s'étirer.
                    </motion.p>

                    <motion.p
                      className="text-gray-400 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Dans les profondeurs de notre inconscient, la terreur
                      réveille des peurs ancestrales - celle de l'inconnu, de
                      l'obscurité, de perdre le contrôle. Ce que nous ne voyons
                      pas est souvent bien plus effrayant que ce que nous
                      affrontons.
                    </motion.p>

                    <motion.div
                      className="flex justify-center mt-8"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      <motion.button
                        className="bg-gray-800 text-red-300 border border-red-900 px-4 py-2 rounded-md font-mono tracking-wider"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 20px rgba(150,0,0,0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsDialogOpen(false);
                          triggerJumpScare();
                          for (let i = 0; i < 8; i++) {
                            setTimeout(
                              () =>
                                createFearElement(
                                  i % 2 === 0 ? "corners" : "user"
                                ),
                              i * 200
                            );
                          }
                        }}
                      >
                        <motion.span
                          animate={{
                            opacity: [1, 0.5, 1],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          CONFRONTER L'HORREUR
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
