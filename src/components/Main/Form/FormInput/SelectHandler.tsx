import { useInternalService } from '@/components/hook/useInternalService';
import React, { useEffect, useState } from 'react';
import SelectInput from './SelectInput';

interface SelectHandlerProps {
  column: any;
  value: any;
  onChange: (value: string) => void;
}

const SelectHandler: React.FC<SelectHandlerProps> = ({ column, value ,onChange}) => {
  const [options, setOptions] = useState<any[]>([]);

  // Fetch categories from the API
  const [fetchCategoryRequest, categoryResult, categoryInProgress, categoryError] = useInternalService(
    `${column.source}`,  
    "GET",
    null
  );

  useEffect(() => {
    if (column.source !== "option") {
      fetchCategoryRequest(); 
    } else {
      setOptions(column.options);  
    }
  }, []);

  useEffect(() => {
    if (!categoryInProgress && categoryResult?.data?.data?.[column.source]) {
      const formattedOptions = categoryResult.data?.data?.[column.source].map((item: any) => ({
        key: String(item[column.selectKey]),  // Ensure key is unique
        id: item.id,  // Ensure id is present
        value: item[column.selectKey],
        label: item[column.selectKey]
      }));
      setOptions(formattedOptions);  
    }
  }, [categoryInProgress, categoryResult, categoryError, column]);

  return (
    <div>
      <SelectInput
        label={column.title}  
        options={options || []}  // Ensure options are correctly formatted
        onChange={onChange}
        value={value}
        id={0}  // Pass a default id if required (can be dynamic)
      />
    </div>
  );
};

export default SelectHandler;
