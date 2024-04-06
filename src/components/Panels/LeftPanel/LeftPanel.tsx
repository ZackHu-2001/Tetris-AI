'use client'
import React from 'react';
import { useGameBoard } from '../../GameBoard';
import NextPanel from '../NextPanel/NextPanel';
import StatusPanel from '../StatusPanel/StatusPanel';

type LeftPanelProps = {};

const LeftPanel: React.FC<LeftPanelProps> = () => {

    const { gameState, nextTetrominoQueue, nextTetrominoQueue_AI } = useGameBoard();
    const { score, lines } = useGameBoard(state => ({ score: state.score, lines: state.lines }));
    return (
        <>
            {gameState.mode === 'competition' ?
                <div style={{ width: '16.5%', height: '100%' }}>
                    <NextPanel nextTetrominoQueue={nextTetrominoQueue} height={77}/>
                    <StatusPanel />
                </div>
                :
                <div style={{ width: '25%'}}>
                    <NextPanel nextTetrominoQueue={nextTetrominoQueue} height={100}/>
                </div>
            }
        </>
    )
}

export default LeftPanel;