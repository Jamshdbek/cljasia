import { BaseButton, BaseInput, Flex, Text, Title } from "components";
import { get } from "lodash";
import { memo } from "react";
import { Row, Col } from "react-grid-system";
import { checkToNumber } from "utils";

const SvmCalculatorMyuhl = ({
    data,
    handleDispatchSVM,
    handleChangeLength,
    handleChangeWidth,
    handleChangeHeight,
    disabled,
    setFieldValue,
    touched,
    errors,
}) => {
    const handleCountSVM = () => {
        const svm =
            (get(data, "length", 0) *
                get(data, "width", 0) *
                get(data, "height", 0)) /
            1000000;

        handleDispatchSVM(svm);
    };
    return (
        <Row>
            <Col xs={12} className={"mt-24"}>
                <Flex
                    justify={"space-between"}
                    style={{ width: "100%", gap: "15px" }}
                >
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>Глубина (см)</Title>
                        <BaseInput
                            id={"SVMlength"}
                            placeholder="..."
                            value={get(data, "length", 0)}
                            handleInput={(e) => {
                                handleChangeLength(e);
                                setFieldValue("SVMlength", e);
                            }}
                            disabled={disabled}
                            // onKeyDown={(event) => checkToNumber(event)}
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
                            {get(touched, "SVMlength", null) &&
                                get(errors, "SVMlength", null)}
                        </Text>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>Ширина (см)</Title>
                        <BaseInput
                            id={"SVMwidth"}
                            placeholder="..."
                            value={get(data, "width", 0)}
                            handleInput={(e) => {
                                handleChangeWidth(e);
                                setFieldValue("SVMwidth", e);
                            }}
                            disabled={disabled}
                            // onKeyDown={(event) => checkToNumber(event)}
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
                            {get(touched, "SVMlength", null) &&
                                get(errors, "SVMlength", null)}
                        </Text>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>Высота (см)</Title>
                        <BaseInput
                            id={"SVMheight"}
                            placeholder="..."
                            value={get(data, "height", '')}
                            handleInput={(e) => {
                                handleChangeHeight(e);
                                setFieldValue("SVMheight", e);
                            }}
                            disabled={disabled}
                            // onKeyDown={(event) => checkToNumber(event)}
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
                            {get(touched, "SVMlength", null) &&
                                get(errors, "SVMlength", null)}
                        </Text>
                    </div>
                    <div style={{ flexBasis: "20%" }} className={"mt-12"}>
                        <BaseButton
                            width={"90px"}
                            bordered
                            disabled={disabled}
                            handleClick={handleCountSVM}
                        >
                            Считать
                        </BaseButton>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>CBM</Title>
                        <BaseInput
                            id={"SVMValue"}
                            placeholder="..."
                            value={get(data, "cbm", "")}
                            disabled={disabled}
                            handleInput={(e) => {
                                setFieldValue("SVMValue", e);
                            }}
                            // onKeyDown={(event) => checkToNumber(event)}
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
                            {get(touched, "SVMValue", null) &&
                                get(errors, "SVMValue", null)}
                        </Text>
                    </div>
                </Flex>
            </Col>
        </Row>
    );
};

export default memo(SvmCalculatorMyuhl);
