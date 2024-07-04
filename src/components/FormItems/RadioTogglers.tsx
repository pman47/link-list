import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

type bgType = "color" | "image";

interface Option {
  value: bgType;
  icon: IconProp;
  label: string;
}

interface RadioTogglersProps {
  options: Option[];
  defaultValue: bgType;
  onChange: (bgType: bgType) => void;
}

const RadioTogglers: FC<RadioTogglersProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  return (
    <div className="radio-togglers shadow">
      {options.map((option) => (
        <label className="" key={option.value}>
          <input
            type="radio"
            name="bgType"
            value={option.value}
            defaultChecked={defaultValue === option.value}
            onChange={(e) => {
              onChange(e.target.value as bgType);
            }}
          />
          <div>
            <FontAwesomeIcon icon={option.icon} />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioTogglers;
