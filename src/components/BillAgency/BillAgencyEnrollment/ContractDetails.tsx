import React, { useState } from "react";

interface FormOneProps {
  onSubmit: (values: any) => void;
}

const ContractDetails: React.FC<FormOneProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    NIBNumber: "",
    LOINumber: "",
    WorkOrderNumber: "",
    WorkOrderEffectiveDate: "",
    WorkOrderExpiryDate: "",
    WorkOrderCost: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
  };

  const validate = () => {
    const newErrors: Partial<typeof formValues> = {};
    if (!formValues.WorkOrderEffectiveDate) {
      newErrors.WorkOrderEffectiveDate = "Required field Work Order Effective Date is missing";
    }
    if (!formValues.WorkOrderExpiryDate) {
      newErrors.WorkOrderExpiryDate = "Required field Work Order Expiry Date is missing";
    }
    if (!formValues.WorkOrderCost) {
      newErrors.WorkOrderCost = "Required field Work Order Cost is missing";
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="NIBNumber" className="mb-1 font-medium">NIB Number :</label>
                <input
                  type="text"
                  name="NIBNumber"
                  value={formValues.NIBNumber}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="LOINumber" className="mb-1 font-medium">LOI Number :</label>
                <input
                  type="text"
                  name="LOINumber"
                  value={formValues.LOINumber}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="WorkOrderNumber" className="mb-1 font-medium">Work Order Number :</label>
                <input
                  type="text"
                  name="WorkOrderNumber"
                  value={formValues.WorkOrderNumber}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="WorkOrderEffectiveDate" className="mb-1 font-medium">Work Order Effective Date:</label>
                <input
                  type="date"
                  name="WorkOrderEffectiveDate"
                  value={formValues.WorkOrderEffectiveDate}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.WorkOrderEffectiveDate && <div className="mt-1 text-red-600">{errors.WorkOrderEffectiveDate}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="WorkOrderExpiryDate" className="mb-1 font-medium">Work Order Expiry Date: <span className="text-red-600">*</span></label>
                <input
                  type="date"
                  name="WorkOrderExpiryDate"
                  value={formValues.WorkOrderExpiryDate}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.WorkOrderExpiryDate && <div className="mt-1 text-red-600">{errors.WorkOrderExpiryDate}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="WorkOrderCost" className="mb-1 font-medium">Work Order Cost :</label>
                <input
                  type="text"
                  name="WorkOrderCost"
                  value={formValues.WorkOrderCost}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.WorkOrderCost && <div className="mt-1 text-red-600">{errors.WorkOrderCost}</div>}
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

export default ContractDetails;
