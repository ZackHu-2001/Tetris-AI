import React, { useEffect } from 'react';
import { useGameBoard } from '../GameBoard';
import { useSound } from '../../contexts/SoundContext';
type PlayFieldProps = {
    AIcontrol: boolean;
};

const PlayField: React.FC<PlayFieldProps> = ({ AIcontrol }) => {
    const { setStatus, setModal, board, board_AI, setAIready, moveDown, moveLeft, moveRight, settings,
    drop, clockWiseRotate, anticlockWiseRotate, keyBindings } = useGameBoard()
    const { playMoveSound } = useSound();
    const colNum = 10;

    let gameBoard = AIcontrol ? board_AI : board;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            if (settings.sound) {
                playMoveSound();
            }

            switch (event.code) {
                case keyBindings.moveDown.code:
                    moveDown();
                    break;
                case keyBindings.moveRight.code:
                    moveRight();
                    break;
                case keyBindings.moveLeft.code:
                    moveLeft();
                    break;
                case keyBindings.drop.code:
                    drop();
                    break;
                case 'Escape':
                    setStatus('paused');
                    setModal('pauseMenu');
                    setAIready(false);
                    break;
                case keyBindings.spinLeft.code:
                    anticlockWiseRotate();
                    break;
                case keyBindings.spinRight.code:
                    clockWiseRotate();
                    break;
            }
            // console.log('key pressed', event.key);
        }

        if (!AIcontrol) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [keyBindings]);

    return (
        <div className='absolute w-full h-full top-0 left-0 z-10 flex flex-col '>
            {gameBoard.map((row, rowIndex) => {
                return (<div style={{ height: '5%' }} className='w-full flex ' key={rowIndex}>
                    {Array.from({ length: colNum }).map((_, i) => {
                        return (
                            <div className={`${row[i] ? mapColor(row[i]) : settings.grid ? 'empty_brick brick_border' : 'empty_brick'}`} key={rowIndex * 10 + i}></div>
                        )
                    })}
                </div>)
            })}
        </div>
    )

}

const mapColor = (value: number) => {
    switch (value) {
        case 1:
            return 'brick_yellow';
        case 2:
            return 'brick_purple';
        case 3:
            return 'brick_green';
        case 4:
            return 'brick_red';
        case 5:
            return 'brick_skyBlue';
        case 6:
            return 'brick_orange';
        case 7:
            return 'brick_blue';
        case 8:
            return 'brick_gray';
        default:
            return '';
    }
}

export default PlayField;