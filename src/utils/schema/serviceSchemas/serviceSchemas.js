import * as yup from "yup";

const addMeasurementUnitsSchema = yup.object().shape({
    name: yup.string().required("*required"),
});
export default addMeasurementUnitsSchema;

const addCategorySchema = yup.object().shape({
    name: yup.string().required("*required"),
});
export { addCategorySchema };

const addCountrySchema = yup.object().shape({
    countryName: yup.string().required("*required"),
    code: yup.string().required("*required"),
});
export { addCountrySchema };

const addLocationSchema = yup.object().shape({
    name: yup.string().required("*required"),
    status: yup.string().nullable().required("*required"),
});
export { addLocationSchema };

const addPriceSchema = yup.object().shape({
    fromCountryId: yup.string().nullable().required("*required"),
    toCountryId: yup.string().nullable().required("*required"),
    categoryId: yup.string().nullable().required("*required"),
    unitId: yup.string().nullable().required("*required"),
    unitAmount: yup.string().nullable().required("*required"),
    priceAmount: yup.string().nullable().required("*required"),
    dealerId: yup.string().nullable().required("*required"),
});
export { addPriceSchema };

const addStatusSchema = yup.object().shape({
    name: yup.string().required("*required"),
});
export { addStatusSchema };

const editStatusSchema = yup.object().shape({
    name: yup.string().required("*required"),
    isActive: yup.object().nullable().required("*required"),
});
export { editStatusSchema };
