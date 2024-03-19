import React from 'react';
import { useGameState } from '@/components/GameState';
import { getRandomTetromino } from '@/components/GameBoard'
import { useGameBoard, rowNum, Tetromino } from '@/components/GameBoard';
import MenuButton from '../MenuButton/MenuButton';
import { CiSettings } from "react-icons/ci";

type MainMenuProps = {};

const MainMenu:React.FC<MainMenuProps> = () => {
    const { initializeTetrominoQueue, pop, setFallingTetromino, setFallingShape, addTetromino, initializeGameBoard } = useGameBoard();
    const { gameState, setStatus, setMode, setModal } = useGameState();

    const handleStart = () => {
        // initialize nextTetrominoQueue
        initializeTetrominoQueue();

        // initialize game board
        initializeGameBoard();

        // initialize fallingTetromino
        const NextTetromino = getRandomTetromino();
        setFallingTetromino(NextTetromino);
        setFallingShape(NextTetromino);
        
        
        // change global game state
        setStatus('playing');
        setMode('sprint');
        setModal(null);
        
        // initialize the game board and add tetromino inside it
        initializeGameBoard();
        setFallingTetromino(getRandomTetromino())
    };

    const handlePause = () => {
        setStatus('paused');
        setModal('pauseMenu');
    }

    const handleControl = () => {
        setModal('control');
    }

    const handleSetting = () => {
        setModal('setting');
    }
    
    const handlePop = () => {
        const tmp = pop();
        if (tmp.length === 1 && tmp[0] === -1) {
            console.log("error, empty pop")
            return 
        }
        let tetromino: Tetromino = tmp.concat(Array(rowNum - tmp.length).fill(0))
        addTetromino(tmp)
    }
    
    return (
        <div style={{fontSize: '5rem', fontWeight: 'bold'}} className='absolute w-full h-full left-0 top-0 flex flex-col justify-center items-center'>
            Tetris

            <MenuButton text="Play Sprint" onClick={handleStart}></MenuButton>
            {/* <MenuButton text="Pause" onClick={handlePause}></MenuButton> */}
            <MenuButton text="Control" onClick={handleControl}></MenuButton>
            <MenuButton text="Setting" onClick={handleSetting} icon={<CiSettings className=' inline'/>}></MenuButton>
        </div>
    )
}
export default MainMenu;