import {
    BaseInput,
    BaseTextarea,
    Flex,
    QRCodeGenerator,
    Title,
    PhoneDropDown,
    BaseMaskInput,
    BasePhoneInput,

    Text,
} from "components";
import { checkToNumber } from "utils";
import { get } from "lodash";
import { memo, useState } from "react";
import { Col, Row } from "react-grid-system";

const FormSenderMyems = ({
    
    // data,
    setNewDetails,
    newDetails,
    errors,
    touched,
    dispatchPhoneNumber,
    dispatchFullName,
    dispatchIndexCode,
    dispatchAddress1,
    dispatchAddress2,
    setFieldValue,
    handleBlur,
    onBlur,
    disabled,
}) => {
    const [qrCode, setQrCode] = useState("1");

    const qrCodeGenerator = () => {
        const num = Math.floor(Math.random() * 1000000);
        setQrCode(JSON.stringify(num));
    };

    useState(() => {
        qrCodeGenerator();
    }, []);
   
    return (
        <Row>
            <Col xs={6}>
                <Title xs>Номер телефона</Title>
                <div className="requerd-wrap">

                    <BasePhoneInput
                        id={"receiverSenderPhoneNumber"}
                        value={get(newDetails, "phoneNumber", null)}
                        handleInput={(item) => setNewDetails(...newDetails,{phoneNumber:item})}
                        
                        disabled={disabled}
                        format="+82##-####-####"
                        name={"senderTelNo1"}
                        allowEmptyFormatting
                        mask="_"
                        onBlur={handleBlur}
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
                        {get(touched, "senderTelNo1", null) &&
                            get(errors, "senderTelNo1", null)}
                    </Text>
                </div>
                <Flex
                    align={"flex-start"}
                    justify={"space-between"}
                    className={"mt-24"}
                    style={{ gap: "15px" }}
                >
                    <div>
                        <QRCodeGenerator
                            value={`${get(newDetails, "postalCode", "")}`}
                        />
                    </div>
                    <div>
                        <Title xs>Индекс почты</Title>
                        <div className="requerd-wrap">
                            <BaseInput
                                id={'senderZipCode'}
                                value={get(newDetails, "postalCode", "")}
                                name={"index"}
                                handleInput={(e) =>setNewDetails({...newDetails,postalCode:e})}
                                placeholder={"..."}
                                disabled={disabled}
                                onKeyDown={(event) => checkToNumber(event)}
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
                                {get(touched, "senderZipCode", null) &&
                                    get(errors, "senderZipCode", null)}
                            </Text>
                        </div>
                    </div>
                </Flex>
            </Col>
            <Col xs={6}>
                <Title xs>ФИО</Title>
                <dev className="requerd-wrap">
                    <BaseInput
                        value={get(newDetails, "name", "")}
                        name={"sender"}
                        id={'sender'}
                        handleInput={(e) => 
                            setNewDetails({...newDetails,name:e})
                        }
                        placeholder={"..."}
                        disabled={disabled}
                    />
                    <Text xxs
                        danger
                        style={{
                            position: "absolute",
                            bottom: -15,
                            left: 15,
                        }}>
                        {get(touched, "sender", null) &&
                            get(errors, "sender", null)}
                    </Text>
                </dev>

                <Title xs className={"mt-24"}>
                    Адрес(улица)
                </Title>
                <div className="requerd-wrap">
                    <BaseInput
                        value={get(newDetails, "address1", "")}
                        name={"senderAdd1"}
                        handleInput={(e) => setNewDetails({newDetails,address1:e})}
                        placeholder={"35-1 Euljiro 6(yuk)-ga"}
                        disabled={disabled}
                        id={'senderAdd1'}
                    />
                    <Text xxs
                        danger
                        style={{
                            position: "absolute",
                            bottom: -15,
                            left: 15,
                        }}>
                        {get(touched, "senderAdd1", null) &&
                            get(errors, "senderAdd1", null)}
                    </Text>
                </div>

                <Title xs className={"mt-24"}>
                    Адрес(район и город)
                </Title>
                <div className="requerd-wrap">
                    <BaseInput
                        value={get(newDetails, "address2", "")}
                        name={"senderAdd2"}
                        handleInput={(e) => setNewDetails({...newDetails,address2:e})}
                        placeholder={"Jung-gu Seoul Korea"}
                        disabled={disabled}
                        id={"senderAdd2"}
                    />
                      <Text xxs
                        danger
                        style={{
                            position: "absolute",
                            bottom: -15,
                            left: 15,
                        }}>
                        {get(touched, "senderAdd2", null) &&
                            get(errors, "senderAdd2", null)}
                    </Text>
                </div>

            </Col>
        </Row>
    );
};

export default memo(FormSenderMyems);
