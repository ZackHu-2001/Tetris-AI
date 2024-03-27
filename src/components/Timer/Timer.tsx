import React, { useState, useEffect } from "react";
import { useGameBoard } from "../GameBoard";

type TimerProps = {
  fontSize: string;
};

const Timer: React.FC<TimerProps> = ({ fontSize = "5rem" }) => {
  const { gameState, moveDown, isNewGame, setIsNewGame, setOffSet,
    canMoveDown_AI, moveDown_AI, updateAInextAction,
     currentMove_AI, moveRight_AI, clockWiseRotate_AI } = useGameBoard();

  const [time, setTime] = useState(0);

  const moveDownInterval: number = 1;

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) / 0.01);

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }:${milliseconds < 10 ? "0" + milliseconds : milliseconds}`;
  };
  
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | undefined;
    let dropInterval: NodeJS.Timeout | undefined;
    let takeActionInterval: NodeJS.Timeout | undefined;

    if (gameState.status == "playing") {
      if (isNewGame) {
        setIsNewGame(false);
        setTime(0);
        setOffSet([3, 0])
      }
      timerInterval = setInterval(() => {
        setTime((time) => time + 0.01);
      }, 10);
      dropInterval = setInterval(() => {
        moveDown();
      }, 1000);
      if (gameState.mode == 'competition') {
        takeActionInterval = setInterval(() => {
          if (currentMove_AI[0] > 0) {
            moveRight_AI()
            currentMove_AI[0] -= 1;
            return;
          }
          if (currentMove_AI[1] > 0) {
            clockWiseRotate_AI()
            currentMove_AI[1] -= 1;
            return;
          }
          // 

          while (canMoveDown_AI()) {
            moveDown_AI();
            return;
          }

          // if reached here, then update next action for AI
          updateAInextAction()
        }, 200);
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
  }, [gameState, setTime, moveDown]);


  // useEffect(() => {

  //   if (gameState.status == "playing") {
  //     if (isNewGame) {
  //       setIsNewGame(false);
  //       setTime(0);
  //       setOffSet([3, 0])
  //     }
  //   }

  //   if (gameState.status == "paused") {
      
  //   }

  //   if (gameState.status == "gameOver") {
  //     setTime(0);
  //   }

  //   return () => {
  //     clearInterval(dropInterval);
  //   }; // Cleanup function to clear the interval when the component unmounts or showTimer changes
  // }, [gameState, moveDown]);

  return (
    <div
      style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
      className="w-full flex "
    >
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
  );
};
export default Timer;
