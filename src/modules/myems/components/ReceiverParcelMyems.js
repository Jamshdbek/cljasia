import { memo, useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import {
    BaseButton,
    // BaseButton,
    BaseInput,
    BaseMaskInput,
    // BasePhoneInput,
    BaseSelect,
    // BaseTextarea,
    Flex,
    PhoneDropDown,
    // PhoneDropDown,
    Text,
    Title,
    // FormSelector
} from "components";
import { checkToNumber } from "utils";
import { MyemsApiService } from "services/apiServices";
import { get, isEmpty, toNumber } from "lodash";

const ReceiverParcelMyems = ({
    onBlur,
    data,
    svmData,
    maxWeight,
    changePhoneNumber,
    setGetDeliveyCost,
    getDeliveyCost,
    setFieldValue,
    handleChangeRecieverPost,
    handleChangePrice,
    handleChangeName,
    changeReceiverAddress1,
    changeReceiverAddress2,
    handleChangecountryCd,
    handleChangetotWeight,
    disabled,
    postData,
    handleBlur,
    priceCalculator,
    touched,
    errors,
    costumeCodes,
    editable = false,
    setIsPhoneNumberSearch,
    zIndex
}) => {

    const [NationInfo, setNationInfo] = useState([])


    useEffect(() => {
        MyemsApiService.getNationList(get(data, 'postClassification', 1)).then((res) => {
            if (res && res.data && res.data.success) {
                setNationInfo(res.data.data);

            }
        }).catch((error) =>
            error
        )
    }, [])
    const optionsFunction = () => {
        if (get(data, 'postClassification', 1) == 2) {
            MyemsApiService.getNationList(get(data, 'postClassification', 1)).then((res) => {
                if (res && res.data && res.data.success) {
                    setNationInfo(res.data.data);
                }
            }).catch((error) =>
                error
            )
        } else {
            MyemsApiService.getNationList(get(data, 'postClassification', 1)).then((res) => {
                if (res && res.data && res.data.success) {
                    setNationInfo(res.data.data);

                }
            }).catch((error) =>
                error
            )
        }
    }

    const nationArr = NationInfo?.map((element) => {
        return {
            value: `${element.nationCode}`,
            label: `${element.nationFm}`
        }
    })
    const nationCd = NationInfo?.map(element => {
        return element.nationCode
    })

  console.log(data)
    return (
        <Row>
            <Col xs={6}>
                <Row style={{
                    marginTop: '20px'
                }}>
                    <Col xs={8} style={{ position: "relative" }}>
                        <Title xs>Номер телефона</Title>
                        {/* <BaseInput
                                                onKeyDown={(event) => checkToNumber(event)}
                                                id={"receiveTelNo"}
                                                disabled={disabled}
                                                onBlur={handleBlur}
                                                value={get(data, "phoneNumber", null)}
                                                handleInput={(e) => changePhoneNumber(e)}

                                            /> */}
                        <PhoneDropDown
                            id={"receiveTelNo"}
                            initialCountry={"uz"}
                            optionCountries={nationCd}
                            zIndex={zIndex}
                            value={get(data, "phoneNumber", null)}
                            handleChangePhone={(item) => {
                                changePhoneNumber(item);
                                setFieldValue("receiveTelNo", item);
                            }}
                            disabled={disabled}
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
                            {get(touched, "receiveTelNo", null) &&
                                get(errors, "receiveTelNo", null)}
                        </Text>

                    </Col>
                    <Col xs={4} className="mt-16" style={{ marginLeft: '-10px' }}>
                        <BaseButton
                            bordered
                            disabled={disabled}
                            handleClick={() => setIsPhoneNumberSearch(true)}
                        >
                            Выбрать
                        </BaseButton>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: '20px'
                }}>
                    <Col xs={12}>
                        <Flex style={{ gap: "15px" }}>
                            <div
                                style={{ width: "100%", position: "relative" }}
                            >
                                <Title xs>Страна</Title>
                                <BaseSelect
                                    id={"countryCd"}
                                    name={"countryCd"}
                                    isSearchable={true}
                                    options={nationArr}
                                    value={get(data, 'countryCd', '')}
                                    handleChange={(e) => {
                                        handleChangecountryCd(e)
                                        setGetDeliveyCost({ ...getDeliveyCost, countryCd: e.split(" ")[0] })
                                        setFieldValue("countryCd", e);
                                    }}
                                    onClick={() => {
                                        optionsFunction()
                                    }}

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
                                    {get(touched, "countryCd", null) &&
                                        get(errors, "countryCd", null)}
                                </Text>
                                {get(data, 'countryCd', false) &&
                                    (<Text
                                        xxs
                                        green
                                        style={{
                                            position: "absolute",
                                            bottom: -15,
                                            left: 0,

                                        }}
                                    >
                                        Код страны: {data.countryCd ? get(data, 'countryCd', '').split(" ")[0] : '-'}
                                    </Text>)}


                            </div>
                            <div
                                style={{ width: "100%", position: "relative" }}
                            >
                                <Title xs>Индекс почты</Title>
                                <BaseInput
                                    onKeyDown={(event) => checkToNumber(event)}
                                    id={"receiverPostalCode"}
                                    placeholder={"..."}
                                    handleInput={(e) => { handleChangeRecieverPost(e) }}
                                    disabled={disabled}
                                    onBlur={handleBlur}
                                    value={get(data,'index','')}
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
                                    {get(touched, "receiverPostalCode", null) &&
                                        get(errors, "receiverPostalCode", null)}
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
                                    onBlur={handleBlur}
                                    fixedDecimalScale={true}
                                    value={get(data, 'totWeight', '')}
                                    onChange={(e) => {
                                        handleChangetotWeight(e.target.value < maxWeight ? e.target.value : maxWeight)
                                        setGetDeliveyCost({ ...getDeliveyCost, totWeight: Number(e.target.value) })
                                    }
                                    }
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
                                    {get(touched, "receiverUnitValue", null) &&
                                        get(errors, "receiverUnitValue", null)}
                                </Text>
                            </div>
                            <div
                                style={{ width: "100%", position: "relative" }}
                            >
                                <Title xs>Цена</Title>
                                <BaseMaskInput
                                    id={"price"}
                                    placeholder={"..."}
                                    // disabled={disabled}
                                    value={postData}
                                    onClick={() => {
                                        getDeliveyCost.volumeWeight ? priceCalculator(
                                            getDeliveyCost.volumeWeight > getDeliveyCost.totWeight
                                                ? getDeliveyCost.volumeWeight :
                                                getDeliveyCost.totWeight) : priceCalculator(getDeliveyCost.totWeight)
                                    }
                                    }

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
                                    {get(touched, "price", null) &&
                                        get(errors, "price", null)}
                                </Text>
                            </div>
                        </Flex>
                    </Col>
                </Row>
            </Col>
            <Col xs={6}>
                <Row style={{
                    marginTop: '20px'
                }}>
                    <Col xs={12} style={{ position: "relative", }}>
                        <Title xs>ФИО</Title>
                        <BaseInput
                            id={"receiverName"}
                            placeholder={"..."}
                            value={get(data,'name','')}
                            handleInput={(e) => { handleChangeName(e) }}
                            disabled={disabled}
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
                            {get(touched, "receiverName", null) &&
                                get(errors, "receiverName", null)}
                        </Text>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: '16px'
                }}>
                    <Col xs={12}>
                        <div
                            style={{ width: "100%", position: "relative" }}
                        >
                            <Title xs>Адрес (район и город)</Title>
                            <BaseInput
                                id={"receiveAdd2"}
                                placeholder={"..."}
                                value={get(data,'address2','')}
                                handleInput={(e) => { changeReceiverAddress1(e) }}
                                disabled={disabled}
                                onBlur={handleBlur}
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
                                {get(touched, "receiveAdd2", null) &&
                                    get(errors, "receiveAdd2", null)}
                            </Text>
                        </div>
                        <div style={{
                            marginTop: '30px',
                            width: "100%",
                            position: "relative"
                        }}>

                            <Title xs>Адрес (улица)</Title>
                            <BaseInput
                                id={"receiveAdd3"}
                                placeholder={"..."}
                                value={get(data,'address3','')}
                                handleInput={(e) => { changeReceiverAddress2(e) }}
                                disabled={disabled}
                                onBlur={handleBlur}
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
                                {get(touched, "receiveAdd3", null) &&
                                    get(errors, "receiveAdd3", null)}
                            </Text>
                        </div>

                    </Col>
                </Row>


            </Col>
        </Row>
    );
};
export default memo(ReceiverParcelMyems);
