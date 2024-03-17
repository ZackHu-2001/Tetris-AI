import React from 'react';
import MainMenu from './MainMenu';
import Control from './Control';
import Pause from './Pause';
import Setting from './Setting';
import { useGameState } from '../GameState';

type BasicModalProps = {
};

const BasicModal: React.FC<BasicModalProps> = () => {
    const { gameState } = useGameState();

    return (

        gameState.modal === null ? <></> : <div style={{ backgroundColor: 'rgba(255,255,255, 0.9)', transition: 'opacity 0.3 easy-in-out' }} className='absolute w-full h-full z-20'>
            {gameState.status === null && gameState.modal === 'mainMenu' && <MainMenu />}
            {gameState.status === null && gameState.modal === 'control' && <Control />}
            {gameState.status === 'paused' && gameState.modal === 'pauseMenu' && <Pause />}
            {gameState.status === null && gameState.modal === 'setting' && <Setting />}
        </div>
    )
}
export default BasicModal;