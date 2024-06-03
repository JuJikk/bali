import { RegionProperty } from "./HeroInput";
import RecentPropertyCard from "./RecentPropertyCard";
import TheButton from "../ui/TheButton";
import Icon from "../ui/Icon";
import RegionCard from "../ui/RegionCard";
import { listOfRegions } from "@/const/regions";
import { text } from "@/const/text";
import { propertyTypes } from "@/const/filters";
import useRecentSearchesStore from "@/store/recentSearchesStore";

type InputActiveMenuProps = {
  isMobileInputMenuOpen: boolean;
};

const InputActiveMenu: React.FC<InputActiveMenuProps> = ({
  isMobileInputMenuOpen,
}) => {
  const language = "en";

  const { recentSearches } = useRecentSearchesStore();

  return (
    <>
      <div className={`flex-1 flex flex-col gap-6 `}>
        {isMobileInputMenuOpen && (
          <ul className="flex gap-8">
            {propertyTypes.map((el) => (
              <li key={el} className="pb-2 border-b-2 border-grays-400">
                <span className="body_xs text-grays-500">{el}</span>
              </li>
            ))}
          </ul>
        )}
        <h5 className="heading_h5 text-grays-1000">
          {text.heroSection.inputMenuSearchTitle[language]}
        </h5>
        <div className="flex flex-col gap-4">
          {recentSearches.slice(0, 2).map((el) => (
            <RecentPropertyCard key={el.itemId} el={el} />
          ))}
          {!isMobileInputMenuOpen && (
            <TheButton className="w-fit mt-2">
              <Icon iconName="map2" stroke="#ffffff" />
              <span>Show map area</span>
            </TheButton>
          )}
        </div>
      </div>
      <div
        className={`flex-1 flex flex-col gap-6 ${
          isMobileInputMenuOpen ? "" : "border-l border-grays-50 pl-11"
        }`}
      >
        <h5 className="heading_h5 text-grays-1000">
          {text.heroSection.inputMenuMapTitle[language]}
        </h5>
        <div
          className={`grid  gap-3  ${
            isMobileInputMenuOpen ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          {listOfRegions.map((region) => (
            <RegionCard
              key={region.name}
              name={region.name}
              imgPath={region.imgPath}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InputActiveMenu;
