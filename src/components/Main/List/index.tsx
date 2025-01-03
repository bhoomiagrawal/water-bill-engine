import { Table, Button } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React from "react";

interface Column {
  id: string;
  title: string;
  column: string;
  super_column?: string;
  type: string;
}

interface Data {
  id: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface ListProps {
  columns: Column[];
  data: Data[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const List: React.FC<ListProps> = ({ columns, data, handleEdit, handleDelete }) => {
  console.log("dataoooo",data)
  const columnsWithActions = columns?.map((col) => ({
    ...col,
    render: (_: any, record: Data, index: number) => {
      if (col.type === "actions") {
        return (
          <div className="flex space-x-4">
            <Button
              type="link"
              onClick={() => handleEdit(record)}
              icon={<FaEdit />}
              className="text-blue-500 text-2xl hover:text-blue-700"
            />
            <Button
              type="link"
              onClick={() => handleDelete(record.id)}
              icon={<MdDelete />}
              className="text-red-500 text-2xl hover:text-red-700"
            />
          </div>
        );
      } else if (col.column === "index") {
        return (
          <div className="font-bold bg-gray-200 py-2 px-4 rounded-lg">
            {index + 1} 
          </div>
        );
      } else if (col.column === "status") {
        return record.status === 1 ? (
          <span className="text-green-600 font-semibold">Active</span>
        ) : (
          <span className="text-red-600 font-semibold">Inactive</span>
        );
      } else if (col?.columnsecond === "mergi_consumption") {
        const minConsumption = record.min_consumption ?? "NA";
        const maxConsumption = record.max_consumption ?? "NA";
        return `${record.min_consumption}-${record.max_consumption }`;
      } else {
        return col.super_column
          ? record[col.super_column]?.[col.column] ?? "NA"
          : record[col.column] ?? "NA";
      }
    },
  }));

  const tableColumns = columnsWithActions?.map((col) => ({
    title: col.title,
    dataIndex: col.column,
    key: col.id,
    render: col.render,
  }));

  return (
    <div className="mt-6 overflow-x-auto shadow-md rounded-lg">
      <Table
        columns={tableColumns}
        dataSource={data}
        rowKey="id"
        bordered
        // pagination={false} 
        className="text-sm"
      />
    </div>
  );
};

export default List;










// import { useEffect } from "react";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import {Table} from 'antd'

// interface Column {
//   id: string;
//   title: string;
//   column: string;
//   super_column?: string;
//   type: string;
// }

// interface Data {
//   id: string;
//   [key: string]: string | number | boolean | null | undefined; // Allow null or undefined as possible values
// }

// interface ListProps {
//   columns: Column[];
//   data: Data[];
//   handleEdit: (id: string) => void;
//   handleDelete: (id: string) => void;
// }

// const List: React.FC<ListProps> = ({
//   columns,
//   data,
//   handleEdit,
//   handleDelete,
// }) => {
// console.log("data22",columns)
 
//   return (
//     <div className="overflow-x-auto shadow-md rounded-lg mt-6">
      
//       <table className="min-w-full bg-white border-collapse">
//         <thead className="bg-gray-400 text-white">
//           <tr>
//             {columns?.map((_col, index) => {
//               return (
//                 <th
//                   key={_col.id}
//                   className="px-6 py-4 text-lg font-semibold text-left"
//                 >
//                   {_col.title}
//                 </th>
//               );
//             })}
//           </tr>
//         </thead>
//         <tbody>
//   {  
//   data?.map((_item, index):any => {
//     return (
//       <tr key={_item.id} className="border-t hover:bg-gray-100">
//         {columns?.map((_col) => {
//           return (
//             <td key={_col.column} className="px-6 py-4 text-sm text-gray-800">
//               {_col.type === "actions" ? (
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(_item)}
//                     className="w-5 h-5 cursor-pointer text-blue-600 hover:text-blue-800"
//                   >
//                     <FaEdit className="h-6 w-6" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(_item.id)}
//                     className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800"
//                   >
//                     <MdDelete className="h-6 w-6" />
//                   </button>
//                 </div>
//               ) : (
//                 _col.Boolean === "displayStatus" ? (
//                   _item.status === 1 ? "Active" : "InActive"
//                 ) : _col.columnsecond === "mergi_consumption" ? (
//                   `${_item.min_consumption}-${_item.max_consumption}`
//                 ) : _col?.type === "number" ? (
//                   index + 1
//                 ) : _col.super_column ? (
//                   _item[_col?.super_column]?.[_col?.column] ?? "NA"
//                 ) : (
//                   _item[_col.column] ?? "NA"
//                 )
//               )}
//             </td>
//           );
//         })}
//       </tr>
//     );
//   })
//   }
// </tbody>

//       </table>
//     </div>
//   );
// };

// export default List;
