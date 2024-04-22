import React from "react";
import { useGameBoard } from "../../GameBoard";
import NextPanel from "../NextPanel/NextPanel";
import StatusPanel from "../StatusPanel/StatusPanel";

type RightPanelProps = {};

const RightPanel: React.FC<RightPanelProps> = () => {
    const { gameState, nextTetrominoQueue_AI } = useGameBoard();
    return (
        <>
            {gameState.mode === 'competition' ?
                <div style={{ width: '16.5%' }} >
                    <NextPanel nextTetrominoQueue={nextTetrominoQueue_AI} height={55}/>
                    <StatusPanel AIcontrol={true}/>
                </div>
                :
                <div style={{ width: '25%' }}>
                <StatusPanel />
                </div>
            }

        </>
    )
}

export default RightPanel;