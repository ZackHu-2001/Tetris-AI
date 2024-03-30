'use client'
import React from 'react';
import Timer from '@/components/Timer/Timer';
import { useGameBoard } from '../../GameBoard';

type StatusPanelProps = {
    AIcontrol?: boolean;
};

const StatusPanel: React.FC<StatusPanelProps> = ({ AIcontrol }) => {
    const { gameState, score, lines, score_AI, lines_AI} = useGameBoard();
    let s = AIcontrol ? score_AI : score;
    let l = AIcontrol ? lines_AI : lines;

    return (
        <div style={{ fontSize: '5rem' }} className=' flex flex-col items-center '>
            <div style={{ fontWeight: 'bold' }}>STATUS</div>
            <div>Score: {s}</div>
            <div>Lines: {l}</div>
            <Timer fontSize='5rem' />
            {/* <div>{gameState.winOrLose}</div> */}
        </div>
    )
}
export default StatusPanel;

