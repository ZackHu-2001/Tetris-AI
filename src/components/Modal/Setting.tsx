import React, { useState } from "react";
import MenuButton from "../MenuButton/MenuButton";
import { useGameBoard, AIdifficulty } from "../GameBoard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
    } else if (key === 'AI') {
      let choice = [AIdifficulty.easy, AIdifficulty.medium, AIdifficulty.hard];
      let currentIndex = choice.indexOf(settings[key]);
      const newDifficulty = increment ? choice[(currentIndex + 1) % 3] : choice[(currentIndex + 2) % 3];
      setSettings({ AI: newDifficulty });
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
            <FaChevronLeft 
              className=" cursor-pointer arrow"
              onClick={() => adjustSetting(settingKey, false)}
            />
            <span className="flex-1 text-center">
              {typeof value === "boolean" ? (value ? "On" : "Off") : value}
            </span>
            <FaChevronRight className="cursor-pointer arrow"
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