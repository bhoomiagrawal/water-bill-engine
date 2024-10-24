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
    }
  }, [readings]);
  const getUI = () =>
    waterBill?.map((r, i) => {
      // console.log("value of waterbill array ",r?.stp?.toFixed(1))
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
          <td> {r.rebate}</td>
        </tr>
      );
    });
  const resetData = () => {
    // console.log("value of displayItem", displayItem)
    // readings.length = 0;
    setDisplayItem(false);
    setReadings([]);
    setWaterBill([]);
  };
  const downloadCSV = (waterBill) => {
    console.log("waterBill",waterBill)
    // Mapping for header names
    const headerMap = {
      1: "First Month",
      2: "Second Month",
      3: "Third Month",
      4: "Fourth Month",
      5: "Fifth Month",
      6: "Sixth Month",
      7: "Seventh Month",
      fixedCharge: "Fixed Charge",
      severageCharge: "Service Charge",
    };

    const csvRows = [];

    // Get headers from the data
    const headers = Object.keys(waterBill[0]);

    // Map headers according to headerMap
    const mappedHeaders = headers.map((header) => headerMap[header] || header);
    csvRows.push(mappedHeaders.map((header) => `"${header}"`).join(","));

    // Format rows
    for (const row of waterBill) {
      const values = headers.map((header) => {
        let value = row[header] || "";
        
        if (header === "fixedCharge") {
          value = row[header]?.fixed_charge || "";
        } else if (header === "severageCharge") {
          value = row[header]?.service_charge || "";
        }

        // Handle cases with commas or quotes in the values
        return `"${value.toString().replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(","));

      // console.log("csv data print here ",csvRows);
    }

    // Create CSV blob
    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvData);
    // Custom Formatting of Local Date and Time
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // Create a link and click it to download
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = `calculatedBilling${formattedDateTime}.csv`;
    document.body.appendChild(link); // Append to body to ensure it's in the DOM
    link.click();

    // Clean up
    document.body.removeChild(link); // Remove link from the DOM
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
            <ReadExcel setReadings={setReadings} displayItem={displayItem}/>

            {displayItem ? (
              <>
                <div className="p-2 m-2 mt-8">
                  <button
                    className="bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 hover:border-gray-400 rounded"
                    onClick={resetData}
                  >
                    Reset
                  </button>
                </div>
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
                        <th>Rebate</th>
                        {/* <th>Rebate</th>
                        <th>RebateCharge</th> */}
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
