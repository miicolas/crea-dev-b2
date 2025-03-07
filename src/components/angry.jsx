import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react";
import { ArrowUpLeft, X } from "lucide-react";

const Angry = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Effet qui s'active lorsque le composant entre dans la vue
  useEffect(() => {
    if (isInView) {
      // Animer l'entrée
      controls.start("visible");
      
      // Démarrer l'effet de secousse après l'entrée
      setTimeout(() => {
        controls.start({
          x: [0, -10, 10, -10, 10, -5, 5, -2, 2, 0],
          opacity: 1,
          transition: { duration: 0.8, ease: "easeInOut" }
        });
      
        // Continuer l'effet de secousse légère en continu
        const interval = setInterval(() => {
          controls.start({
            x: [0, -3, 3, -3, 3, -1, 1, 0],
            opacity: 1,
            transition: { duration: 0.5, ease: "easeInOut" }
          });
        }, 2000);
        
        return () => clearInterval(interval);
      }, 300);
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  // Variantes pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }
  
  // Variantes pour le dialogue
  const dialogVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const lightnings = Array(20).fill().map((_, i) => (
    <div 
      key={`lightning-${i}`}
      className="absolute"
      style={{
        width: `${2 + Math.random() * 10}px`,
        height: `${100 + Math.random() * 150}px`,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 60}vh`,
        backgroundColor: 'rgba(255, 230, 130, 0.9)',
        clipPath: 'polygon(50% 0%, 30% 40%, 60% 50%, 40% 100%, 50% 100%, 70% 50%, 40% 40%)',
        transform: `rotate(${Math.random() * 30 - 15}deg)`,
        animation: `lightningFlash ${1 + Math.random() * 10}s infinite`,
        zIndex: 5,
        boxShadow: '0 0 20px rgba(255, 230, 130, 0.8)'
      }}
    />
  ));

  return (
    <motion.div 
      ref={ref}
      className="w-full h-screen bg-red-900 overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'radial-gradient(circle, rgba(180,0,0,1) 0%, rgba(70,0,0,1) 100%)'
        }}
      />

      <div className="size-96 bg-red-500 animate-heartbeat-panic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 z-10 h-screen w-screen">{lightnings}</div>
      <div className="absolute bottom-0 right-0 z-20 p-4">
        <motion.button 
          className="bg-red-500 text-white p-2 rounded-full shadow-lg"
          onClick={() => setIsDialogOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpLeft className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Dialog avec Animation */}
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
              exit: { opacity: 0 }
            }}
          >
            {/* Backdrop teinté */}
            <motion.div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDialogOpen(false)}
            />
            
            {/* Contenu du dialogue */}
            <motion.div 
              className="bg-gradient-to-br from-red-800 to-red-950 rounded-xl shadow-2xl p-8 m-4 max-w-lg relative z-10 border border-red-500/30"
              variants={dialogVariants}
            >
              <div className="absolute top-3 right-3">
                <motion.button
                  className="text-red-200 hover:text-white bg-red-900/50 rounded-full p-1"
                  onClick={() => setIsDialogOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <motion.h2 
                className="text-red-200 text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              >
                La colère est un état de l'esprit
              </motion.h2>
              
              <motion.p 
                className="text-red-100 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              >
                La colère naît souvent d'un sentiment d'impuissance face à une situation qui nous dépasse. Elle peut être dévastatrice si elle n'est pas maîtrisée, mais peut aussi devenir une force motrice pour le changement.
              </motion.p>
              
              <motion.p 
                className="text-red-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              >
                Apprendre à canaliser sa colère, c'est transformer une émotion destructrice en énergie constructive.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Angry;
