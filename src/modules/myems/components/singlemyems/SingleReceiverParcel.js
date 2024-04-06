import { memo, useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import {
    BaseButton,
    BaseInput,
    BaseMaskInput,
    BasePhoneInput,
    BaseSelect,
    BaseTextarea,
    Flex,
    PhoneDropDown,
    Text,
    Title,
    FormSelector
} from "components";
import { MyemsApiService } from "services/apiServices";
import { get, isEmpty, toNumber } from "lodash";

const SingleReceiverParcel = ({
    data,
    dispatchSearchUser,
    changeSenderPhoneNumber,
    changePhoneNumber,
    handleChangePassword,
    handleChangeCountry,
    handleChangePinfl,
    handleChangeRecieverPost,
    
    handleChangePrice,
    handleChangeSenderName,
    handleChangeName,
    changeReceiverAddress,
    handleChangeWeight,
    handleChangeDistrict,
    handleChangeRegion,
    disabled,
    setFieldValue,
    handleBlur,
    handleChange,
    touched,
    errors,
    costumeCodes,
    editable = false,
  
}) => {


    
    return (
        <Row>
            <Col xs={6}>
                <Row>
                    <Col xs={12} style={{ position: "relative" }}>
                        <Title xs>Номер телефона</Title>
                        <BaseInput
                            id={"receiverPhoneNumber"}
                            disabled={disabled}
                            onBlur={handleBlur}
                            value={'+'+get(data, "receiveTelNo", null)}

                        />

                        <Text
                            xxs
                            danger
                            style={{
                                position: "absolute",
                                bottom: -15,
                                left: 15,
                            }}
                        >

                        </Text>
                    </Col>
                </Row>
                <Row className={"mt-32"}>
                    <Col xs={12}>
                        <Flex style={{ gap: "2px" }}>
                            <div
                                style={{ width: "100%", position: "relative" }}
                            >
                                <Title xs>Страна</Title>
                                <BaseInput
                                    disabled={disabled}
                                    value={get(data,'countryCd','')}
                                  
                                />
                            </div>
                            <div
                                style={{ width: "100%", position: "relative" }}
                            >
                                <Title xs>Индекс почты</Title>
                                <BaseInput
                                    id={"receiverName"}
                                    placeholder={"..."}
                                    // handleInput={(e) => { handleChangeRecieverPost(e) }}
                                    disabled={disabled}
                                    onBlur={handleBlur}
                                    value={get(data,'receiveZipCode',null)}
                                />
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
                            </div>
                        </Flex>
                    </Col>
                </Row>

                <Row className={"mt-32"}>
                    <Col xs={12}>
                        <Flex style={{ gap: "15px" }}>
                            <div
                                style={{ width: "100%", position: "relative" }}
                            >
                                <Title xs>Вес (грамм)</Title>

                                <BaseMaskInput
                                    id={"receiverUnitValue"}
                                    // thousandSeparator={true}
                                    placeholder={"..."}
                                    disabled={disabled}
                                    value={get(data,'totWeight','')}
                                    
                                    
                                />

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
                            </div>
                            <div
                                style={{ width: "100%", position: "relative" }}
                            >
                                <Title xs>Цена</Title>
                                <BaseMaskInput
                                    id={"receiverUnitPrice"}
                                    disabled={disabled}
                                    value={get(data,'price','')}
                                   

                                />
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
                            </div>
                        </Flex>
                    </Col>
                </Row>
            </Col>
            <Col xs={6}>
                <Row>
                    <Col xs={12} style={{ position: "relative", }}>
                        <Title xs>ФИО</Title>
                        <BaseInput
                            id={"receiverName"}
                            placeholder={"..."}
                            handleInput={(e) => { handleChangeName(e) }}
                            disabled={disabled}
                            onBlur={handleBlur}
                            value={get(data,'receiveName','')}
                        />
                        <Text
                            xxs
                            danger
                            style={{
                                position: "absolute",
                                bottom: -15,
                                left: 15,
                            }}
                        >

                        </Text>
                    </Col>
                </Row>
                <Row className={"mt-32"}>
                    <Col xs={12}>
                        <div
                            style={{ width: "100%", position: "relative" }}
                        >
                            <Title xs>Адрес (район и город)</Title>
                            <BaseInput
                                id={"receiverName"}
                                placeholder={"..."}
                                disabled={disabled}
                                onBlur={handleBlur}
                                value={get(data,'receiveAdd2','')}
                            />
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
                        </div>
                        <div
                            className={"mt-32"}
                            style={{ width: "100%", position: "relative" }}
                        >
                            <Title xs>Адрес (улица)</Title>
                            <BaseInput
                                id={"receiverName"}
                                placeholder={"..."}
                                disabled={disabled}
                                onBlur={handleBlur}
                                value={get(data,'receiveAdd3','')}
                            />
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
                        </div>

                    </Col>
                </Row>


            </Col>
        </Row>
    );
};
export default memo(SingleReceiverParcel);
