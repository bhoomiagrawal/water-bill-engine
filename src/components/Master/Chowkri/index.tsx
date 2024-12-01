"use client";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddChowkri from "./AddChowkri";

interface Chowkri {
  id: number;
  chowkri: string;
  chowkriCode: string;
}

const Chowkri: React.FC = () => {
  const [chowkri, setChowkri] = useState<Chowkri[]>([
    { id: 1, chowkri: "0H1", chowkriCode: "0H1" },
    { id: 2, chowkri: "0A1", chowkriCode: "0A1" },
    { id: 3, chowkri: "03C", chowkriCode: "03D" },
    { id: 4, chowkri: "03D", chowkriCode: "03G" },
    { id: 5, chowkri: "03E", chowkriCode: "03F" },
  ]);

  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Chowkri;
    direction: "ascending" | "descending";
  } | null>({ key: "chowkri", direction: "ascending" });

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [newChowkriName, setNewChowkriName] = useState<string>("");

  const handleEdit = (id: number) => {
    console.log("Edit chowkri with id:", id);
  };

  const handleDelete = (id: number) => {
    const filteredChowkri = chowkri.filter((chowkri) => chowkri.id !== id);
    setChowkri(filteredChowkri);
    console.log("Deleted chowkri with id:", id);
  };

  const handleAddChowkri = () => {
    if (newChowkriName.trim()) {
      const newChowkri: Chowkri = {
        id: chowkri.length + 1,
        chowkri: newChowkriName.trim(),
        chowkriCode: newChowkriName.trim(),
      };
      setChowkri([...chowkri, newChowkri]);
      setNewChowkriName("");
      setIsFormOpen(false);
    }
  };

  const handleSort = (key: keyof Chowkri) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const sortedChowkri = React.useMemo(() => {
    let sortableChowkri = [...chowkri];
    if (sortConfig !== null) {
      sortableChowkri.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableChowkri;
  }, [chowkri, sortConfig]);

  const filteredChowkri = sortedChowkri.filter(
    (chowkri) =>
      chowkri.chowkri.toLowerCase().includes(search.toLowerCase()) ||
      chowkri.chowkriCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Chowkri/Billing Area
        </h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search Chowkri..."
            className="px-6 py-2 mr-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Chowkri/Billing Area
          </button>
        </div>
      </div>
      {isFormOpen && <AddChowkri setIsFormOpen={setIsFormOpen} />}

      <div className="overflow-x-auto shadow-md rounded-lg mt-6">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                S.No.
              </th>
              <th
                className="px-6 py-4 text-lg font-semibold text-left cursor-pointer"
                onClick={() => handleSort("chowkri")}
              >
                Chowkri Name
                {sortConfig?.key === "chowkri" &&
                  (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
              <th
                className="px-6 py-4 text-lg font-semibold text-left cursor-pointer"
                onClick={() => handleSort("chowkriCode")}
              >
                Chowkri Code
                {sortConfig?.key === "chowkriCode" &&
                  (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredChowkri.map((chowkri) => (
              <tr key={chowkri.id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {chowkri.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {chowkri.chowkri}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {chowkri.chowkriCode}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit
                      onClick={() => handleEdit(chowkri.id)}
                      className="w-5 h-5 cursor-pointer text-blue-600"
                    />
                    <MdDelete
                      onClick={() => handleDelete(chowkri.id)}
                      className="w-5 h-5 cursor-pointer text-red-600"
                    />
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
