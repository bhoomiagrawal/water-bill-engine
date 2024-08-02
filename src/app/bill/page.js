'use client';
import { calculateWaterBill } from "@/components/calc";
import { slabs } from "@/components/slabs";
import * as XLSX from "xlsx";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from 'react-bootstrap';
import { calculateWaterBill } from "@/components/calc";
// Example usage:
let readings = [
    {
        category: 'd',
        connection_size: '15mm',
        consumption: '45000',
        meter_status: "mf"
    }, {
        category: 'd',
        connection_size: '15mm',
        consumption: '20000',
        meter_status: "mf"

    }, {
        category: 'd',
        connection_size: '15mm',
        consumption: '15000',
        meter_status: "mf"

    },
    {
        category: 'd',
        connection_size: '15mm',
        consumption: '10000',
        meter_status: "mf"

    },
    {
        category: 'd',
        connection_size: '15mm',
        consumption: '15001',
        meter_status: "mf"

    },
    {
        category: 'd',
        connection_size: '15mm',
        consumption: '16000',
        meter_status: "mf"

    }]
let waterBill = calculateWaterBill(readings);
console.log('waterBill', waterBill)
// console.log(`The water bill for a consumption of ${consumption} litres is Rs. ${waterBill.toFixed(2)}`);

export default function Bill() {
    const [items, setItems] = useState([]);
    const [allReadings, setAllReadings] = useState([]);

    // console.log("item",items)
    const readExcel = (file) => {
        console.log(file, "fileeeeeeeeeeeeeeeeeeeee")
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            console.log(fileReader, "fileReaderfileReader")
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, {
                    type: "buffer"
                });
                console.log("dattttttttaaaaaaaaaaa", wb)
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                console.log("dattttttttaaaaaaaaaaa wsname wsname", wsname)
                console.log("ws111111111111111111111111111111111111111111111111111", ws)
                console.log(XLSX.utils.sheet_to_json, "{XLSX.utils.sheet_to_jsonXLSX.utils.sheet_to_json");
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


    const getUI = () => readings?.map((r, i) => {
        return (
            <ul key={i} className="flex justify-between">
                <li> category: {r.category}</li>
                <li> Connection Size: {r.connection_size}</li>
                <li> consumption: {r.consumption}</li>
                <li> meter status: {r.meter_status}</li>
                <li> water charge: {r.waterCharge?.toFixed(2)}</li>
                <li> minimum charge: {r.minimum?.toFixed(2)}</li>
                <li> Fixed charge: {r.fixedCharge?.fixed_charge}</li>
                <li> Meter Service charge: {r.fixedCharge?.service_charge}</li>
                <li> total Fixed charge: {r.fixedCharge?.total_fixed_charge}</li>
                <li> bill: {r.bill?.toFixed(2)}</li>

            </ul>

        )
    }

    )
    return (
        <main className=" min-h-screen  p-24">
            <h2>Water Bill Connection</h2>
            <div className="">
                {getUI()}
            </div>
            <input
                type="file"
                name="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                }}
            />
            {/* <input type="submit" value="Upload" /> */}
            {/* </form> */}
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
                            {items.map((datas, index) =>
                                // console.log(allReadings,"datadsssssssssssssss",datas)
                                // console.log(allReadings,"datadsssssssssssssss",typeof(datas['Meter reading']),datas['Meter reading'])
                                // console.log(allReadings,"datadsssssssssssssss",typeof(datas?.__EMPTY_1),datas?.__EMPTY_1)
                                // console.log("datadsssssssssssssss",typeof(datas?.Category), datas?.Category?.toLowerCase())

                                <tr key={index}>

                                    <td>{datas?.Category?.toLowerCase()}</td>
                                    <td>{datas?.Size}</td>
                                    <td>{datas['Meter reading']}</td>
                                    <td>{datas.__EMPTY_1}</td>
                                    <td>{datas.__EMPTY_2}</td>
                                    <td>{datas.__EMPTY_3}</td>
                                    <td>{datas.__EMPTY_4}</td>
                                    <td>{datas.__EMPTY_5}</td>
                                    <td>{datas.__EMPTY_6}</td>
                                    <td>{datas['Current consumption']}</td>
                                    <td>{datas['Permanent/temp']}</td>
                                    <td>{datas?.Rebate}</td>

                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </main>
    );
}
