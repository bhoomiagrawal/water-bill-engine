const billAgencyEnrollment = [
    {
      id: "1", // Unique id
      title: "S.No",
      column: "index",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "number",
    },
    {
      id: "2",
      title: "App No",
      column: "app_number", // Updated column name (adjust according to actual field)
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "text",
    },
    {
      id: "3",
      title: "Company Name",
      column: "company_name", // Updated column name (adjust according to actual field)
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "text",
    },
    {
      id: "4",
      title: "Status",
      column: "status",
      columnsecond: "displayStatus", // Added columnsecond with the appropriate value
      type: "text",
    },
    {
      id: "5",
      title: "Approved On",
      column: "approved_on", // Updated column name (adjust according to actual field)
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "text",
    },
    {
      id: "6",
      title: "Actions",
      column: "actions",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "actions",
    },
  ];
  
  export default billAgencyEnrollment;
  