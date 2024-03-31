import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { rowNum, useGameBoard } from '../GameBoard';

type GameOverProps = {};

const GameOver: React.FC<GameOverProps> = () => {
    const { gameState, startGame, setStatus, pop, setLines, offSet, updateBoard, setFallingShape, setWinOrLose, setModal, setMode, initializeTetrominoQueue, setIsNewGame, setFallingTetromino, initializeGameBoard } = useGameBoard();

    const handleRetry = () => { 
        if (gameState.mode === null) {
            throw new Error('gameState.mode is null')
        }
        startGame(gameState.mode)   
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