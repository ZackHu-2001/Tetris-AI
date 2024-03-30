import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { useGameBoard, rowNum } from '../GameBoard';

type PauseProps = {};

const Pause: React.FC<PauseProps> = () => {
    const { gameState, AIready, setIsNewGame, setAIready, initializeStatusPanel,
        initializeTetrominoQueue, pop, setFallingTetromino, updateAInextAction, initializeGameBoard, appendAIResponse,
        setStatus, updateAIBoard, setModal, setWinOrLose, updateBoard } = useGameBoard();
    const handleReturn = () => {
        setStatus("playing")
        setModal(null)
    }

    const handleRetry = () => {
        setStatus("playing")
        setModal(null)
        setWinOrLose(null);

        // reset timer
        setIsNewGame(true)

        if (gameState.mode === 'sprint' || gameState.mode === 'endless') {
            // reset game board
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

        if (gameState.mode === 'competition') {
            console.log('retry')
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

        }
    }

    const handleClickMainMenu = () => {
        setStatus(null)
        setModal('mainMenu')
        // reset timer
        setIsNewGame(true)
    }

    return <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='title'>Paused</div>
        <MenuButton text='Return' onClick={handleReturn}></MenuButton>
        <MenuButton text='Retry' onClick={handleRetry}></MenuButton>
        <MenuButton text='Main Menu' onClick={handleClickMainMenu}></MenuButton>
    </div>
}
export default Pause;