import React, { Dispatch, SetStateAction } from "react";
import Portal from "../ui/Portal";
import TheDropdown, { DropdownOption } from "../ui/TheDropdown";
import Image from "next/image";
import flagIcn from "@/public/icons/flags/uk.svg";
import { CurrencyItem } from "@/store/currencyStore";
import { LanguageItem } from "@/store/languageStore";

type MenuProps = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  languageDropDownItems: LanguageItem[];
  currencyDropDownItems: CurrencyItem[];
  handleLanguageChange: (value: DropdownOption) => void;
  handleCurrencyChange: (value: DropdownOption) => void;
  selectedLanguage: LanguageItem;
  selectedCurrency: CurrencyItem;
};

const Menu: React.FC<MenuProps> = ({
  setIsMenuOpen,
  currencyDropDownItems,
  handleCurrencyChange,
  handleLanguageChange,
  languageDropDownItems,
  selectedCurrency,
  selectedLanguage,
}) => {
  return (
    <>
      <Portal>
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-grays-1000 lg:bg-transparent bg-opacity-40 z-[29]"
        ></div>
      </Portal>
      <div className="fixed lg:absolute bottom-0 left-0 lg:left-auto lg:bottom-auto lg:right-0 w-full lg:w-[420px] mt-[14px] p-6 bg-grays-0 z-30 shadow-user-menu rounded-t-2xl lg:rounded-2xl">
        <ul className="flex flex-col gap-6">
          <li className="flex gap-4 items-center flex-col pb-6 border-b border-grays-200">
            <h3 className="text-grays-900 body_s leading-[20.85px]">
              List your property for free
            </h3>
            <p className="text-grays-600 body_xs">0% commission</p>
          </li>

          <li className="flex gap-4 justify-center">
            <TheDropdown
              options={languageDropDownItems}
              onChange={handleLanguageChange}
              currentValue={selectedLanguage}
              classNames="absolute z-10 bg-grays-0 border border-grays-50 rounded-[10px] mt-3 mb-3 dropdown-menu left-0 text-start w-fit py-4"
            />
            <TheDropdown
              options={currencyDropDownItems}
              onChange={handleCurrencyChange}
              currentValue={selectedCurrency}
              classNames="absolute w-fit z-10 bg-grays-0 border border-grays-50 rounded-[10px] mt-3 mb-3 dropdown-menu text-start left-0 py-4"
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
