'use client'
import React from 'react';
import Timer from '@/components/Timer/Timer';
import { useGameBoard } from '../GameBoard';

type StatusPanelProps = {};

const StatusPanel:React.FC<StatusPanelProps> = () => {

    const { gameState, fallingTetromino, gameBoard, board } = useGameBoard();
    const { score, lines } = useGameBoard(state => ({ score: state.score, lines: state.lines }));
    return (
        <div style={{width: '25%', fontSize: '5rem'}} className=' flex flex-col items-center '>
            <div style={{fontWeight: 'bold'}}>STATUS</div>
            <div>Score: {score}</div>
            <div>Lines: {lines}</div>
            <Timer />
            <div>{fallingTetromino}</div>
            <div>{gameBoard}</div>
            <div>{board}</div>
            <div>{gameState.status}</div>
            <div>{gameState.modal}</div>
            <div>{gameState.mode}</div>
            <div>{gameState.winOrLose}</div>
        
        </div>
    )
}
export default StatusPanel;

