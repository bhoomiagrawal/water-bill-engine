"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown from "@/components/HelperComponents/DropDown/DropDown";
import { useInternalService } from "@/components/hook/useInternalService";

interface FormValues {
  typeCharges: string;
  category: string;
  selectConnectionSize: string;
  consumptionSlab: string;
  waterChargesRate: number;
}

const Configure: React.FC = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    typeCharges: "",
    category: "",
    selectConnectionSize: "",
    consumptionSlab: "",
    waterChargesRate: 0,
  });

  const [rows, setRows] = useState<FormValues[]>([
    {
      consumptionSlab: "",
      waterChargesRate: 0,
      typeCharges: "",
      category: "",
      selectConnectionSize: "",
    },
  ]);

  const [
    fetchtypeCharges,
    resultypeCharges,
    inProgressypeCharges,
    errorypeCharges,
  ] = useInternalService(`chargeType`, "GET", null);

  const [
    fetchRequestCategories,
    resultCategories,
    inProgressCategories,
    errorCategories,
  ] = useInternalService(`category`, "GET", null);

  const [
    fetchRequestConnectionSize,
    resultConnectionSize,
    inProgressConnectionSize,
    errorConnectionSize,
  ] = useInternalService(
    `ConnectionSize`,
    "GET",
    null
  );

  const [fetchRequestSlab, resultSlab, inProgressSlab, errorSlab] =
    useInternalService(`slab`, "GET", null);

  useEffect(() => {
    fetchtypeCharges();
    fetchRequestCategories();
    fetchRequestConnectionSize();
    fetchRequestSlab();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index === undefined) {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const updatedRows = [...rows];
      updatedRows[index] = { ...updatedRows[index], [name]: value };
      setRows(updatedRows);
    }
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        consumptionSlab: "",
        waterChargesRate: 0,
        typeCharges: "",
        category: "",
        selectConnectionSize: "",
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(rows);
  };

  const categoryOptions =
    resultCategories?.data?.data?.category?.map(
      (item: { category_name: string }) => item.category_name
    ) || [];
  const connectionSizeOptions =
    resultConnectionSize?.data?.data?.connectionSize?.map(
      (item: { size: string }) => item.size
    ) || [];
  const slabOptions =
    resultSlab?.data?.data?.slab?.map(
      (item: { max_consumption: number; min_consumption: number }) =>
        `${item.max_consumption} - ${item.min_consumption}`
    ) || [];
  const chargeTypeOptions =
    resultypeCharges?.data?.data?.ChargeType?.map(
      (item: { charge_name: string }) => item.charge_name
    ) || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg">
          <div className="border-b border-stroke px-6 py-4">
            <h3 className="text-xl font-semibold">Configure</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              {/* Type Charges Dropdown and Category Dropdown in Same Row */}
              <div className="flex flex-col">
                {inProgressypeCharges ? (
                  <p>Loading typeCharges...</p>
                ) : errorypeCharges ? (
                  <p>Error loading typeCharges</p>
                ) : (
                  <DropDown
                    options={chargeTypeOptions}
                    isMultiSelect={false}
                    label="Select Charge of Type"
                    name="typeCharges"
                    value={formValues.typeCharges}
                    onChange={handleChange} // Updates formValues
                  />
                )}
              </div>

              <div className="flex flex-col">
                {inProgressCategories ? (
                  <p>Loading categories...</p>
                ) : errorCategories ? (
                  <p>Error loading categories</p>
                ) : (
                  <DropDown
                    options={categoryOptions}
                    isMultiSelect={false}
                    label="Select Category"
                    name="category"
                    value={formValues.category}
                    onChange={handleChange} // Updates formValues
                  />
                )}
              </div>
            </div>

            {/* Select Connection Size in a New Row */}
            <div className="flex flex-col">
              {inProgressConnectionSize ? (
                <p>Loading connection sizes...</p>
              ) : errorConnectionSize ? (
                <p>Error loading connection sizes</p>
              ) : (
                <DropDown
                  options={connectionSizeOptions}
                  isMultiSelect={false}
                  label="Select Connection Size"
                  name="selectConnectionSize"
                  value={formValues.selectConnectionSize}
                  onChange={handleChange} // Updates formValues
                />
              )}
            </div>

            {/* Conditionally Render Consumption Slab Dropdown for each row */}
            {formValues.typeCharges === "Water Charges" ? (
              <>
                {rows.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
                  >
                    {/* Consumption Slab Dropdown */}
                    <div className="flex flex-col">
                      {inProgressSlab ? (
                        <p>Loading consumption slabs...</p>
                      ) : errorSlab ? (
                        <p>Error loading consumption slabs</p>
                      ) : (
                        <DropDown
                          options={slabOptions}
                          isMultiSelect={false}
                          label="Select Consumption Slab"
                          name="consumptionSlab"
                          value={row.consumptionSlab}
                          onChange={(e) => handleChange(e, index)} // Updates specific row
                        />
                      )}
                    </div>

                    {/* Water Charges Rate /1000 litres */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="waterChargesRate"
                        className="mb-1 font-medium"
                      >
                        Enter water charges Rate /1000 litres:
                      </label>
                      <input
                        type="number"
                        name="waterChargesRate"
                        value={row.waterChargesRate}
                        onChange={(e) => handleChange(e, index)} // Updates specific row
                        className="w-full rounded border border-gray-300 p-2"
                        placeholder="Enter rate"
                      />
                    </div>

                    {/* Remove Button */}
                    {rows.length > 1 && (
                      <div className="flex justify-start">
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                        >
                          -
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add New Row Button */}
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={handleAddRow}
                    className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="text-end">
              <button
                type="submit"
                className="mt-4 w-20 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Configure;
