'use client'
import React from 'react';
import Timer from '@/components/Timer/Timer';
import { useGameBoard } from '../../GameBoard';

type StatusPanelProps = {
    AIcontrol?: boolean;
};

const StatusPanel: React.FC<StatusPanelProps> = ({ AIcontrol }) => {
    const { gameState, score, lines, score_AI, lines_AI } = useGameBoard();
    let s = AIcontrol ? score_AI : score;
    let l = AIcontrol ? lines_AI : lines;

    return (
        <div style={{ fontSize: `${gameState.mode !== 'competition' ? 5 : 4}rem` }} className=' flex flex-col items-center justify-between'>
            {gameState.mode !== 'competition' && <div style={{ fontWeight: 'bold' }}>STATUS</div>}
            <div className='flex flex-col items-center'>
                <div className={`w-full flex flex-col items-center ${gameState.mode === "competition" ? 'py-4' : 'py-12'}`}>
                    <div style={{ fontSize: `${gameState.mode !== 'competition' ? 9 : 5}rem`, fontWeight: 'bold' }} >{s}</div>
                    <div>Score</div>
                </div>
                <div className=' w-full flex flex-col items-center '>
                    <div style={{ fontSize: `${gameState.mode !== 'competition' ? 9 : 5}rem`, fontWeight: 'bold' }}>{l}</div>
                    <div>Lines</div>
                </div>
            </div>
            <Timer fontSize='5rem' />

        </div>
    )
}
export default StatusPanel;

