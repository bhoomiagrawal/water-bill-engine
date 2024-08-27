import {
  slabs,
  rebates,
  minimumCharges,
  fixedCharges,
  meterServiceCharges,
  idc,
  consumptionRules,
} from "@/components/data";

export function calculateWaterBill(readings) {
  for (const reading of readings) {
    let { current_consumption, category, connection_size, meter_status } =
      reading;
    let basicCharge = 0;
    if (meter_status == "ok") {
      reading.consumption = current_consumption;
      if (
        getZeroOnConsumption(connection_size, category, current_consumption)
      ) {
        basicCharge = 0;
      } else {
        basicCharge = getBasicCharge(reading);
      }
    } else {
      let getRuleConsumption = consumptionRules.find(
        (c) => c.meter_status == meter_status
      );

      if (getRuleConsumption.rule == "average") {
        reading.averageConsumption = getAverageConsumption(reading);
        reading.consumption = reading.averageConsumption;
      } else if (getRuleConsumption.rule == "minimum") {
        reading.basicCharge = 0;
        reading.consumption = reading.meter_status;
      }
    }

    reading.basicCharge =
      reading.connection_type == "t" ? basicCharge * 1.5 : basicCharge;
    reading.minimum = getMinimumCharge(reading);
    // check for rebate in domestic connection

    // compare water charge with minimum charge

    reading.waterCharge =
      reading.basicCharge >= reading.minimum
        ? reading.basicCharge
        : reading.minimum;

    reading.fixedCharge = addFixedCharge(reading);
    reading.severageCharge = getSeverageCharge(reading, reading.basicCharge);

    if (reading.stp == "y") {
      reading.stp = getStpCharge(reading);
    } else {
      reading.stp = 0;
    }

    reading.idc = getIDC(reading);

    reading.bill =
      reading.waterCharge +
      reading.fixedCharge.total_fixed_charge +
      reading.severageCharge +
      reading.stp +
      reading.idc;

    let rebate = 0;
    if (reading.rebate) {
      rebate = getRebate(reading);
    }
    reading.bill = reading.bill - rebate;
    reading.rebate = rebate;
  }

  return readings;
}

function getBasicCharge(reading) {
  let { connection_size, consumption } = reading;

  let bCharge = 0;
  let previousMax = 0;

  let catSlabs = slabs.filter((s) => {
    if (s.category == reading.category) {
      return connection_size > 25 ? s.isBulk == true : s.isBulk == false;
    }
  });

  for (let i = 0; i < catSlabs?.length; i++) {
    const slab = catSlabs[i];

    if (consumption <= slab.max) {
      bCharge += ((consumption - previousMax) / 1000) * slab.ratePerThousand;

      break;
    } else {
      bCharge += ((slab.max - previousMax) / 1000) * slab.ratePerThousand;

      previousMax = slab.max;
    }
  }
  return bCharge;
}

function getZeroOnConsumption(connection_size, category, current_consumption) {
  return (
    connection_size == 15 && category == "d" && current_consumption <= 15000
  );
}

function getMinimumCharge(reading) {
  let minimumChargeData = minimumCharges.find((m) => {
    return (
      m.connection_size == reading.connection_size &&
      m.category == reading.category
    );
  });
  let minimumCharge = minimumChargeData.min_charges;
  if (
    reading.connection_size == 15 &&
    reading.meter_status.toLowerCase() == "ok" &&
    reading.current_consumption <= 15000
  ) {
    minimumCharge = 0;
  } else {
    minimumCharge = minimumChargeData.min_charges;
  }

  if (reading.connection_type == "t") {
    minimumCharge = minimumCharge * 1.5;
  }

  return minimumCharge;
}

function addFixedCharge(reading) {
  let fixedChargeData = fixedCharges.find((f) => {
    // console.log("value of f ",f)
    return (
      f.connection_size == reading.connection_size &&
      f.category == reading.category
    );
  });

  let meterServiceData = meterServiceCharges.find((m) => {
    return m.connection_size == reading.connection_size;
  });
  let fixedCharge = fixedChargeData.fixed_charges;
  let meterServiceCharge = meterServiceData.meter_service;

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
  let monthlyReadings = [
    reading[1],
    reading[2],
    reading[3],
    reading[4],
    reading[5],
    reading[6],
    reading[7],
  ];

  monthlyReadings.sort((a, b) => b - a);
  let monthlyConsumption = [];

  // Loop through the array, subtracting each element from the next
  for (let i = 0; i < monthlyReadings.length - 1; i++) {
    monthlyConsumption.push(monthlyReadings[i] - monthlyReadings[i + 1]);
  }

  const sixReadingConsumptionAv =
    monthlyConsumption.reduce((prev, curr, i) => prev + curr, 0) /
    monthlyConsumption.length;
  return Math.round(sixReadingConsumptionAv);
}

function getStpCharge(reading) {
  // 13% of water charge whatever the connection category is
  let stp = (reading.waterCharge * 13) / 100;
  // console.log(stp,"stp charge ")
  return stp;
}

function getIDC(reading) {
  let { consumption, waterCharge } = reading;
  let idcData = idc.find((id) => {
    return consumption > id.min && consumption < id.max;
  });
  let idcharge = idcData ? (waterCharge * idcData.chargePercent) / 100 : 0;
  return idcharge;
}
function getRebate(reading) {
  const { waterCharge, rebate, category } = reading;

  let rebateCharge =
    rebate === "y" ? (waterCharge * rebates[0]?.discount) / 100 : 0;
  // console.log("rebate charges on water charge will be apply water charge of 75%", rebateCharge);

  return rebateCharge.toFixed(2);
}
