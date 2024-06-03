"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TheButton from "../ui/TheButton";
import useNewListingStore from "@/store/newListingStore";

const NewListingAddForm: FC = () => {
  const router = useRouter();
  const { listingData, setListingData } = useNewListingStore();
  const [error, setError] = useState<string | null>(null);

  const handlePropertyTypeClick = (
    type: "VILLA" | "APARTMENT" | "LAND" | "COMMERCIAL"
  ) => {
    setListingData({ propertyType: type });
  };

  const handleListingTypeClick = (type: "SALE" | "RENT") => {
    setError("");
    setListingData({ listingType: type });
    if (type === "RENT" && listingData.propertyType === "LAND") {
      setListingData({ propertyType: "VILLA" });
    }
    if (type === "RENT") {
      setListingData({
        leasehold: false,
        freehold: false,
      });
    }
    if (type === "SALE") {
      setListingData({
        monthlyRent: false,
        yearlyRent: false,
      });
    }
  };

  const handleOwnershipClick = (type: "Leasehold" | "Freehold") => {
    setError("");
    setListingData({
      leasehold: type === "Leasehold",
      freehold: type === "Freehold",
    });
  };

  const handleRentalTermOptionsClick = (type: "Monthly" | "Yearly") => {
    setListingData({
      monthlyRent: type === "Monthly",
      yearlyRent: type === "Yearly",
    });
  };

  const handleContinue = () => {
    if (
      listingData.listingType === "SALE" &&
      !listingData.leasehold &&
      !listingData.freehold
    ) {
      setError("Please select a type of ownership before proceeding.");
      return;
    }
    if (
      listingData.listingType === "RENT" &&
      !listingData.monthlyRent &&
      !listingData.yearlyRent
    ) {
      setError("Please select a rental term options before proceeding.");
      return;
    }
    if (
      listingData.listingType === "SALE" &&
      listingData.leasehold &&
      listingData.propertyType === "VILLA"
    ) {
      router.push("/add-new-listing/sale/leasehold-villa");
    }
  };

  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 pt-6 pb-12 lg:pb-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col gap-5 justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit h-full lg:h-auto">
      <h2 className="heading_h4">Add New Listing</h2>
      <div className="flex justify-between items-center">
        <h3 className="heading_h6">Select Property Type</h3>
        <div className="flex gap-4 items-center">
          <TheButton
            variant={
              listingData.listingType === "SALE"
                ? "selectedSmall"
                : "notSelectedSmall"
            }
            onClick={() => handleListingTypeClick("SALE")}
          >
            For Sale
          </TheButton>
          <TheButton
            variant={
              listingData.listingType === "RENT"
                ? "selectedSmall"
                : "notSelectedSmall"
            }
            onClick={() => handleListingTypeClick("RENT")}
          >
            For Rent
          </TheButton>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {["Villa", "Apartment", "Commercial", "Land"].map(
          (type) =>
            (type !== "LAND" || listingData.listingType !== "RENT") && (
              <TheButton
                key={type}
                variant={
                  listingData.propertyType.toUpperCase() === type.toUpperCase()
                    ? "selected"
                    : "notSelected"
                }
                className="rounded-[10px] heading_h5 !justify-start !px-4.5 text-grays-900"
                onClick={() =>
                  handlePropertyTypeClick(
                    type.toUpperCase() as
                      | "VILLA"
                      | "APARTMENT"
                      | "LAND"
                      | "COMMERCIAL"
                  )
                }
              >
                {type}
              </TheButton>
            )
        )}
      </div>
      {listingData.listingType === "SALE" && (
        <div className="flex justify-between items-center">
          <h3 className="heading_h6">Types of Ownership</h3>
          <div className="flex gap-4 items-center">
            <TheButton
              variant={
                listingData.leasehold ? "selectedSmall" : "notSelectedSmall"
              }
              onClick={() => handleOwnershipClick("Leasehold")}
            >
              Leasehold
            </TheButton>
            <TheButton
              variant={
                listingData.freehold ? "selectedSmall" : "notSelectedSmall"
              }
              onClick={() => handleOwnershipClick("Freehold")}
            >
              Freehold
            </TheButton>
          </div>
        </div>
      )}
      {listingData.listingType === "RENT" && (
        <div className="flex justify-between items-center">
          <h3 className="heading_h6">Rental Term Options</h3>
          <div className="flex gap-4 items-center">
            <TheButton
              variant={
                listingData.monthlyRent ? "selectedSmall" : "notSelectedSmall"
              }
              onClick={() => handleRentalTermOptionsClick("Monthly")}
            >
              Monthly
            </TheButton>
            <TheButton
              variant={
                listingData.yearlyRent ? "selectedSmall" : "notSelectedSmall"
              }
              onClick={() => handleRentalTermOptionsClick("Yearly")}
            >
              Yearly
            </TheButton>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-func-red bg-opacity-10 p-4 rounded-[10px] text-func-red body_xs text-center">
          {error}
        </div>
      )}
      <TheButton className="mt-auto lg:mt-0" onClick={handleContinue}>
        Continue
      </TheButton>
      
    </div>
  );
};

export default NewListingAddForm;
