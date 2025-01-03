
const slab=[
    {
        title: "Category Name",
        column: "category_id",
        type: "select",
        source: 'category',
        selectKey: "category_name",
        super_column: "category",
      },
   
    {
        title:"Min Consumption in (Litres):",
        column:"min_consumption",
        type:"number"
    },
    {
        title:"Max Consumption in (Litres):",
        column:"max_consumption",
        type:"number"
    },
]

export default slab;