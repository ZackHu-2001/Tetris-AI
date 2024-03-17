'use client'
import React from 'react';
import Timer from '@/components/Timer/Timer';
import { useGameBoard } from '@/components/GameBoard';

type StatusPanelProps = {

};

const StatusPanel:React.FC<StatusPanelProps> = () => {
    const { score, lines } = useGameBoard(state => ({ score: state.score, lines: state.lines }));
    
    return (
        <div className='w-1/6 flex flex-col items-center '>
            <div>Status</div>
            <div>Score: {score}</div>
            <div>Lines: {lines}</div>
            <Timer />
        </div>
    )
    
}
export default StatusPanel;

