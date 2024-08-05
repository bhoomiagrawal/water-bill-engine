// components/FirstUI.js

import { useEffect, useState } from 'react';
import ReadExcel from './ReadExcel';
import { calculateWaterBill } from "@/components/calc";

// let staticReadings = [
//   {
//     category: "d",
//     connection_size: "15mm",
//     current_consumption: "45000",
//     meter_status: "mf",
//     severage: "yes",
//   },
//   {
//     category: "d",
//     connection_size: "15mm",
//     current_consumption: "20000",
//     meter_status: "mf",
//     severage: "yes",
//   },
//   {
//     category: "d",
//     connection_size: "15mm",
//     current_consumption: "15000",
//     meter_status: "mf",
//     severage: "yes",
//   },
//   {
//     category: "d",
//     connection_size: "15mm",
//     current_consumption: "10000",
//     meter_status: "mf",
//     severage: "no",
//   },
//   {
//     category: "d",
//     connection_size: "15mm",
//     current_consumption: "15001",
//     meter_status: "mf",
//     severage: "yes",
//   },
//   {
//     category: "d",
//     connection_size: "15mm",
//     current_consumption: "16000",
//     meter_status: "mf",
//     severage: "no",
//   },
// ];
// let waterBill = calculateWaterBill(staticReadings);

export default function Billing() {
  const [usage, setUsage] = useState('');
  const [readings, setReadings] = useState([]);
  const [displayItem, setDisplayItem] = useState(false)
  const [waterBill, setWaterBill] = useState([])
  useEffect(() => {
    if (readings.length) {
      setWaterBill(calculateWaterBill(readings));
      setDisplayItem(true)
      // console.log('test', test)
    }
  }, [readings.length])
  const getUI = () =>
    waterBill?.map((r, i) => {
      return (

        <tr key={i} >
          <td>  {r.category}</td>
          <td>  {r.connection_size}</td>
          <td>  {r.connection_type}</td>
          <td>  {r.current_consumption}</td>
          <td>  {r.meter_status}</td>
          <td>  {r.waterCharge?.toFixed(2)}</td>
          <td>  {r.minimum?.toFixed(2)}</td>
          <td>  {r.basicCharge?.toFixed(2)}</td>
          <td>  {r.severageCharge?.toFixed(2)}</td>
          <td>  {r.fixedCharge?.fixed_charge}</td>
          <td>  {r.fixedCharge?.service_charge}</td>
          <td>  {r.fixedCharge?.total_fixed_charge}</td>
          <td>  {r.bill?.toFixed(2)}</td>
        </tr>



      );
    });
  return (
    <>
      <div className="bg-blue-100 relative isolate overflow-hidden py-24 sm:py-32 min-h-screen">
        <img
          alt=""
          src="/water-1560478_1280.png"
          style={{ opacity: '0.6' }}
          // src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="m-4">
          <div className=" max-w-full lg:mx-0">
            <h2 className="m-2 text-4xl font-bold tracking-tight text-gray -mt-20">Water Billing System</h2>
            <ReadExcel setReadings={setReadings} />

            {displayItem ?
              <>
                <div className="p-2 m-2">
                  <h2 className="p-2 m-2 mt-8 font-bold text-center">Water Bill Calculation</h2>

                  <table className="table table-striped mt-6 text-lg leading-8 " style={{ width: '100%' }}>

                    <thead>
                      <tr className='row-auto '>

                        <th >Category</th>
                        <th >Connection Size</th>
                        <th >Connection Type</th>
                        <th >Current Consumption</th>
                        <th >Meter status</th>
                        <th >Water charge</th>
                        <th >Minimum charge</th>
                        <th >Basic charge</th>
                        <th >Severage charge</th>
                        <th >( Fixed charge+</th>
                        <th >Meter Service charge=</th>
                        <th >Total Fixed charge)</th>
                        <th >Bill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getUI()}
                    </tbody>
                  </table>
                </div>
              </>

              : ""}
          </div>

        </div>

      </div>
      <div>
        <footer style={{
          textAlig: 'center', padding: '10px',
          backgroundColor: '#f0f8ff',
          color: '#007acc'
        }}>
          <p className='text-center '>&copy; {new Date().getFullYear()} Water Billing System.</p>
        </footer>
      </div>


    </>
  );
}

