"use client";
import React, { useState } from "react";

interface PopupOpen{
    setIsPopupOpen:(value:boolean)=>void;
}

const AddConsumptionSlab: React.FC<PopupOpen> = ({setIsPopupOpen}) => {
  const [formValues, setFormValues] = useState({
    category:"",
    consumptionSlab: "",

  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.consumptionSlab) newErrors.consumptionSlab = "Consumption Slab is required";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle successful submission here
      console.log("Form submitted successfully:", formValues);
    }
  };

  return (
    <div className="fixed inset-0 mt-18 bg-black bg-opacity-50 backdrop-blur-sm   ">
      <div className=" mt-10 bg-gray-100 relative w-[900px] m-auto">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 p-10"
          >
            <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Create Consumption Slab
              </h3>
            </div>
            <div className="flex flex-col">
                <label htmlFor="category" className="mb-1 font-medium">
                  Select Category:
                </label>
                <select
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="Domestic">Domestic</option>
                  <option value="Non-domestic">Non-domestic</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Flat">Flat</option>
                  <option value="Own/Private Water Supply">
                    Own/Private Water Supply
                  </option>
                </select>
              </div>
            <div>
              <input
                type="number"
                name="consumptionSlab"
                value={formValues.consumptionSlab}
                placeholder="Enter Consumption Slab (Litres) From-To"
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
              />
              {errors.consumptionSlab && (
                <div className="mt-1 text-red-600">{errors.consumptionSlab}</div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-25 rounded bg-blue-500 py-3 text-xl font-bold text-white transition hover:bg-blue-600"
              >
                Create
              </button>
              <button
                type="submit"
                className="w-25 rounded bg-blue-500 py-3 text-xl font-bold text-white transition hover:bg-blue-600 ml-4"
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

export default AddConsumptionSlab;
