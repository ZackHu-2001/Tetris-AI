import { create } from "zustand";

export type Tetromino = number[];
export type GameBoard = number[];
export const rowNum = 20;
export const colNum = 10;

interface gamBoardInterface {
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
    getDropPosition: () => GameBoard;

    board: GameBoard;
    updateBoard: () => void;

    nextTetrominoQueue: Tetromino[];
    append: (mino: Tetromino) => void;
    pop: () => Tetromino;
}

export const useGameBoard = create<gamBoardInterface>((set, get) => ({
    board: [],

    updateBoard: () => {
        set((state) => {
            const newBoard: GameBoard = []
            for (let i = 0; i < rowNum; i++) {
                newBoard[i] = state.gameBoard[i] | state.fallingTetromino[i]
            }
            return { board: newBoard }        
        })
    },

    gameBoard: [],
    // TODO add tetromino to game board
    addTetromino: (tetromino) => {
        set((state) => {
            const newGameBoard: number[] = Array(rowNum).fill(0)
            for (let i = 0; i < tetromino.length; i++) {
                newGameBoard[i] = (state.gameBoard[i] | tetromino[i])
            }

            return { gameBoard: newGameBoard }
        })
        get().updateBoard()
    },

    initializeGameBoard: () => {
        set((state) => {
            
            return { gameBoard: Array(rowNum).fill(0) }
        })
        get().updateBoard()

    },

    fallingTetromino: [],

    canMoveDown: () => {

    },


    setFallingTetromino: (tetromino: GameBoard) => {
        const tetrominoCopy: GameBoard = [...tetromino]
        for (let i=0; i<tetromino.length; i++) {
            tetrominoCopy[i] = tetrominoCopy[i] << 3
        }
        set({ fallingTetromino: tetrominoCopy.concat(Array(20 - tetrominoCopy.length).fill(0)) })
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
                const newTetromino = state.fallingTetromino.map((row) => {
                    row = row >> 1;
                    return row;
                });
                return { fallingTetromino: newTetromino };
            } else {
                return { fallingTetromino: state.fallingTetromino };
            }
        });
        get().updateBoard()


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
            // annonymous function to determine if can move down
            if (canMoveDown()) {

                return { fallingTetromino: [0].concat(state.fallingTetromino.slice(0, -1)) };

            } else {
                // TODO handle attach

                // add current falling tetromino to the game board
                get().addTetromino(get().fallingTetromino);

                // pop the next element
                get().setFallingTetromino(get().pop())
                return { fallingTetromino: state.fallingTetromino };

            }
        });
        get().updateBoard()

    },

    drop: () => {
        set((state) => {
            const newTetromino = state.fallingTetromino.map((row) => {
                if (!(row & (2 ** 10))) {
                    row = row << 1;
                }
                return row;
            });
            return { fallingTetromino: [0].concat(state.fallingTetromino.slice(0, -1)) };
        });
        get().updateBoard()

    },

    clockWiseRotate: () => {
        set((state) => {
            const newTetromino = state.fallingTetromino.map((row) => {
                if (!(row & (2 ** 10))) {
                    row = row << 1;
                }
                return row;
            });
            return { fallingTetromino: newTetromino };
        });
        get().updateBoard()

    },

    anticlockWiseRotate: () => {
        set((state) => {
            const newTetromino = state.fallingTetromino.map((row) => {
                if (!(row & (2 ** 10))) {
                    row = row << 1;
                }
                return row;
            });
            return { fallingTetromino: newTetromino };
        });
        get().updateBoard()

    },

    getDropPosition: () => {
        // TODO

    },

    nextTetrominoQueue: [] as Tetromino[],

    append: (mino: Tetromino) =>
        set((state) => ({
            nextTetrominoQueue: [...state.nextTetrominoQueue, mino],
        })),

    pop: () => {
        if (get().nextTetrominoQueue.length === 0) {
            return [-1]
        } else {
            const popedValue = get().nextTetrominoQueue[0]
            get().nextTetrominoQueue.slice(1)
            set((state) => ({
                nextTetrominoQueue: state.nextTetrominoQueue,
            }));
            return popedValue;
        }
    }

}));


// const attachDetaction = (gameboard: GameBoard, tetromino: GameBoard) => {
//     gameboard.map((row, rowIndex) => {
//         if (tetromino[rowIndex] & row) {
//             return true;
//         }
//     })
//     return false;
// }



export const tetrominos: Record<string, Tetromino> = {
    I: [15],
    J: [4, 7],
    L: [1, 7],
    O: [3, 3],
    S: [3, 6],
    T: [2, 7],
    Z: [6, 3],
};

export const getRandomTetromino = () => {
    const tetrominosKey = Object.keys(tetrominos);
    const randomIndex = Math.floor(Math.random() * tetrominosKey.length);
    const randomTetromino = tetrominos[tetrominosKey[randomIndex]];
    return randomTetromino;
};
 