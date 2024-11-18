'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import DropDown from "@/components/HelperComponents/DropDown/DropDown";

const cycleNumbers = Array.from({ length: 15 }, (_, i) => (i + 1).toString());

interface FormValues {
  typeCharges: string;
  category: string;
  selectConnectionSize: number;
  consumptionSlab: number;
  waterChargesRate: number;
}

const Configure: React.FC = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    typeCharges: "",
    category: "",
    selectConnectionSize: 0,
    consumptionSlab: 0,
    waterChargesRate: 0 
  });


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    // router.push('/readingSheet'); // Navigate to readingSheet page
  };
  const options = ['Domestic', 'Non-domestic', 'Industrial', 'Flat','Own/private water supply'];
  const options1 = ['15(MM)', '20(MM)','25(MM)', '40(MM)','160(MM)'];
  const options2 = ['0-8000', '8001-1500','8001-1500', '8001-1500','15001-40000'];


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg">
          <div className="border-b border-stroke px-6 py-4">
            <h3 className="text-xl font-semibold">Configure</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col">
                <label htmlFor="TypeCharges" className="mb-1 font-medium">Select Type of charges :</label>
                <select
                  name="TypeCharges"
                  value={formValues.typeCharges}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <option value="Water Charges">Water Charges</option>
                  <option value="">Minimum Charges</option>
                  <option value=""> Meter service chrges</option>
                  <option value="">Fixed Charges</option>
                  <option value="">Sewarage tax</option>
                  <option value="">STP charges </option>
                  <option value="">IDC</option>
                  <option value="">LPS</option>
                  <option value="">Interest</option>
                  <option value="">Meter tempering charges</option>
                  <option value="">Meter damaging charges</option>
                  <option value="">meter theft charges</option>
                  <option value="">Penalty for connecting mechanical or electrical equipment in service line</option>


                </select>
              </div>
              <DropDown options={options} isMultiSelect={true} label="Select Category " />

              {/* <div className="flex flex-col">
                <label htmlFor="SelectSubdivisionOffice" className="mb-1 font-medium">Select Category :</label>
                <select
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.category}
                 
                >
                  <option value="">Select</option>
                  <option value="Domestic">Domestic</option>
                  <option value="Non-domestic">Non-domestic</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Flat">Flat</option>
                  <option value="Own/private water supply">Own/private water supply</option>

                </select>
              </div> */}
              <DropDown options={options1} isMultiSelect={true} label="Select Connection size" />

              {/* <div className="flex flex-col">
                <label htmlFor="SelectChowkriCode" className="mb-1 font-medium">Select Connection size:</label>
                <select
                  name="selectConnectionSize"
                  value={formValues.selectConnectionSize}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                  // disabled={!formValues.selectConnectionSize}  
                  
                >
                  <option value="15">15(MM)</option>
                  <option value="20">20(MM)</option>
                  <option value="25">25(MM)</option>
                  <option value="40">40(MM)</option>
                  <option value="40">160(MM)</option>
                </select>
              </div> */}
              <DropDown options={options2} isMultiSelect={true} label="Select Connection size" />

              {/* <div className="flex flex-col">
                <label htmlFor="consumptionSlab" className="mb-1 font-medium">Select Consumption slab:</label>
                <select
                  name="consumptionSlab"
                  value={formValues.consumptionSlab}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <option value="">Select</option>
                  <option value="0-800">0-8000</option>
                  <option value="8001-1500">8001-1500</option>
                  <option value="8001-1500">8001-1500</option>
                  <option value="15001-40000">15001-40000</option>

                </select>
              </div> */}

              <div className="flex flex-col">
                <label htmlFor="waterChargesRate" className="mb-1 font-medium">Select water charges Rate /1000 litres:</label>
                <select
                  name="waterChargesRate"
                  value={formValues.waterChargesRate}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <option value="">Select</option>
                  <option value="500">500 ₹</option>
                  <option value="500">5000 ₹</option>
                  <option value="500">15000 ₹</option>
                  <option value="500">20000 ₹</option>
                  <option value="500">20000 ₹</option>
                  <option value="500">25000 ₹</option>

                </select>
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

export default Configure;

