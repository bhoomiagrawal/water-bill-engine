'use client'
import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddOwnPrivateSupply from './AddOwnPrivateSupply';


interface ownPrivateSupply {
  id: number;
  ownPrivateSupply: string;
}

const OwnPrivateSupply: React.FC = () => {
  const [ownPrivateSupply, setOwnPrivateSupply] = useState<ownPrivateSupply[]>([
    { id: 1, ownPrivateSupply: ' Hotel' },
    { id: 2, ownPrivateSupply: 'Restaurant' },
    { id: 3, ownPrivateSupply: 'Cinema'},
    { id: 4, ownPrivateSupply: 'Car truck Service Station'},
    { id: 5, ownPrivateSupply: 'Scooter/two wheeler service station' },
    { id: 6, ownPrivateSupply: 'For other industrial commercial estabilishment' },
    { id: 7, ownPrivateSupply: 'Domestice use' },

  ]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); 
  const [newchowkriName, setnewchowkriName] = useState<string>(''); 
  const handleEdit = (id: number) => {
    console.log('Edit chowkri with id:', id);
  };

  const handleDelete = (id: number) => {
    const filteredchowkri = ownPrivateSupply.filter(ownPrivateSupply => ownPrivateSupply.id !== id);
    setOwnPrivateSupply(filteredchowkri);
    console.log('Deleted chowkri with id:', id);
  };

  const handleView = (id: number) => {
    console.log('View category with id:', id);
  };


  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Own/Private Water Supply</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
         Add Own/Private Water Supply
        </button>
      </div>

   
     {
      isFormOpen && <>
    <AddOwnPrivateSupply setIsFormOpen={setIsFormOpen}/>
      </>
     }
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Own/Private Water Supply </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ownPrivateSupply.map((ownPrivateSupply) => (
              <tr key={ownPrivateSupply.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{ownPrivateSupply.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{ownPrivateSupply.ownPrivateSupply}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(ownPrivateSupply.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(ownPrivateSupply.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default OwnPrivateSupply;






