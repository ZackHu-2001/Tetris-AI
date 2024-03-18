import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameState } from '../GameState';
import { useGameBoard } from '../GameBoard';
import { getRandomTetromino } from '@/components/GameBoard'

type PauseProps = {};

const Pause: React.FC<PauseProps> = () => {
    const { setStatus, setModal, setMode } = useGameState();
    const { setIsNewGame, append, setFallingTetromino, initializeGameBoard } = useGameBoard();
    const handleReturn = () => {
        setStatus("playing")
        setModal(null)
    }

    const handleRetry = () => {
        setStatus("playing")
        setModal(null)
        
        // reset timer
        setIsNewGame(true)

        // reset game board
        // initialize nextTetrominoQueue
        for (let i = 0; i < 6; i++) {
            append(getRandomTetromino());
        }

        // initialize game board
        initializeGameBoard();

        // initialize fallingTetromino
        setFallingTetromino(getRandomTetromino());

        // change global game state
        setStatus('playing');
        setMode('sprint');
        setModal(null);

        // initialize the game board and add tetromino inside it
        initializeGameBoard();
        setFallingTetromino(getRandomTetromino())
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