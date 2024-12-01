"use client";
import React, { useState } from "react";
import AddCategory from "./AddCategory";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface Category {
  id: number;
  category: string;
  categoryCode: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, category: "Domestic", categoryCode: "D" },
    { id: 2, category: "Non-domestic", categoryCode: "ND" },
    { id: 3, category: "Industrial", categoryCode: "IN" },
    { id: 4, category: "Flat", categoryCode: "F" },
    { id: 5, category: "Own/private water supply", categoryCode: "" },
  ]);


  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Category;
    direction: "ascending" | "descending";
  } | null>({
    key: "category",
    direction: "ascending",
  });
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleEdit = (id: number) => {
    console.log("Edit category with id:", id);
  };

  const handleDelete = (id: number) => {
    const filteredCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(filteredCategories);
    console.log("Deleted category with id:", id);
  };

  const sortedCategories = React.useMemo(() => {
    let sortableCategories = [...categories];
    if (sortConfig !== null) {
      sortableCategories.sort((a, b) => {
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
    return sortableCategories;
  }, [categories, sortConfig]);

  const handleSort = (key: keyof Category) => {
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

  const filteredCategories = sortedCategories.filter(
    (category) =>
    
      category.category.toLowerCase().includes(search.toLowerCase()) ||
      category.categoryCode.toLowerCase().includes(search.toLowerCase())
      
  );

  return (
    <div className="mt-14 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Category</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search categories..."
            className="px-6 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3" // Increased width
          />
          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Category
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <AddCategory setIsPopupOpen={setIsPopupOpen} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg mt-6">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                S.No.
              </th>
              <th
                className="px-6 py-4 text-lg font-semibold text-left cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category Name
                {sortConfig?.key === "category" &&
                  (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
              <th
                className="px-6 py-4 text-lg font-semibold text-left cursor-pointer"
                onClick={() => handleSort("categoryCode")}
              >
                Category Code
                {sortConfig?.key === "categoryCode" &&
                  (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {category.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {category.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {category.categoryCode}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit
                      onClick={() => handleEdit(category.id)}
                      className="w-5 h-5 cursor-pointer text-blue-600"
                    />
                    <MdDelete
                      onClick={() => handleDelete(category.id)}
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

export default Category;
