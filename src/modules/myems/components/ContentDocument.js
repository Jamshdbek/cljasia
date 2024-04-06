import { BaseCheckbox, BaseInput, Flex, Text, Title } from "components";
import { get } from "lodash";
import { useState } from "react";

import { Row, Col } from "react-grid-system";
import { checkToNumber } from "utils";


const ContentDocument = ({
    data,
    changeContentDocument,
    touched,
    errors,
    setFieldValue
}) => {

    const [checkbox] = useState(true)
    console.log(data)
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
                    {get(data, 'postProductsDoc', []).map((item, index) => {
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
                                    handleInput={(e) => {
                                        changeContentDocument({
                                            value: e,
                                            name: "contents",
                                            index,
                                        });
                                    }
                                    }

                                />
                                <BaseInput
                                    style={{ flexBasis: "20%", position: "relative" }}
                                    placeholder='...'
                                    value={get(item, 'number', '')}
                                    handleInput={(e) => {
                                        changeContentDocument({
                                            value: e,
                                            name: "number",
                                            index,
                                        });
                                    }
                                    }
                                />
                                <div className="requerd-wrap">
                                <BaseInput
                                    style={{ flexBasis: "20%", position: "relative" }}
                                    id={'docValue'}
                                    name={'docValue'}
                                    placeholder='...'
                                    onKeyDown={(event) => checkToNumber(event)}
                                    value={get(item, 'value', '')}
                                    handleInput={(e) => {
                                        changeContentDocument({
                                            value: e,
                                            name: "value",
                                            index,
                                        });
                                        setFieldValue('docValue',e)
                                    }
                                    
                                    }
                                    se
                                />
                                    {index == 0 && (
                                <Text
                                    xxs
                                    danger
                                    style={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: 0,
                                    }}
                                >
                                    {get(touched, "docValue", null) &&
                                        get(errors, "docValue", null)}
                                </Text>)}
                                </div>
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
                            // onChange={(e) => {
                            //     setCheckbox('Merchandise')
                            //     dispatchProductType(e.target.value)
                            // }}
                            checked={checkbox}
                        />
                        <span>Document</span>
                    </label>
                </Col>
            </Row>
        </>
    )
}


export default ContentDocument