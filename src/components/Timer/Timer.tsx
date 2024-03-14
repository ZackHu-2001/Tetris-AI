import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { useGameState } from '../gameVariable';

interface timer {
    time: number,
    start: () => void,
    pause: () => void,
    reset: () => void,
}

type TimerProps = {
    
};

const Timer:React.FC<TimerProps> = () => {
    const { gameState } = useGameState();
    const [time, setTime] = useState(0);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) / 0.01);

        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined; 
    
        if (gameState.status == 'playing') { // Checking if showTimer is true
            intervalId = setInterval(() => { // Setting up an interval if showTimer is true
                setTime((time) => time + 0.01); // Incrementing the time state by 1 second
            }, 10); // Interval set to run every 1000 milliseconds (1 second)
        }
        
        if (gameState.status == 'paused') {
            if (intervalId !== undefined) {
                clearInterval(intervalId);
            }
        }
        
        if (gameState.status == 'gameover') {
            setTime(0);
        }

        return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts or showTimer changes
    }, [gameState, setTime]); // Dependency array - useEffect will re-run whenever showTimer changes
    
    
    return <div className='w-full flex '>{formatTime(time).split('').map((char: string, index: number) => {
        return <div style={{width: '8rem'}} className=' flex justify-center'>{char}</div>
    })}</div>
}
export default Timer;