import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { ReactSVG } from "react-svg";
import ThreePoint from "../../../assets/images/icons/border-menu-three-dots.svg";

import {
    BaseBreadcrumb,
    Content,
    Text,
    BaseTabs,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMe } from "app/slices/commonSlices/userMeSlice";

const MyAccountContainer = () => {
    const dispatch = useDispatch()
    const user = useSelector((store) => get(store, "common.userMe.data.userMe.data", {}))
    useEffect(() => {
        dispatch(fetchUserMe())
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Настройки", url: "/settings" },
                            {
                                id: 2,
                                name: "Мой Аккаунт",
                                url: "/settings/profile",
                            },
                        ]}
                    />
                </Col>
                <Col >

                    <Content xs={12}>
                        <Row align="center">
                            <Col xs={6}>
                                <Text xs bold >{get(user, "firstName", "")}{"  "}
                                    {get(user, "lastName", "")} </Text>
                                <Text medium xl style={{padding:10}}>|</Text>
                                <Text style={{ padding: 10, opacity: 0.6 }}>{get(user, "email", "")}</Text>
                                <Text medium xl style={{ padding: 16 }}>|</Text>
                                <Text style={{ opacity: 0.6 }}>{get(user, "companyName", "")}</Text>

                            </Col>
                            <Col xs={6} className={"text-right"}><span style={{ opacity: 0.6 }}> Категория аккаунта</span>
                                <br />
                                <Text  bold>{get(user, "accountType", "")}</Text>
                            </Col>
                        </Row>
                        <BaseTabs firstName={get(user, "firstName", "")} lastName={get(user, "lastName", "")} />
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default MyAccountContainer;
