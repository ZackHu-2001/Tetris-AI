

import React from 'react';
import { useGameBoard } from '@/components/GameBoard'; // Ensure correct path



// Annotating the `filled` prop type directly in the parameter list
const TetrominoBlock = ({filled, color}: {filled: boolean, color:string}) => (
    <div className={`w-4 h-4 ${filled ? `${color} border border-gray-200` : 'bg-transparent'} box-border`}></div>
);


const NextTetromino = ({ tetromino }: { tetromino: number[] }) => {
    const cols = 4; // Assuming a standard width for tetrominos
    const tetroColor = mapColor(tetromino);
    return (
        <div className='flex flex-col'>
            {tetromino.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        const isFilled = !!(row & (1 << (cols - 1 - colIndex)));
                        return (
                            <TetrominoBlock key={colIndex} filled={isFilled} color={tetroColor}/>
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
        <div style={{width: '25%', fontSize: '5rem'}} className='flex flex-col items-center p-4'>
            <div style={{fontWeight: 'bold'}}>NEXT</div>
            {nextTetrominoQueue.map((tetromino, index) => (
                // Add a margin class to the div wrapping the NextTetromino component
                <div key={index} className='mb-8'> {/* Adjust the margin-bottom (mb-*) value as needed */}
                    <NextTetromino tetromino={tetromino} />
                </div>
            ))}
        </div>
    );
};
function mapColor(arr: number[]) {
    switch (arr.join(',')) {
        case '15':
            return 'bg-cyan-500';
        case '4,7':
            return 'bg-blue-500';
        case '2,7':
            return 'bg-purple-500';
        case '1,7':
            return 'bg-orange-500';
        case '3,3':
            return 'bg-yellow-500';
        case '3,6':
            return 'bg-green-500';
        case '6,3':
            return 'bg-red-500';
        default:
            return '';
    }
}

export default NextPanel;



