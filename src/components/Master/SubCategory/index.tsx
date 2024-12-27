"use client";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import AddSubCategory from "./AddSubCategory";

interface SubCategory {
  id: number;
  category: string;
  subCategory: string;
}

const SubCategory: React.FC = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    {
      id: 1,
      category: "Domestic",
      subCategory: "All Government educations institution",
    },
    { id: 2, category: "Non-domestic", subCategory: "Shops" },
    { id: 3, category: "Industrial", subCategory: "" },
    { id: 4, category: "Flat", subCategory: "" },
    { id: 5, category: "Own/private water supply", subCategory: "Hotel" },
  ]);

  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SubCategory;
    direction: "ascending" | "descending";
  } | null>({
    key: "category",
    direction: "ascending",
  });

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleEdit = (id: number) => {
    console.log("Edit subcategory with id:", id);
  };

  const handleDelete = (id: number) => {
    setSubCategories(
      subCategories.filter((subCategory) => subCategory.id !== id)
    );
    console.log("Deleted subcategory with id:", id);
  };

  const sortedSubCategories = React.useMemo(() => {
    let sortableSubCategories = [...subCategories];
    if (sortConfig !== null) {
      sortableSubCategories.sort((a, b) => {
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
    return sortableSubCategories;
  }, [subCategories, sortConfig]);

  const handleSort = (key: keyof SubCategory) => {
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

  const filteredSubCategories = sortedSubCategories.filter(
    (subCategory) =>
      subCategory.category.toLowerCase().includes(search.toLowerCase()) ||
      subCategory.subCategory.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sub Category</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search subcategories..."
            className="px-6 py-2 mr-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" // Adjust width for balance
          />

          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Sub Category
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div>
          <AddSubCategory setIsPopupOpen={setIsPopupOpen} />
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
                onClick={() => handleSort("subCategory")}
              >
                Sub Category Name
                {sortConfig?.key === "subCategory" &&
                  (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
              <th className="px-6 py-4 text-lg font-semibold text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubCategories.map((subCategory) => (
              <tr key={subCategory.id} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {subCategory.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {subCategory.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {subCategory.subCategory}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit
                      onClick={() => handleEdit(subCategory.id)}
                      className="w-5 h-5 cursor-pointer text-blue-600"
                    />
                    <MdDelete
                      onClick={() => handleDelete(subCategory.id)}
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

export default SubCategory;
