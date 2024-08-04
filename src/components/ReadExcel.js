"use client";

import * as XLSX from "xlsx";
import { useState } from "react";
import Table from "react-bootstrap/Table";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from "react-bootstrap";
export default function ReadExcel() {
  const [items, setItems] = useState([]);
  const [displayItem, setDisplayItem] = useState("false")
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
        setDisplayItem("true")
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
    <div className="p-2 m-2 mt-8">
      <label className="mt-6 text-lg leading-8 text-gray-300">Upload your file </label>
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
      {displayItem == 'true' ?
        <div>
          <table className="table table-striped mt-6 text-lg leading-8 text-gray-300">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
        :

        // console.log("Hide the data")
        <Row>
          <Col lg={12}>
            {/* <h3>The Data of The Uploaded Excel Sheet</h3> */}
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
                {items.map((datas, index) => (
                  console.log(datas, "datadsssssssssssssss", index + 1)
                  // console.log(allReadings,"datadsssssssssssssss",typeof(datas['Meter reading']),datas['Meter reading'])
                  // console.log(allReadings,"datadsssssssssssssss",typeof(datas?.__EMPTY_1),datas?.__EMPTY_1)
                  // console.log("datadsssssssssssssss",typeof(datas?.Category), datas?.Category?.toLowerCase())

                  // <tr key={index + 1}>
                  //   <td>{datas?.Category?.toLowerCase()}</td>
                  //   <td>{datas?.Size}</td>
                  //   <td>{datas["Meter reading"]}</td>
                  //   <td>{datas.__EMPTY_1}</td>
                  //   <td>{datas.__EMPTY_2}</td>
                  //   <td>{datas.__EMPTY_3}</td>
                  //   <td>{datas.__EMPTY_4}</td>
                  //   <td>{datas.__EMPTY_5}</td>
                  //   <td>{datas.__EMPTY_6}</td>
                  //   <td>{datas["Current consumption"]}</td>
                  //   <td>{datas["Permanent/temp"]}</td>
                  //   <td>{datas?.Rebate}</td>
                  // </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

      }



    </div>
  );
}
