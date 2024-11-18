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

  const handleEdit = (id: number) => {};
  const handleDelete = (id: number) => {};
  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Connection Size
        </h1>
      </div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
        >
          Add Connection Size
        </button>
      </div>

      {isFormOpen && (
        <div >
          <AddConnectionSize setIsFormOpen={setIsFormOpen} />
        </div>
      )}
      
      <div className="">
        <table className="min-w-full border-collapse bg-white">
        <thead className="bg-gray-400 text-white">
        <tr>
              <th className="px-6 py-4 text-left text-lg font-semibold">
                S.No.
              </th>
              
              <th className="px-6 py-4 text-left text-lg font-semibold">
                Connection Size(MM)
              </th>
              <th className="px-6 py-4 text-left text-lg font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {connectionSize && (
              <>
                {connectionSize.map((connection) => (
                  <tr
                    key={connection.id}
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {connection.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {connection.connectionSize}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <MdEdit
                          onClick={() => handleEdit(connection.id)}
                          className=" h-6  w-15  cursor-pointer"
                        />
                        <MdDelete
                          onClick={() => handleDelete(connection.id)}
                          className=" h-6  w-15  cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectionSize;

// "use client";
// import React, { useState } from "react";

// const ConnectionSize: React.FC = () => {
//   const [formValues, setFormValues] = useState({
//     connectionSize: "",
//   });

//   const [errors, setErrors] = useState<Partial<typeof formValues>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const validate = () => {
//     const newErrors: Partial<typeof formValues> = {};
//     if (!formValues.connectionSize) newErrors.connectionSize = "Connection Size is required";

//     return newErrors;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     }
//   };

//   return (
//     <div className="mt-10 min-h-screen  bg-gray-100 ">
//       <div className="mx-auto max-w-6xl">
//         <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark ">
//           <form
//             onSubmit={handleSubmit}
//             className=" flex  flex-col gap-10   space-x-13  p-10  "
//           >
//             <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
//               <h3 className="text-xl  font-bold text-gray-800 dark:text-white">
//               Create Connection Size(MM)
//               </h3>
//             </div>

//             <div>
//               <div>
//                 <input
//                   type="number"
//                   name="connectionSize"
//                   value={formValues.connectionSize}
//                   placeholder="Enter Connection Size"
//                   onChange={handleChange}
//                   className="w-full rounded-lg   border-2 border-[#aeaeaf]  bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none  dark:text-white dark:focus:border-primary"
//                 />
//               </div>
//               {/* {errors.connectionSize && <div className="mt-1 text-red-600">{errors.connectionSize}</div>} */}
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="  w-25  rounded bg-blue-500  py-3   text-xl font-bold text-white  transition hover:bg-blue-600"
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConnectionSize;
