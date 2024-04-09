import {
    BaseBreadcrumb,
    BaseButton,
    BaseDatePicker,
    BaseSelect,
    Content,
    ContentLoader,
    Flex,
    Text,
} from "components";
import { Col, Row, Container } from "react-grid-system";
import { ReactSVG } from "react-svg";
import file from "assets/images/icons/file.svg";
import equal from "assets/images/icons/equal.svg";
import wallet from "assets/images/icons/wallet.svg";
import doublePeople from "assets/images/icons/doublePeople.svg";
import { useState } from "react";
import moment from "moment";
import _, { get, isEmpty, unionBy, values } from "lodash";
import { NumericFormat } from "react-number-format";
import { fetchDailyStatistics } from "app/slices/homeSlices/dailyStatisticsSlice/dailyStatisticsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyStatistics } from "app/slices/homeSlices/monthlyStatisticsSlice/monthlyStatisticsSlice";
import { fetchFilterStatistics } from "app/slices/homeSlices/filterStatisticsSlice/filterStatisticsSlice";
import { useRef } from "react";
import { fetchAllDealersPrices } from "app/slices/dealerSlices/dealersPriceSlice/dealersPriceSlice";
import { fetchUserMe } from "app/slices/commonSlices/userMeSlice";
import { BaseLineChart } from "components/base-chart";
import "moment/locale/ru";
import BaseModal from "components/modal";
import CompanyInfoContainer from "modules/settings/containers/CompanyInfoContainer";

