import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameBoard } from '../GameBoard';

type PauseProps = {};

const Pause: React.FC<PauseProps> = () => {
    const { setStatus, pop, updateBoard, setFallingShape, setWinOrLose, setModal, setMode, initializeTetrominoQueue, setIsNewGame, setFallingTetromino, initializeGameBoard } = useGameBoard();
    const handleReturn = () => {
        setStatus("playing")
        setModal(null)
    }

    const handleRetry = () => {
        setStatus("playing")
        setModal(null)
        setWinOrLose(null);
        
        // reset timer
        setIsNewGame(true)

        // reset game board
        // initialize nextTetrominoQueue
        initializeTetrominoQueue();

        // initialize game board
        initializeGameBoard();

        // initialize fallingTetromino
        const NextTetromino = pop();
        setFallingTetromino(NextTetromino);
        setFallingShape(NextTetromino);
        
        updateBoard();
    }

    const handleClickMainMenu = () => {
        setStatus(null)
        setModal('mainMenu')
        // reset timer
        setIsNewGame(true)
    }

    return <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='title'>Paused</div>
        <MenuButton text='Return' onClick={handleReturn}></MenuButton>
        <MenuButton text='Retry' onClick={handleRetry}></MenuButton>
        <MenuButton text='Main Menu' onClick={handleClickMainMenu}></MenuButton>
    </div>
}
export default Pause;