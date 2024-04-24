import React, { useEffect } from 'react';
import { useGameBoard, rowNum, Tetromino } from '@/components/GameBoard';
import MenuButton from '../MenuButton/MenuButton';

type MainMenuProps = {};

const MainMenu: React.FC<MainMenuProps> = () => {
    const { gameState, setModal, startGame } = useGameBoard();

    const handleControl = () => {
        setModal('control');
    }

    const handleSetting = () => {
        setModal('setting');
    }

    return (
        <div style={{ fontSize: '5rem', fontWeight: 'bold' }} className='absolute w-full h-full left-0 top-0 flex flex-col justify-center items-center'>
            Tetris
            <MenuButton text="Play Sprint" onClick={()=>startGame('sprint')}></MenuButton>
            <MenuButton text="Infinite Mode" onClick={()=>startGame('endless')}></MenuButton>
            <MenuButton text="AI Challenge" onClick={() => startGame('competition')}></MenuButton>
            <MenuButton text="Control" onClick={handleControl}></MenuButton>
            <MenuButton text="Setting" onClick={handleSetting} ></MenuButton>
        </div>
    )
}

export default MainMenu;