import { create } from "zustand";
import { getDisplayNameForKey } from './Modal/Control';

const generatePackCnt = 100;
const serverAPI = 'https://api.zackhu.com/process'

export type GameState = {
    status: "paused" | "playing" | "gameOver" | null;
    mode: "sprint" | "competition" | "endless" | null;
    modal: "mainMenu" | "pauseMenu" | "control" | "setting" | "gameOver" | null;
    winOrLose: "win" | "lose" | null;
};
export type Tetromino = number[][];
export type GameBoard = number[][];
export const rowNum = 20;
export const colNum = 10;
export type KeyBinding = {
    code: string | undefined;
    displayName: string | JSX.Element;
};

export enum AIdifficulty {
    easy = 'easy',
    medium = 'medium',
    hard = 'hard',
}

export type GameSettings = {
    sound: boolean;
    volume: number;
    gravity: boolean;
    AI: AIdifficulty;
    ghost: boolean;
    grid: boolean;
};

interface gameBoardInterface {
    startGame: (mode: "sprint" | "endless" | "competition") => void;

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

    waitingForAI: boolean;
    setWaitingForAI: (isWaiting: boolean) => void;

    gameBoard_AI: GameBoard;
    addTetromino_AI: (tetromino: Tetromino) => void;
    initializeGameBoard_AI: () => void;

    fallingTetromino_AI: GameBoard;
    setFallingTetromino_AI: (tetromino: Tetromino) => void;
    moveRight_AI: () => void;
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

    width: number;
    setWidth: (width: number) => void;
}

/**
 * Tell if the current tetromino can move down
 * @param tetromino
 * @param state
 * @returns
 */
function canMoveDown(tetromino: Tetromino, gameBoard: GameBoard) {
    if (!tetromino[tetromino.length - 1].every(val => val === 0)) {
        return false;
    }
    const newTetromino = tetromino.slice(0, -1);
    newTetromino.unshift(Array(colNum).fill(0));

    // const newTetromino = [0].concat(tetromino.slice(0, -1));
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < colNum; j++) {
            if (gameBoard[i][j] && newTetromino[i][j]) {
                return false;
            }
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

    while (canMoveDown(nextPosition, state.gameBoard)) {
        nextPosition = nextPosition.slice(0, -1);
        nextPosition.unshift(Array(colNum).fill(0));
    }
    return nextPosition;
};

const getGhostPosition = (state: gameBoardInterface): Tetromino => {
    const position = getDropPosition(state);
    const ghost = position.map(row => row.map(val => val === 0 ? 0 : 8));
    return ghost;
}

function callSoundEffect(type: 'clearLine' | 'lose' | 'win') {
    if (!useGameBoard.getState().settings.sound) return;
    const audio = new Audio(`/${type}.mp3`);
    if (audio) {
        audio.currentTime = 0;
        audio.volume = useGameBoard.getState().settings.volume / 100;
        audio.play();
    }
}

