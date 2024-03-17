import React, { useState, useEffect } from 'react';
import { useGameState } from '../GameState';
import { useGameBoard } from '../GameBoard';

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
    const { gameBoard, moveDown } = useGameBoard();

    const [time, setTime] = useState(0);

    const moveDownInterval: number = 1;

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) / 0.01);

        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
    }

    useEffect(() => {
        let timerInterval: NodeJS.Timeout | undefined; 
        let dropInterval: NodeJS.Timeout | undefined; 
         
        if (gameState.status == 'playing') { 
            timerInterval = setInterval(() => { 
                setTime((time) => time + 0.01); 
            }, 10); 
            dropInterval = setInterval(() => {
                moveDown()
            }, 1000);
        }
        
        if (gameState.status == 'paused') {
            if (timerInterval !== undefined) {
                clearInterval(timerInterval);
            }
            if (dropInterval !== undefined) {
                clearInterval(dropInterval);
            }
        }
        
        if (gameState.status == 'gameover') {
            setTime(0);
        }

        return () => {
            clearInterval(timerInterval);
            clearInterval(dropInterval);
         } // Cleanup function to clear the interval when the component unmounts or showTimer changes
    }, [gameState, setTime, moveDown]); 
    
    
    return <div className='w-full flex '>{formatTime(time).split('').map((char: string, index: number) => {
        return <div key={index} className='timer-char'>{char}</div>
    })}</div>
}
export default Timer;