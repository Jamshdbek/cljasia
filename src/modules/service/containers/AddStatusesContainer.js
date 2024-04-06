import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { Col, Container, Row } from "react-grid-system";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    FormWrapper,
    FormInput,
    Loader,
} from "components";
import { useFormik } from "formik";
import { addStatusSchema } from "utils/schema/serviceSchemas/serviceSchemas";
import { useDispatch } from "react-redux";
import { addStatus } from "app/slices/serviceSlices/statusesSlice/statusesSlice";
import { ServiceApiService } from "services/apiServices";
import history from "router/history";
import { toast } from "react-toastify";

const AddStatusesContainer = () => {
    const [loading, setLoading] = useState(false);

    const onSubmit = (values) => {
        try {
            setLoading(true);
            ServiceApiService.PostServiceStatus({
                ...values,
                isActive: true,
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

    const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
        useFormik({
            initialValues: {
                name: "",
            },
            onSubmit,
            validationSchema: addStatusSchema,
        });

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
                                name: "Добавить",
                                url: "/service/statuses/add",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row>
                            <Col xs={12} className={"mb-16"}>
                                <Row className="mt-64 ml-64">
                                    <Col xs={12}>
                                        <FormWrapper onSubmit={handleSubmit}>
                                            <FormInput
                                                label={"Наименование"}
                                                name={"name"}
                                                type={"text"}
                                                value={get(values, "name", "")}
                                                handleOnChange={handleChange}
                                                handleOnBlur={handleBlur}
                                                error={
                                                    touched.name && errors.name
                                                }
                                                left={2}
                                                right={6}
                                            />
                                            <Row className="mt-64">
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
                            </Col>
                        </Row>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default AddStatusesContainer;
