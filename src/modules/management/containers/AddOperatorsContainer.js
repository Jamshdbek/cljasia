import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Col, Container, Row } from "react-grid-system";
import _, { get } from "lodash";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    FormInput,
    FormSelector,
    FormWrapper,
    Loader,
} from "components";
import { addOperatorsSchema } from "utils/schema";
import history from "router/history";
import { toast } from "react-toastify";
import { ManagementApiService } from "services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountTypes } from "app/slices/commonSlices/accountTypesSlice";

const AddOperatorsContainer = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAccountTypes());
    }, []);

    const accountTypesData = useSelector((store) =>
        get(store, "common.accountTypes.data.accountTypes.data", [])
    );

    const accountsTypeOptions = _.map(accountTypesData, function map(item){
        return {
            label: get(item, "accountName", "-"),
            value: get(item, "id", "-"),
        }
    });

    const onSubmit = (values) => {
        try {
            setLoading(true);
            ManagementApiService.PostManagementOperator(
                values
            ).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    history.goBack();
                    toast.success("Success");
                    toast.warning("Please, Add country prices for this dealer");
                } else if (res && res.data && !res.data.success) {
                    setLoading(true);
                    toast.success(res.data.message);
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue,
    } = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
            copyPassword : "",
            accountTypeId:"",
        },
        onSubmit,
        validationSchema: addOperatorsSchema,
    });
    return (
        <Container fluid>
            {/* {loading && <Loader />} */}
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Менеджмент", url: "/management" },
                            {
                                id: 2,
                                name: "Операторы",
                                url: "/management/operators",
                            },
                            {
                                id: 3,
                                name: "Добавить",
                                url: "/management/operators/add",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row className="mt-32 ml-64">
                            <Col xs={12}>
                                <FormWrapper onSubmit={handleSubmit}>
                                    <FormInput
                                        label={"Имя"}
                                        name={"name"}
                                        type={"text"}
                                        value={get(values, "name", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={
                                            touched.name &&
                                            errors.name
                                        }
                                        left={2}
                                        right={6}
                                    />
                                    <FormInput
                                        label={"Фамилия"}
                                        name={"lastName"}
                                        type={"text"}
                                        value={get(values, "lastName", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={
                                            touched.lastName && errors.lastName
                                        }
                                        left={2}
                                        right={6}
                                    />
                                    <FormInput
                                        label={"Email"}
                                        name={"email"}
                                        type={"email"}
                                        value={get(values, "email", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.email && errors.email}
                                        left={2}
                                        right={6}
                                    />
                                    <FormInput
                                        label={"Пароль"}
                                        name={"password"}
                                        type={"password"}
                                        value={get(values, "password", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.password && errors.password}
                                        left={2}
                                        right={6}
                                    />
                                    <FormInput
                                        label={"Пароль еще раз"}
                                        name={"copyPassword"}
                                        type={"password"}
                                        value={get(values, "copyPassword", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.copyPassword && errors.copyPassword}
                                        left={2}
                                        right={6}
                                    />
                                    <FormSelector
                                        label={"Категория аккаунта"}
                                        name={"accountTypeId"}
                                        value={get(values, "accountTypeId", "")}
                                        placeholder={"Выбрать тип аккаунта"}
                                        error={
                                            touched.accountTypeId &&
                                            errors.accountTypeId
                                        }
                                        options={accountsTypeOptions}
                                        handleChange={(e) =>
                                            setFieldValue("accountTypeId", e)
                                        }
                                        left={2}
                                        right={6}
                                    />
                                    <Row className="mt-32">
                                        <Col xs={12} align={"center"}>
                                            <BaseButton
                                                primary
                                                type="submit"
                                            >
                                                Добавить
                                            </BaseButton>
                                        </Col>
                                    </Row>
                                </FormWrapper>
                            </Col>
                        </Row>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default AddOperatorsContainer;
