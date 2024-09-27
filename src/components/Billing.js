import { useEffect, useState } from "react";
import ReadExcel from "./ReadExcel";
import { calculateWaterBill } from "@/components/calc";

export default function Billing() {
  const [readings, setReadings] = useState([]);
  const [displayItem, setDisplayItem] = useState(false);
  const [waterBill, setWaterBill] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // To store the selected record for printing

  const handleDownloadClick = (record) => {
    setSelectedRecord(record); // Set the selected record
    setShowPrintModal(true);
  };

  useEffect(() => {
    if (readings.length) {
      setWaterBill(calculateWaterBill(readings));
      setDisplayItem(true);
    }
  }, [readings]);

  const getUI = () =>
    waterBill?.map((r, i) => (
      <tr key={i} className="hover:bg-gray-100 transition-colors">
        <td>{r.category}</td>
        <td>{r.connection_size}</td>
        <td>{r.connection_type}</td>
        <td>{r.consumption}</td>
        <td>{r.meter_status}</td>
        <td>{r.basicCharge?.toFixed(2)}</td>
        <td>{r.minimum?.toFixed(1)}</td>
        <td>{r.waterCharge?.toFixed(1)}</td>
        <td>{r.severageCharge?.toFixed(1)}</td>
        <td>{r.stp?.toFixed(1)}</td>
        <td>{r.fixedCharge?.fixed_charge}</td>
        <td>{r.fixedCharge?.service_charge}</td>
        <td>{r.fixedCharge?.total_fixed_charge}</td>
        <td>{r.idc?.toFixed(1)}</td>
        <td>{r.bill?.toFixed(1)}</td>
        <td>{r.rebate}</td>
        <td>
          <button
            onClick={() => handleDownloadClick(r)} // Pass the entire record
            className="text-blue-600 underline hover:text-blue-800"
          >
            Download
          </button>
        </td>
      </tr>
    ));

  const resetData = () => {
    setDisplayItem(false);
    setReadings([]);
    setWaterBill([]);
  };

  const downloadCSV = (waterBill) => {
    // ... existing CSV download logic
  };

  const printSelectedRecord = () => {
    // Hide the main content
    document.body.classList.add("print-mode");

    // Trigger the print dialog
    window.print();

    // Remove the print mode class after printing
    document.body.classList.remove("print-mode");
  };

  return (
    <>
      <div className="bg-blue-100 relative isolate overflow-hidden py-24 sm:py-32 min-h-screen">
        <img
          alt=""
          src="/water-1560478_1280.png"
          style={{ opacity: "0.6" }}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="m-4">
          <div className="max-w-full lg:mx-0">
            <h2 className="m-2 text-4xl font-bold tracking-tight text-gray-900 -mt-20">
              Water Billing System
            </h2>
            <ReadExcel setReadings={setReadings} />

            {displayItem && (
              <>
                <div className="p-2 m-2 mt-8">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    onClick={resetData}
                  >
                    Reset
                  </button>
                </div>
                <div className="p-2 m-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded float-right"
                    onClick={() => downloadCSV(waterBill)}
                  >
                    Download
                  </button>
                  <h2 className="p-2 m-2 mt-8 font-bold text-center text-xl">
                    Water Bill Calculation
                  </h2>
                  <table className="min-w-full border-collapse mt-6 text-lg leading-8">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2">Ctgry</th>
                        <th className="px-4 py-2">Conn.Size</th>
                        <th className="px-4 py-2">Conn.Type</th>
                        <th className="px-4 py-2">Cnsmp.</th>
                        <th className="px-4 py-2">Mtr status</th>
                        <th className="px-4 py-2">Basic ch.</th>
                        <th className="px-4 py-2">Min. ch.</th>
                        <th className="px-4 py-2">Water ch.</th>
                        <th className="px-4 py-2">Svrge ch.</th>
                        <th className="px-4 py-2">STP</th>
                        <th className="px-4 py-2">Fixed ch.</th>
                        <th className="px-4 py-2">Mtr Srvc ch.</th>
                        <th className="px-4 py-2">Ttl Fxd ch.</th>
                        <th className="px-4 py-2">IDC</th>
                        <th className="px-4 py-2">Bill</th>
                        <th className="px-4 py-2">Rebate</th>
                        <th className="px-4 py-2">Comp Sh</th>
                      </tr>
                    </thead>
                    <tbody>{getUI()}</tbody>
                  </table>
                </div>

                {/* Print Modal */}
                {showPrintModal && selectedRecord && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[80%] max-h-[70vh] overflow-auto relative shadow-lg">
                      <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        onClick={() => setShowPrintModal(false)}
                      >
                        &times;
                      </button>

                      <div className="p-4 mx-auto">
                        <h1 className="text-2xl font-bold mb-4 text-center">
                          Public Health Engineering Department - Bill Computation Sheet
                        </h1>

                        {/* Consumer Details Section */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                          <table className="min-w-full border-collapse">
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2"><strong>Consumer Name:</strong> {selectedRecord.name || 'N/A'}</td>
                                <td className="border px-4 py-2"><strong>CIN:</strong> {selectedRecord.cin || 'N/A'}</td>
                                <td className="border px-4 py-2"><strong>Pipe Size:</strong> {selectedRecord.connection_size || 'N/A'}</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2"><strong>Bill Month:</strong> {selectedRecord.billMonth || 'N/A'}</td>
                                <td className="border px-4 py-2"><strong>Category:</strong> {selectedRecord.category || 'N/A'}</td>
                                <td className="border px-4 py-2"><strong>Consumption:</strong> {selectedRecord.consumption || 'N/A'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <h2 className="text-xl font-bold text-center mb-2">Billing Details</h2>
                        <table className="min-w-full border-collapse mt-2">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="px-4 py-2">Description</th>
                              <th className="px-4 py-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border px-4 py-2">Basic Charge</td>
                              <td className="border px-4 py-2">{selectedRecord.basicCharge?.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2">Water Charge</td>
                              <td className="border px-4 py-2">{selectedRecord.waterCharge?.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2">Total Bill</td>
                              <td className="border px-4 py-2">{selectedRecord.bill?.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="mt-4">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={printSelectedRecord} 
                          >
                            Print Bill
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body * {
            display: none; /* Hide everything on the page */
          }
          .print-mode * {
            display: block; /* Only show the content inside the print modal */
          }
          .print-mode {
            display: block; /* Ensure the modal is displayed */
          }
        }
      `}</style>
    </>
  );
}
