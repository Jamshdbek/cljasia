import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Container, Row, Col } from "react-grid-system";
import BaseButton from "../../../components/base-button";
import FormInput from "../../../components/form-input";
import Title from "../../../components/title";
import { FormWrapper } from "components";
import { resetPasswordSchema } from "utils/schema";

const StyledSetPasswordForm = styled.div`
    width: 50%;
    margin: 0 auto;
    margin-top: 40px;

    .row {
        margin-bottom: 20px;
    }
`;

const SetPasswordContainer = () => {
    const onSubmit = (data) => {
        console.log(data);
    };
    const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
        useFormik({
            initialValues: {
                password: "",
                prePassword: "",
            },
            onSubmit,
            validationSchema: resetPasswordSchema,
        });
    return (
        <StyledSetPasswordForm>
            <Container fluid>
                <Row className={"mb-32"}>
                    <Col xs={12} className={"text-center"}>
                        <Title lg>Установить свой пароль</Title>
                    </Col>
                </Row>
                <FormWrapper onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} className={"mb-16"}>
                            <FormInput
                                left={4}
                                right={8}
                                name={"password"}
                                value={values.password}
                                error={touched.password && errors.password}
                                handleOnChange={handleChange}
                                handleOnBlur={handleBlur}
                                label={"Пароль"}
                                placeholder={"Пароль"}
                                type={"password"}
                            />
                        </Col>
                        <Col xs={12} className={"mb-16"}>
                            <FormInput
                                left={4}
                                right={8}
                                name={"prePassword"}
                                value={values.prePassword}
                                handleOnChange={handleChange}
                                handleOnBlur={handleBlur}
                                error={
                                    touched.prePassword && errors.prePassword
                                }
                                label={"Подтвердить пароль"}
                                placeholder={"Подтвердить пароль"}
                                type={"password"}
                            />
                        </Col>
                        <Col xs={7} offset={{ xs: 5 }}>
                            <BaseButton
                                disabled={!isEmpty(errors)}
                                type={"submit"}
                                handleClick={() => onSubmit()}
                                primary
                                medium
                            >
                                Подтвердить
                            </BaseButton>
                        </Col>
                    </Row>
                </FormWrapper>
            </Container>
        </StyledSetPasswordForm>
    );
};

export default SetPasswordContainer;
