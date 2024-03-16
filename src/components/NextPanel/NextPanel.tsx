// import React from 'react';
// import { useGameBoard} from '@/components/GameBoard'
// type NextPanelProps = {

// };

// const NextPanel: React.FC<NextPanelProps> = () => {
//     const { nextTetrominoQueue } = useGameBoard();

//     return (
//         <div className='w-1/6 h-[100vh] flex flex-col items-center'>
//             Next

//             {nextTetrominoQueue.map((tetromino, index) => (
//                 <div key={index}>
//                     {tetromino}
//                 </div>
//             ))}
//         </div>
//     )
// }
// export default NextPanel;

import React from 'react';
import { useGameBoard } from '@/components/GameBoard'; // Ensure correct path

// Annotating the `filled` prop type directly in the parameter list
const TetrominoBlock = ({ filled }: { filled: boolean }) => (
    <div className={`w-4 h-4 ${filled ? 'bg-red-500' : 'bg-transparent'} border border-gray-200`}></div>
);


const NextTetromino = ({ tetromino }: { tetromino: number[] }) => {
    const cols = 4; // Assuming a standard width for tetrominos
    return (
        <div className='flex flex-col items-center mb-2'>
            {tetromino.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        // Determine if the cell is filled
                        const isFilled = !!(row & (1 << (cols - 1 - colIndex)));
                        // Only render TetrominoBlock for filled cells
                        return isFilled ? (
                            <TetrominoBlock key={colIndex} filled={true} />
                        ) : null; // Return null for empty cells, so they don't get rendered
                    })}
                </div>
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