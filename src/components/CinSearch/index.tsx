'use client'
import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { MdOutlinePayment } from "react-icons/md";




const CinSearch: React.FC = () => {






  return (
    <>
      <div className=' flex justify-between'>
                <div>
                    <h2>CIN</h2>
                    <p>140120413863</p>
                </div>
                <div>
                    <h2>Name</h2>
                    <p>AABIT</p>
                </div>
                <div>
                    <h2>Mobile No.</h2>
                    <p>123456789</p>
                </div>
                <div>
                    <h2>Address</h2>
                    <p>B-203,sanjay nagar maharika naka jaipur</p>
                </div>
                <div>
                    <h2>Account Number</h2>
                    <p>09-04-021</p>
                </div>
                <div>
                    <h2>Category</h2>
                    <p>Domestic</p>
                </div>
                <div>
                    <h2>Connection Size(MM)</h2>
                    <p>12mm</p>
                </div>
                <div>
                    <h2>Supply Zone Number</h2>
                    <p>02</p>
                </div>

            </div>
            <div className=" mx-auto p-6">
      <div className="mb-6">
      </div>

   

   

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
            <th className="px-6 py-4 text-lg font-semibold text-left">Bill Month</th>
            
              <th className="px-6 py-4 text-lg font-semibold text-left">Amount</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Due Date</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Date of Payment</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Mode of Payment</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Transation ID</th>
              <th className="px-6 py-4 text-lg font-semibold text-left">Action</th>

            </tr>
          </thead>
          <tbody>
           
              <tr className="border-t hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">Jan</td>
                <td className="px-6 py-4 text-sm text-gray-800">375</td>
                <td className="px-6 py-4 text-sm text-gray-800">7/1/24</td>
                <td className="px-6 py-4 text-sm text-gray-800">6/1/24</td>
                <td className="px-6 py-4 text-sm text-gray-800">Bhim</td>
                <td className="px-6 py-4 text-sm text-gray-800">1234</td>

                

                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                  <GrView className=' w-15  h-6  cursor-pointer'/>
                    <MdEdit  className=' w-15  h-6  cursor-pointer'  />
                    <MdOutlinePayment  className=' w-15  h-6  cursor-pointer '/>
                  </div>
                </td>
              </tr>
              <tr>
              <td className="px-6 py-4 text-sm text-gray-800">March</td>
                <td className="px-6 py-4 text-sm text-gray-800">450</td>
                <td className="px-6 py-4 text-sm text-gray-800">7/3/24</td>
                <td className="px-6 py-4 text-sm text-gray-800">7/1/24</td>
                <td className="px-6 py-4 text-sm text-gray-800">case</td>
                <td className="px-6 py-4 text-sm text-gray-800">0295</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                  <GrView className=' w-15  h-6  cursor-pointer'/>
                    <MdEdit  className=' w-15  h-6  cursor-pointer'  />
                    <MdOutlinePayment  className=' w-15  h-6  cursor-pointer '/>
                  </div>
                </td>
              </tr>
              <tr>
              <td className="px-6 py-4 text-sm text-gray-800">may</td>
                <td className="px-6 py-4 text-sm text-gray-800">350</td>
                <td className="px-6 py-4 text-sm text-gray-800">7/5/24</td>
                <td className="px-6 py-4 text-sm text-gray-800">6/4/24</td>
                <td className="px-6 py-4 text-sm text-gray-800">Bhime</td>
                <td className="px-6 py-4 text-sm text-gray-800">12578</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                  <GrView className=' w-15  h-6  cursor-pointer'/>
                    <MdEdit  className=' w-15  h-6  cursor-pointer'  />
                    <MdOutlinePayment  className=' w-15  h-6  cursor-pointer '/>
                  </div>
                </td>
              </tr>
              <tr>
              <td className=" text-sm text-gray-800 border-2   bg-green-600    text-center">July</td>
              <td className="px-6 py-4 text-sm text-gray-800">400</td>
                <td className="px-6 py-4 text-sm text-gray-800">7/7/24</td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                  <GrView className=' w-15  h-6  cursor-pointer'/>
                    <MdEdit  className=' w-15  h-6  cursor-pointer'  />
                    <MdOutlinePayment  className=' w-15  h-6  cursor-pointer '/>
                  </div>
                </td>
              </tr>
              <tr>
              <td className="px-6 py-4 text-sm text-gray-800">Sep</td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                  <GrView className=' w-15  h-6  cursor-pointer'/>
                    <MdEdit  className=' w-15  h-6  cursor-pointer'  />
                    <MdOutlinePayment  className=' w-15  h-6  cursor-pointer '/>
                  </div>
                </td>
              </tr>
              <tr>
              <td className="px-6 py-4 text-sm text-gray-800">Nov</td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4 text-sm text-gray-800"></td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                  <GrView className=' w-15  h-6  cursor-pointer'/>
                    <MdEdit  className=' w-15  h-6  cursor-pointer'  />
                    <MdOutlinePayment  className=' w-15  h-6  cursor-pointer '/>
                  </div>
                </td>
              </tr>
            
          </tbody>
        </table>
      </div>
    </div>
    </>
  
  );
};

export default CinSearch;

