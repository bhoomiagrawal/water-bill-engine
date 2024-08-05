"use client";

import { useState } from "react";
import readXlsxFile from 'read-excel-file'

export default function ReadExcel({  setReadings }) {
  


  const handleReadExcel = (file) => {
    console.log(file, "fileeeeeeeeeeeeeeeeeeeee");
    readXlsxFile(file).then((rows) => {
      let arr1 = rows[0];
      let arr2 = rows[1];
      
      let keys = arr1.map((value, index) => value === null ? arr2[index] : value);

      const valueSheet = rows.slice(2)

      const mappedArray = valueSheet.map(values =>
        keys.reduce((obj, key, index) => {
          obj[key] = values[index];
          return obj;
        }, {})
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
