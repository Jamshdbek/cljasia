import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";

import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Flex,
    ContentLoader,
} from "components";
import ClientCheckReceiptTable from "../components/ClientCheckReceiptTable";
import CustomsDeclarationTable from "../components/CustomsDeclarationTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostInfo } from "app/slices/myuhlPostSlices/editPostSlice";
import { fetchCompanyInfo } from "app/slices/settingsSlices/companyInfoSlice/companyInfoSlice";
import { Link, useParams } from "react-router-dom";
import { get } from "lodash";
import ReactToPrint from "react-to-print/lib";
import { useRef } from "react";

const ClientCheckContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const clientCheckRef = useRef();
    const companyData = useSelector((store) =>
        get(store, "settings.companyInfoSlice.data.companyInfo.data", [])
    );

    const isCompanyDataFetched = useSelector((store) =>
        get(store, "settings.companyInfoSlice.data.loading", true)
    );

    useEffect(() => {
        dispatch(fetchCompanyInfo());
    }, []);

    useEffect(() => {
        dispatch(fetchPostInfo(id));
    }, [id]);
    const [width, setWidth] = useState()
    useEffect(() => {
        setWidth(window.innerWidth)
    }, [window.innerWidth])
    const data = useSelector((store) => store.myuhlPost.editMyuhlPost.postData);
    const isDataFetched = useSelector((store) =>
        get(store, "myuhlPost.editMyuhlPost.loading", true)
    );

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={12} className={"mb-8"}>
                        <BaseBreadcrumb
                            items={[
                                {
                                    id: 1,
                                    name: "Почта (MyUHL)",
                                    url: "/myuhl/parcels",
                                },
                                {
                                    id: 2,
                                    name: "Клиент чек",
                                    url: "/myuhl/parcels/clientcheck",
                                },
                            ]}
                        />
                    </Col>
                    {/* <Flex justify={'center'} style={{
                        width: '100%'
                    }}> */}
                    <Col xs={11.5} align='center' ref={clientCheckRef} >
                        {!isDataFetched && !isCompanyDataFetched ? (
                            <Content

                                style={{
                                    width: "1000px",
                                    border: "none",
                                    borderShadow: "none",
                                }}
                            >
                                <Row>
                                    <Col xs={12} className={"mb-16"}>
                                        <CustomsDeclarationTable
                                            data={data}
                                            companyData={companyData}
                                            isCompanyDataFetched={
                                                isCompanyDataFetched
                                            }
                                            isDataFetched={isDataFetched}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-8">
                                    <Col xs={12}>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                border: "1px dashed #333",
                                                width: "100%",
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        <ClientCheckReceiptTable
                                            data={data}
                                            companyData={companyData}
                                            isDataFetched={isDataFetched}
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <ClientCheckReceiptTable
                                            data={data}
                                            companyData={companyData}
                                            isDataFetched={isDataFetched}
                                        />
                                    </Col>
                                </Row>
                            </Content>
                        ) : (
                            <Flex style={{ marginTop: "15%" }} justify='center'>
                                <ContentLoader />
                            </Flex>
                        )}
                    </Col>
                    {!isDataFetched && !isCompanyDataFetched ? (
                        <Col xs={0.5} style={{
                            marginLeft: width > 1380 ? '-200px' : '-100px'
                        }}>
                            <ReactToPrint
                                trigger={() => {
                                    return <BaseButton style={{
                                        // marginTop:'10px',
                                        marginLeft: '20px'
                                    }} primary>Печать</BaseButton>;
                                }}
                                content={() => clientCheckRef.current}
                                pageStyle={"print"}
                                documentTitle={"Клиент чек"}
                            />
                        </Col>
                    ) : (
                        <></>
                    )}
                    {/* </Flex> */}
                </Row>
            </Container>
            <Row>

            </Row>
        </>
    );
};

export default ClientCheckContainer;