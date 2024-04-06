import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { Link, useHistory, withRouter } from "react-router-dom";
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
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServiceLimits } from "app/slices/serviceSlices/limitSlice/limitSlice";
import { NumericFormat } from "react-number-format";

const LimitContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const serviceLimitData = useSelector((store) =>
        get(store, "service.limitsSlice.data.serviceLimits", [])
    );

    const isFetched = get(serviceLimitData, "success", false);
    const data = get(serviceLimitData, "data", []);
    useEffect(() => {
        dispatch(fetchAllServiceLimits());
    }, []);
    
    const limitTitle = ["Вес одной почты", "Сумма отгрузки за один квартал" ]

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Сервис", url: "/service" },
                            {
                                id: 2,
                                name: "Лимиты",
                                url: "/service/limit",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row>
                            <Col xs={12} className={"mb-32"}>
                                {isFetched ? (
                                    <BaseTable
                                        tableHeader={[
                                            "Названия",
                                            "Лимит",
                                            "Действия",
                                        ]}
                                    >
                                        {!isEmpty(data) ? (
                                            data.map((item, index) => (
                                                <tr key={get(item, "id", null)}>
                                                    <td>{ limitTitle[index]}</td>
                                                    <td>
                                                        <NumericFormat
                                                            displayType="text"
                                                            value={get(item, "limitValue", null)}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            fixedDecimalScale={
                                                                true
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        
                                                        <ReactSVG
                                                            onClick={() =>
                                                                history.push({
                                                                    pathname: "/service/limit/edit/" + get(item, "id", null),
                                                                    state: {
                                                                        limit:item.limitValue,
                                                                    }
                                                                })}
                                                            src={ThreePoint}
                                                            className={
                                                                "cursor-pointer"
                                                            }
                                                        />
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

export default LimitContainer;
