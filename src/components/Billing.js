// components/FirstUI.js

import { useEffect, useState } from "react";
import ReadExcel from "./ReadExcel";
import { calculateWaterBill } from "@/components/calc";

export default function Billing() {
  const [readings, setReadings] = useState([]);
  const [displayItem, setDisplayItem] = useState(false);
  const [waterBill, setWaterBill] = useState([]);

  useEffect(() => {
    if (readings.length) {
      setWaterBill(calculateWaterBill(readings));
      setDisplayItem(true);
      console.log(
        "waterBillwaterBillwaterBillwaterBill!!!!!!!!!!!!!!!!!!!!!!",
        waterBill
      );
    }
  }, [readings.length]);
  const getUI = () =>
    waterBill?.map((r, i) => {
      return (
        <tr key={i}>
          <td> {r.category}</td>
          <td> {r.connection_size}</td>
          <td> {r.connection_type}</td>
          <td> {r.consumption}</td>
          {/* <td> {r.averageConsumption}</td> */}
          <td> {r.meter_status}</td>
          <td> {r.basicCharge?.toFixed(2)}</td>
          <td> {r.minimum?.toFixed(1)}</td>
          <td> {r.waterCharge?.toFixed(1)}</td>
          <td> {r.severageCharge?.toFixed(1)}</td>
          <td> {r.stp?.toFixed(1)}</td>
          <td> {r.fixedCharge?.fixed_charge}</td>
          <td> {r.fixedCharge?.service_charge}</td>
          <td> {r.fixedCharge?.total_fixed_charge}</td>
          <td> {r.idc?.toFixed(1)}</td>
          {/* <td> {Math.round(r.bill)}</td> */}
          <td> {r.bill?.toFixed(1)}</td>
        </tr>
      );
    });
  const downloadCSV = (waterBill) => {
    const csvRows = [];

    // Get headers
    const headers = Object.keys(waterBill[0]);
    csvRows.push(headers.join(","));

    // console.log("my data is here ",headers)
    // Format rows
    for (const row of waterBill) {
      // const values = headers.map(header => JSON.stringify(row[header] || ''));
      const values = headers.map((header) =>
        JSON.stringify(
          header == "fixedCharge"
            ? row[header].fixed_charge
            : header == "severageCharge"
            ? row["fixedCharge"].service_charge
            : row[header] || ""
        )
      );
      
      csvRows.push(values.join(","));
    }

    // Create CSV blob
    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvData);
    console.log(csvData);

    // Create a link and click it to download
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "data.csv";
    link.click();

    // Clean up
    URL.revokeObjectURL(csvUrl);
  };
  return (
    <>
      <div className="bg-blue-100 relative isolate overflow-hidden py-24 sm:py-32 min-h-screen">
        <img
          alt=""
          src="/water-1560478_1280.png"
          style={{ opacity: "0.6" }}
          // src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="m-4">
          <div className=" max-w-full lg:mx-0">
            <h2 className="m-2 text-4xl font-bold tracking-tight text-gray -mt-20">
              Water Billing System
            </h2>
            <ReadExcel setReadings={setReadings} />

            {displayItem ? (
              <>
                <div className="p-2 m-2">
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 hover:border-blue-500 rounded float-right"
                    onClick={() => downloadCSV(waterBill)}
                  >
                    Download
                  </button>
                  <h2 className="p-2 m-2 mt-8 font-bold text-center">
                    Water Bill Calculation
                  </h2>
                  <table
                    className="table table-striped mt-6 text-lg leading-8 "
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr className="row-auto ">
                        <th>Ctgry</th>
                        <th>Conn.Size</th>
                        <th>Conn.Type</th>
                        <th>Cnsmp.</th>
                        {/* <th>Average Consumption</th> */}
                        <th>Mtr status</th>
                        <th>Basic ch.</th>
                        <th>Min. ch.</th>
                        <th>Water ch.</th>
                        <th>Svrge ch.</th>
                        <th>STP</th>
                        <th>( Fixed ch.+</th>
                        <th>Mtr Srvc ch.=</th>
                        <th>Ttl Fxd ch.)</th>
                        <th>IDC</th>
                        <th>Bill</th>
                      </tr>
                    </thead>
                    <tbody>{getUI()}</tbody>
                  </table>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div>
        <footer
          style={{
            textAlig: "center",
            padding: "10px",
            backgroundColor: "#f0f8ff",
            color: "#007acc",
          }}
        >
          <p className="text-center ">
            &copy; {new Date().getFullYear()} Water Billing System.
          </p>
        </footer>
      </div>
    </>
  );
}
