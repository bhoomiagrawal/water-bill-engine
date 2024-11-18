"use client"
import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Reading from "@/components/ReadingSheet/Reading";

// export const metadata: Metadata = {
//   title: "Next.js Form Elements | ReadingSheet - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Elements page for ReadingSheet - Next.js Tailwind CSS Admin Dashboard Template",
// };

const handleForm=()=>{}

const ReadingSheetPage = () => {
  return (
    <DefaultLayout>
      <Reading/>
     </DefaultLayout>
  );
};

export default ReadingSheetPage;
