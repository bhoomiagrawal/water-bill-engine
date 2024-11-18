import React, { useState } from "react";

interface FormOneProps {
  onSubmit: (values: any) => void;
}

const RegistrationDetail: React.FC<FormOneProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    PanNumber: "",
    TanNo: "",
    GSTRegistration: "",
    CorporateIdentityNumber: "",
    CompanyName: "",
    AuthorizedSignatory: "",
    DateofEstablishment: "",
    DirectorName: "",
    NatureOfCompany: "",
    TurnOver: "",
    ContactPersonName: "",
    PersonContactNo: ""
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear the error for the field being edited
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.CompanyName) newErrors.CompanyName = "Required field Company Name is missing";
    if (!formValues.ContactPersonName) newErrors.ContactPersonName = "Required field Contact Person Name is missing";
    if (!formValues.PersonContactNo) newErrors.PersonContactNo = "Required field Person Contact Number is missing";
    
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Registration Details
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="PanNumber" className="mb-1 font-medium">PAN NUMBER:</label>
                <input
                  type="text"
                  name="PanNumber"
                  value={formValues.PanNumber}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.PanNumber && <div className="mt-1 text-red-600">{errors.PanNumber}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="TanNo" className="mb-1 font-medium">TAN No:</label>
                <input
                  type="text"
                  name="TanNo"
                  value={formValues.TanNo}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.TanNo && <div className="mt-1 text-red-600">{errors.TanNo}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="GSTRegistration" className="mb-1 font-medium">GST Registration No:</label>
                <input
                  type="text"
                  name="GSTRegistration"
                  value={formValues.GSTRegistration}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.GSTRegistration && <div className="mt-1 text-red-600">{errors.GSTRegistration}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="CorporateIdentityNumber" className="mb-1 font-medium">Corporate Identity Number (CIN):</label>
                <input
                  type="text"
                  name="CorporateIdentityNumber"
                  value={formValues.CorporateIdentityNumber}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CorporateIdentityNumber && <div className="mt-1 text-red-600">{errors.CorporateIdentityNumber}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="CompanyName" className="mb-1 font-medium">Company Name: <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="CompanyName"
                  value={formValues.CompanyName}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.CompanyName && <div className="mt-1 text-red-600">{errors.CompanyName}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="AuthorizedSignatory" className="mb-1 font-medium">Authorized Signatory:</label>
                <input
                  type="text"
                  name="AuthorizedSignatory"
                  value={formValues.AuthorizedSignatory}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.AuthorizedSignatory && <div className="mt-1 text-red-600">{errors.AuthorizedSignatory}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="DateofEstablishment" className="mb-1 font-medium">Date of Establishment:</label>
                <input
                  type="date"
                  name="DateofEstablishment"
                  value={formValues.DateofEstablishment}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.DateofEstablishment && <div className="mt-1 text-red-600">{errors.DateofEstablishment}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="DirectorName" className="mb-1 font-medium">Director Name:</label>
                <input
                  type="text"
                  name="DirectorName"
                  value={formValues.DirectorName}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.DirectorName && <div className="mt-1 text-red-600">{errors.DirectorName}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="NatureOfCompany" className="mb-1 font-medium">Nature of Company:</label>
                <select
                  name="NatureOfCompany"
                  value={formValues.NatureOfCompany}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="One Person Company">One Person Company</option>
                  <option value="HUF">HUF</option>
                  <option value="Private Limited Company">Private Limited Company</option>
                  <option value="Public Limited Company">Public Limited Company</option>
                  <option value="Section 8 Company">Section 8 Company</option>
                  <option value="SHG">SHG</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Unlimited Company">Unlimited Company</option>
                </select>
                {errors.NatureOfCompany && <div className="mt-1 text-red-600">{errors.NatureOfCompany}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="TurnOver" className="mb-1 font-medium">Turn Over:</label>
                <select
                  name="TurnOver"
                  value={formValues.TurnOver}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="0-5 cr">0-5 cr</option>
                  <option value="5-10 cr">5-10 cr</option>
                  <option value="10-50 cr">10-50 cr</option>
                  <option value="50-100 cr">50-100 cr</option>
                  <option value="100-null cr">100-null cr</option>
                </select>
                {errors.TurnOver && <div className="mt-1 text-red-600">{errors.TurnOver}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="ContactPersonName" className="mb-1 font-medium">Contact Person Name: <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="ContactPersonName"
                  value={formValues.ContactPersonName}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.ContactPersonName && <div className="mt-1 text-red-600">{errors.ContactPersonName}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="PersonContactNo" className="mb-1 font-medium">Person Contact No: <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="PersonContactNo"
                  value={formValues.PersonContactNo}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.PersonContactNo && <div className="mt-1 text-red-600">{errors.PersonContactNo}</div>}
              </div>
            </div>
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

export default RegistrationDetail;
