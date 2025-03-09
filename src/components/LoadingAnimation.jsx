import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Noise from './noise';

export default function LoadingAnimation({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const nextProgress = prevProgress + 1;
        
        if (nextProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800); 
          return 100;
        }
        
        return nextProgress;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <AnimatePresence>
      {!isComplete || progress < 100 ? (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-white"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              ease: "easeInOut" 
            }
          }}
        >
          <div className="absolute inset-0 z-10">
            <Noise />
          </div>
          
          <div className="flex flex-col items-center z-20 relative">
            <div className="w-40 h-px bg-gray-200 relative">
              <motion.div 
                className="absolute top-0 left-0 h-px bg-black"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="mt-4 text-xs font-light tracking-widest text-gray-400">
              {Math.floor(progress)}
            </div>
          </div>
          
          {progress === 100 && (
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0], 
                scale: [1, 1.05, 1.1]
              }}
              transition={{ 
                duration: 0.8, 
                times: [0, 0.5, 1],
                ease: "easeInOut" 
              }}
            />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
