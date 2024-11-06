export default function ComputationData ({data, slabs}) {
    console.log('data', data)
    console.log('slabs', slabs)

    console.log('PREV data', data.prev)

    const getSlabsUI = () => {

        return slabs?.map((slab, i) => {
            let maxConsumption = data.averageConsumption <= slab.max ? data.averageConsumption : slab.max
        let higherSlab = i <1 ? maxConsumption : maxConsumption - slabs[i-1].max;
        let currIndex = i
           return  <tr>
                  <td className="border px-4 py-2">Water slab Charge:</td>
                  <td className="border px-4 py-2">{i <1 ? `0 - ${slab.max}` : `${slabs[i-1].max} - ${slab.max}`}</td>
                  <td className="border px-4 py-2">{slab.ratePerThousand}</td>
                  <td className="border px-4 py-2">{higherSlab}</td>
                  <td className="border px-4 py-2">{higherSlab/1000 * (slab.ratePerThousand)}</td>
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
                    <strong>Month:</strong>
                  </td>
                  <td className="border px-4 py-2">MAY-2021</td>
                  <td className="border px-4 py-2">Average Consumption:</td>
                  <td className="border px-4 py-2">{data?.averageConsumption}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <strong>Previous Reading:</strong>
                  </td>
                  <td className="border px-4 py-2">{data?.curr_rdg1}</td>
                  <td className="border px-4 py-2">Current Reading:</td>
                  <td className="border px-4 py-2">{data?.curr_rdg}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <strong>Fault Code:</strong>
                  </td>
                  <td className="border px-4 py-2">{data?.meter_stts.toUpperCase()}</td>
                  <td className="border px-4 py-2">Total Consumption:</td>
                  <td className="border px-4 py-2">{data?.curr_cons}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <strong>Charge Name:</strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>Consumption slab</strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>Rate (Per 1000 ltr.):</strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>Unit Consumed:</strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>Amount:</strong>
                  </td>
                </tr>
               {getSlabsUI()}           
                <tr>
                  <td className="border px-4 py-2">
                    <strong>Total Consumption Amount:</strong>
                  </td>
                  <td className="border px-4 py-2">
                    <strong>{data?.basicCharge}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Minimum Charge:</td>
                  <td className="border px-4 py-2">
                  {data?.minimum}
                  </td>
                  <td className="border px-4 py-2" colSpan={2}>
                  {data?.minimum}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2" colSpan={4}>
                    <strong>
                      Applied Water Charge as it is higher than Minimum Charge.
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Sewerage Charge:</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td> */}
                  <td className="border px-4 py-2">20%</td>
                  <td className="border px-4 py-2">
                  {data?.sewerage_tax == 'n' ? 'N/A' 
                      : data?.sewerage_tax == 'y' ? data?.sewerage_tax
                      :data?.sewerage_tax
                      }
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">STP Charge:</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td> */}
                  <td className="border px-4 py-2">13%</td>
                  <td className="border px-4 py-2">
                  {data?.stp == 'n' ? 'N/A' 
                      : data?.stp == 'y' ? data?.stp
                      :data?.stp
                      }
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Meter Service Charge: </td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td> */}
                  <td className="border px-4 py-2">{data?.fixedCharge?.service_charge}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Fixed Charge:</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td> */}
                  <td className="border px-4 py-2">{data?.fixedCharge?.fixed_charge}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    <strong>Bill Sub Total </strong>{" "}
                  </td>
                  <td className="border px-4 py-2">
                    {/* <strong>416.44</strong> */}
                    <strong>
                      {data?.waterCharge + data?.fixedCharge?.total_fixed_charge}                 
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">IDC Charge:</td>
                  <td className="border px-4 py-2">{data?.idc}</td>
                  {/* <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">55</td> */}
                </tr>
                {/* new code  */}
                
        </>
    )
}