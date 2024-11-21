"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Billing from "../../components/Bill/Billing";

// import Head from 'next/head';
// import ReadExcel from "@/components/ReadExcel";


// Example usage:

// console.log(`The water bill for a consumption of ${consumption} litres is Rs. ${waterBill.toFixed(2)}`);

export default function Bill() {


    return (
        <main className=" min-h-screen">
            {/* MY UI CODE START FROM HEAR */}

            <DefaultLayout>

                <Billing />
            </DefaultLayout>
            {/* <ReadExcel /> */}


            {/* MY UI CODE END HEAR */}


        </main>
    );
}


