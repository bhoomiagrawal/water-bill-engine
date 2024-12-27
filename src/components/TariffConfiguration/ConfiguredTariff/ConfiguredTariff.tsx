import React from "react";

const WaterTariffTables = () => {
  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-500">
        {/* Header Section */}
        <div className="grid grid-cols-3 border-b border-[#616060]">
          <div className="col-span-3 px-4 py-3 text-lg font-semibold text-left underline">
            PART-A: WATER CHARGES
          </div>
        </div>

        {/* Table 1: Domestic Rates */}
        <div className="grid grid-cols-3 divide-x divide-[#5e5d5d] mt-6">
          <div className="px-4 py-3 text-sm">1.</div>
          <div className="col-span-2 px-4 py-3 text-sm">
            <div className="border-b-2 border-[#000] pb-2 mb-2">
              <strong>DOMESTIC RATES</strong> (Sizes: 15 MM to 25 MM)
            </div>
            <table className="w-full">
              <thead className="border-b-2 border-[#000]">
                <tr className="divide-x divide-[#6b6969]">
                  <th className="px-4 py-2 text-sm font-semibold text-left">
                    Monthly Consumption
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left">
                    Rate Per 1000 Litres (Rs)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">
                    a) For consumption up to first 8,000 litres
                  </td>
                  <td className="px-4 py-2 text-sm">1.72</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">
                    b) For consumption exceeding 8,000 litres and up to 15,000
                    litres
                  </td>
                  <td className="px-4 py-2 text-sm">2.20</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">
                    c) Consumption exceeding 15,000 and up to 40,000
                  </td>
                  <td className="px-4 py-2 text-sm">4.40</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">
                    d) Consumption exceeding 40,000
                  </td>
                  <td className="px-4 py-2 text-sm">5.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-[#666464] mt-8"></div>

        {/* Table 2: Minimum Charge for Domestic Category */}
        <div className="grid grid-cols-3 divide-x divide-[#5e5d5d] mt-6">
          <div className="px-4 py-3 text-sm">2.</div>
          <div className="col-span-2 px-4 py-3 text-sm">
            <div className="border-b-2 border-[#000] pb-2 mb-2">
              <strong>MINIMUM CHARGE PER MONTH FOR DOMESTIC CATEGORY</strong>{" "}
              (Sizes: 15 MM to 25 MM)
            </div>
            <table className="w-full">
              <thead className="border-b-2 border-[#000]">
                <tr className="divide-x divide-[#6b6969]">
                  <th className="px-4 py-2 text-sm font-semibold text-left">
                    Connection Size
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left">
                    Monthly Charge (Rs)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">15 mm (up to 8 KL)</td>
                  <td className="px-4 py-2 text-sm">22.00</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">15 mm (8 KL)</td>
                  <td className="px-4 py-2 text-sm">55.00</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">20 mm</td>
                  <td className="px-4 py-2 text-sm">220.00</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">25 mm</td>
                  <td className="px-4 py-2 text-sm">550.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-[#666464] mt-8"></div>

        {/* Table 3: Flat Rate Charges for Domestic Connection */}
        <div className="grid grid-cols-3 divide-x divide-[#5e5d5d] mt-6">
          <div className="px-4 py-3 text-sm">3.</div>
          <div className="col-span-2 px-4 py-3 text-sm">
            <div className="border-b-2 border-[#000] pb-2 mb-2">
              <strong>FLAT RATE CHARGES FOR 15 MM DOMESTIC CONNECTION</strong>
            </div>
            <p className="text-sm mb-2">For each connection per family up to two taps: Rs. 27.50 Per Month</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Fixed Charges, Infrastructure Charges, and Sewerage Charges apply.</li>
              <li>No additional amount for Flush Latrines, Overhead Tanks.</li>
              <li>Flat Rate Tariff applies only in Rural areas.</li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-[#666464] mt-8"></div>

        {/* Table 4: Non-Domestic Rates */}
        <div className="grid grid-cols-3 divide-x divide-[#5e5d5d] mt-6">
          <div className="px-4 py-3 text-sm">4.</div>
          <div className="col-span-2 px-4 py-3 text-sm">
            <div className="border-b-2 border-[#000] pb-2 mb-2">
              <strong>NON-DOMESTIC RATES</strong> (Sizes: 15 MM to 25 MM)
            </div>
            <table className="w-full">
              <thead className="border-b-2 border-[#000]">
                <tr className="divide-x divide-[#6b6969]">
                  <th className="px-4 py-2 text-sm font-semibold text-left">
                    Monthly Consumption
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left">
                    Rate Per 1000 Litres (Rs)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">a) Up to 15,000 litres</td>
                  <td className="px-4 py-2 text-sm">9.90</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">
                    b) Exceeding 15,000 and up to 40,000 litres
                  </td>
                  <td className="px-4 py-2 text-sm">18.15</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">
                    c) Consumption exceeding 40,000
                  </td>
                  <td className="px-4 py-2 text-sm">22.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-[#666464] mt-8"></div>

        {/* Table 5: Industrial Category Rates */}
        <div className="grid grid-cols-3 divide-x divide-[#5e5d5d] mt-6">
          <div className="px-4 py-3 text-sm">5.</div>
          <div className="col-span-2 px-4 py-3 text-sm">
            <div className="border-b-2 border-[#000] pb-2 mb-2">
              <strong>INDUSTRIAL CATEGORY</strong> (Sizes: 15 MM to 25 MM)
            </div>
            <table className="w-full">
              <thead className="border-b-2 border-[#000]">
                <tr className="divide-x divide-[#6b6969]">
                  <th className="px-4 py-2 text-sm font-semibold text-left">
                    Monthly Consumption
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-left">
                    Rate Per 1000 Litres (Rs)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">a) Up to 15,000 litres</td>
                  <td className="px-4 py-2 text-sm">10.15</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">
                    b) Exceeding 15,000 and up to 50,000 litres
                  </td>
                  <td className="px-4 py-2 text-sm">18.90</td>
                </tr>
                <tr className="divide-x divide-[#6b6969] border-b border-[#5e5d5d]">
                  <td className="px-4 py-2 text-sm">
                    c) Consumption exceeding 50,000
                  </td>
                  <td className="px-4 py-2 text-sm">24.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default WaterTariffTables;
