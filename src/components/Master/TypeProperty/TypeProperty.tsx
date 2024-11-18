"use client";
import React, { useState } from "react";



const TypeProperty: React.FC = () => {
  const [formValues, setFormValues] = useState({
    propertyType: ""
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear the error for the field being edited
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.propertyType) newErrors.propertyType = "Connection Type Slab is required";


    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Create Property Type
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        

              <div className="flex flex-col">
                <label htmlFor="propertyType" className="mb-1 font-medium">Property Type :</label>
                <input
                  type="text"
                  name="propertyType"
                  value={formValues.propertyType}
                  placeholder="Enter Property Type"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.propertyType && <div className="mt-1 text-red-600">{errors.propertyType}</div>}
              </div>
            </div>

            <div >
              <button
                type="submit"
                className="mt-4 w-20 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TypeProperty;






