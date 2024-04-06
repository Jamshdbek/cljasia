import * as yup from "yup";

const postCreateReceiverSchema = yup.object().shape({
    receiveTelNo: yup.number().required("*required"),
    countryCd: yup.string().nullable().required("*required"),
    receiverPostalCode: yup.number().required("*required"),
    receiverUnitValue: yup.string().required("*required"),
    price: yup.number().required("*required"),
    receiverName: yup.string().required("*required"),
    receiveAdd2: yup.string().required("*required"),
    receiveAdd3: yup.string().required("*required"),
    // senderTelNo1: yup.string().nullable().required("*required"),
    // sender: yup.string().required("*required"),
    // senderAdd1: yup.string().required("*required"),
    // senderAdd2: yup.string().required("*required"),
    // senderZipCode: yup.number().required("*required"),
    boxLength: yup.number().required("*required"),
    boxWidth: yup.number().required("*required"),
    boxHeight: yup.number().required("*required"),
    productName0: yup.string().required("*required"),
    quantity0: yup.number().required("*required"),
    // hsCode0: yup.number().required("*required"),
    productPrice0: yup.number().required("*required"),
    gramm0: yup.number().required("*required"),
    volumeWeight: yup.number().required("*required"),
});
const postCreateReceiverDocSchema = yup.object().shape({
    receiveTelNo: yup.number().required("*required"),
    countryCd: yup.string().nullable().required("*required"),
    receiverPostalCode: yup.number().required("*required"),
    receiverUnitValue: yup.string().required("*required"),
    price: yup.number().required("*required"),
    receiverName: yup.string().required("*required"),
    receiveAdd2: yup.string().required("*required"),
    receiveAdd3: yup.string().required("*required"),
    // senderTelNo1: yup.string().nullable().required("*required"),
    // sender: yup.string().required("*required"),
    // senderAdd1: yup.string().required("*required"),
    // senderAdd2: yup.string().required("*required"),
    // senderZipCode: yup.number().required("*required"),
    docValue:yup.number().required("*required")
    // boxLength: yup.number().required("*required"),
    // boxWidth: yup.number().required("*required"),
    // boxHeight: yup.number().required("*required"),
    // productName0: yup.string().required("*required"),
    // quantity0: yup.number().required("*required"),
    // hsCode0: yup.number().required("*required"),
    // productPrice0: yup.number().required("*required"),
    // gramm0: yup.number().required("*required"),
    // volumeWeight: yup.number().required("*required"),
});
export { postCreateReceiverSchema,postCreateReceiverDocSchema }

//.requerd-wrap