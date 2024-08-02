// Define the dynamic slabs
// const slabs = [
//     { max: 8000, ratePerThousand: 1.72 },
//     { max: 15000, ratePerThousand: 2.2 },
//     { max: 40000, ratePerThousand: 4.4 },
//     { max: Infinity, ratePerThousand: 5.5 }
// ];
import { slabs, rebates } from "@/components/data";

export function calculateWaterBill(readings) {
    // console.log("slabs", slabs);
    // if(consumption)
    for (const reading of readings) {
        let { consumption, category, connection_size, meter_status } = reading;
        let previousMax = 0;
        let waterCharge = 0;

        // check for rebate in domestic connection
        if (getZeroOnConsumption(connection_size, category, consumption)) {
            waterCharge = 0;
            previousMax = 0;
        } else {
            for (let i = 0; i < slabs?.length; i++) {
                const slab = slabs[i];

                if (consumption <= slab.max) {
                   
                    waterCharge += ((consumption - previousMax) / 1000) * slab.ratePerThousand;

                    break;
                } else {
                   
                    waterCharge += ((slab.max - previousMax) / 1000) * slab.ratePerThousand;

                    previousMax = slab.max;
                }
            }
        }
        reading.waterCharge = waterCharge
        reading.minimum = getMinimumCharge(reading)
        // compare water charge with minimum charge
       
        reading.bill = reading.waterCharge > reading.minimum ? reading.waterCharge : reading.minimum
        reading.fixedCharge = addFixedCharge(reading)

        reading.bill = reading.bill + addFixedCharge(reading).total_fixed_charge

    }
    console.log('readings', readings)
    return readings;
}


function getZeroOnConsumption(connection_size, category, consumption) {
    connection_size == "15mm" && category == "d" && consumption <= '15000'
}

function getMinimumCharge(reading) {
    if (reading.meter_status == "mf" && reading.consumption <= "15000") {
        return 0
    } else {
        return 55
    }

}

function addFixedCharge(reading) {
    let fixedCharge = 0;
    let meterServiceCharge = 0

    switch (reading.category) {
        case "d":
            fixedCharge = 27.50;

            break;
        case "nd":
            fixedCharge = 55.00
            break;
        case "id":
            fixedCharge = 110.00
            break;
        default:
            fixedCharge = 0
            break;
    }

    switch (reading.connection_size) {
        case "15mm":
            meterServiceCharge = 22.00;

            break;
        case "20mm":
            meterServiceCharge = 55.00
            break;
        case "25mm":
            meterServiceCharge = 110.00
            break;
        default:
            meterServiceCharge = 0
            break;
    }

    return { service_charge: meterServiceCharge, fixed_charge: fixedCharge, total_fixed_charge: fixedCharge + meterServiceCharge }
}