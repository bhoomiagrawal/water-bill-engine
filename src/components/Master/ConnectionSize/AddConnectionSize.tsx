"use client";
import React, { useState } from "react";



interface connectionSizeProp{
  setIsFormOpen:(value:boolean)=>void;
 }

const AddConnectionSize: React.FC<connectionSizeProp> = ({setIsFormOpen}) => {
  const [formValues, setFormValues] = useState({
    connectionSize: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); 
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.connectionSize) newErrors.connectionSize = "Connection Size is required";

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
    <div className=" fixed inset-0  bg-opacity-50  backdrop-blur-sm mt-18 bg-black">
    <div className="mt-10 bg-gray-100 relative w-[900px] m-auto  ">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark ">
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-10 space-x-13 p-10"
          >
            <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
              <h3 className="text-xl  font-bold text-gray-800 dark:text-white">
              Create Connection Size(MM)
              </h3>
            </div>

            <div>
              <div>
                <input
                  type="number"
                  name="connectionSize"
                  value={formValues.connectionSize}
                  placeholder="Enter Connection Size"
                  onChange={handleChange}
                  className="w-full rounded-lg   border-2 border-[#aeaeaf]  bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none  dark:text-white dark:focus:border-primary"
                />
              </div>
              {/* {errors.connectionSize && <div className="mt-1 text-red-600">{errors.connectionSize}</div>} */}
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
                className="  w-25  rounded bg-blue-500  py-3   text-xl font-bold text-white  transition hover:bg-blue-600 ml-4"
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

export default AddConnectionSize;




