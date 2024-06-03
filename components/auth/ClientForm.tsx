"use client";
import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TheInput from "../ui/TheInput";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import { useRouter } from "next/navigation";
import useAccountTypeStore from "@/store/accountTypeStore";
import { UserData } from "@/models/basic";
import HeaderDropdown from "../layout/HeaderDropdown";
import { countryCodes } from "@/const/regions";

type ClientFormProps = {
  userData: UserData;
};

const ClientForm: FC<ClientFormProps> = ({ userData }) => {
  const router = useRouter();
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [countryCode, setCountryCode] = useState(countryCodes[3].value);
  const { accountType } = useAccountTypeStore();

  const initialValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    whatsappNumber: userData?.phone || "",
    username: "",
    brandName: "",
  };

  const validationSchema = (accountType: string) => {
    return Yup.object().shape({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      whatsappNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .optional(),
      ...(accountType === "agent" && {
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
      }),
      ...(accountType === "agency" || accountType === "developer"
        ? {
            brandName: Yup.string().required("Brand Name is required"),
          }
        : {}),
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(accountType!),
    onSubmit: async (values, { resetForm }) => {
      router.push("/auth/sign-up/client-about");
      resetForm();
    },
  });

  const handleChangeEmail = () => {
    setIsChangeEmail(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleChangeCountryCode = (value: string) => {
    setCountryCode(value);
  };

  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
      <button onClick={handleGoBack} className="mb-6">
        <Icon iconName="arrow-left" fill="none" stroke="black" />
      </button>
      <h2 className="heading_h4 mb-2">
        {(accountType &&
          accountType?.slice(0, 1).toUpperCase() + accountType?.slice(1)) ||
          "Agent"}{" "}
        Account Details
      </h2>
      <p className="mb-5 body_s text-grays-700">
        Please provide your email & WhatsApp number for clients to contact you,
        and choose a username to identify your profile on BaliProfit.
      </p>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {accountType === "agent" && (
          <div className="flex gap-4">
            {/* first name */}
            <div className="flex-1 relative  px-[18px] py-[16.5px] border border-grays-50 rounded-[10px] h-[54px]">
              <div className="absolute left-[18px] top-1.5 body_xs !text-[0.625rem] text-grays-700">
                First Name
              </div>
              <div className="body_xs absolute mt-2 left-0 !pl-[18px] !py-0">
                {userData.firstName}
              </div>
              {/* <TheInput
              id="firstName"
              type="text"
              className="w-full !placeholder-grays-500 body_xs mt-2 absolute left-0 !py-0 border-none focus:outline-none"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
            /> */}
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>

            {/* last name */}
            <div className="flex-1 relative  px-[18px] py-[16.5px] border border-grays-50 rounded-[10px] h-[54px]">
              <div className="absolute left-[18px] top-1.5 body_xs !text-[0.625rem] text-grays-700">
                Last Name (optional)
              </div>
              <div className="body_xs absolute mt-2 left-0 !pl-[18px] !py-0">
                {userData.lastName}
              </div>
              {/* <TheInput
              id="lastName"
              type="text"
              className="w-full !placeholder-grays-500 body_xs mt-2 absolute left-0 !py-0 border-none focus:outline-none"
              placeholder="Last Name (optional)"
              {...formik.getFieldProps("lastName")}
            /> */}
            </div>
          </div>
        )}

        {/* Email */}
        <div className="">
          <div
            className={`flex-1 relative  px-[18px] py-[16.5px] border border-grays-50 rounded-[10px] max-h-[54px] h-full min-h-[54px] mb-2 ${
              isChangeEmail ? "" : "bg-grays-50"
            }`}
          >
            <div className="absolute left-11 top-1.5 body_xs !text-[0.625rem] text-grays-700">
              Account Email
            </div>
            {!isChangeEmail ? (
              <div className="body_xs absolute mt-2 left-0 !pl-11 !py-0">
                {userData.email}
              </div>
            ) : (
              <TheInput
                id="email"
                type="email"
                className="w-full !placeholder-grays-500 body_xs mt-2 absolute left-0 !pl-11 !py-0 border-none focus:outline-none"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
            )}
            <div className="absolute top-1/2 -translate-y-1/2 left-[1.125rem]">
              <Icon iconName="mail" fill="none" stroke="black" width="16" />
            </div>
            {!isChangeEmail && (
              <button
                onClick={handleChangeEmail}
                className="absolute top-1/2 -translate-y-1/2 right-[1.125rem] underline body_xs"
              >
                Change
              </button>
            )}
            {formik.touched.email && formik.errors.email ? (
              <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <p className="body_xs text-grays-700">
            It will be used as contact email in your listings.
          </p>
        </div>

        {/* brand name */}
        {(accountType === "agency" || accountType === "developer") && (
          <div>
            <div className="relative mb-2">
              <TheInput
                id="brandName"
                type="text"
                className="w-full !placeholder-grays-500 placeholder:body_xs"
                placeholder="Brand name"
                {...formik.getFieldProps("brandName")}
              />
              {formik.touched.brandName && formik.errors.brandName ? (
                <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                  {formik.errors.brandName}
                </div>
              ) : null}
            </div>
            <p className="body_xs text-grays-700">
              Please provide a name which matches with your company&apos;s
              website or company name.
            </p>
          </div>
        )}

        {/* phone number */}
        <div>
          <div className="relative mb-2">
            <TheInput
              type="text"
              id="whatsappNumber"
              placeholder="WhatsApp Number (optional)"
              className={`w-full pl-[103px] !placeholder-grays-500 placeholder:body_xs body_xs ${
                formik.touched.whatsappNumber && formik.errors.whatsappNumber
                  ? "border-red-500"
                  : ""
              }`}
              {...formik.getFieldProps("whatsappNumber")}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-[1.125rem]">
              <Icon
                iconName="whatsapp"
                fill="none"
                stroke="none"
                width="18"
                height="16"
              />
            </div>
            <div className="absolute left-11 top-1/2 -translate-y-1/2 body_xs z-10">
              <HeaderDropdown
                onChange={handleChangeCountryCode}
                options={countryCodes}
                placeholder={countryCode}
                classNames="absolute z-40 bg-grays-0 border border-grays-50 rounded-[10px] mt-4 dropdown-menu rigth-1/2 !overflow-auto"
              />
            </div>
            {formik.touched.whatsappNumber && formik.errors.whatsappNumber ? (
              <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                {formik.errors.whatsappNumber}
              </div>
            ) : null}
          </div>

          <p className="body_xs text-grays-700">
            This whatsapp number will be shown in your listings as contact
            number.{" "}
          </p>
        </div>

        {/* username */}
        <div>
          <div className="relative mb-2">
            <div className="absolute top-1/2 -translate-y-1/2 left-[1.125rem]">
              <Icon iconName="profile" fill="none" stroke="black" width="16" />
            </div>
            <TheInput
              id="username"
              type="text"
              className="w-full !placeholder-grays-500 placeholder:body_xs pl-11"
              placeholder="Username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <p className="body_xs text-grays-700">
            This will be your unique profile link tag at{" "}
            <span className="text-grays-1000">baliprofit.com/</span>
            <span className="text-grays-1000">
              {formik.values.username || "@username"}
            </span>
          </p>
        </div>

        <TheButton type="submit" className="mt-1 text-grays-0 body_m">
          Continue
        </TheButton>
      </form>
    </div>
  );
};

export default ClientForm;
