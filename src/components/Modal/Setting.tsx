import React, { useState } from "react";
import MenuButton from "../MenuButton/MenuButton";
import { useGameBoard } from "../GameBoard";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

type SettingProps = {};

const Setting: React.FC<SettingProps> = () => {
const { setModal, settings, setSettings } = useGameBoard();

    const handleDone = () => {
        setModal("mainMenu");
    };

  const adjustSetting = (key: keyof typeof settings, increment: boolean) => {
    if (key === "volume") {
        const newVolume = increment ? settings.volume + 1 : settings.volume - 1;
      setSettings({ volume: Math.max(0, Math.min(100, newVolume)) });
    } else {
        const currentValue = settings[key];
        if (typeof currentValue === "boolean") {
            setSettings({ [key]: !currentValue });
        }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="title mb-8">Settings</div>
      {Object.keys(settings).map((key) => {
        const settingKey = key as keyof typeof settings;
        const value = settings[settingKey];
        return (
          <div
            key={key}
            className="setting flex items-center justify-between w-full mb-8 px-20 text-white"
          >
            <span className="flex-1 text-left">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>
            <MdArrowLeft
              className="text-40xl cursor-pointer"
              onClick={() => adjustSetting(settingKey, false)}
            />
            <span className="flex-1 text-center">
              {typeof value === "boolean" ? (value ? "On" : "Off") : value}
            </span>
            <MdArrowRight
              className="text-40xl cursor-pointer"
              onClick={() => adjustSetting(settingKey, true)}
            />
          </div>
        );
      })}
      <MenuButton text="Done" onClick={handleDone} />
    </div>
  );
};

export default Setting;