"use client";
import React, { useState } from "react";
interface AddChowkriProps {
    setIsFormOpen: (value:boolean)=>void;
  }
  
const AddChowkri: React.FC<AddChowkriProps> = ({setIsFormOpen}) => {
  const [formValues, setFormValues] = useState({
    subDivison: "",
    chowkri: '',
    chowkriCode:''
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.chowkri) newErrors.chowkri = "Category is required";

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
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-black mt-18   ">
      <div className="mt-10 bg-gray-100 relative w-[900px] m-auto ">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 space-x-13 p-10"
          >
            <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Create Chowkri/Billing Area
              </h3>
            </div>
           
            {/* <div className="flex flex-col">
              <label htmlFor="subDivison" className="mb-1 font-medium">
                Select Sub-Divison
              </label>
              <select
                name="subDivison"
                value={formValues.subDivison}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="Domestic">Sub-Divison Jaipur</option>
                <option value="Non-domestic">Sub-Divison Hindon</option>
                <option value="Industrial">Sub-Divison Nadauti</option>
                <option value="Flat">Sub-Divison City-X(N) Bandhgate,jaipur</option>
                <option value="Own/Private Water Supply">Sub-Divison City -|| (N) V.K.I., jaipur</option>
              </select>
            </div> */}
            <div>
              <input
                type="text"
                name="chowkri"
                value={formValues.chowkri}
                placeholder="Enter Chowkri Name"
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <input
                type="text"
                name="chowkri"
                value={formValues.chowkriCode}
                placeholder="Enter Chowkri Code"
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
              />
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
                  className="w-25 rounded bg-blue-500 py-3 text-xl font-bold text-white transition hover:bg-blue-600  ml-4"
                  onClick={()=>setIsFormOpen(false)}
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

export default AddChowkri;


