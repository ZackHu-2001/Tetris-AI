import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameBoard, rowNum } from '../GameBoard';

type PauseProps = {};

const Pause: React.FC<PauseProps> = () => {
    const { gameState, AIready, setIsNewGame, setAIready, 
        setStatus, setModal, startGame } = useGameBoard();
    const handleReturn = () => {
        setStatus("playing")
        setModal(null)
        setAIready(true)
    }

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
        <div className='title'>Paused</div>
        <MenuButton text='Return' onClick={handleReturn}></MenuButton>
        <MenuButton text='Retry' onClick={handleRetry}></MenuButton>
        <MenuButton text='Main Menu' onClick={handleClickMainMenu}></MenuButton>
    </div>
}
export default Pause;