const HomeContainer = () => {
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.auth.user);
    const isAdmin = get(userData, "token.data.isAdmin", false);
    const isFirstTime = get(userData, "token.data.isFirstTime", false);

    const refAllUsers = useRef();
    const clearAllUsersSelect = () => {
        refAllUsers.current.clearValue();
    };

    useEffect(() => {
        if (!isFirstTime) {
            dispatch(fetchUserMe());
        }
    }, []);

    const userMe = useSelector((store) =>
        get(store, "common.userMe.data.userMe.data", [])
    );

    const initialDealerId = isAdmin ? null : get(userMe, "id", null);

    const [filter, setFilter] = useState({
        dealerId: initialDealerId,
        fromDate: moment().subtract(2, "month").format("YYYY-MM-DD"),
        toDate: moment().add(1, "days").format("YYYY-MM-DD"),
    });

    useEffect(() => {
        dispatch(fetchMonthlyStatistics());
    }, []);
    const monthlyStatistics = useSelector((store) =>
        get(
            store,
            "home.monthlyStatisticsSlice.data.monthlyStatistics.data",
            []
        )
    );

    const isMonthlyStatisticsLoading = useSelector((store) =>
        get(store, "home.monthlyStatisticsSlice.data.loading", true)
    );

    useEffect(() => {
        dispatch(fetchDailyStatistics());
    }, []);
    const dailyStatistics = useSelector((store) =>
        get(store, "home.dailyStatisticsSlice.data.dailyStatistics.data", [])
    );
    const IsDailyStatisticsLoading = useSelector((store) =>
        get(store, "home.dailyStatisticsSlice.data.loading", true)
    );

    useEffect(() => {
        dispatch(fetchAllDealersPrices());
    }, []);

    const allDealers = useSelector((store) =>
        get(store, "dealer.dealersPrices.data.dealersPrices.data", [])
    );

    const dealersOptions = _.map(allDealers, function map(item) {
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", null),
        };
    });

    const defaultDealer = dealersOptions.filter(function (item) {
        return item.value === filter.dealerId;
    });

    const handleSearch = () => {
        dispatch(fetchFilterStatistics(filter));
    };

    const filterStatistics = useSelector((store) =>
        get(store, "home.filterStatisticsSlice.data.filterStatistics.data", [])
    );

    const isFilterStatisticsLoading = useSelector((store) =>
        get(store, "home.filterStatisticsSlice.data.loading", true)
    );

    const clearSelect = () => {
        dispatch(
            fetchFilterStatistics({
                dealerId: initialDealerId,
                fromDate: moment().subtract(2, "month").format("YYYY-MM-DD"),
                toDate: moment().add(1, "days").format("YYYY-MM-DD"),
            })
        );
        clearAllUsersSelect();
    };

    const newDefaultValueLine = monthlyStatistics.map((item, index) => {
        moment.locale("ru", {
            monthsShort: [
                "Янв.",
                "Февр.",
                "Март",
                "Апр.",
                "Май",
                "Июнь",
                "Июль",
                "Авг.",
                "Сент.",
                "Окт.",
                "Нояб.",
                "Дек.",
            ],
            // "Янв._Февр._Март_Апр._Май_Июнь_Июль_Авг._Сент._Окт._Нояб._Дек.".split(
            //     "_"
            // ),
        });
        let name = moment(item.month);
        let year = moment(item.year).format("YYYY");
        return {
            amt: item.price,
            index,
            name: `${name.format("MMM")}-${year}`,
            year,
        };
    });

    useEffect(() => {
        document.title = "Admin| Аналитика";
    }, []);

    return (
        <>
            <BaseModal modalIsOpen={isFirstTime}>
                <CompanyInfoContainer style={{ zIndex: 25 }} />
            </BaseModal>

            <Container className="mt-16 mb-16">
                <Row>
                    <Col xs={12} className={"mb-8"}>
                        <BaseBreadcrumb
                            items={[
                                {
                                    id: 1,
                                    name: "Аналитика",
                                    url: "/",
                                },
                            ]}
                        />
                    </Col>
                </Row>
                {!isMonthlyStatisticsLoading &&
                !IsDailyStatisticsLoading &&
                !isFilterStatisticsLoading ? (
                    <>
                        {isAdmin ? (
                            <Row className={"mb-8"}>
                                <Col xs={12}>
                                    <Content rounded>
                                        <Row>
                                            <Col xs={12}>
                                                <Row className={"mb-16 ml-4"}>
                                                    <Text xl dark medium>
                                                        Оборот{" "}
                                                    </Text>
                                                </Row>
                                            </Col>
                                            <Col xs={10}>
                                                <Row>
                                                    <Col xs={12}>
                                                        <BaseLineChart
                                                            // lines={lines}
                                                            // get(dashboard, 'topUpVolumes', [])
                                                            data={
                                                                newDefaultValueLine
                                                            }
                                                            // date={filter.type}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col
                                                xs={2}
                                                style={{
                                                    alignSelf: "center",
                                                }}
                                                className={"pl-32"}
                                            >
                                                <Row>
                                                    <Col xs={12}>
                                                        <Text
                                                            margin={"0 0 15px"}
                                                            xl
                                                            medium
                                                        >
                                                            <NumericFormat
                                                                displayType={
                                                                    "text"
                                                                }
                                                                thousandSeparator={
                                                                    ","
                                                                }
                                                                value={
                                                                    !isEmpty(
                                                                        monthlyStatistics
                                                                    )
                                                                        ? get(
                                                                              monthlyStatistics.at(
                                                                                  -1
                                                                              ),
                                                                              "price",
                                                                              0
                                                                          )
                                                                        : 0
                                                                }
                                                                prefix={"¥"}
                                                                decimalScale={0}
                                                            />
                                                        </Text>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-24"}>
                                                    <Col xs={12}>
                                                        <Flex>
                                                            <Text
                                                                gray
                                                                margin={
                                                                    "0 8px 0px 0"
                                                                }
                                                            >
                                                                Оборот в этом
                                                                месяце
                                                            </Text>
                                                        </Flex>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Content>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                        <Row className="mb-16 mt-16">
                            <Col xs={3}>
                                <Content rounded height="140px">
                                    <Row justify="center">
                                        <Text
                                            small
                                            medium
                                            className="mb-24 mt-8"
                                        >
                                            Количество почты (Сегодня)
                                        </Text>
                                    </Row>
                                    <Row justify="between">
                                        <ReactSVG
                                            className="ml-16"
                                            src={file}
                                        />
                                        <Text xl blue className="mr-16">
                                            <NumericFormat
                                                displayType="text"
                                                value={get(
                                                    dailyStatistics,
                                                    "numberOfPosts",
                                                    0
                                                )}
                                                thousandSeparator={true}
                                                decimalScale={0}
                                            />
                                        </Text>
                                    </Row>
                                </Content>
                            </Col>
                            <Col xs={3}>
                                <Content rounded height="140px">
                                    <Row justify="center">
                                        <Text
                                            small
                                            medium
                                            className="mb-24 mt-8"
                                        >
                                            Полный вес почты (Сегодня)
                                        </Text>
                                    </Row>
                                    <Row justify="between">
                                        <ReactSVG
                                            className="ml-16"
                                            src={equal}
                                        />
                                        <Text xl blue medium className="mr-16">
                                            <NumericFormat
                                                displayType="text"
                                                value={
                                                    get(
                                                        dailyStatistics,
                                                        "weight",
                                                        0
                                                    ) / 1000
                                                }
                                                thousandSeparator={true}
                                                decimalScale={0}
                                            />{" "}
                                            kg
                                        </Text>
                                    </Row>
                                </Content>
                            </Col>
                            <Col xs={3}>
                                <Content rounded height="140px">
                                    <Row justify="center">
                                        <Text
                                            small
                                            medium
                                            className="mb-24 mt-8"
                                        >
                                            Общая сумма почты (Сегодня)
                                        </Text>
                                    </Row>
                                    <Row justify="between">
                                        <ReactSVG
                                            className="ml-16"
                                            src={wallet}
                                        />
                                        <Text xl blue medium className="mr-16">
                                            <NumericFormat
                                                displayType="text"
                                                value={get(
                                                    dailyStatistics,
                                                    "price",
                                                    0
                                                )}
                                                prefix={"¥"}
                                                thousandSeparator={true}
                                                decimalScale={0}
                                                fixedDecimalScale={true}
                                            />
                                        </Text>
                                    </Row>
                                </Content>
                            </Col>
                            <Col xs={3}>
                                <Content rounded height="140px">
                                    <Row justify="center">
                                        <Text
                                            small
                                            medium
                                            className="mb-24 mt-8"
                                        >
                                            Общее количество пользователей
                                        </Text>
                                    </Row>
                                    <Row justify="between">
                                        <ReactSVG
                                            className="ml-16"
                                            src={doublePeople}
                                        />
                                        <Text xl blue medium className="mr-16">
                                            <NumericFormat
                                                displayType="text"
                                                value={get(
                                                    dailyStatistics,
                                                    "usersCount",
                                                    0
                                                )}
                                                thousandSeparator={true}
                                                decimalScale={0}
                                                // fixedDecimalScale={
                                                //     true
                                                // }
                                            />
                                        </Text>
                                    </Row>
                                </Content>
                            </Col>
                        </Row>
                        <Row className="mb-32">
                            <Col xs={12}>
                                <Content rounded height="220px">
                                    <Row>
                                        {isAdmin ? (
                                            <Col xs={2}>
                                                <BaseSelect
                                                    ref={refAllUsers}
                                                    handleChange={(values) => {
                                                        setFilter((filter) => ({
                                                            ...filter,
                                                            dealerId: values,
                                                        }));
                                                    }}
                                                    defaultValue={defaultDealer}
                                                    options={dealersOptions}
                                                    margin={"0 0 0 15px"}
                                                    style={{ minWidth: "80px" }}
                                                    placeholder={`Пользователь`}
                                                />
                                            </Col>
                                        ) : (
                                            <></>
                                        )}

                                        <Col xs={2}>
                                            <BaseDatePicker
                                                style={{ zIndex: 0 }}
                                                value={get(
                                                    filter,
                                                    "fromDate",
                                                    null
                                                )}
                                                handleChange={(values) => {
                                                    setFilter((filter) => ({
                                                        ...filter,
                                                        fromDate: values,
                                                    }));
                                                }}
                                                margin={"0 6px 0 6px"}
                                                placeholder={"Начало"}
                                            />
                                        </Col>
                                        <Col xs={2}>
                                            <BaseDatePicker
                                                style={{ zIndex: 0 }}
                                                value={get(
                                                    filter,
                                                    "toDate",
                                                    null
                                                )}
                                                handleChange={(values) => {
                                                    setFilter((filter) => ({
                                                        ...filter,
                                                        toDate: values,
                                                    }));
                                                }}
                                                margin={"0 6px 0 6px"}
                                                placeholder={"Конец"}
                                            />
                                        </Col>
                                        <Col xs={2.5}></Col>
                                        <Col xs={3.5}>
                                            <BaseButton
                                                primary
                                                className="mr-8"
                                                onClick={handleSearch}
                                            >
                                                Поиск
                                            </BaseButton>
                                            <BaseButton
                                                danger
                                                onClick={clearSelect}
                                            >
                                                Очистить
                                            </BaseButton>
                                        </Col>
                                    </Row>
                                    {!isEmpty(filterStatistics) ? (
                                        <Row className="mt-32">
                                            <Col xs={4} justify="center">
                                                <Row justify="center">
                                                    <Text xxl medium>
                                                        {" "}
                                                        {get(
                                                            filterStatistics,
                                                            "numberOfPosts",
                                                            0
                                                        )}{" "}
                                                    </Text>
                                                </Row>
                                                <Row
                                                    justify="center"
                                                    className="mt-8"
                                                >
                                                    <Text xl medium gray>
                                                        {" "}
                                                        Количество почты{" "}
                                                    </Text>
                                                </Row>
                                            </Col>
                                            <Col xs={4} justify="center">
                                                <Row justify="center">
                                                    <Text xxl medium>
                                                        <NumericFormat
                                                            displayType="text"
                                                            value={
                                                                get(
                                                                    filterStatistics,
                                                                    "weight",
                                                                    0
                                                                ) / 1000
                                                            }
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            decimalScale={0}
                                                        />{" "}
                                                        kg
                                                        {/* {get(filterStatistics, "weight", 0)} */}
                                                    </Text>
                                                </Row>
                                                <Row
                                                    justify="center"
                                                    className="mt-8"
                                                >
                                                    <Text xl medium gray>
                                                        {" "}
                                                        Полный вес почты{" "}
                                                    </Text>
                                                </Row>
                                            </Col>
                                            <Col xs={4} justify="center">
                                                <Row justify="center">
                                                    <Text xxl medium>
                                                        <NumericFormat
                                                            displayType="text"
                                                            value={get(
                                                                filterStatistics,
                                                                "price",
                                                                0
                                                            )}
                                                            prefix={"¥"}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            decimalScale={0}
                                                            fixedDecimalScale={
                                                                true
                                                            }
                                                        />
                                                    </Text>
                                                </Row>
                                                <Row
                                                    justify="center"
                                                    className="mt-8"
                                                >
                                                    <Text xl medium gray>
                                                        {" "}
                                                        Общая сумма почты{" "}
                                                    </Text>
                                                </Row>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <Row
                                            justify="center"
                                            className="mt-32"
                                            align="center"
                                        >
                                            <Text xl medium>
                                                {" "}
                                                Пожалуйста, используйте фильтры
                                                и поиск, чтобы найти данные{" "}
                                            </Text>
                                        </Row>
                                    )}
                                </Content>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Flex style={{ marginTop: "15%" }} justify="center">
                        <ContentLoader />
                    </Flex>
                )}
            </Container>
        </>
    );
};

export default HomeContainer;
