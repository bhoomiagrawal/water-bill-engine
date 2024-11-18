"use client"
import React, { useState } from "react";
import { Email } from "read-excel-file";



const CircleMaster: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email:"",
    role:""
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear the error for the field being edited
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    // if (!formValues.CompanyName) newErrors.CompanyName = "Required field Company Name is missing";
    // if (!formValues.ContactPersonName) newErrors.ContactPersonName = "Required field Contact Person Name is missing";
    // if (!formValues.PersonContactNo) newErrors.PersonContactNo = "Required field Person Contact Number is missing";
    
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
            Add Circle
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className="flex flex-col">
                <label htmlFor="CircleName" className="mb-1 font-medium">Circle Name</label>
                <input
                  type="text"
                  name="CircleName"
                //   value={formValues.email}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.email && <div className="mt-1 text-red-600">{errors.email}</div>} */}
              </div>
            <div className="flex flex-col">
                <label htmlFor="Region" className="mb-1 font-medium">Region</label>
                <select
                  name="region"
                  // value={formValues.SelectChowkriCode}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="One Person Company">    Additional Chief Engineer Region PHED Bharatpur
                  </option>
                  <option value="HUF">    Additional Chief Engineer Region PHED Bikaner
                  </option>
                  <option value="Private Limited Company">    Additional Chief Engineer Region PHED Kota
                  </option>
                </select>
                {/* {errors.SelectSubdivisionOffice && <div className="mt-1 text-red-600">{errors.SelectSubdivisionOffice}</div>} */}
              </div>
            </div>
            <div className="text-end">
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

export default CircleMaster;


