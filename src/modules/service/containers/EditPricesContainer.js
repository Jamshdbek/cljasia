import React, { useEffect, useState } from "react";
import _, { get, isEmpty } from "lodash";
import {
    Link,
    useHistory,
    useLocation,
    useParams,
    withRouter,
} from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { ReactSVG } from "react-svg";
import ThreePoint from "../../../assets/images/icons/border-menu-three-dots.svg";
import { fetchSinglePriceData } from "app/slices/serviceSlices/detailEditPriceSlice";
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
    FormInput,
    FormSelector,
    Loader,
    FormWrapper,
} from "components";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServicePricesDetail } from "app/slices/serviceSlices/priceDeatail/priceDetail";
import { fetchUserMe } from "app/slices/commonSlices/userMeSlice";
import { fetchToCountries } from "app/slices/commonSlices/toCountriesSlice";
import { fetchAllServiceCategories } from "app/slices/serviceSlices/categoriesSlice/categoriesSlice";
import { fetchAllServiceMeasurementUnit } from "app/slices/serviceSlices/measurementUnitSlice/measurementUnitSlice";
import { DealerApiService } from "services/apiServices";
import history from "router/history";
import { toast } from "react-toastify";

const EditPricesContainer = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchAllServiceCategories());
    }, []);

    useEffect(() => {
        dispatch(fetchAllServiceMeasurementUnit());
    }, []);

    // get info
    const priceDetail = useSelector((store) =>
        get(store, "service.priceDetail.data.servicePrices.data.priceDetail")
    );
    const currentPriceInfo = useSelector((store) =>
        get(store, "service.priceDetail.data.servicePrices.data")
    );
    const countrydata = useSelector((store) =>
        get(store, "service.allCountries.data.serviceAllCountries.data", [])
    );
    const categoryData = useSelector((store) =>
        get(store, "service.serviceCategories.data.serviceCategories.data", [])
    );
    const measurementUnitData = useSelector((store) =>
        get(
            store,
            "service.serviceMeasurementUnit.data.serviceMeasurementUnit.data",
            []
        )
    );

    const countryOptions = _.map(countrydata, function map(item) {
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", "-"),
        };
    });
    const categoryOptions = _.map(categoryData, function map(item) {
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", "-"),
        };
    });
    const measurementUnitOptions = _.map(
        measurementUnitData,
        function map(item) {
            return {
                label: get(item, "name", "-"),
                value: get(item, "id", "-"),
            };
        }
    );
    const userId = useSelector(
        (store) => store.auth.user.token.data.accountType.id
    );

    // Submit PutDealerPrice
    const onSubmit = (values) => {
        setLoading(true);
        try {
            DealerApiService.PutDealerPrice({
                dealerId: userId,
                priceId: id,
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
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.error(res.data.message);
                }
            });
        } catch (e) {
            setLoading(true);
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
            senderCountry: currentPriceInfo?.priceDetails?.fromCountryId,
            recieverCountry: currentPriceInfo?.priceDetails?.toCountryId,
            category: currentPriceInfo?.priceDetails?.categoryId,
            unitMeasurement: currentPriceInfo?.priceDetails?.unitId,
            weight: currentPriceInfo?.priceDetails?.unitAmount,
            price: currentPriceInfo?.priceDetails?.priceAmount,
            isActive: currentPriceInfo?.priceDetails?.active,
        },
        onSubmit,
        // validationSchema: addPriceSchema,
    });

    useEffect(() => {
        dispatch(fetchUserMe());
    }, []);

    const userMe = useSelector((store) =>
        get(store, "common.userMe.data.userMe.data", [])
    );

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

    const defaultFromCountry = [
        {
            label: get(userMe?.country, "label"),
            value: get(userMe?.country, "value"),
        },
    ];
  console.log(values)
    useEffect(() => {
        dispatch(fetchAllServicePricesDetail(id));
    }, [id]);
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
                                name: "Цена",
                                url: "/service/prices",
                            },
                            {
                                id: 3,
                                name: "Редактировать",
                                url: "/service/prices/edit",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <FormWrapper onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={0.5}></Col>
                                <Col xs={5}>
                                    <FormSelector
                                        label={"Страна отправитель"}
                                        name={"senderCountry"}
                                        value={get(values, "senderCountry", "")}
                                        placeholder={"..."}
                                        error={
                                            touched.senderCountry &&
                                            errors.senderCountry
                                        }
                                        options={defaultFromCountry}
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
                                        value={get(
                                            values,
                                            "recieverCountry",
                                            ""
                                        )}
                                        placeholder={"..."}
                                        error={
                                            touched.recieverCountry &&
                                            errors.recieverCountry
                                        }
                                        options={toCountriesOptions}
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
                                        placeholder={"..."}
                                        error={
                                            touched.category && errors.category
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
                                        value={get(
                                            values,
                                            "unitMeasurement",
                                            ""
                                        )}
                                        placeholder={"..."}
                                        error={
                                            touched.category && errors.category
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
                                        placeholder={"Вес..."}
                                        value={get(values, "weight", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.weight && errors.weight}
                                        left={0}
                                        right={12}
                                    />
                                </Col>
                                <Col xs={2.5}>
                                    <FormInput
                                        name={"price"}
                                        type={"number"}
                                        placeholder={"Цена..."}
                                        value={get(values, "price", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.price && errors.price}
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
                                <Col xs={0.5}></Col>
                                <Col xs={2}>
                                    <Text>Статус</Text>
                                </Col>
                                <Col xs={3}>
                                    <FormSelector
                                        name={"isActive"}
                                        value={get(values,"isActive", false).toString()}
                                        placeholder={"..."}
                                        error={
                                            touched.isActive && errors.isActive
                                        }
                                        
                                        options={[
                                            { label: "Active", value: "true" },
                                            {
                                                label: "Inactive",
                                                value: "false",
                                            },
                                        ]}
                                        handleChange={(e) => {
                                            setFieldValue("isActive", e);
                                        }}
                                        handleOnBlur={handleBlur}
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
                        </FormWrapper>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default EditPricesContainer;
