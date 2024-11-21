import React from "react";
import ComputationData from "./ComputationData";

const ComputationSheet = ({ selectedRecord, setShowPrintModal }) => {
  console.log("data acess from billing js",selectedRecord);
  const {prev} = selectedRecord
  const printSelectedRecord = () => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
  
    // const doc = iframe.contentWindow.document;
    // doc.open();
    // doc.write(`
    //   <html>
    //     <head>
    //       <style>
    //         body {
    //           font-family: Arial, sans-serif;
    //           margin: 0;
    //           padding: 5px;
    //           font-size: 8px;
    //         }
    //         table {
    //           width: 100%;
    //           border-collapse: collapse;
    //           margin-bottom: 2px;
    //         }
    //         th, td {
    //           border: 1px solid #ccc;
    //           padding: 1px;
    //           text-align: left;
    //         }
    //         th {
    //           background-color: #f2f2f2;
    //         }
    //         .title {
    //           text-align: center;
    //           margin-bottom: 5px;
    //         }
    //         @media print {
    //           body {
    //             -webkit-print-color-adjust: exact;
    //             height: 100vh;
    //             overflow: hidden;
    //           }
    //           table {
    //             page-break-inside: avoid;
    //           }
    //           /* Hide unwanted headers/footers */
    //           header, footer, nav, .unwanted-class, .no-print {
    //             display: none !important;
    //           }
    //           /* Hide browser specific headers and footers if possible */
    //           @page {
    //             margin: 10mm; /* Adjust margin if needed */
    //           }
    //         }
    //       </style>
    //     </head>
    //     <body>
    //       <div class="title">
    //         <h2 style="color: #007BFF; font-size: 10px;">PUBLIC HEALTH ENGINEERING DEPARTMENT</h2>
    //         <p style="font-size: 8px;">RAJASTHAN, JAIPUR</p>
    //         <hr />
    //         <h3 style="font-size: 9px;">Bill Computation Sheet</h3>
    //       </div>
    //       <div>
    //         <table>
    //           <tbody>
    //             <tr>
    //               <td>Consumer Name:</td>
    //               <td>${selectedRecord.name || "N/A"}</td>
    //             </tr>
    //             <tr>
    //               <td>CIN:</td>
    //               <td>${selectedRecord.cid || "N/A"}</td>
    //               <td>Pipe Size:</td>
    //               <td>${selectedRecord?.meter_size || "N/A"}</td>
    //             </tr>
    //             <tr>
    //               <td>Bill Month:</td>
    //               <td>${selectedRecord.billMonth || "N/A"}</td>
    //               <td>Consumer Category:</td>
    //               <td>
    //                  <strong>
    //              ${selectedRecord?.category == 'd' ? 'Domestic' 
    //                   : selectedRecord?.category == 'nd' ? 'Non Domestic'
    //                   : selectedRecord?.category == 'id' ? 'Industrial'
    //                   :selectedRecord?.category
    //                   }
    //               </strong> 
    //               </td>
    //             </tr>
    //             <tr>
    //               <td colSpan="4">Month Wise Water Charges Description:</td>
    //             </tr>
    //             <tr>
    //               <td>Last Month, Average Three Months & Last 12 Month Readings:</td>
    //               <td>${selectedRecord?.consumption},${selectedRecord?.averageConsumption} & ${selectedRecord?.averageConsumption}</td>
    //             </tr>
    //             <tr>
    //               <td><strong>Month:</strong></td>
    //               <td><strong>MAY-2021</strong></td>
    //               <td><strong>Average Consumption:</strong></td>
    //               <td><strong>${selectedRecord?.averageConsumption}</strong></td>
    //             </tr>
    //             <tr>
    //               <td><strong>Previous Reading:</strong></td>
    //               <td><strong>0</strong></td>
    //               <td><strong>Current Reading:</strong></td>
    //               <td><strong>0</strong></td>
    //             </tr>
    //             <tr>
    //               <td><strong>Fault Code:</strong></td>
    //               <td><strong>${selectedRecord?.meter_stts.toUpperCase()}</strong></td>
    //               <td><strong>Total Consumption:</strong></td>
    //               <td><strong>20880</strong></td>
    //             </tr>
    //             <tr>
    //               <td><strong>Charge Name:</strong></td>
    //               <td><strong>Consumption slab</strong></td>
    //               <td><strong>Rate (Per 1000 ltr.):</strong></td>
    //               <td><strong>Unit Consumed:</strong></td>
    //               <td><strong>Amount:</strong></td>
    //             </tr>
    //             <tr>
    //               <td>Water Charge:</td>
    //               <td>0 - 15000</td>
    //               <td>9.9</td>
    //               <td>15000</td>
    //               <td>148.5</td>
    //             </tr>
    //             <tr>
    //               <td>Water Charge:</td>
    //               <td>15000 - 40000</td>
    //               <td>18.15</td>
    //               <td>5880</td>
    //               <td>106.722</td>
    //             </tr>
    //             <tr>
    //               <td><strong>Total Consumption Amount:</strong></td>
    //               <td><strong>${selectedRecord?.basicCharge}</strong></td>
    //             </tr>
    //             <tr>
    //               <td>Minimum Charge:</td>
    //               <td>${selectedRecord?.minimum}</td>
    //               <td colSpan="2">${selectedRecord?.minimum}</td>
    //             </tr>
    //             <tr>
    //               <td colSpan="4"><strong>Applied Water Charge as it is higher than Minimum Charge.</strong></td>
    //             </tr>
    //             <tr>
    //               <td>Sewerage Charge:</td>
    //               <td>20%</td>
    //               <td>${selectedRecord?.sewerage_tax == 'n' ? 'N/A' 
    //                   : selectedRecord?.sewerage_tax == 'y' ? selectedRecord?.sewerage_tax
    //                   :selectedRecord?.sewerage_tax
    //                   }</td>
    //             </tr>
    //             <tr>
    //               <td>STP Charge:</td>
    //               <td>13%</td>
    //               <td>${selectedRecord?.stp == 'n' ? 'N/A' 
    //                   : selectedRecord?.stp == 'y' ? selectedRecord?.stp
    //                   :selectedRecord?.stp
    //                   }</td>
    //             </tr>
    //             <tr>
    //               <td>Meter Service Charge:</td>
    //               <td>${selectedRecord?.fixedCharge?.service_charge}</td>
    //             </tr>
    //             <tr>
    //               <td>Fixed Charge:</td>
    //               <td>${selectedRecord?.fixedCharge?.fixed_charge}</td>
    //             </tr>
    //             <tr>
    //               <td><strong>Bill Sub Total</strong></td>
    //               <td> <strong>
    //                   ${selectedRecord?.waterCharge + selectedRecord?.fixedCharge?.total_fixed_charge}                 
    //                 </strong></td>
    //             </tr>
    //             <tr>
    //               <td>IDC Charge:</td>
    //               <td>${selectedRecord?.idc}</td>
    //             </tr>
    //             <tr>
    //               <td><strong>Rebate (If any)</strong></td>
    //               <td><strong>${selectedRecord?.rebate == 'n' ? 'N/A' 
    //                 : selectedRecord?.rebate == 'y' ? selectedRecord?.rebate_amount
    //                 :selectedRecord?.rebate_amount}</strong></td>
    //             </tr>
    //             <tr>
    //               <td><strong>Previous Outstanding Amount (If any)</strong></td>
    //               <td><strong>${selectedRecord?.ostd_amt}</strong></td>
    //             </tr>
    //             <tr>
    //               <td><strong>Previous Edit Bill Outstanding (If any)</strong></td>
    //               <td><strong>0</strong></td>
    //             </tr>
    //             <tr>
    //               <td><strong>Interest (If any)</strong></td>
    //               <td><strong>520.55</strong></td>
    //             </tr>
    //             <tr>
    //               <td><strong>Advance Deposit (If any):</strong></td>
    //               <td><strong>520.55</strong></td>
    //             </tr>
    //             <tr>
    //               <td><strong>Total Amount Payable:</strong></td>
    //               <td><strong>520.55</strong></td>
    //             </tr>
    //             <tr>
    //               <td colSpan="2"><strong>All amounts shown are in INR.</strong></td>
    //             </tr>
    //           </tbody>
    //         </table>
    //         <div>
    //           <table>
    //             <tbody>
    //               <tr>
    //                 <td><strong>Bill Agency Bill Details.</strong></td>
    //               </tr>
    //               <tr>
    //                 <td>Consumption</td>
    //                 <td>${selectedRecord?.consumption}</td>
    //               </tr>
    //               <tr>
    //                 <td>Water Charge</td>
    //                 <td>${selectedRecord?.waterCharge}</td>
    //               </tr>
    //               <tr>
    //                 <td>Sewerage Charge</td>
    //                 ${selectedRecord?.sewerage_tax == 'n' ? 'N/A' 
    //                   : selectedRecord?.sewerage_tax == 'y' ? selectedRecord?.sewerage_tax
    //                   :selectedRecord?.sewerage_tax
    //                   }
    //                 <td>${selectedRecord.fixedCharge.service_charge}</td>
    //               </tr>
    //               <tr>
    //                 <td>STP Charge</td>
    //                 <td>${selectedRecord?.stp == 'n' ? 'N/A' 
    //                   : selectedRecord?.stp == 'y' ? selectedRecord?.stp
    //                   :selectedRecord?.stp
    //                   }</td>
    //               </tr>
    //               <tr>
    //                 <td>Meter Service Charge</td>
    //                 <td>${selectedRecord?.fixedCharge?.service_charge}</td>
    //               </tr>
    //               <tr>
    //                 <td>Fixed Charge</td>
    //                 <td>${selectedRecord?.fixedCharge?.fixed_charge}</td>
    //               </tr>
    //               <tr>
    //                 <td>IDC Charge</td>
    //                 <td>${selectedRecord?.idc}</td>
    //               </tr>
    //               <tr>
    //                 <td>Total Bill Amount</td>
    //                 <td>${selectedRecord?.bill}</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </body>
    //   </html>
    // `);
    // doc.close();
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 500);
  };

  
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[80%] max-h-[76vh] overflow-auto relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={() => setShowPrintModal(false)}
        >
          &times;
        </button>

        <div className="p-4 mx-auto printable-content">
          <div className="mb-4 text-center">
            <div className="float-left ml-20" width="5%" style={{width:'5%',
              //  position: 'absolute'
               }}>
            <img src="/../RajneerLogo.png"alt="bakwass h sab kuch"/>
            </div>
            <div className="float-right" width="5%" style={{width:'5%',
              //  position: 'absolute'
               }}>
            <img src="/../PHED-Logo-small-Photoroom.png"alt="bakwass h sab kuch"/>
            </div>
            <div>
            <h2 className="text-blue-700 divide-y divide-x font-bold text-2xl">
              PUBLIC HEALTH ENGINEERING DEPARTMENT
            </h2>
            <h2 className="text-2xl">RAJASTHAN JAIPUR</h2>
            </div>
            <div className="border-t border-gray-950 mt-6"></div>
          </div>
          <h2 className="font-bold text-center mb-6 text-2xl pt-5 pb-2">
            Bill Computation Sheet
          </h2>
          {/* Consumer Details Section */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <table className="min-w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Consumer Name:</td>
                  <td className="border px-4 py-2">
                    {selectedRecord?.name || "N/A"} not dynamic
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">CIN:</td>
                  <td className="border px-4 py-2">
                    {selectedRecord?.cid || "N/A"}
                  </td>
                  <td className="border px-4 py-2">Pipe Size:</td>
                  <td className="border px-4 py-2">
                    {selectedRecord?.meter_size || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Bill Month:</td>
                  <td className="border px-4 py-2">
                    {selectedRecord?.billMonth || "N/A"} not dynamic
                  </td>
                  <td className="border px-4 py-2">Consumer Category:</td>
                  <td className="border px-4 py-2">
                 <strong>
                 {selectedRecord?.category == 'd' ? 'Domestic' 
                      : selectedRecord?.category == 'nd' ? 'Non Domestic'
                      : selectedRecord?.category == 'id' ? 'Industrial'
                      : selectedRecord?.category == 'f' ? 'Flat'
                      :selectedRecord?.category
                      } {` - `}
                      {selectedRecord?.connection_type == 'p' ? 'Permanent': 'Temporary'}
                      {/* add flate category code */}
                  </strong> 
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2" colSpan={4}>
                    Month Wise Water Charges Description:
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                  Average Last Six Month Readings:
                  </td>
                  <td className="border px-4 py-2">{selectedRecord?.averageConsumption}</td>
                  {/* <td className="border px-4 py-2">
                    {selectedRecord?.meter_size || "N/A"}
                  </td> */}
                </tr>
               <ComputationData data={selectedRecord} slabs = {selectedRecord.slabs}/>
                {/* <hr className="py-2"></hr> */}
              {Object.keys(selectedRecord.prev).length ?  <ComputationData data={selectedRecord.prev} slabs = {selectedRecord.prevSlabs}/> : ""}
                {/* second month code start  */}

                {/* second month code end here */}
                <tr>
                <div className=" border-gray-950 mt-6"></div>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">["L"] Rebate (If any)</td>
                  <td className="border px-4 py-2">{selectedRecord?.rebate == 'n' ? 'N/A' :'Y'}</td>
                  <td className="border px-4 py-2">
                    {selectedRecord?.rebate == 'n' ? selectedRecord?.rebate_amount 
                      : selectedRecord?.rebate == 'y' ? selectedRecord?.rebate_amount
                      :selectedRecord?.rebate_amount}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">["M"] Previous Outstanding Amount (If any)</td>
                  <td className="border px-4 py-2"></td>
                      {/* {console.log('rebat!!!!!!!!!!!!!!!!e number hai value k sth', typeof(selectedRecord?.ostd_amt))} */}
                  <td className="border px-4 py-2">{selectedRecord?.ostd_amt}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">["N"] Previous Edit Bill Outstanding (If any)</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">N/A</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">["O"] Interest (If any)</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">N/A</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">["P"] Advance Deposit (If any)</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">N/A</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">
                    <strong>["Q"] Total Amount Payable(Till Due Date, (J+K+L+M+N+O+P))</strong>
                  </td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">
                    <strong>{selectedRecord?.tot_amt_indate}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">["R"] LPS</td>
                  <td className="border px-4 py-2">10% of ["Q"]</td>
                  <td className="border px-4 py-2">{selectedRecord?.lps}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">
                    <strong>["S"] Total Amount Payable(After Due Date, (Q+R))</strong>
                  </td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">
                    <strong>{selectedRecord?.lps + selectedRecord?.tot_amt_indate}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">Last/Due Date For Cheque</td>
                  <td className="border px-4 py-2">-</td>
                  <td className="border px-4 py-2">{selectedRecord?.chequedate}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">Last/Due Date For Cash</td>
                  <td className="border px-4 py-2">-</td>
                  <td className="border px-4 py-2">{selectedRecord?.cashdate}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2" colSpan={3}>
                    <strong>All amounts shown are in INR.</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div className="border-b border-gray-200 pb-4 mb-4 mt-1">
              <table className="min-w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">
                      <strong>Bill Agency Bill Details.</strong>
                    </td>
                    <td className="border px-4 py-2">
                      <strong>Current Month Bill Details.</strong>
                    </td>
                    {selectedRecord.category == "d" ? <td className="border px-4 py-2">
                      <strong>Previous Month Bill Details.</strong>
                    </td> : ""}
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Consumption</td>
                    <td className="border px-4 py-2">
                      {selectedRecord?.consumption}
                    </td>
                    {selectedRecord.category == "d" ? <td className="border px-4 py-2">
                      {prev?.consumption}
                    </td> : ""}
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Water Charge</td>
                    <td className="border px-4 py-2">
                      {selectedRecord?.waterCharge}
                    </td>
                    {selectedRecord.category == "d" ? <td className="border px-4 py-2">
                      {prev?.waterCharge}
                    </td> : ""}
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Sewerage Charge</td>
                    <td className="border px-4 py-2">
                      {selectedRecord?.sewerage_tax == 'n' ? 'N/A' 
                      : selectedRecord?.sewerage_tax == 'y' ? selectedRecord?.sewerage_tax
                      :selectedRecord?.sewerage_tax
                      }
                    </td>
                    {selectedRecord.category == "d" ? <td className="border px-4 py-2">
                      {prev?.sewerage_tax == 'n' ? 'N/A' 
                      : prev?.sewerage_tax == 'y' ? prev?.sewerage_tax
                      :prev?.sewerage_tax
                      }
                    </td> : ""}
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">STP Charge</td>
                    <td className="border px-4 py-2">
                      {selectedRecord?.stp == 'n' ? 'N/A' 
                      : selectedRecord?.stp == 'y' ? selectedRecord?.stp
                      :selectedRecord?.stp
                      }
                      </td>
                      {selectedRecord.category == "d" ? <td className="border px-4 py-2">
                        {prev?.stp == 'n' ? 'N/A' 
                      : prev?.stp == 'y' ? prev?.stp
                      :prev?.stp
                      }
                    </td> : ""}
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Meter Service Charge</td>
                    <td className="border px-4 py-2">{selectedRecord?.fixedCharge?.service_charge}</td>
                    {selectedRecord.category == "d" ? <td className="border px-4 py-2">{prev?.fixedCharge?.service_charge}</td> : ""}
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Fixed Charge</td>
                    <td className="border px-4 py-2">
                      {selectedRecord?.fixedCharge?.fixed_charge}
                    </td>
                    {selectedRecord.category == "d" ? <td className="border px-4 py-2">{prev?.fixedCharge?.fixed_charge}</td> : ""}

                  </tr>
                  <tr>
                    <td className="border px-4 py-2">IDC Charge</td>
                    <td className="border px-4 py-2">{selectedRecord?.idc}</td>
                    {selectedRecord.category == "d" ? <td className="border px-4 py-2">{prev?.idc}</td> : ""}

                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Total Bill Amount</td>
                    <td className="border px-4 py-2">{selectedRecord?.bill}</td>
                    {selectedRecord.category == "d" ? <td className="border px-4 py-2">{prev?.bill}</td> : ""}

                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
          {/* <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={printSelectedRecord}
            >
              Print Bill
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ComputationSheet;
