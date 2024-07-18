const slabs = require("./slabs");
const inquirer = require("inquirer");
const questions = [
  {
    type: "input",
    name: "reading",
    message: "What's your READING?",
  },
];
inquirer.default.prompt(questions).then((answers) => {
  // let bill = getCharge(answers.reading);

  //   let reading = 45000;
  let bill = calculateWaterBill(answers.reading);
  console.log(
    `The water bill for a reading of ${answers.reading} litres is Rs. ${bill}`
  );
  console.log(
    "your water reading is:",
    answers.reading,
    " water connection is domestic and pipe size is 15 mm"
  );
  //   console.log(`water charge is Rs. ${bill.calc / 1000}`);
  //   console.log(
  //     `water charge breakdown is ${JSON.stringify(bill.breakdown).replaceAll(
  //       ":",
  //       "="
  //     )}`
  //   );
});
let consumer_data = {
  reading: "50000",
  connection_type: "d",
  size: "15",
};

let filteredSlabs = slabs.slabs.filter((s) => {
  return (
    s.connection_type == consumer_data.connection_type &&
    s.size == consumer_data.size
  );
});

let calc = 0;
let breakdown = [];
const getCharge = (reading) => {
  let consumer_reading = Number(reading);

  let slab_calculation = 1;
  let remaining_reading = consumer_reading;
  for (const s of filteredSlabs) {
    let slab_to_limit = Number(s.to);
    let slab_charge = Number(s.charges);
    let slab_from_limit = Number(s.from);
    let diff =
      slab_to_limit == NaN
        ? remaining_reading
        : slab_to_limit - slab_from_limit;
    if (!isNaN(slab_to_limit)) {
      // 1st step
      remaining_reading = remaining_reading - diff;
      console.log("remaining_reading", remaining_reading);

      slab_calculation = diff * slab_charge;
      breakdown.push({
        [slab_calculation]: `${diff} * ${slab_charge}`,
      });
      console.log(
        "slab_calculation",
        slab_calculation,
        `diff ::`,
        diff,
        `* slab_charge::`,
        slab_charge
      );
    } else {
      slab_calculation = remaining_reading * slab_charge;
      breakdown.push({
        [slab_calculation]: `${remaining_reading} * ${slab_charge}`,
      });
      console.log(
        "else part slab_calculation",
        slab_calculation,
        `diff ::`,
        remaining_reading,
        `* slab_charge::`,
        slab_charge
      );
    }

    calc = slab_calculation + calc;

    // console.log(calc, "calc")
  }
  return { calc, breakdown };
};

function calculateWaterBill(reading) {
  let bill = 0;

  if (reading <= 8000) {
    bill = 0; // Free for the first 8000 litres
  } else if (reading <= 15000) {
    bill = 0; // Free from 8001 to 15000 litres
  } else if (reading <= 40000) {
    bill = (reading - 15000) * 4.4; // 4.4 rs per litre from 15001 to 40000 litres
  } else {
    bill = (40000 - 15000) * 4.4 + (reading - 40000) * 5.5; // 4.4 rs per litre for 15001 to 40000 litres and 5.5 rs per litre above 40000 litres
  }

  return bill;
}

// Example usage:
