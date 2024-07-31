// exports.slabs = [
//     {
//         from: "1",
//         to: "8000",
//         slab: "1",
//         connection_type: "d",
//         size: "15",
//         charges: "0",
//         min_charges: "0"
//     },
//     {
//         from: "8001",
//         to: "15000",
//         slab: "1",
//         connection_type: "d",
//         size: "15",
//         charges: "0",
//         min_charges: "0"

//     },{
//         from: "15001",
//         to: "40000",
//         slab: "1",
//         connection_type: "d",
//         size: "15",
//         charges: "4.4",
//         min_charges: "55"

//     },{
//         from: "40001",
//         to: "-",
//         slab: "1",
//         connection_type: "d",
//         size: "15",
//         charges: "5.5",
//         min_charges: "55"

//     },{
//         from: "1",
//         to: "8000",
//         slab: "1",
//         connection_type: "d",
//         size: "20",
//         charges: "0",
//         min_charges: "220"

//     },
//     {
//         from: "1",
//         to: "8000",
//         slab: "1",
//         connection_type: "d",
//         size: "25",
//         charges: "0",
//         min_charges: "550"

//     }

// ]

exports.slabs = [
    { max: 8000, ratePerThousand: 1.72 },
    { max: 15000, ratePerThousand: 2.2 },
    { max: 40000, ratePerThousand: 4.4 },
    { max: Infinity, ratePerThousand: 5.5 }
];