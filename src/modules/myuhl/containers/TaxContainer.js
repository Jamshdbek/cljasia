import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import {
    BaseBreadcrumb,
    BaseButton,
    Content,
    ContentLoader,
    Flex,
} from "components";
import CustomsDeclarationTable from "../components/CustomsDeclarationTable";
import CustomsTaxDeclarationInvoiceTable from "../components/CustomsTaxDeclarationInvoiceTable";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCompanyInfo } from "app/slices/settingsSlices/companyInfoSlice/companyInfoSlice";
import { fetchPostInfo } from "app/slices/myuhlPostSlices/editPostSlice";
import { get } from "lodash";
import ReactToPrint from "react-to-print";

const TaxContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const companyData = useSelector((store) =>
        get(store, "settings.companyInfoSlice.data.companyInfo.data", [])
    );

    const isCompanyDataFetched = useSelector((store) =>
        get(store, "settings.companyInfoSlice.data.loading", true)
    );

    useEffect(() => {
        dispatch(fetchCompanyInfo());
    }, []);
    const [width,setWidth] = useState()
    useEffect(()=>{setWidth(window.innerWidth) },[window.innerWidth])
    useEffect(() => {
        dispatch(fetchPostInfo(id));
    }, [id]);

    const data = useSelector((store) => store.myuhlPost.editMyuhlPost.postData);

    const isDataFetched = useSelector((store) =>
        get(store, "myuhlPost.editMyuhlPost.loading", true)
    );

    const componentRef = useRef();

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
                                    name: "Налог",
                                    url: "/myuhl/parcels/tax",
                                },
                            ]}
                        />
                    </Col>
                    {/* <Flex justify={'center'} style={{
                            width:'100%',
                        }}> */}
                    <Col xs={11.5} align='center'  ref={componentRef}>
                       
                        {!isDataFetched && !isCompanyDataFetched ? (
                            <Content
                                style={{
                                    width: "1000px",
                                    border: "none",
                                    borderShadow: "none",
                                }}
                            >
                                <Row>
                                    <Col xs={12} className={"mb-8"}>
                                        <CustomsDeclarationTable
                                            data={data}
                                            companyData={companyData}
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
                                        <CustomsTaxDeclarationInvoiceTable
                                            data={data}
                                            companyData={companyData}
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <CustomsTaxDeclarationInvoiceTable
                                            data={data}
                                            companyData={companyData}
                                        />
                                    </Col>
                                </Row>
                            </Content>
                        ) : (
                            <Flex style={{ marginTop: "15%" }} justify="center">
                                <ContentLoader />
                            </Flex>
                        )}
                         </Col>
                         {!isDataFetched && !isCompanyDataFetched ? (
                    <Col xs={0.5}  style={{
                        marginLeft:width>1380?'-200px':'-100px'
                    }} >
                        <ReactToPrint 
                         
                            trigger={() => {
                                return <BaseButton style={{
                                    marginLeft:'20px'
                                 }} primary>Печать</BaseButton>;
                            }}
                            content={() => componentRef.current}
                            pageStyle={"print"}
                            documentTitle={"Налог"}
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

export default TaxContainer;