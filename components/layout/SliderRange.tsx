import React, { FC, useEffect, useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

type SliderRange = {
  valueRange: number[];
  setValueRange: React.Dispatch<React.SetStateAction<number[]>>;
  param: string;
  paramBeforePosition?: boolean;
  defaultValue?: number[];
  min: number;
  max: number;
  step: number;
  paramGap?: number;
};

const SliderRange: FC<SliderRange> = ({
  valueRange,
  setValueRange,
  param,
  paramBeforePosition = true,
  defaultValue,
  min,
  max,
  step,
  paramGap,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [minPos, setMinPos] = useState(0);
  const [maxPos, setMaxPos] = useState(0);

  useEffect(() => {
    updateLabelPositions();
    // eslint-disable-next-line
  }, [valueRange]);

  const updateLabelPositions = () => {
    const slider = sliderRef.current;
    if (slider) {
      const range = max;
      const width = slider.offsetWidth;
      const minVal = valueRange[0];
      const maxVal = valueRange[1];
      const minPosition = (minVal / range) * width;
      const maxPosition = (maxVal / range) * width;
      const minOffset = 40;

      let adjustedMinPos = minPosition;
      let adjustedMaxPos = maxPosition;

      if (adjustedMaxPos - adjustedMinPos < minOffset) {
        adjustedMinPos = maxPosition - minOffset;
        adjustedMaxPos = minPosition + minOffset;
      }

      setMinPos(adjustedMinPos);
      setMaxPos(adjustedMaxPos);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-7 relative">
      <div ref={sliderRef} className="relative">
        <RangeSlider
          min={min}
          max={max}
          step={step}
          onInput={setValueRange}
          defaultValue={defaultValue}
        />
      </div>

      <div
        className={`absolute -translate-x-1/2 bottom-0 body_xs text-grays-800 flex ${
          paramBeforePosition ? "flex-row" : "flex-row-reverse"
        } `}
        style={{ left: `${minPos}px`, gap: paramGap + "px" }}
      >
        <span>{param}</span>
        <span>{valueRange[0]}</span>
      </div>
      <div
        className={`absolute -translate-x-1/2 bottom-0 body_xs text-grays-800 flex ${
          paramBeforePosition ? "flex-row" : "flex-row-reverse"
        } `}
        style={{ left: `${maxPos}px`, gap: paramGap + "px" }}
      >
        <span>{param}</span>
        <span>{valueRange[1]}</span>
      </div>
    </div>
  );
};

export default SliderRange;
