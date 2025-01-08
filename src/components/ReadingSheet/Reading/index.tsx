"use client";
import { useInternalService } from "@/components/hook/useInternalService";
import WaterBill from "@/components/WaterBill";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { error } from "console";

interface Meter_status_id {
  id: string;
  name: string;
}
interface prevMonth {
  reading: number;
  meter_status_id: Meter_status_id;
  consumption: number;
  cw: boolean;
  reading_date: string;
}

interface Category_id {
  id: string;
  name: string;
}

// interface Category_id {
//   id: string;
//   name: string;
// }

interface currMonth {
  reading: number;
  meter_status_id: Meter_status_id;
  consumption: number;
  cw: boolean;
  reading_date: string;
}
interface Category {
  id: number;
  category_name: string;
  category_code: string;
}

interface MeterStatus {
  id: number;
  meter_status: string;
  description: string;
}

interface ConnectionSize {
  id: number;
  size: string;
}

interface Row {
  id: number;
  accountNumber: string;
  consumerInfo: string;
  category: Category_id;
  sewerage: boolean;
  stpCharges: boolean;
  rebate: boolean;
  connectionSize: ConnectionSize;
  lastRDG: number;
  readingStatus: string;
  prevMonth: prevMonth;
  currMonth: currMonth;
  // readingDateI: string; // Added readingDateI
  // readingDateII: string; // Added readingDateII
}

const d = new Date();

const formattedDate = d.toISOString().split("T")[0];

