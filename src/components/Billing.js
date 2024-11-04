// components/FirstUI.js

import { useEffect, useState } from "react";
import ReadExcel from "./ReadExcel";
import { calculateWaterBill } from "@/components/calc";
import DataTable from "./DataTable";
import ComputationSheet from "./ComputationSheet";
import Loader from "@/svg/Loader";

export default function Billing() {
  const [readings, setReadings] = useState([]);
  const [displayItem, setDisplayItem] = useState(false);
  const [waterBill, setWaterBill] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // To store the selected record for printing
  const [loading, setLoading] = useState(false)

  const toggleComputation = (record) => {
    console.log("data pass ", record)
    setSelectedRecord(record); // Set the selected record
    setShowPrintModal(true);
  };

  useEffect(() => {
    if (readings.length) {
      setWaterBill(calculateWaterBill(readings));


      setDisplayItem(true);
      setLoading(false)
    }
  }, [readings]);






  const resetData = () => {
    // console.log("value of displayItem", displayItem)
    // readings.length = 0;
    setDisplayItem(false);
    setReadings([]);
    setWaterBill([]);
  };
  // const downloadCSV = (waterBill) => {
  //   console.log("waterBill", waterBill)
  //   // Mapping for header names
  //   const headerMap = {
  //     1: "First Month",
  //     2: "Second Month",
  //     3: "Third Month",
  //     4: "Fourth Month",
  //     5: "Fifth Month",
  //     6: "Sixth Month",
  //     7: "Seventh Month",
  //     fixedCharge: "Fixed Charge",
  //     severageCharge: "Service Charge",
  //   };

  //   const csvRows = [];

  //   // Get headers from the data
  //   const headers = Object.keys(waterBill[0]);

  //   // Map headers according to headerMap
  //   const mappedHeaders = headers.map((header) => headerMap[header] || header);
  //   csvRows.push(mappedHeaders.map((header) => `"${header}"`).join(","));

  //   // Format rows
  //   for (const row of waterBill) {
  //     const values = headers.map((header) => {
  //       let value = row[header] || "";

  //       if (header === "fixedCharge") {
  //         value = row[header]?.fixed_charge || "";
  //       } else if (header === "sewerageCharge") {
  //         value = row[header]?.service_charge || "";
  //       }

  //       // Handle cases with commas or quotes in the values
  //       return `"${value.toString().replace(/"/g, '""')}"`;
  //     });
  //     csvRows.push(values.join(","));

  //     // console.log("csv data print here ",csvRows);
  //   }

  //   // Create CSV blob
  //   const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
  //   const csvUrl = URL.createObjectURL(csvData);
  //   // Custom Formatting of Local Date and Time
  //   const now = new Date();

  //   const year = now.getFullYear();
  //   const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  //   const day = String(now.getDate()).padStart(2, "0");
  //   const hours = String(now.getHours()).padStart(2, "0");
  //   const minutes = String(now.getMinutes()).padStart(2, "0");
  //   const seconds = String(now.getSeconds()).padStart(2, "0");

  //   const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //   // Create a link and click it to download
  //   const link = document.createElement("a");
  //   link.href = csvUrl;
  //   link.download = `calculatedBilling${formattedDateTime}.csv`;
  //   document.body.appendChild(link); // Append to body to ensure it's in the DOM
  //   link.click();

  //   // Clean up
  //   document.body.removeChild(link); // Remove link from the DOM
  //   URL.revokeObjectURL(csvUrl);
  // };

  const columns = [
    { header: "CID", accessor: "cid" },
    { header: "Ctgry", accessor: "category" },
    { header: "Conn.Size", accessor: "meter_size" },
    { header: "conn. type", accessor: "connection_type" },
    { header: "Cnsmp", accessor: "consumption" },
    { header: "Mtr status", accessor: "meter_stts" },
    {
      header: "Basic ch.", accessor: "basicCharge", Cell: (row) =>
        (row.basicCharge).toFixed(2)
    },
    { header: "Min. ch.", accessor: "minimum" },
    {
      header: "Water ch.", accessor: "waterCharge", Cell: (row) =>
        (row.basicCharge).toFixed(2)
    },
    { header: "billing agency Water ch.", accessor: "curr_watr" },
    { header: "Swrge ch.", accessor: "sewerageCharge" },
    { header: "STP", accessor: "stpCharge" },
    { header: "billing agency Swrge ch.", accessor: "curr_swtx" },
    { header: "Fixed ch.", accessor: "fixedCharge.fixed_charge" },
    { header: "Mtr Srvc ch.", accessor: "fixedCharge.service_charge" },
    {
      header: "IDC", accessor: "idc", Cell: (row) =>
        (row.idc).toFixed(2)
    },
    { header: "billing agency IDC", accessor: "curr_devp" },

    {
      header: "Bill", accessor: "bill", Cell: (row) =>
        Math.round(row.bill)
    },

    { header: "Rebate", accessor: "rebate" },



    { header: "Prev Cnsmp", accessor: "prev.consumption" },
    { header: "Prev Mtr status", accessor: "prev.meter_stts" },
    {
      header: "Prev Basic ch.", accessor: "prev.basicCharge", Cell: (row) =>
        (row.prev.basicCharge)?.toFixed(2)
    },
    { header: "Prev Min. ch.", accessor: "prev.minimum" },
    {
      header: "Prev Water ch.", accessor: "prev.waterCharge", Cell: (row) =>
        (row.prev.waterCharge)?.toFixed(2)
    },
    { header: "billing agency Prev Water ch.", accessor: "curr_watr1" },
    { header: "Prev Swrge ch.", accessor: "prev.sewerageCharge" },
    { header: "Prev STP", accessor: "prev.stpCharge" },
    { header: "billing agency Prev Swrge ch.", accessor: "curr_swtx1" },
    { header: "Prev Fixed ch.", accessor: "prev.fixedCharge.fixed_charge" },
    { header: "Prev Mtr Srvc ch.", accessor: "prev.fixedCharge.service_charge" },
    {
      header: "Prev IDC", accessor: "prev.idc", Cell: (row) =>
        (row.prev.idc)?.toFixed(2)
    },

    { header: "billing agency Prev IDC", accessor: "prev.curr_devp1" },
    {
      header: "Prev Bill", accessor: "prev.bill", Cell: (row) =>
        (row.prev.bill)?.toFixed(2)
    },
    { header: "Prev Rebate", accessor: "prev.rebate" },
    { header: "two month Bill", accessor: "two_mnth_bill" },
    {
      header: "billing agency two month Bill", accessor: "", Cell: (row) => {
        return row.curr_watr + row.curr_swtx + row.curr_metr + row.curr_capt + row.curr_devp + row.curr_watr1 + row.curr_swtx1 + row.curr_metr1 + row.curr_capt1 + row.curr_devp1
      }
    },
    { header: "LPS", accessor: "lps" },
    { header: "billing agency LPS", accessor: "lps_amt" },
    { header: "Ostd Amt", accessor: "ostd_amt" },
    { header: "Ostd Int", accessor: "ostd_int" },

    { header: "total amount (2mnth bill+ostd amt)", accessor: "total_amount" },
    { header: "billing agency total amount (2mnth bill+ostd amt)", accessor: "tot_amt_indate" },

    {
      header: "Computation Sheet", accessor: "", Cell: (row) => {
        return (
          <button
            onClick={() => toggleComputation(row)} // Pass the entire record
            className="text-blue-600 underline hover:text-blue-800"
          >
            Open
          </button>
        )
      }
    },







  ];

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
            <ReadExcel setReadings={setReadings} displayItem={displayItem} setLoading={setLoading}/>


            {
              loading ? <Loader /> :
                displayItem ? (
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
                      {/* <button
                      className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 hover:border-blue-500 rounded float-right"
                      onClick={() => downloadCSV(waterBill)}
                    >
                      Download
                    </button> */}
                      <h2 className="p-2 m-2 mt-8 font-bold text-center">
                        Water Bill Calculation
                      </h2>




                      <DataTable data={waterBill} columns={columns} />
                    </div>
                    {/* Print Modal */}
                    {showPrintModal && selectedRecord && (
                      <ComputationSheet
                        selectedRecord={selectedRecord}
                        setShowPrintModal={setShowPrintModal}
                      />
                    )}
                  </>
                ) : (
                  ""
                )
            }

            { }
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
