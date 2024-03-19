import { create } from "zustand";

export type Tetromino = number[];
export type GameBoard = number[];
export const rowNum = 20;
export const colNum = 10;

interface gameBoardInterface {
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

    nextTetrominoQueue: Tetromino[];
    append: (mino: Tetromino) => void;
    pop: () => Tetromino;

    score: number;
    lines: number;
    addScore: (score: number) => void;
    checkAndClearLines: () => void;

    isNewGame: boolean;
    setIsNewGame: (isNewGame: boolean) => void;
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
}

export const useGameBoard = create<gameBoardInterface>((set, get) => ({
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
        get().updateBoard();
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
            state.fallingTetromino.map((row) => {
                if (row & 1) {
                    canMove = false;
                }
            });

            if (canMove) {
                get().setOffSet([get().offSet[0] - 1, get().offSet[1]])
                console.log(get().offSet)
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

    // first check if attach the wall, if not then move
    moveRight: () => {
        set((state) => {
            let canMove = true;
            state.fallingTetromino.map((row) => {
                if ((row & (1 << 9))) {
                    canMove = false;
                }
            });
            if (canMove) {
                get().setOffSet([get().offSet[0] + 1, get().offSet[1]])
                console.log(get().offSet)

                const newTetromino = state.fallingTetromino.map((row) => {
                    row = row << 1;
                    return row;
                });
                return { fallingTetromino: newTetromino };
            } else {
                return { fallingTetromino: state.fallingTetromino };
            }
        });
        get().updateBoard()

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

            // console.log("can move down: ", canMoveDown())

            if (!canMoveDown()) {
                console.log("can't move down")
                console.log(state.fallingTetromino, state.gameBoard)
            }
            // annonymous function to determine if can move down
            if (canMoveDown()) {
                get().setOffSet([get().offSet[0], get().offSet[1] + 1])

                return { fallingTetromino: [0].concat(state.fallingTetromino.slice(0, -1)) };

            } else {
                // TODO handle attach

                // reset offset
                get().setOffSet([3, 0])

                // add current falling tetromino to the game board
                get().addTetromino(get().fallingTetromino);

                // pop the next element
                get().setFallingTetromino(get().pop())
                return {}
            }
        });
        get().updateBoard()

    },

    drop: () => {
        set((state) => {
            return { fallingTetromino: getDropPosition(state) };
        });
        
        // reset offset
        get().setOffSet([3, 0])

        // add current falling tetromino to the game board
        get().addTetromino(get().fallingTetromino);

        // pop the next element
        get().setFallingTetromino(get().pop())
        get().updateBoard()
    },

    clockWiseRotate: () => {
        
        const rotatedShape = rotate(get().fallingShape, 1)
        set({ fallingShape: rotatedShape})

        const destination = moveTo(get().fallingShape, get(), get().offSet); 
        set({ fallingTetromino: destination })
        get().updateBoard();
    },

    anticlockWiseRotate: () => {
        const rotatedShape = rotate(get().fallingShape, -1)
        set({ fallingShape: rotatedShape})

        const destination = moveTo(get().fallingShape, get(), get().offSet); 
        set({ fallingTetromino: destination })
        get().updateBoard();
    },

    fallingShape: [] as Tetromino,
    setFallingShape: (tetromino: Tetromino) => {
        for (let i = 0; i < 3; i++) {
            get().setOffSet([get().offSet[0] + 1, get().offSet[1]])
        }
        let i = 0;
        while (tetromino[i] === 0) {
            i++;
            get().setOffSet([get().offSet[0], get().offSet[1] - 1])
        }

        set({ fallingShape: tetromino });
    },

    offSet: [0, 0] as number[],
    setOffSet: (offSet: number[]) => {
        set({ offSet: offSet });
    },

    nextTetrominoQueue: [] as Tetromino[],

    append: (mino: Tetromino) =>
        set((state) => ({
            nextTetrominoQueue: [...state.nextTetrominoQueue, mino],
        })),

    pop: () => {
        if (get().nextTetrominoQueue.length === 0) {
            return [-1];
        } else {
            const popedValue = get().nextTetrominoQueue[0];
            get().nextTetrominoQueue.slice(1);
            set((state) => ({
                nextTetrominoQueue: state.nextTetrominoQueue,
            }));
            return popedValue;
        }
    },

    score: 0,
    lines: rowNum,
    addScore: (linesCleared) => {
        set((state) => {
            // Update the score based on the lines cleared, you can adjust the scoring logic
            const scoreToAdd = linesCleared * 100;
            const newScore = state.score + scoreToAdd;
            const newLines = state.lines - linesCleared;
            return { score: newScore, lines: newLines >= 0 ? newLines : 0 };
        });
    },

    checkAndClearLines: () => {
        // TODO: Implement the logic to check and clear lines
        set((state) => {
            let linesCleared = 0;
            const fullLine = (1 << colNum) - 1;
            const newGameBoard = state.gameBoard.filter((row) => {
                const isRowFull = row === fullLine;
                if (isRowFull) linesCleared++;
                return !isRowFull;
            });

            const emptyLine = 0;
            for (let i = 0; i < linesCleared; i++) {
                newGameBoard.unshift(emptyLine);
            }
            get().addScore(linesCleared);

            return {
                gameBoard: newGameBoard,
                lines: state.lines - linesCleared,
            };
        });
    },

    isNewGame: false,
    setIsNewGame: (isNewGame: boolean) => {
        set({ isNewGame });
    }
}));

function rotate(tetromino: number[], direction: number) {
    const n = tetromino.length;
    const newTetromino = Array(n).fill(0);
    if (direction > 0) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = j;
                const y = n - 1 - i;
                newTetromino[x] |= (tetromino[i] >> j & 1) << y;
            }
        }
    } else {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const x = n - 1 - j;
                const y = i;
                newTetromino[x] |= (tetromino[i] >> j & 1) << y;
            }
        }
    }
    return newTetromino;
}

function moveTo(tetromino: Tetromino, state: gameBoardInterface, offSet: number[]): Tetromino {
    var tetrominoCopy = tetromino.map((row) => row << offSet[0]);
    for (let i=0; i<offSet[1]; i++) {
        tetrominoCopy = [0].concat(tetrominoCopy);
    }
    const sufixZero = 20 - tetrominoCopy.length;
    for (let i=0; i<(sufixZero); i++) {
        tetrominoCopy = tetrominoCopy.concat([0]);
    }

    return tetrominoCopy;
}

// export const tetrominos: Record<string, Tetromino> = {
//     I: [15],
//     J: [4, 7],
//     L: [1, 7],
//     O: [3, 3],
//     S: [3, 6],
//     T: [2, 7],
//     Z: [6, 3],
// };

export const tetrominos: Record<string, Tetromino> = {
    I: [0, 15, 0, 0],
    J: [4, 7, 0],
    L: [1, 7, 0],
    O: [3, 3],
    S: [0, 3, 6],
    T: [2, 7, 0],
    Z: [0, 6, 3],
};

export const getRandomTetromino = () => {
    const tetrominosKey = Object.keys(tetrominos);
    const randomIndex = Math.floor(Math.random() * tetrominosKey.length);
    const randomTetromino = tetrominos[tetrominosKey[randomIndex]];
    return randomTetromino;
};
