import { BaseCheckbox, BaseInput, Flex,  Title } from "components";
import { get } from "lodash";
import { Row, Col } from "react-grid-system";


const SingleContentDocument = ({
    data,
    disabled
}) => {

  
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Flex
                        justify={"space-between"}
                        align={"start"}
                        style={{ gap: '30px' }}
                    >
                        <div style={{ flexBasis: "50%", position: "relative" }}>
                            <Title xs>Название продукта</Title>
                        </div>
                        <div style={{ flexBasis: "20%", position: "relative" }}>
                            <Title xs>К-во</Title>
                        </div>
                        <div style={{ flexBasis: "20%", position: "relative" }}>
                            <Title xs>Цена (USD)</Title>
                        </div>
                    </Flex>
                </Col>
                <Col xs={12}>
                    {get(data, 'productDTOList', []).map((item, index) => {
                        return (
                            <Flex
                                key={index}
                                justify={"space-between"}
                                align={"start"}
                                style={{
                                    gap: '30px',
                                    paddingTop: '10px'
                                }}

                            >
                                <BaseInput
                                    style={{ flexBasis: "50%", position: "relative" }}
                                    placeholder='...'
                                    value={get(item, 'contents', '')}
                                   disabled={disabled}

                                />
                                <BaseInput
                                    style={{ flexBasis: "20%", position: "relative" }}
                                    placeholder='...'
                                    value={get(item, 'number', '')}
                                    disabled={disabled}
                                    
                                />
                                <BaseInput
                                    style={{ flexBasis: "20%", position: "relative" }}
                                    placeholder='...'
                                    value={get(item, 'value', '')}
                                    disabled={disabled}
                                    
                                />
                            </Flex>)
                    })}
                </Col>
                <Col xs={12} style={{
                    justifyContent: 'center',
                    display: 'flex',
                    paddingTop: '15px'
                }}>
                    <label style={{ display: 'flex', gap: '15px' }} >
                        <BaseCheckbox
                            value={'Document'}
                            checked={true}
                            disabled={disabled}
                            
                        />
                        <span>Document</span>
                    </label>
                </Col>
            </Row>
        </>
    )
}


export default SingleContentDocument