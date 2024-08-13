(exports.slabs = [
    { max: 8000, ratePerThousand: 1.72, category: "d", isBulk: false },
    { max: 15000, ratePerThousand: 2.2, category: "d", isBulk: false },
    { max: 40000, ratePerThousand: 4.4, category: "d", isBulk: false },
    { max: Infinity, ratePerThousand: 5.5, category: "d", isBulk: false },

    { max: Infinity, ratePerThousand: 6.05, category: "d", isBulk: true },

    { max: 15000, ratePerThousand: 9.9, category: "nd", isBulk: false },
    { max: 40000, ratePerThousand: 18.15, category: "nd", isBulk: false },
    { max: Infinity, ratePerThousand: 24.2, category: "nd", isBulk: false },
    { max: Infinity, ratePerThousand: 24.2, category: "nd", isBulk: true },

    { max: 15000, ratePerThousand: 38.5, category: "id", isBulk: false },
    { max: 40000, ratePerThousand: 49.5, category: "id", isBulk: false },
    { max: Infinity, ratePerThousand: 55.0, category: "id", isBulk: false },
    { max: Infinity, ratePerThousand: 55.0, category: "id", isBulk: true },
]),
    (exports.minimumCharges = [
        { connection_size: 15, min_charges: 55, category: "d" },
        { connection_size: 20, min_charges: 220, category: "d" },
        { connection_size: 25, min_charges: 550, category: "d" },
        { connection_size: 40, min_charges: 1650, category: "d" },
        { connection_size: 50, min_charges: 2750, category: "d" },
        { connection_size: 80, min_charges: 6600, category: "d" },
        { connection_size: 100, min_charges: 10450, category: "d" },
        { connection_size: 150, min_charges: 23650, category: "d" },

        { connection_size: 15, min_charges: 220, category: "nd" },
        { connection_size: 20, min_charges: 550, category: "nd" },
        { connection_size: 25, min_charges: 880, category: "nd" },
        { connection_size: 40, min_charges: 2640, category: "nd" },
        { connection_size: 50, min_charges: 4400, category: "nd" },
        { connection_size: 80, min_charges: 11000, category: "nd" },
        { connection_size: 100, min_charges: 17050, category: "nd" },
        { connection_size: 150, min_charges: 37950, category: "nd" },

        { connection_size: 15, min_charges: 550, category: "id" },
        { connection_size: 20, min_charges: 990, category: "id" },
        { connection_size: 25, min_charges: 1540, category: "id" },
        { connection_size: 40, min_charges: 4950, category: "id" },
        { connection_size: 50, min_charges: 7700, category: "id" },
        { connection_size: 80, min_charges: 18700, category: "id" },
        { connection_size: 100, min_charges: 29700, category: "id" },
        { connection_size: 150, min_charges: 66550, category: "id" },
    ]);

exports.fixedCharges = [
    { connection_size: 15, fixed_charges: 27.5, category: "d" },
    { connection_size: 20, fixed_charges: 27.5, category: "d" },
    { connection_size: 25, fixed_charges: 27.5, category: "d" },
    { connection_size: 40, fixed_charges: 55, category: "d" },
    { connection_size: 50, fixed_charges: 82.5, category: "d" },
    { connection_size: 80, fixed_charges: 110, category: "d" },
    { connection_size: 100, fixed_charges: 165, category: "d" },
    { connection_size: 150, fixed_charges: 220, category: "d" },

    { connection_size: 15, fixed_charges: 55, category: "nd" },
    { connection_size: 20, fixed_charges: 55, category: "nd" },
    { connection_size: 25, fixed_charges: 55, category: "nd" },
    { connection_size: 40, fixed_charges: 110, category: "nd" },
    { connection_size: 50, fixed_charges: 165, category: "nd" },
    { connection_size: 80, fixed_charges: 220, category: "nd" },
    { connection_size: 100, fixed_charges: 330, category: "nd" },
    { connection_size: 150, fixed_charges: 440, category: "nd" },

    { connection_size: 15, fixed_charges: 110, category: "id" },
    { connection_size: 20, fixed_charges: 110, category: "id" },
    { connection_size: 25, fixed_charges: 110, category: "id" },
    { connection_size: 40, fixed_charges: 220, category: "id" },
    { connection_size: 50, fixed_charges: 330, category: "id" },
    { connection_size: 80, fixed_charges: 440, category: "id" },
    { connection_size: 100, fixed_charges: 550, category: "id" },
    { connection_size: 150, fixed_charges: 660, category: "id" },
];

