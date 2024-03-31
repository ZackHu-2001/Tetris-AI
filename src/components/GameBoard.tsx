import { create } from "zustand";
import { getDisplayNameForKey } from './Modal/Control';

const generatePackCnt = 10;

export type GameState = {
    status: "paused" | "playing" | "gameOver" | null;
    mode: "sprint" | "competition" | "endless" | null;
    modal: "mainMenu" | "pauseMenu" | "control" | "setting" | "gameOver" | null;
    winOrLose: "win" | "lose" | null;
};
export type Tetromino = number[];
export type GameBoard = number[];
export const rowNum = 20;
export const colNum = 10;
export type KeyBinding = {
    code: string | undefined;
    displayName: string | JSX.Element;
};

interface NextStateDictionary {
    [key: string]: number[];
}
export type GameSettings = {
    sound: boolean;
    gravity: boolean;
    volume: number;
    ghost: boolean;
    grid: boolean;
};

interface gameBoardInterface {
    gameState: GameState;
    setStatus: (status: GameState["status"]) => void;
    setMode: (mode: GameState["mode"]) => void;
    setModal: (modal: GameState["modal"]) => void;
    setWinOrLose: (winOrLose: GameState["winOrLose"]) => void;

    gameBoard: GameBoard;
    addTetromino: (tetromino: Tetromino) => void;
    initializeGameBoard: () => void;

    fallingTetromino: GameBoard;
    setFallingTetromino: (tetromino: Tetromino) => void;
    moveLeft: () => void;
    moveRight: () => void;
    moveDown: () => void;
    drop: () => void;
    clockWiseRotate: () => void;
    anticlockWiseRotate: () => void;

    fallingShape: Tetromino;
    setFallingShape: (tetromino: Tetromino) => void;

    offSet: number[];
    setOffSet: (offSet: number[]) => void;

    board: GameBoard;
    updateBoard: () => void;

    board_AI: GameBoard;
    updateAIBoard: () => void;

    nextTetrominoQueue: number[];
    initializeTetrominoQueue: () => number[][];
    addPack: () => void;
    pop: () => Tetromino;

    score: number;
    lines: number;
    setLines: (lines: number) => void;
    addScore: (linesCleared: number) => void;
    checkAndClearLines: () => void;

    isNewGame: boolean;
    setIsNewGame: (isNewGame: boolean) => void;

    keyBindings: Record<string, KeyBinding>;
    setKeyBindings: (control: string, newCode: string) => void;

    settings: GameSettings;
    setSettings: (newSettings: Partial<GameSettings>) => void;
    setVolume: (volume: number) => void;

    AIready: boolean;
    setAIready: (isReady: boolean) => void;

    gameBoard_AI: GameBoard;
    addTetromino_AI: (tetromino: Tetromino) => void;
    initializeGameBoard_AI: () => void;

    fallingTetromino_AI: GameBoard;
    setFallingTetromino_AI: (tetromino: Tetromino) => void;
    moveRight_AI: () => void;
    canMoveDown_AI: () => boolean;
    moveDown_AI: () => void;
    clockWiseRotate_AI: () => void;

    fallingShape_AI: Tetromino;
    setFallingShape_AI: (tetromino: Tetromino) => void;

    offSet_AI: number[];
    setAIOffSet: (offSet: number[]) => void;
    popFromAIQueue: () => Tetromino;
    initializeStatusPanel: () => void;

    nextTetrominoQueue_AI: number[];
    AIresponseQueue: number[][];

    appendAIResponse: (response: number[]) => void;
    updateAInextAction: () => void;
    calculatePosition: (action: number[]) => void;
    score_AI: number;
    lines_AI: number;
    setLines_AI: (lines: number) => void;
    addScore_AI: (linesCleared: number) => void;
    checkAndClearLines_AI: () => void;
}

/**
 * Tell if the current tetromino can move down
 * @param tetromino
 * @param state
 * @returns
 */
