import React from 'react';
import MenuButton from '../MenuButton/MenuButton';

type PauseProps = {

};

const Pause: React.FC<PauseProps> = () => {
    const handleReturn = () => {
        console.log('return')
    }
    const handleRetry = () => {
        console.log('retry')
    }
    const handleClickMainMenu = () => {
        console.log('main menu')
    }

    return <div className='w-full h-full flex flex-col justify-center items-center'>
        <div>Paused</div>
        <MenuButton text='Return' onClick={handleReturn}>Return</MenuButton>
        <MenuButton text='Retry' onClick={handleRetry}>Return</MenuButton>
        <MenuButton text='Main Menu' onClick={handleClickMainMenu}>Return</MenuButton>
    </div>
}
export default Pause;