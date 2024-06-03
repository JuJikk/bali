import { FC, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import AddressSelector from "./AddressSelector";
import ImageUploader from "./ImageManagement/ImageUploader";
import TheButton from "@/components/ui/TheButton";
import TheInput from "@/components/ui/TheInput";
import Icon from "@/components/ui/Icon";
import { FormValues } from "@/models/formikModels";
import "mapbox-gl/dist/mapbox-gl.css";

type GeneralDetailsProps = {
  formik: FormikProps<FormValues>;
};

const GeneralDetails: FC<GeneralDetailsProps> = ({ formik }) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [leaseholdState, setLeaseholdState] = useState<
    "duration" | "expiration"
  >("duration");

  const remainingTitleChars = 30 - formik.values.title.length;
  const remainingDescriptionChars = 2000 - formik.values.description.length;

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [formik.values.description]);

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* TITLE */}
      <div className="relative">
        <TheInput
          id="title"
          name="title"
          type="text"
          maxLength={30}
          placeholder="Listing Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
          className="w-full body_xs placeholder-grays-500"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.title}
          </div>
        ) : null}
        {isTitleFocused && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 right-[18px] body_xs ${
              remainingTitleChars < 5 ? "text-func-red" : "text-func-green"
            }`}
          >
            {remainingTitleChars}
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="relative h-auto">
        <textarea
          id="description"
          rows={5}
          ref={descriptionRef}
          maxLength={2000}
          onChange={formik.handleChange}
          onFocus={() => setIsDescriptionFocused(true)}
          onBlur={() => setIsDescriptionFocused(false)}
          className="w-full overflow-hidden resize-none border border-grays-50 rounded-[10px] px-[18px] pt-4 pb-8 placeholder:text-grays-500 body_xs h-full focus-visible:outline-grays-300"
          placeholder={`Provide a detailed description of your villa. Mention all the amenities and any unique features that make your property stand out.`}
        ></textarea>
        {formik.touched.description && formik.errors.description ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.description}
          </div>
        ) : null}
        {isDescriptionFocused && (
          <div
            className={`absolute bottom-4 right-[18px] body_xs ${
              remainingDescriptionChars < 10
                ? "text-func-red"
                : "text-func-green"
            }`}
          >
            {remainingDescriptionChars}
          </div>
        )}
      </div>

      {/* ADDRESS */}
      <AddressSelector formik={formik} />

      {/* IMAGES */}
      <ImageUploader formik={formik} />

      {/* MONTHS AND YEARS */}
      <div>
        <div className="flex">
          <button
            type="button"
            onClick={() => setLeaseholdState("duration")}
            className={` px-2.5 py-2 rounded-tl-2xl  font-hk_medium text-[13px] leading-[19.5px] ${
              leaseholdState === "duration"
                ? "bg-grays-700 text-grays-0"
                : "bg-grays-25 text-grays-700"
            }`}
          >
            Lease Duration
          </button>
          <button
            type="button"
            onClick={() => setLeaseholdState("expiration")}
            className={` px-2.5 py-2 rounded-tr-2xl  font-hk_medium text-[13px] leading-[19.5px] ${
              leaseholdState === "expiration"
                ? "bg-grays-700 text-grays-0"
                : "bg-grays-25 text-grays-700"
            }`}
          >
            Expiration Year & Month
          </button>
        </div>
        <div className="relative">
          {leaseholdState === "duration" && (
            <TheInput
              id="leaseDuration"
              name="leaseDuration"
              type="number"
              placeholder="0-50 Years"
              onChange={formik.handleChange}
              value={formik.values.leaseDuration || ""}
              className="w-full body_xs placeholder-grays-500 rounded-tl-none"
            />
          )}
          {leaseholdState === "expiration" && (
            <TheInput
              id="leaseExpiration"
              name="leaseExpiration"
              type="text"
              placeholder="MM/YYYY"
              onChange={formik.handleChange}
              value={formik.values.leaseExpiration}
              className="w-full body_xs placeholder-grays-500 rounded-tl-none"
            />
          )}
          {formik.touched.leaseDuration && formik.errors.leaseDuration ? (
            <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
              {formik.errors.leaseDuration}
            </div>
          ) : null}
          {formik.touched.leaseExpiration && formik.errors.leaseExpiration ? (
            <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 right-2">
              {formik.errors.leaseExpiration}
            </div>
          ) : null}
        </div>
      </div>
      {/* GUARANTEED */}
      <div className="flex justify-between items-center">
        <p className="heading_h6">Is extension guaranteed?</p>
        <div className="flex gap-3 items-center">
          <TheButton
            type="button"
            variant={
              formik.values.extensionGuaranteed
                ? "selectedSmall"
                : "notSelectedSmall"
            }
            className="px-3 py-2"
            onClick={() => formik.setFieldValue("extensionGuaranteed", true)}
          >
            Yes
          </TheButton>
          <TheButton
            type="button"
            variant={
              !formik.values.extensionGuaranteed
                ? "selectedSmall"
                : "notSelectedSmall"
            }
            className="px-3 py-2"
            onClick={() => formik.setFieldValue("extensionGuaranteed", false)}
          >
            No
          </TheButton>
        </div>
        {formik.touched.extensionGuaranteed &&
        formik.errors.extensionGuaranteed ? (
          <div className="text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.extensionGuaranteed}
          </div>
        ) : null}
      </div>

      {/* YOUTUBE LINK */}
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-[18px]">
          <Icon iconName="youtube" fill="none" width="16" />
        </div>
        <TheInput
          id="youtubeLink"
          name="youtubeLink"
          type="text"
          placeholder="YouTube Video Link (Optional)"
          onChange={formik.handleChange}
          value={formik.values.youtubeLink}
          className="w-full body_xs placeholder-grays-500 pl-11"
        />
        {formik.touched.youtubeLink && formik.errors.youtubeLink ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.youtubeLink}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GeneralDetails;
