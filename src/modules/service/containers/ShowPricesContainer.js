import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { useHistory, useParams, withRouter } from "react-router-dom";
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
    FormInput,
    FormSelector,
    Title,
} from "components";
import { useFormik } from "formik";
import { addPriceSchema } from "utils/schema/serviceSchemas/serviceSchemas";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePriceData } from "app/slices/serviceSlices/detailEditPriceSlice";
import { NumericFormat } from "react-number-format";

const ShowPricesContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const currentPriceData = useSelector((store) =>
        get(store, "service.detailEditPrice.data.currentPrice", {})
    );
    const currentPriceInfo = currentPriceData.priceDetails;
    const isFetched = useSelector((store) =>
        get(store, "service.detailEditPrice.data.isFetched", false)
    );

    useEffect(() => {
        dispatch(fetchSinglePriceData(id));
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
                                name: "Цена",
                                url: "/service/prices",
                            },
                            {
                                id: 3,
                                name: "Просмотр",
                                url: "/service/prices/show",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        {isFetched ? (
                            <>
                                <Row className="ml-64">
                                    <Col xs={2.5}>
                                        <Title>Страна отправитель</Title>
                                    </Col>
                                    <Col xs={3.5}>
                                        <Text>
                                            {get(
                                                currentPriceInfo,
                                                "fromCountryName",
                                                ""
                                            )}
                                        </Text>
                                    </Col>
                                    <Col xs={2.5}>
                                        <Title>Страна получатель</Title>
                                    </Col>
                                    <Col xs={3.5}>
                                        <Text>
                                            {get(
                                                currentPriceInfo,
                                                "toCountryName",
                                                ""
                                            )}
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
                                        {get(
                                            currentPriceInfo,
                                            "categoryName",
                                            ""
                                        )}
                                    </Col>
                                    <Col xs={3}>
                                        {get(currentPriceInfo, "unitName", "")}
                                    </Col>
                                    <Col xs={3}>
                                        <NumericFormat
                                            displayType="text"
                                            value={get(
                                                currentPriceInfo,
                                                "unitAmount",
                                                ""
                                            )}
                                            thousandSeparator={true}
                                            decimalScale={0}
                                            fixedDecimalScale={true}
                                        />
                                    </Col>
                                    <Col xs={3}>
                                        <NumericFormat
                                            displayType="text"
                                            value={get(
                                                currentPriceInfo,
                                                "priceAmount",
                                                ""
                                            )}
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
                                        xs={12}
                                        align={"center"}
                                        className="mt-64 mt-64"
                                    >
                                        <BaseButton
                                            primary
                                            handleClick={() =>
                                                history.push(
                                                    `/service/prices/edit/${id}`
                                                )
                                            }
                                        >
                                            Редактировать
                                        </BaseButton>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <ContentLoader />
                        )}
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default ShowPricesContainer;
