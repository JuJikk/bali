import TheButton from "@/components/ui/TheButton";
import { FC } from "react";

type EquipmentSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const equipmentOptions = [
  {
    value: "FULLY_EQUIPPED",
    label: "Fully Equipped",
  },
  {
    value: "FURNISHED",
    label: "Furnished",
  },
  {
    value: "SEMI_FURNISHED",
    label: "Semi-Furnished",
  },
  {
    value: "UNFURNISHED",
    label: "Unfurnished",
  },
  {
    value: "UNFINISHED_CONSTRUCTION",
    label: "Unfinished construction",
  },
];

const EquipmentSelect: FC<EquipmentSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {equipmentOptions.map((option) => (
        <TheButton
          variant={
            value === option.value ? "selectedSmall" : "notSelectedSmall"
          }
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className="font-hk_medium text-[13px] leading-[19.5px]"
        >
          <span className="py-1">{option.label}</span>
        </TheButton>
      ))}
    </div>
  );
};

export default EquipmentSelect;
