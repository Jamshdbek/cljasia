import React, { useEffect, useState } from "react";
import _, { get, isEmpty } from "lodash";
import { Col, Container, Row } from "react-grid-system";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Text,
    FormInput,
    FormSelector,
    DropDownListBox,
    AddDDListBox,
    FormWrapper,
    Loader,
} from "components";
import { useFormik } from "formik";
import { addPriceSchema } from "utils/schema/serviceSchemas/serviceSchemas";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "app/slices/commonSlices/countriesSlice";
import { createSelector } from "@reduxjs/toolkit";
import { fetchRegions } from "app/slices/commonSlices/regionsSlice";
import {
    addPrice,
    changePrice,
    changeRegion,
    editRegionPrice,
    removePrice,
} from "app/slices/serviceSlices/addPriceSlice/addPriceSlice";
import { toast } from "react-toastify";
import history from "router/history";
import { ServiceApiService } from "services/apiServices";
import { fetchAllServiceMeasurementUnit } from "app/slices/serviceSlices/measurementUnitSlice/measurementUnitSlice";
import { fetchAllServiceCategories } from "app/slices/serviceSlices/categoriesSlice/categoriesSlice";
import { fetchUserMe } from "app/slices/commonSlices/userMeSlice";
import { fetchToCountries } from "app/slices/commonSlices/toCountriesSlice";

const AddPricesContainer = () => {
    const dispatch = useDispatch();
    const priceList = useSelector((store) => store.service.addPrice.priceList);

    const categoryData = useSelector((store) =>
        get(store, "service.serviceCategories.data.serviceCategories.data", [])
    );

    useEffect(() => {
        dispatch(fetchAllServiceCategories());
        dispatch(fetchUserMe());
    }, []);

    const userMe = useSelector((store) =>
        get(store, "common.userMe.data.userMe.data", [])
    );

    const defaultFromCountry = [
        {
            label: get(userMe?.country, "label"),
            value: get(userMe?.country, "value"),
        },
    ];

    const defaultDealerId = get(userMe, "id", null);

    useEffect(() => {
        dispatch(fetchToCountries(defaultDealerId));
    }, [defaultDealerId]);

    const toCountries = useSelector((store) =>
        get(store, "common.toCountries.data.toCountries.data", [])
    );

    const toCountriesOptions = _.map(toCountries, function map(item) {
        return {
            label: get(item, "label", "-"),
            value: get(item, "value", "-"),
        };
    });

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

    useEffect(() => {
        dispatch(fetchAllServiceMeasurementUnit());
    }, []);

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

    const regions = useSelector(regionCreateSchema);
    const initialValueRegionPrices = useSelector(
        (store) => store.service.addPrice.initialValues
    );

    useEffect(() => {
        dispatch(fetchCountries());
    }, []);

    const [loading, setLoading] = useState(false);
    const onSubmit = (values) => {
        try {
            setLoading(true);
            ServiceApiService.PostServicePrice(values).then((res) => {
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
            fromCountryId: {},
            toCountryId: {},
            categoryId: {},
            unitId: {},
            unitAmount: "",
            priceAmount: "",
            dealerId: -1,
        },
        onSubmit,
        validationSchema: addPriceSchema,
    });

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
                            { id: 1, name: "Сервис", url: "/service" },
                            {
                                id: 2,
                                name: "Цена",
                                url: "/service/prices",
                            },
                            {
                                id: 3,
                                name: "Добавить",
                                url: "/service/prices/add",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        {/* {loading && <Loader />} */}
                        <FormWrapper onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={0.5}></Col>
                                <Col xs={5}>
                                    <FormSelector
                                        label={"Страна отправитель"}
                                        name={"fromCountryId"}
                                        // defaultValue={defaultFromCountry}
                                        value={get(values, "fromCountryId", "")}
                                        placeholder={"... ."}
                                        error={
                                            touched.fromCountryId &&
                                            errors.fromCountryId
                                        }
                                        options={defaultFromCountry}
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
                                        value={get(values, "toCountryId", "")}
                                        placeholder={"... ."}
                                        error={
                                            touched.toCountryId &&
                                            errors.toCountryId
                                        }
                                        options={toCountriesOptions}
                                        handleChange={(e) =>
                                            setFieldValue("toCountryId", e)
                                        }
                                        left={4}
                                        right={8}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="mt-16 mb-16">
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
                                <Col xs={12} className="mt-16 mb-16">
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}></Col>
                                <Col xs={2.5}>
                                    <FormSelector
                                        name={"categoryId"}
                                        value={get(values, "categoryId", "")}
                                        placeholder={"Категория"}
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
                                        value={get(values, "unitId", "")}
                                        placeholder={"Единица измерения"}
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
                                        type={"number"}
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
                                        type={"number"}
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
                                    <BaseButton primary type="submit">
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

export default AddPricesContainer;
