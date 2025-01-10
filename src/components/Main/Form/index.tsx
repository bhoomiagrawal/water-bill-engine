import React, { useState } from "react";
import TextInput from "./FormInput/TextInput";
import { useRouter } from "next/navigation";
import SelectHandler from "./FormInput/SelectHandler";
import NumberInput from "./FormInput/NumberInput";
import ToggleInput from "./FormInput/ToggleInput";

interface FormColumn {
  title: string;
  column: string;
  type: string;
  selectKey?: string;
  source?: string;
}

interface FormProps {
  slug: string;
  column: FormColumn[];  // Updated type here
  data: any;
  errors: any;
  handleError: (data: any) => void;
  handleChange: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setIsPopupe: (value: boolean) => void;
}


type FieldComponentMap = {
  text: React.FC<any>;
  select: React.FC<any>;
  number: React.FC<any>;
  checkbox: React.FC<any>;
};

const Form: React.FC<FormProps> = ({
  slug,
  column,
  data,
  errors,
  handleError,
  handleChange,
  handleSubmit,
  setIsPopupe,
}) => {
  const FormField: FieldComponentMap = {
    text: TextInput,
    select: SelectHandler,
    number: NumberInput,
    checkbox: ToggleInput,
  };

  const router = useRouter();
  const [dataHasChanged, setHasChanged] = useState(false);

  const onSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    column?.forEach((field: FormColumn) => {  // Explicitly typing field
      let formValid = true;
      if (field && field.column !== "status" && !data[field.column]) {
        formValid = false;
        handleError({ [field.column]: `${field.title} is required` });
      }
    });
    if (dataHasChanged) {
      handleSubmit(e);  // Pass the event to handleSubmit
    }
  };
  
  const onChange = (field: string, value: any) => {
    setHasChanged(true);
    handleChange({ [field]: value });
    handleError({ [field]: undefined });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-black mt-18 z-99999">
      <div className="mt-10 bg-gray-100 relative w-[900px] m-auto">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border shadow-lg dark:border-strokedark dark:bg-boxdark">
            <form className="flex flex-col gap-6 space-x-13 p-10">
              <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {data.id ||
                  data?.[slug?.toLocaleLowerCase()] ||
                  data?.[slug]?.id
                    ? "Update"
                    : "Create"}
                  {slug?.charAt(0).toUpperCase() + slug?.slice(1)}
                </h3>
              </div>

              {column?.map((col, index) => {
                const FieldComponent = FormField[col.type as keyof FieldComponentMap];
                let fieldValue;
                if (col.type === "checkbox") {
                  fieldValue = data[col.column] ?? true;
                } else {
                  fieldValue = data[col.column] || "";
                }

                if (col.type === "checkbox" && !data.id) {
                  return null;
                }

                return (
                  <div key={index} className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">{col.title}</label>
                    {FieldComponent && (
                      <FieldComponent
                        value={fieldValue}
                        onChange={(value: any) => onChange(col.column, value)}
                        type={col.type}
                        column={col}
                        placeholder={`Enter ${col.title || "Enter Value"} `}
                        className="w-full rounded-lg border-2 border-[#aeaeaf] bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
                      />
                    )}
                    {errors[col.column] && (
                      <div className="text-red-500 text-sm">{errors[col.column]}</div>
                    )}
                  </div>
                );
              })}

              <div className="flex space-x-4">
              {data.id ? (
                  <button
                    onClick={(e) => onSubmitData(e)}
                    type="submit"
                    className={`w-25 rounded py-3 text-xl font-bold text-white transition ${
                      dataHasChanged
                        ? " bg-gray-600 hover:bg-gray-800"
                        : "opacity-50 cursor-not-allowed bg-gray-600  "
                    } `}
                  >
                    {data.id ? "Update" : "Create"}
                  </button>
                ) : (
                  <button
                    onClick={(e) => onSubmitData(e)}
                    type="submit"
                    className="w-25 rounded bg-gray-600 py-3 text-xl font-bold text-white transition hover:bg-gray-800"
                  >
                    {data.id ? "Update" : "Create"}
                  </button>
                )}

                <button
                  type="button"
                  className="w-25 rounded bg-gray-600 py-3 text-xl font-bold text-white transition hover:bg-gray-800"
                  onClick={() => setIsPopupe(false)}
                >
                  {data.id ? "Cancel" : "Close"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
