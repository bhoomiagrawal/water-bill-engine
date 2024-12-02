'use client'
import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddCinMaster from './AddCinMaster';


interface cinMaster {
  id: number;
  cinNumber: string;
}

const CinMaster: React.FC = () => {
  const [cinMaster, setCinMaster] = useState<cinMaster[]>([
    { id: 1, cinNumber: ' 140120413863' },
    { id: 2, cinNumber: '140120413864' },
    { id: 3, cinNumber: '140120413868'},
    { id: 4, cinNumber: '140120413862'},
    { id: 5, cinNumber: '140120413861' },
  ]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); 
  const [newchowkriName, setnewchowkriName] = useState<string>(''); 
  const handleEdit = (id: number) => {
    console.log('Edit chowkri with id:', id);
  };

  const handleDelete = (id: number) => {
    const filteredchowkri = cinMaster.filter(cinMaster => cinMaster.id !== id);
    setCinMaster(filteredchowkri);
    console.log('Deleted chowkri with id:', id);
  };

  const handleView = (id: number) => {
    console.log('View category with id:', id);
  };


  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">CIN</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
         Add CIN Number
        </button>
      </div>

   
     {
      isFormOpen && <>
    <AddCinMaster setIsFormOpen={setIsFormOpen}/>
      </>
     }
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">CIN Number</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cinMaster.map((cinMaster) => (
              <tr key={cinMaster.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{cinMaster.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{cinMaster.cinNumber}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(cinMaster.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(cinMaster.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default CinMaster;





