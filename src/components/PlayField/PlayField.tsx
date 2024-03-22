import React, { useEffect } from 'react';
import { useGameBoard } from '../GameBoard';

type PlayFieldProps = {};

const PlayField: React.FC<PlayFieldProps> = () => {
    const { setStatus, setModal, board, moveDown, moveLeft, moveRight, drop, clockWiseRotate, anticlockWiseRotate, keyBindings } = useGameBoard()
    const rowNum = 20;
    const colNum = 10;
    const boradLength = Object.keys(board).length;
    let counted = false;
    let tetrominoCopy = [];

    const initializeGame = () => {};
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            switch (event.code) {
                case keyBindings.moveDown.code: 
                    moveDown();
                    break;
                case keyBindings.moveRight.code:
                    moveRight();
                    break;
                case keyBindings.moveLeft.code:
                    moveLeft();
                    break;
                case keyBindings.drop.code:
                    drop();
                    break;
                case 'Escape':
                    // TODO show the pause menu
                    setStatus('paused');
                    setModal('pauseMenu');
                    break;
                case keyBindings.anticlockWiseRotate.code:
                    anticlockWiseRotate();
                    break;
                case keyBindings.clockWiseRotate.code:
                    clockWiseRotate();
                    break;
            }
            // console.log('key pressed', event.key);
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [keyBindings]);
    

    return (
        <div className='absolute w-full h-full top-0 left-0 z-10 flex flex-col '>
            {board.map((row, rowIndex) => {
                counted = false;
                if (rowIndex < boradLength - tetrominoCopy.length){
                return (<div style={{height: '5%'}} className='w-full flex ' key={rowIndex}>
                    {Array.from({ length: colNum }).map((_, i) => {
                        return (
                            <div className=' h-full bg-black' key={rowIndex * 10 + i} 
                            style={{ width: '10%', border: '', boxSizing: 'border-box', backgroundColor: (()=>{
                                if (row & (1 << i)){
                                    if (!counted){
                                        counted = true;
                                        tetrominoCopy.push(row);
                                    }
                                    return 'red'
                                } else {
                                    return ''
                                }
                            })()}}>
                                {/* {row & (1 << i)} */}
                            </div>
                        )

                    })}
                </div>)}
                else {
                    return (<div style={{height: '5%'}} className='w-full flex ' key={rowIndex}>
                    {Array.from({ length: colNum }).map((_, i) => {
                        return (
                            <div className=' h-full bg-black' key={rowIndex * 10 + i} 
                            style={{ width: '10%', border: '', boxSizing: 'border-box', backgroundColor: (()=>{
                                if (row & (1 << i)){
                                    if (!counted){
                                        counted = true;
                                        tetrominoCopy.push(row);
                                    }
                                    return 'red'
                                } else if (tetrominoCopy[rowIndex - boradLength + tetrominoCopy.length] & (1 << i)){
                                    return 'lightcoral'
                                }
                                else {
                                    return ''
                                }
                            })()}}>
                                {/* {row & (1 << i)} */}
                            </div>
                        )

                    })}
                </div>)
                }
            }
            )}
        </div>
    )

}


export default PlayField;