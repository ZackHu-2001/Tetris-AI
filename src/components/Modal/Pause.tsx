import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameState } from '../GameState';

type PauseProps = {};

const Pause: React.FC<PauseProps> = () => {
    const { setStatus, setModal } = useGameState();
    const handleReturn = () => {
        setStatus("playing")
        setModal(null)
    }

    const handleRetry = () => {

    }

    const handleClickMainMenu = () => {
        setStatus(null)
        setModal('mainMenu')
        // reset timer

    }

    return <div style={{fontSize: '5rem', fontWeight: 'bold'}} className='w-full h-full flex flex-col justify-center items-center'>
        <div>Paused</div>
        <MenuButton text='Return' onClick={handleReturn}></MenuButton>
        <MenuButton text='Retry' onClick={handleRetry}></MenuButton>
        <MenuButton text='Main Menu' onClick={handleClickMainMenu}></MenuButton>
    </div>
}
export default Pause;