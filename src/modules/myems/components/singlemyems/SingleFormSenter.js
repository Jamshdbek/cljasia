import {
    BaseInput,
    BaseTextarea,
    Flex,
    QRCodeGenerator,
    Title,
    PhoneDropDown,
    BaseMaskInput,
    BasePhoneInput,
} from "components";
import { get } from "lodash";
import { memo, useState } from "react";
import { Col, Row } from "react-grid-system";

const SingleFormSenter = ({
    initialData,
    data,
    dispatchPhoneNumber,
    dispatchFullName,
    dispatchIndexCode,
    dispatchAddress1,
    dispatchAddress2,
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
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <Row>
            <Col xs={6}>
                <Title xs>Номер телефона</Title>
                {/* <PhoneDropDown
                    id={"phoneNumber"}
                    initialCountry={"kr"}
                    optionCountries={["uz", "kr", "us"]}
                    value={get(initialData, "phoneNumber", null)}
                    handleChangePhone={(item) => dispatchPhoneNumber(item)}
                    disabled={disabled}
                /> */}
               
                <BasePhoneInput
                    id={"phoneNumber"}
                    value={get(data, "senderTelNo1", null)}
                    disabled={disabled}
                    format="+82##-####-####"
                    name={"phoneNumber"}
                    allowEmptyFormatting
                    mask="_"
                />
                <Flex
                    align={"flex-start"}
                    justify={"space-between"}
                    className={"mt-24"}
                    style={{ gap: "15px" }}
                >
                    <div>
                        {/* {console.log(data)} */}
                        <QRCodeGenerator
                            value={`${get(data, "code", "")}`}
                        />
                    </div>
                    <div>
                        <Title xs>Индекс почты</Title>
                        <BaseInput
                            value={get(data, "senderZipCode", "")}
                            name={"index"}
                            handleInput={(e) => dispatchIndexCode(e)}
                            placeholder={"..."}
                            disabled={disabled}
                        />
                    </div>
                </Flex>
            </Col>
            <Col xs={6}>
                <Title xs>ФИО</Title>
                <BaseInput
                    value={get(data, "sender", "")}
                    name={"name"}
                    placeholder={"..."}
                    disabled={disabled}
                />

                <Title xs className={"mt-24"}>
                    Адрес(улица)
                </Title>
                <BaseInput
                    value={get(data, "senderAdd1", "") }
                    name={"address1"}
                    handleInput={(e) => dispatchAddress1(e)}
                    placeholder={"35-1 Euljiro 6(yuk)-ga"}
                    disabled={disabled}
                />
                  <Title xs className={"mt-24"}>
                    Адрес(район и город)
                </Title>
                <BaseInput
                    value={get(data, "senderAdd2", "")}
                    name={"address2"}
                    placeholder={"Jung-gu Seoul Korea"}
                    disabled={disabled}
                />
            </Col>
        </Row>
    );
};

export default memo(SingleFormSenter);
