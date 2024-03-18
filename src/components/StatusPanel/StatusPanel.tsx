'use client'
import React from 'react';
import Timer from '@/components/Timer/Timer';
import { useGameBoard } from '../GameBoard';

type StatusPanelProps = {};

const StatusPanel:React.FC<StatusPanelProps> = () => {
    const { score, lines } = useGameBoard(state => ({ score: state.score, lines: state.lines }));
    return (
        <div style={{width: '12.5%'}} className=' flex flex-col items-center '>
            <div>Status</div>
            <div>Score: {score}</div>
            <div>Lines: {lines}</div>
            <Timer />
        </div>
    )
}
export default StatusPanel;

