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
import { addLocationSchema } from "utils/schema/serviceSchemas/serviceSchemas";
import { ServiceApiService } from "services/apiServices";
import history from "router/history";
import { toast } from "react-toastify";

const EditLocationContainer = () => {
    const state = useLocation()?.state;

    const [loading, setLoading] = useState(false);
    const onSubmit = (values) => {
        try {
            setLoading(true);
            ServiceApiService.PutEditServiceLocation(values).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    history.goBack();
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    setLoading(true);
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
        enableReinitialize: true,
        initialValues: {
            name: get(state, "name", ""),
            isActive: get(state, "isActive", null),
            status: get(state, "status", null),
            id: get(state, "id", null),
        },
        onSubmit,
        validationSchema: addLocationSchema,
    });

    const locationStatusOptions = [
        {
            value: true,
            label: "Active",
        },
        {
            value: false,
            label: "Inactive",
        },
    ];

    const isActive =
        get(state, "isActive", null) == true ? "Active" : "Inactive";
    const status =
        get(state, "status") == "SORTING"
            ? "Sorting"
            : get(state, "status", null) == "DELIVERED"
            ? "Delivered"
            : get(state, "status", null) == "DELIVER_IN_PROCESS"
            ? "Deliver in Process"
            : "";
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Сервис", url: "/service" },
                            {
                                id: 2,
                                name: "Местоположение",
                                url: "/service/location",
                            },
                            {
                                id: 3,
                                name: "Редактировать",
                                url: "/service/location/edit",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        {/* {loading && <Loader />} */}
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
                                        name={"status"}
                                        placeholder={`${status}`}
                                        value={get(values, "status", ".....")}
                                        error={touched.status && errors.status}
                                        options={[
                                            {
                                                label: "Sorting",
                                                value: "SORTING",
                                            },
                                            {
                                                label: "Custom Clearance",
                                                value: "CUSTOM_CLEARANCE",
                                            },
                                            {
                                                label: "Deliver in Process",
                                                value: "DELIVER_IN_PROCESS",
                                            },
                                            {
                                                label: "Delivered",
                                                value: "DELIVERED",
                                            },
                                        ]}
                                        handleChange={(e) => {
                                            console.log(e, "E");
                                            setFieldValue("status", e);
                                        }}
                                        left={2}
                                        right={6}
                                    />
                                    <FormSelector
                                        label={"Статус местоположения"}
                                        name={"isActive"}
                                        value={get(values, "isActive", "")}
                                        handleChange={(e) =>
                                            setFieldValue("isActive", e)
                                        }
                                        placeholder={`${isActive}`}
                                        options={locationStatusOptions}
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

export default EditLocationContainer;
