

import React from 'react';
import { useGameBoard, pack } from '@/components/GameBoard'; // Ensure correct path

// Annotating the `filled` prop type directly in the parameter list
const TetrominoBlock = ({ filled, color, width }: { filled: boolean, color: string, width: number }) => (
    filled ? <div className={color}></div> : <div style={{ width: width }} className='bg-transparent'></div>
);


const NextTetromino = ({ tetromino, width }: { tetromino: number[][], width: number }) => {
    const tetroColor = mapColor(tetromino);

    return (
        <div className='flex flex-col'>
            {tetromino.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {row.map((value, index) => {
                        return <TetrominoBlock key={index} width={width} filled={!!value} color={tetroColor} />;
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
    const { gameState, width } = useGameBoard();
    return (
        <div style={{ fontSize: '5rem', height: height + '%' }} className='flex flex-col items-center '>
            <div style={{ fontWeight: 'bold' }}>NEXT</div>
            {/* { gameState.mode === 'competition' ? <></> : <div style={{ fontWeight: 'bold' }}>NEXT</div>} */}

            <div className={`h-full ${gameState.mode === 'competition' ? '': 'py-16'} flex flex-col justify-between items-center `}>

                {nextTetrominoQueue.map((tetrominoIndex, index) => (
                    index <= ( gameState.mode === 'competition' ? 3: 6) ? <NextTetromino key={index} tetromino={pack[tetrominoIndex]} width={width/10} /> : null
                ))}
            </div>
        </div>
    );
};

function mapColor(arr: number[][]) {
    let str = arr.join();
    if (str.includes('7')) {
        return `brick_blue`;
    } else if (str.includes('6')) {
        return 'brick_orange';
    } else if (str.includes('5')) {
        return 'brick_skyBlue';
    } else if (str.includes('4')) {
        return 'brick_red';
    } else if (str.includes('3')) {
        return 'brick_green';
    } else if (str.includes('2')) {
        return 'brick_purple';
    } else if (str.includes('1')) {
        return 'brick_yellow';
    } else {
        return '';
    }
}

export default NextPanel;