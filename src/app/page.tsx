"use client";
import MainMenuModal from "../components/Modal/MainMenu";
import StatusPanel from "@/components/StatusPanel/StatusPanel";
import PlayField from "@/components/PlayField/PlayField";
import NextPanel from "@/components/NextPanel/NextPanel";
import { useState } from "react";
import BasicModal from "@/components/Modal/BasicModal";

export default function Home() {

  type GameState = {
    status: 'paused' | 'playing' | 'gameover' | null,
    mode: 'sprint' | 'competition' | 'endless' | null,
    modal: 'mainMenu' | 'pauseMenu' | 'control' | 'setting' | null
  }

  const [gameState, setGameState] = useState<GameState>({
    status: 'paused', 
    mode: null, 
    modal: 'mainMenu'
  });

  return (
    <div className="flex justify-center">
      <div className=" flex dark:bg-slate-300 bg-slate-700 w-full sm:w-[600px] md:w-[700px] lg:w-[900px] h-[100vh]">
        <StatusPanel />
        <div className="w-2/3 h-[100vh] relative">
          <BasicModal gameState={gameState}/>
          <PlayField />
        </div>
        <NextPanel />
      </div>
    </div>
  );
}
