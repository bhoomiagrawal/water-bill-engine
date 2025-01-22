"use client";
import { useInternalService } from "@/components/hook/useInternalService";
import WaterBill from "@/components/WaterBill";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ComputationSheet from "../ComputationSheet";
// import { useSearchParams } from 'next/navigation';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";

interface Meter_status_id {
  id: number;
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
interface ConnectionType {
  id: number;
  conn_type: string;
}
// interface Row {
//   id: number;
//   accountNumber: string;
//   consumerInfo: string;
//   category: Category_id;
//   sewerage: boolean;
//   stpCharges: boolean;
//   rebate: boolean;
//   connectionSize: ConnectionSize;
//   lastRDG: number;
//   readingStatus: string;
//   prevMonth: prevMonth;
//   currMonth: currMonth;
//   // readingDateI: string; // Added readingDateI
//   // readingDateII: string; // Added readingDateII
// }

const formattedDate = new Date().toISOString().split("T")[0];

// Split the date into year, month, and day (YYYY-MM-DD format)

const Reading: React.FC = () => {
  const router = useRouter();
  const [waterBillOpen, setWaterBillOpen] = useState(false);

  const [billData, setBillData] = useState({});
  const [payload, setPayload] = useState({});
  const [ComputationSheetPayload, setComputationSheetPayload] = useState({});
  const [errors, setErrors] = useState("");
  // console.log("errors66",errors)
  const formattedDate = new Date().toISOString().split("T")[0];
  const [dataForComputation, setDataForComputation] = useState({});
  console.log("dataForComputation", dataForComputation);
  // const searchParams = useSearchParams();
  // const id = searchParams.get('id');
  // const name = searchParams.get('name');
  // console.log("8888",id,name)
  // const [rows, setRows] = useState<Partial<any>[]>([
  //   {
  //     id: 1,
  //     accountNumber: "1",
  //     consumerInfo: "MOTWANI ARJUN F-316 VASHALI NAGAR",
  //     category: { id: "", name: "" },
  //     sewerage: false,
  //     stpCharges: false,
  //     rebate: false,
  //     connectionSize: { id: "", size: "" },
  //     lastRDG: 20000,
  //     readingStatus: "",
  //     date: formattedDate, // Correctly formatted date (YYYY-MM-DD)
  //     prevMonth: {
  //       reading: "",
  //       meter_status_id: { id: "1", meter_status: "mf" },
  //       consumption: "",
  //       reading_date: "2025-01-07",
  //       cw: false,
  //     },
  //     currMonth: {
  //       reading: "",
  //       meter_status_id: { id: "1", meter_status: "mf" },
  //       reading_date: "2025-01-07",
  //       consumption: "",
  //       cw: false,
  //     },
  //   },
  // ]);

  // console.log("rows333", rows[0]?.date);

  // const formattedDate = new Date().toISOString().split("T")[0];
  const [date, setData] = useState(formattedDate);

  console.log("date999", date);
  const [Cyear, Cmonth, Cday] = date.split("-").map(Number);
  const Cdate = new Date(Cyear, Cmonth - 1, Cday);
  Cdate.setMonth(Cdate.getMonth() - 1);
  const CnewDay = String(Cdate.getDate()).padStart(2, "0");
  const CnewMonth = String(Cdate.getMonth() + 1).padStart(2, "0");
  const CnewYear = Cdate.getFullYear();
  const CnextFormattedDate = `${CnewDay}/${CnewMonth}/${CnewYear}`;
  console.log("here1", CnextFormattedDate);

  const CnewMonthName = Cdate.toLocaleString("en", { month: "long" }); // Get full month name

  const currMonthDate = new Date(Cdate);
  currMonthDate.setMonth(currMonthDate.getMonth() - 1);
  const currMonthName = currMonthDate.toLocaleString("en", { month: "short" });
  const currMonthYear = currMonthDate.getFullYear();
  const curreMonthFormatted = `${currMonthName}/${currMonthYear}`;

  // console.log("gggggggg: ", curreMonthFormatted); // Output: "Oct/2024"

  const [Pyear, Pmonth, Pday] = date.split("-").map(Number);
  const Pdate = new Date(Pyear, Pmonth - 1, Pday);
  Pdate.setMonth(Pdate.getMonth() - 2);
  const PnewDay = String(Pdate.getDate()).padStart(2, "0");
  const PnewMonth = String(Pdate.getMonth() + 1).padStart(2, "0");
  const PnewYear = Pdate.getFullYear();
  const PnewMonthName = Pdate.toLocaleString("en", { month: "long" });
  const PnextFormattedDate = `${PnewDay}/${PnewMonth}/${PnewYear}`;
  const prevMonthDate = new Date(Pdate);
  prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
  const prevMonthName = prevMonthDate.toLocaleString("en", { month: "short" });
  const prevMonthYear = prevMonthDate.getFullYear();
  const prevMonthFormatted = `${prevMonthName}/${prevMonthYear}`;

  console.log("here1", PnextFormattedDate);
  console.log("here2", CnextFormattedDate);

  const [newDate, setNewDate] = useState("");
  // const [newPnextFormattedDate1, setPnextFormattedDate] = useState(PnextFormattedDate);
  // const [newCnextFormattedDate2, setCnextFormattedDate] = useState(CnextFormattedDate);

  // console.log("newPnextFormattedDate55555555555",newPnextFormattedDate1,newCnextFormattedDate2)
  useEffect(() => {
    setNewDate(date); // Update newDate whenever date changes
  }, [date]);

  useEffect(() => {
    setPnextFormattedDate(PnextFormattedDate); // Update newDate whenever date changes
  }, [PnextFormattedDate]);
  useEffect(() => {
    setCnextFormattedDate(CnextFormattedDate); // Update newDate whenever date changes
  }, [CnextFormattedDate]);

  const [newPnextFormattedDate1, setPnextFormattedDate] = useState(
    PnextFormattedDate || ""
  ); // Set default fallback value
  const [newCnextFormattedDate2, setCnextFormattedDate] = useState(
    CnextFormattedDate || ""
  ); // Set default fallback value

  console.log(
    "newPnextFormattedDate55555555555",
    newPnextFormattedDate1,
    newCnextFormattedDate2
  );

  useEffect(() => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        prevMonth: {
          ...row.prevMonth, // Spread the existing prevMonth object
          reading_date: newPnextFormattedDate1, // Update the reading_date
        },
      }))
    );
  }, [newPnextFormattedDate1]); // Dependency on `newPnextFormattedDate1`

  useEffect(() => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        currMonth: {
          ...row.currMonth, // Spread the existing currMonth object
          reading_date: newCnextFormattedDate2, // Update the reading_date
        },
      }))
    );
  }, [newCnextFormattedDate2]); // Dependency on `newCnextFormattedDate2`

  useEffect(() => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        date: newDate, // Update the date field with the new date
      }))
    );
  }, [newDate]); // Dependency on `newDate`

  const [rows, setRows] = useState<Partial<any>[]>([
    {
      CIN: 140120613584,
      id: 1,
      date: newDate, // This will remain as the initial empty string
      accountNumber: "1",
      consumerInfo: "MOTWANI ARJUN F-316 VASHALI NAGAR",
      category: { id: 1, name: "domestic" },
      sewerage: false,
      stpCharges: false,
      rebate: false,
      connectionSize: { id: "", size: "" },
      connection_type_id: { id: "", name: "" },
      lastRDG: 20000,
      readingStatus: "",
      prevMonth: {
        reading: "",
        meter_status: { id: "1", name: "mf" },
        reading_date: newPnextFormattedDate1, // Initialize with default value
        consumption: "",
        cw: false,
      },
      currMonth: {
        reading: "",
        meter_status: { id: "1", name: "mf" },
        reading_date: newCnextFormattedDate2, // Initialize with default value
        consumption: "",
        cw: false,
      },
    },
  ]);

  const [meterStatusDataPrev, setMeterStatusDataPrev] = useState("");
  const [meterStatusDataCurr, setMeterStatusDataCurr] = useState("");
  console.log("rows333", rows); // Accessing the correct property

  // // Extract year, month, and day from rows[0].date
  // const [Lyear, LPmonth, Lday] = PnextFormattedDate.split("-").map(Number);

  // // Create a new Date object using the extracted values
  // const Ldate = new Date(Lyear, LPmonth - 1, Lday); // Months are 0-based

  // // Increment the month by 1
  // Pdate.setMonth(Pdate.getMonth() + 1);

  // // Get the full month name (e.g., "December") and year
  // const LPnewMonthName = Ldate.toLocaleString("en", { month: "short" }); // Get abbreviated month name (e.g., "Dec")
  // const LPnewYear = Ldate.getFullYear();

  // const LPnextFormattedDate = `${LPnewMonthName}/${LPnewYear}`;

  // console.log("77777", LPnextFormattedDate); // Output: "Dec/2024"

  // console.log("77777", nextFormattedDate);

  const [categores, setCategores] = useState<Category[]>([]);
  const [meterStatus, setMeterStatus] = useState<MeterStatus[]>([]);
  const [connectionSize, setConnectionSize] = useState<ConnectionSize[]>([]);
  const [connectionType, setConnectionType] = useState<ConnectionType[]>([]);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const [secondReading, setSetSecondReading] = useState(1);
  console.log("secondReading000", rows[0]?.category?.id);

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

  const [
    fetchResourceConnectionType,
    resourceResultConnectionType,
    connectionTypeInProgress,
    connectionTypeError,
  ] = useInternalService("ConnectionType", "GET", null);

  console.log("resourceResultConnectionType", resourceResultConnectionType);

  const [createBill, billResult, BillInProgress, BillError] =
    useInternalService("billing/generate-bill", "POST", null);

  const [createBill1, billResult1, BillInProgress1, BillError1] =
    useInternalService("billing/generate-bill", "POST", null);
  // console.log("billResult",billResult)

  useEffect(() => {
    fetchResourceCategory();
    fetchResourceMeterStatus();
    fetchResourceConnectionSize();
    fetchResourceConnectionType();
  }, []);

  useEffect(() => {
    if (resourceResultCategory?.data?.data?.category) {
      setCategores(resourceResultCategory.data.data.category);
    }
  }, [resourceResultCategory]);
  // console.log("resourceResultCategory",resourceResultCategory)

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
    if (resourceResultConnectionType?.data?.data?.connectionType) {
      setConnectionType(resourceResultConnectionType.data.data?.connectionType);
    }
  }, [resourceResultConnectionType]);

  // useEffect(() => {
  //   rows.map((item) => setSetSecondReading(item.category?.id));
  // }, [rows]);

  useEffect(() => {
    if (rows.length > 0) {
      setSetSecondReading(Number(rows[0].category?.id)); // Ensure it's a number
    }
  }, [rows]);

  console.log("rows");
  useEffect(() => {
    rows.map((item) =>
      setMeterStatusDataPrev(item?.prevMonth?.meter_status?.id)
    );
  }, [rows]);

  useEffect(() => {
    rows.map((item) =>
      setMeterStatusDataCurr(item?.currMonth?.meter_status?.id)
    );
  }, [rows]);

  useEffect(() => {
    if (secondReading) {
      setRows((prevRows) =>
        prevRows.map((row) => ({
          ...row,
          prevMonth: {
            ...row.prevMonth,
            reading: "",
            consumption: "",
          },
          currMonth: {
            ...row.currMonth,
            reading: "",
            consumption: "",
          },
        }))
      );
    }
  }, [secondReading]);

  console.log(meterStatusDataPrev, meterStatusDataCurr);

  useEffect(() => {
    if (secondReading) {
      setRows((prevRows) =>
        prevRows.map((row) => ({
          ...row,
          prevMonth: {
            ...row.prevMonth,
            meter_status: {
              ...row.prevMonth.meter_status,
              id: "1",
              name: "mf",
            },
          },
          currMonth: {
            ...row.currMonth,
            meter_status: {
              ...row.currMonth.meter_status,
              id: "1",
              name: "mf",
            },
          },
        }))
      );
    }
  }, [secondReading]);

  console.log("secondReading", secondReading);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    rowIndex: number,
    field: string,
    subField?: string
  ) => {
    let value: any;
    console.log("subField", field);
    if (e.target instanceof HTMLSelectElement) {
      if (field === "category") {
        const selectedCategory = categores?.find(
          (cat) => cat.id === Number(e.target.value)
        );
        value = selectedCategory
          ? { id: selectedCategory.id, name: selectedCategory.category_name }
          : { id: "", name: "" };
      } else if (field === "connectionSize") {
        const selectedConnectionSize = connectionSize?.find(
          (cat) => cat.id === Number(e.target.value)
        );
        value = selectedConnectionSize
          ? { id: selectedConnectionSize.id, name: selectedConnectionSize.size }
          : { id: "", size: "" };
      } else if (subField === "meter_status") {
        const selectedMeterStatus = meterStatus?.find(
          (cat) => cat.id === Number(e.target.value)
        );
        value = selectedMeterStatus
          ? {
              id: selectedMeterStatus.id,
              name: selectedMeterStatus.meter_status,
            }
          : { id: "", size: "" };
      } else if (field === "connection_type_id") {
        const selectedConnectionType = connectionType?.find(
          (conn) => conn.id === Number(e.target.value)
        );
        value = selectedConnectionType
          ? {
              id: selectedConnectionType.id,
              name: selectedConnectionType.conn_type,
            }
          : { id: "", name: "" };
      } else if (
        field === "sewerage" ||
        field === "stpCharges" ||
        subField === "cw"
      ) {
        value = e.target.value === "true";
      } else {
        value = e.target.value;
      }
    } else if (e.target instanceof HTMLInputElement) {
      value =
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value;
    }

    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      const updatedRow = { ...updatedRows[rowIndex] };

      if (subField) {
        updatedRow[field] = { ...updatedRow[field], [subField]: value };
      } else {
        updatedRow[field] = value;
      }

      if (field === "prevMonth" || field === "currMonth") {
        const firstMonthReading = updatedRow.prevMonth?.reading || 0;
        const secondMonthReading = updatedRow.currMonth?.reading || 0;

        if (
          Number(meterStatusDataPrev) !== 1 &&
          Number(meterStatusDataCurr) !== 1
        ) {
          updatedRow.prevMonth = {
            ...updatedRow.prevMonth,
            reading: 0,
            consumption: 0,
          };
          updatedRow.currMonth = {
            ...updatedRow.currMonth,
            reading: 0,
            consumption: 0,
          };
        } else {
          updatedRow.prevMonth.consumption =
            firstMonthReading !== 0
              ? firstMonthReading - updatedRow.lastRDG
              : undefined;
          updatedRow.currMonth.consumption =
            secondMonthReading !== 0
              ? secondMonthReading - firstMonthReading
              : undefined;
        }
      }

      if (secondReading !== 1) {
        if (Number(meterStatusDataCurr) !== 1) {
          updatedRow.currMonth.reading = 0;
          updatedRow.currMonth.consumption = 0;
        } else {
          const secondMonthReading = updatedRow.currMonth.reading || 0;

          if (secondMonthReading === 0) {
            updatedRow.currMonth.consumption = undefined;
          } else {
            updatedRow.currMonth.consumption =
              secondMonthReading !== 0
                ? secondMonthReading - updatedRow.lastRDG
                : undefined;
          }
        }
      }

      updatedRows[rowIndex] = updatedRow;
      return updatedRows;
    });
  };

  useEffect(() => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (
          Number(meterStatusDataPrev) !== 1 &&
          Number(meterStatusDataCurr) !== 1
        ) {
          return {
            ...row,
            prevMonth: {
              ...row.prevMonth,
              reading: 0,
              consumption: 0,
            },
            currMonth: {
              ...row.currMonth,
              reading: 0,
              consumption: 0,
            },
          };
        }
        return row;
      });
    });
  }, [meterStatusDataPrev, meterStatusDataCurr]);

  useEffect(() => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (
          // Number(meterStatusDataPrev) !== 1 &&
          Number(meterStatusDataCurr) !== 1
        ) {
          return {
            ...row,
            currMonth: {
              ...row.currMonth,
              reading: 0,
              consumption: 0,
            },
          };
        }
        return row;
      });
    });
  }, [meterStatusDataCurr]);

  useEffect(() => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (Number(meterStatusDataPrev) !== 1) {
          return {
            ...row,
            prevMonth: {
              ...row.prevMonth,
              reading: 0,
              consumption: 0,
            },
          };
        }
        return row;
      });
    });
  }, [meterStatusDataPrev]);

  const handleGenerateBill = () => {
    console.log("row10101", rows);
    console.log("secondReading Value:", secondReading, typeof secondReading);
  
    if (Number(secondReading) === 1) {
      console.log("Inside secondReading === 1 block");
      const payload: {
        [key: string]: {
          consumerInfo: string;
          category_id: number;
          sewerage: boolean;
          stp: boolean;
          rebate: boolean;
          connection_size_id: string;
          connection_type_id: string;
          prevMonth: {
            reading: string;
            meter_status: Meter_status_id;
            consumption: number;
            reading_date: string;
            cw: boolean;
          };
          currMonth: {
            reading: string;
            meter_status: Meter_status_id;
            reading_date: string;
            consumption: number;
            cw: boolean;
          };
        };
      } = {};
  
      rows.forEach((row) => {
        payload[row.accountNumber] = {
          consumerInfo: row.consumerInfo,
          category_id: row?.category?.id,
          sewerage: row.sewerage,
          stp: row.stpCharges,
          rebate: row.rebate,
          connection_size_id: row?.connectionSize?.id,
          connection_type_id: row?.connection_type_id?.id,
          prevMonth: row.prevMonth,
          currMonth: row.currMonth,
        };
      });
  
      rows.forEach((row) => console.log("ppppp", row));
  
      const result = payload[Object.keys(payload)[0]];
      console.log("Payload for secondReading === 1:", result);
  
      createBill(result);
      setPayload(rows);
    } else {
      console.log("Inside secondReading !== 1 block");
      const payload: {
        [key: string]: {
          consumerInfo: string;
          category_id: number;
          sewerage: boolean;
          stp: boolean;
          rebate: boolean;
          connection_size_id: string;
          connection_type_id: string;
          currMonth: {
            reading: string;
            meter_status: Meter_status_id;
            reading_date: string;
            consumption: number;
            cw: boolean;
          };
        };
      } = {};
  
      rows.forEach((row) => {
        payload[row.accountNumber] = {
          consumerInfo: row.consumerInfo,
          category_id: row?.category?.id,
          sewerage: row.sewerage,
          stp: row.stpCharges,
          rebate: row.rebate,
          connection_size_id: row?.connectionSize?.id,
          connection_type_id: row?.connection_type_id?.id,
          currMonth: row.currMonth,
        };
      });
  
      const result = payload[Object.keys(payload)[0]];
      console.log("Payload for secondReading !== 1:", result);
  
      createBill(result);
      setPayload(rows);
    }
  };
  
  useEffect(() => {
    if (billResult) {
      console.log("Bill result received:", billResult);
      toast.success(` ${billResult?.data?.data?.message}.`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
  
      setBillData(billResult?.data?.data?.billDetails);
      setWaterBillOpen((prev) => !prev);
    }
  }, [billResult]);
  
console.log("billResult",billResult)
  const handleComputationSheet = () => {
    setComputationSheetPayload(rows);
    if (secondReading === 1) {
      const payload: {
        [key: string]: {
          consumerInfo: string;
          category_id: number;
          sewerage: boolean;
          stp: boolean;
          rebate: boolean;
          connection_size_id: string;
          connection_type_id: string;
          prevMonth: {
            reading: string;
            meter_status: Meter_status_id;
            consumption: number;
            reading_date: string;
            cw: boolean;
          };
          currMonth: {
            reading: string;
            meter_status: Meter_status_id;
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
          connection_type_id: row?.connection_type_id?.id,
          prevMonth: row.prevMonth,
          currMonth: row.currMonth,
        };
      });
      rows.forEach((row) => console.log("ppppp", row));
      const result = payload[Object.keys(payload)[0]];
      createBill1(result);
      setDataForComputation(billResult1?.data?.data);
    }
    if (secondReading !== 1) {
      const payload: {
        [key: string]: {
          consumerInfo: string;
          category_id: number;
          sewerage: boolean;
          stp: boolean;
          rebate: boolean;
          connection_size_id: string;
          connection_type_id: string;
          currMonth: {
            reading: string;
            meter_status: Meter_status_id;
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
          connection_type_id: row?.connection_type_id?.id,
          currMonth: row.currMonth,
        };
      });

      const result = payload[Object.keys(payload)[0]];

      createBill1(result);
      // setDataForComputation(billResult?.data?.data)
    }
  };

  useEffect(() => {
    if (billResult1) {
      setDataForComputation(billResult1?.data?.data);
      setShowPrintModal(!showPrintModal);
    }
  }, [billResult1]);
  return (
    <>
      {waterBillOpen && (
        <WaterBill
          setWaterBillOpen={setWaterBillOpen}
          response={billData}
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
                    colSpan={4}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    PHED Jaipur - Reading Sheet (Bi-monthly)
                  </td>
                  <td
                    colSpan={3}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    Bill Issueing Bi Month
                  </td>
                  <td
                    colSpan={2}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    <input
                      type="date"
                      value={date || formattedDate}
                      onChange={(e) => setData(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
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
                    colSpan={4}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {secondReading !== 1
                      ? curreMonthFormatted
                      : prevMonthFormatted}
                  </td>
                  {Number(secondReading) === 1 ? (
                    <>
                      {console.log("secondReading1", secondReading)}
                      {/* First Condition */}
                      <td
                        colSpan={1}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        <label className="block text-sm font-medium">
                          Reading Date(I):
                        </label>
                        <p className="bg-[#ebe7e7] py-2 text-center">
                          {PnextFormattedDate}
                        </p>
                      </td>
                      <td
                        colSpan={1}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        <label className="block text-sm font-medium">
                          Reading Date(II):
                        </label>
                        <p className="bg-[#ebe7e7] py-2 text-center">
                          {CnextFormattedDate}
                        </p>
                      </td>
                    </>
                  ) : (
                    <>
                      {console.log("secondReading2", secondReading)}
                      {/* Second Condition */}
                      <td
                        colSpan={1}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        <label className="block text-sm font-medium">
                          Reading Date(I):
                        </label>
                        <p className="bg-[#ebe7e7] py-2 text-center">
                          {CnextFormattedDate}
                        </p>
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Acnt No
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    CIN
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
                    Connection Size
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Last RDG (
                    {secondReading !== 1 ? currMonthName : prevMonthName})
                    {/* , Cons/Stts */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    Connection Type
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2 text-left">
                    Acnt No
                  </td> */}
                  {secondReading === 1 ? (
                    <>
                      {" "}
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        <div className="font-bold">{PnewMonthName} </div>
                        <div className="flex justify-between w-[200px]">
                          <div className="text-sm">Reading</div>
                          <div className="text-sm">Stts</div>
                          <div className="text-sm">CONS</div>
                          <div className="text-sm">CW</div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        <div className="font-bold">{CnewMonthName}</div>
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
                        <div className="font-bold">{CnewMonthName}</div>
                        <div className="flex justify-between w-[200px]">
                          <div className="text-sm">Reading</div>
                          <div className="text-sm">Stts</div>
                          <div className="text-sm">CONS</div>
                          <div className="text-sm">CW</div>
                        </div>
                      </td>
                    </>
                  )}
                  {/* <td className="border border-gray-300 px-4 py-2">
                    Computation Sheet
                  </td> */}
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
                        {row.CIN}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.consumerInfo}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={
                            row?.category?.id ||
                            categores.find(
                              (status) => status.category_name === "domestic"
                            )?.id ||
                            ""
                          }
                          // value={row?.category?.id || ""} // Bind to category.id to avoid NaN or empty values
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
                          value={row?.connectionSize?.id || ""}
                          onChange={
                            (e) => handleInputChange(e, index, "connectionSize") 
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
                      <td
                        className="border border-gray-300 px-4 py-2"
                        colSpan={1}
                      >
                        {row.lastRDG ? row.lastRDG : "Set Value Here"}
                      </td>
                      <td
                        className="border border-gray-300 px-4 py-2"
                        colSpan={1}
                      >
                        <select
                          value={row?.connection_type_id?.id || ""} 
                          onChange={(e) =>
                            handleInputChange(e, index, "connection_type_id")
                          } // Pass 'category' as field name
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select Category</option>{" "}
                          {connectionType?.map((conn) => (
                            <option key={conn.id} value={conn.id}>
                              {conn.conn_type}
                            </option>
                          ))}
                        </select>
                      </td>

                      {secondReading === 1 ? (
                        <>
                          <td className="border border-gray-300 px-4 py-2">
                            <div className="flex justify-between">
                              <input
                                type="text"
                                value={
                                  Number(meterStatusDataPrev) !== 1
                                    ? 0
                                    : row.prevMonth.reading
                                }
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
                                disabled={Number(meterStatusDataPrev) !== 1}
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />

                              <select
                                value={
                                  row.prevMonth.meter_status?.id ||
                                  meterStatus.find(
                                    (status) => status.meter_status === "mf"
                                  )?.id ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "prevMonth",
                                    "meter_status"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              >
                                <option value="" disabled>
                                  Select Meter Status
                                </option>
                                {meterStatus.map((status) => (
                                  <option key={status.id} value={status.id}>
                                    {status.meter_status}
                                  </option>
                                ))}
                              </select>

                              <input
                                type="text"
                                value={
                                  Number(meterStatusDataPrev) !== 1 // If disabled
                                    ? 0 // Set value to 0 when disabled
                                    : row.prevMonth.consumption === undefined
                                      ? "" // Show an empty string if consumption is undefined
                                      : row.prevMonth.consumption // Show the actual consumption if enabled
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "prevMonth",
                                    "consumption"
                                  )
                                }
                                disabled={Number(meterStatusDataPrev) !== 1}
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />

                              <select
                                value={row.prevMonth.cw ? "true" : "false"}
                                onChange={(e) =>
                                  handleInputChange(e, index, "prevMonth", "cw")
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1 z-[1]"
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
                                value={
                                  Number(meterStatusDataCurr) !== 1
                                    ? 0
                                    : row.currMonth.reading
                                }
                                // value={row.currMonth.reading}
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
                                disabled={Number(meterStatusDataCurr) !== 1}
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />

                              <select
                                value={
                                  row.currMonth.meter_status?.id ||
                                  meterStatus.find(
                                    (status) => status.meter_status === "mf"
                                  )?.id ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "meter_status"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              >
                                <option value="" disabled>
                                  Select Meter Status
                                </option>
                                {meterStatus.map((status) => (
                                  <option key={status.id} value={status.id}>
                                    {status.meter_status}
                                  </option>
                                ))}
                              </select>

                              <input
                                type="text"
                                value={
                                  Number(meterStatusDataCurr) !== 1 // If disabled
                                    ? 0 // Set value to 0 when disabled
                                    : row.currMonth.consumption === undefined
                                      ? "" // Show an empty string if consumption is undefined
                                      : row.currMonth.consumption // Show the actual consumption if enabled
                                }
                                // value={
                                //   row.currMonth.consumption !== undefined
                                //     ? row.currMonth.consumption
                                //     : ""
                                // }
                                // value={row.currMonth.consumption}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "consumption"
                                  )
                                }
                                disabled={Number(meterStatusDataCurr) !== 1}
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
                                value={
                                  Number(meterStatusDataCurr) !== 1
                                    ? 0
                                    : row.currMonth.reading
                                }
                                // value={row.currMonth.reading}
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
                                disabled={Number(meterStatusDataCurr) !== 1}
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />

                              <select
                                value={
                                  row.currMonth.meter_status?.id ||
                                  meterStatus.find(
                                    (status) => status.meter_status === "mf"
                                  )?.id ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "meter_status"
                                  )
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              >
                                <option value="" disabled>
                                  Select Meter Status
                                </option>
                                {meterStatus.map((status) => (
                                  <option key={status.id} value={status.id}>
                                    {status.meter_status}
                                  </option>
                                ))}
                              </select>

                              <input
                                type="text"
                                value={
                                  Number(meterStatusDataCurr) !== 1 // If disabled
                                    ? 0 // Set value to 0 when disabled
                                    : row.currMonth.consumption === undefined
                                      ? "" // Show an empty string if consumption is undefined
                                      : row.currMonth.consumption // Show the actual consumption if enabled
                                }
                                // value={
                                //   row.currMonth.consumption !== undefined
                                //     ? row.currMonth.consumption
                                //     : ""
                                // }
                                // value={row.currMonth.consumption}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    index,
                                    "currMonth",
                                    "consumption"
                                  )
                                }
                                disabled={Number(meterStatusDataCurr) !== 1}
                                className="text-sm w-[50px] border border-gray-300 p-1"
                              />
                              <select
                                value={row.currMonth.cw ? "true" : "false"}
                                onChange={(e) =>
                                  handleInputChange(e, index, "currMonth", "cw")
                                }
                                className="text-sm w-[50px] border border-gray-300 p-1 z-[1]"
                                disabled={!row.currMonth.cw}
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
                      {/* <td className=" border border-gray-300 px-4 py-2  w-16 h-16 cursor-pointer  text-green-600">
                        <FaFileDownload
                          className="w-8 h-8"
                          onClick={handleComputationSheet}
                        />
                      </td> */}
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
          {showPrintModal && (
            <ComputationSheet
              response={dataForComputation}
              payload={ComputationSheetPayload}
              setShowPrintModal={setShowPrintModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Reading;
