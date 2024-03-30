import React, { useEffect } from 'react';
import { useGameBoard, rowNum, Tetromino } from '@/components/GameBoard';
import MenuButton from '../MenuButton/MenuButton';
import { CiSettings } from "react-icons/ci";

type MainMenuProps = {};

const MainMenu: React.FC<MainMenuProps> = () => {
    const { gameState, AIready, setAIready, setFallingTetromino_AI, lines, initializeStatusPanel,
        initializeTetrominoQueue, pop, setFallingTetromino, updateAInextAction, addTetromino, initializeGameBoard, appendAIResponse,
        setStatus, updateAIBoard, setMode, setModal, setWinOrLose, updateBoard } = useGameBoard();

    const startGame = (mode: 'sprint' | 'endless') => {
        // change global game state
        setStatus('playing');
        setMode(mode);
        setModal(null);
        setWinOrLose(null);

        // initialize nextTetrominoQueue
        initializeTetrominoQueue();

        // initialize game board
        initializeGameBoard();

        // initialize status panel
        initializeStatusPanel();

        // initialize fallingTetromino
        const NextTetromino = pop();
        setFallingTetromino(NextTetromino);

        updateBoard();

    }

    const handleCompetition = () => {
        const windowWidth = window.innerWidth;
        // console.log(windowWidth)
        if (windowWidth < 768) {
            alert('AI competition mode can only play on a larger screen.');
            return;
        }

        // change global game state
        setStatus('playing');
        setMode('competition');
        setModal(null);
        setWinOrLose(null);

        // initialize nextTetrominoQueue
        let nextTetrominoQueueAI = null;
        let nextTetrominoQueue = null;
        [nextTetrominoQueueAI, nextTetrominoQueue] = initializeTetrominoQueue();

        // initialize game board
        initializeGameBoard();

        // initialize fallingTetromino
        const NextTetromino = pop();
        setFallingTetromino(NextTetromino);

        // AI's part is done in updateAInextAction
        // const NextTetromino_AI = popFromAIQueue();
        // setFallingTetromino_AI(NextTetromino_AI);

        let dataToSend = {
            'nextTetrominoQueueAI': nextTetrominoQueueAI,
            'gameBoard': new Array(rowNum).fill(0),
        }
        console.log(nextTetrominoQueueAI)

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
            appendAIResponse(data)
            updateAInextAction()
            console.log(data)
            setAIready(true)
        })

        updateAIBoard();

    };

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
            <MenuButton text="AI Comp" onClick={handleCompetition}></MenuButton>
            <MenuButton text="Control" onClick={handleControl}></MenuButton>
            <MenuButton text="Setting" onClick={handleSetting} icon={<CiSettings className=' inline' />}></MenuButton>
        </div>
    )
}

export default MainMenu;