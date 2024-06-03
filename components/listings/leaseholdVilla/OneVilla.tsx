import TheButton from "@/components/ui/TheButton";
import TheInput from "@/components/ui/TheInput";
import React, { FC, useEffect, useRef, useState } from "react";
import EquipmentSelect from "./EquipmentSelect";
import Counter from "./Counter";
import { FormikProps } from "formik";
import { PropertyFormValues } from "@/models/formikModels";
import Icon from "@/components/ui/Icon";
import CurrencyExchange from "./CurrencyExchange";
import ImageSelectorModal from "./ImageSelectorModal";
import Portal from "@/components/ui/Portal";
import Image from "next/image";
import AssignedImages from "./AssignedImages";

type PropertyDetailsProps = {
  formik: FormikProps<PropertyFormValues>;
  isSingleVilla: boolean;
  handleRemove?: () => void;
  villaName?: string;
};

const OneVilla: FC<PropertyDetailsProps> = ({
  formik,
  isSingleVilla,
  villaName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatNumber = (value: number | string) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleBlur = () => {
    const formattedValue = formatNumber(formik.values.priceIdrLeasehold || "");
    formik.setFieldValue("priceIdrLeasehold", formattedValue.replace(/ /g, ""));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/ /g, "");
    if (/^\d*$/.test(value)) {
      formik.setFieldValue("priceIdrLeasehold", value);
    }
  };

  const handleIncrement = (
    field: keyof PropertyFormValues,
    increment: number = 1
  ) => {
    formik.setFieldValue(field, +formik.values[field] + increment);
  };

  const handleDecrement = (
    field: keyof PropertyFormValues,
    increment: number = 1
  ) => {
    formik.setFieldValue(field, Math.max(0, +formik.values[field] - increment));
  };

  const handleSaveImages = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* LAND SIZE */}
      <div className="relative">
        <TheInput
          id="landSize"
          name="landSize"
          type="number"
          placeholder="Land size (are)"
          onChange={formik.handleChange}
          value={formik.values.landSize || ""}
          className="w-full body_xs placeholder-grays-500"
          suffix="are"
        />
        {formik.touched.landSize && formik.errors.landSize ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.landSize}
          </div>
        ) : null}
      </div>

      {/* BUILD AREA */}
      <div className="relative">
        <TheInput
          id="buildArea"
          name="buildArea"
          type="number"
          placeholder="Build Area (m²)"
          onChange={formik.handleChange}
          value={formik.values.buildArea || ""}
          className="w-full body_xs placeholder-grays-500"
          suffix="m²"
        />
        {formik.touched.buildArea && formik.errors.buildArea ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.buildArea}
          </div>
        ) : null}
      </div>

      {/* PRICE IDR */}
      <div className="relative">
        <TheInput
          id="priceIdrLeasehold"
          name="priceIdrLeasehold"
          type="text"
          placeholder="Price (IDR)"
          onChange={handleChange}
          onBlur={handleBlur}
          value={formatNumber(formik.values.priceIdrLeasehold)}
          className="w-full body_xs placeholder-grays-500"
          suffix="IDR"
          maxLength={20}
        />
        {formik.touched.priceIdrLeasehold && formik.errors.priceIdrLeasehold ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.priceIdrLeasehold}
          </div>
        ) : null}
        {formik.values.priceIdrLeasehold &&
        formik.values.priceIdrLeasehold > 10000000 ? (
          <div className="absolute text-grays-700 body_xs top-1/2 -translate-y-1/2 right-[18px] w-fit">
            {(formik.values.priceIdrLeasehold / 1000000000).toFixed(2) +
              " Billion IDR"}
          </div>
        ) : (
          ""
        )}
      </div>
      {formik.values.priceIdrLeasehold ? (
        <CurrencyExchange price={formik.values.priceIdrLeasehold} />
      ) : (
        ""
      )}

      {/* ASSIGNED IMAGES */}
      {!isSingleVilla && (
        <AssignedImages
          closeModal={() => setIsModalOpen(true)}
          formik={formik}
        />
      )}

      {isModalOpen && (
        <Portal>
          <ImageSelectorModal
            villaName={villaName ? villaName : ""}
            formik={formik}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveImages}
          />
        </Portal>
      )}

      {/* BEDROOMS */}
      <div className="flex justify-between items-center">
        <p className="heading_h6">Bedrooms</p>
        <Counter
          value={formik.values.bedrooms}
          onIncrement={() => handleIncrement("bedrooms")}
          onDecrement={() => handleDecrement("bedrooms")}
        />
      </div>
      {/* BATHROOMS */}
      <div className="flex justify-between items-center">
        <p className="heading_h6">Bathrooms</p>
        <Counter
          value={formik.values.bathrooms}
          onIncrement={() => handleIncrement("bathrooms", 0.5)}
          onDecrement={() => handleDecrement("bathrooms", 0.5)}
        />
      </div>

      {/* EQUIPMENT */}
      <div className="flex flex-col gap-3">
        <p className="heading_h6">Equipment</p>
        <EquipmentSelect
          value={formik.values.equipment}
          onChange={(value) => formik.setFieldValue("equipment", value)}
        />
      </div>

      {/* POOL SIZE AND TYPE  */}
      <div className="relative">
        <TheInput
          id="poolSize"
          name="poolSize"
          type="number"
          placeholder="Pool size in m² (optional)"
          onChange={formik.handleChange}
          value={formik.values.poolSize || ""}
          className="w-full pr-32 body_xs placeholder-grays-500"
          suffix="m²"
        />
        {formik.touched.poolSize && formik.errors.poolSize ? (
          <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.poolSize}
          </div>
        ) : null}
        <div className="absolute top-1/2 -translate-y-1/2 right-[18px] flex gap-3 items-center">
          <button
            type="button"
            className={`body_xs ${
              formik.values.poolType === "PRIVATE"
                ? "text-grays-1000"
                : "text-grays-500"
            }`}
            onClick={() => formik.setFieldValue("poolType", "PRIVATE")}
          >
            Private
          </button>
          <button
            type="button"
            className={`body_xs ${
              formik.values.poolType === "SHARED"
                ? "text-grays-1000"
                : "text-grays-500"
            }`}
            onClick={() => formik.setFieldValue("poolType", "SHARED")}
          >
            Shared
          </button>
        </div>
      </div>

      {/* LIVING TYPE */}
      <div className="flex justify-between items-center">
        <p className="heading_h6">
          Living Type <span className="text-grays-300 body_xs">(optional)</span>
        </p>
        <div className="flex gap-3 items-center">
          <TheButton
            type="button"
            variant={
              formik.values.livingType === "ENCLOSED"
                ? "selectedSmall"
                : "notSelectedSmall"
            }
            className="px-3 py-2"
            onClick={() => formik.setFieldValue("livingType", "ENCLOSED")}
          >
            Enclosed
          </TheButton>
          <TheButton
            type="button"
            variant={
              formik.values.livingType === "OPEN"
                ? "selectedSmall"
                : "notSelectedSmall"
            }
            className="px-3 py-2"
            onClick={() => formik.setFieldValue("livingType", "OPEN")}
          >
            Open
          </TheButton>
        </div>
        {formik.touched.livingType && formik.errors.livingType ? (
          <div className="text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
            {formik.errors.livingType}
          </div>
        ) : null}
      </div>
      {/* <pre className="absolute bg-grays-0 left-0 top-0 rounded-xl max-w-[400px]  overflow-auto">
        {JSON.stringify(formik.values, null, 2)}
      </pre> */}
    </>
  );
};

export default OneVilla;
