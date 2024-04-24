'use client';
// Assuming that `useGameBoard` has proper TypeScript definitions
import React, { useContext, createContext, useRef, ReactNode, ReactElement, useEffect } from 'react';

// Assuming your `useGameBoard` hook is properly typed
import { useGameBoard } from '@/components/GameBoard';

// Define the shape of your context, what will be provided for the consumers
interface SoundContextType {
  playClickSound: () => void;
  playMoveSound: () => void;
  playClearLineSound: () => void;
}

// Create a context with a default value matching the SoundContextType
const SoundContext = createContext<SoundContextType | null>(null);

interface SoundProviderProps {
  children: React.ReactNode;
}

// Provider component
export const SoundProvider: React.FC<SoundProviderProps> = ({ children }): ReactElement => {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const clearLineSoundRef = useRef<HTMLAudioElement | null>(null);
  const moveSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSoundRef.current = new Audio('/click.mp3');
    clearLineSoundRef.current = new Audio('/clearLine.mp3');
    moveSoundRef.current = new Audio('/move.mp3');
  }, [])
  
  // Assuming settings has a proper TypeScript interface as well
  const { settings } = useGameBoard();

  // Define the functions that will play the sounds
  const playClearLineSound = (): void => {
    if (!settings.sound) return;
    const audio = clearLineSoundRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = settings.volume / 100;
      audio.play();
    }
  };

  const playClickSound = (): void => {
    if (!settings.sound) return;
    const audio = clickSoundRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = settings.volume / 100;
      audio.play();
    }
  };

  const playMoveSound = (): void => {
    if (!settings.sound) return;
    const audio = moveSoundRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = settings.volume / 100;
      audio.play();
    }
  };

  // Provide the context value with a proper type
  const soundContextValue: SoundContextType = {
    playClickSound,
    playMoveSound,
    playClearLineSound,
  };

  return (
    <SoundContext.Provider value={soundContextValue}>
      {children}
    </SoundContext.Provider>
  );
};

// Custom hook to use the sound context
export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === null) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
