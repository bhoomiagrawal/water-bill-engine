"use client";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import AddConnectionSize from "./AddConnectionSize";

interface connectionSize {
  id: number;
  connectionSize: number;
}

const ConnectionSize: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [connectionSize, setConnectionSize] = useState<connectionSize[]>([
    { id: 1, connectionSize: 15 },
    { id: 2, connectionSize: 20 },
    { id: 3, connectionSize: 25 },
    { id: 4, connectionSize: 40 },
    { id: 5, connectionSize: 50 },
    { id: 6, connectionSize: 80 },
    { id: 7, connectionSize: 100 },
    { id: 8, connectionSize: 160 },
  ]);
  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof connectionSize;
    direction: "ascending" | "descending";
  } | null>({ key: "connectionSize", direction: "ascending" });
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  const filterconnectionSize =
    search === ""
      ? connectionSize
      : connectionSize.filter((connection) =>
          connection.connectionSize.toString().includes(search)
        );

  const handleSort = (key: keyof connectionSize) => {
    let direction: "ascending" | "descending" = "ascending";

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  const sortedAccounts = [...filterconnectionSize].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    if (a[key] < b[key]) {
      return direction === "ascending" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleEdit = (id: number) => {};
  const handleDelete = (id: number) => {};

  return (
    <div className="mt-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Connection Size</h1>

        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search connection size..."
            className="px-6 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          />
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Connection Size
          </button>
        </div>
      </div>

      {isFormOpen && <AddConnectionSize setIsFormOpen={setIsFormOpen} />}

      <div>
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-lg font-semibold">S.No.</th>
              <th
                className="px-6 py-4 text-left text-lg font-semibold"
                onClick={() => handleSort("connectionSize")}
              >
                Connection Size(MM)
                {sortConfig?.key === "connectionSize" &&
                  (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
              <th className="px-6 py-4 text-left text-lg font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedAccounts.length > 0 ? (
              sortedAccounts.map((connection) => (
                <tr key={connection.id} className="border-t hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-800">{connection.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{connection.connectionSize}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <MdEdit
                        onClick={() => handleEdit(connection.id)}
                        className="w-5 h-5 cursor-pointer text-blue-600"
                      />
                      <MdDelete
                        onClick={() => handleDelete(connection.id)}
                        className="w-5 h-5 cursor-pointer text-red-600"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-sm text-gray-800">
                  Please Enter valid Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectionSize;
