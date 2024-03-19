'use client'
import React from 'react';
import Timer from '@/components/Timer/Timer';
import { useGameBoard } from '../GameBoard';

type StatusPanelProps = {};

const StatusPanel:React.FC<StatusPanelProps> = () => {
    const { fallingTetromino, gameBoard, board } = useGameBoard();
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

        </div>
    )
}
export default StatusPanel;

