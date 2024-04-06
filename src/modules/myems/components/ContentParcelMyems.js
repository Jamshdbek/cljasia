import { BaseCheckbox, BaseInput, Flex, Text, Title } from "components";
import { get } from "lodash";
import CheckBox from "rc-checkbox";
import { useState } from "react";
import { Row, Col } from "react-grid-system";
import { checkToNumber } from "utils";
const ContentParcelMyems = ({
    data,
    changeContentParcel,
    dispatchProductType,
    disabled,
    setFieldValue,
    touched,
    errors,
}) => {
  

    return (
        <Row>
            <Col xs={12}>
                <Flex
                    justify={"space-between"}
                    align={"start"}
                >
                    <div style={{ flexBasis: "30%", position: "relative" }}>
                        <Title xs>Название продукта</Title>
                    </div>
                    <div style={{ flexBasis: "15%", position: "relative" }}>
                        <Title xs>К-во</Title>
                    </div>
                    <div style={{ flexBasis: "15%", position: "relative" }}>
                        <Title xs>грамм</Title>
                    </div>
                    <div style={{ flexBasis: "15%", position: "relative" }}>
                        <Title xs> Хс Код</Title>
                    </div>
                    <div style={{ flexBasis: "15%", position: "relative" }}>
                        <Title xs>Цена (USD)</Title>
                    </div>
                </Flex>
            </Col>
            {data.postProducts?.map((item, index) => (
                <Col xs={12} key={index + 1}>
                    <Flex
                        justify={"space-between"}
                        style={{ width: "100%" }}
                        className={"mt-8"}
                    >
                        <div style={{ flexBasis: "30%", position: "relative" }}>
                            <BaseInput
                                id={`productName${index}`}
                                placeholder="..."
                                value={get(item, "productName", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "productName",
                                        index,
                                    });
                                    setFieldValue("productName0", e);
                                }}
                                
                                disabled={disabled}
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
                                    {get(touched, "productName0", null) &&
                                        get(errors, "productName0", null)}
                                </Text>
                            )}
                        </div>
                        <div style={{ flexBasis: "15%", position: "relative" }}>
                            <BaseInput
                                id={`quantity${index}`}
                                placeholder="..."
                                value={get(item, "quantity", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "quantity",
                                        index: index,
                                    });
                                    
                                    setFieldValue("quantity0", e);
                                }}
                                onKeyDown={(event) => checkToNumber(event)}
                                disabled={disabled}
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
                                    {get(touched, "quantity0", null) &&
                                        get(errors, "quantity0", null)}
                                </Text>
                            )}
                        </div>
                        <div style={{ flexBasis: "15%", position: "relative" }}>
                            <BaseInput
                                id={`gramm${index}`}
                                onKeyDown={(event) => checkToNumber(event)}
                                placeholder="..."
                                value={get(item, "gramm", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "gramm",
                                        index: index,
                                    });
                                    setFieldValue("gramm0", e);
                                }}
                                disabled={disabled}
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
                                    {get(touched, "gramm0", null) &&
                                        get(errors, "gramm0", null)}
                                </Text>
                            )}
                        </div>
                        <div style={{ flexBasis: "15%", position: "relative" }}>
                            <BaseInput
                                id={`hsCode${index}`}
                                onKeyDown={(event) => checkToNumber(event)}
                                placeholder="000 000"
                                value={get(item, "hsCode", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "hsCode",
                                        index: index,
                                    });
                                }}
                                disabled={disabled}
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
                                </Text>
                            )}
                        </div>
                        <div style={{ flexBasis: "15%", position: "relative" }}>
                            <BaseInput
                                id={`productPrice${index}`}
                                placeholder="$000"
                                error={"feree"}
                                onKeyDown={(event) => checkToNumber(event)}
                                value={get(item, "price", "")}
                                handleInput={(e) => {
                                    if (e <= 9999) {
                                        changeContentParcel({
                                            value: e,
                                            name: "price",
                                            index: index,
                                        });
                                        setFieldValue("productPrice0", e);
                                    } else {
                                       
                                    }
                                }}
                                disabled={disabled}
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
                                    {get(touched, "productPrice0", null) &&
                                        get(errors, "productPrice0", null)}
                                </Text>
                            )}
                        </div>
                    </Flex>
                </Col>
            ))}
            {/* <Col xs={12} className={"mt-10"}>
                <Flex justify={"center"}
                    style={{ width: "100%", marginTop: '50px', gap: '80px', boxSize: 'border-box' }}
                >
                    <label style={{ display: 'flex', gap: '15px' }} >
                        <BaseCheckbox
                            value={'Sample'}
                            onChange={(e) => 
                                {
                                dispatchProductType(e.target.value)
                                }
                            }
                            
                            checked={get(data,'product_type','')=='Sample'}

                        />
                        <span>Sample</span>
                    </label>
                    <label style={{ display: 'flex', gap: '15px' }} >
                        <BaseCheckbox
                            value={'Gift'}
                            onChange={(e) =>
                                { 
                                dispatchProductType(e.target.value)
                            }
                            }
                            checked={get(data,'product_type','')=='Gift'}
                        />
                        <span>Gift</span>
                    </label>
                    <label style={{ display: 'flex', gap: '15px' }} >
                        <BaseCheckbox
                            value={'Merchandise'}
                            onChange={(e) =>{
                                 dispatchProductType(e.target.value)
                                }}
                            checked={get(data,'product_type','')=='Merchandise'}
                        />
                        <span>Merchandise</span>
                    </label>
                </Flex>
            </Col> */}
        </Row>
    );
};

export default ContentParcelMyems;
