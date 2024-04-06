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
import { fetchAllServiceMeasurementUnit } from "app/slices/serviceSlices/measurementUnitSlice/measurementUnitSlice";

const MeasurementUnitsContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const serviceMeasurementUnit = useSelector((store) =>
        get(store, "service.serviceMeasurementUnit.data.serviceMeasurementUnit", [])
    );
    
    const isFetched = get(serviceMeasurementUnit, "success", false);
    const data = get(serviceMeasurementUnit, "data", []);
    useEffect(() => {
        dispatch(fetchAllServiceMeasurementUnit());
        document.title ="Сервис"
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
                                name: "Единица измерения",
                                url: "/service/measurementunits",
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
                                                                    "/service/measurementunits/add"
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
                                            "Наименование",
                                            "Действия",
                                        ]}
                                    >
                                        {!isEmpty(data) ? (
                                            data.map((item, index) => (
                                                <tr key={get(item, "id", null)}>
                                                    <td> {get(item, "id", null)} </td>
                                                    <td> {get(item, "name", null)} </td>
                                                    <td>
                                                    <ReactSVG
                                                    onClick={()=>
                                                    history.push({
                                                        pathname: "/service/measurementunits/edit/" + get(item, "id", null),
                                                        state: {
                                                            id: get(item, "id", null),
                                                            name: get(item, "name", null),
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

export default MeasurementUnitsContainer;
