import React, { useState, useRef, useEffect, InputHTMLAttributes } from "react";
import TheInput from "../ui/TheInput";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import InputActiveMenu from "./InputActiveMenu";
import InputSearchMenu from "./InputSearchMenu";
import Portal from "../ui/Portal";
import HeaderDropdown from "../layout/HeaderDropdown";
import { PropertiesDetailsList } from "@/models/basic";
import { useSearchTermStore } from "@/store/searchTermStore";
import { findMatchingProperties } from "@/utils/searchUtils";

type HeroInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  placeholderClose: string;
  placeholderOpen: string;
  isSearchExpanded?: boolean;
  handleSearchExpand?: (type: boolean) => void;
  leaseholdDropDownItems?: {
    value: string;
    label: string;
  }[];
  handleHoldTypeChange?: (value: string) => void;
  selectedHoldType?: string;
  propertiesDetails?: PropertiesDetailsList;
  handleSetSearchterm?: (searchTerm: string) => void;
};

export type RegionProperty = {
  id: number;
  name: string;
  bedroomTypes?: string;
  bedroomPrice?: string;
  squares?: string;
  arePrice?: string;
};

const HeroInput: React.FC<HeroInputProps> = ({
  className,
  placeholderClose,
  placeholderOpen,
  isSearchExpanded,
  handleSearchExpand,
  handleHoldTypeChange,
  leaseholdDropDownItems,
  selectedHoldType,
  propertiesDetails,
  handleSetSearchterm,
  ...rest
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredProperties, setFilteredProperties] =
    useState<PropertiesDetailsList>();
  const [isMobileInputMenuOpen, setIsMobileInputMenuOpen] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredProperties(propertiesDetails);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filtered = findMatchingProperties(filteredProperties!, value);

      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(propertiesDetails);
    }
  };

  useEffect(() => {
    if (isSearchExpanded) {
      setDropdownOpen(isSearchExpanded);
    }
  }, [isSearchExpanded]);

  const handleInputFocus = () => {
    if (window.innerWidth > 1024) {
      setDropdownOpen(true);
    } else {
      setIsMobileInputMenuOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = isMobileInputMenuOpen
      ? "hidden"
      : originalStyle;

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isMobileInputMenuOpen]);

  useEffect(() => {
    handleSetSearchterm && handleSetSearchterm(inputValue);
  }, [inputValue]);

  return (
    <div
      ref={inputRef}
      className={`${
        isMobileInputMenuOpen
          ? "fixed w-screen left-0 bottom-0 h-[83vh] p-[22px] bg-grays-0 flex flex-col gap-6 rounded-t-2xl z-20"
          : " w-full"
      }`}
    >
      {isMobileInputMenuOpen && (
        <>
          <Portal>
            <div
              onClick={() => setIsMobileInputMenuOpen(false)}
              className="fixed inset-0 bg-grays-1000 bg-opacity-40"
            ></div>
          </Portal>
          <div className="flex justify-end">
            <button onClick={() => setIsMobileInputMenuOpen(false)}>
              <Icon iconName="close" stroke="#292D32" />
            </button>
          </div>
        </>
      )}
      <div className="relative">
        <TheInput
          className={`w-full ${isDropdownOpen && "placeholder:text-grays-500"}`}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          value={inputValue}
          {...rest}
          placeholder={isDropdownOpen ? placeholderOpen : placeholderClose}
        />
        {isSearchExpanded && (
          <div className="flex items-center gap-6 absolute top-1/2 -translate-y-1/2 right-[1.125rem]">
            {handleHoldTypeChange && leaseholdDropDownItems && (
              <HeaderDropdown
                onChange={handleHoldTypeChange}
                options={leaseholdDropDownItems}
                placeholder={selectedHoldType}
                classNames="absolute z-10 bg-grays-0 border border-grays-50 rounded-[10px] w-fit mt-1 dropdown-menu right-0"
              />
            )}
            <TheButton variant="tertiary" className="!px-0 !py-0">
              <Icon iconName="filter" hover />
            </TheButton>
          </div>
        )}
      </div>
      {(isDropdownOpen || isMobileInputMenuOpen) && (
        <>
          {inputValue.length > 0 ? (
            filteredProperties &&
            filteredProperties.length > 0 && (
              <div
                className={`${
                  isMobileInputMenuOpen
                    ? ""
                    : `absolute z-50 bg-grays-0 shadow-md mt-6 rounded-md shadow-menu flex p-[22px] w-fit min-w-[256px]`
                }`}
              >
                <InputSearchMenu filteredProperties={filteredProperties} />
              </div>
            )
          ) : (
            <div
              className={`${
                isMobileInputMenuOpen
                  ? "flex flex-col gap-6"
                  : `absolute z-50 bg-grays-0 shadow-md mt-6 rounded-2xl shadow-menu flex p-[22px] w-full ${
                      isSearchExpanded ? "w-[651px]" : ""
                    }`
              }`}
            >
              <InputActiveMenu isMobileInputMenuOpen={isMobileInputMenuOpen} />
            </div>
          )}
        </>
      )}
      {isMobileInputMenuOpen &&
        filteredProperties &&
        filteredProperties.length > 0 && (
          <TheButton className="w-fit mt-2">
            <Icon iconName="map2" stroke="#ffffff" />
            <span>Show map area</span>
          </TheButton>
        )}
    </div>
  );
};

export default HeroInput;
