import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { HasAccess } from "services/auth";

import { Sidebar, MenuItem, Flex } from "components";

import users from "assets/images/icons/users.svg";
import dollar from "assets/images/icons/dollar.svg";
import box from "assets/images/icons/box.svg";
import table from "assets/images/icons/table.svg";

const DealerInnerLayout = ({ children }) => {
    return (
        <Container fluid>
            <Row className="mt-8">
                <Col xs={2.3}>
                    <HasAccess>
                        {({ userCan, pages, isAdmin }) => (
                            <Sidebar className="no-print mt-64">
                                {isAdmin && (
                                    <MenuItem
                                        icon={dollar}
                                        url={"/dealer/dealerprice"}
                                        activeUrls={[
                                            "/dealer",
                                            "/dealer/dealerprice",
                                            "/dealer/dealerprice/add",
                                            "/dealer/dealerprice/citydealer",
                                            "/dealer/dealerprice/citydealer/show",
                                            "/dealer/dealerprice/citydealer/edit",
                                        ]}
                                    >
                                        Дилерская цена
                                    </MenuItem>
                                )}
                                {userCan(pages, "DEALER_ORDERBOX") && (
                                    <MenuItem
                                        icon={box}
                                        url={"/dealer/orderbox"}
                                        activeUrls={["/dealer/orderbox"]}
                                    >
                                        Коробка заказов
                                    </MenuItem>
                                )}
                                {userCan(pages, "DEALER_PAYMENT") && (
                                    <MenuItem
                                        icon={table}
                                        url={"/dealer/payment"}
                                        activeUrls={["/dealer/payment"]}
                                    >
                                        Расчет
                                    </MenuItem>
                                )}
                            </Sidebar>
                        )}
                    </HasAccess>
                </Col>
                <Col xs={9.7} className={"col-10 print p-4"}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default DealerInnerLayout;
