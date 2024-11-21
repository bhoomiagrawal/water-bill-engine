'use client'
import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddTypeCharges from '../TypeCharges/AddTypeCharges';
import AddTypeProperty from './AddTypeProperty';


interface TypeConnection {
  id: number;
  propertyType: string;
}

const TypeOfProperty: React.FC = () => {
  const [typeOfProperty, setTypeOfProperty] = useState<TypeConnection[]>([
    { id: 1, propertyType: ' Indivual plot ' },
    { id: 2, propertyType: 'multi story building' },
    { id: 3, propertyType: ' Indiviual flat owner'},
    { id: 4, propertyType: ' group housing society'},

  ]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); 
  const [propertyType, setPropertyType] = useState<string>(''); 
  const handleEdit = (id: number) => {
    console.log('Edit chowkri with id:', id);
  };

  const handleDelete = (id: number) => {
    const filteredchowkri = typeOfProperty.filter(typeOfProperty => typeOfProperty.id !== id);
    TypeOfProperty(filteredchowkri);
    console.log('Deleted chowkri with id:', id);
  };

  const handleView = (id: number) => {
    console.log('View category with id:', id);
  };

 

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2"> Type of Property </h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
         Add Property Type 
        </button>
      </div>

   
     {
      isFormOpen && <>
    <AddTypeProperty setIsFormOpen={setIsFormOpen}/>
      </>
     }
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Property Type </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {typeOfProperty.map((propertyType) => (
              <tr key={propertyType.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{propertyType.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{propertyType.propertyType}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(propertyType.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(propertyType.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default TypeOfProperty;






































