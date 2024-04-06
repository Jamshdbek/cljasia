import * as yup from "yup";

const editCompanyInfoSchema = yup.object().shape({
    companyName: yup.string().required("*required"),
    companyAddress: yup.string().required("*required"),
    companyPhoneNumber: yup.string().required("*required"),
    companyEmail: yup.string().email("Please enter a valid email address").required("*required"),
    index: yup.string().nullable().required("*required"),
    // countryId: yup.object().nullable().required("*required"),
    // locationId: yup.object().nullable().required("*required"),
});

export default editCompanyInfoSchema;