import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameState } from '../GameState';

type ControlProps = {
    
};

const Control:React.FC<ControlProps> = () => {
    const { setModal } = useGameState();
    const handleDone = () => {
        setModal('mainMenu')
    }
    return <div className='flex flex-col justify-center items-center h-full'>
        <MenuButton text='Done' onClick={handleDone}></MenuButton>
    </div>
}
export default Control;