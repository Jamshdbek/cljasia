import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import {
    FormWrapper,
    Flex,
    Text,
    Title,
    FormInput,
    BaseButton,
} from "components";
import { forgetPinSchema } from "utils/schema";

const StyledForgotPasswordForm = styled.div`
    width: 40%;
    margin: 0 auto;
    margin-top: 40px;

    .row {
        margin-bottom: 20px;
    }
`;

const ForgotPasswordContainer = () => {
    const history = useHistory();
    const onSubmit = (data) => {
        console.log(data);
    };
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
            },
            onSubmit,
            validationSchema: forgetPinSchema,
        });

    return (
        <StyledForgotPasswordForm>
            <Container fluid>
                <Row className={"mb-32"}>
                    <Col xs={12} className={"text-center"}>
                        <Title lg>Обновить пароль</Title>
                        <Text className={"mt-32"}>
                            Мы отправим вам по электронной почте ссылку для
                            смены пароля.
                        </Text>
                    </Col>
                </Row>
                <FormWrapper onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} className={"mb-16"}>
                            <FormInput
                                left={3}
                                right={9}
                                name={"email"}
                                label={"Email"}
                                value={values.email}
                                handleOnChange={handleChange}
                                handleOnBlur={handleBlur}
                                placeholder={
                                    "Введите адрес электронной почты ..."
                                }
                                error={touched.email && errors?.email}
                            />
                        </Col>
                        <Col xs={9} offset={{ xs: 3 }}>
                            <Flex>
                                <BaseButton
                                    disabled={!isEmpty(errors)}
                                    type={"submit"}
                                    primary
                                    medium
                                    className={"mr-16"}
                                    handleClick={() => onSubmit()}
                                >
                                    Отправить
                                </BaseButton>
                                <BaseButton
                                    handleClick={() => history.push("/auth")}
                                    medium
                                >
                                    Отмена
                                </BaseButton>
                            </Flex>
                        </Col>
                    </Row>
                </FormWrapper>
            </Container>
        </StyledForgotPasswordForm>
    );
};

export default ForgotPasswordContainer;
