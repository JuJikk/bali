import { FC } from "react";

type CounterProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Counter: FC<CounterProps> = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <button
          type="button"
          className="w-9 h-9 rounded-lg flex items-center justify-center border border-grays-200 text-grays-700 font-hk_medium text-[13px] leading-[19.5px]"
          onClick={onDecrement}
        >
          -
        </button>
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-grays-25">
          {value}
        </div>
        <button
          type="button"
          className="w-9 h-9 rounded-lg flex items-center justify-center border border-grays-200 text-grays-700 font-hk_medium text-[13px] leading-[19.5px]"
          onClick={onIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
