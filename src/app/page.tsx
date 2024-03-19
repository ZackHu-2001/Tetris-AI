"use client";
import MainMenuModal from "../components/Modal/MainMenu";
import StatusPanel from "@/components/StatusPanel/StatusPanel";
import PlayField from "@/components/PlayField/PlayField";
import NextPanel from "@/components/NextPanel/NextPanel";
import BasicModal from "@/components/Modal/BasicModal";
import { useEffect, useState } from "react";


export default function Home() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })


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
        document.documentElement.style.setProperty('--bgWidth', dimensions.width * (4 / 3) + 'px');
        document.documentElement.style.setProperty('--buttonWidth', dimensions.width * 0.6 + 'px');
        document.documentElement.style.setProperty('--buttonHeight', dimensions.width * 0.15 + 'px');
        document.documentElement.style.setProperty('--playFieldWidth', dimensions.width * 1 + 'px');
        document.documentElement.style.setProperty('--playFieldHeight', dimensions.width * 2 + 'px');
        document.documentElement.style.setProperty('font-size', dimensions.width * 0.01 + 'px');
      } else {
        document.documentElement.style.setProperty('--bgWidth', dimensions.width * (4 / 3) * 0.7 + 'px');
        document.documentElement.style.setProperty('--buttonWidth', dimensions.width * 0.42 + 'px');
        document.documentElement.style.setProperty('--buttonHeight', dimensions.width * 0.105 + 'px');
        document.documentElement.style.setProperty('--playFieldWidth', dimensions.width * 0.7 + 'px');
        document.documentElement.style.setProperty('--playFieldHeight', dimensions.width * 1.4 + 'px');
        document.documentElement.style.setProperty('font-size', dimensions.width * 0.007 + 'px');
      }
    } else {
      if (dimensions.width <= 600) {
        document.documentElement.style.setProperty('--bgWidth', dimensions.height * (2 / 3) + 'px');
        document.documentElement.style.setProperty('--buttonWidth', dimensions.height * 0.3 + 'px');
        document.documentElement.style.setProperty('--buttonHeight', dimensions.height * 0.075 + 'px');
        document.documentElement.style.setProperty('--playFieldWidth', dimensions.height * 0.5 + 'px');
        document.documentElement.style.setProperty('--playFieldHeight', dimensions.height + 'px');
        document.documentElement.style.setProperty('font-size', dimensions.height * 0.005 + 'px');
      } else {
        document.documentElement.style.setProperty('--bgWidth', dimensions.height * (4 / 3) * 0.45 + 'px');
        document.documentElement.style.setProperty('--buttonWidth', dimensions.height * 0.27 + 'px');
        document.documentElement.style.setProperty('--buttonHeight', dimensions.height * 0.0675 + 'px');
        document.documentElement.style.setProperty('--playFieldWidth', dimensions.height * 0.45 + 'px');
        document.documentElement.style.setProperty('--playFieldHeight', dimensions.height * 0.9 + 'px');
        document.documentElement.style.setProperty('font-size', dimensions.height * 0.0045 + 'px');
      }
    }
  }, [dimensions.width, dimensions.height])


  return (
    <div className="flex justify-center">
      <div
        style={{ width: 'var(--bgWidth, 100px)' }}
        className="dark:bg-slate-300 bg-slate-700 h-[100vh] flex flex-col justify-center">

        <div style={{ width: 'var(--bgWidth)', height: 'var(--playFieldHeight)' }}
        className="flex flex-row">
          <StatusPanel />
          <div
          id="playField"
          style={{ width: 'var(--playFieldWidth)', height: 'var(--playFieldHeight)', borderWidth: '0.5vh' }} 
          className="w-full relative ">
            <BasicModal />
            <PlayField />
          </div>
          <NextPanel />
        </div>
      </div>
    </div>
  );
}
