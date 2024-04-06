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

const FormSenderMyuhl = ({
    initialData,
    dispatchPhoneNumber,
    dispatchFullName,
    dispatchIndexCode,
    dispatchAddress,
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
                    value={get(initialData, "phoneNumber", null)}
                    handleInput={(item) => dispatchPhoneNumber(item)}
                    disabled={disabled}
                    format="+82##-####-####"
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
                        <QRCodeGenerator
                            value={`${get(initialData, "postCode", "")}`}
                        />
                    </div>
                    <div>
                        <Title xs>Индекс почты</Title>
                        <BaseInput
                            value={get(initialData, "index", "")}
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
                    value={get(initialData, "name", "")}
                    name={"fullName"}
                    handleInput={(e) => dispatchFullName(e)}
                    placeholder={"..."}
                    disabled={disabled}
                />

                <Title xs className={"mt-24"}>
                    Адрес
                </Title>
                <BaseTextarea
                    value={get(initialData, "address", "")}
                    name={"address"}
                    handleChange={(e) => dispatchAddress(e)}
                    placeholder={"..."}
                    disabled={disabled}
                />
            </Col>
        </Row>
    );
};

export default memo(FormSenderMyuhl);
