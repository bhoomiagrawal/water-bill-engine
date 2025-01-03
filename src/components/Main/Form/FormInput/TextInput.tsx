import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  type: string;
  placeholder?: string;  
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, type, placeholder }) => {
  
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
      placeholder={placeholder} 
    />
  );
};

export default TextInput;
