import { slabs, rebates } from "@/components/data";

export function calculateWaterBill(readings) {
  // console.log("slabs", slabs);
  for (const reading of readings) {
    let { current_consumption, category, connection_size, meter_status } = reading;
    let previousMax = 0;
    let basicCharge = 0;

    // check for rebate in domestic connection
    if (meter_status == "mf" && getZeroOnConsumption(connection_size, category, current_consumption)) {
      basicCharge = 0;
      previousMax = 0;
    } else {
      basicCharge = getBasicCharge(reading)
      // for (let i = 0; i < slabs?.length; i++) {
      //   const slab = slabs[i];

      //   if (consumption <= slab.max) {
      //     basicCharge +=
      //       ((consumption - previousMax) / 1000) * slab.ratePerThousand;

      //     break;
      //   } else {
      //     basicCharge +=
      //       ((slab.max - previousMax) / 1000) * slab.ratePerThousand;

      //     previousMax = slab.max;
      //   }
      // }
    }
    reading.basicCharge = reading.connection_type == "t" ? basicCharge * 1.5 : basicCharge
    reading.minimum = getMinimumCharge(reading);
    // compare water charge with minimum charge

    reading.waterCharge =
      reading.basicCharge > reading.minimum
        ? reading.basicCharge
        : reading.minimum;
    reading.fixedCharge = addFixedCharge(reading);
    reading.severageCharge = getSeverageCharge(reading, reading.basicCharge);
    if (reading.stp == "y") {
      reading.stp = getStpCharge(reading)
    } else {
      reading.stp = 0
    }
    console.log('reading.stp', reading.stp)
    reading.bill =
      reading.waterCharge +
      addFixedCharge(reading).total_fixed_charge +
      reading.severageCharge + reading.stp;
  }
  console.log("readings", readings);
  return readings;
}

function getBasicCharge(reading) {
  let { current_consumption, category, connection_size, meter_status } = reading;

  let bCharge = 0;
  let previousMax = 0;

  let averageConsumption = meter_status != "mf" ? getAverageConsumption(reading) : '-'
  let consumption = current_consumption ? current_consumption : averageConsumption;

  reading.averageConsumption = averageConsumption
  let catSlabs = slabs.filter(s => {
    if (s.category == reading.category) {
        return connection_size > 25 ? s.isBulk == true : s.isBulk == false
    }
  })




  console.log('catSlabs', catSlabs)
  for (let i = 0; i < catSlabs?.length; i++) {
    const slab = catSlabs[i];

    if (consumption <= slab.max) {
      bCharge +=
        ((consumption - previousMax) / 1000) * slab.ratePerThousand;

      break;
    } else {
      bCharge +=
        ((slab.max - previousMax) / 1000) * slab.ratePerThousand;

      previousMax = slab.max;
    }
  }
  return bCharge

}

function getZeroOnConsumption(connection_size, category, current_consumption) {
  return connection_size == 15 && category == "d" && current_consumption <= 15000;
}

function getMinimumCharge(reading) {
  let minimumCharge = 0
  console.log('reading >>>>>>>>>>>>>>>>>>>>', reading)
  switch (reading.connection_size) {
    case 15:
      if ((reading.meter_status).toLowerCase() == "mf" && reading.current_consumption <= 15000) {
        minimumCharge = 0;
      } else {
        minimumCharge = reading.connection_type == "t" ? 82.5 : 55
      }

      break;
    case 20:
      minimumCharge = 220.0;
      break;
    case 25:
      minimumCharge = 550.0;
      break;
    default:
      minimumCharge = 0;
      break;
  }
  return minimumCharge
}

function addFixedCharge(reading) {
  console.log('reading', reading)
  let fixedCharge = 0;
  let meterServiceCharge = 0;

  switch (reading.category) {
    case "d":
      fixedCharge = 27.5;

      break;
    case "nd":
      fixedCharge = 55.0;
      break;
    case "id":
      fixedCharge = 110.0;
      break;
    default:
      fixedCharge = 0;
      break;
  }

  switch (reading.connection_size) {
    case 15:
      meterServiceCharge = 22.0;

      break;
    case 20:
      meterServiceCharge = 55.0;
      break;
    case 25:
      meterServiceCharge = 110.0;
      break;
    default:
      meterServiceCharge = 0;
      break;
  }

  return {
    service_charge: meterServiceCharge,
    fixed_charge: fixedCharge,
    total_fixed_charge: fixedCharge + meterServiceCharge,
  };
}

function getSeverageCharge(reading) {
  const { waterCharge, severage } = reading;
  let severageCharge = severage == "y" ? (waterCharge * 20) / 100 : 0;
  return severageCharge;
}


function getAverageConsumption(reading) {
  let monthlyReadings = [reading[1], reading[2], reading[3], reading[4], reading[5], reading[6], reading[7]]
  // let current_reading = reading['current_reading'];
  // let current_consumption = typeof reading['current_consumption'] == Number ? reading['current_consumption'] : '';

  monthlyReadings.sort((a, b) => b - a)
  let monthlyConsumption = []
  // if(current_consumption) {
  //   monthlyConsumption.push(current_consumption)
  // }

  // Loop through the array, subtracting each element from the next
  for (let i = 0; i < monthlyReadings.length - 1; i++) {
    monthlyConsumption.push(monthlyReadings[i] - monthlyReadings[i + 1]);
  }

  const sixReadingConsumptionAv = (monthlyConsumption.reduce((prev, curr, i) => prev + curr, 0)) / monthlyConsumption.length
  return Math.round(sixReadingConsumptionAv)

}

function getStpCharge(reading) {
  // 13% of water charge whatever the connection category is

  let stp = (reading.waterCharge * 13) / 100

  return stp
}