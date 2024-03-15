import React from 'react';
import { useGameState } from '@/components/GameState';
import { getRandomTetromino } from '@/components/GameBoard'
import { useGameBoard, rowNum, Tetromino } from '@/components/GameBoard';

type MainMenuProps = {
    
};

const MainMenu:React.FC<MainMenuProps> = () => {
    const { append, pop, setFallingTetromino, addTetromino, initializeGameBoard } = useGameBoard();
    const { setStatus, setMode, setModal } = useGameState();

    const handleStart = () => {
        // initialize nextTetrominoQueue
        for (let i = 0; i < 7; i++) {
            append(getRandomTetromino());
        }    

        // change global game state
        setStatus('playing');
        setMode('sprint');
        setModal(null);
        
        // initialize the game board and add tetromino inside it
        initializeGameBoard();
        console.log(getRandomTetromino())
        setFallingTetromino(getRandomTetromino())
        

    };

    const handlePause = () => {
        setStatus('paused');
        setModal('pauseMenu');
    }
    
    const handlePop = () => {
        const tmp = pop();
        if (tmp.length === 1 && tmp[0] === -1) {
            console.log("error, empty pop")
            return 
        }
        let tetromino: Tetromino = tmp.concat(Array(rowNum - tmp.length).fill(0))
        addTetromino(tmp)
        // console.log(tmp)
    }
    
    return (
        <div className='absolute w-full h-full left-0 top-0 flex flex-col justify-center items-center'>
            Tetris

            <button onClick={handleStart}>Start</button>
            <button onClick={handlePop}>Pop</button>
            <button onClick={handlePause}>Pause</button>
        </div>
    )
}
export default MainMenu;