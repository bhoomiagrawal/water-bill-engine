import React, { useState } from "react";

interface FormOneProps {
  onSubmit: (values: any) => void;
}

const OfficeDetails: React.FC<FormOneProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    RegisteredOfficeAddress: "",
    NearestLandmark: "",
    AreaColonyLocality: "",
    State: "",
    District: "",
    Pincode: "",
    STDCodeLandlineNo: "",
    CompanyWebSite: "",
    EMailID: "",
    CorporateOfficeAddress: "",
    CorporateNearestLandmark: "",
    CorporateAreaColonyLocality: "",
    CorporateState: "",
    CorporateDistrict: "",
    CorporatePincode: "",
    CorporateSTDCodeLandlineNo: "",
    CorporateCompanyWebSite: "",
    CorporateEMailID: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.RegisteredOfficeAddress) {
      newErrors.RegisteredOfficeAddress = "Required field Registered Office Address is missing";
    }
    if (!formValues.AreaColonyLocality) {
      newErrors.AreaColonyLocality = "Required field Area/Colony/Locality is missing";
    }
    if (!formValues.State) {
      newErrors.State = "Required field State is missing";
    }
    if (!formValues.District) {
      newErrors.District = "Required field District is missing";
    }
    if (!formValues.Pincode) {
      newErrors.Pincode = "Required field Pincode is missing";
    }
    if (!formValues.EMailID) {
      newErrors.EMailID = "Required field E-Mail ID is missing";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formValues);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Registered Office Details
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="RegisteredOfficeAddress" className="mb-1 font-medium">
                  Registered Office Address: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="RegisteredOfficeAddress"
                  value={formValues.RegisteredOfficeAddress}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.RegisteredOfficeAddress && <div className="mt-1 text-red-600">{errors.RegisteredOfficeAddress}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="NearestLandmark" className="mb-1 font-medium">
                  Nearest Landmark:
                </label>
                <input
                  type="text"
                  name="NearestLandmark"
                  value={formValues.NearestLandmark}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.NearestLandmark && <div className="mt-1 text-red-600">{errors.NearestLandmark}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="AreaColonyLocality" className="mb-1 font-medium">
                  Area/Colony/Locality: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="AreaColonyLocality"
                  value={formValues.AreaColonyLocality}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.AreaColonyLocality && <div className="mt-1 text-red-600">{errors.AreaColonyLocality}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="State" className="mb-1 font-medium">
                  State: <span className="text-red-600">*</span>
                </label>
                <select
                  name="State"
                  value={formValues.State}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  {/* Add other states here */}
                </select>
                {errors.State && <div className="mt-1 text-red-600">{errors.State}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="District" className="mb-1 font-medium">
                  District: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="District"
                  value={formValues.District}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.District && <div className="mt-1 text-red-600">{errors.District}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="Pincode" className="mb-1 font-medium">
                  Pincode: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="Pincode"
                  value={formValues.Pincode}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.Pincode && <div className="mt-1 text-red-600">{errors.Pincode}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="STDCodeLandlineNo" className="mb-1 font-medium">
                  STD Code-Landline No:
                </label>
                <input
                  type="text"
                  name="STDCodeLandlineNo"
                  value={formValues.STDCodeLandlineNo}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.STDCodeLandlineNo && <div className="mt-1 text-red-600">{errors.STDCodeLandlineNo}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CompanyWebSite" className="mb-1 font-medium">
                  Company WebSite:
                </label>
                <input
                  type="text"
                  name="CompanyWebSite"
                  value={formValues.CompanyWebSite}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CompanyWebSite && <div className="mt-1 text-red-600">{errors.CompanyWebSite}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="EMailID" className="mb-1 font-medium">
                  E-Mail ID: <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="EMailID"
                  value={formValues.EMailID}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.EMailID && <div className="mt-1 text-red-600">{errors.EMailID}</div>}
              </div>
            </div>

            {/* Corporate Office Details */}
            <div className="items-center flex border-b border-stroke px-6 py-4 dark:border-strokedark">
              <div className="h-5 items-center">
                <input
                  id="helper-checkbox"
                  type="checkbox"
                  className="h-6 w-6 rounded mr-2 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Corporate Office Details
                </h3>
                <p>
                  Check if Corporate Office Address is same as "Registered Office Address"
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="CorporateOfficeAddress" className="mb-1 font-medium">
                  Corporate Office Address:
                </label>
                <input
                  type="text"
                  name="CorporateOfficeAddress"
                  value={formValues.CorporateOfficeAddress}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporateOfficeAddress && <div className="mt-1 text-red-600">{errors.CorporateOfficeAddress}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CorporateNearestLandmark" className="mb-1 font-medium">
                  Nearest Landmark:
                </label>
                <input
                  type="text"
                  name="CorporateNearestLandmark"
                  value={formValues.CorporateNearestLandmark}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporateNearestLandmark && <div className="mt-1 text-red-600">{errors.CorporateNearestLandmark}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CorporateAreaColonyLocality" className="mb-1 font-medium">
                  Area/Colony/Locality:
                </label>
                <input
                  type="text"
                  name="CorporateAreaColonyLocality"
                  value={formValues.CorporateAreaColonyLocality}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporateAreaColonyLocality && <div className="mt-1 text-red-600">{errors.CorporateAreaColonyLocality}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CorporateState" className="mb-1 font-medium">
                  State:
                </label>
                <select
                  name="CorporateState"
                  value={formValues.CorporateState}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  {/* Add other states here */}
                </select>
                {errors.CorporateState && <div className="mt-1 text-red-600">{errors.CorporateState}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CorporateDistrict" className="mb-1 font-medium">
                  District:
                </label>
                <input
                  type="text"
                  name="CorporateDistrict"
                  value={formValues.CorporateDistrict}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporateDistrict && <div className="mt-1 text-red-600">{errors.CorporateDistrict}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CorporatePincode" className="mb-1 font-medium">
                  Pincode:
                </label>
                <input
                  type="text"
                  name="CorporatePincode"
                  value={formValues.CorporatePincode}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporatePincode && <div className="mt-1 text-red-600">{errors.CorporatePincode}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CorporateSTDCodeLandlineNo" className="mb-1 font-medium">
                  STD Code-Landline No:
                </label>
                <input
                  type="text"
                  name="CorporateSTDCodeLandlineNo"
                  value={formValues.CorporateSTDCodeLandlineNo}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporateSTDCodeLandlineNo && <div className="mt-1 text-red-600">{errors.CorporateSTDCodeLandlineNo}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CorporateCompanyWebSite" className="mb-1 font-medium">
                  Company WebSite:
                </label>
                <input
                  type="text"
                  name="CorporateCompanyWebSite"
                  value={formValues.CorporateCompanyWebSite}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporateCompanyWebSite && <div className="mt-1 text-red-600">{errors.CorporateCompanyWebSite}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="CorporateEMailID" className="mb-1 font-medium">
                  E-Mail ID:
                </label>
                <input
                  type="email"
                  name="CorporateEMailID"
                  value={formValues.CorporateEMailID}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporateEMailID && <div className="mt-1 text-red-600">{errors.CorporateEMailID}</div>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-end">
              <button
                type="submit"
                className="mt-4 w-20 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficeDetails;
