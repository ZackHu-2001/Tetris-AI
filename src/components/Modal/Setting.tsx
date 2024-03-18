import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameState } from '../GameState';

type SettingProps = {
    
};

const Setting:React.FC<SettingProps> = () => {
    const { setModal } = useGameState();
    const handleDone = () => {
        setModal('mainMenu')
    }
    return <div className='flex flex-col justify-center items-center h-full'>
        <div className='title'>Setting</div>
        <MenuButton text='Done' onClick={handleDone}></MenuButton>
    </div>
}
export default Setting;