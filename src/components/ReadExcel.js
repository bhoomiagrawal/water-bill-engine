"use client";

import * as XLSX from "xlsx";
import { useState } from "react";
import Table from "react-bootstrap/Table";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from "react-bootstrap";
export default function ReadExcel() {
  const [items, setItems] = useState([]);
  const [allReadings, setAllReadings] = useState([]);

  // console.log("item",items)
  const readExcel = (file) => {
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
        console.log(data);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setItems(d);
    });
  };
  return (
    <div className="p-5 m-5">
      <input
        type="file"
        name="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <br></br>
      <br></br>
      <br></br>

      <Row>
        <Col lg={12}>
          <h3>The Data of The Uploaded Excel Sheet</h3>
          <Table>
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
              {items.map((datas, index) => (
                // console.log(allReadings,"datadsssssssssssssss",datas)
                // console.log(allReadings,"datadsssssssssssssss",typeof(datas['Meter reading']),datas['Meter reading'])
                // console.log(allReadings,"datadsssssssssssssss",typeof(datas?.__EMPTY_1),datas?.__EMPTY_1)
                // console.log("datadsssssssssssssss",typeof(datas?.Category), datas?.Category?.toLowerCase())

                <tr key={index}>
                  <td>{datas?.Category?.toLowerCase()}</td>
                  <td>{datas?.Size}</td>
                  <td>{datas["Meter reading"]}</td>
                  <td>{datas.__EMPTY_1}</td>
                  <td>{datas.__EMPTY_2}</td>
                  <td>{datas.__EMPTY_3}</td>
                  <td>{datas.__EMPTY_4}</td>
                  <td>{datas.__EMPTY_5}</td>
                  <td>{datas.__EMPTY_6}</td>
                  <td>{datas["Current consumption"]}</td>
                  <td>{datas["Permanent/temp"]}</td>
                  <td>{datas?.Rebate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
