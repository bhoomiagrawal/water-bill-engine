"use client";
import React, { useState } from "react";

 interface formOpenProps{
  setIsFormOpen:(value:boolean)=>void;
 }

const AddAccount: React.FC <formOpenProps>= ({setIsFormOpen}) => {
  const [formValues, setFormValues] = useState({
    chowkri:"",
    accountNumber: "",
  });


  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.accountNumber) newErrors.accountNumber = "Account Number is required";

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
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-black mt-24   ">
      <div className="mt-10 bg-gray-100 relative w-[900px] m-auto ">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark ">
          <form
            onSubmit={handleSubmit}
            className=" flex  flex-col gap-10   space-x-13  p-10  "
          >
            <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
              <h3 className="text-xl  font-bold text-gray-800 dark:text-white">
                Create account 
              </h3>
            </div>

            <div className="flex flex-col">
                <label htmlFor="category" className="mb-1 font-medium">
                  Select chowkri Code:
                </label>
                <select
                  name="chowkri"
                  value={formValues.chowkri}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="0H1">0H1</option>
                  <option value="0A1">0A1</option>
                  <option value="03C">03C</option>
                  <option value="03D">03D</option>
                  <option value="03E">
                  03E
                  </option>
                </select>
              </div>

            <div>
              <div>
                <input
                  type="text"
                  name="accountNumber"
                  value={formValues.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter Cycle Number"
                  className="w-full rounded-lg   border-2 border-[#aeaeaf]  bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none  dark:text-white dark:focus:border-primary"
                />
              </div>
              {/* {errors.accountNumber && <div className="mt-1 text-red-600">{errors.accountNumber}</div>} */}
            </div>

            <div>
              <button
                type="submit"
                className="  w-25  rounded bg-blue-500  py-3   text-xl font-bold text-white  transition hover:bg-blue-600"
              >
                Create
              </button>
              <button
                type="submit"
                className="  w-25  rounded bg-blue-500  py-3   text-xl font-bold text-white  transition hover:bg-blue-600  ml-4"
                onClick={()=>setIsFormOpen(false)}
              >
                close
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddAccount;

