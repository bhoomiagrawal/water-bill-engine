"use client";

import { useState } from "react";
import readXlsxFile from 'read-excel-file'

export default function ReadExcel({ setReadings }) {


  const handleReadExcel = (file) => {
    console.log(file, "fileeeeeeeeeeeeeeeeeeeee");
    readXlsxFile(file).then((rows) => {
      let arr1 = rows[0];
      let arr2 = rows[1];

      let keys = arr1.map((value, index) => {
        console.log('arr2[index]', arr2[index])
        return value === null ? (arr2[index]) : value.toLowerCase()
      });

      const valueSheet = rows.slice(2)

      const keyReplacements = {
        'category': 'category',
        'size': 'connection_size',
        'current consumption': 'current_consumption',
        'connection type': 'connection_type',
        'rebate': 'rebate',
        'severage': 'severage',
        'meter status': 'meter_status',
        'current': 'current_reading'
      };
      
      const mappedArray = valueSheet.map(values => {
        return keys.reduce((obj, key, index) => {
          let k = typeof (key) == String ? key.toLowerCase() : key;

          obj[k] = values[index];
          if (k == "meter reading") {

            obj[7] = values[index]
          }

          let newObj = Object.fromEntries(Object.entries(obj).map(([k, v]) => [keyReplacements[k] || k, v]))
          return newObj;
        }, {})


      }
      );
      setReadings(mappedArray)
    })
  };
  return (
    <div className="p-2 m-2 mt-8">
      <label className="mt-6 text-lg leading-8 font-bold text-gray">Upload your file </label>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          const file = e.target.files[0];
          handleReadExcel(file);
        }}
      />



    </div>
  );
}
