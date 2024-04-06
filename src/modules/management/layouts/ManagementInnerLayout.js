import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { HasAccess } from "services/auth";

import { Sidebar, MenuItem } from "components";


import userscircle from "assets/images/icons/userscircle.svg";


const ManagementInnerLayout = ({ children }) => {
    return (
        <Container fluid>
            <Row className="mt-8">
                <Col xs={2.3}>
                    <HasAccess>
                        {({ userCan, pages }) => (
                            <Sidebar className="no-print mt-64">
                                  
                                    {userCan(pages, "MANAGEMENT_OPERATORS") && (
                                        <MenuItem
                                            icon={userscircle}
                                            url={"/management/operators"}
                                            activeUrls={[
                                                "/management/operators",
                                                "/management/operators/add",
                                                "/management/operators/edit",
                                            ]}
                                        >
                                            Операторы
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

export default ManagementInnerLayout;
