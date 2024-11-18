'use client'
import React, { useState } from 'react';
import AddCategory from './AddCategory';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


interface Category {
  id: number;
  category: string;
  categoryCode:string
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, category: 'Domestic',categoryCode:"D" },
    { id: 2, category: 'Non-domestic',categoryCode:"ND" },
    { id: 3, category: 'Industrial',categoryCode:"IN" },
    { id: 4, category: 'Flat',categoryCode:"F" },
    { id: 4, category: 'Own/private water supply',categoryCode:"" },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); 

  const handleEdit = (id: number) => {
    console.log('Edit category with id:', id);
  };

  const handleDelete = (id: number) => {
    const filteredCategories = categories.filter(category => category.id !== id);
    setCategories(filteredCategories);
    console.log('Deleted category with id:', id);
  };

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Category</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
       Add Category
        </button>
      </div>

      {isPopupOpen && (
        <div >
          <AddCategory setIsPopupOpen={setIsPopupOpen} />
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Category Name</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Category Code</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{category.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{category.category}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{category.categoryCode}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(category.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(category.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default Category;
