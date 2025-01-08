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
  columnsecond: string;
}
type DataValue = string | number | boolean | null | undefined;

interface Data {
  id: string;
  [key: string]: DataValue | Record<string,DataValue>;
}

interface ListProps {
  columns: Column[];
  data: Data[];
  handleEdit: (record: Data) => void; 
  handleDelete: (id: string) => void;
}

const List: React.FC<ListProps> = ({
  columns,
  data,
  handleEdit,
  handleDelete,
}) => {
  console.log("dataoooo", data);
  const columnsWithActions = columns?.map((col) => ({
    ...col,
    render: (_: any, record: Data, index: number) => {
      if (col.type === "actions") {
        return (
          <div className="flex space-x-4">
            <Button
              type="link"
              onClick={() => handleEdit(record)} // Pass record directly
              icon={<FaEdit />}
              className="text-blue-500 text-2xl hover:text-blue-700"
            />

            <Button
              type="link"
              onClick={() => handleDelete(String(record.id))}
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
        return `${record.min_consumption}-${record.max_consumption}`;
      } else {
        return col.super_column
          ? ((record[col.super_column] as Record<string,DataValue>)[col.column] ?? "NA")
          : (record[col.column] ?? "NA");
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
