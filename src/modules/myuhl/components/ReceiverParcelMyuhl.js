import { createRef, memo, useEffect, useState } from "react";
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
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "app/slices/commonSlices/countriesSlice";
import { get, isEmpty, isEqual, isNull, upperCase } from "lodash";
import {
  countriesSchema,
  districtsSchema,
  regionSchema,
} from "app/createSelector";
import {
  fetchRegions,
  getDistrictCostumeCode,
  getDistricts,
} from "app/slices/commonSlices/regionsSlice";
import {
  changePostItem,
  handleSaveCostumesCode,
} from "app/slices/myuhlPostSlices/createPostSlice/createPostSlice";
import { checkToNumber } from "utils";
import { useRef } from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "40px",
    overflow: "auto",
    // ariaHidden:false,
  }),
};
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>ㅤ</components.DropdownIndicator>
  );
};
const ReceiverParcelMyuhl = ({
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
  limit,
  setIsPhoneNumberSearch,
  zIndex,
  editable = false,
}) => {
  const dispatch = useDispatch();
  const countries = useSelector(countriesSchema);
  const regions = useSelector(regionSchema);
  const isRegionsFetched = useSelector(
    (store) => store.common.regions.isFetched
  );
  const districts = useSelector(districtsSchema);
  const regionPostalCode = useSelector((store) =>
    get(store, "common.regions.regionPostalCode.postalCode", "")
  );

  const districtCustomsCode = useSelector((store) =>
    get(store, "common.regions.districtCostumeCode.customsCode", "")
  );

  const regionCustomsCode = useSelector((store) =>
    get(store, "common.regions.regionPostalCode.customsCode", "")
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    if (!isNull(get(data, "countryId", ""))) {
      dispatch(fetchRegions(get(data, "countryId", "")));
    }
  }, [data.countryId]);

  useEffect(() => {
    if (!isNull(get(data, "regionId", null)) && isRegionsFetched) {
      dispatch(getDistricts(get(data, "regionId", "")));
    }
  }, [isRegionsFetched, data.regionId]);

  useEffect(() => {
    if (!isNull(get(data, "districtId", null))) {
      dispatch(getDistrictCostumeCode(get(data, "districtId", "")));
    }
  }, [districts, data.districtId]);

  useEffect(() => {
    if (!isNull(get(data, "regionId", null))) {
      dispatch(
        changePostItem({
          value: regionPostalCode,
          name: "index",
          id: "to",
        })
      );
    }
  }, [regionPostalCode, data.regionId]);

  useEffect(() => {
    if (get(data, "regionId", "") || get(data, "districtId", "")) {
      dispatch(
        handleSaveCostumesCode(`(${regionCustomsCode}, ${districtCustomsCode})`)
      );
    }
  }, [regionCustomsCode, districtCustomsCode, data.districtId, data.regionId]);

  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  const input1Ref = useRef();
  const input2Ref = useRef();
  const select1Ref = useRef();
  const select2Ref = useRef();
  const select3Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const input5Ref = useRef();
  const input6Ref = useRef();
  const input7Ref = useRef();

  const clearAddress = get(data, "address", "").split("(")[0];

  const handleKeyDownTest = (event, nextRef) => {
    if (event.key == "Tab") {
      event.preventDefault();
      nextRef.current.focus();
    }
  };
  const [slaveValue, setSlaveValue] = useState();
  useEffect(() => {
    !disabled && changePhoneNumber(slaveValue);
  }, [slaveValue]);
  useEffect(() => {
    if (get(data, "phoneNumber", "")) {
      setSlaveValue(get(data, "phoneNumber", ""));
    } else {
      console.log("error");
    }
  }, [data]);

  const [inpValue, setInpVal] = useState("");
  const myfunction = (e) => {
    setInpVal(e);

    if (e[e.length - 1] == ",") {
      setSlaveValue([
        ...slaveValue,
        {
          label: e.substring(e.length - 1, 0),
          value: e.substring(e.length - 1, 0),
        },
      ]);
      setInpVal("");
    }
  };
  // commint
  return (
    <Row>
      <Col xs={12}>
        <Row>
          <Col xs={6} style={{ position: "relative" }}>
            <Title xs>Номер телефона</Title>
            <Flex style={{ gap: "6px" }}>
              <div style={{ width: "100%" }}>
                <Select
                  isDisabled={disabled}
                  onBlur={handleBlur}
                  ref={input1Ref}
                  onKeyDown={(e) => {
                    handleKeyDownTest(e, input2Ref);
                  }}
                  placeholder="Phone Number"
                  value={slaveValue}
                  isMulti
                  name="colors"
                  inputValue={inpValue}
                  styles={customStyles}
                  className="basic-multi-select slave"
                  classNamePrefix="slave-select"
                  components={{
                    Menu: () => null,
                    IndicatorsContainer: () => null,
                    DropdownIndicator,
                  }}
                  onChange={(selectedOptions) => {
                    setSlaveValue(selectedOptions);
                  }}
                  onInputChange={(e) => {
                    myfunction(e);
                  }}
                />
                <Text
                  xxs
                  green
                  style={{
                    position: "absolute",
                    bottom: -15,
                    left: 0,
                    padding: "0 16px",
                  }}
                >
                </Text>
              </div>
              <BaseButton
                style={{
                  marginTop: "-3px",
                }}
                width={"50px"}
                bordered
                disabled={disabled}
                handleClick={() => setIsPhoneNumberSearch(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </BaseButton>
            </Flex>
            <Text
              xxs
              danger
              style={{
                position: "absolute",
                bottom: -15,
                left: 15,
              }}
            >
              {get(touched, "receiverPhoneNumber", null) &&
                get(errors, "receiverPhoneNumber", null)}
            </Text>
          </Col>
          <Col xs={6} style={{ position: "relative" }}>
            <Title xs>ФИО получателя</Title>
            <BaseInput
              ref={input2Ref}
              id={"receiverName"}
              value={get(data, "name", "")}
              name={"name"}
              handleInput={(value) => {
                handleChangeName(value);
                setFieldValue("receiverName", value);
              }}
              disabled={disabled}
              placeholder={"..."}
              onBlur={handleBlur}
              onInput={toInputUppercase}
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
        <Row className={"mt-32"}>
          <Col xs={3} style={{ padding: "0 16px" }}>
            <Title xs>Паспорт/ID карта серия и №</Title>
          </Col>
          <Col xs={3} style={{ padding: "0 16px" }}>
            <Title xs>Страна</Title>
          </Col>
          <Col xs={3} style={{ padding: "0 16px" }}>
            <Title xs>Регион</Title>
          </Col>
          <Col xs={3} style={{ padding: "0 16px" }}>
            <Title xs>Район</Title>
          </Col>
        </Row>
        <Row>
          <Col xs={3} style={{ width: "100%", position: "relative" }}>
            <BaseInput
              ref={select1Ref}
              onKeyDown={(e) => {
                handleKeyDownTest(e, select2Ref);
              }}
              name={"receiverPassport"}
              placeholder="AA0000000"
              value={get(data, "passport", "")}
              handleInput={(e) => {
                if (e.length <= 2) {
                  let newValue = e.toUpperCase();
                  const raqamRegex = /[0-9]/;
                  if (!raqamRegex.test(newValue)) {
                    handleChangePassword(newValue);
                    setFieldValue("receiverPassport", newValue);
                  }
                } else {
                  const regexUpper = /[A-z]/;
                  const regexLower = /[a-z]/;
                  if (
                    (!regexUpper.test(e) || !regexLower.test(e)) &&
                    e.length <= 9
                  ) {
                    handleChangePassword(e);
                    setFieldValue("receiverPassport", e);
                  }
                }
              }}
              onBlur={handleBlur}
              disabled={disabled}
            />
            <Text
              xxs
              danger
              style={{
                position: "absolute",
                bottom: -15,
                left: 0,
                padding: "0 16px",
              }}
            >
              {get(touched, "receiverPassport", null) &&
                get(errors, "receiverPassport", null)}
            </Text>
            {limit > -1 && (
              <Text
                xxs
                green
                style={{
                  position: "absolute",
                  bottom: -15,
                  left: 0,
                  padding: "0 16px",
                }}
              >
                {limit != -1 ? "Остаток лимита: " + limit : ""}
              </Text>
            )}
            {limit < -1 && (
              <Text
                xxs
                danger
                style={{
                  position: "absolute",
                  bottom: -15,
                  left: 0,
                  padding: "0 16px",
                }}
              >
                {limit != -1 && "достиг предела"}
              </Text>
            )}
          </Col>
          <Col xs={3} style={{ width: "100%", position: "relative" }}>
            <BaseSelect
              id={"receiverCountry"}
              ref={select2Ref}
              onKeyDown={(e) => {
                handleKeyDownTest(e, select3Ref);
              }}
              options={countries}
              value={get(data, "countryId", null)}
              placeholder={"..."}
              name={"receiverCountry"}
              handleChange={(e) => {
                handleChangeCountry(e);
                setFieldValue("receiverCountry", e);
              }}
              width={"100%"}
              isDisabled={disabled}
              onBlur={handleBlur}
            />
            <Text
              xxs
              danger
              style={{
                position: "absolute",
                bottom: -15,
                left: 0,
                padding: "0 16px",
              }}
            >
              {get(touched, "receiverCountry", null) &&
                get(errors, "receiverCountry", null)}
            </Text>
          </Col>
          <Col xs={3} style={{ width: "100%", position: "relative" }}>
            <BaseSelect
              ref={select3Ref}
              id={"receiverRegion"}
              options={regions}
              width={"100%"}
              placeholder={"..."}
              value={get(data, "regionId", null)}
              handleChange={(e) => {
                handleChangeRegion(e);
                setFieldValue("receiverRegion", e);
              }}
              isDisabled={disabled}
              onBlur={handleBlur}
            />
            <Text
              xxs
              danger
              style={{
                position: "absolute",
                bottom: -15,
                left: 0,
                padding: "0 16px",
              }}
            >
              {get(touched, "receiverRegion", null) &&
                get(errors, "receiverRegion", null)}
            </Text>
          </Col>
          <Col xs={3} style={{ width: "100%", position: "relative" }}>
            <BaseSelect
              id={"receiverDistrict"}
              width={"100%"}
              placeholder={"..."}
              value={get(data, "districtId", null)}
              handleChange={(e) => {
                handleChangeDistrict(e);
                setFieldValue("receiverDistrict", e);
              }}
              options={districts}
              isDisabled={disabled}
              onBlur={handleBlur}
            />
            <Text
              xxs
              danger
              style={{
                position: "absolute",
                bottom: -15,
                left: 0,
                padding: "0 16px",
              }}
            >
              {get(touched, "receiverDistrict", null) &&
                get(errors, "receiverDistrict", null)}
            </Text>
          </Col>
        </Row>
        <Row className={"mt-32"}>
          <Col xs={6}>
            <Row>
              <Col xs={6} style={{ width: "100%", position: "relative" }}>
                <Title xs>PINFL</Title>
                <BaseInput
                  id={"receiverPINFL"}
                  placeholder="..."
                  value={get(data, "pinfl", "")}
                  name={"receiverPinfl"}
                  handleInput={(e) => {
                    handleChangePinfl(e);
                    setFieldValue("receiverPINFL", e);
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
                    left: 0,
                    padding: "0 16px",
                  }}
                >
                  {get(touched, "receiverPINFL", null) &&
                    get(errors, "receiverPINFL", null)}
                </Text>
              </Col>
              <Col xs={6} style={{ width: "100%", position: "relative" }}>
                <Title xs>Индекс почты</Title>
                <BaseInput
                  ref={input3Ref}
                  onKeyDown={(e) => {
                    handleKeyDownTest(e, input4Ref);
                  }}
                  id={"receiverPostalCode"}
                  placeholder="..."
                  value={get(data, "index", "")}
                  name={"receiverIndex"}
                  handleInput={(e) => {
                    handleChangeRecieverPost(e);
                    setFieldValue("receiverPostalCode", get(data, "index", ""));
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
                    left: 0,
                    padding: "0 16px",
                  }}
                >
                  {get(touched, "receiverPostalCode", null) &&
                    get(errors, "receiverPostalCode", null)}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={6} style={{ width: "100%", position: "relative" }}>
                <Title xs>Вес (грамм)</Title>
                <BaseInput
                  ref={input5Ref}
                  onKeyDown={(e) => {
                    handleKeyDownTest(e, input6Ref);
                  }}
                  id={"receiverUnitValue"}
                  thousandSeparator={true}
                  value={get(data, "unitValue", "")}
                  placeholder={"..."}
                  disabled={disabled}
                  onBlur={handleBlur}
                  // decimalScale={2}
                  fixedDecimalScale={true}
                  handleInput={(e) => {
                    const unit = e.replaceAll(",", "");
                    const unitAmt = +unit;
                    handleChangeWeight(unitAmt.toFixed(0));
                    setFieldValue("receiverUnitValue", e);
                  }}
                />

                <Text
                  xxs
                  danger
                  style={{
                    position: "absolute",
                    bottom: -15,
                    left: 0,
                    padding: "0 16px",
                  }}
                >
                  {get(touched, "receiverUnitValue", null) &&
                    get(errors, "receiverUnitValue", null)}
                </Text>
              </Col>
              <Col xs={6} style={{ width: "100%", position: "relative" }}>
                <Title xs>Цена</Title>
                <BaseInput
                  ref={input6Ref}
                  onKeyDown={(e) => {
                    handleKeyDownTest(e, input7Ref);
                  }}
                  id={"receiverUnitPrice"}
                  thousandSeparator={true}
                  value={get(data, "price", "")}
                  placeholder={"..."}
                  disabled={disabled}
                  onBlur={handleBlur}
                  decimalScale={0}
                  fixedDecimalScale={true}
                  handleInput={(e) => {
                    const unit = e.replaceAll(",", "");
                    const unitAmt = +unit;
                    handleChangePrice(unitAmt);
                    setFieldValue("receiverUnitPrice", e);
                  }}
                />

                <Text
                  xxs
                  danger
                  style={{
                    position: "absolute",
                    bottom: -15,
                    left: 0,
                    padding: "0 16px",
                  }}
                >
                  {get(touched, "receiverUnitPrice", null) &&
                    get(errors, "receiverUnitPrice", null)}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col xs={6} style={{ position: "relative" }}>
            <Title xs>Адрес</Title>
            <BaseTextarea
              ref={input4Ref}
              onKeyDown={(e) => {
                handleKeyDownTest(e, input5Ref);
              }}
              id={"receiverAddress"}
              height={"120px"}
              value={
                costumeCodes
                  ? `${costumeCodes}${clearAddress}`
                  : get(data, "address", "")
              }
              handleChange={(value) => {
                changeReceiverAddress(value.target.value.split(")")[1]);
                setFieldValue("receiverAddress", value.target.value);
              }}
              placeholder={"..."}
              onBlur={handleBlur}
              disabled={disabled}
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
              {get(touched, "receiverAddress", null) &&
                get(errors, "receiverAddress", null)}
            </Text>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={6} style={{ position: "relative" }}>
            <Title xs>ФИО</Title>
            <BaseInput
              ref={input7Ref}
              id={"receiverSenderName"}
              value={get(data, "senderName", "")}
              placeholder={"..."}
              handleInput={(value) => {
                handleChangeSenderName(value);
                setFieldValue("receiverSenderName", value);
              }}
              disabled={disabled}
              onBlur={handleBlur}
              onInput={toInputUppercase}
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
              {get(touched, "receiverSenderName", null) &&
                get(errors, "receiverSenderName", null)}
            </Text>
          </Col>
          <Col xs={6}>
            <Row>
              <Col xs={9.5} style={{ position: "relative" }}>
                <Title xs>Номер телефон отправителя</Title>

                <BasePhoneInput
                  id={"receiverSenderPhoneNumber"}
                  value={get(data, "senderPhoneNumber", null)}
                  handleInput={(item) => {
                    changeSenderPhoneNumber(item);
                    setFieldValue("receiverSenderPhoneNumber", item);
                  }}
                  disabled={disabled}
                  format="+81##-####-####"
                  allowEmptyFormatting
                  mask="_"
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
                  {get(touched, "receiverSenderPhoneNumber", null) &&
                    get(errors, "receiverSenderPhoneNumber", null)}
                </Text>
              </Col>
              <Col xs={2.5} className={"mt-16"} style={{ marginLeft: "-27px" }}>
                <BaseButton
                  width={"70px"}
                  bordered
                  handleClick={dispatchSearchUser}
                  disabled={disabled}
                >
                  Поиск
                </BaseButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default memo(ReceiverParcelMyuhl);
