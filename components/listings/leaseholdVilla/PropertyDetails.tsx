import { PropertyFormValues } from "@/models/formikModels";
import { Formik, FormikProps } from "formik";
import React, { FC, useCallback, useEffect, useState } from "react";
import OneVilla from "./OneVilla";
import Accordion from "@/components/ui/Accordion";
import HeaderDropdown from "@/components/layout/HeaderDropdown";
import * as Yup from "yup";

type PropertyDetailsProps = {
  formik: FormikProps<PropertyFormValues>;
};

const villasOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

const initialPropertyFormValues: PropertyFormValues = {
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
  images: [],
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
};

const PropertyDetails: FC<PropertyDetailsProps> = ({ formik }) => {
  const [villaType, setVillaType] = useState<"ONE" | "COMPLEX">("ONE");
  const [villaTypeArray, setVillaTypeArray] = useState([
    initialPropertyFormValues,
  ]);
  const [formikInstances, setFormikInstances] = useState<
    FormikProps<PropertyFormValues>[]
  >([]);
  const [formikValues, setFormikValues] = useState<PropertyFormValues[]>([]);

  const handleAddVillaType = () => {
    setVillaTypeArray((prev) => [...prev, initialPropertyFormValues]);
  };

  const handleRemoveVillaType = (index: number) => {
    const newVillaTypeArray = villaTypeArray.filter((_, i) => i !== index);
    setVillaTypeArray(newVillaTypeArray);
    setFormikInstances((prev) => prev.filter((_, i) => i !== index));
  };

  const handleValidation = (isValid: boolean, index: number) => {
    const newValidationState = [...formikInstances];
    setFormikInstances(newValidationState);
  };

  const handleComplexSubmit = () => {
    const combinedValues = villaTypeArray.map((values, index) => {
      return formikInstances[index]?.values || values;
    });
  };

  const updateFormikValues = useCallback(
    (values: PropertyFormValues, index: number) => {
      setFormikValues((prev) => {
        const newValues = [...prev];
        newValues[index] = values;
        return newValues;
      });
    },
    []
  );

  const formikSchema = Yup.object({
    propertyType: Yup.string().required("Property type is required"),
    landSize: Yup.number()
      .required("Land size is required")
      .min(0.01, "Land size must be greater than 0"),
    buildArea: Yup.number()
      .required("Build area is required")
      .min(0.01, "Build area must be greater than 0"),
    bedrooms: Yup.number()
      .required("Number of bedrooms is required")
      .min(1, "Number of bedrooms must be greater than 0"),
    bathrooms: Yup.number()
      .required("Number of bathrooms is required")
      .min(0, "Number of bathrooms must be greater than 0"),
  });

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* TABS */}
      <div className="flex items-center gap-9">
        <button
          type="button"
          onClick={() => setVillaType("ONE")}
          className={`body_xs pb-2 ${
            villaType === "ONE" ? "text-grays-1000 border-b" : "text-grays-500"
          }`}
        >
          One Villa
        </button>
        <button
          type="button"
          onClick={() => setVillaType("COMPLEX")}
          className={`body_xs pb-2 ${
            villaType === "COMPLEX"
              ? "text-grays-1000 border-b"
              : "text-grays-500"
          }`}
        >
          Villas complex
        </button>
      </div>
      {villaType === "ONE" && <OneVilla formik={formik} isSingleVilla={true} />}

      {villaType === "COMPLEX" && (
        <>
          {villaTypeArray.map((initialValues, index) => (
            <Formik
              key={index}
              initialValues={initialValues}
              validationSchema={formikSchema}
              onSubmit={(values) => {
                updateFormikValues(values, index);
              }}
            >
              {(formikProps) => {
                return (
                  <Accordion key={index} title={`Villa ${index + 1}`} light>
                    <div className="flex flex-col gap-4 pb-4">
                      <HeaderDropdown
                        onChange={() => {}}
                        options={villasOptions}
                        unitAfter="Villas Available"
                        placeholder="Villas Available"
                        placeholderStyles="body_xs text-grays-500"
                        classNamesSelect="w-full !border-[1px] !border-grays-50 !rounded-[10px] px-[1.125rem] py-4 !text-grays-1000 body_xs"
                        classNames="absolute z-10 bg-grays-0 border border-grays-50 py-2 rounded-[10px] shadow-user-menu w-full mt-4 dropdown-menu rigth-1/2 !overflow-auto"
                      />
                      <HeaderDropdown
                        onChange={() => {}}
                        options={villasOptions}
                        unitAfter="Villas Sold"
                        placeholder="Villas Sold"
                        placeholderStyles="body_xs text-grays-500"
                        classNamesSelect="w-full !border-[1px] !border-grays-50 !rounded-[10px] px-[1.125rem] py-4 !text-grays-1000 body_xs"
                        classNames="absolute z-10 bg-grays-0 border border-grays-50 py-2 rounded-[10px] shadow-user-menu w-full mt-4 dropdown-menu rigth-1/2 !overflow-auto"
                      />
                      <OneVilla
                        villaName={`Villa ${index + 1}`}
                        formik={formikProps}
                        isSingleVilla={false}
                        handleRemove={() => handleRemoveVillaType(index)}
                      />
                    </div>
                  </Accordion>
                );
              }}
            </Formik>
          ))}
          <div className="flex justify-center">
            <button
              type="button"
              className="body_s underline"
              onClick={handleAddVillaType}
            >
              + Add villa type {villaTypeArray.length + 1}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyDetails;
