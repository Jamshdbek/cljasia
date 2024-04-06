import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { MyemsApiService } from 'services/apiServices'
import { BaseBreadcrumb, BaseButton, Content, ContentLoader, Flex, Text } from 'components'
import { Col, Container, Row } from 'react-grid-system'
import CheckTableComponent from '../components/CheckTableComponent'
import ReactToPrint from 'react-to-print'
import CustomDeclarationTable from '../components/CustomDeclarationTable'
import { dateFormat } from "../../../utils/index";
import { get } from 'lodash'
import Barcode from 'react-barcode'




const CheckMyemsContainer = () => {
    const { id } = useParams()
    const clientCheckRef = useRef();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState();

    useEffect(() => {
        setLoading(true)
        MyemsApiService.GetSingleMyemsPost(id)
            .then((res) => {
                if (res && res.data && res.data.data) {
                    setLoading(false)
                    setData(res.data.data)
                }
            })
            .catch((error) => {
                console.log(error.data.message)
            })
    }, [])
    return <>
        <Container fluid>
            {loading ? <Flex
                style={{ marginTop: "15%" }}
                justify="center"
            >
                <ContentLoader />
            </Flex> :
                <> <Row>
                    <Col xs={12} className={"mb-4"} >
                        <BaseBreadcrumb
                            items={[
                                {
                                    id: 1,
                                    name: "Почта (MyEMS)",
                                    url: "/myems/parcels",
                                },
                                {
                                    id: 2,
                                    name: "Чек",
                                    url: "/myems/parcels/check",
                                },
                            ]}
                        />
                    </Col>

                    <Col xs={12} align="center" ref={clientCheckRef}>
                        <Content
                            ref={clientCheckRef}
                            style={{
                                width: "1000px",
                                border: "none",
                                borderShadow: "none",

                            }} >
                            <Row>
                                <Col xs={12} >
                                    <CheckTableComponent data={data} />
                                </Col>
                            </Row>
                            <Row className="mb-16">
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
                            <Row >
                                <Col xs={6}>
                                    <CustomDeclarationTable data={data} />
                                </Col>
                                <Col xs={6}>
                                    <CustomDeclarationTable data={data} />
                                </Col>
                            </Row>
                            <Row className='mt-16 p-8' style={{ color: 'black', fontWeight: 'bold', fontSize: '14px' }}>
                                <Col xs={4}>
                                    <Row style={{
                                        borderRight: "1px solid black",
                                        borderBottom: "1px solid black",
                                    }}>
                                        <Col xxs={6} style={{ borderRight: "1px solid black", }}>
                                            보내는 사람 <br />
                                            (FROM)
                                        </Col>
                                        <Col className='mt-8' xxs={6}>{get(data, 'sender', '')}</Col>
                                    </Row>
                                    <Row style={{
                                        borderRight: "1px solid black",
                                    }}>
                                        <Col xxs={6} style={{ borderRight: "1px solid black", }}>
                                            받는 사람 <br />
                                            (TO)
                                        </Col>
                                        <Col className='mt-8' xxs={6}>{get(data, 'receiveName', '')}</Col>
                                    </Row>
                                </Col>
                                <Col xs={4}>
                                    <Barcode
                                        height={50}
                                        width={1.5}
                                        value={get(data, 'code', '')} />
                                </Col>
                                <Col xs={4}>
                                    <Row style={{
                                        borderLeft: "1px solid black",
                                        borderBottom: '1px solid black'
                                    }}>
                                        <Col xs={6} style={{ borderRight: "1px solid black", }}>
                                            <Text bold>Country</Text> <br />
                                            {get(data, 'countryName', '')}
                                        </Col>
                                        <Col xs={6}>
                                            <Text bold>Weight</Text> <br />
                                            {get(data, 'totWeight', '') + " g"}
                                        </Col>
                                    </Row>
                                    <Row style={{
                                        borderLeft: "1px solid black",
                                    }}>
                                        <Col xs={6} style={{ borderRight: "1px solid black", }}>
                                            {dateFormat(get(data, 'createdAt', ''))}
                                        </Col>
                                        <Col xs={6}>
                                            <Text bold>Postage</Text> <br />
                                            {get(data, 'price', '') + " ₩"}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Content>
                    </Col>
                </Row>
                    <Row>
                        <Col xs={12} className='mt-16 mb-16' align="center" >
                            <ReactToPrint
                                trigger={() => {
                                    return <BaseButton primary>Печать</BaseButton>;
                                }}
                                content={() => clientCheckRef.current}
                                pageStyle={"print"}
                                height={'80vh'}
                                documentTitle={"Чек"}
                            />
                        </Col>
                    </Row></>}
        </Container>
    </>
}

export default CheckMyemsContainer