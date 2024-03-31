"use client";
import PlayField from "@/components/PlayField/PlayField";
import BasicModal from "@/components/Modal/BasicModal";
import { useEffect, useState } from "react";
import LeftPanel from "@/components/Panels/LeftPanel/LeftPanel";
import RightPanel from "@/components/Panels/RightPanel/RightPanel";
import { useGameBoard } from "@/components/GameBoard";

export default function Home() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  const { gameState } = useGameBoard();


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


  useEffect(() => {
    var widthIsShorter: boolean = 2 * dimensions.width < dimensions.height;

    if (widthIsShorter) {
      if (dimensions.width <= 600) {
        document.documentElement.style.setProperty('--bgWidth', dimensions.width / 2 * 2 + 'px');
        document.documentElement.style.setProperty('--AIModeWidth', dimensions.width / 2 * 2 * 1.5 + 'px');
        document.documentElement.style.setProperty('--gutterWidth', dimensions.width / 2 * 1 * 0.2 + 'px');
        document.documentElement.style.setProperty('--buttonWidth', dimensions.width / 2 * 0.6 + 'px');
        document.documentElement.style.setProperty('--buttonHeight', dimensions.width / 2 * 0.6 / 4 + 'px');
        document.documentElement.style.setProperty('--playFieldWidth', dimensions.width / 2 * 1 + 'px');
        document.documentElement.style.setProperty('--playFieldHeight', dimensions.width / 2 * 2 + 'px');
        document.documentElement.style.setProperty('font-size', dimensions.width / 2 * 0.01 * 1.5 + 'px');
      } else {
        document.documentElement.style.setProperty('--bgWidth', dimensions.width * 0.9 * 2 + 'px');
        document.documentElement.style.setProperty('--AIModeWidth', dimensions.width * 0.9 * 2 * 1.5 + 'px');
        document.documentElement.style.setProperty('--gutterWidth', dimensions.width * 0.9 * 1 * 0.2 + 'px');
        document.documentElement.style.setProperty('--buttonWidth', dimensions.width * 0.9 * 0.6 + 'px');
        document.documentElement.style.setProperty('--buttonHeight', dimensions.width * 0.9 * 0.6 / 4 + 'px');
        document.documentElement.style.setProperty('--playFieldWidth', dimensions.width * 0.9 + 'px');
        document.documentElement.style.setProperty('--playFieldHeight', dimensions.width * 1.8 + 'px');
        document.documentElement.style.setProperty('font-size', dimensions.width * 0.009 * 1.5 + 'px');
      }
    } else {
      if (dimensions.height <= 900) {
        document.documentElement.style.setProperty('--bgWidth', dimensions.height + 'px');
        document.documentElement.style.setProperty('--AIModeWidth', dimensions.height * 1.5 + 'px');
        document.documentElement.style.setProperty('--gutterWidth', dimensions.height * 0.5 * 0.2 + 'px');
        document.documentElement.style.setProperty('--buttonWidth', dimensions.height * 0.3 + 'px');
        document.documentElement.style.setProperty('--buttonHeight', dimensions.height * 0.075 + 'px');
        document.documentElement.style.setProperty('--playFieldWidth', dimensions.height * 0.5 + 'px');
        document.documentElement.style.setProperty('--playFieldHeight', dimensions.height + 'px');
        document.documentElement.style.setProperty('font-size', dimensions.height * 0.005 * 1.5 + 'px');
      } else {
        document.documentElement.style.setProperty('--bgWidth', dimensions.height * 0.45 * 2 + 'px');
        document.documentElement.style.setProperty('--AIModeWidth', dimensions.height * 0.45 * 2 * 1.5 + 'px');
        document.documentElement.style.setProperty('--gutterWidth', dimensions.height * 0.45 * 0.2 + 'px');
        document.documentElement.style.setProperty('--buttonWidth', dimensions.height * 0.45 * 0.6 + 'px');
        document.documentElement.style.setProperty('--buttonHeight', dimensions.height * 0.45 * 0.6 / 4 + 'px');
        document.documentElement.style.setProperty('--playFieldWidth', dimensions.height * 0.45 + 'px');
        document.documentElement.style.setProperty('--playFieldHeight', dimensions.height * 0.9 + 'px');
        document.documentElement.style.setProperty('font-size', dimensions.height * 0.0045 * 1.5 + 'px');
      }
    }
  }, [dimensions.width, dimensions.height])


  return (
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
              style={{ width: 'var(--playFieldWidth)', height: 'var(--playFieldHeight)', borderWidth: '0.2vh', boxShadow: '0 0 1rem 0rem rgba(255,255,255)' }}
              // style={{ width: 'var(--playFieldWidth)', height: 'var(--playFieldHeight)', borderWidth: '0.2vh', boxShadow: '0 0 1rem 0rem rgba(255,255,255)' }}
              className=" relative bg-black box-border">
              <BasicModal />
              <PlayField AIcontrol={false} />
            </div>
            {gameState.mode === 'competition' &&
              <div style={{ width: 'var(--playFieldWidth)', height: 'var(--playFieldHeight)', borderWidth: '0.2vh', boxShadow: '0 0 1rem 0rem rgba(255,255,255)' }}
                className=" relative bg-black box-border">
                <BasicModal isAIPage={true}/>
                <PlayField AIcontrol={true} />
              </div>}

          </div>

          <RightPanel />
        </div>
      </div>
    </div>
  );
}
