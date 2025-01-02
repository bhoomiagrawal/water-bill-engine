import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BillAgencyList from "@/components/BillAgency/BillAgencyEnrollment/BillAgencyList";

export const metadata: Metadata = {
  title: "Next.js Form Elements | ReadingSheet - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for ReadingSheet - Next.js Tailwind CSS Admin Dashboard Template",
};

const billAgencyList = () => {
  return (
    <DefaultLayout>
      <BillAgencyList/>
    </DefaultLayout>
  );
};

export default billAgencyList;
