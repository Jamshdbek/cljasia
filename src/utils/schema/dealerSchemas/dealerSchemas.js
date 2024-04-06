import * as yup from "yup";


const editDealerPriceSchema = yup.object().shape({
    fromCountryId: yup.string().required("*required"),
    toCountryId: yup.string().required("*required"),
    categoryId: yup.string().required("*required"),
    dealerId: yup.string().required("*required"),
    unitId: yup.string().required("*required"),
    unitAmount: yup.string().required("*required"),
    priceAmount: yup.string().required("*required"),
});
export default editDealerPriceSchema;

const addDealerPriceSchema = yup.object().shape({
    fromCountryId: yup.object().required("*required"),
    toCountryId: yup.object().required("*required"),
    categoryId: yup.object().required("*required"),
    unitId: yup.object().required("*required"),
    unitAmount: yup.string().required("*required"),
    priceAmount: yup.string().required("*required"),
    dealerId: yup.string().required("*required"),
});
export {addDealerPriceSchema};

const addDealerAccountingNoteSchema = yup.object().shape({
    dealerId: yup.string().required("*required"),
    type: yup.string().required("*required"),
    amount: yup.string().required("*required"),
    note: yup.string().required("*required"), 
});
export {addDealerAccountingNoteSchema};