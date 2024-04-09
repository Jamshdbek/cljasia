import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("*required"),
    password: yup.string().required("*required"),
});

export default loginSchema;
