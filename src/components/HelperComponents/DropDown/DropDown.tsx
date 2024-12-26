import React, { useState } from "react";

interface DropDownProps {
  options: string[];
  isMultiSelect: boolean;
  label: string;
  name: string; // Add `name` prop to handle changes
  value: string | number; // Ensure `value` matches the `formValues`
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  isMultiSelect,
  label,
  name,
  value,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (selectedValue: string) => {
    if (isMultiSelect) {
      setSelectedValues((prev) =>
        prev.includes(selectedValue)
          ? prev.filter((v) => v !== selectedValue)
          : [...prev, selectedValue]
      );
    } else {
      setSelectedValues([selectedValue]);
    }
    onChange({ target: { name, value: selectedValue } } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
  };

  return (
    <div className="relative inline-block text-left">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full border-gray-300 rounded py-3"
      >
        {/* Empty option for no default selection */}
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
