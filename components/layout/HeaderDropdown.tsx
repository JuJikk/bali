import React, { useRef, useState } from "react";
import Icon from "../ui/Icon";
import Portal from "../ui/Portal";

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string | React.ReactNode;
  classNames?: string;
  classNamesSelect?: string;
  defaultTitle?: "value" | "label";
  placeholderStyles?: string;
  unitAfter?: string;
};

const HeaderDropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  placeholder = "Select...",
  classNames,
  classNamesSelect,
  defaultTitle,
  placeholderStyles,
  unitAfter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptionLabel, setSelectedOptionLabel] = useState<string>("");
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
  const handleOptionClick = (value: string, label: string) => {
    setSelectedOption(value);
    setSelectedOptionLabel(label);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={handleToggleDropdown}
        className={`${classNamesSelect} flex items-center gap-2 justify-between rounded-[10px] text-start text-grays-900`}
      >
        <span className={!selectedOption ? placeholderStyles : ""}>
          {selectedOptionLabel || selectedOption
            ? defaultTitle === "label"
              ? selectedOptionLabel
              : selectedOption + " " + (unitAfter ? unitAfter : "")
            : placeholder}
        </span>
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
            key={option.value}
            onClick={() => handleOptionClick(option.value, option.label)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap w-full"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderDropdown;
