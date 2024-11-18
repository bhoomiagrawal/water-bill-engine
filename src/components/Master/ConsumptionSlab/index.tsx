'use client'
import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import AddConsumptionSlab from './AddConsumptionSlab';

interface ConsumptionSlab{
  id:number,
  category:string,
  consumption:string
}

const ConsumptionSlab = () => {

const [consumptionSlab,setConsumptionSlab] =useState<ConsumptionSlab[]>([
  { id: 1, category: 'Domestic',consumption:"0-8000" },
  { id: 2, category: 'Non-domestic' ,consumption:"8001-15000"},
  { id: 3, category: 'Industrial',consumption:"15001-40000" },
  { id: 4, category: 'Flat',consumption:"M 40001-60000" },
  { id: 4, category: 'Own/private water supply',consumption:"More Then 60000" },
]);

const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); 

const handleEdit=(id: number)=>{}
const handleDelete=(id: number)=>{}

return (
  <div className=" mx-auto p-6">
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Consumption Slab</h1>
    </div>

    <div className="flex justify-end mb-4">
      <button
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Add Consumption Slab
      </button>
    </div>

    {isPopupOpen && (
      <div >
        <AddConsumptionSlab setIsPopupOpen={setIsPopupOpen} />
      </div>
    )}

    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-gray-400 text-white">
          <tr>
          <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
            <th className="px-6 py-4 text-lg font-semibold text-left">Category</th>
            <th className="px-6 py-4 text-lg font-semibold text-left">Consumption Slab</th>
            <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>

          </tr>
        </thead>
        <tbody>
          {consumptionSlab.map((consumption) => (
            <tr key={consumption.id} className="border-t hover:bg-gray-100">
                              <td className="px-6 py-4 text-sm text-gray-800">{consumption.id}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{consumption.category}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{consumption.consumption}</td>

              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <MdEdit onClick={() => handleEdit(consumption.id)} className=' w-15  h-6  cursor-pointer'  />
                  <MdDelete onClick={() => handleDelete(consumption.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default ConsumptionSlab











































// "use client";
// import React, { useState } from "react";

// const ConsumptionSlab: React.FC = () => {
//   const [formValues, setFormValues] = useState({
//     consumptionSlab: "",
//   });

//   const [errors, setErrors] = useState<Partial<typeof formValues>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const validate = () => {
//     const newErrors: Partial<typeof formValues> = {};
//     if (!formValues.consumptionSlab) newErrors.consumptionSlab = "Consumption Slab is required";

//     return newErrors;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       // Handle successful submission here
//       console.log("Form submitted successfully:", formValues);
//     }
//   };

//   return (
//     <div className="mt-10 min-h-screen bg-gray-100">
//       <div className="mx-auto max-w-6xl">
//         <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-10 p-10"
//           >
//             <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//                 Create Consumption Slab
//               </h3>
//             </div>

//             <div>
//               <input
//                 type="number"
//                 name="consumptionSlab"
//                 value={formValues.consumptionSlab}
//                 placeholder="Enter Consumption Slab"
//                 onChange={handleChange}
//                 className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
//               />
//               {errors.consumptionSlab && (
//                 <div className="mt-1 text-red-600">{errors.consumptionSlab}</div>
//               )}
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-25 rounded bg-blue-500 py-3 text-xl font-bold text-white transition hover:bg-blue-600"
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

// export default ConsumptionSlab;
