import { BaseButton, BaseInput, Flex, Text, Title } from "components";
import { get } from "lodash";
import { memo, useCallback, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import { checkToNumber } from "utils";

const SvmCalculatorMyems = ({
    data,
    handleDispatchSVM,
    handleChangeLength,
    handleChangeWidth,
    handleChangeHeight,
    disabled,
    setFieldValue,
    setGetDeliveyCost,
    priceCalculator,
    getDeliveyCost,
    touched,
    errors,
}) => {
    const handleCountSVM = () => {
        const svm =
            (get(data, "width", null) *
                get(data, "height", null) *
                get(data, "length", null) /
                6).toFixed(0)
        handleDispatchSVM(svm);
        setGetDeliveyCost({ ...getDeliveyCost, volumeWeight: Number(svm) })
        priceCalculator(
            Number(svm)>getDeliveyCost.totWeight
                ? Number(svm):getDeliveyCost.totWeight)

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
                            id={"boxLength"}
                            placeholder="..."
                            value={get(data, "length", '')}
                            handleInput={(e) => {
                                handleChangeLength(e);
                                setFieldValue("boxLength", e);
                            }}
                            disabled={disabled}
                            onKeyDown={(event) => checkToNumber(event)}
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
                            {get(touched, "boxLength", null) &&
                                get(errors, "boxLength", null)}
                        </Text>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>Ширина (см)</Title>
                        <BaseInput
                            id={"boxWidth"}
                            placeholder="..."
                            value={get(data, "width", '')}
                            handleInput={(e) => {
                                handleChangeWidth(e);
                                setFieldValue("boxWidth", e);
                            }}
                            disabled={disabled}
                            onKeyDown={(event) => checkToNumber(event)}
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
                            {get(touched, "boxWidth", null) &&
                                get(errors, "boxWidth", null)}
                        </Text>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>Высота (см)</Title>
                        <BaseInput
                            id={"boxHeight"}
                            placeholder="..."
                            value={get(data, "height", '')}
                            handleInput={(e) => {
                                handleChangeHeight(e);
                                setFieldValue("boxHeight", e);
                            }}
                            disabled={disabled}
                            onKeyDown={(event) => checkToNumber(event)}
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
                            {get(touched, "boxHeight", null) &&
                                get(errors, "boxHeight", null)}
                        </Text>
                    </div>
                    <div style={{ flexBasis: "20%" }} className={"mt-12"}>
                        <BaseButton
                            width={"90px"}
                            bordered
                            disabled={disabled}
                            handleClick={() => {
                                handleCountSVM()
                            }}
                        >
                            Считать
                        </BaseButton>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>Вес (грамм)</Title>
                        <BaseInput
                            id={"volumeWeight"}
                            placeholder="..."
                            value={get(data, "cbm", "")}
                            disabled={disabled}
                            handleInput={(e) => {
                                setFieldValue("volumeWeight", e);
                            }}
                            onKeyDown={(event) => checkToNumber(event)}
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
                            {get(touched, "volumeWeight", null) &&
                                get(errors, "volumeWeight", null)}
                        </Text>
                    </div>
                </Flex>
            </Col>
        </Row>
    );
};

export default memo(SvmCalculatorMyems);
