'use client'
import React, { useState } from "react";
import { Table, Button, Input, Row, Col } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation'
import RegistrationDetail from "./RegistrationDetail";

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

const BillAgencyList: React.FC = () => {
  const [data, setData] = useState<Data[]>([
    { id: "1", category_name: "APP1234", category_code: "ABC Corp.", status: 1, approved_on: "2024-12-01" },
    { id: "2", category_name: "APP5678", category_code: "XYZ Ltd.", status: 0, approved_on: "2023-11-15" },
  ]);

  const router = useRouter()


  const [searchQuery, setSearchQuery] = useState<string>("");
  const[billAgencyFormOpen,setBillAgencyFormOpen] = useState(false)
console.log("billAgencyFormOpen",billAgencyFormOpen)
  const columns: Column[] = [
    { id: "1", title: "S.No", column: "index", type: "number" },
    { id: "2", title: "App No", column: "category_name", type: "text" },
    { id: "3", title: "Company Name", column: "category_code", type: "text" },
    { id: "4", title: "Status", column: "status", type: "text" },
    { id: "5", title: "Approved On", column: "approved_on", type: "text" },
    { id: "6", title: "Actions", column: "actions", type: "actions" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.column]).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleEdit = (id: string) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    
    
    
      router.push("/billAgencyEnrollment")
    
    
  };

  const columnsWithActions = columns.map((col) => ({
    ...col,
    render: (_: any, record: Data, index: number) => {
      if (col.type === "actions") {
        return (
          <div className="flex space-x-4">
            <Button
              type="link"
              onClick={() => handleEdit(record.id)}
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
      } else {
        return record[col.column] ?? "NA";
      }
    },
  }));

  const tableColumns = columnsWithActions.map((col) => ({
    title: col.title,
    dataIndex: col.column,
    key: col.id,
    render: col.render,
  }));

  return (
    <div className="mt-6">
      {/* {
        billAgencyFormOpen && <RegistrationDetail/>
      } */}
      <Row className="mb-4" justify="space-between" align="middle">
        <Col>
          <h2 className="text-2xl font-semibold text-gray-700">Bill Agency List</h2>
        </Col>
        <Col className="flex space-x-4">
          <Input
            placeholder="Search Bill Agency..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-xs rounded-lg border-gray-300 shadow-sm"
          />
          <Button
            type="primary"
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow-lg"
          >
            Add Bill Agency
          </Button>
        </Col>
      </Row>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <Table
          columns={tableColumns}
          dataSource={filteredData}
          rowKey="id"
          bordered
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default BillAgencyList;
