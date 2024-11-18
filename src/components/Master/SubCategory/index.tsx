'use client'
import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import AddSubCategory from './AddSubCategory';

interface SubCategory{
  id:number,
  category:string,
subCategory:string
}

const SubCategory:React.FC = () => {
const [subCategory,setSubCategory]=useState<SubCategory[]>([
  { id: 1, category: 'Domestic',subCategory:"All Government educations institution" },
  { id: 2, category: 'Non-domestic' ,subCategory:"Shops"},
  { id: 3, category: 'Industrial',subCategory:"" },
  { id: 4, category: 'Flat',subCategory:"" },
  { id: 4, category: 'Own/private water supply',subCategory:"Hotel" },
])
const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); 


const handleEdit=(id: number)=>{}
const handleDelete=(id: number)=>{}

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sub Category</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Sub Category
        </button>
      </div>

      {isPopupOpen && (
        <div >
          <AddSubCategory setIsPopupOpen={setIsPopupOpen} />
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left"> Category Name</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Sub Category Name</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>

            </tr>
          </thead>
          <tbody>
            {subCategory.map((subCategory) => (
              <tr key={subCategory.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{subCategory.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{subCategory.category}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{subCategory.subCategory}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(subCategory.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(subCategory.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default SubCategory
