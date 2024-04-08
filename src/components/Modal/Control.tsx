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
        return <div className="key-icon button"><FaArrowLeft /></div>;
    case "ArrowRight":
        return <div className="key-icon button"><FaArrowRight /></div>;
    case "ArrowUp":
        return <div className="key-icon button"><FaArrowUp /></div>;
    case "ArrowDown":
        return <div className="key-icon button"><FaArrowDown /></div>;
    case "Space":
        return <div className="key-icon button">Space</div>;
    default:
        return <div className="key-icon button">{code.replace(/Key|Digit/g, "")}</div>;
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
  }, [editingControl, keyBindings]);

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
          margin: "4rem",
          textAlign: "center",
        }}
      >
        Click on the control you want to change, then press any key.
      </div>
      <div className="flex flex-col w-full px-24 py-12 control">
        {Object.entries(keyBindings).map(([control, binding]) => (
          <div key={control} className="flex items-center justify-between mb-8">
            <div >
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
