import React, { useEffect, useState } from "react";
import MenuButton from "../MenuButton/MenuButton";
import { useGameBoard } from "../GameBoard";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

type ControlProps = {};

export const getDisplayNameForKey = (code: string) => {
  if (!code) return "undefined";
  switch (code) {
    case "ArrowLeft":
        return <FaArrowLeft />;
    case "ArrowRight":
        return <FaArrowRight />;
    case "ArrowUp":
        return <FaArrowUp />;
    case "ArrowDown":
        return <FaArrowDown />;
    case "Space":
        return "Space";
    default:
        return code.replace(/Key|Digit/g, "");
  }
};

const Control: React.FC<ControlProps> = () => {
  const { setModal, setKeyBindings, keyBindings } = useGameBoard();
  const [editingControl, setEditingControl] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (editingControl) {
        event.preventDefault();
        const code = event.code;
        const displayName = getDisplayNameForKey(code);
        setKeyBindings(editingControl, code);
        setEditingControl(null); // Stop editing after key press
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [editingControl, keyBindings, setKeyBindings]);

  const handleDone = () => {
    setModal("mainMenu");
  };

  const startEditing = (control: string) => {
    setEditingControl(control);
  };

  return (
    <div className="control-panel flex flex-col justify-center items-center h-full">
      <div className="title">Control</div>
      <div
        style={{
          fontSize: "3rem",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          textAlign: "center",
        }}
      >
        Click on the control you want to change, then press any key.
      </div>
      <div className="controls-container">
        {Object.entries(keyBindings).map(([control, binding]) => (
          <div key={control} className="control-item flex items-center">
            <div className="control-name">
              {`${
                control.charAt(0).toUpperCase() +
                control.slice(1).replace(/([A-Z])/g, " $1")
              }:`}
            </div>
            <button
              className={`button ${
                editingControl === control ? "button-active" : ""
              }`}
              onClick={() => startEditing(control)}
            >
              {getDisplayNameForKey(keyBindings[control].code ?? "")}
            </button>
          </div>
        ))}
      </div>
      <MenuButton text="Done" onClick={handleDone}></MenuButton>
    </div>
  );
};
export default Control;
