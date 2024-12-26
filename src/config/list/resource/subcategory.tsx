const subcategory = [
    {
      title: "S.No",
      column: "index",
      type: "number",
    },
    {
      title: "Category Name",
      column: "category_name", 
      super_column: "category",
      type:"select",
      source: 'category',
      selectKey:"category_name",
    },
    {
      title: "Sub Category Name",
      column: "subcategory_name",
      type: "text",
    },
    {
      title: "Actions",
      column: "actions",
      type: "actions",
    },
  ];
  
  export default subcategory;
  