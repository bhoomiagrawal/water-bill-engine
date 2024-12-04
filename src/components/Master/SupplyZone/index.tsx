"use client";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import AddSupplyZone from "./AddSupplyZone";

interface SupplyZone {
  id: number;
  supplyName: string;
  supplyCode: string;
  supplyFrequency: number;
  supplyTiming: string;
}

const SupplyZone: React.FC = () => {
  const [supplyZone, setSupplyZone] = useState<SupplyZone[]>([
    {
      id: 1,
      supplyName: "Jal jeewan",
      supplyCode: "S3",
      supplyFrequency: 24,
      supplyTiming: "24-7",
    },
    {
      id: 2,
      supplyName: "Sam",
      supplyCode: "S2",
      supplyFrequency: 72,
      supplyTiming:"24-7",
    },
    {
      id: 3,
      supplyName: "jal mission",
      supplyCode: "L2",
      supplyFrequency: 96,
      supplyTiming:"24-7",
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleEdit = (id: number) => {
    console.log("Edit subcategory with id:", id);
  };

  const handleDelete = (id: number) => {
    setSupplyZone(supplyZone.filter((supplyZone) => supplyZone.id !== id));
    console.log("Deleted subcategory with id:", id);
  };

  return (
    <div className="py-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Supply Zone</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            // value={search}
            // onChange={handleSearchChange}
            placeholder="Search Supply Zone..."
            className="px-6 py-2 mr-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" // Adjust width for balance
          />

          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Supply Zone
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div>
          <AddSupplyZone setIsPopupOpen={setIsPopupOpen} />
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg mt-6">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                S.No.
              </th>
              <th className="px-6 py-4 text-lg font-semibold text-left cursor-pointer">
                Supply Zone Name
              </th>

              <th className="px-6 py-4 text-lg font-semibold text-left cursor-pointer">
              supply Zone Code
              </th>

              <th className="px-6 py-4 text-lg font-semibold text-left cursor-pointer">
              supply Frequency
              </th> 
              <th className="px-6 py-4 text-lg font-semibold text-left cursor-pointer">
              Supply Timing
              </th>        
              <th className="px-6 py-4 text-lg font-semibold text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {supplyZone.map((supplyZone) => (
              <tr key={supplyZone.id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {supplyZone.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {supplyZone.supplyName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {supplyZone.supplyCode}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {supplyZone.supplyFrequency}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {supplyZone.supplyTiming}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit
                      onClick={() => handleEdit(supplyZone.id)}
                      className="w-5 h-5 cursor-pointer text-blue-600"
                    />
                    <MdDelete
                      onClick={() => handleDelete(supplyZone.id)}
                      className="w-5 h-5 cursor-pointer text-red-600"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplyZone;
