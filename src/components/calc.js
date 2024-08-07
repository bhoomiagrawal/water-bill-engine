import { slabs, rebates } from "@/components/data";

export function calculateWaterBill(readings) {
  // console.log("slabs", slabs);
  for (const reading of readings) {
    let { current_consumption, category, connection_size, meter_status } = reading;
    let previousMax = 0;
    let waterCharge = 0;
    let averageConsumption = getAverageConsumption(reading)
    console.log('averageConsumption', averageConsumption)
    let consumption = current_consumption ? current_consumption : averageConsumption
    // check for rebate in domestic connection
    console.log('getZeroOnConsumption function for current_consumption ', current_consumption, 'is', getZeroOnConsumption(connection_size, category, current_consumption))
    if (getZeroOnConsumption(connection_size, category, current_consumption)) {
      waterCharge = 0;
      previousMax = 0;
    } else {
      for (let i = 0; i < slabs?.length; i++) {
        const slab = slabs[i];

        if (current_consumption <= slab.max) {
          waterCharge +=
            ((current_consumption - previousMax) / 1000) * slab.ratePerThousand;

          break;
        } else {
          waterCharge +=
            ((slab.max - previousMax) / 1000) * slab.ratePerThousand;

          previousMax = slab.max;
        }
      }
    }
    reading.waterCharge = reading.connection_type == "T" ? waterCharge * 1.5 : waterCharge
    // reading.waterCharge = waterCharge;
    reading.minimum = getMinimumCharge(reading);
    // compare water charge with minimum charge

    reading.basicCharge =
      reading.waterCharge > reading.minimum
        ? reading.waterCharge
        : reading.minimum;
    reading.fixedCharge = addFixedCharge(reading);
    reading.severageCharge = getSeverageCharge(reading, reading.basicCharge);

    reading.bill =
      reading.basicCharge +
      addFixedCharge(reading).total_fixed_charge +
      reading.severageCharge;
  }
  console.log("readings", readings);
  return readings;
}

function getZeroOnConsumption(connection_size, category, current_consumption) {
  return connection_size == 15 && category == "D" && current_consumption <= 15000;
}

function getMinimumCharge(reading) {
  if (reading.meter_status == "mf" && reading.current_consumption <= 15000) {
    return 0;
  } else {
    return reading.connection_type == "T" ? 82.5 : 55
  }
}

function addFixedCharge(reading) {
  console.log('reading', reading)
  let fixedCharge = 0;
  let meterServiceCharge = 0;

  switch (reading.category) {
    case "D":
      fixedCharge = 27.5;

      break;
    case "ND":
      fixedCharge = 55.0;
      break;
    case "ID":
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
  const { basicCharge, severage } = reading;
  let severageCharge = severage == "Y" ? (basicCharge * 20) / 100 : 0;
  return severageCharge;
}


function getAverageConsumption(reading) {
  console.log('reading', reading)
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
  return sixReadingConsumptionAv

}

