"use client";
import React, { useState } from "react";

const AddSingleConsumer: React.FC = () => {
  const [formValues, setFormValues] = useState({
    category: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear the error for the field being edited
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.category) newErrors.category = "Category is required";

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
              Create Single Consumer
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="ChowkdiNo" className="mb-1 font-medium">
                  Chowkdi No :
                </label>
                <input
                  type="text"
                  name="ChowkdiNo"
                  // value={formValues.category}
                  placeholder="Enter Chowkdi No"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="binderNo" className="mb-1 font-medium">
                  Binder No :
                </label>
                <input
                  type="text"
                  name="binderNo"
                  // value={formValues.category}
                  placeholder="Enter binder No"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="BinderSheetNo." className="mb-1 font-medium">
                  Binder Sheet No :
                </label>
                <input
                  type="text"
                  name="BinderSheetNo"
                  // value={formValues.category}
                  placeholder="Enter Binder Sheet No"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="ChildBinderSheet" className="mb-1 font-medium">
                  Child Binder Sheet No(if any) :
                </label>
                <input
                  type="text"
                  name="ChildBinderSheet"
                  // value={formValues.category}
                  placeholder="Enter Child Binder Sheet"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="ChildBinderSheet" className="mb-1 font-medium">
                  Service No :
                </label>
                <input
                  type="text"
                  name="serviceNo"
                  // value={formValues.category}
                  placeholder="Enter Service No"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="ChildBinderSheet" className="mb-1 font-medium">
                  Account No :
                </label>
                <input
                  type="text"
                  name="accountNo"
                  // value={formValues.category}
                  placeholder="Enter Account No"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="ChildBinderSheet" className="mb-1 font-medium">
                  Old Account No :
                </label>
                <input
                  type="text"
                  name="oldAccountNo."
                  // value={formValues.category}
                  placeholder="Enter Old Account No"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="connectionCategory "
                  className="mb-1 font-medium"
                >
                  Select Connection Category :
                </label>
                <select
                  name="connectionCategory"
                  // value={formValues.SelectChowkriCode}
                  // onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.SelectSubdivisionOffice}
                >
                  <option value="">Select</option>
                  <option value="Domestic">Domestic</option>
                  <option value="Non-domestic">Non-domestic</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Flat">Flat</option>
                  <option value="Own/private water supply">
                    Own/private water supply
                  </option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="SelectChowkriCode" className="mb-1 font-medium">
                  Select Connection Type :
                </label>
                <select
                  name=" connectionType"
                  // value={formValues.SelectChowkriCode}
                  // onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.SelectSubdivisionOffice}
                >
                  <option value="">Select</option>
                  <option value="Domestic">Permanent</option>
                  <option value="Non-domestic">Temporary</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="SelectChowkriCode" className="mb-1 font-medium">
                  Select Connection Sub Type :
                </label>
                <select
                  name=" connectionType"
                  // value={formValues.SelectChowkriCode}
                  // onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.SelectSubdivisionOffice}
                >
                  <option value="">Select</option>
                  <option value="Domestic">BPL</option>
                  <option value="Non-domestic">NBPL</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="SelectChowkriCode" className="mb-1 font-medium">
                  Select Connection Sub Type :
                </label>
                <select
                  name=" connectionType"
                  // value={formValues.SelectChowkriCode}
                  // onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.SelectSubdivisionOffice}
                >
                  <option value="">Select</option>
                  <option value="Domestic"  >BPL</option>
                  <option value="Non-domestic">NBPL</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Rebate
                </label>
              </div>


              <div className="flex flex-col">
                <label htmlFor="SelectChowkriCode" className="mb-1 font-medium">
                  Select Property Type :
                </label>
                <select
                  name=" connectionType"
                  // value={formValues.SelectChowkriCode}
                  // onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.SelectSubdivisionOffice}
                >
                  <option value="">Select</option>
                  <option value="Indivual plot"  >Indivual plot</option>
                  <option value="multi story building">Multi story building</option>
                  <option value=" indiviual flat owner"> Indiviual flat owner</option>
                  <option value="Non-domestic">Group housing society
                  </option>

                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Water Harvesting System
                </label>
              </div>

              
              <div className="flex flex-col">
                <label htmlFor="SelectChowkriCode" className="mb-1 font-medium">
                  Select Pipe Size (mm) :
                </label>
                <select
                  name=" connectionType"
                  // value={formValues.SelectChowkriCode}
                  // onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.SelectSubdivisionOffice}
                >
                  <option value="">Select</option>

                  <option value="Indivual plot"  >15(MM)</option>
                  <option value="multi story building">20(MM)</option>
                  <option value=" indiviual flat owner">25(MM)</option>
                  <option value="Non-domestic">40(MM)</option>
                  <option value="Non-domestic">160(MM)</option>

                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="ChildBinderSheet" className="mb-1 font-medium">
                Meter No :
                </label>
                <input
                  type="text"
                  name="oldAccountNo."
                  // value={formValues.category}
                  placeholder="Enter Meter No"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="ChildBinderSheet" className="mb-1 font-medium">
                Meter Make :
                </label>
                <input
                  type="text"
                  name="oldAccountNo."
                  // value={formValues.category}
                  placeholder="Enter Meter Make"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>


          

              <div className="flex flex-col">
                <label htmlFor="meterOwner" className="mb-1 font-medium">
                  Select Meter Owner :
                </label>
                <select
                  name=" meterOwner"
                  // value={formValues.SelectChowkriCode}
                  // onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.SelectSubdivisionOffice}
                >
                  <option value="">Select</option>

                  <option value="Indivual plot"  >Private</option>
                  <option value="multi story building">Government</option>
            

                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="ChildBinderSheet" className="mb-1 font-medium">
                CIN :
                </label>
                <input
                  type="text"
                  name="cin."
                  // value={formValues.category}
                  placeholder="Enter CIN"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="ConsumerName" className="mb-1 font-medium">
                Consumer Name :
                </label>
                <input
                  type="text"
                  name="ConsumerName."
                  // value={formValues.category}
                  placeholder="Enter Consumer Name"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="fatherSpouseName" className="mb-1 font-medium">
                Father/Spouse Name :
                </label>
                <input
                  type="text"
                  name="fatherSpouseName."
                  // value={formValues.category}
                  placeholder="Enter Father Spouse Name"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="mobileNo." className="mb-1 font-medium">
                Mobile No :
                </label>
                <input
                  type="number"
                  name="mobileNo."
                  // value={formValues.category}
                  placeholder="Enter Mobile No"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="emailID." className="mb-1 font-medium">
                Email ID :
                </label>
                <input
                  type="email"
                  name="emailID."
                  // value={formValues.category}
                  placeholder="Enter Email ID"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="address" className="mb-1 font-medium">
                Address :
                </label>
                <textarea
                  id="address"
                  // defaultValue={formValues.TypeCharges}
                  name="address"
                  onChange={(e) => handleChange}
                  placeholder="Enter address"
                  rows={4}
                  cols={50}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="emailID." className="mb-1 font-medium">
                Advance Deposit Amount(As on today) :
                </label>
                <input
                  type="number"
                  name="advanceDepositAmount"
                  // value={formValues.category}
                  placeholder="Enter Advance Deposit Amount"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="emailID." className="mb-1 font-medium">
                Connection Status :
                </label>
                <input
                  type="text"
                  name="connectionStatus"
                  // value={formValues.category}
                  placeholder="Enter Connection Status"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="currentMeterStatus." className="mb-1 font-medium">
                Current Meter Status :
                </label>
                <input
                  type="text"
                  name="currentMeterStatus"
                  // value={formValues.category}
                  placeholder="Enter Current Meter Status"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="currentMeterStatus." className="mb-1 font-medium">
                Current Connection Status :
                </label>
                <input
                  type="text"
                  name="currentConnectionStatus"
                  // value={formValues.category}
                  placeholder="Enter Current Connection Status"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="plotStatus." className="mb-1 font-medium">
                Plot Status :
                </label>
                <input
                  type="text"
                  name="plotStatus"
                  // value={formValues.category}
                  placeholder="Enter Plot Status"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div> 

              <div className="flex flex-col">
                <label htmlFor="plotStatus." className="mb-1 font-medium">
                Date of Connection :
                </label>
                <input
                  type="date"
                  name="  dateConnection"
                  // value={formValues.category}
                  placeholder="Enter  Date Connection"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>

              <div className="flex flex-col">
                <label htmlFor="plotStatus." className="mb-1 font-medium">
                security amount :
                </label>
                <input
                  type="number"
                  name="securityAmount"
                  // value={formValues.category}
                  placeholder="Enter Security Amount"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* {errors.category && <div className="mt-1 text-red-600">{errors.category}</div>} */}
              </div>
              
            </div>

          

            <div>
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

export default AddSingleConsumer;
