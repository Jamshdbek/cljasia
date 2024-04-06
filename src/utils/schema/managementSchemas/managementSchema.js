import * as yup from "yup";

const addOperatorsSchema = yup.object().shape({
    name: yup.string().required("*required"),
    lastName: yup.string().required("*required"),
    email: yup.string().email("Please enter a valid email address").required("*required"),
    // password: yup.string().required("*required"),
    // copyPassword: yup.string().required("*required"),
    password: yup.string().min(8, 'Password must be 8 characters long').required("*required"),
    copyPassword: yup.string().required("*required").oneOf([yup.ref('password'), null], 'Must match "password" field value'),
    accountTypeId: yup.string().nullable().required("*required"),
});

export default addOperatorsSchema;

const editOperatorsSchema = yup.object().shape({
    firstName: yup.string().required("*required"),
    lastName: yup.string().required("*required"),
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("*required"),
    // password: yup.string().required("*required"),
    // repeatpassword: yup.string().required("*required"),
    password: yup.string().min(8, 'Password must be 8 characters long').required("*required"),
    copyPassword: yup.string().required("*required").oneOf([yup.ref('password'), null], 'Must match "password" field value'),
    accountType: yup.object().nullable().required("*required"),
    status: yup.object().nullable().required("*required"),
});

export {editOperatorsSchema};


