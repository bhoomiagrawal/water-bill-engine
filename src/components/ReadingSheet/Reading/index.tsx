import React, { useState, ChangeEvent } from 'react';

interface FirstMonth {
  reading: number;
  stts: string;
  cons: number;
  cw: string;
}

interface SecondMonth {
  reading: number;
  stts: string;
  cons: number;
  cw: string;
}

interface Row {
  id: number;
  accountNumber: string;
  consumerInfo: string;
  category: string;
  sewerage: string;
  stpCharges: string;
  rebate: string;
  meterInfo: string;
  readingStatus: string;
  firstMonth: FirstMonth;
  secondMonth: SecondMonth;
  readingDateI: string;  // Added readingDateI
  readingDateII: string; // Added readingDateII
}

const Reading: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      accountNumber: '1',
      consumerInfo: 'MOTWANI ARJUN F-316 VASHALI NAGAR',
      category: 'Domestic',
      sewerage: 'Yes',
      stpCharges: 'No',
      rebate: 'Yes',
      meterInfo: '4530 Gov. 1/2"',
      readingStatus: '',
      firstMonth: { reading: 550, stts: 'Active', cons: 150, cw: 'yes' },
      secondMonth: { reading: 600, stts: 'Active', cons: 170, cw: 'No' },
      readingDateI: '2024-01-01',  // Default value for Reading Date (I)
      readingDateII: '2024-02-01', // Default value for Reading Date (II)
    },
  ]);

  const handleChange = (rowIndex: number, field: string, value: any) => {
    const updatedRows = [...rows];
    const updatedRow = { ...updatedRows[rowIndex] };

    if (field === 'firstMonth' || field === 'secondMonth') {
      updatedRow[field] = { ...updatedRow[field], ...value };
    } else {
      updatedRow[field] = value;
    }

    updatedRows[rowIndex] = updatedRow;
    setRows(updatedRows);
  };

  // Handle change for input fields (specifically for number inputs)
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    field: string,
    subField?: string
  ) => {
    const value = subField ? { [subField]: e.target.value } : e.target.value;
    handleChange(rowIndex, field, subField ? value : e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <td colSpan={2} className="border border-gray-300 px-4 py-2 text-left">
                  PHED Jaipur - Reading Sheet (Bi-monthly)
                </td>
                <td colSpan={2} className="border border-gray-300 px-4 py-2 text-left">JUL 24</td>
              </tr>
              <tr>
                <td colSpan={6} className="border border-gray-300 px-4 py-2 text-left">
                  <strong>SubDivision Name:</strong> Sub Divison Drilling-I, Jaipur, <strong>Sub Division Code  :</strong> S2-9, <strong>Chowkri/Area Code :</strong> 95b, <strong>Cycle No:</strong> 12
                </td>
                <td colSpan={3} className="border border-gray-300 px-4 py-2 text-left">
                  Last Rdg Date: 28/12/2023
                </td>
                {/* Keep labels and allow editing */}
                <td colSpan={1} className="border border-gray-300 px-4 py-2 text-left">
                  <label className="block text-sm font-medium">Reading Date(I):</label>
                  <input
                    type="date"
                    value={rows[0].readingDateI}
                    onChange={(e) => handleInputChange(e, 0, 'readingDateI', '')}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
                <td colSpan={1} className="border border-gray-300 px-4 py-2 text-left">
                  <label className="block text-sm font-medium">Reading Date(II):</label>
                  <input
                    type="date"
                    value={rows[0].readingDateII}
                    onChange={(e) => handleInputChange(e, 0, 'readingDateII', '')}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left">Acnt No</td>
                <td className="border border-gray-300 px-4 py-2 text-left">Consumer Name Address</td>
                <td className="border border-gray-300 px-4 py-2 text-left">Category</td>
                <td className="border border-gray-300 px-4 py-2 text-left">Sewarage</td>
                <td className="border border-gray-300 px-4 py-2 text-left">STP Charges</td>
                <td className="border border-gray-300 px-4 py-2 text-left">Rebate</td>
                <td className="border border-gray-300 px-4 py-2 text-left">Meter No, Owner/Size</td>
                <td className="border border-gray-300 px-4 py-2 text-left">Last RDG, Cons/Stts</td>
                <td className="border border-gray-300 px-4 py-2 text-left">Acnt No</td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  <div className="font-bold">First Month</div>
                  <div className="flex justify-between w-[200px]">
                    <div className="text-sm">Reading</div>
                    <div className="text-sm">Stts</div>
                    <div className="text-sm">CONS</div>
                    <div className="text-sm">CW</div>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  <div className="font-bold">Second Month</div>
                  <div className="flex justify-between w-[200px]">
                    <div className="text-sm">Reading</div>
                    <div className="text-sm">Stts</div>
                    <div className="text-sm">CONS</div>
                    <div className="text-sm">CW</div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td className="border border-gray-300 px-4 py-2">{row.accountNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.consumerInfo}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={row.category}
                      onChange={(e) => handleInputChange(e, index, 'category')}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Domestic">Domestic</option>
                <option value="Non-domestic">Non-domestic</option>
                <option value="Industrial">Industrial</option>
                <option value="Flat">Flat</option>
                <option value="Own/Private Water Supply">Own/Private Water Supply</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={row.sewerage}
                      onChange={(e) => handleInputChange(e, index, 'sewerage')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={row.stpCharges}
                      onChange={(e) => handleInputChange(e, index, 'stpCharges')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={row.rebate}
                      onChange={(e) => handleInputChange(e, index, 'rebate')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.meterInfo}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.readingStatus}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.accountNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-between">
                      <input
                        type="number"
                        value={row.firstMonth.reading}
                        onChange={(e) => handleInputChange(e, index, 'firstMonth', 'reading')}
                        className="text-sm w-[50px] border border-gray-300 p-1"
                      />
                        <td className="border border-gray-300 ">
                    <select
                      value={row.category}
                      onChange={(e) => handleInputChange(e, index, 'category')}
                      className="text-sm w-[50px] border border-gray-300 p-1"

                    >
                      <option value="Domestic">ok</option>
                <option value="Non-domestic">No</option>
                    </select>
                  </td>
                      <input
                        type="number"
                        value={row.firstMonth.cons}
                        onChange={(e) => handleInputChange(e, index, 'firstMonth', 'cons')}
                        className="text-sm w-[50px] border border-gray-300 p-1"
                      />
                      <input
                        type="text"
                        value={row.firstMonth.cw}
                        onChange={(e) => handleInputChange(e, index, 'firstMonth', 'cw')}
                        className="text-sm w-[50px] border border-gray-300 p-1"
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-between">
                      <input
                        type="number"
                        value={row.secondMonth.reading}
                        onChange={(e) => handleInputChange(e, index, 'secondMonth', 'reading')}
                        className="text-sm w-[50px] border border-gray-300 p-1"
                      />
                        <td className="border border-gray-300 ">
                    <select
                      value={row.category}
                      onChange={(e) => handleInputChange(e, index, 'category')}
                      className="text-sm w-[50px] border border-gray-300 p-1"

                    >
                      <option value="Domestic">ok</option>
                <option value="Non-domestic">No</option>
                    </select>
                  </td>
                      <input
                        type="number"
                        value={row.secondMonth.cons}
                        onChange={(e) => handleInputChange(e, index, 'secondMonth', 'cons')}
                        className="text-sm w-[50px] border border-gray-300 p-1"
                      />
                      <input
                        type="text"
                        value={row.secondMonth.cw}
                        onChange={(e) => handleInputChange(e, index, 'secondMonth', 'cw')}
                        className="text-sm w-[50px] border border-gray-300 p-1"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className=' text-right'> <button
                  type="submit"
                  className="w-36 mt-6 rounded bg-blue-500 py-3 text-xl font-bold text-white transition hover:bg-blue-600"
                >
                  Generate Bill
                </button></div>
     
    </div>
  );
};

export default Reading;
