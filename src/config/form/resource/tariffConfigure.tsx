const tariffConfigure = [
    {
      title: "Seletc Type of charge",
      column: "charge_name",
      type: "select",
      source: 'ChargeType',
      selectKey: "charge_name",
      super_column: "ChargeType",
      
    },
    {
        title: "Seletc Category",
        column: "category_id",
        type: "select",
        source: 'category',
        selectKey: "category_name",
        super_column: "category",
        
      },
      {
        title: "Select Connection Size",
        column: "size",
        type: "select",
        source: 'connectionSize',
        selectKey: "size",
        super_column: "connectionSize",
        
      },

     
      {
        title: "Select Consumption Slab",
        column: "max_consumption",
        type: "select",
        source: 'slab',
        columnsecond:"columnsecond",
        selectKey: "max_consumption",
        // super_column: "category",
        
      },
  ];
  
  export default tariffConfigure;
  