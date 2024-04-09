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
import { fetchBoxOrderData, setFilter } from "app/slices/dealerSlices/orderBoxSlice/orderBoxSlice";
import { DealerApiService } from "services/apiServices";
import { toast } from "react-toastify";
import { commonDate } from "utils";
import { useFormik } from "formik";
import { fetchBoxOrderPriceData } from "app/slices/dealerSlices/orderBoxSlice/orderBoxPrice";

const OrderBoxContainer = () => {
    const [collapsedRowId, setCollapsedRowId] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const isFetched = true;
    const filter = useSelector((store) => store.dealer.orderBox.filter);

    const DATA = useSelector((store) => store.dealer.orderBox.data.dataBox);
    
    const BOX_PRICES = useSelector(
        (store) => store.dealer.orderBoxPrice.boxPrices
        );
    const totalPages = useSelector((store) => get(store, 'dealer.orderBox.data.dataBox.paginationData', 1))




        const updateBoxOrder = (params) => {
        setLoading(true);
        try {
            DealerApiService.UpdateBoxOrderStatus(params).then((res) => {
                if (res && res.data) {
                    setLoading(false);
                    toast.success(res.data.status);
                    dispatch(fetchBoxOrderData());

                } else {
                    setLoading(false);
                    toast.error(res.data.data.description);
                    dispatch(fetchBoxOrderData());
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        dispatch(fetchBoxOrderData())
        dispatch(fetchBoxOrderPriceData())
    }, [])
    const onSubmit = () => {
        DealerApiService.AddBoxOrder(values).then((res) => {
            if (res && res.data && res.data.status) {
                setLoading(false);
                toast.success("Success");
                dispatch(fetchBoxOrderData());

            } else {
                setLoading(false);
                toast.success(res.data.message);
                dispatch(fetchBoxOrderData());
            }
        });
    }

    const { values, handleBlur, handleSubmit, handleChange } = useFormik({
        enableReinitialize: true,
        initialValues: {
            airCushionCount: 0,
            boxSize1Count: 0,
            boxSize2Count: 0,
            boxSize3Count: 0,
            boxSize4Count: 0,
            boxSize5Count: 0,
            boxSize6Count: 0
        },
        onSubmit,
        
    });

    
    const dealerHeader = _.map(BOX_PRICES, function map(item) {
        return {
         
            label: `${get(item, "price", "-")}`,
        }
    });
    useEffect(() => {
        dispatch(fetchBoxOrderData({size:filter.size , page:filter.page}));
    } , [filter.size  , filter.page])
    return (
        <Container fluid>
            {loading && <Loader />}
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
                                    {" "}Заказать коробки
                                </Text>
                            </Row>
                            <FormWrapper onSubmit={handleSubmit}>
                                <Col xs={12}>
                                    {isFetched ? (

                                        <BaseTable

                                            tableHeader={

                                                [
                                                    "Коробка",
                                                    `Размер 1 (20 шт.) - ¥${get(dealerHeader[0], "label", 0)} `,
                                                    `Размер 2 (20 шт.) - ¥${get(dealerHeader[1], "label", 0)}  `,
                                                    `Размер 3 (10 шт.) - ¥${get(dealerHeader[2], "label", 0)} `,
                                                    `Размер 4 (10 шт.) - ¥${get(dealerHeader[3], "label", 0)} `,
                                                    `Размер 5 (10 шт.) - ¥${get(dealerHeader[4], "label", 0)} `,
                                                    `Размер 6 (5 шт.) - ¥${get(dealerHeader[5], "label", 0)} `,
                                                    `Воздушная подушка (5 шт.) - ¥${get(dealerHeader[6], "label", 0)}`,
                                                ]
                                            }
                                        >

                                            <tr>
                                                <td>
                                                    <Text>К-во шт.</Text>
                                                </td>

                                                <td>
                                                    <FormInput
                                                        placeholder={"Сумма (won)..."}
                                                        name={"boxSize1Count"}
                                                        thousandSeparator
                                                        value={get(values, "boxSize1Count", 0)}
                                                        handleOnBlur={handleBlur}
                                                        handleOnChange={handleChange}
                                                        left={0}
                                                        right={10}
                                                        onBlur={
                                                            handleBlur
                                                        }
                                                    />

                                                </td>
                                                <td>
                                                    <FormInput
                                                        placeholder={"Сумма (won)..."}
                                                        name={"boxSize2Count"}
                                                        thousandSeparator
                                                        value={get(values, "boxSize2Count", 0)}
                                                        handleOnChange={handleChange}
                                                        handleOnBlur={handleBlur}
                                                        left={0}
                                                        right={10}
                                                        onBlur={
                                                            handleBlur
                                                        }
                                                    />

                                                </td>
                                                <td>
                                                    <FormInput
                                                        placeholder={"Сумма (won)..."}
                                                        name={"boxSize3Count"}
                                                        thousandSeparator
                                                        value={get(values, "boxSize3Count", 0)}
                                                        handleOnChange={handleChange}
                                                        handleOnBlur={handleBlur}
                                                        left={0}
                                                        right={10}
                                                        onBlur={
                                                            handleBlur
                                                        }
                                                    />

                                                </td>
                                                <td>
                                                    <FormInput
                                                        placeholder={"Сумма (won)..."}
                                                        name={"boxSize4Count"}
                                                        thousandSeparator
                                                        value={get(values, "boxSize4Count", 0)}
                                                        handleOnBlur={handleBlur}
                                                        handleOnChange={handleChange}


                                                        left={0}
                                                        right={10}
                                                        onBlur={
                                                            handleBlur
                                                        }
                                                    />

                                                </td>
                                                <td>
                                                    <FormInput
                                                        placeholder={"Сумма (won)..."}
                                                        name={"boxSize5Count"}
                                                        thousandSeparator
                                                        value={get(values, "boxSize5Count", 0)}
                                                        handleOnBlur={handleBlur}
                                                        handleOnChange={handleChange}

                                                        left={0}
                                                        right={10}
                                                        onBlur={
                                                            handleBlur
                                                        }
                                                    />

                                                </td>
                                                <td>
                                                    <FormInput
                                                        placeholder={"Сумма (won)..."}
                                                        name={"boxSize6Count"}
                                                        thousandSeparator
                                                        value={get(values, "boxSize6Count", 0)}
                                                        handleOnBlur={handleBlur}
                                                        handleOnChange={handleChange}

                                                        left={0}
                                                        right={10}
                                                        onBlur={
                                                            handleBlur
                                                        }
                                                    />

                                                </td>
                                                <td>
                                                    <FormInput
                                                        placeholder={"Сумма (won)..."}
                                                        name={"airCushionCount"}
                                                        thousandSeparator
                                                        value={get(values, "airCushionCount", 0)}
                                                        handleOnBlur={handleBlur}
                                                        handleOnChange={handleChange}

                                                        left={0}
                                                        right={10}
                                                        onBlur={
                                                            handleBlur
                                                        }
                                                    />

                                                </td>

                                            </tr>
                                        </BaseTable>
                                    ) : (
                                        <ContentLoader />
                                    )}
                                </Col>
                                <Col xs={12} align={"center"}>
                                    <BaseButton
                                        primary
                                        type="submit"
                                    >
                                        Заказать
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
                                                                        2
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
                                                                ) === "ORDERED" ? (
                                                                    <>
                                                                        <BaseButton
                                                                            tangerine
                                                                                handleClick={(e) => {
                                                                                    e.stopPropagation() 
                                                                                updateBoxOrder(
                                                                                    {
                                                                                        id: get(
                                                                                            item,
                                                                                            "id",
                                                                                            null
                                                                                        ),
                                                                                        status: "CANCELED",
                                                                                    }
                                                                                )}
                                                                            }
                                                                            className={
                                                                                "ml-4"
                                                                            }
                                                                            style={{
                                                                                zIndex: 1000000000,
                                                                            }}
                                                                        >
                                                                            Отменить
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
                                                        {console.log()}
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
                        {totalPages  && (
                            <Row
                                align={"center"}
                                className={"pagination_position"}
                            >
                                <Col xs={4}>
                                    <Flex>
                                        <Text>Show</Text>
                                        <BaseSelect
                                            handleChange={(value) => {
                                               dispatch(setFilter({
                                                    name: "size",
                                                    value: value,
                                                }))
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
                                            )
                                        }}
                                        pageCount={get(totalPages, "totalPages", 1)}
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
