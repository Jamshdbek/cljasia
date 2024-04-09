import React, { useDebugValue, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";

import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    BaseTable,
    Flex,
    ContentLoader,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDealersPrices } from "app/slices/dealerSlices/dealersPriceSlice/dealersPriceSlice";

const DealerPriceContainer = () => {
     const dispatch = useDispatch();

    const dealersPrices = useSelector((store) =>
        get(store, "dealer.dealersPrices.data.dealersPrices", [])
    );
    const isFetched = get(dealersPrices, "success", false);
    const data = get(dealersPrices, "data", []);
    
    useEffect(() => {
        dispatch(fetchAllDealersPrices());
        document.title = "Дилер"
    }, []);

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
                                url: "/dealer",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row>
                            <Col xs={12} className={"mb-32"}>
                                {isFetched ? (
                                    <BaseTable tableHeader={["ID", "Дилер"]} >
                                        {!isEmpty(data) ? (
                                            data.map((item, index) => (
                                                <tr key={get(item, "id", null)}>
                                                    <td style={{ padding: 0  , width:"5%"}}>{get(item, "id", null)}</td>
                                                    <td style={{textAlign:"left"}}>
                                                        <Link
                                                            to={{
                                                                pathname: `/dealer/dealerprice/citydealer/${get(item, "id", null)}`,
                                                                state: {
                                                                    dealerId: get(item, "id", null),
                                                                    dealerName: get(item, "name", null),
                                                                    dealerLastName: get(item, "lastName", null),
                                                                    fromCountryName:get(item, "fromCountryName", null),
                                                                }
                                                            }
                                                            }
                                                            className={"link_color"}
                                                        >
                                                            {get(item, "lastName", null)}{"  "}
                                                            {get(item, "name", null)}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={10}>нет данных</td>
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

export default DealerPriceContainer;
