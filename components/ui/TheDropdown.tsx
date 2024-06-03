import React, { useRef, useState } from "react";
import Icon from "./Icon";
import Portal from "./Portal";
import Image from "next/image";
import { LanguageItem } from "@/store/languageStore";
import { CurrencyItem } from "@/store/currencyStore";

export type DropdownOption = LanguageItem | CurrencyItem;

interface DropdownProps {
  options: DropdownOption[];
  onChange: (value: DropdownOption) => void;
  currentValue: DropdownOption;
  classNames?: string;
}

const TheDropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  classNames,
  currentValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownDirection, setDropdownDirection] = useState("down");

  const handleToggleDropdown = () => {
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - dropdownRect.bottom;
      const spaceAbove = dropdownRect.top;

      const neededSpace = 40 * Math.min(options.length, 5);

      if (spaceBelow >= neededSpace) {
        setDropdownDirection("down");
      } else if (spaceAbove >= neededSpace) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection(spaceBelow > spaceAbove ? "down" : "up");
      }
    }

    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const renderIcon = () => {
    const iconSrc = selectedOption?.icon || currentValue?.icon;
    if (iconSrc) {
      return (
        <div className="w-[26px] h-[26px] flex justify-center items-center bg-grays-0 bg-opacity-[13%] shadow-flag rounded-full">
          <Image src={iconSrc} alt="flag" width={20} height={20} />
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={handleToggleDropdown}
        className="flex items-center gap-2 justify-between border rounded-[10px] text-start text-grays-900 border-none"
      >
        {renderIcon()}
        <span>{selectedOption ? selectedOption.name : currentValue?.name}</span>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <Icon
            iconName="arrow"
            fill="none"
            stroke="#3C3E3D"
            viewBox="0 0 16 16"
            width="16"
          />
        </div>
      </button>
      {isOpen && (
        <Portal>
          <div onClick={() => setIsOpen(false)} className="fixed inset-0"></div>
        </Portal>
      )}
      <ul
        className={`${classNames} ${isOpen ? "open" : ""} ${
          dropdownDirection === "up" ? "bottom-full" : "top-full"
        }`}
      >
        {options.map((option) => (
          <li
            key={option.shortName}
            onClick={() => handleOptionClick(option)}
            className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {option.icon ? (
              <div className="flex gap-2">
                <div className="w-[26px] h-[26px] flex justify-center items-center bg-grays-0 bg-opacity-[13%] shadow-flag rounded-full">
                  <Image src={option.icon} alt="flag" width={20} height={20} />
                </div>
                <span>{option.name}</span>
              </div>
            ) : (
              <div className="whitespace-nowrap body_m text-grays-800">
                {option.name + " (" + option.shortName + ")"}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TheDropdown;
