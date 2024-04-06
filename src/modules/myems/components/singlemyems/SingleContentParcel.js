import { BaseCheckbox, BaseInput, Flex, Text, Title } from "components";
import { get } from "lodash";
import CheckBox from "rc-checkbox";
import { useState } from "react";
import { Row, Col } from "react-grid-system";

const SingleContentParcel = ({
    data,
    changeContentParcel,
    disabled,
    setFieldValue,
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
                        <Title xs>HS Code</Title>
                    </div>
                    <div style={{ flexBasis: "15%", position: "relative" }}>
                        <Title xs>Цена (USD)</Title>
                    </div>
                </Flex>
            </Col>
            {get(data,'productDTOList',[]).map((item, index) => (
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
                                value={get(item, "contents", "")}
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
                                </Text>
                            )}
                        </div>
                        <div style={{ flexBasis: "15%", position: "relative" }}>
                            <BaseInput
                                id={`quantity${index}`}
                                placeholder="..."
                                value={get(item, "number", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "number",
                                        index: index,
                                    });
                                    setFieldValue("quantity0", e);
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
                                id={`gramm${index}`}
                                placeholder="..."
                                value={get(item, "weight", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "weight",
                                        index: index,
                                    });
                                    setFieldValue("weight0", e);
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
                                id={`hs_code${index}`}
                                placeholder="..."
                                value={get(item, "hs_code", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "hs_code",
                                        index: index,
                                    });
                                    setFieldValue("hs_code0", e);
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
                                placeholder="..."
                                error={"feree"}
                                value={get(item, "value", "")}
                                handleInput={(e) => {
                                    if (e <= 9999) {
                                        changeContentParcel({
                                            value: e,
                                            name: "price",
                                            index: index,
                                        });
                                        setFieldValue("productPrice0", e);
                                    } else {
                                        console.log("limit");
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
                                </Text>
                            )}
                        </div>
                    </Flex>
                </Col>
            ))}
            <Col xs={12} className={"mt-10"}>
                <Flex justify={"center"}
                    style={{ width: "100%", marginTop: '50px', gap: '80px', boxSize: 'border-box' }}
                >
                    <label style={{ display: 'flex', gap: '15px' }} >
                        <BaseCheckbox
                            value={'Sample'}
                            checked={get(data,'product_type',null)=='Sample'}
                            disabled={disabled}
                        />
                        <span>Sample</span>
                    </label>
                    <label style={{ display: 'flex', gap: '15px' }} >
                        <BaseCheckbox
                            value={'Gift'}
                           disabled={disabled}
                            checked={get(data,'product_type',null)=='Gift'}
                        />
                        <span>Gift</span>
                    </label>
                    <label style={{ display: 'flex', gap: '15px' }} >
                        <BaseCheckbox
                            value={'Merchandise'}
                            disabled={disabled}
                            checked={get(data,'product_type',null)=='Merchandise'}
                        />

                        
                        <span>Merchandise</span>
                    </label>
                </Flex>
            </Col>
        </Row>
    );
};

export default SingleContentParcel;
