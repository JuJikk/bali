"use client";
import Icon from "../ui/Icon";
import { usePathname } from "next/navigation";
import TheDropdown, { DropdownOption } from "../ui/TheDropdown";
import { useEffect, useRef, useState } from "react";
import UserMenu from "./UserMenu";
import Menu from "./Menu";
import NavLinks from "./NavLinks";
import HeaderInput from "./HeaderInput";
import { CurrencyItem, useCurrencyStore } from "@/store/currencyStore";
import { LanguageItem, useLanguageStore } from "@/store/languageStore";
import useHeaderStore from "@/store/headerStore";

type Title = {
  en: string;
};

export type NavItem = {
  id: number;
  title: Title;
  href: string;
};

const navItems: NavItem[] = [
  {
    id: 1,
    title: { en: "Properties" },
    href: "/",
  },
  {
    id: 2,
    title: { en: "Land" },
    href: "/land",
  },
  {
    id: 3,
    title: { en: "Accomodation" },
    href: "/accomodation",
  },
];

const Header = () => {
  const pathname = usePathname();
  const { currentCurrency, setCurrency, supportedCurrencies } =
    useCurrencyStore();
  const { currentLanguage, setLanguage, supportedLanguages } =
    useLanguageStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchExpand = (type: boolean) => {
    setIsSearchExpanded(type);
  };

  const handleLanguageChange = (value: DropdownOption) => {
    setLanguage(value as LanguageItem);
  };

  const handleCurrencyChange = (value: DropdownOption) => {
    setCurrency(value as CurrencyItem);
  };

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        handleSearchExpand && handleSearchExpand(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeaderHeight(entry.contentRect.height);
      }
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [setHeaderHeight]);

  const isComplecatedHeader = pathname.split("/")[2] === "listings";

  return (
    <header
      ref={headerRef}
      className="w-full bg-beiges-600 h-fit lg:min-h-[92px] lg:h-full lg:max-h-[176px] flex items-center mx-auto flex-col fixed z-50 lg:z-auto lg:relative"
    >
      <div className="max-w-[1440px] w-full mx-auto py-6 px-5 lg:px-10">
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-16">
            <Icon
              iconName="logo"
              width="100"
              height="24"
              viewBox="0 0 100 24"
            />
            {!isComplecatedHeader && (
              <nav className="hidden lg:block">
                <NavLinks navItems={navItems} pathname={pathname} />
              </nav>
            )}
          </div>
          {isComplecatedHeader && (
            <div
              className={`hidden lg:flex flex-col max-w-[651px] h-[60px] w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
                isSearchExpanded ? "top-[27%] py-4" : "top-1/2"
              }`}
            >
              {isSearchExpanded && (
                <nav className="hidden lg:flex items-center justify-center">
                  <NavLinks navItems={navItems} pathname={pathname} />
                </nav>
              )}
              {!isSearchExpanded && (
                <HeaderInput
                  handleSearchExpand={handleSearchExpand}
                  isSearchExpanded={isSearchExpanded}
                />
              )}
            </div>
          )}
          <div className="flex flex-row gap-4 items-center">
            <div className="hidden lg:flex gap-4 items-center">
              {!isComplecatedHeader && (
                <>
                  <h3 className="text-grays-900 body_s leading-[20.85px]">
                    List your property for free
                  </h3>
                  <p className="text-grays-600 body_xs  hidden xl:block">
                    0% commission
                  </p>
                </>
              )}

              <TheDropdown
                options={supportedLanguages}
                onChange={handleLanguageChange}
                currentValue={currentLanguage}
                classNames="absolute z-10 bg-grays-0 border border-grays-50 rounded-[10px] mt-3 dropdown-menu left-0 text-start w-fit py-4"
              />
              <TheDropdown
                options={supportedCurrencies}
                onChange={handleCurrencyChange}
                currentValue={currentCurrency}
                classNames="absolute w-fit z-10 bg-grays-0 border border-grays-50 rounded-[10px] mt-3 dropdown-menu text-start left-0 py-4"
              />
            </div>

            <div className="relative flex gap-[18px] z-[60]">
              <button
                aria-label="user-menu-open"
                onClick={() => setIsUserMenuOpen(true)}
                className=" bg-grays-0 rounded-[22px] flex justify-center items-center w-[44px] h-[44px]"
              >
                <Icon iconName="user" fill="none" stroke="#3C3E3D" />
              </button>
              {isUserMenuOpen && (
                <UserMenu setIsUserMenuOpen={setIsUserMenuOpen} />
              )}
              <button
                aria-label="menu-open"
                onClick={() => setIsMenuOpen(true)}
                className="block lg:hidden"
              >
                <Icon iconName="menu" stroke="#3C3E3D" />
              </button>
              {isMenuOpen && (
                <Menu
                  currencyDropDownItems={supportedCurrencies}
                  handleCurrencyChange={handleCurrencyChange}
                  handleLanguageChange={handleLanguageChange}
                  setIsMenuOpen={setIsMenuOpen}
                  languageDropDownItems={supportedLanguages}
                  selectedCurrency={currentCurrency}
                  selectedLanguage={currentLanguage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isSearchExpanded && isComplecatedHeader && (
        <HeaderInput
          handleSearchExpand={handleSearchExpand}
          isSearchExpanded={isSearchExpanded}
        />
      )}
      {!pathname.startsWith("/auth") &&
        !pathname.startsWith("/onboarding-presentation") &&
        !pathname.startsWith("/add-new-listing") && (
          <nav className="block lg:hidden pb-2.5 self-start pl-5">
            <NavLinks navItems={navItems} pathname={pathname} />
          </nav>
        )}
      {isComplecatedHeader && (
        <div
          className={`flex lg:hidden flex-col lg:max-w-[651px] items-center w-full bg-grays-0 p-5 border-b border-b-grays-50`}
        >
          {isSearchExpanded && (
            <nav className="hidden lg:flex items-center justify-center">
              <NavLinks navItems={navItems} pathname={pathname} />
            </nav>
          )}
          {!isSearchExpanded && (
            <HeaderInput
              handleSearchExpand={handleSearchExpand}
              isSearchExpanded={isSearchExpanded}
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
