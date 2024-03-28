'use client'
import React from 'react';
import Timer from '@/components/Timer/Timer';
import { useGameBoard } from '../../GameBoard';

type StatusPanelProps = {
    AIcontrol?: boolean;
};

const StatusPanel: React.FC<StatusPanelProps> = ({ AIcontrol }) => {
    const { gameState, score, lines, score_AI, lines_AI, fallingTetromino, offSet, fallingTetromino_AI, offSet_AI  } = useGameBoard();
    let s = AIcontrol ? score : score_AI;
    let l = AIcontrol ? lines : lines_AI;

    return (
        <div style={{ fontSize: '5rem' }} className=' flex flex-col items-center '>
            <div style={{ fontWeight: 'bold' }}>STATUS</div>
            <div>Score: {s}</div>
            <div>Lines: {l}</div>
            <Timer fontSize='5rem' />
            {AIcontrol ? <>
            <div>{fallingTetromino_AI}</div>
            <div>{offSet_AI}</div></> : 
            <>
            <div>{fallingTetromino}</div>
            <div>{offSet}</div></>  }
            {/* <div>{gameState.status}</div>
            <div>{gameState.modal}</div>
            <div>{gameState.mode}</div>
            <div>{gameState.winOrLose}</div>
            <div>{offSet}</div> */}
        </div>
    )
}
export default StatusPanel;

