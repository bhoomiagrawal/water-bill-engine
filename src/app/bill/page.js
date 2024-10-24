"use client";
import ReadExcel from "@/components/ReadExcel";
import { calculateWaterBill } from "@/components/calc";

// Example usage:
let readings = [
  {
    category: "d",
    connection_size: "15mm",
    consumption: "45000",
    meter_status: "mf",
    severage: "yes",
  },
  {
    category: "d",
    connection_size: "15mm",
    consumption: "20000",
    meter_status: "mf",
    severage: "yes",
  },
  {
    category: "d",
    connection_size: "15mm",
    consumption: "15000",
    meter_status: "mf",
    severage: "yes",
  },
  {
    category: "d",
    connection_size: "15mm",
    consumption: "10000",
    meter_status: "mf",
    severage: "no",
  },
  {
    category: "d",
    connection_size: "15mm",
    consumption: "15001",
    meter_status: "mf",
    severage: "yes",
  },
  {
    category: "d",
    connection_size: "15mm",
    consumption: "16000",
    meter_status: "mf",
    severage: "no",
  },
];
let waterBill = calculateWaterBill(readings);
console.log("waterBill", waterBill);
// console.log(`The water bill for a consumption of ${consumption} litres is Rs. ${waterBill.toFixed(2)}`);

export default function Bill() {
  const getUI = () =>
    readings?.map((r, i) => {
      return (
        <ul key={i} className="flex justify-between">
          <li> category: {r.category}</li>
          <li> Connection Size: {r.connection_size}</li>
          <li> consumption: {r.consumption}</li>
          <li> meter status: {r.meter_status}</li>
          <li> water charge: {r.waterCharge?.toFixed(2)}</li>
          <li> minimum charge: {r.minimum?.toFixed(2)}</li>
          <li> basic charge: {r.basicCharge?.toFixed(2)}</li>
          <li> severage charge: {r.severageCharge?.toFixed(2)}</li>

          <li> Fixed charge: {r.fixedCharge?.fixed_charge}</li>
          <li> Meter Service charge: {r.fixedCharge?.service_charge}</li>
          <li> total Fixed charge: {r.fixedCharge?.total_fixed_charge}</li>
          <li> bill: {r.bill?.toFixed(2)}</li>
        </ul>
      );
    });
  return (
    <main className=" min-h-screen  p-24">
      <h2>Water Bill Connection</h2>
      <div className="">{getUI()}</div>
      <ReadExcel />
    </main>
  );
}
