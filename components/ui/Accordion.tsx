import React, { useState } from "react";
import TheButton from "./TheButton";
import Icon from "./Icon";
import { Span } from "next/dist/trace";

type AccordionProps = {
  title: string;
  required?: boolean;
  requiredFilled?: boolean;
  light?: boolean;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  required,
  light,
  requiredFilled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col gap-3">
      <TheButton
        type="button"
        variant="info"
        onClick={toggleAccordion}
        className={`justify-between rounded-[10px] bg-grays-50 !px-4.5 !py-[16.5px] ${
          light ? "bg-opacity-50" : ""
        }`}
      >
        <div>
          <span className="heading_h6">{title}</span>
          {required && <span className="text-func-red">*</span>}
        </div>
        <div className="flex items-center gap-2.5">
          {requiredFilled && (
            <div className="flex justify-center items-center w-6 h-6 bg-func-green rounded-full">
              <Icon iconName="check-white" viewBox="0 0 8 6" width="12" />
            </div>
          )}
          <div
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <Icon iconName="arrow" viewBox="0 0 16 16" width="16" />
          </div>
        </div>
      </TheButton>
      <div
        className={`transition-all duration-300 ${isOpen ? "mt-0" : "-mt-3"}`}
      >
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[10000px]" : "max-h-0"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