exports.meterServiceCharges = [
    { connection_size: 15, meter_service: 22 },
    { connection_size: 20, meter_service: 55 },
    { connection_size: 25, meter_service: 110 },
    { connection_size: 40, meter_service: 220 },
    { connection_size: 50, meter_service: 440 },
    { connection_size: 80, meter_service: 550 },
    { connection_size: 100, meter_service: 660 },
    { connection_size: 150, meter_service: 770 },
];

exports.idc = [
    { min: 15001, max: 40000, chargePercent: 25 },
    { min: 40001, max: Infinity, chargePercent: 35 },
];

exports.consumptionRules = [
    { meter_status: "ms", rule: "average", description:"meter stopped" },
    { meter_status: "db", rule: "average" , description:"meter stopped"},
    { meter_status: "nb", rule: "average" , description:"meter stopped"},
    { meter_status: "fd", rule: "average" , description:"meter stopped"},
    { meter_status: "nj", rule: "average" , description:"meter stopped"},
    { meter_status: "ls", rule: "average" , description:"meter stopped"},
    { meter_status: "mt", rule: "average" , description:"meter stopped"},
    { meter_status: "st", rule: "average" , description:"meter stopped"},
    { meter_status: "lr", rule: "average" , description:"meter stopped"},
    { meter_status: "dc", rule: "average" , description:"meter stopped"},
    { meter_status: "dl", rule: "minimum" , description:"meter stopped"},
    { meter_status: "nl", rule: "minimum" , description:"meter stopped"},
    { meter_status: "rr", rule: "minimum" , description:"meter stopped"},
    { meter_status: "nr", rule: "average" , description:"meter stopped"},
    { meter_status: "wg", rule: "average" , description:"meter stopped"},
    { meter_status: "dd", rule: "average" , description:"meter stopped"},
    { meter_status: "md", rule: "average" , description:"meter stopped"},
    { meter_status: "kc", rule: "average" , description:"meter stopped"},
    { meter_status: "bd", rule: "average" , description:"meter stopped"},
    { meter_status: "mf", rule: "average" , description:"meter stopped"},
    { meter_status: "bp", rule: "pending", description:"meter stopped" },
    { meter_status: "sr", rule: "average" , description:"meter stopped"},
]
// exports.slabs =
// {
//     d: [
//         { max: 8000, ratePerThousand: 1.72, },
//         { max: 15000, ratePerThousand: 2.2 },
//         { max: 40000, ratePerThousand: 4.4 },
//         { max: Infinity, ratePerThousand: 5.5 }
//     ],
//     nd: [
//         { max: 8000, ratePerThousand: 1.72, },
//         { max: 15000, ratePerThousand: 2.2 },
//         { max: 40000, ratePerThousand: 4.4 },
//         { max: Infinity, ratePerThousand: 5.5 }
//     ],
//     id: [
//         { max: 8000, ratePerThousand: 1.72, },
//         { max: 15000, ratePerThousand: 2.2 },
//         { max: 40000, ratePerThousand: 4.4 },
//         { max: Infinity, ratePerThousand: 5.5 }
//     ],
// }

exports.rebates = [
    {
        category: "d",
        connection_size: "15mm",
        consumption: "15000",
        charges: "free",
    },
];
