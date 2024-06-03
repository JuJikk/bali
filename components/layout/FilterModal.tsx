import React, { FC, useEffect, useRef, useState } from "react";
import Portal from "../ui/Portal";
import Icon from "../ui/Icon";
import useFilterStore from "@/store/filterStore";
import {
  bedroomsNumbers,
  equipmentOptions,
  landType,
  leasePeriods,
  ownershipTypes,
  propertyTypes,
  rentalTermOptions,
} from "@/const/filters";
import TheButton from "../ui/TheButton";
import SliderRange from "./SliderRange";
import HeaderDropdown from "./HeaderDropdown";
import { useCurrencyStore } from "@/store/currencyStore";
import { usePathname } from "next/navigation";
import TheInput from "../ui/TheInput";

export type Filters = {
  [key: string]:
    | number
    | boolean
    | string
    | number[]
    | string[]
    | undefined
    | null;
};

type FilterModalProps = {
  closeModal: () => void;
};

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
  const pathname = usePathname();
  const isAccomodation = pathname.startsWith("/accomodation");
  const isLandPage = pathname.startsWith("/land");

  const setFilters = useFilterStore((state) => state.setFilters);
  const fetchFilteredProperties = useFilterStore(
    (state) => state.fetchFilteredProperties
  );

  const { currentCurrency } = useCurrencyStore();
  const [priceRange, setPriceRange] = useState([100000, 350000]);
  const [sizeRange, setSizeRange] = useState([100, 400]);
  const [minLeasePeriod, setMinLeasePeriod] = useState(leasePeriods[0].value);
  const [selectedPropertyTypes, setSelectedPropertyTypes] =
    useState<(typeof propertyTypes)[number]>();
  const [selectedBedroomsNumbers, setSelectedBedroomsNumbers] = useState<
    string[]
  >([]);
  const [selectedOwnershipTypes, setSelectedOwnershipTypes] =
    useState<(typeof ownershipTypes)[number]>("Freehold");
  const [selectedRentalTermTypes, setSelectedRentalTermTypes] =
    useState<(typeof rentalTermOptions)[number]>("Yearly");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [locationValue, setLocationValue] = useState("");

  const handleSelectPropertyType = (type: (typeof propertyTypes)[number]) => {
    setSelectedPropertyTypes(type);
  };

  const handleSelectOwnershipType = (type: (typeof ownershipTypes)[number]) => {
    setSelectedOwnershipTypes(type);
  };
  const handleSelectRentalTermType = (
    type: (typeof rentalTermOptions)[number]
  ) => {
    setSelectedRentalTermTypes(type);
  };

  const handleSelectEquipment = (equipment: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment)
        ? prev.filter((e) => e !== equipment)
        : [...prev, equipment]
    );
  };
  const handleSelectBedroomsNumbers = (bedrooms: string) => {
    setSelectedBedroomsNumbers((prev) =>
      prev.includes(bedrooms)
        ? prev.filter((e) => e !== bedrooms)
        : [...prev, bedrooms]
    );
  };

  const mixedTypes = [...landType, ...propertyTypes];

  const handleHoldTypeChange = (value: string) => {
    setMinLeasePeriod(value);
  };

  const handleSave = () => {
    const filters: Filters = {
      currency: currentCurrency.name,
      equipment: isLandPage
        ? null
        : selectedEquipment.length
        ? selectedEquipment
        : null,
      leasehold: isAccomodation
        ? null
        : selectedOwnershipTypes.includes(ownershipTypes[0]),
      freehold: isAccomodation
        ? null
        : selectedOwnershipTypes.includes(ownershipTypes[1]),
      minLeaseholdPrice: isAccomodation
        ? null
        : selectedOwnershipTypes.includes(ownershipTypes[0])
        ? priceRange[0]
        : null,
      maxLeaseholdPrice: isAccomodation
        ? null
        : selectedOwnershipTypes.includes(ownershipTypes[0])
        ? priceRange[1]
        : null,
      minFreeholdPrice: isAccomodation
        ? null
        : selectedOwnershipTypes.includes(ownershipTypes[1])
        ? priceRange[0]
        : null,
      maxFreeholdPrice: isAccomodation
        ? null
        : selectedOwnershipTypes.includes(ownershipTypes[1])
        ? priceRange[1]
        : null,
      maxPropertiesSize: isLandPage ? null : sizeRange[1],
      minPropertiesSize: isLandPage ? null : sizeRange[0],
      minBedrooms: isLandPage
        ? null
        : selectedBedroomsNumbers.length
        ? Math.min(...selectedBedroomsNumbers.map((el) => +el))
        : 0,
      maxBedrooms: isLandPage
        ? null
        : selectedBedroomsNumbers.length
        ? Math.max(...selectedBedroomsNumbers.map((el) => +el)) === 6
          ? null
          : Math.max(...selectedBedroomsNumbers.map((el) => +el))
        : 0,
      minLeaseDuration: isLandPage
        ? null
        : isAccomodation
        ? null
        : minLeasePeriod === "Any period (default)"
        ? 0
        : +minLeasePeriod,
      maxLeaseDuration: null,
      villa: isLandPage
        ? null
        : selectedPropertyTypes &&
          selectedPropertyTypes.toLowerCase() === "villas",
      apartment: isLandPage
        ? null
        : selectedPropertyTypes &&
          selectedPropertyTypes.toLowerCase() === "apartments",
      monthly: !isAccomodation
        ? null
        : selectedRentalTermTypes.includes(rentalTermOptions[0]),
      yearly: !isAccomodation
        ? null
        : selectedRentalTermTypes.includes(rentalTermOptions[1]),
      minPrice: isAccomodation ? priceRange[0] : null,
      maxPrice: isAccomodation ? priceRange[1] : null,
      minAres: isLandPage ? sizeRange[0] : null,
      maxAres: isLandPage ? sizeRange[1] : null,
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key] === null || filters[key] === undefined) {
        delete filters[key];
      }
    });
    setFilters(filters);

    fetchFilteredProperties(
      isAccomodation ? "rent" : isLandPage ? "land" : "sale"
    );
    closeModal();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Portal>
      <div
        onClick={closeModal}
        className="fixed inset-0 z-50 w-screen h-screen bg-grays-1000 bg-opacity-40 backdrop-blur-sm"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="absolute z-40 bottom-0 lg:top-0 right-0 h-fit lg:h-full bg-grays-0 w-full max-h-[95vh] lg:max-h-none lg:w-[400px] p-[22px] flex flex-col gap-6 lg:gap-8 rounded-t-2xl lg:rounded-none"
        >
          <div className="flex justify-between items-center">
            <h5 className="heading_h5">Filters</h5>
            <button type="button" onClick={closeModal}>
              <Icon
                iconName="close"
                viewBox="0 0 24 24"
                fill="black"
                stroke="black"
              />
            </button>
          </div>
          <div className="flex flex-col gap-6 lg:gap-8 overflow-auto">
            <div className="flex flex-col gap-4">
              <h6 className="heading_h6">Property Type</h6>
              <ul className="flex gap-3">
                {(isAccomodation ? propertyTypes : mixedTypes).map((el) => (
                  <li key={el} className="body_xs flex gap-3 items-center">
                    <TheButton
                      onClick={() =>
                        handleSelectPropertyType(
                          el as (typeof propertyTypes)[number]
                        )
                      }
                      variant={
                        isLandPage && el.toLowerCase() === "land"
                          ? "info"
                          : selectedPropertyTypes &&
                            selectedPropertyTypes.includes(el)
                          ? "info"
                          : "secondary"
                      }
                      type="button"
                      disabled={isLandPage && el.toLowerCase() !== "land"}
                      className="border-grays-200 body_l !font-hk_medium !text-[0.8125rem] !leading-[19.5px] !rounded-[100px] !px-[11px] !py-[7px] !text-grays-900"
                    >
                      {el}
                    </TheButton>
                    {el.toLowerCase() === "land" && <span>-</span>}
                    {el.toLowerCase() === "apartments" && isAccomodation && (
                      <span>-</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {isAccomodation && (
              <div className="flex flex-col gap-4">
                <h6 className="heading_h6">Rental Term Options</h6>
                <ul className="flex gap-3">
                  {rentalTermOptions.map((el) => (
                    <li key={el} className="body_xs flex gap-3 items-center">
                      <TheButton
                        onClick={() => handleSelectRentalTermType(el)}
                        type="button"
                        variant={
                          selectedRentalTermTypes.includes(el)
                            ? "info"
                            : "secondary"
                        }
                        className="border-grays-200 body_l !font-hk_medium !text-[0.8125rem] !leading-[19.5px] !rounded-[100px] !px-[11px] !py-[7px] !text-grays-900"
                      >
                        {el}
                      </TheButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isAccomodation && (
              <div className="flex flex-col gap-4">
                <h6 className="heading_h6">Location</h6>
                <div className="relative w-full">
                  {locationValue.length > 0 && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-4">
                      <Icon
                        iconName="map2"
                        fill="none"
                        stroke="black"
                        width="16"
                      />
                    </div>
                  )}
                  <TheInput
                    className={`w-full body_xs ${
                      locationValue.length > 0 ? "pl-11" : ""
                    }`}
                    value={locationValue}
                    onChange={(e) => setLocationValue(e.target.value)}
                  />
                </div>
              </div>
            )}
            {!isAccomodation && (
              <div className="flex flex-col gap-4">
                <h6 className="heading_h6">Types of ownership</h6>
                <ul className="flex gap-3">
                  {ownershipTypes.map((el) => (
                    <li key={el} className="body_xs flex gap-3 items-center">
                      <TheButton
                        onClick={() => handleSelectOwnershipType(el)}
                        type="button"
                        variant={
                          selectedOwnershipTypes.includes(el)
                            ? "info"
                            : "secondary"
                        }
                        className="border-grays-200 body_l !font-hk_medium !text-[0.8125rem] !leading-[19.5px] !rounded-[100px] !px-[11px] !py-[7px] !text-grays-900"
                      >
                        {el}
                      </TheButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-4 ">
              <h6 className="heading_h6">
                {isAccomodation
                  ? "Price / Year"
                  : isLandPage
                  ? selectedOwnershipTypes === "Freehold"
                    ? "Price per are /year"
                    : "Price per are"
                  : "Price (total)"}
              </h6>
              <SliderRange
                valueRange={priceRange}
                setValueRange={setPriceRange}
                param="$"
                defaultValue={priceRange}
                min={0}
                max={1000000}
                step={500}
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <h6 className="heading_h6">
                {isLandPage ? "Plot size" : "Property size"}
              </h6>
              <SliderRange
                valueRange={sizeRange}
                setValueRange={setSizeRange}
                paramBeforePosition={false}
                param={isLandPage ? "are" : "m²"}
                paramGap={4}
                defaultValue={sizeRange}
                min={0}
                max={1500}
                step={10}
              />
            </div>
            {!isLandPage && (
              <div className="flex flex-col gap-4 ">
                <h6 className="heading_h6">Bedrooms</h6>
                <ul className="flex gap-3">
                  {bedroomsNumbers.map((bedroomsNumber, i) => (
                    <li
                      key={bedroomsNumber}
                      className="body_xs flex gap-3 items-center"
                    >
                      <TheButton
                        onClick={() =>
                          handleSelectBedroomsNumbers(bedroomsNumber)
                        }
                        type="button"
                        variant={
                          selectedBedroomsNumbers.includes(bedroomsNumber)
                            ? "info"
                            : "secondary"
                        }
                        className="border-grays-200 body_l !font-hk_medium !text-[0.8125rem] !leading-[19.5px] !rounded-[100px] !px-3 !py-2 !text-grays-900 w-9 h-9"
                      >
                        {i === bedroomsNumbers.length - 1
                          ? bedroomsNumber + "+"
                          : bedroomsNumber}
                      </TheButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!isAccomodation &&
              !isLandPage &&
              selectedOwnershipTypes === "Leasehold" && (
                <div className="flex flex-col gap-4 ">
                  <h6 className="heading_h6">Minimum lease period</h6>
                  <HeaderDropdown
                    onChange={handleHoldTypeChange}
                    options={leasePeriods.map((el) => ({
                      value: el.value,
                      label: el.label + " years",
                    }))}
                    placeholder={minLeasePeriod + " years"}
                    placeholderStyles="body_xs"
                    classNamesSelect="justify-between w-full !border-[1px] !border-grays-50 !rounded-[10px] px-[1.125rem] py-4"
                    classNames="absolute z-10 bg-grays-0 border border-grays-50 rounded-[10px] w-full mt-1 dropdown-menu right-0 top-full"
                  />
                </div>
              )}
            {!isLandPage && (
              <div className="flex flex-col gap-4 ">
                <h6 className="heading_h6">Equipment</h6>
                <ul className="flex gap-3 flex-wrap">
                  {equipmentOptions.map((equipment) => (
                    <li
                      key={equipment.value}
                      className="body_xs flex gap-3 items-center"
                    >
                      <TheButton
                        onClick={() => handleSelectEquipment(equipment.value)}
                        type="button"
                        variant={
                          selectedEquipment.includes(equipment.value)
                            ? "info"
                            : "secondary"
                        }
                        className="border-grays-200 body_l !font-hk_medium !text-[0.8125rem] !leading-[19.5px] !rounded-[100px] !px-[11px] !py-[7px] !text-grays-900"
                      >
                        {equipment.label}
                      </TheButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <TheButton onClick={handleSave} className="mt-auto">
            Save
          </TheButton>
        </div>
      </div>
    </Portal>
  );
};

export default FilterModal;
