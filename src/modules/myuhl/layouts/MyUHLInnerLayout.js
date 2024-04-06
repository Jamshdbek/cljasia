import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { HasAccess } from "services/auth";

import { Sidebar, MenuItem, Flex } from "components";

import postbox from "assets/images/icons/postbox.svg";
import usersIcon from "assets/images/icons/users.svg";
import statistics from "assets/images/icons/statistics.svg";
import paper from "assets/images/icons/paper.svg";
import userEdit from "assets/images/icons/userEdit.svg";

const MyUhlInnerLayout = ({ children }) => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <HasAccess>
                        {({ userCan, pages, isAdmin }) => (
                            <Sidebar className="mb-24">
                                <Flex>
                                    {userCan(pages, "MYUHL_PARCELS") && (
                                        <MenuItem
                                            icon={postbox}
                                            url={"/myuhl/parcels"}
                                            activeUrls={[
                                                "/myuhl",
                                                "/myuhl/parcels",
                                            ]}
                                        >
                                            Почта (MyUHL)
                                        </MenuItem>
                                    )}
                                    {isAdmin && (
                                        <MenuItem
                                        stoke={true}
                                            icon={usersIcon}
                                            url={"/myuhl/users"}
                                        >
                                            Пользователи
                                        </MenuItem>
                                    )}
                                    {isAdmin && (
                                        <MenuItem
                                            icon={statistics}
                                            url={"/myuhl/statistics"}
                                        >
                                            Статистика
                                        </MenuItem>
                                    )}
                                    {isAdmin && (
                                        <MenuItem
                                            icon={userEdit}
                                            url={"/myuhl/inspections"}
                                        >
                                            Инспекция
                                        </MenuItem>
                                    )}
                                    {isAdmin && (
                                        <MenuItem
                                            icon={paper}
                                            url={"/myuhl/manifest"}
                                        >
                                            Манифест
                                        </MenuItem>
                                    )}
                                </Flex>
                            </Sidebar>
                        )}
                    </HasAccess>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>{children}</Col>
            </Row>
        </Container>
    );
};

export default MyUhlInnerLayout;
