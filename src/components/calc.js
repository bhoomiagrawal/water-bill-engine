import { slabs, rebates } from "@/components/data";

export function calculateWaterBill(readings) {
  // console.log("slabs", slabs);
  for (const reading of readings) {
    let { current_consumption, category, connection_size, meter_status } = reading;
    let previousMax = 0;
    let waterCharge = 0;

    // check for rebate in domestic connection
    console.log('getZeroOnConsumption function for current_consumption ',current_consumption, 'is', getZeroOnConsumption(connection_size, category, current_consumption))
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
    reading.waterCharge = waterCharge;
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
    return 55;
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
