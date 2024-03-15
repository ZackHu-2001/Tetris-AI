import React from 'react';
import { useGameBoard } from '../GameBoard';

type PlayFieldProps = {

};

const PlayField: React.FC<PlayFieldProps> = () => {
    const { board } = useGameBoard()
    
    const rowNum = 20;
    const colNum = 10;

    const initializeGame = () => {

    };

    return (
        <div className='absolute w-full h-full top-0 left-0 z-10 flex flex-col'>
            {board.map((row, rowIndex) => {
                return (<div style={{height: '5%'}} className='w-full flex ' key={rowIndex}>
                    {Array.from({ length: colNum }).map((_, i) => {
                        return (
                            <div className=' h-full bg-black' key={rowIndex * 10 + i} 
                            style={{ width: '10%', border: '1px solid green', boxSizing: 'border-box', backgroundColor: (row & (1 << i)) ? "red" : ""}}>
                                {row & (1 << i)}
                            </div>
                        )

                    })}
                </div>)
            }
            )}
        </div>
    )

}
export default PlayField;