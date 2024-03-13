import React, { useState, useEffect } from 'react';
import { gameStateAtom } from '@/app/atoms/gameStateAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type TimerProps = {
    
};

const Timer:React.FC<TimerProps> = () => {
    const [time, setTime] = useState(0);
    // const setGameState = useSetRecoilState(gameStateAtom);
    // const gameState = useRecoilValue(gameStateAtom);

    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - hours * 3600) / 60);
        const seconds = time % 60;

        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    // useEffect(() => {
    //     let intervalId: NodeJS.Timeout; 
    
    //     if (gameState.status == 'playing') { // Checking if showTimer is true
    //         intervalId = setInterval(() => { // Setting up an interval if showTimer is true
    //             setTime((time) => time + 1); // Incrementing the time state by 1 second
    //         }, 1000); // Interval set to run every 1000 milliseconds (1 second)
    //     }
    
    //     return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts or showTimer changes
    // }, [gameState.status == 'playing']); // Dependency array - useEffect will re-run whenever showTimer changes
    
    
    return <div>{formatTime(time)}</div>
}
export default Timer;