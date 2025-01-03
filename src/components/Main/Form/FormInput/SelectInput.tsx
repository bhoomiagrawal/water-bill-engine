import React, { ChangeEvent } from 'react';

interface Option {
  id: number;
  value: string;
  label: string;
  key: string;  // Key for the option (used for uniqueness in React rendering)
}

interface SelectInputProps {
  options: Option[];
  id: number;
  label: string;
  onChange: (value: string) => void;
  value: string;
  disable?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options, onChange, value, disable }) => {
  console.log("value1",value)
  console.log("value2",options)

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* <label htmlFor="select" className="text-sm font-medium text-gray-700">{label}</label> */}
      <select
        id="select"
        value={value}
        onChange={handleChange}
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
        disabled={disable}
      >
        <option value="" disabled>Select an option</option>
        {options && options.length > 0 ? (
          options.map((option) => (
            <option key={option.key} value={option.id}>
              {option.value}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
};

export default SelectInput;
