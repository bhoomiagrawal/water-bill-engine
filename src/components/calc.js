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

  for (let reading of readings) {

    let calculation = getCalculation(reading);
    let previous_readings = {};
    let calculation_prev = {}
    console.log('calculation', calculation)
    if (reading.curr_cons1) {
      previous_readings = {
        ...reading,
        curr_cons: readings.curr_cons1,
        curr_rdg: readings.curr_rdg1,
        pre_cons: readings.pre_cons1,
        last_rdg: readings.curr_rdg,
        meter_stts: readings.meter_stts1,
      }
      calculation_prev = getCalculation(reading)

    }
    reading.prev = calculation_prev
    console.log('reading', reading)
    console.log('reading.ostd_amt', reading.ostd_amt)
    if (reading.category == "d") {

      reading.two_mnth_bill = +((reading.bill + reading.prev.bill).toFixed(2));
      reading.lps = Math.round((reading.bill + reading.prev.bill) * 10) / 100
      console.log('reading.two_mnth_bill +reading.ostd_amt', reading.two_mnth_bill + reading.ostd_amt, reading.two_mnth_bill, reading.ostd_amt)
      reading.total_amount = (reading.two_mnth_bill) + reading.ostd_amt

    } else {
      reading.two_mnth_bill = (reading.bill).toFixed(2)

      reading.lps = Math.round((reading.bill) * 10) / 100
      reading.total_amount = reading.two_mnth_bill + reading.ostd_amt

    }

    // reading.rebate = rebate;

  }

  return readings;
}

function getCalculation(reading) {
  let { curr_cons, curr_rdg, last_rdg, category, meter_size, meter_stts } = reading;
  let basicCharge = 0;
  if (meter_stts == "ok") {
    reading.consumption = curr_cons;
    let rdg = curr_rdg - last_rdg
    reading.rdg = rdg
    if (
      getZeroOnConsumption(meter_size, category, curr_cons)
    ) {
      basicCharge = 0;
    } else {
      basicCharge = getBasicCharge(reading);
    }
  } else {
    let getRuleConsumption = consumptionRules.find(
      (c) => c.meter_status == meter_stts
    );

    if (getRuleConsumption?.rule == "average") {
      // reading.averageConsumption = getAverageConsumption(reading);
      // reading.consumption = reading.averageConsumption;
      reading.averageConsumption = reading.pre_cons
      reading.consumption = reading.averageConsumption
      basicCharge = getBasicCharge(reading);

    } else if (getRuleConsumption?.rule == "minimum") {
      reading.basicCharge = 0;


      reading.consumption = reading.meter_stts;

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
  reading.sewerageCharge = getSewerageCharge(reading, reading.basicCharge);

  if (reading.stp == "y") {
    reading.stpCharge = getStpCharge(reading);
  } else {
    reading.stpCharge = 0;
  }

  reading.idc = getIDC(reading);
  reading.rebate_amount = 0;
  if (reading.rebate) {
    reading.rebate_amount = getRebate(reading);
  }


  reading.bill =
    reading.waterCharge +
    reading.fixedCharge.total_fixed_charge +
    reading.sewerageCharge +
    reading.stpCharge +
    reading.idc;


  reading.bill = reading.bill - reading.rebate_amount;
  return reading
}

function getBasicCharge(reading) {
  let { meter_size, consumption } = reading;

  let bCharge = 0;
  let previousMax = 0;
  let catSlabs = slabs.filter((s) => {
    if (s.category == reading.category) {
      return meter_size > 25 ? s.isBulk == true : s.isBulk == false;
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

function getZeroOnConsumption(meter_size, category, curr_cons) {
  return (
    meter_size == 15 && category == "d" && curr_cons <= 15000
  );
}

function getMinimumCharge(reading) {
  reading.cid == "140110108119" && console.log("minimum readings", reading);
  let minimumChargeData = minimumCharges.find((m) => {
    return (
      m.meter_size == reading.meter_size &&
      m.category == reading.category
    );
  });

  reading.cid == "140110108119" && console.log('minimumChargeData', minimumChargeData)
  let minimumCharge = minimumChargeData?.min_charges;
  if (
    reading.meter_size == 15 &&
    reading.meter_stts.toLowerCase() == "ok" &&
    reading.curr_cons <= 15000
  ) {
    minimumCharge = 0;
  } else {
    minimumCharge = minimumChargeData?.min_charges;
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
      f.meter_size == reading.meter_size &&
      f.category == reading.category
    );
  });

  let meterServiceData = meterServiceCharges.find((m) => {
    return m.meter_size == reading.meter_size;
  });
  let fixedCharge = fixedChargeData?.fixed_charges;
  let meterServiceCharge = meterServiceData.meter_service;

  return {
    service_charge: meterServiceCharge,
    fixed_charge: fixedCharge,
    total_fixed_charge: fixedCharge + meterServiceCharge,
  };
}

function getSewerageCharge(reading) {
  const { waterCharge, sewerage_tax } = reading;
  let sewerageCharge = sewerage_tax == "y" ? (waterCharge * 20) / 100 : 0;
  return sewerageCharge;
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
  let stpCharge = (reading.waterCharge * 13) / 100;
  // console.log(stp,"stp charge ")
  return stpCharge;
}

function getIDC(reading) {
  let { consumption, waterCharge } = reading;
  let idcData = idc.find((id) => {
    return consumption > id.min && consumption < id.max;
  });
  console.log('idcData', idcData)
  console.log('waterCharge', waterCharge)
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
