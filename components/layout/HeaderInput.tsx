import { useState } from "react";
import TheButton from "../ui/TheButton";
import TheDropdown from "../ui/TheDropdown";
import Icon from "../ui/Icon";
import HeroInput from "../home/HeroInput";
import { text } from "@/const/text";
import HeaderDropdown from "./HeaderDropdown";
import FilterModal from "./FilterModal";

const leaseholdDropDownItems = [
  {
    value: "Leasehold",
    label: "Leasehold",
  },
  {
    value: "Freehold",
    label: "Freehold",
  },
];

type HeaderInputProps = {
  isSearchExpanded: boolean;
  handleSearchExpand: (type: boolean) => void;
};

const HeaderInput: React.FC<HeaderInputProps> = ({
  isSearchExpanded,
  handleSearchExpand,
}) => {
  const language = "en";
  const listings = ["Villas", "Appartments", "Commercial"];
  const [selectedHoldType, setSelectedHoldType] = useState(
    leaseholdDropDownItems[0].value
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };
  const handleFIlterModalClose = () => {
    setIsFilterModalOpen(false);
  };

  const handleHoldTypeChange = (value: string) => {
    setSelectedHoldType(value);
  };
  return (
    <div className="max-w-[651px] w-full flex items-center gap-3 z-10 lg:pb-6 relative">
      {isSearchExpanded ? (
        <HeroInput
          className=""
          placeholderClose={text.heroSection.inputPlaceholderCLose[language]}
          placeholderOpen={text.heroSection.inputPlaceholderOpen[language]}
          isSearchExpanded={isSearchExpanded}
          handleSearchExpand={handleSearchExpand}
          handleHoldTypeChange={handleHoldTypeChange}
          leaseholdDropDownItems={leaseholdDropDownItems}
          selectedHoldType={selectedHoldType}
        />
      ) : (
        <div className="w-full">
          <div className="bg-grays-0 w-full py-2 px-4.5  rounded-[10px] border border-grays-50 flex justify-between items-center">
            <div
              className="flex flex-1 flex-col cursor-pointer"
              onClick={() => handleSearchExpand(true)}
            >
              <h6 className="heading_h6 text-grays-1000">Map area</h6>
              <ul className="flex gap-2.5">
                {listings.map((el) => (
                  <li key={el}>
                    <span className="body_xs text-grays-500">{el}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <HeaderDropdown
                onChange={handleHoldTypeChange}
                options={leaseholdDropDownItems}
                placeholder={selectedHoldType}
                classNames="absolute z-10 bg-grays-0 border border-grays-50 rounded-[10px] w-fit mt-1 dropdown-menu right-0"
              />
              <TheButton
                variant="tertiary"
                className="!px-0 !py-0"
                onClick={handleFilterModalOpen}
              >
                <Icon iconName="filter" hover />
              </TheButton>
              {isFilterModalOpen && (
                <FilterModal closeModal={handleFIlterModalClose} />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="hidden lg:block">
        <TheButton className="h-fit">Search</TheButton>
      </div>
      <div className="block lg:hidden">
        <TheButton
          variant="info"
          className="h-fit w-fit px-2.5 rounded-[10px]"
          onClick={handleFilterModalOpen}
        >
          <Icon iconName="filter" hover />
        </TheButton>
      </div>
    </div>
  );
};

export default HeaderInput;
