import * as yup from "yup";

const passwordRules = /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const resetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .min(8)
        .matches(passwordRules, {
            message:
                "Password must be at least 8 characters long and include at least one number & one symbol",
        })
        .required("*required"),
    prePassword: yup
        .string()
        .required("*required")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
});

export default resetPasswordSchema;
