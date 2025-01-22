"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown from "@/components/HelperComponents/DropDown/DropDown";
import { useInternalService } from "@/components/hook/useInternalService";
import { toast } from "react-toastify";

interface RowValues {
  consumptionSlab: string;
  waterChargesRate: number;
  typeCharges: string;
  category: string;
  selectConnectionSize: string;
}

interface FormValues {
  typeCharges: string;
  category: string;
  selectConnectionSize: string;
  consumptionSlab: string;
  waterChargesRate: number;
  rows: RowValues[];
}

const Configure: React.FC = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    typeCharges: "",
    category: "",
    selectConnectionSize: "",
    consumptionSlab: "",
    waterChargesRate: 0,
    rows: [
      {
        consumptionSlab: "",
        waterChargesRate: 0,
        typeCharges: "",
        category: "",
        selectConnectionSize: "",
      },
    ],
  });

  const [status, setStatus] = useState<string | null>(null);

  console.log("formValues", formValues);

  const [
    fetchtypeCharges,
    resultypeCharges,
    inProgressypeCharges,
    errorypeCharges,
  ] = useInternalService("chargeType", "GET", null);

  const [
    fetchRequestCategories,
    resultCategories,
    inProgressCategories,
    errorCategories,
  ] = useInternalService("category", "GET", null);

  const [
    fetchRequestConnectionSize,
    resultConnectionSize,
    inProgressConnectionSize,
    errorConnectionSize,
  ] = useInternalService("ConnectionSize", "GET", null);

  const [fetchRequestSlab, resultSlab, inProgressSlab, errorSlab] =
    useInternalService("slab", "GET", null);

  useEffect(() => {
    fetchtypeCharges();
    fetchRequestCategories();
    fetchRequestConnectionSize();
    fetchRequestSlab();
  }, []);

  const handleChange = (name: string, value: any, index?: number) => {
    // const { name, value } = e.target;
    if (name === "typeCharges") {
      if (formValues.typeCharges === "1" || value === "1") {
      }
    }
    if (index === undefined) {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const updatedRows = [...formValues.rows];
      updatedRows[index] = {
        ...updatedRows[index],
        [name]: value,
      };
      setFormValues((prevState) => ({
        ...prevState,
        rows: updatedRows,
      }));
    }
  };

  const handleAddRow = () => {
    setFormValues((prevState) => ({
      ...prevState,
      rows: [
        ...prevState.rows,
        {
          consumptionSlab: "",
          waterChargesRate: 0,
          typeCharges: "",
          category: "",
          selectConnectionSize: "",
        },
      ],
    }));
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = formValues.rows.filter(
      (_, rowIndex) => rowIndex !== index
    );
    setFormValues((prevState) => ({
      ...prevState,
      rows: updatedRows,
    }));
  };

  const categoryOptions =
    resultCategories?.data?.data?.category?.map(
      (item: { category_name: string; id: string }) => ({
        label: item.category_name,
        value: item.id,
      })
    ) || [];

  const connectionSizeOptions =
    resultConnectionSize?.data?.data?.connectionSize?.map(
      (item: { size: string; id: string }) => ({
        label: item.size,
        value: item.id,
      })
    ) || [];

  const slabOptions =
    resultSlab?.data?.data?.slab?.map(
      (item: {
        max_consumption: number;
        min_consumption: number;
        id: string;
      }) => ({
        label: `${item.max_consumption} - ${item.min_consumption}`,
        value: item.id,
      })
    ) || [];

  const chargeTypeOptions =
    resultypeCharges?.data?.data?.ChargeType?.map(
      (item: { charge_name: string; id: string }) => ({
        label: item.charge_name,
        value: item.id,
      })
    ) || [];

  const [
    createResource,
    createResourceResult,
    createResourceInProgress,
    createResourceError,
  ] = useInternalService(`tariffConfigure`, "POST", null);

  console.log("createResourceResult",createResourceResult?.message)
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let payload: any = {
      sso_id: "user123",
    };

    if (formValues.typeCharges !== "1") {
      payload = {
        ...payload,
        charge_type_id: formValues.typeCharges,
        category_id: formValues.category,
        tariff: formValues.rows.map((row) => ({
          connection_size_id: row.selectConnectionSize,
          rate: row.waterChargesRate,
        })),

        // tariff: [
        //   {
        //     connection_size_id: formValues.selectConnectionSize,
        //     rate: formValues.waterChargesRate,
        //   },
        // ],
        extra_details: "Water charge details",
      };
    } else if (formValues.typeCharges === "1") {
      payload = {
        ...payload,
        charge_type_id: formValues.typeCharges,
        category_id: formValues.category,
        connection_size_id: formValues.selectConnectionSize,
        tariff: formValues.rows.map((row) => ({
          slab_id: row.consumptionSlab,
          rate: row.waterChargesRate,
        })),
        extra_details: "Water charge details",
      };
    }

    // console.log("Payload", payload);
    createResource(payload);

    // Simulate API call
  };
    console.log("createResourceResult", createResourceResult);

    useEffect(() => {
      if (createResourceResult ) {
        toast.success(
           `${createResourceResult?.data?.data?.message}`,
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
        
      }
    }, [createResourceResult]);

    
    const getSlabValues = () => {
      // Collect all used slabs from the rows and ensure uniqueness
      const alreadyUsedSlabs = [...new Set(formValues.rows
        .map((row) => row.consumptionSlab)  // Extract all the consumption slabs from the rows
        .filter((slab) => slab))];         // Filter out any empty values (if applicable)
      
      // Filter out the already used slabs from slabOptions
      const filteredSlabs = slabOptions.filter(
        (slab:any) => !alreadyUsedSlabs.includes(slab.value)  // Compare by 'value'
      );
    
      console.log("alreadyUsedSlabs:", alreadyUsedSlabs);
      console.log("filteredSlabs:", filteredSlabs);
      
      // return filteredSlabs;  // Return the filtered slabs
    };
    
    

  getSlabValues()
  // const getConnectionSizeValues = (index: number) => {
  //   const alreadyUsedConnectionSizes = formValues.rows
  //     .filter((_, rowIndex) => rowIndex !== index)
  //     .map((row) => row.selectConnectionSize)
  //     .filter((size) => size);
  //   return (
  //     connectionSizeOptions.filter(
  //       (size) => !alreadyUsedConnectionSizes.includes(size.value)
  //     ) || []
  //   );
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border shadow-lg">
          <div className="border-b border-stroke px-6 py-4">
            <h3 className="text-xl font-semibold">Configure</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {/* Display the status message */}
            {status && (
              <div className="text-center text-lg font-semibold">
                <p>{status}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              <div className="flex flex-col">
                {inProgressypeCharges ? (
                  <p>Loading typeCharges...</p>
                ) : errorypeCharges ? (
                  <p>Error loading typeCharges</p>
                ) : (
                  <DropDown
                    options={chargeTypeOptions}
                    isMultiSelect={false}
                    label="Select Charge Type"
                    name="typeCharges"
                    value={formValues.typeCharges}
                    onChange={(e) =>
                      handleChange("typeCharges", e.target.value)
                    }
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
                    onChange={(e) => handleChange("category", e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Conditional rendering for "water charge" type */}
            {formValues.typeCharges === "1" ? (
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
                    onChange={(e) =>
                      handleChange("selectConnectionSize", e.target.value)
                    }
                  />
                )}
              </div>
            ) : null}

            {/* Conditional rendering for other types */}
            {formValues.typeCharges !== "1" ? (
              <>
                {formValues.rows.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="flex flex-col">
                      {inProgressConnectionSize ? (
                        <p>Loading connection sizes...</p>
                      ) : errorConnectionSize ? (
                        <p>Error loading connection sizes</p>
                      ) : (
                        <DropDown
                          options={connectionSizeOptions}
                          isMultiSelect={false}
                          label="Select Connection Size "
                          name="selectConnectionSize"
                          value={row.selectConnectionSize}
                          onChange={(e) =>
                            handleChange(
                              "selectConnectionSize",
                              e.target.value,
                              index
                            )
                          }
                        />
                      )}
                    </div>

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
                        onChange={(e) =>
                          handleChange(
                            "waterChargesRate",
                            e.target.value,
                            index
                          )
                        }
                        className="w-full rounded border border-gray-300 p-2"
                        placeholder="Enter rate"
                        min="0" // Restrict negative values
                        step="any" // Allow decimals
                        onInput={(e) => {}}
                      />
                    </div>

                    {formValues.rows.length > 1 && (
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
            ) : null}

            {formValues.typeCharges === "1" && (
              <>
                {formValues.rows.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
                  >
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
                          onChange={(e) =>
                            handleChange(
                              "consumptionSlab",
                              e.target.value,
                              index
                            )
                          }
                        />
                      )}
                    </div>

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
                        onChange={(e) =>
                          handleChange(
                            "waterChargesRate",
                            e.target.value,
                            index
                          )
                        }
                        className="w-full rounded border border-gray-300 p-2"
                        placeholder="Enter rate"
                        min="0" // Restrict negative values
                        step="any" // Allow decimals
                        onInput={(e) => {}}
                      />
                    </div>

                    {formValues.rows.length > 1 && (
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
