"use client";
import { useFormik } from "formik";
import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Icon from "../ui/Icon";
import TheInput from "../ui/TheInput";
import HeaderDropdown from "../layout/HeaderDropdown";
import TheButton from "../ui/TheButton";
import { UserData } from "@/models/basic";
import { countryCodes } from "@/const/regions";
import { useSession } from "next-auth/react";

const CompleteAccountSchema = Yup.object().shape({
  whatsappNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .optional(),
  profilePicture: Yup.mixed().nullable().optional(),
});

type AdditionalInfoProps = {
  userData: UserData;
};

const AdditionalInfo: FC<AdditionalInfoProps> = ({ userData }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState(countryCodes[3].value);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { status } = useSession();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      whatsappNumber: "",
      profilePicture: null,
    },
    validationSchema: CompleteAccountSchema,
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.whatsappNumber && !values.profilePicture) {
        errors.whatsappNumber =
          "Upload a photo or enter a WhatsApp number or skip the step";
        errors.profilePicture =
          "Upload a photo or enter a WhatsApp number or skip the step";
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (!values.whatsappNumber && !values.profilePicture) {
        setSubmissionError("Profile picture or WhatsApp number is required");
      } else {
        setSubmissionError(null);
        const updatedValue = {
          ...values,
          whatsappNumber: countryCode + values.whatsappNumber,
        };
        console.log(updatedValue);
      }
    },
  });

  const handleChangeCountryCode = (value: string) => {
    setCountryCode(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePicture(reader.result as string);
          formik.setFieldValue("profilePicture", e.target.files![0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-row items-center gap-[136px] justify-center bg-gray-50 lg:py-12 sm:px-6 lg:px-8 no_mt">
      <div className="flex-1 hidden lg:flex flex-col gap-8 max-w-[454px]">
        <h1 className="heading_h3">
          Where Dreams Meet Opportunity in Bali&apos;s Real Estate
        </h1>
        <div className="flex flex-col gap-1">
          <h2 className="heading_h5">Buyers & Investors</h2>
          <p className="body_s text-grays-700">
            Discover the best investment opportunities for villas, apartments,
            commercial properties and land in Bali.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="heading_h5">Agents, Developers & Property Owners</h2>
          <p className="body_s text-grays-700">
            List for free, sell with ease! With zero commission, publish your
            listings for free and showcase your property portfolio on
            baliprofit.com with your own business page.
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 w-full h-full lg:h-auto sm:max-w-[454px] overflow-auto shadow-user-menu bg-grays-0 px-6 sm:py-6 sm:rounded-b-2xl rounded-t-2xl justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
        <h2 className="heading_h4">
          {userData.firstName},
          <br />
          Tell us more about yourself
        </h2>
        <p className="body_s text-grays-700">
          Take a moment to upload your profile picture and add your phone number
          to make your account more secure.
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 mt-2 h-full lg:h-auto"
        >
          <div className="flex justify-center mb-2.5">
            <label htmlFor="profilePicture" className="cursor-pointer">
              {profilePicture ? (
                <div className="w-[70px] h-[70px] overflow-hidden">
                  <Image
                    src={profilePicture}
                    alt="Profile Picture"
                    width={70}
                    height={70}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-[70px] h-[70px] rounded-full bg-grays-600 flex items-center justify-center relative">
                  <span className="text-grays-0 heading_h4">SS</span>
                  <div className="absolute -bottom-2 -right-0 p-1.5 bg-grays-50 border border-grays-0 rounded-full">
                    <Icon
                      iconName="gallery-edit"
                      fill="none"
                      stroke="black"
                      width="16"
                    />
                  </div>
                </div>
              )}
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="relative z-30">
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
            <div className="absolute left-11 top-1/2 -translate-y-1/2 body_xs">
              <HeaderDropdown
                onChange={handleChangeCountryCode}
                options={countryCodes}
                placeholder={countryCode}
                classNames="absolute z-10 bg-grays-0 border border-grays-50 rounded-[10px] mt-4 dropdown-menu rigth-1/2 !overflow-auto"
              />
            </div>
            {(formik.touched.whatsappNumber && formik.errors.whatsappNumber) ||
            submissionError ? (
              <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                {formik.errors.whatsappNumber || submissionError}
              </div>
            ) : null}
          </div>

          <TheButton
            variant="primary"
            type="submit"
            className="w-full heading_h4 border border-grays-1000 mt-auto lg:mt-0"
          >
            Complete Account
          </TheButton>
          <TheButton
            type="button"
            variant="secondary"
            className="w-full heading_h4"
            onClick={() => router.push("/")}
          >
            Skip
          </TheButton>
        </form>
      </div>
    </div>
  );
};

export default AdditionalInfo;
