import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { Link, useLocation, useParams, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { ReactSVG } from "react-svg";
import ThreePoint from "../../../assets/images/icons/border-menu-three-dots.svg";

import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    BaseSelect,
    BaseTable,
    Flex,
    Text,
    ContentLoader,
    BasePagination,
    FormWrapper,
    FormInput,
    Loader,
} from "components";
import { useFormik } from "formik";
import addMeasurementUnitsSchema from "utils/schema/serviceSchemas/serviceSchemas";
import { ServiceApiService } from "services/apiServices";
import history from "router/history";
import { toast } from "react-toastify";
import { fetchAllServiceLimits } from "app/slices/serviceSlices/limitSlice/limitSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServiceLimit } from "app/slices/serviceSlices/limitSlice/getOneLimit";

const EditLimitContainer = () => {
    const state = useLocation()?.state;
    const { id } = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const serviceLimitData = useSelector((store) =>
        get(store, "service.getOneLimit.data.serviceLimit.data", [])
    );

    const onSubmit = (values) => {
        try {

            setLoading(true);
            ServiceApiService.PutServiceLimit({
                limitValue: values?.limitValue,
                limitType: get(serviceLimitData, "limitType", "")
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
    } = useFormik({
        initialValues: {
            limitValue: get(state, 'limit', "..."),
        },
        onSubmit,
    });
    useEffect(() => {
        dispatch(fetchAllServiceLimit(id));
    }, [id]);
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Сервис", url: "/service" },
                            {
                                id: 2,
                                name: "Лимиты ",
                                url: "/service/limit",
                            },
                            {
                                id: 3,
                                name: "Редактировать",
                                url: "/service/limit/edit",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        {loading && <Loader />}
                        <Row className="mt-64 ml-64">
                            <Col xs={12}>
                                <FormWrapper onSubmit={handleSubmit}>
                                    <Col xs={8} style={{ display: "flex" }} align={"center"}>

                                        <FormInput
                                            label={get(serviceLimitData, "limitType", "") === "MONTHLY_LIMIT" ? "Сумма отгрузки за один квартал" : "Вес одной почты"}
                                            name={"limitValue"}
                                            type={"number"}
                                            value={get(values, "limitValue", "")}
                                            placeholder={get(serviceLimitData, "limitValue", '')}
                                            handleOnChange={handleChange}
                                            handleOnBlur={handleBlur}
                                            error={
                                                touched.name &&
                                                errors.name
                                            }
                                            left={5}

                                            right={7}
                                        />
                                        <Col align={"center"}> {get(serviceLimitData, "limitType", "") === "MONTHLY_LIMIT" ? <Text> в долларах </Text> : <Text>в граммах</Text>}</Col>
                                    </Col>
                                    <Row className="mt-64">
                                        <Col xs={12} align={"center"}>
                                            <BaseButton
                                                primary
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

export default EditLimitContainer;
