"use client";

import React, { useEffect, useState } from "react";
import * as resource from "../../../config/form";
import { useRouter } from "next/navigation";
import Form from "@/components/Main/Form";
import { useInternalService } from "@/components/hook/useInternalService";
import { toast } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Page = ({ params }: any) => {
  const { slug } = params;
  const router = useRouter();
  const column = resource[slug];
  const [data, setData] = useState<any>({});
  const [inputeField, setInputeField] = useState<any>([]);

  useEffect(() => {
    const columnVal = column?.map((field: any) => ({
      title: field.title,
      column: field.column,
      type: field.type,
      selectKey: field.selectKey,
      source: field.source || "",
    }));

    setInputeField(columnVal);
  }, [column]);

  const handleChange = (newData: any) => {
    setData(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {};
    inputeField?.forEach((field: any) => {
      if (data[field.column] || field.column === "status") {
        payload[field.column] = data[field.column] ?? true; 
      }
    });

    // Handle create or update API request here
    // if (resourceId) {
    //   updateResource(payload);
    // } else {
    //   createResource(payload);
    // }
  };

  if (!column) {
    return <div>Content not found for the slug: {slug}</div>;
  }

  return (
    <DefaultLayout>
      <button
        onClick={() => router.push(`/list/${slug}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md ml-10 mt-3"
      >
        Back
      </button>

      <Form
        slug={slug}
        column={inputeField}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </DefaultLayout>
  );
};

export default Page;
