// components/ScrollableTable.js
// export default function ScrollableTable({rowData}) {
//   return (
//     <div className="max-w-full overflow-x-auto">
//       <div className="max-h-96 overflow-y-auto">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">


//               <tr className="row-auto ">
//                 <th className="px-4 py-2 text-left border">CID</th>
//                 <th className="px-4 py-2 text-left border">Ctgry</th>
//                 <th className="px-4 py-2 text-left border">Conn.Size</th>
//                 <th className="px-4 py-2 text-left border">Conn.Type</th>
//                 <th className="px-4 py-2 text-left border">Cnsmp.</th>
//                 {/* <th className="px-4 py-2 text-left border">Average Consumption</th> */}
//                 <th className="px-4 py-2 text-left border">Mtr status</th>
//                 <th className="px-4 py-2 text-left border">Basic ch.</th>
//                 <th className="px-4 py-2 text-left border">Min. ch.</th>
//                 <th className="px-4 py-2 text-left border">Water ch.</th>
//                 <th className="px-4 py-2 text-left border">xls Water ch.</th>
//                 <th className="px-4 py-2 text-left border">Swrge ch.</th>
//                 <th className="px-4 py-2 text-left border">STP</th>
//                 <th className="px-4 py-2 text-left border">xls Swrge ch.</th>
//                 <th className="px-4 py-2 text-left border">( Fixed ch.+</th>
//                 <th className="px-4 py-2 text-left border">Mtr Srvc ch.=</th>
//                 <th className="px-4 py-2 text-left border">Ttl Fxd ch.)</th>
//                 <th className="px-4 py-2 text-left border">IDC</th>
//                 <th className="px-4 py-2 text-left border">xls IDC</th>
//                 <th className="px-4 py-2 text-left border">Bill</th>
//                 <th className="px-4 py-2 text-left border">Rebate</th>
//                 {/* <th>Rebate</th>
//                         <th>RebateCharge</th> */}
//               </tr>
//               {/* Add more headers as needed */}
//             </tr>
//           </thead>
//           {/* <tbody>
//             {Array.from({ length: 20 }).map((_, rowIndex) => (
//               <tr key={rowIndex} className="odd:bg-white even:bg-gray-100">
//                 <td className="px-4 py-2 border">Row {rowIndex + 1} Col 1</td>
//                 <td className="px-4 py-2 border">Row {rowIndex + 1} Col 2</td>
//                 <td className="px-4 py-2 border">Row {rowIndex + 1} Col 3</td>
//                 <td className="px-4 py-2 border">Row {rowIndex + 1} Col 4</td>
//                 <td className="px-4 py-2 border">Row {rowIndex + 1} Col 5</td>
//                 {/* Add more columns as needed *
//               </tr>
//             ))}
//           </tbody> */}
// <tbody>

//           {rowData}
// </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// components/DataTable.js
import { useState } from "react";
import * as XLSX from "xlsx";

const DataTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState(null);

  // Utility function to get nested data
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((value, key) => value?.[key], obj);
};


  // const sortedData = [...data].sort((a, b) => {
  //   if (sortConfig !== null) {
  //     const order = sortConfig.direction === "ascending" ? 1 : -1;
  //     return (
  //       (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1) * order
  //     );
  //   }
  //   return 0;
  // });

  // const requestSort = (key) => {
  //   let direction = "ascending";
  //   if (
  //     sortConfig &&
  //     sortConfig.key === key &&
  //     sortConfig.direction === "ascending"
  //   ) {
  //     direction = "descending";
  //   }
  //   setSortConfig({ key, direction });
  // };

  // Export data to Excel
  const exportToExcel = () => {
    const exportData = data.map((row) => {
      // Extract displayed data
      let rowData = {};
      // column.header
      // myArray.filter(callbackFn)

      let filteredColumns = columns.filter((c) => {
        return (c.header != 'Computation Sheet')})
      filteredColumns.forEach((column) => {
        // rowData[column.header] = getNestedValue(row, column.accessor);
        rowData[column.header] = column.Cell ? column.Cell(row) : getNestedValue(row, column.accessor)
      });
      
      // Add extra columns (e.g., calculated fields)
      // extraExportColumns.forEach((extraColumn) => {
      //   rowData[extraColumn.header] = extraColumn.value(row);
      // });
      
      return rowData;
    });

    // Convert data to sheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

     // Custom Formatting of Local Date and Time
     const now = new Date();

     const year = now.getFullYear();
     const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
     const day = String(now.getDate()).padStart(2, "0");
     const hours = String(now.getHours()).padStart(2, "0");
     const minutes = String(now.getMinutes()).padStart(2, "0");
     const seconds = String(now.getSeconds()).padStart(2, "0");
 
     const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // Download the Excel file
    XLSX.writeFile(workbook,`calculatedBilling${formattedDateTime}.xlsx`);
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <button
        onClick={exportToExcel}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Export to Excel
      </button>
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full border-collapse overflow-scroll">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-4 py-2 border text-left cursor-pointer"
                  // onClick={() => requestSort(column.accessor)}
                >
                  {column.header}
                  {/* {sortConfig && sortConfig.key === column.accessor ? (
                    sortConfig.direction === "ascending" ? (
                      " ▲"
                    ) : (
                      " ▼"
                    )
                  ) : null} */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="odd:bg-white even:bg-gray-100"
              >
                {columns.map((column) => (
                  <td key={column.accessor} className="px-4 py-2 border">
                    {/* {row[column.accessor]} */}
                    {column.Cell ? column.Cell(row) : getNestedValue(row, column.accessor)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
