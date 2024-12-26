import React, { useState, useEffect } from 'react';

interface ToggleInputProps {
  label: string;
  value: boolean;  // Receive value as a prop
  onChange?: (state: boolean) => void;  // Callback function when state changes
}

const ToggleInput: React.FC<ToggleInputProps> = ({ label, value, onChange }) => {
  const [isChecked, setIsChecked] = useState<boolean>(value);  // Set initial state based on `value` prop

  useEffect(() => {
    setIsChecked(value);  // Sync the internal state with the value prop when it changes
  }, [value]);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState); // Notify the parent with the new state
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer space-x-3 w-[180px]">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className="relative w-16 h-9 bg-transparent border-2 border-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 peer-checked:border-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:bg-white peer-checked:after:border-black peer-checked:after:border-2 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-gray-300 after:border-2 after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:border-2 dark:border-gray-600">
      </div>
      <span className="text-lg font-medium text-gray-900 dark:text-gray-300">{label}</span>
    </label>
  );
};

export default ToggleInput;
