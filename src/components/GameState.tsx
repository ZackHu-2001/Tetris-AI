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
    setStatus: (status: GameState['status']) => set((state) => ({ gameState: { ...state.gameState, status } })),
    setMode: (mode: GameState['mode']) => set((state) => ({ gameState: { ...state.gameState, mode } })),
    setModal: (modal: GameState['modal']) => set((state) => ({ gameState: { ...state.gameState, modal } })),
}));



