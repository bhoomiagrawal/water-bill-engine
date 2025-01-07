"use client";
import React, { FormEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import Chart from "@/components/Charts/page";
import WaterBill from "@/components/WaterBill";



const WaterBillPage: React.FC = () => {
  const router = useRouter();


  return (
    <DefaultLayout>
      <WaterBill/>
      {/* <WaterBill/> */}

    </DefaultLayout>
  );
};

export default WaterBillPage;
