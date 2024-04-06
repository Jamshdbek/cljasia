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

import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    FormSelector,
    Text,
    FormInput,
    DropDownListBox,
    AddDDListBox,
    Title,
    Loader,
} from "components";
import { useFormik } from "formik";
import editDealerPriceSchema from "utils/schema/dealerSchemas/dealerSchemas";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServiceAllCountries } from "app/slices/serviceSlices/allCountriesSlice/allCountriesSlice";
import { fetchAllServiceCategories } from "app/slices/serviceSlices/categoriesSlice/categoriesSlice";
import { fetchAllServiceMeasurementUnit } from "app/slices/serviceSlices/measurementUnitSlice/measurementUnitSlice";
import { fetchDataCityDealersPrices } from "app/slices/dealerSlices/DataCityDealersPriceSlice/DataCityDealersPriceSlice";
import {
    addPrice,
    changePrice,
    changeRegion,
    editRegionPrice,
    removePrice,
} from "app/slices/serviceSlices/addPriceSlice/addPriceSlice";
import { createSelector } from "@reduxjs/toolkit";
import { fetchRegions } from "app/slices/commonSlices/regionsSlice";
import { DealerApiService } from "services/apiServices";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";

const ShowCityDealerContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useLocation()?.state;
    const { id } = useParams();
    const { priceId } = useLocation()?.state;

    useEffect(() => {
        dispatch(fetchAllServiceCategories());
    }, []);

    useEffect(() => {
        dispatch(fetchAllServiceAllCountries());
    }, []);

    useEffect(() => {
        dispatch(fetchAllServiceMeasurementUnit());
    }, []);

    const priceDetails = useSelector((store) =>
        get(
            store,
            "dealer.dataCityDealersPrices.data.dataCityDealersPrices.data.priceDetails",
            []
        )
    );
    const additionalPrice = useSelector((store) =>
        get(
            store,
            "dealer.dataCityDealersPrices.data.dataCityDealersPrices.data.additionalPrice",
            []
        )
    );

    useEffect(() => {
        dispatch(fetchDataCityDealersPrices(priceId));
    }, [priceId]);

    const regionCreateSchema = createSelector(
        (store) => get(store, "common.regions.regions.regions", []),
        (regions) => {
            return regions.map((region) => ({
                label: region.name,
                value: region.id,
            }));
        }
    );

    const [loading, setLoading] = useState(true);
    const onSubmit = (values) => {
        try {
            setLoading(true);
            DealerApiService.PutDealerPrice({
                ...values,
                fromCountryId: get(values, "fromCountryId.value", null),
                toCountryId: get(values, "toCountryId.value", null),
                categoryId: get(values, "categoryId.value", null),
                unitId: get(values, "unitId.value", null),
                additionalPrice: additionalPrice,
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

    setTimeout(() => {
        setLoading(false);
    }, 1000);
    return (
        <Container fluid>
            <Row>
                {loading && <Loader />}
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
                                url: "/dealer/dealerprice/citydealer",
                            },
                            {
                                id: 4,
                                name: "Просмотр",
                                url: "/dealer/dealerprice/citydealer/show",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row className="mt-8 mb-24">
                            <Col xs={1}></Col>
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
                            <Col xs={12} className="mb-16">
                                <hr />
                            </Col>
                        </Row>

                        <Row className="ml-64">
                            <Col xs={2.5}>
                                <Title>Страна отправитель</Title>
                            </Col>
                            <Col xs={3.5}>
                                <Text>
                                    {get(priceDetails, "fromCountryName", "")}
                                </Text>
                            </Col>
                            <Col xs={2.5}>
                                <Title>Страна получатель</Title>
                            </Col>
                            <Col xs={3.5}>
                                <Text>
                                    {get(priceDetails, "toCountryName", "")}
                                </Text>
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

                        <Row className="ml-64">
                            <Col xs={3}>
                                {get(priceDetails, "categoryName", "")}
                            </Col>
                            <Col xs={3}>
                                {get(priceDetails, "unitName", "")}
                            </Col>
                            <Col xs={3}>
                                <NumericFormat
                                    displayType="text"
                                    value={get(priceDetails, "unitAmount", "")}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    fixedDecimalScale={true}
                                />
                            </Col>
                            <Col xs={3}>
                                <NumericFormat
                                    displayType="text"
                                    value={get(priceDetails, "priceAmount", "")}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                    fixedDecimalScale={true}
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
                                xs={16}
                                align={"center"}
                                className="mt-64 mt-64"
                            >
                                <BaseButton
                                    primary
                                    handleClick={() =>
                                        history.push({
                                            pathname: `/dealer/dealerprice/citydealer/edit/${id}`,
                                            state: {
                                                dealerName: get(
                                                    state,
                                                    "dealerName",
                                                    null
                                                ),
                                                dealerLastName: get(
                                                    state,
                                                    "dealerLastName",
                                                    null
                                                ),
                                                isActive: get(
                                                    state,
                                                    "isActive",
                                                    ""
                                                ),
                                            },
                                        })
                                    }
                                >
                                    Редактировать
                                </BaseButton>
                            </Col>
                        </Row>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default ShowCityDealerContainer;
