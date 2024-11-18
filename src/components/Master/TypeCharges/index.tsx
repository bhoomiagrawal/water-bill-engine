'use client'
import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import AddTypeCharges from './AddTypeCharges';

interface TypeCharges{
  id:number,
  typeCharge:string
}

const TypeCharges = () => {

  const [typeCharge,setTypeCharge] =useState<TypeCharges[]>([
    { id: 1, typeCharge: 'Water Charge' },
    { id: 2, typeCharge: 'Minimum Charge' },
    { id: 3, typeCharge: 'fixed Charge' },
    { id: 4, typeCharge: 'Meter service charges' },
    { id: 5, typeCharge: 'Meter testing fee' },
    { id: 6, typeCharge: 'Duplicate bill charges' },
    { id: 7, typeCharge: 'Meter tempering charges' },
    { id: 8, typeCharge: 'Meter damaging charges' },
    { id: 9, typeCharge: 'Meter theft charges' },
    { id: 10, typeCharge: 'sewarege tax' },
    { id: 11, typeCharge: 'STP plant charges' },
    { id: 12, typeCharge: 'Penalty for connecting mechanical or electrical equipment in service line' },
    { id: 13, typeCharge: 'Penalty for illegal connection' },
    { id: 14, typeCharge: 'Infrastructure development surcharge (IDC)' },
    { id: 15, typeCharge: 'LPS' },
    { id: 16, typeCharge: 'Interest on outstanding'},


  ])
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); 

  const handleEdit=(id:number)=>{};
  const handleDelete=(id:number)=>{};

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Type of Charge</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
       Add Meter Status
        </button>
      </div>

      {isPopupOpen && (
        <div >
          <AddTypeCharges setIsPopupOpen={setIsPopupOpen} />
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Type of Charge</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {typeCharge.map((typeCharge) => (
              <tr key={typeCharge.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{typeCharge.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{typeCharge.typeCharge}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(typeCharge.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(typeCharge.id)} className=' w-15  h-6  cursor-pointer'/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TypeCharges;