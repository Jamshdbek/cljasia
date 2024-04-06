import { BaseButton, Flex } from "components"
import { Col, Container, Row } from "react-grid-system"



const ProductCoutPost = ({
    createData,
    productCouter,
    setIsProductCout,
}) => {
    let count = 0;
    productCouter.forEach((val) => {
        count += Number(val.quantity);
    })
    return (
        <>
            <Container >
                <Row style={{ marginTop: '-15px', marginRight: '-25px' }}>
                    <Col xs={12}>
                        <Flex justify={'end'}>
                            <h6 style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => {
                                setIsProductCout(false)
                            }}>x</h6>
                        </Flex>
                    </Col>
                </Row>
            </Container>
            <Container >
                <Row>
                    <Col xs={12} className="mt-32">
                        <h3 style={{ textAlign: 'center' }}>
                        작성이 완료된 송장 1개를 접수하시겠습니까?
                        </h3>
                    </Col>
                    <Col xs={12} className="mt-32" align='center' >
                        <BaseButton
                            green
                            className={"mr-8"}
                            onClick={() => {
                                setIsProductCout(false)
                                createData()
                            }}
                        >
                            Добавить
                        </BaseButton>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductCoutPost