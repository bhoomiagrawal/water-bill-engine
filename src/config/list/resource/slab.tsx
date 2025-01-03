import { title } from "process";

const slab=[
    {
        title:"S.No",
        column:"index",
        type:"number"
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
        title:"Consumption Slab",
        column:"max_consumption",
        columnsecond:"mergi_consumption",
        type:"text"
    },
    // {
    //     title:"min_consumption",
    //     column:"min_consumption",
    //     columnsecond:"mergi_consumption",
    //     type:"text"
    // },
    {
        title:"Actions",
        column:"actions",
        type:"actions"
    },
]

export default slab;