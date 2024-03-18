

import React from 'react';
import { useGameBoard } from '@/components/GameBoard'; // Ensure correct path

// Annotating the `filled` prop type directly in the parameter list
const TetrominoBlock = ({filled}: {filled: boolean}) => (
    <div className={`w-4 h-4 ${filled ? 'bg-red-500 border border-gray-200' : 'bg-transparent'} box-border`}></div>
);


const NextTetromino = ({ tetromino }: { tetromino: number[] }) => {
    const cols = 4; // Assuming a standard width for tetrominos
    return (
        <div className='flex flex-col'>
            {tetromino.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        const isFilled = !!(row & (1 << (cols - 1 - colIndex)));
                        return (
                            <TetrominoBlock key={colIndex} filled={isFilled}/>
                            )
                         // Return null for empty cells, so they don't get rendered
                    })}
                </div>
            ))}
        </div>
    );
};

const NextPanel = () => {
    const { nextTetrominoQueue } = useGameBoard(); 

    return (
        <div style={{width: '12.5%'}} className='flex flex-col items-center p-4'>
            <span className='text-lg font-bold mb-4'>Next</span>
            {nextTetrominoQueue.map((tetromino, index) => (
                // Add a margin class to the div wrapping the NextTetromino component
                <div key={index} className='mb-8'> {/* Adjust the margin-bottom (mb-*) value as needed */}
                    <NextTetromino tetromino={tetromino} />
                </div>
            ))}
        </div>
    );
};

export default NextPanel;



