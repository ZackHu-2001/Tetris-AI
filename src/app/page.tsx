"use client";
import PlayField from "@/components/PlayField/PlayField";
import BasicModal from "@/components/Modal/BasicModal";
import { useEffect, useRef, useState } from "react";
import LeftPanel from "@/components/Panels/LeftPanel/LeftPanel";
import RightPanel from "@/components/Panels/RightPanel/RightPanel";
import { useGameBoard } from "@/components/GameBoard";
import { SoundProvider, useSound } from "@/contexts/SoundContext";

export default function Home() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  const { gameState, setWidth } = useGameBoard();

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    }
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [])
  
  const setSize = (width: number) => {
    const vh = dimensions.height / 100;
    document.documentElement.style.setProperty('--bgWidth', width * 2 + 'px');
    document.documentElement.style.setProperty('--AIModeWidth', width * 2 * 1.5 + vh * 0.2 + 'px');
    document.documentElement.style.setProperty('--buttonWidth', width * 0.6 + 'px');
    document.documentElement.style.setProperty('--buttonHeight', width * 0.6 / 4 + 'px');
    document.documentElement.style.setProperty('--playFieldWidth', width * 1 + 'px');
    document.documentElement.style.setProperty('--playFieldHeight', width * 2 + 'px');
    document.documentElement.style.setProperty('font-size', width * 0.01 * 1.5 + 'px');
  }

  useEffect(() => {
    
    var widthIsShorter: boolean = dimensions.width < dimensions.height;
    let width = 0;
    if (widthIsShorter) {
      width = dimensions.width / 2 - dimensions.width / 2 % 10;
      setSize(width);
    } else {
      width = dimensions.height * 0.5 - dimensions.height * 0.5 % 10;
      setSize(width);
    }
    setWidth(width);
    document.documentElement.style.setProperty('--brickHalfWidth', (width / 20) + 'px');
    document.documentElement.style.setProperty('--brickWidth', (width / 10) + 'px');
    return;

  }, [dimensions.width, dimensions.height])


  return (
    <SoundProvider>
    <div className="flex justify-center">
      <div
        style={{ width: gameState.mode === 'competition' ? 'var(--AIModeWidth)' : 'var(--bgWidth)', backgroundColor: 'rgba(0,0,0, 0.5)' }}
        className=" h-[100vh] flex flex-col justify-center">

        <div style={{ width: '100%', height: 'var(--playFieldHeight)' }}
          className="flex flex-row">
          <LeftPanel />
          <div className="flex flex-row ">
            <div
              id="playField"
              style={{ width: 'var(--playFieldWidth)', height: 'var(--playFieldHeight)', boxSizing: 'content-box', borderWidth: '0.2vh', boxShadow: '0 0 1rem 0rem rgba(255,255,255)' }}
              // style={{ width: 'var(--playFieldWidth)', height: 'var(--playFieldHeight)', borderWidth: '0.2vh', boxShadow: '0 0 1rem 0rem rgba(255,255,255)' }}
              className=" relative bg-black box-border">
              <BasicModal />
              <PlayField AIcontrol={false} />
            </div>
            {gameState.mode === 'competition' &&
              <div style={{ width: 'var(--playFieldWidth)', height: 'var(--playFieldHeight)', boxSizing: 'content-box', borderWidth: '0.2vh', boxShadow: '0 0 1rem 0rem rgba(255,255,255)' }}
                className=" relative bg-black box-border">
                <BasicModal isAIPage={true} />
                <PlayField AIcontrol={true} />
              </div>}
          </div>
          <RightPanel />
        </div>
      </div>
    </div>
    </SoundProvider>
  );
}
