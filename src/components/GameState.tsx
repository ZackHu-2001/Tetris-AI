import { create } from "zustand";

export type GameState = {
    status: 'paused' | 'playing' | 'gameover' | null,
    mode: 'sprint' | 'competition' | 'endless' | null,
    modal: 'mainMenu' | 'pauseMenu' | 'control' | 'setting' | null
}

interface GameStateStateInterface {
    gameState: GameState,
    setStatus: (status: GameState['status']) => void;
    setMode: (mode: GameState['mode']) => void;
    setModal: (modal: GameState['modal']) => void;
}

export const useGameState = create<GameStateStateInterface>((set, get) => ({
    gameState: { status: null, mode: null, modal: 'mainMenu' },
    setStatus: (status: GameState['status']) => {
        get().gameState.status = status;
    },
    setMode: (mode: GameState['mode']) => {
        get().gameState.mode = mode;
    },
    setModal: (modal: GameState['modal']) => {
        get().gameState.modal = modal;
    },
}));


