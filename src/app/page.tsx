"use client";
import React, { FormEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import Chart from "@/components/Charts/page";



const SignIn: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    console.log("ram")
    e.preventDefault();
    router.push("/verifyByCIN");
  };
  return (
    <DefaultLayout>
      <Chart/>

    </DefaultLayout>
  );
};

export default SignIn;
