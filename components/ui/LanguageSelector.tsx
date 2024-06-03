import React, {
  useState,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
  FC,
} from "react";
import Icon from "./Icon";
import TheChip from "./TheChip";

const languagesList = [
  "French",
  "English",
  "Hindi",
  "Spanish",
  "Mandarin",
  "German",
  "Italian",
  "Portuguese",
];

type LanguageSelectorProps = {
  selectedLanguages: string[];
  setSelectedLanguages: Dispatch<SetStateAction<string[]>>;
};

const LanguageSelector: FC<LanguageSelectorProps> = ({
  selectedLanguages,
  setSelectedLanguages,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleLanguageSelect = (language: string) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages((prev) => [...prev, language]);
    }
    setSearchTerm("");
  };

  const handleRemoveLanguage = (language: string) => {
    setSelectedLanguages((prev) => prev.filter((lang) => lang !== language));
  };

  const filteredLanguages = languagesList.filter((language) =>
    language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`cursor-pointer z-30 w-full border border-grays-50 text-start px-[18px] rounded-[10px] body_xs text-grays-500 ${
          selectedLanguages.length > 0 ? "py-[12.5px]" : "py-[16.5px]"
        }`}
      >
        {selectedLanguages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedLanguages.map((language) => (
              <TheChip type="dark" key={language}>
                <div className="flex gap-2.5 items-center justify-center">
                  <span className="body_xs">{language}</span>
                  <button
                    onClick={() => handleRemoveLanguage(language)}
                    className="text-gray-600"
                  >
                    <Icon iconName="close" stroke="white" width="16" />
                  </button>
                </div>
              </TheChip>
            ))}
          </div>
        )}
        {selectedLanguages.length === 0 && <span>Select Languages</span>}
      </div>
      {dropdownVisible && (
        <div className="absolute z-10 w-full mt-2 bg-grays-0 border border-grays-50 rounded-[10px] shadow-lg">
          <div className="px-[18px] py-[16px]">
            <div className="relative">
              <div className="absolute top-1/2 left-[18px] -translate-y-1/2">
                <Icon iconName="search" width="16" viewBox="0 0 24 24" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Languages..."
                className="w-full pl-11 px-[18px] py-[16.5px] border border-grays-50 rounded-[10px] focus:outline-none"
              />
            </div>
            <ul className="max-h-60 mt-2.5 overflow-y-auto flex flex-col gap-2.5">
              {filteredLanguages.map((language) => (
                <li
                  key={language}
                  onClick={() => handleLanguageSelect(language)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
