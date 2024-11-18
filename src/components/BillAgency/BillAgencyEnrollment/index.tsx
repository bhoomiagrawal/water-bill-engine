"use client";
import React, { useState } from "react";
import RegistrationDetail from "./RegistrationDetail";
import OfficeDetails from "./OfficeDetails";
import ContractDetails from "./ContractDetails";
import UploadDocuments from "./UploadDocuments";

interface FormData {
  registration: Record<string, any>;
  office: Record<string, any>;
  contract: Record<string, any>;
  documents: any[];
}

const BillAgencyEnrollment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    registration: {},
    office: {},
    contract: {},
    documents: [],
  });

  const handleFormOneSubmit = (data: any) => {
    setFormData((prev: FormData) => ({ ...prev, registration: data }));
    setCurrentStep(2);
  };

  const handleFormTwoSubmit = (data: any) => {
    setFormData((prev: FormData) => ({ ...prev, office: data }));
    setCurrentStep(3);
  };

  const handleFormThreeSubmit = (data: any) => {
    setFormData((prev: FormData) => ({ ...prev, contract: data }));
    setCurrentStep(4);
  };

  const handleFormFourSubmit = (data: any) => {
    setFormData((prev: FormData) => ({ ...prev, documents: data }));
    console.log("Final Data:", { ...formData, documents: data });
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold bg-blue-500 px-3 py-2 mb-4 text-white rounded-md">
        Bill Agency Enrollment Form
      </h1>

      <div className="bg-gray-200 p-4">
        <h3 className="text-lg font-semibold">Registration Details</h3>
        <div className="mt-2 grid grid-cols-2 gap-2 md:flex md:justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`w-full text-center ${currentStep >= step ? "text-blue-600" : "text-gray-400"}`}>
              <div className={`text-sm ${currentStep >= step ? "bg-blue-200" : "bg-gray-300"} rounded p-2 font-bold`}>
                {step}. {step === 1 ? "Registration Details" : step === 2 ? "Office Details" : step === 3 ? "Contract Details" : "Upload Documents"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentStep > 1 && (
        <div className="flex justify-start mb-4 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}

      {currentStep === 1 && <RegistrationDetail onSubmit={handleFormOneSubmit} />}
      {currentStep === 2 && <OfficeDetails onSubmit={handleFormTwoSubmit} />}
      {currentStep === 3 && <ContractDetails onSubmit={handleFormThreeSubmit} />}
      {currentStep === 4 && <UploadDocuments onSubmit={handleFormFourSubmit} />}
    </div>
  );
};

export default BillAgencyEnrollment;
