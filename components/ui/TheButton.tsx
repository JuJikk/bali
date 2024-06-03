import React, { ButtonHTMLAttributes } from "react";

type TheButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "info"
    | "disabled"
    | "selected"
    | "notSelected"
    | "notSelectedSmall"
    | "selectedSmall";
};

const TheButton: React.FC<TheButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...restProps
}) => {
  const variantOptions = {
    primary:
      "btn_font text-grays-0 bg-grays-1000 border border-grays-1000 hover:bg-grays-700 px-6 py-4",
    secondary:
      "btn_font text-grays-1000 bg-grays-0 border border-grays-1000 hover:text-grays-700 hover:border-grays-700 px-6 py-4",
    tertiary: "btn_font text-grays-1000 bg-grays-0 hover:text-grays-700 px-6 py-4",
    info: "body_s bg-grays-25 border border-grays-25 hover:text-grays-700 px-6 py-4",
    disabled: "body_s bg-grays-100 border border-grays-100 text-grays-500 px-6 py-4",
    selected:
      "rounded-[10px] heading_h5 justify-start px-4.5 text-grays-900 border border-grays-600 bg-grays-0 px-6 py-4",
    notSelected:
      "rounded-[10px] heading_h5 justify-start px-4.5 text-grays-900 border border-grays-50 bg-grays-0 px-6 py-4",
    notSelectedSmall:
      "bg-none text-grays-700 border border-grays-200 body_xs !text-[13px] !leading-[19.5px] rounded-[100px] w-fit px-3 py-1 flex gap-0.5 items-center ",
    selectedSmall:
      "bg-grays-25 text-grays-900 border border-grays-25 body_xs !text-[13px] !leading-[19.5px] rounded-[100px] w-fit px-3 py-1 flex gap-0.5 items-center ",
  };

  const combinedClassName = `flex items-center justify-center gap-2.5  rounded-2xl transition-all duration-[0.3s] button_hover ${
    variantOptions[variant]
  } ${className || ""}`;

  return (
    <button {...restProps} className={combinedClassName}>
      {children}
    </button>
  );
};

export default TheButton;
