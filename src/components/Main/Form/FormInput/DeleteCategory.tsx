import React, { useEffect } from "react";
import { useInternalService } from "@/components/hook/useInternalService";
import { toast } from "react-toastify"; 

interface DeleteCategoryProps {
  setIsPopupDelete: (value: boolean) => void;
  deleteId: number;
  onDeleteCategory: () => void;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({
  setIsPopupDelete,
  deleteId,
  onDeleteCategory
}) => {
  const [deleteRequest, deleteResult, deleteinProgress, deleteError] = useInternalService(
    "http://localhost:8080/api/category", 
    "DELETE",
    null
  );

  useEffect(() => {
    if (deleteResult?.data?.msg) {
      toast.success("Category deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      onDeleteCategory();  // Refresh categories after deletion
      setIsPopupDelete(false); 
    }
  }, [deleteResult, setIsPopupDelete, onDeleteCategory]);

  useEffect(() => {
    if (deleteError) {
      toast.error("Failed to delete category", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  }, [deleteError]);

  const handleDelete = () => {
    if (deleteId) {
      deleteRequest(null, [deleteId.toString()]);  
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-100 relative  w-full md:w-[550px] m-auto rounded-md">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
            <p className="bg-white text-black-2 text-center py-4 text-xl font-semibold">
              Are you sure you want to delete this category?
            </p>

            <div className="flex justify-center space-x-4 py-6 bg-gray-200 rounded-b-lg">
              <button
                onClick={handleDelete}
                disabled={deleteinProgress} 
                className={`bg-red-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-200 ${deleteinProgress ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {deleteinProgress ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setIsPopupDelete(false)}
                className="bg-white text-gray-800 px-6 py-2 rounded-md text-lg font-semibold border border-gray-300 hover:bg-gray-100 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
