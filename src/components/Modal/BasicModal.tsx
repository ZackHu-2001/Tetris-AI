import React from 'react';
import MainMenu from './MainMenu';
import Control from './Control';
import Pause from './Pause';
import Setting from './Setting';
import { useGameBoard } from '../GameBoard';
import GameOver from './GameOver';

type BasicModalProps = {
};

export function switchMenu(currentId: string, nextId: string) {
    var currentMenu = document.getElementById(currentId);
    var nextMenu = document.getElementById(nextId);

    if (!currentMenu || !nextMenu) {
        console.error('Menu not found');
        return;
    }

    currentMenu.classList.remove('fade-in');
    currentMenu.classList.add('fade-out');

    setTimeout(function () {
        if (currentMenu && nextMenu) {
            nextMenu.classList.remove('fade-out');
            nextMenu.classList.add('fade-in');
        }
    }, 500);
}

const BasicModal: React.FC<BasicModalProps> = () => {
    const { gameState } = useGameBoard();

    return (
        gameState.modal === null ? <></> :
            <div style={{ backgroundColor: 'rgba(255,255,255, 0.9)', transition: 'opacity 0.3 easy-in-out' }} className='absolute w-full h-full z-20'>
                {gameState.status === null && gameState.modal === 'mainMenu' && <MainMenu />}
                {gameState.status === null && gameState.modal === 'control' && <Control />}
                {gameState.status === 'paused' && gameState.modal === 'pauseMenu' && <Pause />}
                {gameState.status === null && gameState.modal === 'setting' && <Setting />}
                {gameState.status === 'gameOver' && gameState.modal === 'gameOver' && <GameOver />}
            </div>
    )
}
export default BasicModal;