function canMoveDown(tetromino: Tetromino, state: gameBoardInterface) {
    if (tetromino[tetromino.length - 1]) {
        return false;
    }

    const newTetromino = [0].concat(tetromino.slice(0, -1));
    for (let i = 0; i < tetromino.length; i++) {
        if (state.gameBoard[i] & newTetromino[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Get the final postion of the tetromino, if let it drop
 * @param state
 * @returns
 */
const getDropPosition = (state: gameBoardInterface): Tetromino => {
    let nextPosition: Tetromino = [...state.fallingTetromino];

    while (canMoveDown(nextPosition, state)) {
        nextPosition = [0].concat(nextPosition.slice(0, -1));
    }
    return nextPosition;
};

export const useGameBoard = create<gameBoardInterface>((set, get) => ({
    gameState: { status: null, mode: null, modal: "mainMenu", winOrLose: null },
    setStatus: (status: GameState["status"]) =>
        set((state) => ({ gameState: { ...state.gameState, status } })),
    setMode: (mode: GameState["mode"]) =>
        set((state) => ({ gameState: { ...state.gameState, mode } })),
    setModal: (modal: GameState["modal"]) =>
        set((state) => ({ gameState: { ...state.gameState, modal } })),
    setWinOrLose: (winOrLose: GameState["winOrLose"]) =>
        set((state) => ({ gameState: { ...state.gameState, winOrLose } })),
    keyBindings: {
        moveDown: { code: "ArrowDown", displayName: "↓" },
        moveRight: { code: "ArrowRight", displayName: "→" },
        moveLeft: { code: "ArrowLeft", displayName: "←" },
        drop: { code: "Space", displayName: "Space" },
        spinLeft: { code: "KeyZ", displayName: "Z" },
        spinRight: { code: "KeyX", displayName: "X" },
    },

    setKeyBindings: (control: string, newCode: string) => {
        set((state) => {
            const updatedBindings = { ...state.keyBindings };

            // Assuming every control should have a unique code, clear the previous binding
            Object.keys(updatedBindings).forEach((key) => {
                if (updatedBindings[key].code === newCode && control !== key) {
                    updatedBindings[key] = { code: "", displayName: "undefined" };
                }
            });

            updatedBindings[control] = {
                code: newCode,
                displayName: getDisplayNameForKey(newCode),
            };

            return { keyBindings: updatedBindings };
        });
    },

    board: [],

    updateBoard: () => {
        set((state) => {
            const newBoard: GameBoard = [];
            for (let i = 0; i < rowNum; i++) {
                newBoard[i] = state.gameBoard[i] | state.fallingTetromino[i];
            }
            return { board: newBoard };
        });
    },

    gameBoard: [],
    // TODO add tetromino to game board
    addTetromino: (tetromino) => {
        set((state) => {
            const newGameBoard: number[] = Array(rowNum).fill(0);
            for (let i = 0; i < tetromino.length; i++) {
                newGameBoard[i] = state.gameBoard[i] | tetromino[i];
            }

            return { gameBoard: newGameBoard };
        });
        get().updateBoard();
    },

    initializeGameBoard: () => {
        set((state) => {
            return { gameBoard: Array(rowNum).fill(0) };
        });
    },

    fallingTetromino: [],

    setFallingTetromino: (tetromino: GameBoard) => {
        const tetrominoCopy: GameBoard = [];
        for (const row of tetromino) {
            if (row !== 0) {
                tetrominoCopy.push(row);
            }
        }
        for (let i = 0; i < tetromino.length; i++) {
            tetrominoCopy[i] = tetrominoCopy[i] << 3;
        }
        set({
            fallingTetromino: tetrominoCopy.concat(
                Array(20 - tetrominoCopy.length).fill(0)
            ),
        });
    },

    // first check if attach the wall, if not then move
    moveLeft: () => {
        set((state) => {
            let canMove = true;
            
            // first check if attach the wall
            state.fallingTetromino.map((row) => {
                if (row & 1) {
                    canMove = false;
                }
            });
            
            // then check if attach the game board
            const fallingTetrominoCopy = state.fallingTetromino.map((row) => {
                return row >> 1;
            });
            
            for (let i = 0; i < fallingTetrominoCopy.length; i++) {
                if (state.gameBoard[i] & fallingTetrominoCopy[i]) {
                    canMove = false;
                }
            }

            if (canMove) {
                get().setOffSet([get().offSet[0] - 1, get().offSet[1]]);
                const newTetromino = state.fallingTetromino.map((row) => {
                    row = row >> 1;
                    return row;
                });
                return { fallingTetromino: newTetromino };
            } else {
                return { fallingTetromino: state.fallingTetromino };
            }
        });
        get().updateBoard();
    },

    moveRight: () => {
        set((state) => {
            let canMove = true;

            // first check if attach the wall
            state.fallingTetromino.map((row) => {
                if (row & (1 << 9)) {
                    canMove = false;
                }
            });

            // then check if attach the game board
            const fallingTetrominoCopy = state.fallingTetromino.map((row) => {
                return row << 1;
            });
            
            for (let i = 0; i < fallingTetrominoCopy.length; i++) {
                if (state.gameBoard[i] & fallingTetrominoCopy[i]) {
                    canMove = false;
                }
            }

            if (canMove) {
                get().setOffSet([get().offSet[0] + 1, get().offSet[1]]);

                const newTetromino = state.fallingTetromino.map((row) => {
                    row = row << 1;
                    return row;
                });
                return { fallingTetromino: newTetromino };
            } else {
                return { fallingTetromino: state.fallingTetromino };
            }
        });
        get().updateBoard();
    },

    moveDown: () => {
        set((state) => {
            function canMoveDown() {
                if (state.fallingTetromino[state.fallingTetromino.length - 1]) {
                    return false;
                }

                const newTetromino = [0].concat(state.fallingTetromino.slice(0, -1));
                for (let i = 0; i < state.fallingTetromino.length; i++) {
                    if (state.gameBoard[i] & newTetromino[i]) {
                        return false;
                    }
                }
                return true;
            }

            // annonymous function to determine if can move down
            if (canMoveDown()) {
                get().setOffSet([get().offSet[0], get().offSet[1] + 1]);

                return {
                    fallingTetromino: [0].concat(state.fallingTetromino.slice(0, -1)),
                };
            } else {
                // TODO handle attach

                // reset offset
                get().setOffSet([3, 0]);

                // add current falling tetromino to the game board
                get().addTetromino(get().fallingTetromino);

                // check if have any line to clear
                get().checkAndClearLines();

                // pop the next element
                get().setFallingTetromino(get().pop());
                return {};
            }
        });
        get().updateBoard();
    },

    drop: () => {
        set((state) => {
            return { fallingTetromino: getDropPosition(state) };
        });

        // reset offset
        get().setOffSet([3, 0]);

        // add current falling tetromino to the game board
        get().addTetromino(get().fallingTetromino);
        // check if have any line to clear
        get().checkAndClearLines();

        // pop the next element
        get().setFallingTetromino(get().pop());
        get().updateBoard();
    },

    clockWiseRotate: () => {
        const rotatedShape = rotate(get().fallingShape, 1);
        set({ fallingShape: rotatedShape });

        const destination = moveTo(get().fallingShape, get(), get().offSet);
        set({ fallingTetromino: destination });
        get().updateBoard();
    },

    anticlockWiseRotate: () => {
        const rotatedShape = rotate(get().fallingShape, -1);
        set({ fallingShape: rotatedShape });

        const destination = moveTo(get().fallingShape, get(), get().offSet);
        set({ fallingTetromino: destination });
        get().updateBoard();
    },

    fallingShape: [] as Tetromino,
    setFallingShape: (tetromino: Tetromino) => {
        for (let i = 0; i < 3; i++) {
            get().setOffSet([get().offSet[0] + 1, get().offSet[1]]);
        }
        let i = 0;
        while (tetromino[i] === 0) {
            i++;
            get().setOffSet([get().offSet[0], get().offSet[1] - 1]);
        }

        set({ fallingShape: tetromino });
    },

    offSet: [0, 0] as number[],
    setOffSet: (offSet: number[]) => {
        set({ offSet: offSet });
    },

    nextTetrominoQueue: [] as number[],

    // generate 10 packs of random tetromino
    initializeTetrominoQueue: () => {
        let newPack = generateIndex();
        set({ nextTetrominoQueue: newPack });
        if (get().gameState.mode === "competition") {
            set({ nextTetrominoQueue_AI: newPack });
        }
        return [get().nextTetrominoQueue_AI, get().nextTetrominoQueue]
    },

    addPack: () => {
        let newPack = generateIndex();
        set((state) => {
            // const newPack = generateIndex();
            return { nextTetrominoQueue: state.nextTetrominoQueue.concat(newPack) };
        });
        if (get().gameState.mode === "competition") {
            set({ nextTetrominoQueue_AI: get().nextTetrominoQueue_AI.concat(newPack) })
        }
    },

    // pop and return next element from the queue
    // by the way, if the queue is less than 6, add a new pack
    // also this method would set the falling shape and the offset 
    pop: () => {
        // if remaining tetromino is less than 6, add a new pack
        if (get().nextTetrominoQueue.length <= 6) {
            get().addPack();
        }

        const popedValue = pack[get().nextTetrominoQueue[0]];
        get().setFallingShape(popedValue);
        get().setOffSet([3, 0]);
        set((state) => ({
            nextTetrominoQueue: get().nextTetrominoQueue.slice(1),
        }));
        return popedValue;
    },

    popFromAIQueue: () => {
        if (get().nextTetrominoQueue_AI.length <= 6) {
            get().addPack();
        }

        const popedValue = pack[get().nextTetrominoQueue_AI[0]];
        get().setFallingShape_AI(popedValue);
        // get().setOffSet([3, 0]);
        set((state) => ({
            nextTetrominoQueue_AI: get().nextTetrominoQueue_AI.slice(1),
        }));
        return popedValue;
    },

    // set both score and lines according to the mode
    initializeStatusPanel: () => {
        set({ score: 0 })
        if (get().gameState.mode === 'sprint') {
            get().setLines(rowNum * 2);
        } else {
            get().setLines(0);
        }
    },
    
    score: 0,
    lines: 0,
    setLines: (lines: number) => {
        set((state) => {
            if (lines >= 0) {
                return { lines: lines };
            } else {
                console.log("Error, line number can not assign to negative value!");
                return { lines: state.lines };
            }
        });
    },

    addScore: (linesCleared) => {
        const scoreArray = [0, 40, 100, 300, 1200];
        set((state) => {
            // Update the score based on the lines cleared, you can adjust the scoring logic
            const scoreToAdd = scoreArray[linesCleared];
            const newScore = state.score + scoreToAdd;
            return { score: newScore};
        });
    },

    checkAndClearLines: () => {
        // clear line first
        var cnt = 0;
        for (let i = 0; i < rowNum; i++) {
            if (get().gameBoard[i] === 1023) {
                get().gameBoard.splice(i, 1);
                get().gameBoard.unshift(0);
                cnt += 1;
            }
        }

        // according to the lines cleared, update the score
        get().addScore(cnt);

        // update lines
        if (get().gameState.mode === 'sprint') {
            const newLines = get().lines - cnt;
            get().setLines(newLines >= 0 ? newLines : 0)
        } else {
            get().setLines(get().lines + cnt);
        }

        // game over check
        if (get().gameState.mode === 'sprint' && get().lines === 0) {
            get().setStatus("gameOver");
            get().setModal("gameOver");
            get().setWinOrLose("win");
            console.log("win")
        }
        
        // check if the top line is full
        if (get().gameBoard[0] !== 0 || get().gameBoard[1] !== 0) {
            get().setStatus("gameOver");
            get().setModal("gameOver");
            get().setWinOrLose("lose");
        }
    },

    isNewGame: false,
    setIsNewGame: (isNewGame: boolean) => {
        set({ isNewGame });
    },

    settings: {
        sound: true,
        gravity: true,
        volume: 50,
        ghost: true,
        grid: true,
    },

    setSettings: (newSettings) => {
        set((state) => ({
            settings: {
                ...state.settings,
                ...newSettings,
            },
        }));
    },
    setVolume: (volume) =>
        set((state) => ({
            settings: {
                ...state.settings,
                volume: Math.max(0, Math.min(100, volume)), // Ensuring volume is between 0 and 100
            },
        })),


    AIready: false,
    setAIready: (isReady: boolean) => set((state) => ({ AIready: isReady })),

    gameBoard_AI: [],
    addTetromino_AI: (tetromino) => {
        // console.log(tetromino)
        set((state) => {
            const newGameBoard: number[] = Array(rowNum).fill(0);
            for (let i = 0; i < tetromino.length; i++) {
                newGameBoard[i] = state.gameBoard_AI[i] | tetromino[i];
            }

            return { gameBoard_AI: newGameBoard };
        });
        get().updateAIBoard();
    },

    board_AI: [],
    updateAIBoard: () => {
        set((state) => {
            const newBoard: GameBoard = [];
            for (let i = 0; i < rowNum; i++) {
                newBoard[i] = state.gameBoard_AI[i] | state.fallingTetromino_AI[i];
            }
            return { board_AI: newBoard };
        });
    },

    initializeGameBoard_AI: () => {
        set((state) => {
            return { gameBoard_AI: Array(rowNum).fill(0) };
        });
    },

    fallingTetromino_AI: [],

    setFallingTetromino_AI: (tetromino: Tetromino) => {
        const tetrominoCopy: GameBoard = [];
        for (const row of tetromino) {
            if (row !== 0) {
                tetrominoCopy.push(row);
            }
        }
        set({
            fallingTetromino_AI: tetrominoCopy.concat(
                Array(20 - tetrominoCopy.length).fill(0)
            ),
        });
        // console.log("set falling", get().fallingTetromino_AI)
    },

    moveRight_AI: () => {
        set((state) => {
            let canMove = true;
            state.fallingTetromino_AI.map((row) => {
                if (row & (1 << 9)) {
                    canMove = false;
                }
            });
            if (canMove) {
                get().setAIOffSet([get().offSet_AI[0] + 1, get().offSet_AI[1]]);

                const newTetromino = state.fallingTetromino_AI.map((row) => {
                    row = row << 1;
                    return row;
                });
                return { fallingTetromino_AI: newTetromino };
            } else {
                return { fallingTetromino_AI: state.fallingTetromino_AI };
            }
        });

        get().updateAIBoard();
    },

    canMoveDown_AI: () => {

        if (get().fallingTetromino_AI[get().fallingTetromino_AI.length - 1]) {
            return false;
        }

        const newTetromino = [0].concat(get().fallingTetromino_AI.slice(0, -1));
        for (let i = 0; i < get().fallingTetromino_AI.length; i++) {
            if (get().gameBoard_AI[i] & newTetromino[i]) {
                return false;
            }
        }
        return true;
    },

    moveDown_AI: () => {
        if (get().canMoveDown_AI()) {
            get().setAIOffSet([get().offSet[0], get().offSet[1] + 1]);
            set({ fallingTetromino_AI: [0].concat(get().fallingTetromino_AI.slice(0, -1)) });
        } else {
            // TODO handle attach

            // reset offset
            get().setAIOffSet([0, 0]);

            // add current falling tetromino to the game board
            get().addTetromino_AI(get().fallingTetromino_AI);

            // check if have any line to clear
            get().checkAndClearLines_AI();

            // update next action for AI
            get().updateAInextAction()
            // console.log(get().fallingTetromino_AI)
        }
        get().updateAIBoard();
    },

    clockWiseRotate_AI: () => {
        const rotatedShape = rotate(get().fallingShape_AI, 1);
        set({ fallingShape_AI: rotatedShape });

        const destination = moveTo(get().fallingShape_AI, get(), get().offSet_AI);
        set({ fallingTetromino_AI: destination });
        get().updateAIBoard();
    },

    fallingShape_AI: [] as Tetromino,
    setFallingShape_AI: (tetromino: Tetromino) => {
        let i = 0;
        while (tetromino[i] === 0) {
            i++;
            get().setAIOffSet([get().offSet_AI[0], get().offSet_AI[1] - 1]);
        }

        set((state) => { return { fallingShape_AI: tetromino } });

    },

    offSet_AI: [0, 0],

    setAIOffSet: (offSet: number[]) => {
        set({ offSet_AI: offSet });
    },

    nextTetrominoQueue_AI: [],
    AIresponseQueue: [],

    appendAIResponse: (response: number[]) => {
        set((state) => {
            return { AIresponseQueue: state.AIresponseQueue.concat(response) };
        });
    },

    updateAInextAction: () => {

        // if the action's length is shorter than the buffer size, fetch new actions
        const bufferSize = 1;

        if (get().AIresponseQueue.length <= bufferSize) {
            let dataToSend = {
                'nextTetrominoQueueAI': get().nextTetrominoQueue_AI,
                'gameBoard': get().gameBoard_AI,
            }
            console.log('next tetromino queue AI', get().nextTetrominoQueue_AI)

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
                data.splice(0, bufferSize)
                get().appendAIResponse(data)

                // setFallingShape(data.action)
            })
        }

        // pop the next element
        get().setFallingTetromino_AI(get().popFromAIQueue());

        const action = get().AIresponseQueue[0];
        console.log('ai response', action);

        set((state) => {
            return {
                AIresponseQueue: state.AIresponseQueue.slice(1),
            };
        });

        get().calculatePosition(action);
    },

    calculatePosition: (action: number[]) => {
        for (let i = 0; i < action[1]; i++) {
            const rotatedShape = rotate(get().fallingShape_AI, 1);
            set({ fallingShape_AI: rotatedShape });
        }

        let shouldMoveLeft = true;
        let leftShift = 0;
        while (shouldMoveLeft) {
            for (let i = 0; i < get().fallingShape_AI.length; i++) {
                if (get().fallingShape_AI[i] & (1 << leftShift)) {
                    shouldMoveLeft = false;
                    break;
                }
            }
            if (shouldMoveLeft) {
                leftShift++;
            }
        }

        get().setAIOffSet([action[0] - leftShift, get().offSet_AI[1]]);

        const copy = [];
        for (let i = 0; i < get().fallingShape_AI.length; i++) {
            if (get().offSet_AI[0] < 0) {
                copy.push(get().fallingShape_AI[i] >> -get().offSet_AI[0])
            } else {
                copy.push(get().fallingShape_AI[i] << get().offSet_AI[0]);
            }
        }
        set({ fallingTetromino_AI: copy.concat(Array(20 - copy.length).fill(0)) })
        get().updateAIBoard();
    },

    score_AI: 0,
    lines_AI: 0,
    setLines_AI: (lines: number) => {
        set((state) => {
            if (lines >= 0) {
                return { lines_AI: lines };
            } else {
                console.log("Error, line number can not assign to negative value!");
                return { lines_AI: state.lines_AI };
            }
        });
    },

    addScore_AI: (linesCleared: number) => {
        const scoreArray = [0, 40, 100, 300, 1200];
        set((state) => {
            // Update the score based on the lines cleared, you can adjust the scoring logic
            const scoreToAdd = scoreArray[linesCleared];
            const newScore = state.score_AI + scoreToAdd;
            return { score_AI: newScore };
        });
    },

    checkAndClearLines_AI: () => {
        // clear line first
        var cnt = 0;
        for (let i = 0; i < rowNum; i++) {
            if (get().gameBoard_AI[i] === 1023) {
                get().gameBoard_AI.splice(i, 1);
                get().gameBoard_AI.unshift(0);
                cnt += 1;
            }
        }

        // according to the lines cleared, update the score
        get().addScore_AI(cnt);

        // update lines
        get().setLines_AI(get().lines_AI + cnt);

        // check if the top line is full
        if (get().gameBoard[0] !== 0 || get().gameBoard[1] !== 0) {
            get().setStatus("gameOver");
            get().setModal("gameOver");
            get().setWinOrLose("lose");
        }
    },
}));

function rotate(tetromino: number[], direction: number) {
    const n = tetromino.length;
    const newTetromino = Array(n).fill(0);
    if (direction > 0) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = j;
                const y = n - 1 - i;
                newTetromino[x] |= ((tetromino[i] >> j) & 1) << y;
            }
        }
    } else {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = n - 1 - j;
                const y = i;
                newTetromino[x] |= ((tetromino[i] >> j) & 1) << y;
            }
        }
    }
    return newTetromino;
}

