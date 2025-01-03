const tariffconfigure = [
  {
    title: "Select Type of charge",
    column: "charge_name",
    type: "select",
    source: 'ChargeType',
    selectKey: "charge_name",
    super_column: "ChargeType",
  },
  {
    title: "Select Category",
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
    selectKey: "max_consumption",
  },
];

export default tariffconfigure;
