const slab = [
    {
      id: "1", // Added unique id
      title: "S.No",
      column: "index",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "number",
    },
    {
      id: "2", // Added unique id
      title: "Category Name",
      column: "category_name",
      super_column: "category",
      type: "select",
      source: "category",
      selectKey: "category_name",
      columnsecond: "default_value", // Added columnsecond with a default value
    },
    {
      id: "3", // Added unique id
      title: "Consumption Slab",
      column: "max_consumption",
      columnsecond: "mergi_consumption",
      type: "text",
    },
    // {
    //     title:"min_consumption",
    //     column:"min_consumption",
    //     columnsecond:"mergi_consumption",
    //     type:"text"
    // },
    {
      id: "4", // Added unique id
      title: "Actions",
      column: "actions",
      columnsecond: "default_value", // Added columnsecond with a default value
      type: "actions",
    },
  ];
  
  export default slab;
  