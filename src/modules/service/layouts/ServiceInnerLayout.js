import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { HasAccess } from "services/auth";

import { Sidebar, MenuItem, Flex } from "components";

import rate from "assets/images/icons/rate.svg";
import label from "assets/images/icons/label.svg";
import flag from "assets/images/icons/flag.svg";
import dollar from "assets/images/icons/dollar.svg";
import search from "assets/images/icons/search.svg";
import checked from "assets/images/icons/checked.svg";



const ServiceInnerLayout = ({ children }) => {
    return (
        <Container fluid>
            <Row className="mt-8">
                <Col xs={2.5}>
                    <HasAccess>
                        {({ userCan, pages }) => (
                            <Sidebar className="no-print mt-64">
                                {userCan(pages, "SERVICE_MEASUREMENTUNITS") && (
                                    <MenuItem
                                        icon={rate}
                                        url={"/service/measurementunits"}
                                        activeUrls={[
                                            "/service",
                                            "/service/measurementunits",
                                            "/service/measurementunits/add",
                                            "/service/measurementunits/edit",
                                        ]}
                                    >
                                        Единица измерения
                                    </MenuItem>
                                )}
                                {userCan(pages, "SERVICE_CATEGORIES") && (
                                    <MenuItem
                                        icon={label}
                                        url={"/service/categories"}
                                        activeUrls={[
                                            "/service/categories",
                                            "/service/categories/add",
                                            "/service/categories/edit",
                                        ]}
                                    >
                                        Категория
                                    </MenuItem>
                                )}
                                {userCan(pages, "SERVICE_COUNTRIES") && (
                                    <MenuItem
                                        icon={flag}
                                        url={"/service/countries"}
                                        activeUrls={[
                                            "/service/countries",
                                            "/service/countries/add",
                                            "/service/countries/edit",
                                        ]}
                                    >
                                        Страны, регионы, города
                                    </MenuItem>
                                )}
                                {userCan(pages, "SERVICE_PRICES") && (
                                    <MenuItem
                                        icon={dollar}
                                        url={"/service/prices"}
                                        activeUrls={[
                                            "/service/prices",
                                            "/service/prices/add",
                                            "/service/prices/show",
                                            "/service/prices/edit",
                                        ]}
                                    >
                                        Цена
                                    </MenuItem>
                                )}
                                {userCan(pages, "SERVICE_LOCATION") && (
                                    <MenuItem
                                        icon={search}
                                        url={"/service/location"}
                                        activeUrls={[
                                            "/service/location",
                                            "/service/location/add",
                                            "/service/location/edit",
                                        ]}
                                    >
                                        Местоположение
                                    </MenuItem>
                                )}
                                {userCan(pages, "SERVICE_LIMIT") && (
                                    <MenuItem
                                        icon={checked}
                                        url={"/service/limit"}
                                        activeUrls={[
                                            "/service/limit",
                                            "/service/limit/edit",
                                        ]}
                                    >
                                        Лимиты
                                    </MenuItem>
                                )}
                            </Sidebar>
                        )}
                    </HasAccess>
                </Col>
                <Col xs={9.5} className={"col-10 print p-4"}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default ServiceInnerLayout;
