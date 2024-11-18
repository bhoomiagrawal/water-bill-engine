
'use client'
import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import AddMeterStatus from './AddMeterStatus';

interface MeterStatus{
  id:number,
  MeterStatus:string
}

const MeterStatus:React.FC = () => {

  const [MeterStatus,setMeterStatus]= useState<MeterStatus[]>([
    { id: 1, MeterStatus: 'ok' },
    { id: 2, MeterStatus: 'Now Meter Status is Good' },
    { id: 3, MeterStatus: 'Meter is not Working' },
  ]);

const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); 

const handleEdit=(id:number)=>{}
const handleDelete=(id:number)=>{}

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meter Status</h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
       Add Meter Status
        </button>
      </div>

      {isPopupOpen && (
        <div >
          <AddMeterStatus setIsPopupOpen={setIsPopupOpen} />
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">S.No.</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Meter Status</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MeterStatus.map((MeterStatus) => (
              <tr key={MeterStatus.id} className="border-t hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">{MeterStatus.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{MeterStatus.MeterStatus}</td>

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <MdEdit onClick={() => handleEdit(MeterStatus.id)} className=' w-15  h-6  cursor-pointer'  />
                    <MdDelete onClick={() => handleDelete(MeterStatus.id)} className=' w-15  h-6  cursor-pointer'/>
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

export default MeterStatus









































// "use client";
// import React, { useState } from "react";

// const MeterStatus: React.FC = () => {
//   const [formValues, setFormValues] = useState({
//     meterStatus: "",
//   });

//   const [errors, setErrors] = useState<Partial<typeof formValues>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const validate = () => {
//     const newErrors: Partial<typeof formValues> = {};
//     if (!formValues.meterStatus) newErrors.meterStatus = "Meter Status is required";

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
//               Create Meter Status

//               </h3>
//             </div>

//             <div>
//               <input
//                 type="text"
//                 name="meterStatus"
//                 value={formValues.meterStatus}
//                 placeholder="Enter Meter Status"
//                 onChange={handleChange}
//                 className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-2xl text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
//               />
//               {errors.meterStatus && (
//                 <div className="mt-1 text-red-600">{errors.meterStatus}</div>
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

// export default MeterStatus;






