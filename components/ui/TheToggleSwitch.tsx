import React, { useState } from "react";

type TheToggleSwitch = {
  isOn: boolean;
  handleToggle: () => void;
};

const TheToggleSwitch: React.FC<TheToggleSwitch> = ({
  isOn = false,
  handleToggle,
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch-new`}
        type="checkbox"
      />
      <label
        className="switch-label flex items-center justify-center cursor-pointer w-[33px] h-[16px] rounded-[23px] relative transition-colors duration-300"
        htmlFor={`switch-new`}
      >
        <span className="switch-button absolute top-1/2 -translate-y-1/2 left-[-12px] w-[24px] h-[24px] rounded-full" />
      </label>
    </>
  );
};

export default TheToggleSwitch;
