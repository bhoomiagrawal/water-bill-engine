import { calculateWaterBill } from "@/components/calc";
import { slabs } from "@/components/slabs";
// Example usage:
let reading = 45000;
let waterBill = calculateWaterBill(reading, slabs);
console.log(`The water bill for a reading of ${reading} litres is Rs. ${waterBill.toFixed(2)}`);

export default function Bill() {
    return (
        <main className=" min-h-screen  p-24">
            <h2>Water Bill Connection</h2>
            <div>
                The water bill for a reading of ${reading} litres is Rs. ${waterBill.toFixed(2)}
            </div>

        </main>
    );
}
