import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Option {
  value: string;
  icon: IconProp;
  label: string;
}

interface RadioTogglersProps {
  options: Option[];
}

const RadioTogglers: FC<RadioTogglersProps> = ({ options }) => {
  return (
    <div className="radio-togglers shadow">
      {options.map((option) => (
        <label className="" key={option.value}>
          <input type="radio" name="bgType" value={option.value} />
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
