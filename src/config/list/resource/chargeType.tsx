const chargeType = [
    {
      id: "1", // Added unique id
      title: "S.No",
      column: "index",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "number",
    },
    {
      id: "2",
      title: "Charge Name",
      column: "charge_name",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "text",
    },
    {
      id: "3",
      title: "Status",
      column: "status",
      columnsecond: "displayStatus", // Added columnsecond with the appropriate value
      type: "text",
    },
    // {
    //   id: "4",
    //   title: "Actions",
    //   column: "actions",
    //   columnsecond: "default_value", // Added columnsecond with a default value
    //   type: "actions",
    // },
  ];
  
  export default chargeType;
  