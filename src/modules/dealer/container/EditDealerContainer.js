import React, { useEffect, useState } from "react";
import _, { get, isEmpty } from "lodash";
import { Link, useHistory, useLocation, useParams, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { ReactSVG } from "react-svg";
import ThreePoint from "../../../assets/images/icons/border-menu-three-dots.svg";
import { fetchSinglePriceData } from "app/slices/serviceSlices/detailEditPriceSlice";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Text,
    FormInput,
    FormSelector,
    FormWrapper,
} from "components";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCityDealersPrices } from "app/slices/dealerSlices/DataCityDealersPriceSlice/DataCityDealersPriceSlice";
import { fetchAllServiceMeasurementUnit } from "app/slices/serviceSlices/measurementUnitSlice/measurementUnitSlice";
import { fetchAllServiceCategories } from "app/slices/serviceSlices/categoriesSlice/categoriesSlice"
import { DealerApiService } from "services/apiServices";
import { toast } from "react-toastify";
import history from "router/history";
import { fetchCountries } from "app/slices/commonSlices/countriesSlice";

const EditDealerContainer = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const state = useLocation()?.state;
    
    const toCountryData = useSelector((store) =>
        get(store, "service.allCountries.data.serviceAllCountries.data", [])
    );
    // service provider
    const categoryData = useSelector((store) =>
        get(store, "service.serviceCategories.data.serviceCategories.data", [])
    );
    const measurementUnitData = useSelector((store) =>
        get(store, "service.serviceMeasurementUnit.data.serviceMeasurementUnit.data", [])
    );

    // dealer
    const priceDetails = useSelector((store) =>
        get(store, "dealer.dataCityDealersPrices.data.dataCityDealersPrices.data.priceDetails", [])
    );
    const countryOptions = _.map(toCountryData, function map(item) {
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", "-"),
        }
    });

    const categoryOptions = _.map(categoryData, function map(item) {
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", "-"),
        }
    });
    const measurementUnitOptions = _.map(measurementUnitData, function map(item) {
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", "-"),
        }
    });
    // Submit 
    const onSubmit = (values) => {
        setLoading(true);
        try {
            DealerApiService.PutDealerPrice({
                priceId: get(priceDetails, "priceId", ""),
                dealerId: get(priceDetails, "dealerId", ""),
                isActive: get(values, "isActive", ""),
                fromCountryId: get(values, "senderCountry", ""),
                toCountryId: get(values, "recieverCountry", ""),
                categoryId: get(values, "category", ""),
                unitId: get(values, "unitMeasurement", ""),
                unitAmount: get(values, "weight", ""),
                priceAmount: get(values, "price", ""),
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    history.goBack();
                    toast.success(res.data.message);
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.error(res.data.message);
                }
            });
        } catch (e) {
            setLoading(false);
        }
        setLoading(false)

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
            senderCountry: get(priceDetails, "fromCountryId", "-"),
            recieverCountry: get(priceDetails, "toCountryId", "-"),
            category: get(priceDetails, "categoryId", "-"),
            unitMeasurement: get(priceDetails, "unitId", ""),
            weight: get(priceDetails, "unitAmount", "-"),
            price: get(priceDetails, "priceAmount", "-"),
            isActive: get(state, "isActive", "-"),
            dealerId: get(priceDetails, "dealerId", ""),
            priceId: get(priceDetails, "priceId", "")


        },
        onSubmit,
        // validationSchema: addPriceSchema,
    });

    useEffect(() => {
        dispatch(fetchDataCityDealersPrices(id));
        dispatch(fetchAllServiceMeasurementUnit())
        dispatch(fetchAllServiceCategories())
    }, [id]);
    useEffect(() => {
        dispatch(fetchCountries())

    }, [])

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
                                name: `${get(state, "dealerLastName", "")} ${get(state, "dealerName", "")} `,
                                url: "/dealer/dealerprice/citydealer",
                            },
                            {
                                id: 4,
                                name: "Редактировать",
                                url: "/dealer/dealerprice/citydealer/edit",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>

                    <FormWrapper onSubmit={handleSubmit}>
                        <Content>
                            <Row className="mt-8 mb-24">
                                <Col xs={1}></Col>
                                <Col xs={2}> <Text small medium> Дилер </Text> </Col>
                                <Col xs={3}> <Text large>{get(state, "dealerLastName", "")} {get(state, "dealerName", "")} </Text> </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="mb-16">
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={0.5}></Col>
                                <Col xs={5}>
                                    <FormSelector
                                        disabled={true}
                                        style={{ opacity: 0.7 }}
                                        label={"Страна отправитель"}
                                        name={"senderCountry"}
                                        value={get(values, "senderCountry", "")}
                                        placeholder={get(priceDetails, "fromCountryName", "-")}
                                        error={
                                            touched.senderCountry &&
                                            errors.senderCountry
                                        }
                                        options={countryOptions}
                                        handleChange={(e) =>
                                            setFieldValue("senderCountry", e)
                                        }
                                        left={4}
                                        right={8}
                                    />
                                </Col>
                                <Col xs={0.5}></Col>
                                <Col xs={5}>
                                    <FormSelector
                                        label={"Страна получатель"}
                                        name={"recieverCountry"}
                                        value={get(values, "recieverCountry", "")}
                                        placeholder={get(priceDetails, "toCountryName", "-")}
                                        error={
                                            touched.recieverCountry &&
                                            errors.recieverCountry
                                        }
                                        options={countryOptions}
                                        handleChange={(e) =>
                                            setFieldValue("recieverCountry", e)
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
                                        name={"category"}
                                        value={get(values, "category", "")}
                                        placeholder={get(priceDetails, "categoryName", "-")}
                                        error={
                                            touched.category &&
                                            errors.category
                                        }
                                        options={categoryOptions}
                                        handleChange={(e) =>
                                            setFieldValue("category", e)
                                        }
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                                <Col xs={2.5}>
                                    <FormSelector
                                        name={"unitMeasurement"}
                                        value={get(values, "unitMeasurement", "")}
                                        placeholder={get(priceDetails, "unitName", "-")}
                                        error={
                                            touched.category &&
                                            errors.category
                                        }
                                        options={measurementUnitOptions}
                                        handleChange={(e) =>
                                            setFieldValue("unitMeasurement", e)
                                        }
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                                <Col xs={2.5}>
                                    <FormInput
                                        name={"weight"}
                                        type={"number"}
                                        placeholder={get(priceDetails, "unitAmount", "-")}
                                        value={get(values, "weight", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={
                                            touched.weight && errors.weight
                                        }
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                                <Col xs={2.5}>
                                    <FormInput
                                        name={"price"}
                                        type={"number"}
                                        placeholder={get(priceDetails, "priceAmount", "-")}
                                        value={get(values, "price", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={
                                            touched.price && errors.price
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
                            <Row className="mt-64" align="center">
                                <Col xs={1}></Col>
                                <Col xs={2}>
                                    <Text>Статус</Text>
                                </Col>
                                <Col xs={3}>
                                    <FormSelector
                                        name={"isActive"}
                                        value={get(values, "isActive", "")}
                                        // placeholder={'Active'}
                                        error={
                                            touched.isActive && errors.isActive
                                        }
                                        options={[
                                            { label: "Active", value: true },
                                            {
                                                label: "Inactive",
                                                value: false,
                                            },
                                        ]}
                                        handleChange={(e) => {
                                            setFieldValue("isActive", e);
                                        }}
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                                <Col xs={3} align={"center"}>
                                    <BaseButton primary type="submit">
                                        Обновить
                                    </BaseButton>
                                </Col>
                            </Row>
                        </Content>
                    </FormWrapper>
                </Col>
            </Row>

        </Container>
    );
};

export default EditDealerContainer;
