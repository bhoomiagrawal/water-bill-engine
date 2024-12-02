"use client";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import AddConsumptionSlab from "./AddConsumptionSlab";
import { useInternalService } from "@/components/hook/useInternalService";

interface ConsumptionSlab {
  id: number;
  category: string;
  consumption: string;
}

const ConsumptionSlab = () => {
  const [consumptionSlab, setConsumptionSlab] = useState<ConsumptionSlab[]>([
    { id: 1, category: "Domestic", consumption: "0-8000" },
    { id: 2, category: "Non-domestic", consumption: "8001-15000" },
    { id: 3, category: "Industrial", consumption: "15001-40000" },
    { id: 4, category: "Flat", consumption: "M 40001-60000" },
    {
      id: 5,
      category: "Own/private water supply",
      consumption: "More Then 60000",
    },
  ]);

  const [search, setSearch] = useState<string>("");

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [fetchRequest, result, inProgress, error] = useInternalService("https://dummyjson.com/products",'GET',null);

  useEffect(()=>{fetchRequest()},[])

  console.log(result)

  const handleSearchChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  };
const filteredConsumptionSlab = search === "    " ? consumptionSlab : consumptionSlab.filter(consumption=>consumption.consumption.toString().includes(search));
console.log(filteredConsumptionSlab)

  const handleEdit = (id: number) => {};
  const handleDelete = (id: number) => {};

  return (

    <div className="mt-14 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Consumption Slab</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search ConsumptionSlab..."
            className="px-6 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3" // Increased width
          />
          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Consumption Slab
          </button>
        </div>
      </div>



      {isPopupOpen && (
        <div>
          <AddConsumptionSlab setIsPopupOpen={setIsPopupOpen} />
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                S.No.
              </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                Category
              </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                Consumption Slab
              </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredConsumptionSlab.map((consumption) => (
              <tr key={consumption.id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {consumption.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {consumption.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {consumption.consumption}
                </td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit
                      onClick={() => handleEdit(consumption.id)}
                      className="w-5 h-5 cursor-pointer text-blue-600"
                    />
                    <MdDelete
                      onClick={() => handleDelete(consumption.id)}
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

export default ConsumptionSlab;
