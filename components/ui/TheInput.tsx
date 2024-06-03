import React, { FC, useRef, useEffect, useState } from "react";

interface TheInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}

const TheInput: FC<TheInputProps> = ({
  className,
  suffix,
  value,
  id,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [textWidth, setTextWidth] = useState<number>(0);

  const calculateTextWidth = (value: string) => {
    const tempSpan = document.createElement("span");
    tempSpan.style.fontSize = "14px";
    tempSpan.style.lineHeight = "21px";
    tempSpan.style.fontFamily = "HKGrotesk-Regular, sans-serif";
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.innerText = value;
    document.body.appendChild(tempSpan);
    const width = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    return width;
  };

  useEffect(() => {
    if (inputRef.current) {
      setTextWidth(calculateTextWidth(inputRef.current.value));
    }
  }, [value]);

  const combinedClassName = `px-[18px] py-[16.5px] border border-grays-50 rounded-[10px] focus-visible:outline-grays-300 ${
    className || ""
  }`;

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className={combinedClassName}
        value={value}
        id={id}
        {...rest}
      />
      {suffix && value && value.toString().length > 0 ? (
        <label
          htmlFor={id}
          className="absolute text-grays-700 body_xs top-1/2 -translate-y-1/2"
          style={{ left: `${textWidth + 22}px` }}
        >
          {suffix}
        </label>
      ) : null}
    </div>
  );
};

export default TheInput;
