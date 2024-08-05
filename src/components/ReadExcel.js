"use client";

import * as XLSX from "xlsx";
import { useState } from "react";
export default function ReadExcel({displayItem, setDisplayItem}) {
  const [items, setItems] = useState([]);
  const [allReadings, setAllReadings] = useState([]);

  // console.log("item",items)
  const handleReadExcel = (file) => {
    console.log(file, "fileeeeeeeeeeeeeeeeeeeee");
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      console.log(fileReader, "fileReaderfileReader");
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
        });
        console.log("dattttttttaaaaaaaaaaa", wb);
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        console.log("dattttttttaaaaaaaaaaa wsname wsname", wsname);
        console.log(
          "ws111111111111111111111111111111111111111111111111111",
          ws
        );
        console.log(
          XLSX.utils.sheet_to_json,
          "{XLSX.utils.sheet_to_jsonXLSX.utils.sheet_to_json"
        );
        const data = XLSX.utils.sheet_to_json(ws);
        setDisplayItem("true")
        console.log(data);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        console.log('error', error)
        reject(error);
      };
    });
    promise.then((d) => {
      console.log('d', d)
      setItems(d);
    });
  };
  return (
    <div className="p-2 m-2 mt-8">
      <label className="mt-6 text-lg leading-8 text-gray-300">Upload your file </label>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          const file = e.target.files[0];
          handleReadExcel(file);
        }}
      />

      <br></br>
      <br></br>
      <br></br>
     
        {/* <Row>
          <Col lg={12}>
            <Table className="table mt-6 text-lg leading-8 text-gray-300">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Meter reading</th>
                  <th>UserName</th>
                  <th>Email Id</th>
                  <th>Password</th>
                  <th>Test Date</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </Table>
          </Col>
        </Row> */}

      



    </div>
  );
}
