// Define the dynamic slabs
const slabs = [
    { max: 8000, ratePerThousand: 1.72 },
    { max: 15000, ratePerThousand: 2.2 },
    { max: 40000, ratePerThousand: 4.4 },
    { max: Infinity, ratePerThousand: 5.5 }
];

export function calculateWaterBill(reading, slabs) {
    let bill = 0;
    let previousMax = 0;
    console.log("slabs", slabs)

    for (let i = 0; i < slabs?.length; i++) {
        const slab = slabs[i];
        if (reading <= slab.max) {
            bill += ((reading - previousMax) / 1000) * slab.ratePerThousand;
            break;
        } else {
            bill += ((slab.max - previousMax) / 1000) * slab.ratePerThousand;
            previousMax = slab.max;
        }
    }

    return bill;
}

