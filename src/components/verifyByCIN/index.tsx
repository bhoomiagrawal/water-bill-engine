'use client';
import React, { FormEvent, useRef } from 'react';

const VerifyByCIN = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (index: number) => {
    if (inputRefs.current[index]?.value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (index > 0 && !inputRefs.current[index]?.value) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome Test
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <label className="block font-bold text-gray-700 dark:text-gray-300">
              Enter your Office Code From CIN:
            </label>
            <div className="grid grid-cols-4 gap-2">
              
              
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="text" 
                  inputMode="numeric" 
                  pattern="[0-9]*" 
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-4 text-center text-gray-800 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                  maxLength={1}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  onInput={(e) => {
                    if (e.currentTarget.value.length > 1) {
                      e.currentTarget.value = e.currentTarget.value.slice(0, 1);
                    }
                    handleInputChange(index);
                  }}
                  onKeyDown={(e) => handleInputKeyDown(e, index)}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-4 text-white font-semibold transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyByCIN;
