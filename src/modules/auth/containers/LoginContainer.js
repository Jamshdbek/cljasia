import React, { useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { Container, Row, Col } from "react-grid-system";
import { Link } from "react-router-dom";
import { loginSchema } from "utils/schema";
import { FormWrapper, Text, FormInput, BaseButton } from "components";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "app/slices/authSlices/loginSlice/loginSlice";
import { get } from "lodash";
import history from "router/history";

const StyledLoginForm = styled.div`
    width: 40%;
    margin: 0 auto;
    margin-top: 125px;

    .row {
        margin-bottom: 20px;
    }
`;

const LoginContainer = () => {
    const dispatch = useDispatch();
    const onSubmit = (values) => {
        dispatch(userLogin(values)).then((res) => {
            console.log("login res", res);
        });
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            onSubmit,
            validationSchema: loginSchema,
        });
    const isFetched = useSelector((store) =>
        get(store, "auth.user.isAuthenticated", false)
    );
    const token = useSelector((store) =>
        get(store, "auth.user.token.data.token", "")
    );

    useEffect(() => {
        if (isFetched && token) {
            // checkAuthRequest({ token: get(token, "accessToken", null) });
            history.push("/");
        }
    }, [token, isFetched]);
    return (
        <StyledLoginForm>
            <Container fluid>
                <FormWrapper onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} className={"mb-16"}>
                            <FormInput
                                name={"email"}
                                label={"Email"}
                                placeholder={"Email"}
                                value={values.email}
                                handleOnChange={handleChange}
                                handleOnBlur={handleBlur}
                                error={touched.email && errors.email}
                            />
                        </Col>
                        <Col xs={12} className={"mb-16"}>
                            <FormInput
                                name={"password"}
                                label={"Пароль"}
                                placeholder={"Пароль"}
                                type={"password"}
                                value={values.password}
                                handleOnChange={handleChange}
                                handleOnBlur={handleBlur}
                                error={touched.password && errors.password}
                            />
                        </Col>
                        <Col xs={8} offset={{ xs: 4 }} className={"mb-32"}>
                            <BaseButton
                                // disabled={!isEmpty(errors)}
                                type={"submit"}
                                primary
                                medium
                            >
                                Логин
                            </BaseButton>
                        </Col>
                        <Col xs={8} offset={{ xs: 4 }}>
                            <Text>
                                <Link
                                    className={"reset__link"}
                                    to={"/auth/forgot-password"}
                                >
                                    Забыли пароль?
                                </Link>
                            </Text>
                        </Col>
                    </Row>
                </FormWrapper>
            </Container>
        </StyledLoginForm>
    );
};

export default LoginContainer;
