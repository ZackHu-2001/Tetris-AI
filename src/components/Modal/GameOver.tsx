import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameBoard } from '../GameBoard';

type GameOverProps = {};

const GameOver: React.FC<GameOverProps> = () => {
    const { gameState, setStatus, pop, updateBoard, setFallingShape, setWinOrLose, setModal, setMode, initializeTetrominoQueue, setIsNewGame, setFallingTetromino, initializeGameBoard } = useGameBoard();
    const handleReturn = () => {
        setStatus("playing")
        setModal(null)
        setWinOrLose(null);
    }

    const handleRetry = () => {        
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

        // change global game state
        setStatus('playing');
        setMode('sprint');
        setModal(null);
        setWinOrLose(null);
    }

    const handleClickMainMenu = () => {
        setStatus(null)
        setModal('mainMenu')
        // reset timer
        setIsNewGame(true)

    }

    return <div className='w-full h-full flex flex-col justify-center items-center'>
        {gameState.winOrLose === 'win' && <div className='title'>GREATE!</div>}
        {gameState.winOrLose === 'lose' && <div className='title'>BLOCK OUT!</div>}
            
        <MenuButton text='Retry' onClick={handleRetry}></MenuButton>
        <MenuButton text='Main Menu' onClick={handleClickMainMenu}></MenuButton>
    </div>
}
export default GameOver;