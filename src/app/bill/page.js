"use client";
import Head from 'next/head';
import ReadExcel from "@/components/ReadExcel";
import Billing from "@/components/Billing";
import { useState } from 'react';

// Example usage:

// console.log(`The water bill for a consumption of ${consumption} litres is Rs. ${waterBill.toFixed(2)}`);

export default function Bill() {

  
    return (
        <main className=" min-h-screen">
            {/* MY UI CODE START FROM HEAR */}
            
    
        <Billing />
      {/* <ReadExcel /> */}

     
            {/* MY UI CODE END HEAR */}
           

        </main>
    );
}


