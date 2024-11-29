'use client'
import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddAccount from './AddAccount';
import { useInternalService } from '@/components/hook/useInternalService';


interface account {
  id: number;
  accountName: string;
}

const Account: React.FC = () => {

  const [fetchData, fetchDataResult, fetchDataProgress, fetchDataError] = useInternalService({
    url: "http://localhost:8080/api/category",
    method: "GET",
    initialValues: null, 
  });

  useEffect(()=>{
    fetchData({body:null});
  },[])

  console.log("fetchDataResult",fetchDataResult)
    const [account, setAccount] = useState<account[]>([
    { id: 1, accountName: ' 66D-1-215' },
    { id: 2, accountName: '66D-2-212' },
    { id: 3, accountName: '66F-3-216'},
  ]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); 
  const [newchowkriName, setnewchowkriName] = useState<string>(''); 
  const handleEdit = (id: number) => {
    console.log('Edit chowkri with id:', id);
  };

  const handleDelete = (id: number) => {
    const filteredchowkri = account.filter(account => account.id !== id);
    setAccount(filteredchowkri);
    console.log('Deleted chowkri with id:', id);
  };

  const handleView = (id: number) => {
    console.log('View category with id:', id);
  };

  const handleAddCategory = () => {
    if (newchowkriName.trim()) {
      const newCategory: account = {
        id: account.length + 1,
        accountName: newchowkriName.trim(),
      
      };
      setAccount([...account, newCategory]);
      setnewchowkriName('');
      setIsFormOpen(false); 
    }
  };

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Account</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
         Add Account
        </button>
      </div>

   
     {
      isFormOpen && <>
    <AddAccount setIsFormOpen={setIsFormOpen}/>
      </>
     }
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Account Name</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {account.map((account) => (
              <tr key={account.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{account.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{account.accountName}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(account.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(account.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default Account;




