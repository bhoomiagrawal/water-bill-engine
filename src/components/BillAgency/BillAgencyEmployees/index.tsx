"use client";
import React, { useState } from "react";

interface FormOneProps {
  onSubmit: (values: any) => void;
}

const BillAgencyEmployees: React.FC<FormOneProps> = ({ onSubmit }) => {
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
              Billing Agency Employee
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="profilePhoto" className="mb-1 font-medium">Profile Photo</label>
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormValues((prev) => ({ ...prev, profilePhoto: file.name })); // Store the file name
                    }
                  }}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.profilePhoto && <div className="mt-1 text-red-600">{errors.profilePhoto}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-medium">Name</label>
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
                <label htmlFor="email" className="mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <div className="mt-1 text-red-600">{errors.email}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="mobileNumber" className="mb-1 font-medium">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formValues.mobileNumber}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.mobileNumber && <div className="mt-1 text-red-600">{errors.mobileNumber}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="aadharNumber" className="mb-1 font-medium">Aadhar Number</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formValues.aadharNumber}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.aadharNumber && <div className="mt-1 text-red-600">{errors.aadharNumber}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="janAadharNumber" className="mb-1 font-medium">Jan Aadhar Number</label>
                <input
                  type="text"
                  name="janAadharNumber"
                  value={formValues.janAadharNumber}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.janAadharNumber && <div className="mt-1 text-red-600">{errors.janAadharNumber}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="role" className="mb-1 font-medium">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.role && <div className="mt-1 text-red-600">{errors.role}</div>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="address" className="mb-1 font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.address && <div className="mt-1 text-red-600">{errors.address}</div>}
              </div>
            </div>

            <div className="text-end">
              <button
                type="submit"
                className="mt-4 w-20 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillAgencyEmployees;
