import React, { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-grid-system";
import { get, isEmpty } from "lodash";
import {
  BaseBreadcrumb,
  Content,
  BaseTable,
  Loader,
  BaseButton,
  BaseInput,
  Text,
  ContentLoader,
  Title,
  BaseTextarea,
  Flex,
  BaseCheckbox,
  NoData,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import manifestAllSlice, {
  fetchAllManifests,
  handleChooseManifest,
  handleDeleteManifest,
  handleReysNumber,
} from "app/slices/myuhlSlices/manifestAllSlice/manifestAllSlice";
import { dateFormat } from "utils";
import { ReactSVG } from "react-svg";
import deleteIcon from "../../../../src/assets/images/icons/deleteIcon.svg";
import { NumericFormat } from "react-number-format";
import MyuhlApiService from "services/apiServices/myuhl";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { fetchCourierCompanies } from "app/slices/myuhlSlices/manifestCourierCompaniesSlice/manifestCourierCompaniesSlice";
import { createSelector } from "@reduxjs/toolkit";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { PrintManifestsTable } from "./PrintManifestContainer";
import moment from "moment";
import ExcelExport from "../components/ExcelExport";

const MyUHLManifestContainer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const reysNumber = useSelector(
    (store) => store.myuhl.manifestAllSlice.reysNumber
  );

  const lastLocation = useSelector((store) =>
    get(store, "myuhl.manifestAllSlice.routes.current", "")
  );

  const manifestsAllData = useSelector((store) =>
    get(store, "myuhl.manifestAllSlice.data.manifestAll.data", [])
  );
  const postId = manifestsAllData.map((item) => item.postId);

  const isFetched = useSelector((store) =>
    get(store, "myuhl.manifestAllSlice.data.manifestAll.success", false)
  );
  const totalPrice = manifestsAllData
    .map((manifest) => ({
      ...manifest,
      postProducts: get(manifest, "postProducts", []).reduce(
        (accumulator, currentValue) => accumulator + +currentValue.price,
        0
      ),
    }))
    .reduce(
      (accumulator, currentValue) => accumulator + +currentValue.postProducts,
      0
    );

  const totalWeight = manifestsAllData.reduce(
    (accumulator, currentValue) => accumulator + +currentValue.weight,
    0
  );

  useEffect(() => {
    if (lastLocation != "/email/manifest/print") {
      dispatch(fetchAllManifests());
    }
    document.title = "Манифест";
  }, []);

  const deleteManifest = (id) => {
    try {
      setLoading(true);
      MyuhlApiService.DeleteManifestData(id).then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          toast.success("Success");
          dispatch(fetchAllManifests());
        } else if (res && res.data && !res.data.success) {
          setLoading(false);
          toast.success(res.data.message);
        }
      });
    } catch (e) {}
  };

  const [filter, setFilter] = useState({
    flight: "",
  });

  const [clear, setClear] = useState("");

  const applyManifest = () => {
    // try {
    setLoading(true);
    MyuhlApiService.PostManifestData({
      flight: reysNumber,
      postId,
    })
      .then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          toast.success("Success");
          dispatch(fetchAllManifests());
          dispatch(handleReysNumber(""));
        } else if (res && res.data && !res.data.success) {
          setLoading(false);
          toast.success(res.data.message);
          dispatch(fetchAllManifests());
          dispatch(handleReysNumber(""));
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
        toast.error(error);
        dispatch(fetchAllManifests());
        dispatch(handleReysNumber(""));
      });
    // } catch (e) {}
  };

  useEffect(() => {
    dispatch(fetchCourierCompanies());
  }, []);
  useEffect(() => {
    return () => {
      dispatch(handleReysNumber(""));
    };
  }, []);

  const isCourierCompaniesFetched = useSelector((store) =>
    get(store, "myuhl.manifestCourierCompaniesSlice.data.loading", true)
  );

  const ToCourierCompanies = useSelector((store) =>
    get(
      store,
      "myuhl.manifestCourierCompaniesSlice.data.courierCompanies.data",
      []
    ).find((item) => get(item, "id", null) === 2)
  );

  const FromCourierCompanies = useSelector((store) =>
    get(
      store,
      "myuhl.manifestCourierCompaniesSlice.data.courierCompanies.data",
      []
    ).find((item) => get(item, "id", null) === 1)
  );

  const [senderInfo, setSenderInfo] = useState({
    countryId: get(FromCourierCompanies, "countryId", ""),
    type: "FROM",
    name: get(FromCourierCompanies, "name", ""),
    address: get(FromCourierCompanies, "address", ""),
    phoneNumber: get(FromCourierCompanies, "phoneNumber", ""),
    postalCode: get(FromCourierCompanies, "postalCode", ""),
  });
  const isSenderInfoEnough =
    senderInfo.name.length !== 0 &&
    senderInfo.address.length !== 0 &&
    senderInfo.phoneNumber.length !== 0 &&
    senderInfo.postalCode.length !== 0;

  useEffect(() => {
    if (!isEmpty(FromCourierCompanies)) {
      setSenderInfo({
        countryId: get(FromCourierCompanies, "countryId", ""),
        type: "FROM",
        name: get(FromCourierCompanies, "name", ""),
        address: get(FromCourierCompanies, "address", ""),
        phoneNumber: get(FromCourierCompanies, "phoneNumber", ""),
        postalCode: get(FromCourierCompanies, "postalCode", ""),
      });
    }
  }, [FromCourierCompanies]);

  const onSubmitSender = () => {
    if (!isSenderInfoEnough) {
      toast.error("Please, fill out all fields");
    }

    try {
      setLoading(true);
      MyuhlApiService.PostManifestCompanyData(senderInfo).then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          toast.success("Success");
          dispatch(fetchCourierCompanies());
        } else if (res && res.data && !res.data.success) {
          setLoading(true);
          toast.success(res.data.message);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [recieverInfo, setRecieverInfo] = useState({
    countryId: get(ToCourierCompanies, "countryId", ""),
    type: "TO",
    name: get(ToCourierCompanies, "name", ""),
    address: get(ToCourierCompanies, "address", ""),
    phoneNumber: get(ToCourierCompanies, "phoneNumber", ""),
    postalCode: get(ToCourierCompanies, "postalCode", ""),
  });

  useEffect(() => {
    if (!isEmpty(ToCourierCompanies)) {
      setRecieverInfo({
        countryId: get(ToCourierCompanies, "countryId", ""),
        type: "TO",
        name: get(ToCourierCompanies, "name", ""),
        address: get(ToCourierCompanies, "address", ""),
        phoneNumber: get(ToCourierCompanies, "phoneNumber", ""),
        postalCode: get(ToCourierCompanies, "postalCode", ""),
      });
    }
  }, [ToCourierCompanies]);
  // postProducts

  const isReceiverInfoEnough =
    recieverInfo.name.length !== 0 &&
    recieverInfo.address.length !== 0 &&
    recieverInfo.phoneNumber.length !== 0 &&
    recieverInfo.postalCode.length !== 0;

  const onSubmitReceiver = () => {
    if (!isReceiverInfoEnough) {
      toast.error("Please, fill out all fields");
    } else {
      try {
        setLoading(true);
        MyuhlApiService.PostManifestCompanyData(recieverInfo).then((res) => {
          if (res && res.data && res.data.success) {
            setLoading(false);
            toast.success("Success");
            dispatch(fetchCourierCompanies());
          } else if (res && res.data && !res.data.success) {
            setLoading(true);
            toast.success(res.data.message);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const sumOfPrice = (arr) => {
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      total += parseInt(arr[i].price);
    }
    return total;
  };
  const isCheckedParcelsSchema = createSelector(
    (store) => get(store, "myuhl.manifestAllSlice.data.manifestAll.data", []),
    (myuhlAllPosts) => {
      const arr = myuhlAllPosts.filter((item) => item.checked);
      return !isEmpty(arr);
    }
  );
  const isUnCheckedParcelsSchema = createSelector(
    (store) => get(store, "myuhl.manifestAllSlice.data.manifestAll.data", []),
    (manifestsAllData) => {
      const arr = manifestsAllData.filter((item) => !item.checked);
      return !isEmpty(arr);
    }
  );
  const isCheckedParcels = useSelector(isCheckedParcelsSchema);
  const isUncheckedParcels = useSelector(isUnCheckedParcelsSchema);
  const [checkAllPosts, setCheckAllPosts] = useState(false);
  useEffect(() => {
    setCheckAllPosts(!isUncheckedParcels);
    if (isUncheckedParcels === false && manifestsAllData.length === 0) {
      setCheckAllPosts(false);
    }
  }, [isUncheckedParcels]);

  const excelDownload = manifestsAllData
    .filter((item) => item.checked)
    .map((el) => ({
      "Дата регистрации (год/месяц/день)": dateFormat(
        get(el, "date", "-"),
        true
      ),
      Создал: get(el, "creator", "-"),
      Код: get(el, "code", "-"),
      Получатель: get(el, "receiver", "-"),
      "Вес (грамм)": get(el, "weight", "-"),
      Цена: sumOfPrice(get(el, "postProducts", [])),
    }));

  if (excelDownload.length > 0) {
    excelDownload.push({
      Получатель: "Итого",
      "Вес (грамм)": totalWeight,
      Цена: totalPrice,
    });
  }

  const Manifests = manifestsAllData.filter(
    (item) => get(item, "checked", false) === true
  );

  let manfiestWTotal = useMemo(() => {
    const rslt = {};
    rslt["code"] = "Total";
    rslt["totalProductPrice"] = Manifests.map((manifest) => ({
      ...manifest,
      postProducts: get(manifest, "postProducts", []).reduce(
        (accumulator, currentValue) => accumulator + +currentValue.price,
        0
      ),
    })).reduce(
      (accumulator, currentValue) => accumulator + +currentValue.postProducts,
      0
    );

    rslt["weight"] = Manifests.reduce((total, item) => total + +item.weight, 0);

    const manifests = Manifests.map((item) => ({
      ...item,
      allProductName: get(item, "postProducts", []).reduce(
        (accumulator, currentValue, index) =>
          accumulator + `${currentValue.productName}, `,
        ""
      ),
    }));

    return [...manifests, rslt];
  }, [Manifests]);

  const excelData = {
    columns: [
      {
        header: "№",
        key: "order",
        width: 4,
      },
      {
        header: "Invoice numbers/Номера инфойсов",
        key: "invoiceNumber",
        width: 30,
      },
      {
        header: "Receiver's name/Ф.И.О получателя",
        key: "receiverName",
        width: 25,
      },
      {
        header: "PINFL / ПИНФЛ получателя",
        key: "pinfl",
        width: 20,
      },
      {
        header: "Passport number/Серия и № паспорта получателя",
        key: "passportNumber",
        width: 30,
      },
      {
        header: "Gross weight (kg)/ Вес брутто посылки (кг)",
        key: "grossWeight",
        width: 30,
      },
      {
        header: "Total price in $ / Итого цена $",
        key: "totalPrice",
        width: 20,
      },
      {
        header: "Items/ Наименования",
        key: "items",
        width: 30,
      },
      {
        header: "Address/Адресс",
        key: "address",
        width: 35,
      },
    ],
    rows: manfiestWTotal,
  };

  return (
    <Container fluid>
      {loading && <Loader />}
      <Row>
        <Col xs={12} className={"mb-8"}>
          <BaseBreadcrumb
            items={[
              {
                id: 1,
                name: "Манифест",
                url: "/email/manifest",
              },
            ]}
          />
        </Col>
      </Row>
      {!isCourierCompaniesFetched && isFetched ? (
        <Row>
          <Col xs={12}>
            <Content>
              <Row className="mb-32">
                <Col xs={11.5}>
                  <Row>
                    <Col xs={6}>
                      <Text medium xl>
                        Транспортные курьерские компании
                      </Text>
                    </Col>
                  </Row>
                  <Row justify="space-around" className="mt-24">
                    <Col xs={3}>
                      <Title xs>Имя</Title>
                      <BaseInput
                        className="mt-8"
                        value={get(senderInfo, "name", "")}
                        handleInput={(val) => {
                          setSenderInfo((senderInfo) => ({
                            ...senderInfo,
                            name: val,
                          }));
                        }}
                        width="100%"
                        placeholder={"Имя..."}
                        margin={"0 5px 0 0"}
                      />
                    </Col>
                    <Col xs={3}>
                      <Title xs>Адрес</Title>
                      <BaseTextarea
                        className="mt-8"
                        value={get(senderInfo, "address", "")}
                        name={"address"}
                        handleChange={(val) => {
                          setSenderInfo((senderInfo) => ({
                            ...senderInfo,
                            address: val.target.value,
                          }));
                        }}
                        placeholder={"Адрес ..."}
                      />
                    </Col>

                    <Col xs={2}>
                      <Title xs> Почтовый код </Title>
                      <BaseInput
                        className="mt-8"
                        value={get(senderInfo, "postalCode", "")}
                        handleInput={(val) => {
                          setSenderInfo((senderInfo) => ({
                            ...senderInfo,
                            postalCode: val,
                          }));
                        }}
                        width="100%"
                        placeholder={"Почтовый код..."}
                        margin={"0 5px 0 0"}
                      />
                    </Col>
                    <Col xs={2}>
                      <Title xs> Телефон </Title>
                      <BaseInput
                        className="mt-8"
                        value={get(senderInfo, "phoneNumber", "")}
                        handleInput={(val) => {
                          setSenderInfo((senderInfo) => ({
                            ...senderInfo,
                            phoneNumber: val,
                          }));
                        }}
                        width="100%"
                        placeholder={"Телефон..."}
                        margin={"0 5px 0 0"}
                      />
                    </Col>
                    <Col xs={1}>
                      <BaseButton
                        className="mt-24"
                        bordered
                        type="submit"
                        onClick={onSubmitSender}
                      >
                        Сохранить
                      </BaseButton>
                    </Col>
                  </Row>
                  <Row justify="space-around" className="mt-32">
                    <Col xs={3}>
                      <Title xs>Имя</Title>
                      <BaseInput
                        className="mt-8"
                        value={get(recieverInfo, "name", "")}
                        handleInput={(val) => {
                          setRecieverInfo((recieverInfo) => ({
                            ...recieverInfo,
                            name: val,
                          }));
                        }}
                        width="100%"
                        placeholder={"Имя..."}
                        margin={"0 5px 0 0"}
                      />
                    </Col>
                    <Col xs={3}>
                      <Title xs>Адрес</Title>
                      <BaseTextarea
                        className="mt-8"
                        value={get(recieverInfo, "address", "")}
                        name={"address"}
                        handleChange={(val) => {
                          setRecieverInfo((recieverInfo) => ({
                            ...recieverInfo,
                            address: val.target.value,
                          }));
                        }}
                        placeholder={"Адрес ..."}
                      />
                    </Col>

                    <Col xs={2}>
                      <Title xs> Почтовый код </Title>
                      <BaseInput
                        className="mt-8"
                        value={get(recieverInfo, "postalCode", "")}
                        handleInput={(val) => {
                          setRecieverInfo((recieverInfo) => ({
                            ...recieverInfo,
                            postalCode: val,
                          }));
                        }}
                        width="100%"
                        placeholder={"Почтовый код..."}
                        margin={"0 5px 0 0"}
                      />
                    </Col>
                    <Col xs={2}>
                      <Title xs> Телефон </Title>
                      <BaseInput
                        className="mt-8"
                        value={get(recieverInfo, "phoneNumber", "")}
                        handleInput={(val) => {
                          setRecieverInfo((recieverInfo) => ({
                            ...recieverInfo,
                            phoneNumber: val,
                          }));
                        }}
                        width="100%"
                        placeholder={"Телефон..."}
                        margin={"0 5px 0 0"}
                      />
                    </Col>
                    <Col xs={1}>
                      <BaseButton
                        className="mt-24"
                        bordered
                        type="submit"
                        onClick={onSubmitReceiver}
                      >
                        Сохранить
                      </BaseButton>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className={"mb-32"}>
                <Col xs={12}>
                  <BaseTable
                    tableHeader={[
                      {
                        name: (
                          <BaseCheckbox
                            checked={checkAllPosts}
                            handleChange={() => {
                              setCheckAllPosts(!checkAllPosts);

                              dispatch(
                                handleChooseManifest({
                                  check: checkAllPosts,
                                  all: "all",
                                })
                              );
                            }}
                          />
                        ),
                      },
                      "Дата регистрации (год/месяц/день)",
                      "Создал",
                      "Код",
                      "Получатель",
                      "Вес (грамм)",
                      "Цена",
                      "Удалить",
                    ]}
                  >
                    {!isEmpty(manifestsAllData) ? (
                      manifestsAllData.map((item, index) => (
                        <tr key={get(item, "postId", null)}>
                          <td>
                            <BaseCheckbox
                              checked={get(item, "checked", false)}
                              handleChange={() => {
                                // setChecked(!checked)
                                dispatch(
                                  handleChooseManifest(get(item, "postId", ""))
                                );
                              }}
                            />
                          </td>
                          <td>{dateFormat(get(item, "date", "-"))}</td>
                          <td>{get(item, "creator", "-")}</td>
                          <td>{get(item, "code", "-")}</td>
                          <td>{get(item, "receiver", "-")}</td>
                          <td>
                            <NumericFormat
                              displayType="text"
                              thousandSeparator={","}
                              value={get(item, "weight", "-")}
                              decimalScale={0}
                              fixedDecimalScale={true}
                            />
                          </td>
                          <td>
                            <NumericFormat
                              displayType="text"
                              value={get(item, "price", "")}
                              prefix={"¥ "}
                              thousandSeparator={true}
                              decimalScale={0}
                              fixedDecimalScale={true}
                            />
                          </td>
                          <td>
                            <ReactSVG
                              onClick={() =>
                                dispatch(
                                  handleDeleteManifest(
                                    get(item, "postId", null)
                                  )
                                )
                              }
                              src={deleteIcon}
                              className={"cursor-pointer"}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={16}>
                          <NoData />
                        </td>
                      </tr>
                    )}
                    {!isEmpty(manifestsAllData) ? (
                      <tr>
                        <td className="text-right" colSpan={4}>
                          {" "}
                          Итого:{" "}
                        </td>
                        <td colSpan={2}>
                          <NumericFormat
                            displayType="text"
                            thousandSeparator={true}
                            value={totalWeight}
                            decimalScale={0}
                            fixedDecimalScale={true}
                          />
                        </td>

                        <td colSpan={2}>
                          <NumericFormat
                            displayType="text"
                            value={totalPrice}
                            thousandSeparator={true}
                            decimalScale={0}
                            fixedDecimalScale={true}
                          />{" "}
                          USD
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </BaseTable>

                  {!isEmpty(manifestsAllData) ? (
                    <Row className="mt-32">
                      <Col xs={7} offset={{ xs: 5 }}>
                        <Flex style={{ gap: "8px" }}>
                          <ExcelExport
                            excelData={excelData}
                            toCompany={ToCourierCompanies}
                            fromCompany={FromCourierCompanies}
                            reysNumber={reysNumber}
                            isCheckedParcels={isCheckedParcels}
                            fileName={moment(new Date()).format(
                              "YYYY_MM_DD_HH_mm"
                            )}
                          >
                            Скачать в Excel
                          </ExcelExport>

                          <Link to={"/email/manifest/print"}>
                            <BaseButton
                              bordered
                              disabled={!isCheckedParcels}
                              style={
                                !isCheckedParcels
                                  ? {
                                      color: "#B3B3B3",
                                      border: "solid 2px #B3B3B3",
                                    }
                                  : {}
                              }
                            >
                              Распечатать
                            </BaseButton>
                          </Link>

                          <BaseInput
                            placeholder="Введите номер Рейса"
                            value={reysNumber}
                            handleInput={(val) => {
                              dispatch(handleReysNumber(val));
                            }}
                            width={"200px"}
                          />
                          <BaseButton bordered handleClick={applyManifest}>
                            Запись
                          </BaseButton>
                        </Flex>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </Content>
          </Col>
        </Row>
      ) : (
        <Flex style={{ marginTop: "15%" }} justify="center">
          <ContentLoader />
        </Flex>
      )}
    </Container>
  );
};

export default MyUHLManifestContainer;