export const useGameBoard = create<gameBoardInterface>((set, get) => ({
    startGame: (mode: "sprint" | "endless" | "competition") => {
        // change global state
        set({ isNewGame: true });
        get().setStatus('playing');
        get().setMode(mode);
        get().setModal(null);
        get().setWinOrLose(null);

        // initialize nextTetrominoQueue
        get().initializeTetrominoQueue();

        // initialize game board
        get().initializeGameBoard();

        // initialize status panel
        get().initializeStatusPanel();

        // initialize fallingTetromino
        const NextTetromino = get().pop();
        console.log('NextTetromino', NextTetromino)
        get().setFallingTetromino(NextTetromino);

        get().updateBoard();

        if (get().gameState.mode === 'competition') {

            // clear AI's response queue
            set({ AIresponseQueue: [] });

            let dataToSend = {
                'nextTetrominoQueueAI': get().nextTetrominoQueue_AI,
                'gameBoard': new Array(rowNum).fill(0),
            }
            console.log("nextqueue", get().nextTetrominoQueue_AI)
            fetch(serverAPI, {
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
                get().appendAIResponse(data)

                console.log("update next action in start game")
                get().updateAInextAction()
                console.log(data)
                get().setAIready(true)
            })
        }
    },

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
        // console.log("update board")
        set((state) => {
            const newBoard: GameBoard = Array(rowNum).fill(undefined).map(() => Array(colNum).fill(0));
            const ghost = getGhostPosition(state)
            for (let i = 0; i < rowNum; i++) {
                for (let j = 0; j < colNum; j++) {
                    newBoard[i][j] = state.gameBoard[i][j] || state.fallingTetromino[i][j]
                    if (get().settings.ghost) {
                        newBoard[i][j] = newBoard[i][j] || ghost[i][j]
                    }
                }
            }
            return { board: newBoard };
        });
    },

    gameBoard: [],
    // TODO add tetromino to game board
    addTetromino: (tetromino) => {
        set((state) => {
            const newGameBoard: number[][] = Array(rowNum).fill(undefined).map(() => Array(colNum).fill(0));
            for (let i = 0; i < tetromino.length; i++) {
                for (let j = 0; j < colNum; j++) {
                    newGameBoard[i][j] = state.gameBoard[i][j] | tetromino[i][j];

                }
            }

            return { gameBoard: newGameBoard };
        });
        get().updateBoard();
    },

    initializeGameBoard: () => {
        set((state) => {
            return { gameBoard: Array(rowNum).fill(0).map(() => Array(colNum).fill(0)), gameBoard_AI: Array(rowNum).fill(0).map(() => Array(colNum).fill(0)) };
        });
    },

    fallingTetromino: [],

    setFallingTetromino: (tetromino: GameBoard) => {
        const tetrominoCopy: GameBoard = [];
        for (const row of tetromino) {
            let toPush = true;
            if (row.every((brick) => brick === 0)) {
                toPush = false;
            }
            if (toPush) {
                tetrominoCopy.push(row.map((brick) => brick));
            }
        }


        // here might have problem, initialy i < tetromino.length
        for (let i = 0; i < tetrominoCopy.length; i++) {
            tetrominoCopy[i] = [0, 0, 0].concat(tetrominoCopy[i])
            while (tetrominoCopy[i].length < colNum) {
                tetrominoCopy[i].push(0)
            }
        }
        set({
            fallingTetromino: tetrominoCopy.concat(
                Array(20 - tetrominoCopy.length).fill(0).map(() => Array(colNum).fill(0))
            ),
        });
    },

    // first check if attach the wall, if not then move
    moveLeft: () => {
        set((state) => {
            let canMove = true;

            // first check if attach the wall
            state.fallingTetromino.map((row) => {
                if (row[0] && 1) {
                    canMove = false;
                }
            });

            // then check if attach the game board
            const fallingTetrominoCopy = state.fallingTetromino.map((row) => {
                row = row.slice(1).concat(0);
                return row;
            });

            for (let i = 0; i < fallingTetrominoCopy.length; i++) {
                for (let j = 0; j < colNum; j++) {
                    if (state.gameBoard[i][j] && fallingTetrominoCopy[i][j]) {
                        canMove = false;
                    }
                }
            }

            if (canMove) {
                get().setOffSet([get().offSet[0] - 1, get().offSet[1]]);
                const newTetromino = state.fallingTetromino.map((row) => {
                    row = row.slice(1).concat(0);
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
                if (row[9]) {
                    canMove = false;
                }
            });

            // then check if attach the game board
            const fallingTetrominoCopy = state.fallingTetromino.map((row) => {
                row = [0].concat(row.slice(0, -1));
                return row;
            });

            for (let i = 0; i < fallingTetrominoCopy.length; i++) {
                for (let j = 0; j < colNum; j++) {
                    if (state.gameBoard[i][j] && fallingTetrominoCopy[i][j]) {
                        canMove = false;
                    }
                }
            }


            if (canMove) {
                get().setOffSet([get().offSet[0] + 1, get().offSet[1]]);

                const newTetromino = state.fallingTetromino.map((row) => {
                    row = [0].concat(row.slice(0, -1));
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

            // annonymous function to determine if can move down
            if (canMoveDown(get().fallingTetromino, get().gameBoard)) {
                get().setOffSet([get().offSet[0], get().offSet[1] + 1]);

                let newTetromino = get().fallingTetromino.map((row) => {
                    return row.slice();
                })
                newTetromino.unshift(Array(colNum).fill(0));
                newTetromino = newTetromino.slice(0, -1);
                return {
                    fallingTetromino: newTetromino,
                };
            } else {
                // handle attach

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
        const tetrominoCopy: Tetromino = tetromino.map((row) => row.map((brick) => brick));
        for (let i = 0; i < 3; i++) {
            get().setOffSet([get().offSet[0] + 1, get().offSet[1]]);
        }
        let i = 0;

        while (tetrominoCopy[i].every((val) => val === 0)) {
            i++;
            get().setOffSet([get().offSet[0], get().offSet[1] - 1]);
        }

        set({ fallingShape: tetrominoCopy });
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

        const popedValue = pack[get().nextTetrominoQueue[0]].map((row) => row.slice());
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

        const popedValue = pack[get().nextTetrominoQueue_AI[0]].map((row) => row.slice());
        get().setFallingShape_AI(popedValue);
        set((state) => ({
            nextTetrominoQueue_AI: get().nextTetrominoQueue_AI.slice(1),
        }));
        return popedValue;
    },

    // set both score and lines according to the mode
    initializeStatusPanel: () => {
        set({ score: 0, score_AI: 0})
        if (get().gameState.mode === 'sprint') {
            get().setLines(rowNum * 2);
        } else {
            get().setLines(0);
            get().setLines_AI(0);
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
            return { score: newScore };
        });
    },

    checkAndClearLines: () => {
        // clear line first
        var cnt = 0;
        for (let i = 0; i < rowNum; i++) {
            if (get().gameBoard[i].every(val => val !== 0)) {
                get().gameBoard.splice(i, 1);
                get().gameBoard.unshift(Array(colNum).fill(0));
                cnt += 1;
            }
        }

        if (cnt > 0) {
            callSoundEffect('clearLine');
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
            callSoundEffect('win');
        }

        // check if the top line is full
        if (!get().gameBoard[0].every(val => val === 0) || !get().gameBoard[1].every(val => val === 0)) {
            get().setStatus("gameOver");
            get().setModal("gameOver");
            get().setWinOrLose("lose");
            callSoundEffect('lose');
        }
    },

    isNewGame: false,
    setIsNewGame: (isNewGame: boolean) => {
        set({ isNewGame });
    },

    settings: {
        sound: true,
        volume: 50,
        gravity: true,
        AI: AIdifficulty.medium,
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

    setVolume: (volume) => {
        set((state) => ({
            settings: {
                ...state.settings,
                volume: Math.max(0, Math.min(100, volume)), // Ensuring volume is between 0 and 100
            },
        }))
    },

    AIready: false,
    setAIready: (isReady: boolean) => set((state) => ({ AIready: isReady })),

    waitingForAI: false,
    setWaitingForAI: (isWaiting: boolean) => {
        set({ waitingForAI: isWaiting });
    },

    gameBoard_AI: [],
    addTetromino_AI: (tetromino) => {
        set((state) => {
            const newGameBoard: number[][] = Array(rowNum).fill(0).map(() => Array(colNum).fill(0));
            for (let i = 0; i < tetromino.length; i++) {
                for (let j = 0; j < colNum; j++) {
                    newGameBoard[i][j] = state.gameBoard_AI[i][j] || tetromino[i][j];
                }
            }

            return { gameBoard_AI: newGameBoard };
        });
        get().updateAIBoard();
    },

    board_AI: [],
    updateAIBoard: () => {
        set((state) => {
            const newBoard: GameBoard = Array(rowNum).fill(undefined).map(() => Array(colNum).fill(0));
            for (let i = 0; i < rowNum; i++) {
                for (let j = 0; j < colNum; j++) {
                    newBoard[i][j] = state.gameBoard_AI[i][j] || state.fallingTetromino_AI[i][j];
                }
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
            if (!row.every((val) => val === 0)) {
                while (row.length < colNum) {
                    row.push(0);
                }
                tetrominoCopy.push(row);
            }
        }
        set({
            fallingTetromino_AI: tetrominoCopy.concat(
                Array(20 - tetrominoCopy.length).fill(0).map(() => Array(colNum).fill(0))
            ),
        });
    },

    moveRight_AI: () => {
        set((state) => {
            let canMove = true;

            // first check if attach the wall
            state.fallingTetromino_AI.map((row) => {
                if (row[9]) {
                    canMove = false;
                }
            });

            if (canMove) {
                get().setAIOffSet([get().offSet_AI[0] + 1, get().offSet_AI[1]]);

                const newTetromino = state.fallingTetromino_AI.map((row) => {
                    row = [0].concat(row.slice(0, -1));
                    return row;
                });
                return { fallingTetromino_AI: newTetromino };
            } else {
                return { fallingTetromino_AI: state.fallingTetromino_AI };
            }
        });
        get().updateAIBoard();
    },


    moveDown_AI: () => {
        if (canMoveDown(get().fallingTetromino_AI, get().gameBoard_AI)) {
            get().setAIOffSet([get().offSet[0], get().offSet[1] + 1]);
            let newTetromino = get().fallingTetromino_AI.map((row) => {
                return row.slice();
            })
            newTetromino.unshift(Array(colNum).fill(0));
            newTetromino = newTetromino.slice(0, -1);
            set({ fallingTetromino_AI: newTetromino });
        } else {
            // handle attach

            // reset offset
            get().setAIOffSet([0, 0]);

            // add current falling tetromino to the game board
            get().addTetromino_AI(get().fallingTetromino_AI);

            // check if have any line to clear
            get().checkAndClearLines_AI();

            // update next action for AI
            console.log("len of response queue", get().AIresponseQueue.length)
            console.log("len of action queue", get().nextTetrominoQueue_AI.length)
            get().updateAInextAction()
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
        const tetrominoCopy: GameBoard = tetromino.map((row) => row.map((brick) => brick));
        let i = 0;
        while (tetrominoCopy[i].every((val) => val === 0)) {
            i++;
            get().setAIOffSet([get().offSet_AI[0], get().offSet_AI[1] - 1]);
        }

        set((state) => { return { fallingShape_AI: tetrominoCopy } });

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
        const bufferSize = 70;

        if (get().AIresponseQueue.length <= bufferSize && !get().waitingForAI) {
            const currentSize = get().AIresponseQueue.length;
            get().addPack();
            let dataToSend = {
                'nextTetrominoQueueAI': get().nextTetrominoQueue_AI,
                'gameBoard': get().gameBoard_AI,
            }
            console.log('next tetromino queue AI', get().nextTetrominoQueue_AI)
            get().setWaitingForAI(true);
            fetch(serverAPI, {
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
                console.log(data)
                get().appendAIResponse(data.slice(currentSize))
                get().setAIready(true)
                get().setWaitingForAI(false);
            })
        }
        const tmp = get().popFromAIQueue();

        // pop the next element
        get().setFallingTetromino_AI(tmp);
        const action = get().AIresponseQueue[0];

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
                if (get().fallingShape_AI[i][leftShift]) {
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
        for (const row of get().fallingShape_AI) {
            while (row.length < colNum) {
                row.push(0);
            }
            copy.push(row);
        }
        for (let i = 0; i < get().fallingShape_AI.length; i++) {
            if (get().offSet_AI[0] < 0) {
                for (let j = 0; j < -get().offSet_AI[0]; j++) {
                    copy[i].shift();
                    copy[i].push(0);
                }
            } else {
                for (let j = 0; j < get().offSet_AI[0]; j++) {
                    copy[i].pop();
                    copy[i].unshift(0);
                }
            }
        }
        set({ fallingTetromino_AI: copy.concat(Array(20 - copy.length).fill(0).map(() => Array(colNum).fill(0))) })

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
            let canClear = true;
            for (let j = 0; j < colNum; j++) {
                if (get().gameBoard_AI[i][j] === 0) {
                    canClear = false;
                    break;
                }
            }
            if (canClear) {
                get().gameBoard_AI.splice(i, 1);
                get().gameBoard_AI.unshift(Array(colNum).fill(0));
                cnt += 1;
            }
        }

        // according to the lines cleared, update the score
        get().addScore_AI(cnt);

        // update lines
        get().setLines_AI(get().lines_AI + cnt);

        // check if the top line is full
        for (let i = 0; i < colNum; i++) {
            if (get().gameBoard[0][i] !== 0 || get().gameBoard[1][i] !== 0) {
                get().setStatus("gameOver");
                get().setModal("gameOver");
                get().setWinOrLose("lose");
                callSoundEffect('lose');
            }
        }

        // check if the top line is full
        // if so, AI lose
        if (!get().gameBoard_AI[0].every(val => val === 0) || !get().gameBoard_AI[1].every(val => val === 0)) {
            get().setStatus("gameOver");
            get().setModal("gameOver");
            get().setWinOrLose("win");
            callSoundEffect('win');
        }
    },

    width: 0,
    setWidth: (width: number) => {
        set({ width });
    }

}));

function rotate(tetromino: number[][], direction: number) {
    const n = tetromino.length;
    const newTetromino = Array(n).fill(0).map(() => Array(n).fill(0));
    if (direction > 0) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = j;
                const y = n - 1 - i;
                newTetromino[x][y] = tetromino[i][j];
            }
        }
    } else {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = n - 1 - j;
                const y = i;

                newTetromino[x][y] = tetromino[i][j];
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
    const tetrominoCopy = [];
    for (const row of tetromino) {
        tetrominoCopy.push(row.slice());
    }

    if (offSet[0] > 0) {
        for (let i = 0; i < offSet[0]; i++) {
            let canMove = true;
            for (let row of tetrominoCopy) {
                if (row[9]) {
                    canMove = false;
                    break;
                }
            }
            if (!canMove) {
                state.setOffSet([i, state.offSet[1]]);
                break;
            }
            for (const row of tetrominoCopy) {
                row.unshift(0);
            }
        }
    } else {
        for (let i = 0; i > offSet[0]; i--) {
            let canMove = true;
            for (let row of tetrominoCopy) {
                if (row[0]) {
                    canMove = false;
                    break;
                }
            }
            if (!canMove) {
                state.setOffSet([i, state.offSet[1]]);
                break;
            }
            for (const row of tetrominoCopy) {
                row.shift();
            }
        }
    }
    for (const row of tetrominoCopy) {
        while (row.length < 10) {
            row.push(0);
        }
    }

    for (let i = 0; i < offSet[1]; i++) {
        tetrominoCopy.unshift(Array(colNum).fill(0));
    }

    while (tetrominoCopy.length > 20) {
        var tmp = tetrominoCopy.pop();
        if (tmp === undefined) {
            throw new Error("tmp is undefined");
        }
        if (tmp.every(value => value === 0)) {
            // while (tmp === 0) {
            tmp = tetrominoCopy.pop();
        }
    }

    // remove sufix zeros
    if (tetrominoCopy.length > 20) {
        var tmp = tetrominoCopy.pop();
        while (tmp?.every(value => value === 0)) {
            tmp = tetrominoCopy.pop();
        }

        if (tmp !== undefined && !tmp.every(value => value === 0)) {
            tetrominoCopy.push(tmp);
        }
    }

    // if after removed sufix zeros still length greater than 20 then do something extra
    if (tetrominoCopy.length > 20) {
        var extraLength = tetrominoCopy.length - 20;
        tetrominoCopy.splice(0, extraLength);
    }

    const sufixZeroCnt = 20 - tetrominoCopy.length;
    for (let i = 0; i < sufixZeroCnt; i++) {
        tetrominoCopy.push(Array(colNum).fill(0));
    }

    return tetrominoCopy;
}

export const pack = [
    [[1, 1], [1, 1]],
    [[0, 2, 0], [2, 2, 2], [0, 0, 0]],
    [[0, 0, 0], [0, 3, 3], [3, 3, 0]],
    [[0, 0, 0], [4, 4, 0], [0, 4, 4]],
    [[0, 0, 0, 0], [5, 5, 5, 5], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 6], [6, 6, 6], [0, 0, 0]],
    [[7, 0, 0], [7, 7, 7], [0, 0, 0]],
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
