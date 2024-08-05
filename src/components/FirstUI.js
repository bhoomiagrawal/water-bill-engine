// components/FirstUI.js

import { useState } from 'react';
import ReadExcel from './ReadExcel';
import { calculateWaterBill } from "@/components/calc";

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

export default function FirstUI() {
  const [usage, setUsage] = useState('');
  const [bill, setBill] = useState(null);

  const [displayItem, setDisplayItem] = useState(false)
 

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
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src="/water-1560478_1280.png"
          style={{opacity: '0.6'}}
          // src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className=" absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        {/* <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl -mt-20">Work with us</h2> */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white -mt-20">Water billing system</h2>
      <ReadExcel displayItem={displayItem} setDisplayItem={setDisplayItem}/>

      <h2>Water Bill Connection</h2>
      <div className="">{displayItem ? getUI() : ""}</div>
        </div>
       
      </div>

      </div>
      <div>
      <footer style={{textAlig:'center',padding:'10px',
        backgroundColor:'#f0f8ff',
        color:'#007acc'}}>
        <p>&copy; {new Date().getFullYear()} Water Billing Co.</p>
      </footer>
      </div>


    </>
  );
}

const styles = {
  formContainer: {
    backgroundColor: '#f0f8ff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007acc',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
    fontSize: '18px',
  },
};