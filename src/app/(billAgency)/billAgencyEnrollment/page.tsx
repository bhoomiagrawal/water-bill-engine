import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BillAgencyEnrollment from "@/components/BillAgency/BillAgencyEnrollment";

export const metadata: Metadata = {
  title: "Next.js Form Elements | ReadingSheet - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for ReadingSheet - Next.js Tailwind CSS Admin Dashboard Template",
};

const BillAgencyEnrollmentPage = () => {
  return (
    <DefaultLayout>
      <BillAgencyEnrollment/>
    </DefaultLayout>
  );
};

export default BillAgencyEnrollmentPage;
