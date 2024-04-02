

import React from 'react';
import { useGameBoard, pack } from '@/components/GameBoard'; // Ensure correct path

// Annotating the `filled` prop type directly in the parameter list
const TetrominoBlock = ({ filled, color, width }: { filled: boolean, color: string, width: number }) => (
    filled ? <div className={color}></div> : <div style={{ width: width }} className='bg-transparent'></div>
);


const NextTetromino = ({ tetromino, width} : {tetromino: number[], width: number}) => {
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
                        return <TetrominoBlock key={colIndex} width={width} filled={isFilled} color={tetroColor} />;
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
    const width = Math.floor(parseFloat(document.documentElement.style.getPropertyValue('--brickWidth')));
    return (
        <div style={{ fontSize: '5rem', height: height + '%' }} className='flex flex-col items-center p-4'>
            <div style={{ fontWeight: 'bold' }}>NEXT</div>

            <div className={`h-full py-[4rem] flex flex-col justify-between items-center`}>

                {nextTetrominoQueue.map((tetrominoIndex, index) => (
                    index <= 6 ? <NextTetromino key={index} tetromino={pack[tetrominoIndex]} width={width} /> : null
                ))}
            </div>
        </div>
    );
};

function mapColor(arr: number[]) {
    switch (arr.join('')) {
        case '01500':
            return 'brick_skyBlue';
        case '470':
            return 'brick_orange';
        case '270':
            return 'brick_purple';
        case '170':
            return 'brick_blue';
        case '33':
            return 'brick_yellow';
        case '036':
            return 'brick_red';
        case '063':
            return 'brick_green';
        default:
            return '';
    }
}

function mapColumn(arr: number[]) {
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
    }
}

export default NextPanel;



