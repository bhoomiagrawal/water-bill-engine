'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



interface Category {
    id: number;
    category: string;
}

const ReadingSheetList: React.FC = () => {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([
        { id: 1, category: 'Domestic' },
        { id: 2, category: 'Non-domestic' },
        { id: 3, category: 'Industrial' },
        { id: 4, category: 'Flat' },
        { id: 4, category: 'Own/private water supply' },
    ]);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [newCategoryName, setNewCategoryName] = useState<string>('');
   


     

     
    const handleEdit = (id: number) => {
        console.log('Edit category with id:', id);
    };

    const handleDelete = (id: number) => {
        const filteredCategories = categories.filter(category => category.id !== id);
        setCategories(filteredCategories);
        console.log('Deleted category with id:', id);
    };





    const handleView = () => {
        router.push('/readingSheet');
    };

    // const handleView = () => {
    //     router.push('/readingSheet?id=123&name=Sample Data');
    //   };

    return (
        <div className=" mx-auto ">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Reading Sheet List </h1>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-400 text-white">
                        <tr>
                            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
                            <th className="px-6 py-4 text-lg font-semibold text-left">Billing Month</th>
                            <th className="px-6 py-4 text-lg font-semibold text-left">Total Customers </th>
                            <th className="px-6 py-4 text-lg font-semibold text-left">Reading keyed In</th>
                            <th className="px-6 py-4 text-lg font-semibold text-left">Number of Bill Generated</th>
                            <th className="px-6 py-4 text-lg font-semibold text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr  className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">1</td>
                                <td className="border px-4 py-2">
                                <td>JUL 24</td>
                                </td>
                                <td className="border px-4 py-2">
                                <td>350</td>
                                </td>
                                <td className="border px-4 py-2">
                                <td>250</td>
                                </td>
                                <td className="border px-4 py-2">
                                <td>100</td>
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                        onClick={() => handleView()}
                                    >
                                        View
                                    </button>
                                </td>
                                {/* <td className="px-6 py-4 text-sm text-gray-800">{category.category}</td> */}
                                {/* <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(category.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(category.id)} className=' w-15  h-6  cursor-pointer'/>
                  </div>
                </td> */}
                            </tr>
                            <tr  className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">2</td>
                                <td className="border px-4 py-2">
                                <td>Aug 24</td>
                                </td>
                                <td className="border px-4 py-2">
                                <td>350</td>
                                </td>
                                <td className="border px-4 py-2">
                                <td>230</td>
                                </td>
                                <td className="border px-4 py-2">
                                <td>120</td>
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                        onClick={() => handleView()}
                                    >
                                        View
                                    </button>
                                </td>
                                {/* <td className="px-6 py-4 text-sm text-gray-800">{category.category}</td> */}
                                {/* <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(category.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(category.id)} className=' w-15  h-6  cursor-pointer'/>
                  </div>
                </td> */}
                            </tr>
                        {/* {categories.map((category) => (
                           
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReadingSheetList;

