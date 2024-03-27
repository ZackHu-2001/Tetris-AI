import React from 'react';
import { useGameBoard, rowNum, Tetromino } from '@/components/GameBoard';
import MenuButton from '../MenuButton/MenuButton';
import { CiSettings } from "react-icons/ci";

type MainMenuProps = {};

const MainMenu:React.FC<MainMenuProps> = () => {
    const { initializeTetrominoQueue, pop, setFallingTetromino, setFallingShape, addTetromino, initializeGameBoard, appendAIResponse } = useGameBoard();
    const { setStatus, setMode, setModal, setWinOrLose, updateBoard } = useGameBoard();

    const handleSprint = () => {
        // initialize nextTetrominoQueue
        initializeTetrominoQueue();

        // initialize game board
        initializeGameBoard();

        // initialize fallingTetromino
        const NextTetromino = pop();
        setFallingTetromino(NextTetromino);
        
        updateBoard();

        // change global game state
        setStatus('playing');
        setMode('sprint');
        setModal(null);
        setWinOrLose(null);

        // set line number to 40

    };


    const handleInfinite = () => {
        // initialize nextTetrominoQueue
        initializeTetrominoQueue();

        // initialize game board
        initializeGameBoard();

        // initialize fallingTetromino
        const NextTetromino = pop();
        setFallingTetromino(NextTetromino);
        
        updateBoard();

        // change global game state
        setStatus('playing');
        setMode('endless');
        setModal(null);
        setWinOrLose(null);

        // set line number to 0
    };


    const handleCompetition = () => {
        // change global game state
        setStatus('playing');
        setMode('competition');
        setModal(null);
        setWinOrLose(null);
        
        // initialize nextTetrominoQueue
        let nextTetrominoQueueAI = null;
        let nextTetrominoQueue = null;
        [nextTetrominoQueueAI, nextTetrominoQueue] = initializeTetrominoQueue();

        console.log(nextTetrominoQueueAI, JSON.stringify({ nextTetrominoQueueAI }))
        // initialize game board
        initializeGameBoard();

        // initialize fallingTetromino
        const NextTetromino = pop();
        setFallingTetromino(NextTetromino);

        let dataToSend = {
            'nextTetrominoQueueAI': nextTetrominoQueueAI,
            'gameBoard': new Array(rowNum).fill(0),
            // nextTetrominoQueue: nextTetrominoQueue
        }
        
        fetch('http://127.0.0.1:5001/tetris-group6/us-central1/get_next_action', {
            // fetch('https://get-next-action-juv6snyduq-uc.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dataToSend }), 
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('data', data)
            appendAIResponse(data)
            // setFallingShape(data.action)
        })
        
        updateBoard();


        // set line number to 0
    };

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

            <MenuButton text="Play Sprint" onClick={handleSprint}></MenuButton>
            <MenuButton text="Infinite Mode" onClick={handleInfinite}></MenuButton>
            <MenuButton text="AI Comp" onClick={handleCompetition}></MenuButton>
            <MenuButton text="Control" onClick={handleControl}></MenuButton>
            <MenuButton text="Setting" onClick={handleSetting} icon={<CiSettings className=' inline'/>}></MenuButton>
        </div>
    )
}

export default MainMenu;