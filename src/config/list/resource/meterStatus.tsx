import { boolean } from "zod";

const meterStatusCode=[
    {
        title:"S.No",
        column:"index",
        type:"number"
    },
    {
        title:" Meter Status",
        column:"meter_status",
        type:"text"
    },
    {
        title:"Description",
        column:"description",
        type:"text"
    },
    {
        title:"Status",
        column:"status",
        Boolean:"displayStatus",
        type:"text"
    },
    {
        title:"Actions",
        column:"actions",
        type:"actions"
    },
]

export default meterStatusCode;