"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import diamndsImage from "@/public/images/diamonds.png";
import Icon from "@/components/ui/Icon";
// import Hr from "./Hr";

type ContactProps = {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
};

const Contact = ({ isVisible }: ContactProps) => {
  return (
    <div
      id="contact"
      className={`transition ease-in-out fixed bottom-0 sm:hidden z-2 w-full bg-grays-0 ${
        !isVisible ? "hidden" : ""
      }`}
    >
      {/* <Hr /> */}
      <div className="flex justify-between p-4">
        <div className="flex gap-x-3 items-center">
          <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-dark_blue flex items-center justify-center overflow-hidden">
            <Image
              src={diamndsImage}
              alt="diamonds"
              width={32}
              height={19}
              className="object-contain -translate-y-[1px] scale-95"
            />
          </div>
          <div className="text-body_s leading-body font-normal">
            Bali Home Immo
          </div>
        </div>
        <div className="flex gap-x-3">
          <div className="flex items-center gap-x-6 box-border border border-grays-1000 rounded-2xl">
            <div className="flex items-center p-4">
              <Icon
                iconName="WhatsApp"
                fill="none"
                stroke="#000000"
                viewBox="0 0 25 24"
                width="25"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-6 gap-y-3  box-border border border-grays-1000 rounded-2xl">
            <div className="flex items-center p-4">
              <Icon
                iconName="mail"
                fill="none"
                stroke="#000000"
                viewBox="0 0 25 24"
                width="25"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
