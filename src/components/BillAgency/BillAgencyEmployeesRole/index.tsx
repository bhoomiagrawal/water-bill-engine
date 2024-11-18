"use client";
import React, { useState } from "react";



const BillAgencyEmployeesRole: React.FC = () => {
  const [formValues, setFormValues] = useState({
    profilePhoto: "",
    name: "",
    email: "",
    mobileNumber: "",
    aadharNumber: "",
    janAadharNumber: "",
    role: "",
    address: ""
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear the error for the field being edited
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.profilePhoto) newErrors.profilePhoto = "Profile Photo is required";
    if (!formValues.name) newErrors.name = "Required field Name is missing";
    if (!formValues.email) newErrors.email = "Required field Email is missing";
    if (!formValues.mobileNumber) newErrors.mobileNumber = "Required field Mobile Number is missing";
    if (!formValues.aadharNumber) newErrors.aadharNumber = "Required field Aadhar Number is missing";
    if (!formValues.janAadharNumber) newErrors.janAadharNumber = "Required field Jan Aadhar Number is missing";
    if (!formValues.role) newErrors.role = "Required field Role is missing";
    if (!formValues.address) newErrors.address = "Address is required";

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
              Employee Role
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        

              <div className="flex flex-col">
                <label htmlFor="sso" className="mb-1 font-medium">SSO ID :</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && <div className="mt-1 text-red-600">{errors.name}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-medium">Role</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <div className="mt-1 text-red-600">{errors.email}</div>}
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

export default BillAgencyEmployeesRole;
