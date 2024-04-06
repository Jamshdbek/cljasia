import React, { useEffect, useState } from "react";
import _, { get, isEmpty } from "lodash";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";

import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Text,
    FormInput,
    FormSelector,
    FormWrapper,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "app/slices/commonSlices/countriesSlice";
import {
    addPrice,
    changePrice,
    changeRegion,
    editRegionPrice,
    removePrice,
} from "app/slices/serviceSlices/addPriceSlice/addPriceSlice";
import { fetchRegions } from "app/slices/commonSlices/regionsSlice";
import { useFormik } from "formik";
import { createSelector } from "@reduxjs/toolkit";
import { fetchAllServiceCategories } from "app/slices/serviceSlices/categoriesSlice/categoriesSlice";
import { fetchAllServiceMeasurementUnit } from "app/slices/serviceSlices/measurementUnitSlice/measurementUnitSlice";
import store from "app/store";
import { toast } from "react-toastify";
import { DealerApiService } from "services/apiServices";
import history from "router/history";
import { fetchUserMe } from "app/slices/commonSlices/userMeSlice";
import { fetchToCountries } from "app/slices/commonSlices/toCountriesSlice";
import * as yup from "yup";

const AddDealerPriceContainer = () => {
    const dispatch = useDispatch();
    const state = useLocation()?.state;
    const priceList = useSelector((store) => store.service.addPrice.priceList);
    const categoryData = useSelector((store) =>
        get(store, "service.serviceCategories.data.serviceCategories.data", [])
    );
    const userMe = useSelector((store) =>
        get(store, "common.userMe.data.userMe.data", [])
    );

    const toCountryOptions = useSelector((store) =>
        get(store, "common.toCountries.data.toCountries.data", [])
    );

    const categoryOptions = _.map(categoryData, function map(item) {
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", "-"),
        };
    });

    const measurementUnitData = useSelector((store) =>
        get(
            store,
            "service.serviceMeasurementUnit.data.serviceMeasurementUnit.data",
            []
        )
    );

    const measurementUnitOptions = _.map(
        measurementUnitData,
        function map(item) {
            return {
                label: get(item, "name", "-"),
                value: get(item, "id", "-"),
            };
        }
    );

    const countryCreateSchema = createSelector(
        (store) => store.common.countries.countries,
        (countries) => {
            return countries
                .filter((country) => country.isActive)
                .map((country) => ({ label: country.name, value: country.id }));
        }
    );

    const regionCreateSchema = createSelector(
        (store) => get(store, "common.regions.regions.regions", []),
        (regions) => {
            return regions.map((region) => ({
                label: region.name,
                value: region.id,
            }));
        }
    );

    const additionalPrice = _.map(priceList, function map(item) {
        return {
            regionId: get(item, "region", null),
            additionalPrice: get(item, "price", "-"),
        };
    });

    const countries = useSelector(countryCreateSchema);

    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchAllServiceCategories());
        dispatch(fetchAllServiceMeasurementUnit());
        dispatch(fetchUserMe(get(state, "dealerId", null)));
    }, []);

    const [loading, setLoading] = useState(false);
    const onSubmit = () => {
        try {
            setLoading(true);
            DealerApiService.PostDealerPrice({
                dealerId: get(state, "dealerId", null),
                fromCountryId: get(values, "fromCountryId", null),
                toCountryId: get(values, "toCountryId", null),
                categoryId: get(values, "categoryId", null),
                unitId: get(values, "unitId", null),
                priceAmount: get(values, "priceAmount", null),
                unitAmount: get(values, "unitAmount", null),
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    history.goBack();
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.warning(res.data.data.description);
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
            fromCountryId: get(userMe, "country.value"),
            toCountryId: {},
            categoryId: {},
            unitId: {},
            unitAmount: "",
            priceAmount: "",
            dealerId: get(state, "dealerId", null),
        },
        onSubmit,
        validationSchema: yup.object().shape({
            // toCountryId: yup.string().required("*required"),
        }),
    });
    useEffect(() => {
        dispatch(fetchToCountries(get(state, "dealerId", 1)));
    }, [get(store, "dealerId", 1)]);
    useEffect(() => {
        if (!isEmpty(values.toCountryId)) {
            dispatch(fetchRegions(get(values, "toCountryId.value", "")));
        }
    }, [values.toCountryId]);

    const [editData, setEditData] = useState({});

    useEffect(() => {
        dispatch(editRegionPrice(editData));
    }, [editData]);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Дилер", url: "/dealer" },
                            {
                                id: 2,
                                name: "Дилерская цена",
                                url: "/dealer/dealerprice",
                            },
                            {
                                id: 3,
                                name: `${get(
                                    state,
                                    "dealerLastName",
                                    ""
                                )} ${get(state, "dealerName", "")} `,
                                url: "/dealer/dealerprice",
                            },
                            {
                                id: 4,
                                name: "Добавить",
                                url: "/dealer/dealerprice/add",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        {/* {loading && <Loader />} */}
                        <FormWrapper onSubmit={handleSubmit}>
                            <Row className="mt-8 mb-8">
                                <Col xs={0.5}></Col>
                                <Col xs={2}>
                                    {" "}
                                    <Text small medium>
                                        {" "}
                                        Дилер{" "}
                                    </Text>{" "}
                                </Col>
                                <Col xs={3}>
                                    {" "}
                                    <Text large>
                                        {get(state, "dealerLastName", "")}{" "}
                                        {get(state, "dealerName", "")}{" "}
                                    </Text>{" "}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={0.5}></Col>
                                <Col xs={5}>
                                    <FormSelector
                                        label={"Страна отправитель"}
                                        name={"fromCountryId"}
                                        value={get(values, "fromCountryId", "")}
                                        placeholder={get(
                                            userMe,
                                            "country.label",
                                            "Rep.of Korea"
                                        )}
                                        disabled={true}
                                        error={
                                            touched.fromCountryId &&
                                            errors.fromCountryId
                                        }
                                        options={countries}
                                        handleChange={(e) =>
                                            setFieldValue("fromCountryId", e)
                                        }
                                        left={4}
                                        right={8}
                                    />
                                </Col>
                                <Col xs={0.5}></Col>
                                <Col xs={5}>
                                    <FormSelector
                                        label={"Страна получатель"}
                                        name={"toCountryId"}
                                        value={get(values, "toCountryId", null)}
                                        placeholder={`...`}
                                        error={
                                            touched.toCountryId &&
                                            errors.toCountryId
                                        }
                                        options={toCountryOptions}
                                        handleChange={(e) =>
                                            setFieldValue("toCountryId", e)
                                        }
                                        left={4}
                                        right={8}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} className="mt-16 mb-8">
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Text xl medium dark className="ml-64">
                                        Фундаментальная цена
                                    </Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="mt-8 mb-16">
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}></Col>
                                <Col xs={2.5}>
                                    <FormSelector
                                        name={"categoryId"}
                                        value={get(values, "categoryId", "")}
                                        placeholder={`Категория`}
                                        error={
                                            touched.categoryId &&
                                            errors.categoryId
                                        }
                                        options={categoryOptions}
                                        handleChange={(e) =>
                                            setFieldValue("categoryId", e)
                                        }
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                                <Col xs={2.5}>
                                    <FormSelector
                                        name={"unitId"}
                                        value={get(values, "unitId", null)}
                                        placeholder={`Единица измерения`}
                                        error={touched.unitId && errors.unitId}
                                        options={measurementUnitOptions}
                                        handleChange={(e) =>
                                            setFieldValue("unitId", e)
                                        }
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                                <Col xs={2.5}>
                                    <FormInput
                                        name={"unitAmount"}
                                        type={"unitAmount"}
                                        placeholder={"Вес..."}
                                        value={get(values, "unitAmount", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={
                                            touched.unitAmount &&
                                            errors.unitAmount
                                        }
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                                <Col xs={2.5}>
                                    <FormInput
                                        name={"priceAmount"}
                                        type={"priceAmount"}
                                        placeholder={"Цена..."}
                                        value={get(values, "priceAmount", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={
                                            touched.priceAmount &&
                                            errors.priceAmount
                                        }
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="mt-16 mb-16">
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    xs={12}
                                    align={"center"}
                                    className="mt-64 mt-64"
                                >
                                    <BaseButton
                                        primary
                                        type="submit"
                                        disabled={toCountryOptions.length == 0}
                                        // handleClick={onSubmit}
                                    >
                                        Добавить
                                    </BaseButton>
                                </Col>
                            </Row>
                        </FormWrapper>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default AddDealerPriceContainer;
