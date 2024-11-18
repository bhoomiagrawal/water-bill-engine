'use client'
import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddChowkri from './AddChowkri';


interface chowkri {
  id: number;
  chowkri: string;
  chowkriCode:string
}

const Chowkri: React.FC = () => {
  const [chowkri, setChowkri] = useState<chowkri[]>([
    { id: 1, chowkri: ' 0H1',chowkriCode:'0H1' },
    { id: 2, chowkri: '0A1',chowkriCode:'0A1' },
    { id: 3, chowkri: '03C',chowkriCode:'03D' },
    { id: 4, chowkri: '03D',chowkriCode:'03G'},
    { id: 4, chowkri: '03E',chowkriCode:'03F' },
  ]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); 
  const [newchowkriName, setnewchowkriName] = useState<string>(''); 
  const handleEdit = (id: number) => {
    console.log('Edit chowkri with id:', id);
  };

  const handleDelete = (id: number) => {
    const filteredchowkri = chowkri.filter(chowkri => chowkri.id !== id);
    setChowkri(filteredchowkri);
    console.log('Deleted chowkri with id:', id);
  };

  const handleView = (id: number) => {
    console.log('View category with id:', id);
  };

  const handleAddCategory = () => {
    if (newchowkriName.trim()) {
      const newCategory: chowkri = {
        id: chowkri.length + 1,
        chowkri: newchowkriName.trim(),
        chowkriCode:newchowkriName
      
      };
      setChowkri([...chowkri, newCategory]);
      setnewchowkriName('');
      setIsFormOpen(false); 
    }
  };

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Chowkri/Billing Area</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
         Add Chowkri/Billing Area
        </button>
      </div>

   
     {
      isFormOpen && <>
    <AddChowkri setIsFormOpen={setIsFormOpen}/>
      </>
     }
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">chowkri Name</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">chowkri Code</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chowkri.map((chowkri) => (
              <tr key={chowkri.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{chowkri.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{chowkri.chowkri}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{chowkri.chowkriCode}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(chowkri.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(chowkri.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default Chowkri;



