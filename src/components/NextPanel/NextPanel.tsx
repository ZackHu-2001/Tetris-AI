

import React from 'react';
import { useGameBoard, tetrominos} from '@/components/GameBoard'; // Ensure correct path


const TetrominoBlock = ({ filled }: { filled: boolean }) => (
    <div className={`w-4 h-4 ${filled ? 'bg-red-500' : 'bg-transparent'} border border-gray-200`}></div>
);

const NextTetromino = ({ tetromino }: { tetromino: number[] }) => {
    const cols = 4; // Assuming a standard width for tetrominos

    return (
        <div className='grid grid-cols-4 gap-px items-center mb-2'>
            {tetromino.map((row, rowIndex) => (
                Array.from({ length: cols }).map((_, colIndex) => {
                    const isFilled = !!(row & (1 << (cols - 1 - colIndex)));
                    // Render TetrominoBlock for filled cells, otherwise render a placeholder for spacing
                    return isFilled ? (
                        <TetrominoBlock key={`${rowIndex}-${colIndex}`} filled={true} />
                    ) : (
                        // Use an empty div with the same dimensions but no border for spacing in the grid
                        <div key={`${rowIndex}-${colIndex}`} className="w-4 h-4 bg-transparent"></div>
                    );
                })
            ))}
        </div>
    );
};
const NextPanel = () => {
    const { nextTetrominoQueue } = useGameBoard(); 

    return (
        <div className='w-1/6 h-screen flex flex-col items-center p-4'>
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