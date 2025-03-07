import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const AudioPlayer = ({ emotionId }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mapper les émotions avec leurs fichiers audio
  const audioFiles = {
    landing: '/sounds/ambient.mp3',
    desespoir: '/sounds/despair.mp3',
    acceptation: '/sounds/acceptance.mp3',
    espoir: '/sounds/hope.mp3'
  };

  useEffect(() => {
    // Charger le bon fichier audio quand l'émotion change
    if (audioRef.current) {
      audioRef.current.src = audioFiles[emotionId] || audioFiles.landing;
      
      // Fade out avant de changer
      if (isPlaying) {
        const fadeOutInterval = setInterval(() => {
          if (audioRef.current.volume > 0.1) {
            audioRef.current.volume -= 0.1;
          } else {
            clearInterval(fadeOutInterval);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 1;
            audioRef.current.play().catch(e => console.log('Lecture audio automatique bloquée'));
          }
        }, 50);
      } else {
        // Première lecture
        audioRef.current.volume = 0;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            // Fade in
            const fadeInInterval = setInterval(() => {
              if (audioRef.current.volume < 0.9) {
                audioRef.current.volume += 0.1;
              } else {
                clearInterval(fadeInInterval);
                audioRef.current.volume = 1;
              }
            }, 100);
          })
          .catch(e => console.log('Lecture audio automatique bloquée'));
      }
    }

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [emotionId]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} loop />
      <motion.button 
        onClick={toggleAudio}
        className="audio-control"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ opacity: isPlaying ? 1 : 0.7 }}
      >
        {isPlaying ? (
          <span className="sound-on">♪</span>
        ) : (
          <span className="sound-off">♪</span>
        )}
      </motion.button>
    </div>
  );
};

export default AudioPlayer; 