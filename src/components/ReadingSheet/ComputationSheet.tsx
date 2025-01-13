import React from "react";
import { CgCloseR } from "react-icons/cg";




interface ComputationSheetProps {
    setShowPrintModal: (show: boolean) => void;
    response: any;
    payload: any;
  }

const ComputationSheet: React.FC<ComputationSheetProps> = ({
    response,
    payload,
  setShowPrintModal,
}) => {
  
// const  {data}=response

// console.log("payload1",payload)
console.log("payload2",response)
const PreadingDate = payload[0]?.date;
const formatDate = (dateString?:any) => {
    console.log("dateString",dateString)
    if (!dateString) return "Invalid Date"; // If dateString is undefined or empty

    const parts = dateString.split("/");
   
    // if (parts.length !== 3) return "Invalid Date"; // If date format is not correct

    const [day, month, year] = parts;
    console.log("parts",day)
    const date = new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD format

    return !isNaN(date.getTime()) // Check if it's a valid date
      ? date
          .toLocaleDateString("en-US", {
            month: "short", // Short month (e.g., 'Dec')
             year: "numeric", // Two-digit year (e.g., '24')
          })
          .replace(",", "/") // Replace the comma with a slash for the desired format
      : "Invalid Date"; // Fallback for invalid date
  };


  const PformattedDate = formatDate(PreadingDate);
//   const CformattedDate = formatDate(CreadingDate);

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-black mt-18 z-10 overflow-auto">
      <div className="mt-10 bg-gray-100 relative w-[1000px] m-auto flex justify-center items-center min-h-screen ">
        <div className="mx-auto ">
          <div className="  flex   justify-end  mr-8 mt-2">
            {" "}
            <CgCloseR
              onClick={() => setShowPrintModal(false)}
              className=" w-10 h-10  text-red"
            />
          </div>

          <div className="p-4 mx-auto printable-content">
            <div className="mb-4 text-center">
              <div
                className="float-left ml-20"
                style={{
                  width: "5%",
                }}
              >
                <img src="/../RajneerLogo.png" alt="Rajneer Logo" />
              </div>
              <div
                className="float-right"
                style={{
                  width: "5%",
                }}
              >
                <img src="/../PHED-Logo-small-Photoroom.png" alt="PHED Logo" />
              </div>
              <div>
                <h2 className=" text-[#3939fd] divide-y divide-x font-bold text-2xl">
                  PUBLIC HEALTH ENGINEERING DEPARTMENT
                </h2>
                <h2 className="text-black-2 font-bold text-2xl">
                  RAJASTHAN JAIPUR
                </h2>
              </div>
              <div className=" border-2 border-t border-[#b4b4b6] mt-6"></div>
            </div>
            <h2 className=" text-black-2 text-center mb-6 text-2xl pt-5 pb-2 font-bold underline">
              Bill Computation Sheet
            </h2>
            {/* Consumer Details Section */}
            <div className="   pb-4 mb-4">
              <table className=" border-collapse">
                <tbody>
                  <div className=" border-4 border-[#d9d9dc]  pb-1 mb-1">
                    <tr>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Consumer Name
                      </td>
                      <td className=" text-left  px-2 text-black-2 font-bold">
                        MOTWANI ARJUN
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        CIN
                      </td>
                      <td className=" text-left  px-2 text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                      140120613584
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Pipe Size
                      </td>
                      <td className=" text-left  px-2 text-black-2 font-bold">
                        {payload[0]?.connectionSize?.name}(MM)
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Bill Month
                      </td>
                      <td className=" text-left  px-2 text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        {PformattedDate}
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Consumer Category
                      </td>
                      <td className=" text-left  px-2 text-black-2 font-bold ">
                       {payload[0]?.category?.name}- {payload[0]?.connection_type_id?.name}
                      </td>
                    </tr>

                    <tr className=" border-y-4  border-[#b4b4b6">
                      <td className=" text-left   p-[12px] text-black-2   border-[#b4b4b6] font-bold"></td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2 text-black-2  border-[#b4b4b6] font-bold">
                        Month Wise Water Charges Description :-
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Last Month, Average Three Months &Last 12 Month Readings
                        :-
                      </td>
                      <td className="text-left   px-2 text-black-2  border-[#b4b4b6] font-bold ">
                        20880 , 20880 &20000
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Month
                      </td>
                      <td className=" text-left   px-2 text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                      {PformattedDate}
                      </td>
                      <td className=" text-left   px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Average Consumption
                      </td>
                      <td className=" text-left   px-2 text-black-2 font-bold">
                        20880
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left   px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Previous Reading
                      </td>
                      <td className=" text-left   px-2 text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        0
                      </td>
                      <td className=" text-left   px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Current Reading
                      </td>
                      <td className=" text-left  px-2 text-black-2 font-bold   ">
                        0
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Fault Code
                      </td>
                      <td className=" text-left  px-2 text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        BD
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Total Consumption{" "}
                      </td>
                      <td className=" text-left  px-2 text-black-2 font-bold   ">
                        20880
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Charge Name
                      </td>
                      <td className=" text-left  px-2 text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        Consumption Slab
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Rate(Per 1000 ltr.)
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Unit Consumed{" "}
                      </td>
                      <td className=" text-left  px-2 text-black-2 font-bold   ">
                        Amount
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Water Charge
                      </td>
                      <td className=" text-left  px-2 text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        0 - 15000
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        9.9
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        15000
                      </td>
                      <td className=" text-left  px-2 text-black-2 font-bold   ">
                        148.5
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Water Charge
                      </td>
                      <td className=" text-left  px-2 text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        15000 - 40000
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        18.15
                      </td>
                      <td className=" text-left  px-2 text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        5880
                      </td>
                      <td className=" text-left  px-2 text-black-2 font-bold   ">
                        106.722
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td
                        className="  text-right   text-black-2  border-r-4 border-[#b4b4b6] font-bold"
                        colSpan={3}
                      >
                        Total Consumption Amount
                      </td>
                      <td className="   text-black-2 font-bold   " colSpan={2}>
                        106.722
                      </td>
                    </tr>

                    {/* <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Charge Name
                      </td>
                      <td className=" text-left  px-2  text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        Consumption Slab
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Rate(Per 1000 ltr.)
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Unit Consumed{" "}
                      </td>
                      <td className=" text-left  px-2  text-black-2 font-bold   ">
                        Amount
                      </td>
                    </tr>
                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Water Charge
                      </td>
                      <td className=" text-left  px-2  text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        0 - 15000
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        9.9
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        15000
                      </td>
                      <td className=" text-left  px-2  text-black-2 font-bold   ">
                        148.5
                      </td>
                    </tr> */}
                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Minimum Charge
                      </td>
                      <td className=" text-left  px-2  text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2 font-bold   ">
                        220
                      </td>
                    </tr>
                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left   text-black-2   border-[#b4b4b6] font-bold">
                        Applied Water Charge as it is higher than Minimum
                        Charge.
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Sewerage Charge
                      </td>
                      <td className=" text-left  px-2  text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        20 %
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2 font-bold   ">
                        51.04
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        STP Charge
                      </td>
                      <td className=" text-left  px-2  text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        13 %
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2 font-bold   ">
                        51.04
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Meter Service Charge
                      </td>
                      <td className=" text-left  px-2  text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        13 %
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2 font-bold   ">
                        22
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        Meter Service Charge
                      </td>
                      <td className=" text-left  px-2  text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        13 %
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2 font-bold   ">
                        55
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td
                        className="  text-right   text-black-2  border-r-4 border-[#b4b4b6] font-bold"
                        colSpan={3}
                      >
                        Bill Sub Total
                      </td>
                      <td className="   text-black-2 font-bold   " colSpan={2}>
                        416.44
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        DC Charge
                      </td>
                      <td className=" text-left  px-2  text-black-2 border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        25 %
                      </td>
                      <td className=" text-left  px-2  text-black-2  border-r-4 border-[#b4b4b6] font-bold">
                        N/A
                      </td>
                      <td className=" text-left  px-2  text-black-2 font-bold   ">
                        104.11
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td
                        className="  text-right   text-black-2  border-r-4 border-[#b4b4b6] font-bold"
                        colSpan={3}
                      >
                        Rebate (If any)
                      </td>
                      <td
                        className="   text-black-2 font-bold   "
                        colSpan={2}
                      ></td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td
                        className="  text-right   text-black-2  border-r-4 border-[#b4b4b6] font-bold"
                        colSpan={3}
                      >
                        Previous Outstanding Amount (If any)
                      </td>
                      <td
                        className="   text-black-2 font-bold   "
                        colSpan={2}
                      ></td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td
                        className="  text-right   text-black-2  border-r-4 border-[#b4b4b6] font-bold"
                        colSpan={3}
                      >
                        Previous Edit Bill Outstanding (If any)
                      </td>
                      <td className="   text-black-2 font-bold   " colSpan={2}>
                        0
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td
                        className="  text-right   text-black-2  border-r-4 border-[#b4b4b6] font-bold"
                        colSpan={3}
                      >
                        Interest (If any)
                      </td>
                      <td
                        className="   text-black-2 font-bold   "
                        colSpan={2}
                      ></td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td
                        className="  text-right   text-black-2  border-r-4 border-[#b4b4b6] font-bold"
                        colSpan={3}
                      >
                        Advance Deposit (If any)
                      </td>
                      <td
                        className="   text-black-2 font-bold   "
                        colSpan={2}
                      ></td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td
                        className="  text-right   text-black-2  border-r-4 border-[#b4b4b6] font-bold"
                        colSpan={3}
                      >
                        Total Amount Payable
                      </td>
                      <td className="   text-black-2 font-bold   " colSpan={2}>
                        520.55
                      </td>
                    </tr>

                    <tr className=" border-y-4 border-[#b4b4b6">
                      <td className="  text-left   text-black-2    font-bold">
                        All Amounts shown are in INR.
                      </td>
                    </tr>
                    <tr className=" border-t-4  border-[#b4b4b6">
                      <td className=" text-left  py-2  text-black-2   border-[#b4b4b6] font-bold"></td>
                    </tr>
                  </div>
                  <div className="border-4 border-[#d9d9dc]">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <td
                            className="text-left text-black-2 font-bold  px-2"
                            colSpan={7}
                          >
                            Bill Agency Bill Details.
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t-4 border-[#d9d9dc]">
                          <td
                            className="text-left text-black-2 border-r-4 border-[#b4b4b6] font-bold  px-2"
                            colSpan={7}
                          >
                            Consumption
                          </td>
                          <td
                            className="text-black-2 font-bold text-right  px-2"
                            colSpan={3}
                          >
                            {payload[0]?.category?.name === "domestic" ? response?.billDetails?.detailsByMonth[0]?.waterCharge+response?.billDetails?.detailsByMonth[1]?.waterCharge:response?.billDetails?.detailsByMonth[0]?.waterCharge}
                            </td>
                        </tr>
                        <tr className="border-t-4 border-[#d9d9dc]">
                          <td
                            className="text-left text-black-2 border-r-4 border-[#b4b4b6] font-bold  px-2"
                            colSpan={7}
                          >
                            Water Charge
                          </td>
                          <td
                            className="text-black-2 font-bold text-right  px-2"
                            colSpan={3}
                          >
                            {payload[0]?.category?.name === "domestic" ? response?.billDetails?.detailsByMonth[0]?.waterCharge+response?.billDetails?.detailsByMonth[1]?.waterCharge:response?.billDetails?.detailsByMonth[0]?.waterCharge}

                          </td>
                        </tr>
                        <tr className="border-t-4 border-[#d9d9dc]">
                          <td
                            className="text-left text-black-2 border-r-4 border-[#b4b4b6] font-bold  px-2"
                            colSpan={7}
                          >
                            Sewerage Charge
                          </td>
                          <td
                            className="text-black-2 font-bold text-right  px-2"
                            colSpan={3}
                          >
                      {payload[0]?.category?.name === "domestic" ? response?.billDetails?.detailsByMonth[0]?.sewerageCharge+response?.billDetails?.detailsByMonth[1]?.sewerageCharge:response?.billDetails?.detailsByMonth[0]?.sewerageCharge}

                          </td>
                        </tr>
                        <tr className="border-t-4 border-[#d9d9dc]">
                          <td
                            className="text-left text-black-2 border-r-4 border-[#b4b4b6] font-bold  px-2"
                            colSpan={7}
                          >
                            STP Charge
                          </td>
                          <td
                            className="text-black-2 font-bold text-right  px-2"
                            colSpan={3}
                          >
                          {payload[0]?.category?.name === "domestic" ? response?.billDetails?.detailsByMonth[0]?.stpCharge+response?.billDetails?.detailsByMonth[1]?.stpCharge:response?.billDetails?.detailsByMonth[0]?.stpCharge}

                          </td>
                        </tr>
                        <tr className="border-t-4 border-[#d9d9dc]">
                          <td
                            className="text-left text-black-2 border-r-4 border-[#b4b4b6] font-bold  px-2"
                            colSpan={7}
                          >
                            Meter Service Charge
                          </td>
                          <td
                            className="text-black-2 font-bold text-right  px-2"
                            colSpan={3}
                          >
                                {payload[0]?.category?.name === "domestic" ? response?.billDetails?.detailsByMonth[0]?.meterServiceCharge+response?.billDetails?.detailsByMonth[1]?.meterServiceCharge:response?.billDetails?.detailsByMonth[0]?.meterServiceCharge}

                          </td>
                        </tr>
                        <tr className="border-t-4 border-[#d9d9dc]">
                          <td
                            className="text-left text-black-2 border-r-4 border-[#b4b4b6] font-bold  px-2"
                            colSpan={7}
                          >
                            Fixed Charge
                          </td>
                          <td
                            className="text-black-2 font-bold text-right  px-2"
                            colSpan={3}
                          >
                        {payload[0]?.category?.name === "domestic" ?  response?.billDetails?.detailsByMonth[0]?.fixedCharge+response?.billDetails?.detailsByMonth[1]?.fixedCharge: response?.billDetails?.detailsByMonth[0]?.fixedCharge}

                          </td>
                        </tr>
                        <tr className="border-t-4 border-[#d9d9dc]">
                          <td
                            className="text-left text-black-2 border-r-4 border-[#b4b4b6] font-bold  px-2"
                            colSpan={7}
                          >
                            IDC Charge
                          </td>
                          <td
                            className="text-black-2 font-bold text-right  px-2"
                            colSpan={3}
                          >
                            {payload[0]?.category?.name === "domestic"? response?.billDetails?.detailsByMonth[0]?.idcCharge+response?.billDetails?.detailsByMonth[0]?.idcCharge : response?.billDetails?.detailsByMonth[0]?.idcCharge}
                          </td>
                        </tr>
                        <tr className="border-t-4 border-[#d9d9dc]">
                          <td
                            className="text-left text-black-2 border-r-4 border-[#b4b4b6] font-bold  px-2"
                            colSpan={7}
                          >
                            Total Bill Amount
                          </td>
                          <td
                            className="text-black-2 font-bold text-right  px-2"
                            colSpan={3}
                          >
                            {response?.billDetails?.totalBill}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputationSheet;
