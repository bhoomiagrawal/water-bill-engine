'use client'
import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddAccount from './AddAccount';

interface Account {
  id: number;
  accountName: string;
}

const Account: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, accountName: '66D-1-215' },
    { id: 2, accountName: '66D-2-212' },
    { id: 3, accountName: '66F-3-216' },
  ]);

  const [search, setSearch] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Account;
    direction: 'ascending' | 'descending';
  } | null>({
    key: 'accountName',
    direction: 'ascending',
  });

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); 
  const [newAccountName, setNewAccountName] = useState<string>(''); 

  const handleEdit = (id: number) => {
    console.log('Edit account with id:', id);
  };

  const handleDelete = (id: number) => {
    const filteredAccounts = accounts.filter(account => account.id !== id);
    setAccounts(filteredAccounts);
    console.log('Deleted account with id:', id);
  };

  const handleAddAccount = () => {
    if (newAccountName.trim()) {
      const newAccount: Account = {
        id: accounts.length + 1,
        accountName: newAccountName.trim(),
      };
      setAccounts([...accounts, newAccount]);
      setNewAccountName('');
      setIsFormOpen(false); 
    }
  };

  const sortedAccounts = React.useMemo(() => {
    let sortableAccounts = [...accounts];
    if (sortConfig !== null) {
      sortableAccounts.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAccounts;
  }, [accounts, sortConfig]);

  const handleSort = (key: keyof Account) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredAccounts = sortedAccounts.filter((account) =>
    account.accountName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-14 ">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Account</h1>
      <div className="flex space-x-4">


          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search accounts..."
            className="px-6 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          />
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Account
          </button>
        </div>
      </div>

      {isFormOpen && <AddAccount setIsFormOpen={setIsFormOpen} />}

      <div className="overflow-x-auto shadow-md rounded-lg mt-6">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th
                className="px-6 py-4 text-lg font-semibold text-left cursor-pointer"
                onClick={() => handleSort('accountName')}
              >
                Account Name
                {sortConfig?.key === 'accountName' &&
                  (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
              </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">{account.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{account.accountName}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(account.id)} className='w-5 h-5 cursor-pointer text-blue-600' />
                    <MdDelete onClick={() => handleDelete(account.id)} className='w-5 h-5 cursor-pointer text-red-600' />
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
