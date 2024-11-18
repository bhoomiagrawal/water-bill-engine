"use client";
import React, { useState } from "react";

interface PopupOpen{
    setIsPopupOpen:(value:boolean)=>void;
}

const AddTypeCharges: React.FC<PopupOpen> = ({setIsPopupOpen}) => {
  const [formValues, setFormValues] = useState({
    TypeCharges: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); 
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.TypeCharges)
      newErrors.TypeCharges = "Consumption Slab is required";

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
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-black mt-18 ">
      <div className="mt-10 bg-gray-100 relative w-[900px] m-auto ">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Create Type of Charges
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="TypeCharges" className="mb-1 font-medium">
                  Type Charges :
                </label>
                <textarea
                  id="TypeCharges"
                  defaultValue={formValues.TypeCharges}
                  name="TypeCharges"
                  onChange={(e) => handleChange}
                  placeholder="Enter Type of Charges"
                  rows={4}
                  cols={50}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.TypeCharges && (
                  <div className="mt-1 text-red-600">{errors.TypeCharges}</div>
                )}

                {/* <input
                maxLength={3}
                  type="text"
                  name="TypeCharges"
                  value={formValues.TypeCharges}
                  placeholder="Enter Type of Charges"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.TypeCharges && <div className="mt-1 text-red-600">{errors.TypeCharges}</div>} */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mt-4 w-20 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Create
              </button>
              <button
                type="submit"
                className="mt-4 w-20 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 ml-4"
                onClick={()=>setIsPopupOpen(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddTypeCharges;
