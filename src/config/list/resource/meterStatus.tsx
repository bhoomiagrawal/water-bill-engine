const meterStatusCode = [
    {
      id: "1", // Added unique id
      title: "S.No",
      column: "index",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "number",
    },
    {
      id: "2", // Added unique id
      title: "Meter Status",
      column: "meter_status",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "text",
    },
    {
      id: "3", // Added unique id
      title: "Description",
      column: "description",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "text",
    },
    {
      id: "4", // Added unique id
      title: "Status",
      column: "status",
      columnsecond: "default_value", // Added columnsecond with a default value
      Boolean: "displayStatus", // Adjusted to your needs
      type: "text",
    },
    {
      id: "5", // Added unique id
      title: "Actions",
      column: "actions",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "actions",
    },
  ];
  
  export default meterStatusCode;
  