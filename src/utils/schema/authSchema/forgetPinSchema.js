import * as yup from "yup";

const forgetPinSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("*required"),
});

export default forgetPinSchema;
