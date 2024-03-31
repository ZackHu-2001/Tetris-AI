

import React from 'react';
import { useGameBoard, pack } from '@/components/GameBoard'; // Ensure correct path

// Annotating the `filled` prop type directly in the parameter list
const TetrominoBlock = ({ filled, color }: { filled: boolean, color: string }) => (
    <div className={`w-16 h-16 ${filled ? `${color} border border-gray-200` : 'bg-transparent'} box-border`}></div>
);

const NextTetromino = ({ tetromino }: { tetromino: number[] }) => {
    const tetroColor = mapColor(tetromino);
    const cols = mapColumn(tetromino); // Assuming a standard width for tetrominos
    var tetrominoCopy = [];
    for (let i = 0; i < tetromino.length; i++) {
        if (tetromino[i] !== 0) {
            tetrominoCopy.push(tetromino[i]);
        }
    }

    return (
        <div className='flex flex-col'>
            {tetrominoCopy.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        const isFilled = !!(row & (1 << (colIndex)));
                        return  <TetrominoBlock key={colIndex} filled={isFilled} color={tetroColor} />;
                        // Return null for empty cells, so they don't get rendered
                    })}
                </div>
            ))}
        </div>
    );
};

type NextPanelProps = {
    nextTetrominoQueue: number[];
    height: number;
};

const NextPanel: React.FC<NextPanelProps> = ({ nextTetrominoQueue, height }) => {
    const { gameState } = useGameBoard();
    return (
        <div style={{ fontSize: '5rem', height: height + '%' }} className='flex flex-col items-center p-4'>
            <div style={{ fontWeight: 'bold' }}>NEXT</div>

            <div className={`h-full py-[4rem] flex flex-col justify-between items-center`}>

                {nextTetrominoQueue.map((tetrominoIndex, index) => (
                     index <= 6 ? <NextTetromino key={index} tetromino={pack[tetrominoIndex]} /> : null
                ))}
            </div>
        </div>
    );
};

function mapColor(arr: number[]) {
    switch (arr.join('')) {
        case '01500':
            return 'bg-cyan-500';
        case '470':
            return 'bg-blue-500';
        case '270':
            return 'bg-purple-500';
        case '170':
            return 'bg-orange-500';
        case '33':
            return 'bg-yellow-500';
        case '036':
            return 'bg-green-500';
        case '063':
            return 'bg-red-500';
        default:
            return '';
    }
}

function mapColumn(arr : number[]) {
    switch (arr.join('')) {
        case '01500':
            return 4;
        case '470':
            return 3;
        case '270':
            return 3;
        case '170':
            return 3;
        case '33':
            return 2;
        case '036':
            return 3;
        case '063':
            return 3;
        default:
            return 0;
}}

export default NextPanel;



