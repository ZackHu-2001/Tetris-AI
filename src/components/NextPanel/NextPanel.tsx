import React from 'react';
import { useGameBoard} from '@/components/GameBoard'
type NextPanelProps = {

};

const NextPanel: React.FC<NextPanelProps> = () => {
    const { nextTetrominoQueue } = useGameBoard();

    return (
        <div className='w-1/6 h-[100vh] flex flex-col items-center'>
            Next

            {nextTetrominoQueue.map((tetromino, index) => (
                <div key={index}>
                    {tetromino}
                </div>
            ))}
        </div>
    )
}
export default NextPanel;