import * as yup from "yup";

const addManifestSenderSchema = yup.object().shape({
    name: yup.string().required("*required"),
    address: yup.string().required("*required"),
    phoneNumber: yup.string().required("*required"),
    postalCode: yup.string().required("*required"),
});

export default addManifestSenderSchema;

const addManifestReceiverSchema = yup.object().shape({
    name: yup.string().required("*required"),
    address: yup.string().required("*required"),
    phoneNumber: yup.string().required("*required"),
    postalCode: yup.string().required("*required"),
});

const postCreateReceiverSchema = yup.object().shape({
    // receiverPhoneNumber: yup.string().nullable().required("*required"),
    receiverPassport: yup.string().required("*required"),
    receiverCountry: yup.number().nullable().required("*required"),
    receiverPINFL: yup.string().required("*required"),
    receiverPostalCode: yup.string().required("*required"),
    receiverUnitValue: yup.string().required("*required"),
    receiverUnitPrice: yup.string().required("*required"),
    receiverSenderName: yup.string().required("*required"),
    receiverName: yup.string().required("*required"),
    receiverRegion: yup.number().nullable().required("*required"),
    receiverDistrict: yup.number().nullable().required("*required"),
    receiverAddress: yup.string().required("*required"),
    // receiverName: yup.string().required("*required"),
    // SVMlength: yup.string().required("*required"),
    // SVMwidth: yup.string().required("*required"),
    // SVMheight: yup.string().required("*required"),
    productName0: yup.string().required("*required"),
    quantity0: yup.string().required("*required"),
    // hsCode0: yup.string().required("*required"),
    productPrice0: yup.string().required("*required"),
    // SVMValue: yup.string().required("*required"),
});

export { addManifestReceiverSchema, postCreateReceiverSchema };
