import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { HasAccess } from "services/auth";

import { Sidebar, MenuItem, Flex } from "components";

import users from "assets/images/icons/my-accout.svg";
import comoniy from "assets/images/icons/componiy-setting.svg";
import exitIcon from "assets/images/icons/exit_icon.svg";

const SettingsInnerLayout = ({ children }) => {
    return (
        <Container fluid>
            <Row className="mt-8">
                <Col xs={2.3}>
                    <HasAccess>
                        {({ userCan, pages }) => (
                            <Sidebar className="no-print mt-64">
                                {userCan(pages, "SETTINGS_PROFILE") && (
                                    <MenuItem
                                        icon={users}
                                        url={"/settings/profile"}
                                        activeUrls={[
                                            "/settings",
                                            "/settings/profile",
                                        ]}
                                    >
                                        Мой аккаунт
                                    </MenuItem>
                                )}
                                {userCan(pages, "SETTINGS_COMPANY_INFO") && (
                                    <MenuItem
                                        icon={comoniy}
                                        url={"/settings/companyinfo"}
                                        activeUrls={["/settings/companyinfo"]}
                                    >
                                        Информация о компании
                                    </MenuItem>
                                )}
                                <MenuItem icon={exitIcon} url={"/logout"}>
                                    Выход из системы
                                </MenuItem>
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

export default SettingsInnerLayout;
