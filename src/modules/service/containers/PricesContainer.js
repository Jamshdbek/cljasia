import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { ReactSVG } from "react-svg";
import glasses from "../../../assets/images/icons/glasses.svg";

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
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServicePrices } from "app/slices/serviceSlices/pricesSlice/pricesSlice";

const PricesContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const servicePrices = useSelector((store) =>
        get(store, "service.servicePrices.data.servicePrices", [])
    );

    const isFetched = get(servicePrices, "success", false);
    const data = get(servicePrices, "data.data", []);

    useEffect(() => {
        dispatch(fetchAllServicePrices());
    }, []);

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
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row>
                            <Col xs={12} className={"mb-16"}>
                                <Row align={"center"}>
                                    <Col xs={12} className={"text-right"}>
                                        <Flex justify={"flex-end"}>
                                            <BaseButton
                                                primary
                                                handleClick={() =>
                                                    history.push(
                                                        "/service/prices/add"
                                                    )
                                                }
                                            >
                                                Добавить
                                            </BaseButton>
                                        </Flex>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} className={"mb-32"}>
                                {isFetched ? (
                                    <BaseTable
                                        tableHeader={[
                                            "ID",
                                            "Страна отправитель",
                                            "Страна получатель",
                                            "Статус",
                                            "Действия",
                                        ]}
                                    >
                                        {!isEmpty(data) ? (
                                            data.map((item, index) => (
                                                <tr key={index + 1}>
                                                    <td> {index + 1} </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "fromCountryName",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "toCountryName",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "isActive"
                                                        ) == true ? (
                                                            <Text
                                                                xs
                                                                medium
                                                                success
                                                            >
                                                                Active
                                                            </Text>
                                                        ) : (
                                                            <Text
                                                                xs
                                                                medium
                                                                danger
                                                            >
                                                                Inactive
                                                            </Text>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/service/prices/show/${get(
                                                                item,
                                                                "priceId",
                                                                ""
                                                            )}`}
                                                        >
                                                            <ReactSVG
                                                                src={glasses}
                                                                className={
                                                                    "cursor-pointer"
                                                                }
                                                            />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={10}>No data</td>
                                            </tr>
                                        )}
                                    </BaseTable>
                                ) : (
                                    <ContentLoader />
                                )}
                            </Col>
                        </Row>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default PricesContainer;
