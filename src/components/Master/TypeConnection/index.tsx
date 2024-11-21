'use client'
import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddTypeConnection from './AddTypeConnection';


interface TypeConnection {
  id: number;
  TypeConnection: string;
}

const TypeConnection: React.FC = () => {
  const [typeConnection, setTypeConnection] = useState<TypeConnection[]>([
    { id: 1, TypeConnection: ' Permanent ' },
    { id: 2, TypeConnection: 'temporary' },
    { id: 3, TypeConnection: 'In case of temporary connection charges the water charges will be 1. times'},
  ]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); 
  // const [typeConnection, setTypeConnection] = useState<string>(''); 
  const handleEdit = (id: number) => {
    console.log('Edit chowkri with id:', id);
  };

  const handleDelete = (id: number) => {
    const filteredchowkri = typeConnection.filter(typeConnection => typeConnection.id !== id);
    setTypeConnection(filteredchowkri);
    console.log('Deleted chowkri with id:', id);
  };

  const handleView = (id: number) => {
    console.log('View category with id:', id);
  };

 

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Type of Connection</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
         Add Type Connection
        </button>
      </div>

   
     {
      isFormOpen && <>
    <AddTypeConnection setIsFormOpen={setIsFormOpen}/>
      </>
     }
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Type Connection</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {typeConnection.map((TypeConnection) => (
              <tr key={TypeConnection.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{TypeConnection.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{TypeConnection.TypeConnection}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(TypeConnection.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(TypeConnection.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default TypeConnection;





