function moveTo(
    tetromino: Tetromino,
    state: gameBoardInterface,
    offSet: number[]
): Tetromino {
    var tetrominoCopy: Tetromino = tetromino;
    // var tetrominoCopy = tetromino.map((row) => row << offSet[0]);

    if (offSet[0] > 0) {
        for (let i = 0; i < offSet[0]; i++) {
            let canMove = true;
            for (let row of tetrominoCopy) {
                if (row >= 512) {
                    canMove = false;
                    break;
                }
            }
            if (!canMove) {
                state.setOffSet([i, state.offSet[1]]);
                break;
            }
            tetrominoCopy = tetrominoCopy.map((row) => row << 1);
        }
    } else {
        for (let i = 0; i > offSet[0]; i--) {
            let canMove = true;
            for (let row of tetrominoCopy) {
                if (row & 1) {
                    canMove = false;
                    break;
                }
            }
            if (!canMove) {
                state.setOffSet([i, state.offSet[1]]);
                break;
            }
            tetrominoCopy = tetrominoCopy.map((row) => row >> 1);
        }
    }

    for (let i = 0; i < offSet[1]; i++) {
        tetrominoCopy = [0].concat(tetrominoCopy);
    }

    // remove sufix zeros
    if (tetrominoCopy.length > 20) {
        var tmp = tetrominoCopy.pop();
        while (tmp === 0) {
            tmp = tetrominoCopy.pop();
        }

        if (tmp !== undefined) {
            tetrominoCopy.push(tmp);
        }
    }

    // if after removed sufix zeros still length greater than 20 then do something extra
    if (tetrominoCopy.length > 20) {
        var extraLength = tetrominoCopy.length - 20;
        tetrominoCopy = tetrominoCopy.slice(extraLength);
    }

    const sufixZero = 20 - tetrominoCopy.length;
    for (let i = 0; i < sufixZero; i++) {
        tetrominoCopy = tetrominoCopy.concat([0]);
    }

    return tetrominoCopy;
}

export const tetrominos: Record<string, Tetromino> = {
    I: [0, 15, 0, 0],
    J: [4, 7, 0],
    L: [1, 7, 0],
    O: [3, 3],
    S: [0, 3, 6],
    T: [2, 7, 0],
    Z: [0, 6, 3],
};

export const pack = [
    [3, 3],
    [2, 7, 0],
    [0, 6, 3],
    [0, 3, 6],
    [0, 15, 0, 0],
    [4, 7, 0],
    [1, 7, 0],
];

// generate 10 pack of tetromino, return the indexs of those tetromino
const generateIndex = () => {
    let indexs: number[] = []
    for (let i = 0; i < generatePackCnt; i++) {
        let index = [0, 1, 2, 3, 4, 5, 6];
        for (let i = pack.length - 1; i > 0; i--) {
            // Generate a random index
            const j = Math.floor(Math.random() * (i + 1));
            // Swap the current element with the randomly chosen one
            [index[i], index[j]] = [index[j], index[i]]
        }
        indexs = indexs.concat(index);
    }
    return indexs;
};
