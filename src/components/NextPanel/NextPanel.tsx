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
import { useGameBoard, tetrominos} from '@/components/GameBoard'; // Ensure correct path


// const binaryToTypeMapping = Object.entries(tetrominos).reduce((acc, [type, shapes]) => {
//     // Assuming shapes are unique across types, which might need verification
//     shapes.forEach(shape => {
//         // The key is the binary representation as a string; value is the type
//         acc[shape.toString()] = type;gut pull
//     });
//     return acc;
// }, {});

// Annotating the `filled` prop type directly in the parameter list
const TetrominoBlock = ({ filled }: { filled: boolean }) => (
    <div className={`w-4 h-4 m-[-1px] ${filled ? 'bg-red-500' : 'bg-transparent'} border border-gray-200`}></div>
);


const NextTetromino = ({ tetromino }: { tetromino: number[] }) => {
    const cols = 4;
    return (
        <div className='flex flex-col items-center mb-2 p-[1px]'> {/* Add slight padding */}
            {tetromino.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        const isFilled = !!(row & (1 << (cols - 1 - colIndex)));
                        return isFilled ? (
                            <TetrominoBlock key={colIndex} filled={true} />
                        ) : null;
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