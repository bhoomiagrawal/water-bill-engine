import React, { useEffect, useRef, useState } from 'react';

interface DropDownProps {
  options: string[];
  isMultiSelect: boolean;
  label: string; // Add label prop
}

const DropDown: React.FC<DropDownProps> = ({ options, isMultiSelect, label }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (value: string) => {
    if (isMultiSelect) {
      setSelectedValues(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else {
      setSelectedValues([value]);
      setIsOpen(false); // Close dropdown on single select
    }
  };

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      setSelectedValues([]); // Deselect all
    } else {
      setSelectedValues(options); // Select all
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {/* {isMultiSelect ? 'Select options' : 'Select an option'}  */}
          {label}
          {selectedValues.length > 0 && `: ${selectedValues.join(', ')}`}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.342l3.71-3.13a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {isMultiSelect && (
              <div className="px-4 py-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedValues.length === options.length}
                    onChange={handleSelectAll}
                    className="mr-2"
                  />
                  Select All
                </label>
              </div>
            )}
            {options.map(option => (
              <div key={option} className="px-4 py-2 hover:bg-gray-100">
                <label className="flex items-center">
                  <input
                    type={isMultiSelect ? 'checkbox' : 'radio'}
                    checked={selectedValues.includes(option)}
                    onChange={() => {
                      handleSelect(option);
                      if (!isMultiSelect) setIsOpen(false); // Close dropdown for single select
                    }}
                    className="mr-2"
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