const Reading: React.FC = () => {
  const router = useRouter();
  const [waterBillOpen, setWaterBillOpen] = useState(false);

  const [billData, setBillData] = useState({});
  const [payload, setPayload] = useState({});
  const [errors, setErrors] = useState("");
  // console.log("errors66",errors)
  const [rows, setRows] = useState<Partial<any>[]>([
    {
      id: 1,
      accountNumber: "1",
      consumerInfo: "MOTWANI ARJUN F-316 VASHALI NAGAR",
      category: { id: "", name: "" },
      sewerage: false,
      stpCharges: false,
      rebate: false,
      connectionSize: { id: "", size: "" },
      lastRDG: 20000,
      readingStatus: "",
      prevMonth: {
        reading: "",
        meter_status_id: { id: "", meter_status: "" },
        consumption: "",
        reading_date: "2025-01-07",
        cw: false,
      },
      currMonth: {
        reading: "",
        meter_status_id: { id: "", meter_status: "" },
        reading_date: "2025-01-07",
        consumption: "",
        cw: false,
      },
    },
  ]);

  console.log("rows123", rows);

  const [categores, setCategores] = useState<Category[]>([]);
  const [meterStatus, setMeterStatus] = useState<MeterStatus[]>([]);
  const [connectionSize, setConnectionSize] = useState<ConnectionSize[]>([]);

  const [secondReading, setSetSecondReading] = useState(1);

  const [
    fetchResourceCategory,
    resourceResultCategory,
    resourceInProgress,
    resourceError,
  ] = useInternalService("category", "GET", null);
  const [
    fetchResourceMeterStatus,
    resourceResultMeterStatus,
    meterStatusInProgress,
    meterStatusresourceError,
  ] = useInternalService("meterStatus", "GET", null);

  const [
    fetchResourceConnectionSize,
    resultConnectionSize,
    ConnectionSizeInProgress,
    ConnectionSizeresourceError,
  ] = useInternalService("connectionSize", "GET", null);

  const [createBill, billResult, BillInProgress, BillError] =
    useInternalService("billing/generate-bill", "POST", null);

  useEffect(() => {
    fetchResourceCategory();
    fetchResourceMeterStatus();
    fetchResourceConnectionSize();
  }, []);

  useEffect(() => {
    if (resourceResultCategory?.data?.data?.category) {
      setCategores(resourceResultCategory.data.data.category);
    }
  }, [resourceResultCategory]);

  useEffect(() => {
    if (resourceResultMeterStatus?.data?.data?.meteStatusCode) {
      setMeterStatus(resourceResultMeterStatus?.data?.data?.meteStatusCode);
    }
  }, [resourceResultMeterStatus]);

  useEffect(() => {
    if (resultConnectionSize?.data?.data?.connectionSize) {
      setConnectionSize(resultConnectionSize?.data?.data?.connectionSize);
    }
  }, [resultConnectionSize]);

  useEffect(() => {
    rows.map((item) => {
      return setSetSecondReading(item.category.id);
    });
  }, [rows]);

  // const handleChange = (rowIndex: number, field: string, value: any) => {
  //   const updatedRows = [...rows];
  //   const updatedRow = { ...updatedRows[rowIndex] };

  //   if (field === "currMonth" || field === "prevMonth") {
  //     updatedRow[field] = { ...updatedRow[field], ...value };
  //   } else {
  //     updatedRow[field] = value;
  //   }

  //   if (field === "prevMonth" || field === "currMonth") {
  //     const firstMonthReading = updatedRow.prevMonth.reading;
  //     const secondMonthReading = updatedRow.currMonth.reading;

  //     updatedRow.prevMonth.consumption = firstMonthReading - updatedRow.lastRDG;
  //     updatedRow.currMonth.consumption =secondMonthReading - updatedRow.lastRDG;
  //   }

  //   updatedRows[rowIndex] = updatedRow;
  //   setRows(updatedRows);
  // };

  // handleInputChange function
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    rowIndex: number,
    field: string,
    subField?: string
  ) => {
    let value: any;
  console.log("subField",subField)
    // First check if the target is an HTMLSelectElement
    if (e.target instanceof HTMLSelectElement) {
      if (field === "category") {
        const selectedCategory = categores?.find(
          (cat) => cat.id === Number(e.target.value) // Ensure Number conversion for comparison
        );
        if (selectedCategory) {
          value = {
            id: selectedCategory.id,
            name: selectedCategory.category_name,
          };
        } else {
          value = { id: "", name: "" };
        }
      } else if (field === "connectionSize") {
        const selectedConnectionSize = connectionSize?.find(
          (cat) => cat.id === Number(e.target.value) // Ensure Number conversion for comparison
        );
  
        if (selectedConnectionSize) {
          value = {
            id: selectedConnectionSize.id,
            name: selectedConnectionSize.size,
          };
        } else {
          value = { id: "", size: "" };
        }
      } else if (subField === "meter_status_id") {
        const selectedMeterStatus = meterStatus?.find(
          (cat) => cat.id === Number(e.target.value) // Ensure Number conversion for comparison
        );
        if (selectedMeterStatus) {
          value = {
            id: selectedMeterStatus.id,
            name: selectedMeterStatus.meter_status,
          };
        } else {
          value = { id: "", size: "" };
        }
      } else if (field === "sewerage" || field === "stpCharges" || subField ==="cw") {
        value = e.target.value === "true";
      } else {
        value = e.target.value;
      }
    } 
    // If target is an HTMLInputElement (like a text input or number input)
    else if (e.target instanceof HTMLInputElement) {
      if (e.target.type === "number") {
        value = parseFloat(e.target.value); // For number input types
      } else {
        value = e.target.value;
      }
    } else {
      // This is a fallback if the target is neither input nor select
      // value = e.target.value;
    }
  
    setErrors(e.target.value);
  
    const updatedRows = [...rows];
    const updatedRow = { ...updatedRows[rowIndex] };
    console.log("updatedRow", updatedRow.prevMonth.consumption);
  
    if (subField) {
      updatedRow[field] = { ...updatedRow[field], [subField]: value };
    } else {
      updatedRow[field] = value;
    }
  
    if (field === "prevMonth" || field === "currMonth") {
      const firstMonthReading = updatedRow.prevMonth.reading || 0;
      const secondMonthReading = updatedRow.currMonth.reading || 0;
  
      if (firstMonthReading === 0 && secondMonthReading === 0) {
        updatedRow.prevMonth.consumption = undefined;
        updatedRow.currMonth.consumption = undefined;
      } else {
        if (firstMonthReading !== 0) {
          updatedRow.prevMonth.consumption =
            firstMonthReading - updatedRow.lastRDG;
        } else {
          updatedRow.prevMonth.consumption = undefined;
        }
  
        if (secondMonthReading !== 0) {
          updatedRow.currMonth.consumption =
            secondMonthReading - updatedRow.lastRDG;
        } else {
          updatedRow.currMonth.consumption = undefined;
        }
      }
    }
  
    updatedRows[rowIndex] = updatedRow;
    setRows(updatedRows);
  };
  
  
  

  const handleGenerateBill = () => {
    if (secondReading === 1) {
      const payload: {
        [key: string]: {
          consumerInfo: string;
          category_id: string;
          sewerage: boolean;
          stp: boolean;
          rebate: boolean;
          connection_size_id: string;
          prevMonth: {
            reading: string;
            meter_status_id: Meter_status_id;
            consumption: number;
            reading_date: string;
            cw: boolean;
          };
          currMonth: {
            reading: string;
            meter_status_id: Meter_status_id;
            reading_date: string;
            consumption: number;
            cw: boolean;
          };
        };
      } = {};

      rows.forEach((row) => {
        payload[row.accountNumber] = {
          consumerInfo: row.consumerInfo,
          category_id: row?.category.id,
          sewerage: row.sewerage,
          stp: row.stpCharges,
          rebate: row.rebate,
          connection_size_id: row?.connectionSize?.id,
          prevMonth: row.prevMonth,
          currMonth: row.currMonth,
        };
      });
      console.log("payload5", payload);
      const result = payload[Object.keys(payload)[0]];
      createBill(result);
      setPayload(rows);
    }
    if (secondReading !== 1) {
      const payload: {
        [key: string]: {
          consumerInfo: string;
          category_id: string;
          sewerage: boolean;
          stp: boolean;
          rebate: boolean;
          connection_size_id: string;
          currMonth: {
            reading: string;
            meter_status_id: Meter_status_id;
            reading_date: string;
            consumption: number;
            cw: boolean;
          };
        };
      } = {};

      rows.forEach((row) => {
        payload[row.accountNumber] = {
          consumerInfo: row.consumerInfo,
          category_id: row.category.id,
          sewerage: row.sewerage,
          stp: row.stpCharges,
          rebate: row.rebate,
          connection_size_id: row.connectionSize.id,
          currMonth: row.currMonth,
        };
      });

      const result = payload[Object.keys(payload)[0]];

      createBill(result);
      setPayload(rows);
    }
  };
  useEffect(() => {
    if (billResult) {
      toast.success(` ${billResult?.data?.data?.message}.`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setBillData(billResult?.data?.data?.billDetails);
      setWaterBillOpen(!waterBillOpen);
    }
  }, [billResult]);

  return (
    <>
      {waterBillOpen && (
        <WaterBill
          setWaterBillOpen={setWaterBillOpen} // Ensure this properly closes the modal
          reponse={billData}
          payload={payload}
        />
      )}
      <div className="container mx-auto px-4 py-6">
        <div className="overflow-x-auto">
          <div className=" overflow-y-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <td
                    colSpan={2}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    PHED Jaipur - Reading Sheet (Bi-monthly)
                  </td>
                  <td
                    colSpan={2}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {/* JUL 24 */}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={6}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    <strong>SubDivision Name:</strong> Sub Divison Drilling-I,
                    Jaipur, <strong>Sub Division Code :</strong> S2-9,{" "}
                    <strong>Chowkri/Area Code :</strong> 95b,{" "}
                    <strong>Cycle No:</strong> 12
                  </td>
                  <td
                    colSpan={3}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {secondReading === 1
                      ? "Last Rdg Date: Oct/2024"
                      : "Last Rdg Date: Dec/2024"}
                  </td>
                  {secondReading === 1 ? (
                    <>
                      <td
                        colSpan={1}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        <label className="block text-sm font-medium">
                          Reading Date(I):
                        </label>
                        <input
                          type="date"
                          value={
                            rows[0]?.prevMonth?.reading_date || formattedDate
                          }
                          onChange={(e) =>
                            handleInputChange(e, 0, "prevMonth", "reading_date")
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </td>

                      <td
                        colSpan={1}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        <label className="block text-sm font-medium">
                          Reading Date(II):
                        </label>
                        <input
                          type="date"
                          value={
                            rows[0]?.currMonth?.reading_date || formattedDate
                          }
                          onChange={(e) =>
                            handleInputChange(e, 0, "currMonth", "reading_date")
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      {" "}
                      <td
                        colSpan={1}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        <label className="block text-sm font-medium">
                          Reading Date(II):
                        </label>
                        <input
                          type="date"
                          value={
                            rows[0]?.currMonth?.reading_date || formattedDate
                          }
                          onChange={(e) =>
                            handleInputChange(e, 0, "currMonth", "reading_date")
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Acnt No
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Consumer Name Address
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Category
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Sewarage
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    STP Charges
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Rebate
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Size Connection
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Last RDG
                    {/* , Cons/Stts */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Acnt No
                  </td>
                  {secondReading === 1 ? (
                    <>
                      {" "}
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        <div className="font-bold">Previous Month </div>
                        <div className="flex justify-between w-[200px]">
                          <div className="text-sm">Reading</div>
                          <div className="text-sm">Stts</div>
                          <div className="text-sm">CONS</div>
                          <div className="text-sm">CW</div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        <div className="font-bold">Current Month</div>
                        <div className="flex justify-between w-[200px]">
                          <div className="text-sm">Reading</div>
                          <div className="text-sm">Stts</div>
                          <div className="text-sm">CONS</div>
                          <div className="text-sm">CW</div>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      {" "}
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        <div className="font-bold">Current Month</div>
                        <div className="flex justify-between w-[200px]">
                          <div className="text-sm">Reading</div>
                          <div className="text-sm">Stts</div>
                          <div className="text-sm">CONS</div>
                          <div className="text-sm">CW</div>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  return (
                    <tr key={row.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.accountNumber}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.consumerInfo}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={row?.category?.id || ""} // Bind to category.id to avoid NaN or empty values
                          onChange={(e) =>
                            handleInputChange(e, index, "category")
                          } // Pass 'category' as field name
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select Category</option>{" "}
                          {/* Default empty option */}
                          {categores?.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.category_name} {/* Display category name */}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={row.sewerage ? "true" : "false"}
                          onChange={(e) =>
                            handleInputChange(e, index, "sewerage")
                          }
                          className="w-full p-2 border border-gray-300 rounded z-[-1]"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={row.stpCharges ? "true" : "false"}
                          onChange={(e) =>
                            handleInputChange(e, index, "stpCharges")
                          }
                          className="w-full p-2 border border-gray-300 rounded z-[-1]"
                          disabled={!row.sewerage}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={row.rebate ? "true" : "false"}
                          onChange={(e) =>
                            handleInputChange(e, index, "rebate")
                          }
                          className="w-full p-2 border border-gray-300 rounded z-[-1]"
                          disabled={!row.rebate}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={row?.connectionSize.id || ""}
                          onChange={
                            (e) => handleInputChange(e, index, "connectionSize") // Pass 'category_id' instead of 'category_name'
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option>Select Connection Size</option>

                          {connectionSize?.map((conn) => (
                            <option key={conn.id} value={conn.id}>
                              {conn.size}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Set the lastRDG value directly here */}
                      <td className="border border-gray-300 px-4 py-2">
                        {row.lastRDG ? row.lastRDG : "Set Value Here"}
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        {row.accountNumber}
                      </td>
                      {secondReading === 1 ? (
                        <>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-between">
                              <input
                                type="text"
                                value={row.prevMonth.reading}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    handleInputChange(
                                      e,
                                      index,
                                      "prevMonth",
                                      "reading"
                                    );
                                  }
                                }}
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />

                              <select
                                value={row.prevMonth.meter_status_id?.id || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "prevMonth",
                                    "meter_status_id"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              >
                                <option>Select Meter Status</option>
                                {meterStatus.map((status) => (
                                  <option key={status.id} value={status.id}>
                                    {status.meter_status}
                                  </option>
                                ))}
                              </select>

                              <input
                                type="text"
                                value={
                                  row.prevMonth.consumption === undefined
                                    ? "" // Show an empty string if consumption is 0 or undefined
                                    : row.prevMonth.consumption
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "prevMonth",
                                    "consumption"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />

                              
                              <select
                                value={row.prevMonth.cw ? "true" : "false"}
                                onChange={(e) =>
                                  handleInputChange(e, index, "prevMonth", "cw")
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1 z-[1]"
                                // disabled={!row.currMonth.cw}
                              >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </div>
                            {/* {errors < row.lastRDG ? (
                              <p style={{ color: "red", fontSize: "10px" }}>
                                Enter reading more than last reading
                              </p>
                            ) : (
                              ""
                            )} */}
                          </td>

                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-between">
                              <input
                                type="text"
                                value={row.currMonth.reading}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    handleInputChange(
                                      e,
                                      index,
                                      "currMonth",
                                      "reading"
                                    );
                                  }
                                }}
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />

                              <select
                                value={row.currMonth.meter_status_id?.id || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "meter_status_id"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              >
                                <option>Select Meter Status</option>
                                {meterStatus.map((status) => (
                                  <option key={status.id} value={status.id}>
                                    {status.meter_status}
                                  </option>
                                ))}
                              </select>

                              <input
                                type="text"
                                value={
                                  row.currMonth.consumption !== undefined
                                    ? row.currMonth.consumption
                                    : ""
                                }
                                // value={row.currMonth.consumption}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "consumption"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />
                              <select
                                value={row.currMonth.cw ? "true" : "false"}
                                onChange={(e) =>
                                  handleInputChange(e, index, "currMonth", "cw")
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1 z-[1]"
                                // disabled={!row.currMonth.cw}
                              >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </div>
                            {/* {errors < row.lastRDG ? (
                              <p style={{ color: "red", fontSize: "10px" }}>
                                Enter reading more than last reading
                              </p>
                            ) : (
                              ""
                            )} */}
                          </td>
                          
                        </>
                      ) : (
                        <>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-between">
                              <input
                                type="text"
                                value={row.currMonth.reading}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "reading"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />
                              <select
                                value={row.currMonth.meter_status_id?.id || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "meter_status_id"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              >
                                <option>Select Meter Status</option>
                                {meterStatus.map((status) => (
                                  <option key={status.id} value={status.id}>
                                    {status.meter_status}
                                  </option>
                                ))}
                              </select>

                              <input
                                type="text"
                                value={
                                  row.currMonth.consumption !== undefined
                                    ? row.currMonth.consumption
                                    : ""
                                }
                                // value={row.currMonth.consumption}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "consumption"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />
                              <select
                                value={row.currMonth.cw ? "true" : "false"}
                                onChange={(e) =>
                                  handleInputChange(e, index, "currMonth", "cw")
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1  z-[1]"
                                // disabled={!row.currMonth.cw}
                              >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </div>
                            {/* {errors < row.lastRDG ? (
                              <p style={{ color: "red", fontSize: "10px" }}>
                                Enter reading more than last reading
                              </p>
                            ) : (
                              ""
                            )} */}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" text-right">
          {" "}
          <button
            onClick={handleGenerateBill}
            type="submit"
            className="w-36 mt-6 rounded bg-blue-500 py-3 text-xl font-bold text-white transition hover:bg-blue-600"
          >
            Generate Bill
          </button>
        </div>
      </div>
    </>
  );
};

export default Reading;
