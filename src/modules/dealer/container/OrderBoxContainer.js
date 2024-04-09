import React, { useEffect, useState } from "react";
import _, { get, isEmpty, isEqual } from "lodash";
import { Col, Container, Row } from "react-grid-system";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    BaseSelect,
    BaseTable,
    Flex,
    Text,
    ContentLoader,
    BasePagination,
    Loader,
    FormWrapper,
    BaseMaskInput,
    FormInput,
} from "components";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBoxOrderData,
    setFilter,
} from "app/slices/dealerSlices/orderBoxSlice/orderBoxSlice";
import { DealerApiService } from "services/apiServices";
import { toast } from "react-toastify";
import { commonDate } from "utils";
import { useFormik } from "formik";
import { fetchBoxOrderPriceData } from "app/slices/dealerSlices/orderBoxSlice/orderBoxPrice";

const OrderBoxContainer = () => {
    const [collapsedRowId, setCollapsedRowId] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const userData = useSelector((store) => store.auth.user);

    const isAdmin = get(userData, "token.data.isAdmin", false);
    useEffect(() => {
        dispatch(fetchBoxOrderData());
        dispatch(fetchBoxOrderPriceData());
    }, []);
    const isFetched = true;

    const filter = useSelector((store) => store.dealer.orderBox.filter);
    const DATA = useSelector((store) => store.dealer.orderBox.data.dataBox);

    const BOX_PRICES = useSelector(
        (store) => store.dealer.orderBoxPrice.boxPrices
    );
    const totalPages = useSelector((store) =>
        get(store, "dealer.orderBox.data.dataBox.paginationData", 1)
    );

    useEffect(() => {
        dispatch(fetchBoxOrderData(filter));
    }, [filter.size, filter.page]);

    const matchIds = (id) => {
        switch (id) {
            case "BX_SZ_1":
                return "boxSize1Price";
            case "BX_SZ_2":
                return "boxSize2Price";
            case "BX_SZ_3":
                return "boxSize3Price";
            case "BX_SZ_4":
                return "boxSize4Price";
            case "BX_SZ_5":
                return "boxSize5Price";
            case "BX_SZ_6":
                return "boxSize6Price";
            case "AIR_CUSHIONS":
                return "airCushionPrice";
            default:
                return;
        }
    };
    const initialValues = {};
    BOX_PRICES.forEach(
        (item) => (initialValues[matchIds(item.type)] = item.price)
    );

    const updateBoxOrder = (params) => {
        setLoading(true);
        try {
            DealerApiService.UpdateBoxOrderStatus(params).then((res) => {
                if (res && res.data) {
                    setLoading(false);
                    dispatch(fetchBoxOrderData());
                    setLoading(false);
                    toast.success(res.data.message);
                    dispatch(fetchBoxOrderData());
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const updateBoxOrderPrice = () => {
        setLoading(true);
        try {
            DealerApiService.UpdateBoxOrderPrice(values).then((res) => {
                if (res && res.data) {
                    setLoading(false);
                    toast.success("Success");
                    dispatch(fetchBoxOrderData());
                } else {
                    setLoading(false);
                    toast.success(res.data.message);
                    dispatch(fetchBoxOrderData());
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    const { values, handleBlur, handleSubmit, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: updateBoxOrderPrice,
    });

    useEffect(() => {
        dispatch(fetchBoxOrderData({ size: filter.size, page: filter.page }));
    }, [filter.size, filter.page]);
    return (
        <Container fluid>
            {/* {loading && <Loader />} */}
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Дилер", url: "/dealer" },
                            {
                                id: 2,
                                name: "Коробка заказов",
                                url: "/dealer/orderbox",
                            },
                        ]}
                    />
                </Col>

                <Col xs={12}>
                    <Content height={"300px"}>
                        <Row className="mb-32">
                            <Row className={" ml-4 pl-20"}>
                                <Text xl dark medium>
                                    Цена{" "}
                                </Text>
                            </Row>
                            <FormWrapper onSubmit={handleSubmit}>
                                <Col xs={12}>
                                    {isFetched ? (
                                        <BaseTable
                                            tableHeader={[
                                                "Коробка",
                                                "Размер 1 (20 шт.)",
                                                "Размер 2 (20 шт.)",
                                                "Размер 3 (10 шт.)",
                                                "Размер 4 (10 шт.)",
                                                "Размер 5 (10 шт.)",
                                                "Размер 6 (5 шт.)",
                                                "Воздушная подушка (5 шт.)",
                                            ]}
                                        >
                                            <tr>
                                                <td>
                                                    <Text>Цена</Text>
                                                </td>
                                                {BOX_PRICES.map(
                                                    (item, index) => (
                                                        <td>
                                                            <BaseMaskInput
                                                                id={matchIds(
                                                                    get(
                                                                        item,
                                                                        "type"
                                                                    )
                                                                )}
                                                                thousandSeparator={
                                                                    true
                                                                }
                                                                value={get(
                                                                    item,
                                                                    "price",
                                                                    ""
                                                                )}
                                                                placeholder={
                                                                    "Сумма (won)..."
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                decimalScale={0}
                                                                fixedDecimalScale={
                                                                    true
                                                                }
                                                                handleInput={(
                                                                    e
                                                                ) => {
                                                                    const unit =
                                                                        e.replaceAll(
                                                                            ",",
                                                                            ""
                                                                        );
                                                                    const unitAmt =
                                                                        +unit;
                                                                    setFieldValue(
                                                                        matchIds(
                                                                            get(
                                                                                item,
                                                                                "type"
                                                                            )
                                                                        ),
                                                                        unitAmt
                                                                    );
                                                                }}
                                                            />
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        </BaseTable>
                                    ) : (
                                        <ContentLoader />
                                    )}
                                </Col>
                                <Col xs={12} align={"center"}>
                                    <BaseButton primary type="submit">
                                        Сохранить
                                    </BaseButton>
                                </Col>
                            </FormWrapper>
                        </Row>
                    </Content>
                </Col>
                <Col xs={12} className={"mt-16"}>
                    <Content>
                        <Row className="mb-32">
                            <Row className={"ml-4"}>
                                <Text xl dark medium>
                                    {"  "}Заказы
                                </Text>
                            </Row>
                            <Col xs={12}>
                                {isFetched ? (
                                    <BaseTable
                                        tableHeader={[
                                            "Дата",
                                            "Дилер",
                                            "Цена",
                                            "Статус",
                                        ]}
                                    >
                                        {!isEmpty(get(DATA, "data", [])) ? (
                                            get(DATA, "data", []).map(
                                                (item, index) => (
                                                    <>
                                                        <tr
                                                            key={index + 300}
                                                            className={
                                                                "cursor-pointer"
                                                            }
                                                            onClick={() =>
                                                                setCollapsedRowId(
                                                                    (id) =>
                                                                        get(
                                                                            item,
                                                                            "id",
                                                                            null
                                                                        ) == id
                                                                            ? null
                                                                            : get(
                                                                                  item,
                                                                                  "id",
                                                                                  null
                                                                              )
                                                                )
                                                            }
                                                            style={{
                                                                height: "60px",
                                                                background:
                                                                    "#F3F3F3",
                                                            }}
                                                        >
                                                            <td>
                                                                {commonDate({
                                                                    date: moment(
                                                                        get(
                                                                            item,
                                                                            "createdAt",
                                                                            ""
                                                                        )
                                                                    ),
                                                                })}
                                                            </td>
                                                            <td>
                                                                {get(
                                                                    item,
                                                                    "dealer",
                                                                    ""
                                                                )}
                                                            </td>
                                                            <td>
                                                                <NumericFormat
                                                                    displayType="text"
                                                                    value={get(
                                                                        item,
                                                                        "price",
                                                                        ""
                                                                    )}
                                                                    prefix={"¥"}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    decimalScale={
                                                                        0
                                                                    }
                                                                    fixedDecimalScale={
                                                                        true
                                                                    }
                                                                />
                                                            </td>
                                                            <td>
                                                                {get(
                                                                    item,
                                                                    "status",
                                                                    null
                                                                ) ===
                                                                "ORDERED" ? (
                                                                    <>
                                                                        <BaseButton
                                                                            primary
                                                                            handleClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                updateBoxOrder(
                                                                                    {
                                                                                        id: get(
                                                                                            item,
                                                                                            "id",
                                                                                            null
                                                                                        ),
                                                                                        status: "ACCEPTED",
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            Принимать
                                                                        </BaseButton>
                                                                        <BaseButton
                                                                            danger
                                                                            handleClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                updateBoxOrder(
                                                                                    {
                                                                                        id: get(
                                                                                            item,
                                                                                            "id",
                                                                                            null
                                                                                        ),
                                                                                        status: "REJECTED",
                                                                                    }
                                                                                );
                                                                            }}
                                                                            className={
                                                                                "ml-4"
                                                                            }
                                                                            style={{
                                                                                zIndex: 1000000000,
                                                                            }}
                                                                        >
                                                                            Отклонить
                                                                        </BaseButton>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {isEqual(
                                                                            get(
                                                                                item,
                                                                                "status",
                                                                                null
                                                                            ),
                                                                            "ACCEPTED"
                                                                        ) && (
                                                                            <Text
                                                                                green
                                                                                xs
                                                                            >
                                                                                Принято
                                                                            </Text>
                                                                        )}
                                                                        {isEqual(
                                                                            get(
                                                                                item,
                                                                                "status",
                                                                                null
                                                                            ),
                                                                            "REJECTED"
                                                                        ) && (
                                                                            <Text
                                                                                danger
                                                                                xs
                                                                            >
                                                                                Отклонено
                                                                            </Text>
                                                                        )}
                                                                        {isEqual(
                                                                            get(
                                                                                item,
                                                                                "status",
                                                                                null
                                                                            ),
                                                                            "CANCELED"
                                                                        ) && (
                                                                            <Text
                                                                                tangerine
                                                                                xs
                                                                            >
                                                                                Отменено
                                                                            </Text>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                        {isEqual(
                                                            collapsedRowId,
                                                            get(item, "id")
                                                        ) && (
                                                            <tr>
                                                                <td colSpan={4}>
                                                                    <BaseTable
                                                                        className="mt-16 mb-16 light-border"
                                                                        tableHeader={[
                                                                            "Размер",
                                                                            "К-во",
                                                                            "Цена",
                                                                        ]}
                                                                    >
                                                                        {get(
                                                                            item,
                                                                            "boxDetails",
                                                                            []
                                                                        ) &&
                                                                            get(
                                                                                item,
                                                                                "boxDetails",
                                                                                []
                                                                            ).map(
                                                                                (
                                                                                    parcel,
                                                                                    index
                                                                                ) => (
                                                                                    <tr
                                                                                        key={
                                                                                            index +
                                                                                            100
                                                                                        }
                                                                                    >
                                                                                        <td>
                                                                                            {get(
                                                                                                parcel,
                                                                                                "type",
                                                                                                ""
                                                                                            )}
                                                                                        </td>

                                                                                        <td>
                                                                                            {get(
                                                                                                parcel,
                                                                                                "count",
                                                                                                ""
                                                                                            )}
                                                                                        </td>
                                                                                        <td>
                                                                                            <NumericFormat
                                                                                                displayType="text"
                                                                                                thousandSeparator={
                                                                                                    true
                                                                                                }
                                                                                                value={get(
                                                                                                    parcel,
                                                                                                    "price",
                                                                                                    ""
                                                                                                )}
                                                                                                decimalScale={
                                                                                                    2
                                                                                                }
                                                                                                fixedDecimalScale={
                                                                                                    true
                                                                                                }
                                                                                                prefix={
                                                                                                    "¥"
                                                                                                }
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
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan={10}>нет данных</td>
                                            </tr>
                                        )}
                                    </BaseTable>
                                ) : (
                                    <ContentLoader />
                                )}
                            </Col>
                        </Row>
                        {totalPages && (
                            <Row
                                align={"center"}
                                className={"pagination_position"}
                            >
                                <Col xs={4}>
                                    <Flex>
                                        <Text>Show</Text>
                                        <BaseSelect
                                            handleChange={(value) => {
                                                dispatch(
                                                    setFilter({
                                                        name: "size",
                                                        value: value,
                                                    })
                                                );
                                            }}
                                            value={get(filter, "size", 10)}
                                            options={[
                                                { value: 5, label: 5 },
                                                { value: 10, label: 10 },
                                                {
                                                    value: 25,
                                                    label: 25,
                                                },
                                                { value: 50, label: 50 },
                                            ]}
                                            margin={"0 12px 0 12px"}
                                            width={"80px"}
                                            placeholder={"Count"}
                                        />
                                        <Text>on the page</Text>
                                    </Flex>
                                </Col>
                                <Col xs={8}>
                                    <BasePagination
                                        current={get(filter, "page", 0) - 1}
                                        onChange={({ selected }) => {
                                            dispatch(
                                                setFilter({
                                                    name: "page",
                                                    value: selected + 1,
                                                })
                                            );
                                        }}
                                        pageCount={get(
                                            totalPages,
                                            "totalPages",
                                            1
                                        )}
                                    />
                                </Col>
                            </Row>
                        )}
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderBoxContainer;
