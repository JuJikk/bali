"use client";
import { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import { useRouter } from "next/navigation";
import TheInput from "../ui/TheInput";
import HeaderDropdown from "../layout/HeaderDropdown";
import useAccountTypeStore from "@/store/accountTypeStore";

export type CountryData = {
  iso2: string;
  iso3: string;
  country: string;
  cities: string[];
};

type BillingDetailsFormProps = {
  countries?: CountryData[];
};

const BillingDetailsForm: FC<BillingDetailsFormProps> = ({ countries }) => {
  const router = useRouter();
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const { accountType } = useAccountTypeStore();

  const formik = useFormik({
    initialValues: {
      street: "",
      city: "",
      country: "",
      zipCode: "",
      companyName: "",
      companyCode: "",
    },
    validationSchema: Yup.object({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      zipCode: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("ZIP Code is required"),
      ...((accountType === "agency" || accountType === "developer") && {
        companyName: Yup.string().required("Company Name is required"),
        companyCode: Yup.string().required("Company Code is required"),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
      goAhead();
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  const goAhead = () => {
    router.push("/onboarding-presentation");
  };

  useEffect(() => {
    const fetchCities = async (country: string) => {
      setLoadingCities(true);
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ country }),
          }
        );
        const data = await response.json();
        setCities(data.data || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
      setLoadingCities(false);
    };
    if (formik.values.country) {
      fetchCities(formik.values.country);
    }
  }, [formik.values.country]);

  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
      <button onClick={handleGoBack} className="mb-6">
        <Icon iconName="arrow-left" fill="none" stroke="black" />
      </button>

      <div>
        <h2 className="heading_h4 mb-2">Add Your Billing Details</h2>
        <p className="mb-5 body_s text-grays-700">
          Optionally, you can add your billing information now.
        </p>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-5 mb-6">
            {/* company name */}
            {(accountType === "agency" || accountType === "developer") && (
              <div className="flex flex-col gap-2">
                <label htmlFor="street" className="heading_h6 text-grays-1000">
                  Company Name
                </label>
                <p className="body_xs text-grays-700">
                  The legal name of your agency as recognized in official
                  documents and registrations.
                </p>
                <div className="relative w-full">
                  <TheInput
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Company Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.companyName}
                    className="!placeholder:text-grays-500 body_xs w-full"
                  />
                  {formik.touched.companyName && formik.errors.companyName ? (
                    <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                      {formik.errors.companyName}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            {/* company code */}
            {(accountType === "agency" || accountType === "developer") && (
              <div className="flex flex-col gap-2">
                <label htmlFor="street" className="heading_h6 text-grays-1000">
                  Company Code
                </label>
                <p className="body_xs text-grays-700">
                  Your agency&apos;s registration or identification code,
                  essential for legal and transactional documentation.
                </p>
                <div className="relative w-full">
                  <TheInput
                    id="companyCode"
                    name="companyCode"
                    type="text"
                    placeholder="Company Code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.companyCode}
                    className="!placeholder:text-grays-500 body_xs w-full"
                  />
                  {formik.touched.companyCode && formik.errors.companyCode ? (
                    <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                      {formik.errors.companyCode}
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="street" className="heading_h6 text-grays-1000">
                {(accountType === "agency" || accountType === "developer") &&
                  "Company "}
                Address
              </label>
              <p className="body_xs text-grays-700">
                {(accountType === "agency" || accountType === "developer") &&
                  "The official address of your company for billing and invoicing purposes."}
                {accountType === "agent" &&
                  "The address linked to your payment method for invoicing."}
              </p>
              <div className="relative w-full">
                <TheInput
                  id="street"
                  name="street"
                  type="text"
                  placeholder="Street"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                  className="!placeholder:text-grays-500 body_xs w-full"
                />
                {formik.touched.street && formik.errors.street ? (
                  <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                    {formik.errors.street}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-row-reverse gap-2">
              <div className="flex-1 flex flex-col gap-2 relative">
                {(!formik.values.country || loadingCities) && (
                  <div
                    className={`flex items-center gap-2 justify-between rounded-[10px] text-start text-grays-900 w-full !border-[1px] !border-grays-50  px-[1.125rem] py-4 bg-grays-50 ${
                      loadingCities ? "skeleton-move" : ""
                    }`}
                  >
                    <span className="body_xs text-grays-500">City</span>
                    <div>
                      <Icon
                        iconName="arrow"
                        fill="none"
                        stroke="#3C3E3D"
                        viewBox="0 0 16 16"
                        width="16"
                      />
                    </div>
                  </div>
                )}
                {formik.values.country && !loadingCities && (
                  <HeaderDropdown
                    onChange={(value) => formik.setFieldValue("city", value)}
                    options={
                      cities?.map((el) => ({
                        value: el,
                        label: el,
                      })) || []
                    }
                    placeholder="City"
                    placeholderStyles={`body_xs ${
                      formik.values.city ? "text-grays-1000" : "text-grays-500"
                    }`}
                    classNamesSelect="w-full !border-[1px] !border-grays-50 !rounded-[10px] px-[1.125rem] py-4"
                    classNames="absolute z-10 bg-grays-0 border border-grays-50 rounded-[10px] w-full mt-4 dropdown-menu rigth-1/2 !overflow-auto"
                  />
                )}
                {formik.touched.city && formik.errors.city ? (
                  <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                    {formik.errors.city}
                  </div>
                ) : null}
              </div>

              <div className="flex-1 flex flex-col gap-2 relative">
                <HeaderDropdown
                  onChange={(value) => formik.setFieldValue("country", value)}
                  options={
                    countries?.map((el) => ({
                      value: el.country,
                      label: el.country,
                    })) || []
                  }
                  placeholder="Country"
                  placeholderStyles={`body_xs ${
                    formik.values.country ? "text-grays-1000" : "text-grays-500"
                  }`}
                  classNamesSelect="w-full !border-[1px] !border-grays-50 !rounded-[10px] px-[1.125rem] py-4"
                  classNames="absolute z-10 bg-grays-0 border border-grays-50 rounded-[10px] w-full mt-4 dropdown-menu rigth-1/2 !overflow-auto"
                />
                {formik.touched.country && formik.errors.country ? (
                  <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                    {formik.errors.country}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="relative flex flex-col gap-2">
              <TheInput
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="ZIP Code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zipCode}
                className="!placeholder:text-grays-500 body_xs"
              />
              {formik.touched.zipCode && formik.errors.zipCode ? (
                <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                  {formik.errors.zipCode}
                </div>
              ) : null}
            </div>
          </div>

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
            Continue
          </TheButton>
          <TheButton
            onClick={goAhead}
            variant="tertiary"
            type="button"
            className="-mt-3 text-grays-0 !body_m"
          >
            Skip for now
          </TheButton>
        </form>
      </div>
    </div>
  );
};

export default BillingDetailsForm;
