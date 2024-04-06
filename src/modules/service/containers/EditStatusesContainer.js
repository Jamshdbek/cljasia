import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { Link, useLocation, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";

import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    FormWrapper,
    FormInput,
    FormSelector,
    Loader,
} from "components";
import { useFormik } from "formik";
import { editStatusSchema } from "utils/schema/serviceSchemas/serviceSchemas";
import { toast } from "react-toastify";
import { ServiceApiService } from "services/apiServices";
import history from "router/history";

const EditStatusesContainer = () => {
    const state = useLocation()?.state;
    const [loading, setLoading] = useState(false);
    const onSubmit = (values) => {
        try {
            setLoading(true);
            ServiceApiService.PutEditServiceStatus({
                ...values,
                name: get(values, "name", ""),
                isActive: get(values, "isActive.value", null),
                id: get(values, "id", ""),
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    history.goBack();
                    toast.success("Success");
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
            name: get(state, "name", ""),
            isActive: get(state, "isActive", null),
            id: get(state, "id", null),
        },
        onSubmit,
        // validationSchema: editStatusSchema,
    });
    const status = get(state, "isActive", null) == true ? "Active" : "Inactive"
    return (
        <Container fluid>
            {loading && <Loader />}
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Сервис", url: "/service" },
                            {
                                id: 2,
                                name: "Статусы",
                                url: "/service/statuses",
                            },
                            {
                                id: 3,
                                name: "Редактировать",
                                url: "/service/statuses/edit",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row className="mt-64 ml-64">
                            <Col xs={12} className={"mb-16"}>
                                <FormWrapper onSubmit={handleSubmit}>
                                    <FormInput
                                        label={"Наименование"}
                                        name={"name"}
                                        type={"text"}
                                        value={get(values, "name", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.name && errors.name}
                                        left={2}
                                        right={6}
                                    />
                                    <FormSelector
                                        label={"Статус"}
                                        name={"isActive"}
                                        placeholder={`${status}`}
                                        // value={ get(values, "isActive", null) ? { value: true, label: "Active"} : { value: false, label: "Inactive"}}
                                        // error={
                                        //     touched.isActive &&
                                        //     errors.isActive
                                        // }
                                        options={[
                                            {
                                                value: true,
                                                label: "Active",
                                            },
                                            {
                                                value: false,
                                                label: "Inactive",
                                            },
                                        ]}
                                        handleChange={(e) =>
                                            setFieldValue("isActive", e)
                                        }
                                        left={2}
                                        right={6}
                                    />
                                    <Row className="mt-64">
                                        <Col xs={12} align={"center"}>
                                            <BaseButton
                                                primary
                                                // handleClick={() => onSubmit()}
                                                type="submit"
                                            >
                                                Обновить
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

export default EditStatusesContainer;
