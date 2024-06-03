"use client";
import { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LanguageSelector from "../ui/LanguageSelector";
import SocialLinksForm from "./SocialLinksForm";
import { socialMediaAccounts } from "@/const/sicalLinks";
import useAccountTypeStore from "@/store/accountTypeStore";

const ClientAboutForm: FC = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [showSocialLinksForm, setShowSocialLinksForm] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const { accountType } = useAccountTypeStore();

  const initialSocialLinksState = socialMediaAccounts.map((el) => ({
    socialName: el.name,
    username: "",
  }));

  const [initialSocialLinks, setInitialSocialLinks] = useState([
    ...initialSocialLinksState,
  ]);
  const [socialLinks, setSocialLinks] = useState([...initialSocialLinksState]);

  const formik = useFormik({
    initialValues: {
      about: "",
      socialLinks: initialSocialLinks,
      languages: selectedLanguages,
      profilePicture: null,
    },
    validationSchema: Yup.object({
      about: Yup.string()
        .max(500, "About must be 500 characters or less")
        .optional(),
      socialLinks: Yup.array().of(
        Yup.object({
          socialName: Yup.string(),
          username: Yup.string()
            .matches(/^@?[a-zA-Z0-9_.-]*$/, "Invalid username format")
            .optional(),
        })
      ),
      languages: Yup.array().optional(),
      profilePicture: Yup.mixed().nullable().optional(),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (formik.dirty) {
        console.log(values);
        resetForm();
        setSelectedLanguages([]);
        setInitialSocialLinks([...initialSocialLinksState]);
        setSocialLinks([...initialSocialLinksState]);
        goAhead();
      } else {
        setFormError("Choose an option or skip");
        console.log("No changes made to the form. Submission cancelled.");
      }
    },
  });

  const goAhead = () => {
    router.push("/auth/sign-up/billing-details");
  };

  useEffect(() => {
    formik.setFieldValue("languages", selectedLanguages);
  }, [selectedLanguages]);
  useEffect(() => {
    formik.setFieldValue("socialLinks", socialLinks);
  }, [socialLinks]);

  const handleGoBack = () => {
    if (showSocialLinksForm) {
      setSocialLinks([...initialSocialLinks]);
      setShowSocialLinksForm(false);
    } else {
      router.back();
    }
  };

  const handleSaveAndBack = (
    selectedSocialLinks: { socialName: string; username: string }[]
  ) => {
    setInitialSocialLinks([...selectedSocialLinks]);
    setSocialLinks([...selectedSocialLinks]);
    setShowSocialLinksForm(false);
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

  const showSocialLinksForms = () => {
    setSocialLinks([...initialSocialLinks]);
    setShowSocialLinksForm(true);
  };

  useEffect(() => {
    setFormError("");
  }, [formik.values]);

  const remainingChars = 500 - formik.values.about.length;

  const accountTypeBasedText =
    accountType === "agent"
      ? "yourself"
      : accountType === "agency"
      ? "your agency"
      : accountType === "developer"
      ? "your development"
      : "ownership";

  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
      <button onClick={handleGoBack} className="mb-6">
        <Icon iconName="arrow-left" fill="none" stroke="black" />
      </button>
      {showSocialLinksForm && (
        <SocialLinksForm
          handleSaveAndBack={handleSaveAndBack}
          currentValue={socialLinks}
        />
      )}
      {!showSocialLinksForm && (
        <div>
          <h2 className="heading_h4 mb-2">
            Tell us more about {accountTypeBasedText}
          </h2>
          <p className="mb-5 body_s text-grays-700">
            Take a moment to upload your profile picture and provide additional
            details. This will be shown in your public profile page and
            listings.
          </p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-5">
              {/* profile image */}
              <div className="flex justify-center mb-2.5">
                <label htmlFor="profilePicture" className="cursor-pointer">
                  {profilePicture ? (
                    <div className="w-[70px] h-[70px] overflow-hidden">
                      {formik.values.profilePicture && (
                        <Image
                          src={URL.createObjectURL(
                            formik.values.profilePicture
                          )}
                          alt="Profile Picture"
                          width={70}
                          height={70}
                          className="rounded-full object-cover w-full h-full"
                        />
                      )}
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
              {/* about */}
              <div className="flex flex-col gap-3">
                <label htmlFor="about" className="heading_h6">
                  About
                </label>
                <div className="relative">
                  <textarea
                    id="about"
                    rows={6}
                    maxLength={500}
                    className="w-full resize-none border border-grays-50 rounded-[10px] px-[18px] py-4 placeholder:text-grays-500 body_xs"
                    {...formik.getFieldProps("about")}
                    placeholder={`Share a brief introduction about ${accountTypeBasedText}. This is your chance to highlight your expertise and what sets you apart in the Bali real estate market.`}
                  ></textarea>
                  <div
                    className={`absolute bottom-4 right-[18px] body_xs ${
                      remainingChars === 0 ? "text-func-red" : "text-func-green"
                    }`}
                  >
                    {remainingChars}
                  </div>
                </div>
              </div>

              {/* languages select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="about" className="heading_h6">
                  Languages Spoken
                </label>
                <LanguageSelector
                  selectedLanguages={selectedLanguages}
                  setSelectedLanguages={setSelectedLanguages}
                />
              </div>

              {/* social links */}
              <div className="flex justify-between items-center gap-3">
                <div className="heading_h6">Social Media Links</div>
                <button
                  type="button"
                  onClick={showSocialLinksForms}
                  className="flex items-center gap-2"
                >
                  <span className="heading_h6 text-grays-600">
                    Add social media links
                  </span>
                  <div className="rotate-[270deg] flex items-center justify-center">
                    <Icon
                      iconName="arrow"
                      fill="none"
                      stroke="#6D6D6B"
                      viewBox="0 0 16 16"
                      width="16"
                    />
                  </div>
                </button>
              </div>
            </div>

            <div className="relative w-full">
              <TheButton
                type="submit"
                className="mt-1 text-grays-0 !body_m w-full"
              >
                Continue
              </TheButton>
              {formError && (
                <div className="absolute -bottom-5 text-func-red body_xs">
                  {formError}
                </div>
              )}
            </div>
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
      )}
    </div>
  );
};

export default ClientAboutForm;
