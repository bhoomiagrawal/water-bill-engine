export default function ComputationData ({data, slabs}) {
    // console.log('data', data)
    // console.log('slabs', slabs)

    // console.log('PREV data', data.prev)

    const getSlabsUI = () => {

        return slabs?.map((slab, i) => {
          let  consumption = data.averageConsumption || data?.curr_cons
            let maxConsumption = consumption <= slab.max ? consumption : slab.max;
            console.log('consumption', consumption)
            console.log('maxConsumption, slab, i', maxConsumption, slab, i)
        let higherSlab = i <1 ? maxConsumption : maxConsumption - slabs[i-1].max;
        // console.log(higherSlab,"slab value")
        console.log(maxConsumption,"maxConsumption")
        console.log(i <1 ? maxConsumption : maxConsumption - slabs[i-1].max,"i <1 ? maxConsumption : maxConsumption - slabs[i-1].max")
        let currIndex = i
           return  <tr>
                  <td className="border px-4 py-2">Water slab Charge:</td>
                  <td className="border px-4 py-2">{i <1 ? `0 - ${slab.max}` : `${slabs[i-1].max} - ${slab.max}`}</td>
                  <td className="border px-4 py-2">{slab.ratePerThousand}</td>
                  <td className="border px-4 py-2">{higherSlab/1000}</td>
                  <td className="border px-4 py-2">{(higherSlab/1000 * (slab.ratePerThousand)).toFixed(2)}</td>
                </tr>
        })
//         return (
// <>
// <tr>
//                   <td className="border px-4 py-2">Water slab Charge:</td>
//                   <td className="border px-4 py-2">0 - 8000</td>
//                   <td className="border px-4 py-2">1.72</td>
//                   <td className="border px-4 py-2">8000</td>
//                   <td className="border px-4 py-2">13.76</td>
//                 </tr>
//                 <tr>
//                   <td className="border px-4 py-2">Water slab Charge:</td>
//                   <td className="border px-4 py-2">8000 - 15000</td>
//                   <td className="border px-4 py-2">2.20</td>
//                   <td className="border px-4 py-2">14000</td>
//                   <td className="border px-4 py-2">15.40</td>
//                 </tr>
//                 <tr>
//                   <td className="border px-4 py-2">Water slab Charge:</td>
//                   <td className="border px-4 py-2">15000 - 40000</td>
//                   <td className="border px-4 py-2">4.40</td>
//                   <td className="border px-4 py-2">25000</td>
//                   <td className="border px-4 py-2">110.00</td>
//                 </tr>
//                 <tr>
//                   <td className="border px-4 py-2">Water slab Charge:</td>
//                   <td className="border px-4 py-2">40000 &gt;</td>
//                   <td className="border px-4 py-2">5.50</td>
//                   <td className="border px-4 py-2"></td>
//                   <td className="border px-4 py-2"></td>
//                 </tr>  

// </>
//         )
    }
    return (
        <>
          <tr>
                  <td className="border px-4 py-2">
                    <strong>Month</strong>
                  </td>
                  <td className="border px-4 py-2">MAY-2021 not dynamic</td>
                  <td className="border px-4 py-2">Average Consumption</td>
                  <td className="border px-4 py-2">{data?.averageConsumption}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <strong>Previous Reading</strong>
                  </td>
                  <td className="border px-4 py-2">{data?.curr_rdg1}</td>
                  <td className="border px-4 py-2">Current Reading</td>
                  <td className="border px-4 py-2">{data?.curr_rdg}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <strong>Fault Code</strong>
                  </td>
                  <td className="border px-4 py-2">{data?.meter_stts.toUpperCase()}</td>
                  <td className="border px-4 py-2">Total Consumption</td>
                  <td className="border px-4 py-2">{data?.curr_cons}</td>
                </tr>                
                <tr>
                  <td className="border px-4 py-2">
                    <strong>Charge Name</strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>["A"] Consumption slab </strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>["B"] Rate (Per 1000 LTR.)</strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>["C"] Unit Consumed (KL)</strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>["D"] Amount (B*C)</strong>
                  </td>
                </tr>
               {getSlabsUI()}           
                <tr>
                  <td className="border px-4 py-2 text-right">
                    <strong>Total Consumption Amount</strong>
                  </td>
                  <td className="border px-4 py-2">
                  </td>
                  {}
                  <td className="border px-4 py-2">
                    <strong>{data?.basicCharge.toFixed(2)}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Minimum Charge</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">
                  {data?.minimum}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <strong>
                        {data?.basicCharge > data?.minimum ? '["E"] Applied Water Charge as it is higher than Minimum Charge.' : '["E"] Applied Minimum Charge as it is higher than Water Charge.'}                  
                    </strong>
                  </td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">{data?.waterCharge}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">["F"] Sewerage Charge</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td> */}
                  <td className="border px-4 py-2">20% of ["E"]</td>
                  <td className="border px-4 py-2">
                  {data?.sewerage_tax == 'n' ? 'N/A' 
                      : data?.sewerage_tax == 'Y' ? data?.sewerageCharge
                      :data?.sewerageCharge
                      }
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">["G"] STP Charge</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td> */}
                  <td className="border px-4 py-2">13% of ["E"]</td>
                  <td className="border px-4 py-2">
                  {data?.stp == 'n' ? 'N/A' 
                      : data?.stp == 'y' ? data?.stpCharge
                      :data?.stpCharge
                      }
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">["H"] Meter Service Charge</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td> */}
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">{data?.fixedCharge?.service_charge}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">["I"] Fixed Charge</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td> */}
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">{data?.fixedCharge?.fixed_charge}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-right">
                    <strong >["J"] Bill Sub Total (E+F+G+H+I)</strong>{" "}
                  </td>
                  <td className="border px-4 py-2"> </td>
                  <td className="border px-4 py-2">
                    <strong>
                      {Number(data?.waterCharge) + Number(data?.fixedCharge?.total_fixed_charge)}                 
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">["K"] IDC Charge</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">{data?.idc.toFixed(2)}</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">55</td> */}
                </tr>
                {/* new code  */}
                
        </>
    )
}