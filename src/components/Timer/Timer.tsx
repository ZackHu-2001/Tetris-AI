import React, { useState, useEffect } from "react";
import { AIdifficulty, useGameBoard } from "../GameBoard";

type TimerProps = {
  fontSize: string;
};

const Timer: React.FC<TimerProps> = ({ fontSize = "5rem" }) => {
  const { gameState, moveDown, isNewGame, AIready, setIsNewGame, setOffSet,
    moveDown_AI, settings } = useGameBoard();

  const [time, setTime] = useState(0);

  const moveDownInterval: number = 1;

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) / 0.01);

    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
      }:${milliseconds < 10 ? "0" + milliseconds : milliseconds}`;
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | undefined;
    let dropInterval: NodeJS.Timeout | undefined;

    if (gameState.status == "playing") {
      if (isNewGame) {
        setIsNewGame(false);
        setTime(0);
        setOffSet([3, 0])
      }

      timerInterval = setInterval(() => {
        setTime((time) => time + 0.01);
      }, 10);

      if (settings.gravity === true) {
        dropInterval = setInterval(() => {
          moveDown();
        }, 1000);
      }
    }

    if (gameState.status == "paused") {
      if (timerInterval !== undefined) {
        clearInterval(timerInterval);
      }
      if (dropInterval !== undefined) {
        clearInterval(dropInterval);
      }
    }

    if (gameState.status == "gameOver") {
      setTime(0);
    }

    return () => {
      clearInterval(timerInterval);
      clearInterval(dropInterval);
    }; // Cleanup function to clear the interval when the component unmounts or showTimer changes
  }, [gameState]);

  useEffect(() => {
    if (gameState.mode !== 'competition' || !AIready) {
      return;
    }
    let takeActionInterval: NodeJS.Timeout | undefined;

    takeActionInterval = setInterval(() => {
      moveDown_AI();
    }, settings.AI === AIdifficulty.easy ? 500 : settings.AI === AIdifficulty.medium ? 200 : 50);

    if (gameState.status == "paused" || gameState.status == "gameOver") {
      clearInterval(takeActionInterval);
    }

    return () => {
      clearInterval(takeActionInterval);
    }
  }, [AIready, gameState]);

  return (
    <>
      <div
        style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
        className="w-full flex ">
        {formatTime(time)
          .split("")
          .map((char: string, index: number) => {
            return (
              <div key={index} style={{ fontSize }} className="timer-char">
                {char}
              </div>
            );
          })}
      </div>
    </>

  );
};
export default Timer;
