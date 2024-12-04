import React, { useState } from 'react'

 interface SupplyZoneProps {
    setIsPopupOpen:(value:boolean)=>void;
}

const AddSupplyZone:React.FC <SupplyZoneProps>= ({setIsPopupOpen}) => {
    const [formValues, setFormValues] = useState({
        supplyName: "",
        supplyCode: "",
        supplyFrequency:"" ,
        supplyTiming: ""
      });
    
      const [errors, setErrors] = useState<Partial<typeof formValues>>({});
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      };
    
    //   const validate = () => {
    //     const newErrors: Partial<typeof formValues> = {};
    //     if (!formValues.category) newErrors.category = "Category is required";
    
    //     return newErrors;
    //   };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       
      };

  return (
    <div className="fixed inset-0 mt-14 bg-black bg-opacity-50 backdrop-blur-sm   ">
    <div className=" mt-10 bg-gray-100 relative w-[900px] m-auto">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 space-x-13 p-10"
          >
            <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Create Supply Zone
              </h3>
            </div>
            <div className="flex flex-col">
              <label htmlFor="category" className="mb-1 font-medium">
                Select Supply Zone:
              </label>
              <select
                name="category"
                // value={formValues.category}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="Jaljeewan">Jal jeewan</option>
                <option value="Non-domestic">Sam</option>
                <option value="jalmission">jal mission</option>
               
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="category" className="mb-1 font-medium">
                Select Supply Code:
              </label>
              <select
                name="category"
                // value={formValues.category}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="Jaljeewan">S3</option>
                <option value="Non-domestic">S2</option>
                <option value="jalmission">L2</option>
               
              </select>
            </div>
            <div>
              <input
                type="number"
                name="supplyFrequency"
                // value={formValues.subCategory}
                placeholder="Enter supply Frequency"
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <input
                type="date"
                name=""
                // value={formValues.subCategory}
                placeholder=""
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className=" flex  ">
              <div className=" mr-2">
                <button
                  type="submit"
                  className="w-25 rounded bg-blue-500 py-3 text-xl font-bold text-white transition hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-25 rounded bg-blue-500 py-3 text-xl font-bold text-white transition hover:bg-blue-600 ml-4"
                  onClick={()=>setIsPopupOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddSupplyZone
