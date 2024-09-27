import React from 'react';

const ComputationSheet = ({ bills }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Public Health Engineering Department - Bill Computation Sheet
      </h1>

      {bills.map((bill, index) => (
        <div key={index} className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold">Consumer Name: {bill.consumerName}</h2>
          <p><strong>CIN:</strong> {bill.CIN}</p>
          <p><strong>Pipe Size:</strong> {bill.pipeSize}</p>
          <p><strong>Bill Month:</strong> {bill.billMonth}</p>
          <p><strong>Category:</strong> {bill.category}</p>
          <p><strong>Consumption:</strong> {bill.consumption} liters</p>
          <div className="mt-2">
            <h3 className="font-semibold">Charges Breakdown:</h3>
            <p>Water Charge: ₹{bill.charges.waterCharge}</p>
            <p>Sewerage Charge: ₹{bill.charges.sewerageCharge}</p>
            <p>STP Charge: ₹{bill.charges.stpCharge}</p>
            <p>Meter Service Charge: ₹{bill.charges.meterServiceCharge}</p>
            <p>Fixed Charge: ₹{bill.charges.fixedCharge}</p>
            <p>IDC Charge: ₹{bill.charges.idcCharge}</p>
            <p className="font-bold text-lg">Total Amount Payable: ₹{bill.charges.totalPayable}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComputationSheet;

