"use client";
import { FC, useState } from "react";

import useNewListingStore from "@/store/newListingStore";
import GeneralDetails from "./GeneralDetails";
import Accordion from "@/components/ui/Accordion";
import Icon from "@/components/ui/Icon";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import TheButton from "@/components/ui/TheButton";
import { FormValues, PropertyFormValues } from "@/models/formikModels";
import PropertyDetails from "./PropertyDetails";

const NewListingLeaseholdVillaForm: FC = () => {
  const router = useRouter();
  const { listingData, setListingData } = useNewListingStore();
  const [generalFormData, setGeneralFormData] = useState<FormValues | null>(
    null
  );

  const handleGoBack = () => {
    router.back();
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      title: listingData.title,
      description: listingData.description,
      location: "",
      images: [],
      leaseDuration: 0,
      leaseExpiration: "",
      extensionGuaranteed: true,
      youtubeLink: "",
      locationType: "EXACT",
      latitude: "",
      longitude: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, "Title must be 30 characters or less")
        .required("Listing Title is required"),
      description: Yup.string()
        .max(500, "Description must be 500 characters or less")
        .required("Description is required"),
      location: Yup.string().required("Address is required"),
      images: Yup.array()
        .of(
          Yup.object().shape({
            place: Yup.number().required(),
            key: Yup.string().required(),
            year: Yup.number().required(),
            month: Yup.string().required(),
            thumbnail: Yup.boolean().required(),
          })
        )
        .min(1, "At least one image is required")
        .required("Images are required"),
      leaseDuration: Yup.number()
        .min(0, "Lease duration must be at least 0")
        .max(50, "Lease duration must be 50 or less")
        .required("Lease duration is required"),
      leaseExpiration: Yup.string()
        .required("Lease expiration is required")
        .matches(
          /^(0[1-9]|1[0-2])\/\d{4}$/,
          "Lease expiration must be in MM/YYYY format"
        )
        .test(
          "valid-date",
          "Lease expiration must be a valid date",
          (value) => {
            if (!value) return false;
            const [month, year] = value.split("/");
            const monthInt = parseInt(month, 10);
            const yearInt = parseInt(year, 10);
            return monthInt >= 1 && monthInt <= 12 && yearInt > 2023;
          }
        ),
      extensionGuaranteed: Yup.boolean()
        .required("Extension guaranteed is required")
        .oneOf([true, false], "Extension guaranteed must be true or false"),
      youtubeLink: Yup.string()
        .url("Must be a valid URL")
        .matches(
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
          "Must be a valid YouTube URL"
        )
        .optional(),
      latitude: Yup.string().required("Select location on the map"),
      longitude: Yup.string().required("Select location on the map"),
    }),
    onSubmit: (values) => {
      setGeneralFormData(values);
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  const propertyDetailsFormik = useFormik<PropertyFormValues>({
    initialValues: {
      propertyType: "COMMERCIAL",
      landSize: 0,
      minimumTake: 0,
      buildArea: 0,
      bedrooms: 0,
      bathrooms: 0,
      poolSize: 0,
      poolType: "PRIVATE",
      livingType: "ENCLOSED",
      available: 0,
      sold: 0,
      equipment: "FULLY_EQUIPPED",
      listPlots: false,
      priceIdrLeasehold: 0,
      plots: [
        {
          pricing: "VARIABLE",
          prices: [
            {
              leaseholdPrice: 0,
              freeholdPrice: 0,
              yearlyPrice: 0,
              monthlyPrice: 0,
              currency: "IDR",
            },
          ],
          size: 0,
          status: "ACTIVE",
        },
      ],
      prices: [
        {
          leaseholdPrice: 0,
          freeholdPrice: 0,
          yearlyPrice: 0,
          monthlyPrice: 0,
          currency: "IDR",
        },
      ],
      images: [
        {
          place: 0,
          key: "",
          year: 0,
          month: "MARCH",
          thumbnail: false,
        },
      ],
      revenues: [
        {
          roiType: "REALISTIC",
          annualRevenue: 0,
          occupancy: "",
          nightlyRate: 0,
          monthlyExpenses: 0,
          otaFees: "",
          serviceFees: "",
          roi: "",
          passiveIn30Years: 0,
          annualProfit: 0,
          yearsToBreakEven: "",
          currency: "IDR",
        },
      ],
    },
    validationSchema: Yup.object({
      propertyType: Yup.string().required("Property type is required"),
      landSize: Yup.number()
        .required("Land size is required")
        .min(0.01, "Land size must be greater than 0"),
      minimumTake: Yup.number().required("Minimum take is required"),
      buildArea: Yup.number()
        .required("Build area is required")
        .min(0.01, "Build area must be greater than 0"),
      bedrooms: Yup.number()
        .required("Number of bedrooms is required")
        .min(1, "Number of bedrooms must be greater than 0"),
      bathrooms: Yup.number()
        .required("Number of bathrooms is required")
        .min(0, "Number of bathrooms must be greater than 0"),

      poolSize: Yup.number().optional(),
      poolType: Yup.string().optional(),
      livingType: Yup.string().optional(),
      available: Yup.number().required("Available units are required"),
      sold: Yup.number().required("Sold units are required"),
      equipment: Yup.string().required("Equipment type is required"),
      listPlots: Yup.boolean().required("List plots is required"),
      priceIdrLeasehold: Yup.number().required(
        "Leasehold price (IDR) is required"
      ),
      // plots: Yup.array().of(
      //   Yup.object().shape({
      //     pricing: Yup.string().required("Pricing type is required"),
      //     prices: Yup.array().of(
      //       Yup.object().shape({
      //         leaseholdPrice: Yup.number().required(
      //           "Leasehold price is required"
      //         ),
      //         freeholdPrice: Yup.number().required(
      //           "Freehold price is required"
      //         ),
      //         yearlyPrice: Yup.number().required("Yearly price is required"),
      //         monthlyPrice: Yup.number().required("Monthly price is required"),
      //         currency: Yup.string().required("Currency is required"),
      //       })
      //     ),
      //     size: Yup.number().required("Size is required"),
      //     status: Yup.string().required("Status is required"),
      //   })
      // ),
      // prices: Yup.array().of(
      //   Yup.object().shape({
      //     leaseholdPrice: Yup.number().required("Leasehold price is required"),
      //     freeholdPrice: Yup.number().required("Freehold price is required"),
      //     yearlyPrice: Yup.number().required("Yearly price is required"),
      //     monthlyPrice: Yup.number().required("Monthly price is required"),
      //     currency: Yup.string().required("Currency is required"),
      //   })
      // ),
      // images: Yup.array().of(
      //   Yup.object().shape({
      //     place: Yup.number().required("Place is required"),
      //     key: Yup.string().required("Key is required"),
      //     year: Yup.number().required("Year is required"),
      //     month: Yup.string().required("Month is required"),
      //     thumbnail: Yup.boolean().required("Thumbnail is required"),
      //   })
      // ),
      // revenues: Yup.array().of(
      //   Yup.object().shape({
      //     roiType: Yup.string().required("ROI type is required"),
      //     annualRevenue: Yup.number().required("Annual revenue is required"),
      //     occupancy: Yup.string().required("Occupancy is required"),
      //     nightlyRate: Yup.number().required("Nightly rate is required"),
      //     monthlyExpenses: Yup.number().required(
      //       "Monthly expenses are required"
      //     ),
      //     otaFees: Yup.string().required("OTA fees are required"),
      //     serviceFees: Yup.string().required("Service fees are required"),
      //     roi: Yup.string().required("ROI is required"),
      //     passiveIn30Years: Yup.number().required(
      //       "Passive in 30 years is required"
      //     ),
      //     annualProfit: Yup.number().required("Annual profit is required"),
      //     yearsToBreakEven: Yup.string().required(
      //       "Years to break even is required"
      //     ),
      //     currency: Yup.string().required("Currency is required"),
      //   })
      // ),
    }),
    onSubmit: (values) => {
      handleFinalSubmit(values);
    },
    validateOnBlur: true,
    validateOnChange: true,
  });
  const handleFinalSubmit = (propertyData: PropertyFormValues) => {
    if (!generalFormData) {
      console.error("General form data is missing");
      return;
    }

    const finalData = {
      ...generalFormData,
      properties: [
        {
          ...propertyData,
          prices: [
            {
              leaseholdPrice: propertyData.priceIdrLeasehold,
              freeholdPrice: 0,
              yearlyPrice: 0,
              monthlyPrice: 0,
              currency: "IDR",
            },
          ],
        },
      ],
    };

    // setListingData(finalData);
    console.log("Final Submitted Data:", finalData);
  };

  return (
    <div className="lg:mt-20 sm:max-w-[454px] w-full mx-auto px-6 pt-6 pb-12 lg:pb-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu min-h-[calc(100dvh-92px)] sm:min-h-fit h-full lg:h-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5 justify-center "
      >
        <div className="flex gap-5 items-center">
          <button type="button" onClick={handleGoBack}>
            <Icon iconName="arrow-left" fill="none" stroke="black" />
          </button>
          <h2 className="heading_h4">List villa for sale</h2>
        </div>
        <Accordion
          title="General Details"
          required
          requiredFilled={formik.isValid && formik.dirty}
        >
          <GeneralDetails formik={formik} />
        </Accordion>
        <Accordion
          title="Property Details"
          required
          requiredFilled={
            propertyDetailsFormik.isValid && propertyDetailsFormik.dirty
          }
        >
          <PropertyDetails formik={propertyDetailsFormik} />
        </Accordion>
        {/* <Accordion title="Construction Status">
        <ConstructionStatus />
      </Accordion> */}
        <TheButton
          type="submit"
          variant={
            !formik.isValid || !formik.dirty || formik.isSubmitting
              ? "disabled"
              : "primary"
          }
          className="mt-1 text-grays-0 !body_m"
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
        >
          Publish Listing
        </TheButton>
      </form>
      <pre className="absolute bg-grays-0 left-0 top-0 rounded-xl max-w-[400px]  overflow-auto">
        {JSON.stringify(formik.values, null, 2)}
      </pre>
    </div>
  );
};

export default NewListingLeaseholdVillaForm;
