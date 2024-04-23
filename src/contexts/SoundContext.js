import React, { useContext, createContext, useRef } from 'react';
import { useGameBoard } from '@/components/GameBoard';

// Create a context
const SoundContext = createContext();

// Provider component
export const SoundProvider = ({ children }) => {
  const clickSoundRef = useRef(new Audio('/click.mp3'));
  const clearLineSoundRef = useRef(new Audio('/clearLine.mp3'));
  const moveSoundRef = useRef(new Audio('/move.mp3'));
  const { settings } = useGameBoard();

  const playClearLineSound = () => {
    if (!settings.sound) return;
    const audio = clearLineSoundRef.current;
    if (audio) {
        audio.currentTime = 0;
        audio.volume = settings.volume / 100;
        audio.play();
    }
  }

  const playClickSound = () => {
    if (!settings.sound) return;
    const audio = clickSoundRef.current;
    if (audio) {
        audio.currentTime = 0;
        audio.volume = settings.volume / 100;
        audio.play();
    }
  };

  const playMoveSound = () => {
    if (!settings.sound) return;
    const audio = moveSoundRef.current;
    if (audio) {
        audio.currentTime = 0;
        audio.volume = settings.volume / 100;
        audio.play();
    }
  }

  return (
    <SoundContext.Provider value={{ playClickSound, playMoveSound, playClearLineSound }}>
      {children}
    </SoundContext.Provider>
  );
};

// Custom hook to use the sound context
export const useSound = () => useContext(SoundContext);
