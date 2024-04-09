import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";

import {
  BaseBreadcrumb,
  Content,
  BaseButton,
  Flex,
  BaseTable,
  ContentLoad1er,
  BaseSelect,
  Loader,
  FormWrapper,
  FormSelector,
  FormInput,
  Text,
  ContentLoader,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeFilter } from "app/slices/dealerSlices/dealerAccountingSlice/dealerAccountingSlice";
import { fetchDealersAccounting } from "app/slices/dealerSlices/dealerAccountingSlice/dealerAccountingSlice";
import { get, isEqual } from "lodash";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { isEmpty } from "lodash";
import { DealerApiService, MyuhlPostApiService } from "services/apiServices";
import { addDealerAccountingNoteSchema } from "utils/schema/dealerSchemas/dealerSchemas";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { fetchAllDealersPrices } from "app/slices/dealerSlices/dealersPriceSlice/dealersPriceSlice";
import _ from "lodash";
import { HasAccess } from "services/auth";
import { fetchUserMe } from "app/slices/commonSlices/userMeSlice";
import BaseTooltip from "components/base-tooltip";
import { fetchPostInfo } from "app/slices/myuhlPostSlices/editPostSlice";

const PaymentContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.auth.user);
  const isAdmin = get(userData, "token.data.isAdmin", false);
  const [collapsedRowId, setCollapsedRowId] = useState(null);
  const [loading, setLoading] = useState(false);

  const dealersPrices = useSelector((store) =>
    get(store, "dealer.dealersPrices.data.dealersPrices.data", [])
  );
  const dealerOptions = _.map(dealersPrices, function map(item) {
    return {
      label: `${get(item, "lastName", "-")} ${get(item, "name", "-")}  `,
      value: get(item, "id", null),
    };
  });

  const monthOptions = [
    { label: "Январь", value: "1" },
    { label: "Февраль", value: "2" },
    { label: "Март", value: "03" },
    { label: "Апрель", value: "04" },
    { label: "Май", value: "05" },
    { label: "Июнь", value: "06" },
    { label: "Июль", value: "07" },
    { label: "Август", value: "08" },
    { label: "Сентябрь", value: "09" },
    { label: "Октябрь", value: "10" },
    { label: "Ноябрь", value: "11" },
    { label: "Декабрь", value: "12" },
  ];

  useEffect(() => {
    dispatch(fetchUserMe());
  }, []);
  const userMe = useSelector((store) =>
    get(store, "common.userMe.data.userMe.data", [])
  );

  const initialDealerId = isAdmin ? 0 : get(userMe, "id");

  // If user is the SUPER ADMIN, then it shows Dealer Select option, otherwasy, it hides Dealer Select options and gives current Dealer Admin's DealerId to get info from API
  const [filter, setFilter] = useState({
    dealerId: initialDealerId,
    year: "",
    month: "",
    date: "",
  });
  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push({
        label: Number(
          new Date(date)
            .toString()
            .split("(Узбекистан, стандартное время)")[0]
            .split(" ")[2]
        ),
        value: Number(
          new Date(date)
            .toString()
            .split("(Узбекистан, стандартное время)")[0]
            .split(" ")[2]
        ),
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  useEffect(() => {
    setFilter({
      ...filter,
      dealerId: initialDealerId,
    });
  }, [initialDealerId]);

  useEffect(() => {
    dispatch(fetchAllDealersPrices());
  }, []);

  const searchDealersAccountingInfo = () => {
    dispatch(fetchDealersAccounting(filter));
  };

  const dealersAccounting = useSelector((store) =>
    get(store, "dealer.dealersAccounting.data.dealersAccounting.data", [])
  );

  const isLoading = useSelector((store) =>
    get(store, "dealer.dealersAccounting.data.loading", true)
  );

  let depositAmountElements = [];
  for (let i = 0; i < dealersAccounting.length; i++) {
    if (dealersAccounting[i].type === "DEPOSIT") {
      depositAmountElements.push(dealersAccounting[i]);
    } else if (dealersAccounting[i].type === "RETURN") {
      depositAmountElements.push(dealersAccounting[i]);
    }
  }

  let sumOfReturnAndDeposit = 0;
  for (let index = 0; index < depositAmountElements.length; index++) {
    sumOfReturnAndDeposit += depositAmountElements[index]?.amount;
  }

  let paymentAmountElements = [];
  for (let i = 0; i < dealersAccounting.length; i++) {
    if (dealersAccounting[i].type === "DELIVERY") {
      paymentAmountElements.push(dealersAccounting[i]);
    } else if (dealersAccounting[i].type === "ADDITIONAL") {
      paymentAmountElements.push(dealersAccounting[i]);
    }
  }

  let sumOfDeliveryAndAdditional = 0;
  for (let index = 0; index < paymentAmountElements.length; index++) {
    sumOfDeliveryAndAdditional += paymentAmountElements[index]?.amount;
  }

  const onSubmit = (values) => {
    try {
      setLoading(true);
      DealerApiService.PostDealerAccountingNote(values).then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          toast.success("Success");
          resetForm({
            dealerId: "",
            type: "",
            amount: "",
            note: "",
          });
        } else if (res && res.data && !res.data.success) {
          setLoading(true);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      dealerId: "",
      type: "",
      amount: "",
      note: "",
    },
    onSubmit,
    validationSchema: addDealerAccountingNoteSchema,
  });

  return (
    <Container fluid>
      <Row>
        <Col xs={12} className={"mb-8"}>
          <BaseBreadcrumb
            items={[
              { id: 1, name: "Дилер", url: "/dealer" },
              {
                id: 2,
                name: "Расчет",
                url: "/dealer/payment",
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <Container>
            <HasAccess>
              {({ isAdmin }) =>
                isAdmin && (
                  <Row className="mb-64">
                    <Content rounded height={"120px"}>
                      <Row>
                        <Col xs={12}>
                          <FormWrapper onSubmit={handleSubmit}>
                            <Flex justify="center">
                              <Col xs={2.5}>
                                <FormSelector
                                  name={"dealerId"}
                                  value={get(values, "dealerId", "")}
                                  placeholder={`Выбрать дилера`}
                                  error={touched.dealerId && errors.dealerId}
                                  options={dealerOptions}
                                  handleChange={(e) => {
                                    setFieldValue("dealerId", e);
                                  }}
                                  left={0}
                                  right={12}
                                />
                              </Col>
                              <Col xs={2.5}>
                                <FormSelector
                                  name={"type"}
                                  value={get(values, "type", "")}
                                  placeholder={`Выбрать цель`}
                                  error={touched.type && errors.type}
                                  options={[
                                    {
                                      value: "DEPOSIT",
                                      label: "Оплата (-)",
                                    },
                                    {
                                      value: "RETURN",
                                      label: "Возврат (-)",
                                    },
                                    {
                                      value: "DELIVERY",
                                      label: "Доставка (+)",
                                    },
                                    {
                                      value: "ADDITIONAL",
                                      label: "Дополнительный (+)",
                                    },
                                  ]}
                                  handleChange={(e) => setFieldValue("type", e)}
                                  left={0}
                                  right={12}
                                />
                              </Col>
                              <Col xs={2}>
                                <FormInput
                                  placeholder={"Сумма (won)..."}
                                  name={"amount"}
                                  type={"number"}
                                  value={get(values, "amount", "")}
                                  handleOnChange={handleChange}
                                  handleOnBlur={handleBlur}
                                  error={touched.amount && errors.amount}
                                  left={0}
                                  right={12}
                                />
                              </Col>
                              <Col xs={3}>
                                <FormInput
                                  placeholder={"Записка..."}
                                  name={"note"}
                                  type={"text"}
                                  value={get(values, "note", "")}
                                  handleOnChange={handleChange}
                                  handleOnBlur={handleBlur}
                                  left={0}
                                  right={12}
                                />
                              </Col>
                              <Col xs={1.5}>
                                <BaseButton primary type="submit">
                                  Сохранить
                                </BaseButton>
                              </Col>
                            </Flex>
                          </FormWrapper>
                        </Col>
                      </Row>
                    </Content>
                  </Row>
                )
              }
            </HasAccess>
            <Row justify="center" className="mb-16">
              <Content rounded height={"90px"}>
                <Row justify="center">
                  {isAdmin ? (
                    <Col xs={2.5}>
                      <BaseSelect
                        value={get(userMe, "id", null)}
                        handleChange={(values) => {
                          setFilter((filter) => ({
                            ...filter,
                            dealerId: values,
                          }));
                          dispatch(
                            handleChangeFilter({
                              name: "dealerId",
                              value: values,
                            })
                          );
                        }}
                        options={dealerOptions}
                        margin={"0 0 0 15px"}
                        style={{ minWidth: "80px" }}
                        placeholder={`Выбрать дилера`}
                      />
                    </Col>
                  ) : (
                    <></>
                  )}

                  <Col xs={2}>
                    <BaseSelect
                      handleChange={(values) => {
                        setFilter((filter) => ({
                          ...filter,
                          year: values,
                        }));
                        dispatch(
                          handleChangeFilter({
                            name: "year",
                            value: values,
                          })
                        );
                      }}
                      options={[
                        { value: "2022", label: 2022 },
                        { value: "2023", label: 2023 },
                        { value: "2024", label: 2024 },
                        { value: "2025", label: 2025 },
                      ]}
                      margin={"0 0 0 15px"}
                      style={{ minWidth: "80px" }}
                      placeholder={`Выбрать год`}
                    />
                  </Col>
                  <Col xs={2.5}>
                    <BaseSelect
                      handleChange={(values) => {
                        setFilter((filter) => ({
                          ...filter,
                          month: values,
                        }));
                        dispatch(
                          handleChangeFilter({
                            name: "month",
                            value: values,
                          })
                        );
                      }}
                      options={monthOptions}
                      margin={"0 0 0 15px"}
                      style={{ minWidth: "80px" }}
                      placeholder={`Выбрать месяц`}
                    />
                  </Col>
                  <Col xs={2}>
                    <BaseSelect
                      handleChange={(values) => {
                        setFilter((filter) => ({
                          ...filter,
                          date: values,
                        }));
                        dispatch(
                          handleChangeFilter({
                            name: "date",
                            value: values,
                          })
                        );
                      }}
                      options={getDaysInMonth(
                        Number(get(filter, "month", "") - 1),
                        Number(get(filter, "year", ""))
                      )}
                      margin={"0 0 0 15px"}
                      style={{ minWidth: "80px" }}
                      placeholder={`Выбрать дату`}
                    />
                  </Col>
                  <Col xs={2}>
                    <BaseButton primary onClick={searchDealersAccountingInfo}>
                      Показать
                    </BaseButton>
                  </Col>
                </Row>
              </Content>
            </Row>
            {!isEmpty(dealersAccounting) ? (
              <>
                <Row className="mt-16 mb-16">
                  <Content rounded height={"120px"}>
                    <Row>
                      <Col xs={12}>
                        <BaseTable
                          tableHeader={[
                            "Сумма вклада (Оплата + Возврат)",
                            "Сумма платежей (Доставка + Дополнительный)",
                            "Баланс",
                          ]}
                        >
                          <tr>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={sumOfReturnAndDeposit}
                                prefix={"¥ "}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                              />
                            </td>

                            <td>
                              <NumericFormat
                                displayType="text"
                                value={sumOfDeliveryAndAdditional}
                                prefix={"¥ "}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                              />
                            </td>

                            <td>
                              <NumericFormat
                                displayType="text"
                                value={
                                  sumOfDeliveryAndAdditional -
                                  sumOfReturnAndDeposit
                                }
                                prefix={"¥ "}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                              />
                            </td>
                          </tr>
                        </BaseTable>
                      </Col>
                    </Row>
                  </Content>
                </Row>
              </>
            ) : (
              <></>
            )}
            <Row className="mb-32">
              <Content rounded height={"120px"}>
                {!isLoading ? (
                  <Col xs={12}>
                    {!isEmpty(dealersAccounting) ? (
                      <BaseTable
                        tableHeader={[
                          "Дата",
                          "Возврат (-)",
                          "Оплата (-)",
                          "Доставка (+)",
                          "Дополнительный (+)",
                          "Баланс",
                        ]}
                      >
                        {!isEmpty(dealersAccounting) ? (
                          dealersAccounting.map((item, index) => (
                            <>
                              <tr
                                key={index + 300}
                                className={"cursor-pointer"}
                              >
                                <td>
                                  {moment(get(item, "createdAt", "")).format(
                                    "YYYY-MM-DD"
                                  )}
                                </td>
                                <td>
                                  {get(item, "type") === "RETURN" ? (
                                    <Col>
                                      <BaseTooltip
                                        noteInfo={get(item, "note", "...")}
                                      />

                                      <NumericFormat
                                        style={{
                                          textDecoration: "underline",
                                        }}
                                        displayType="text"
                                        value={get(item, "amount", "-")}
                                        prefix={"¥"}
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                      />
                                    </Col>
                                  ) : (
                                    <> - </>
                                  )}
                                </td>
                                <td>
                                  {get(item, "type") === "DEPOSIT" ? (
                                    <Col>
                                      <BaseTooltip
                                        noteInfo={get(item, "note", "...")}
                                      />

                                      <NumericFormat
                                        displayType="text"
                                        value={get(item, "amount", "-")}
                                        style={{
                                          textDecoration: "underline",
                                        }}
                                        prefix={"¥"}
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                      />
                                    </Col>
                                  ) : (
                                    <> - </>
                                  )}
                                </td>
                                <td>
                                  {get(item, "type") === "DELIVERY" ? (
                                    <Col
                                      onClick={() => {
                                        setCollapsedRowId((id) =>
                                          get(item, "id", null) === id
                                            ? null
                                            : get(item, "id", null)
                                        );
                                      }}
                                    >
                                      <BaseTooltip
                                        noteInfo={get(item, "note", "...")}
                                      />

                                      <NumericFormat
                                        style={{
                                          textDecoration: "underline",
                                        }}
                                        displayType="text"
                                        value={get(item, "amount", "-")}
                                        prefix={"¥"}
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                      />
                                    </Col>
                                  ) : (
                                    <> - </>
                                  )}
                                </td>
                                <td>
                                  {get(item, "type") === "ADDITIONAL" ? (
                                    <Col>
                                      <BaseTooltip
                                        noteInfo={get(item, "note", "...")}
                                      />

                                      <NumericFormat
                                        displayType="text"
                                        value={get(item, "amount", "-")}
                                        style={{
                                          textDecoration: "underline",
                                        }}
                                        prefix={"¥"}
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                      />
                                    </Col>
                                  ) : (
                                    <> - </>
                                  )}
                                </td>
                                <td>
                                  <NumericFormat
                                    displayType="text"
                                    value={get(item, "remainedAmount", "-")}
                                    prefix={"¥"}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                  />
                                </td>
                              </tr>
                              {isEqual(collapsedRowId, get(item, "id")) && (
                                <tr>
                                  <td colSpan={6}>
                                    <BaseTable
                                      className="mt-16 mb-16 light-border"
                                      tableHeader={[
                                        "Дата",
                                        "Код",
                                        "Страна",
                                        "Вес (грамм)",
                                        "Количество",
                                        "Цена",
                                        "CLJASIA цена",
                                      ]}
                                    >
                                      {get(item, "accountingDetails", []) &&
                                        get(item, "accountingDetails", []).map(
                                          (parcel, index) => (
                                            <tr key={index + 100}>
                                              <td>
                                                {moment(
                                                  get(parcel, "createdAt", null)
                                                ).format("YYYY-MM-DD")}
                                              </td>

                                              <td>
                                                <Link
                                                  onClick={() => {
                                                    MyuhlPostApiService.GetSingleMyuhlPost(
                                                      get(
                                                        parcel,
                                                        "postId",
                                                        null
                                                      )
                                                    )
                                                      .then(({ data }) => {
                                                        if (data.success) {
                                                          history.push(
                                                            `/email/parcels/single/${get(
                                                              parcel,
                                                              "postId",
                                                              null
                                                            )}`
                                                          );
                                                        } else {
                                                          history.push(
                                                            "/dealer/payment"
                                                          );
                                                        }
                                                      })
                                                      .catch((error) => {
                                                        if (error) {
                                                          history.push(
                                                            "/dealer/payment"
                                                          );
                                                        }
                                                      });
                                                  }}
                                                >
                                                  {get(parcel, "postCode", "-")}
                                                </Link>
                                              </td>
                                              <td>
                                                {get(
                                                  parcel,
                                                  "countryCode",
                                                  "-"
                                                )}
                                              </td>
                                              <td>
                                                {get(parcel, "weight", "-")}
                                              </td>
                                              <td>
                                                {isEqual(
                                                  get(parcel, "quantity", null),
                                                  null
                                                )
                                                  ? "-"
                                                  : get(parcel, "quantity", "")}
                                              </td>
                                              <td>
                                                <NumericFormat
                                                  displayType="text"
                                                  value={get(
                                                    parcel,
                                                    "price",
                                                    "-"
                                                  )}
                                                  prefix={"¥"}
                                                  thousandSeparator={true}
                                                  decimalScale={2}
                                                  fixedDecimalScale={true}
                                                />
                                              </td>
                                              <td>
                                                <NumericFormat
                                                  displayType="text"
                                                  value={get(
                                                    parcel,
                                                    "basePrice",
                                                    "-"
                                                  )}
                                                  prefix={"¥"}
                                                  thousandSeparator={true}
                                                  decimalScale={0}
                                                  fixedDecimalScale={true}
                                                />
                                              </td>
                                            </tr>
                                          )
                                        )}
                                    </BaseTable>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={10}>No data</td>
                          </tr>
                        )}
                      </BaseTable>
                    ) : (
                      <Flex justify="center" className="mt-32">
                        <Text>
                          {" "}
                          Пожалуйста, введите параметры и выполните поиск, чтобы
                          найти данные{" "}
                        </Text>
                      </Flex>
                    )}
                  </Col>
                ) : (
                  <Col xs={12}>
                    <Flex style={{ marginTop: "15%" }} justify="center">
                      <ContentLoader />
                    </Flex>
                  </Col>
                )}
              </Content>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentContainer;
