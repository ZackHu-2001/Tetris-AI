import React from 'react';
import MainMenu from './MainMenu';
import Control from './Control';
import Pause from './Pause';
import Setting from './Setting';


type GameState = {
    status: 'paused' | 'playing' | 'gameover' | null,
    mode: 'sprint' | 'competition' | 'endless' | null,
    modal: 'mainMenu' | 'pauseMenu' | 'control' | 'setting' | null
  }

type BasicModalProps = {
    gameState: GameState
};

const BasicModal:React.FC<BasicModalProps> = ({ gameState }) => {
    
    return (
        <div style={{backgroundColor: 'rgba(255,255,255, 0.9)'}} className='absolute w-full h-full'>
            { gameState.status === null || gameState.modal === 'mainMenu' && <MainMenu />}
            { gameState.status === null || gameState.modal === 'control' && <Control />}
            { gameState.status === 'paused' || gameState.modal === 'pauseMenu' && <Pause />}
            { gameState.status === null || gameState.modal === 'setting' && <Setting />}
        </div>
    )
}
export default BasicModal;