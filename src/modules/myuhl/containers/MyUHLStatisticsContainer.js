import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import moment from "moment";

import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Flex,
    BaseSelect,
    BaseDatePicker,
    BaseTable,
    Text,
    Title,
} from "components";
import { get, includes, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "app/slices/commonSlices/countriesSlice";
import { countriesSchema } from "app/createSelector";
import {
    fetchStatisticsData,
    handleResetState,
} from "app/slices/myuhlSlices/statisticsSlice/statisticsSlice";
import { fetchManifestSnapshots } from "app/slices/commonSlices/manifestSnapshotsSlice";
import manifestSnapshotSchema from "app/createSelector/manifestSnapshotSchema";
import StatisticsPieChart from "../components/StatisticsPieChart";
import { NumericFormat } from "react-number-format";
import StatisticsBarChart from "../components/StatisticsBarChart";
import { Link } from "react-router-dom";
import { fetchOneManifests } from "app/slices/myuhlSlices/manifestAllSlice/manifestOneSlice";
import { number } from "yup";
import { handleReysNumber } from "app/slices/myuhlSlices/manifestAllSlice/manifestAllSlice";

const MyUHLStatisticsContainer = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        from: moment().subtract(1, "month").format("YYYY-MM-DD"),
        to: moment().add(1, "day").format("YYYY-MM-DD"),
        manifestId: 0,
        countryId: null,
        manifestCountryId: null,
    });
    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchManifestSnapshots());
    }, []);

    const countries = useSelector(countriesSchema);
    useEffect(() => {
        const manifestReys = manifests.find(
            (item) => item.value == get(filter, "manifestId", 0)
        );
        dispatch(fetchOneManifests(get(filter, "manifestId", 0)));
        dispatch(handleReysNumber(manifestReys?.label));
    }, [get(filter, "manifestId", 0)]);
    // console.log(countries.splice(0 , 1))
    const manifests = useSelector(manifestSnapshotSchema);
    const STATISTICS_DATA = useSelector((store) => store.myuhl.statisticsSlice);
    const applyFilter = ({ type }) => {
        switch (type) {
            case "withManifest":
                dispatch(
                    fetchStatisticsData({
                        manifestId: filter.manifestId,
                        countryId: filter.manifestCountryId,
                    })
                );
                setFilter({
                    ...filter,
                    from: moment().subtract(1, "month").format("YYYY-MM-DD"),
                    to: moment().add(1, "day").format("YYYY-MM-DD"),
                    countryId: null,
                });
                break;
            default:
                dispatch(
                    fetchStatisticsData({
                        from: filter.from,
                        to: filter.to,
                        countryId: filter.countryId,
                    })
                );
                setFilter({
                    ...filter,
                    manifestCountryId: null,
                    manifestId: null,
                });
                break;
        }
    };
    const clearFilter = ({ type }) => {
        dispatch(handleResetState());

        switch (type) {
            case "withManifest":
                setFilter(() => ({
                    ...filter,
                    manifestCountryId: null,
                    manifestId: null,
                }));
                break;
            default:
                setFilter(() => ({
                    ...filter,
                    from: moment().subtract(1, "month").format("YYYY-MM-DD"),
                    to: moment().add(1, "day").format("YYYY-MM-DD"),
                    countryId: null,
                }));
                break;
        }
    };

    useEffect(() => {
        document.title = "Статистика";
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <BaseBreadcrumb
                        items={[
                            {
                                id: 1,
                                name: "Статистика",
                                url: "/email/statistics",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content style={{ minHeight: "70vh" }}>
                        <Row className={"mb-8"}>
                            <Col xs={9}>
                                <Flex>
                                    <BaseDatePicker
                                        margin={"0 6px 0 6px"}
                                        value={get(filter, "from", null)}
                                        handleDate={(e) => {
                                            setFilter({
                                                ...filter,
                                                from: moment(e).format(
                                                    "YYYY-MM-DD"
                                                ),
                                            });
                                        }}
                                        placeholder={"Начало"}
                                    />
                                    <BaseDatePicker
                                        margin={"0 6px 0 6px"}
                                        value={get(filter, "to", null)}
                                        handleDate={(e) => {
                                            setFilter({
                                                ...filter,
                                                to: moment(e).format(
                                                    "YYYY-MM-DD"
                                                ),
                                            });
                                        }}
                                        placeholder={"Конец"}
                                    />

                                    <BaseSelect
                                        margin={"0 6px 0 6px"}
                                        placeholder="Страна"
                                        options={countries}
                                        value={get(filter, "countryId", null)}
                                        handleChange={(e) => {
                                            setFilter({
                                                ...filter,
                                                countryId: e,
                                            });
                                        }}
                                    />
                                </Flex>
                            </Col>
                            <Col xs={3} className={"text-right"}>
                                <BaseButton
                                    primary
                                    className={"mr-8"}
                                    handleClick={() =>
                                        applyFilter({ type: "" })
                                    }
                                >
                                    Поиск
                                </BaseButton>
                                <BaseButton
                                    danger
                                    className={"mr-8"}
                                    handleClick={() =>
                                        clearFilter({ type: "" })
                                    }
                                >
                                    Сбросить
                                </BaseButton>
                            </Col>
                            <Col xs={0.5}></Col>
                        </Row>
                        <Row style={{ alignItems: "center" }}>
                            <Col xs={12} className="mt-8 mb-8">
                                <hr />
                            </Col>
                        </Row>
                        <Row className={"mb-8"}>
                            <Col xs={9}>
                                <Flex>
                                    <BaseSelect
                                        margin={"0 6px 0 6px"}
                                        placeholder="Манифест"
                                        options={manifests}
                                        value={get(filter, "manifestId", null)}
                                        handleChange={(e) => {
                                            setFilter({
                                                ...filter,
                                                manifestId: e,
                                            });
                                        }}
                                    />
                                    <BaseSelect
                                        margin={"0 6px 0 6px"}
                                        placeholder="Страна"
                                        options={countries}
                                        value={get(
                                            filter,
                                            "manifestCountryId",
                                            null
                                        )}
                                        handleChange={(e) => {
                                            setFilter({
                                                ...filter,
                                                manifestCountryId: e,
                                            });
                                        }}
                                    />
                                    <Col>
                                        <Link to={"/email/manifest/oneprint"}>
                                            <BaseButton
                                                bordered
                                                disabled={
                                                    !get(
                                                        filter,
                                                        "manifestId",
                                                        0
                                                    )
                                                }
                                                style={
                                                    get(
                                                        filter,
                                                        "manifestId",
                                                        0
                                                    ) <= 0
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
                                    </Col>
                                </Flex>
                            </Col>
                            <Col xs={3} className={"text-right"}>
                                <BaseButton
                                    primary
                                    className={"mr-8"}
                                    handleClick={() =>
                                        applyFilter({ type: "withManifest" })
                                    }
                                >
                                    Поиск
                                </BaseButton>
                                <BaseButton
                                    danger
                                    className={"mr-8"}
                                    handleClick={() =>
                                        clearFilter({ type: "withManifest" })
                                    }
                                >
                                    Сбросить
                                </BaseButton>
                            </Col>
                            <Col xs={0.5}></Col>
                        </Row>
                        <Row style={{ alignItems: "center" }}>
                            <Col xs={12} className="mt-8 mb-8">
                                <hr />
                            </Col>
                        </Row>
                        {get(STATISTICS_DATA, "isFetched", false) ? (
                            <>
                                <Row>
                                    <Col xs={12} className={"mt-32 ml-32"}>
                                        <Flex>
                                            <Title md className={"mr-32"}>
                                                Количество почты:{" "}
                                            </Title>
                                            <Text xl>
                                                <NumericFormat
                                                    displayType="text"
                                                    value={get(
                                                        STATISTICS_DATA,
                                                        "data.totalCount",
                                                        ""
                                                    )}
                                                    thousandSeparator
                                                />
                                            </Text>
                                        </Flex>
                                    </Col>
                                    <Col xs={12} align={"center"}>
                                        <StatisticsPieChart
                                            data={get(
                                                STATISTICS_DATA,
                                                "data.manifestPostStatistics",
                                                []
                                            )}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="mt-8 mb-8">
                                        <hr />
                                    </Col>
                                </Row>
                                <Row className="mt-16">
                                    <Col xs={12} className={"mt-32 ml-32"}>
                                        <Flex>
                                            <Title md className={"mr-32"}>
                                                Вес почты:{" "}
                                            </Title>
                                            <Text xl>
                                                <NumericFormat
                                                    displayType="text"
                                                    value={get(
                                                        STATISTICS_DATA,
                                                        "data.totalWeight",
                                                        ""
                                                    )}
                                                    thousandSeparator
                                                />
                                            </Text>
                                        </Flex>
                                    </Col>
                                    <Col xs={12} className={"mt-32"}>
                                        <StatisticsBarChart
                                            data={get(
                                                STATISTICS_DATA,
                                                "data.manifestPostStatistics",
                                                []
                                            )}
                                            dataKey={"weight"}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="mt-8 mb-8">
                                        <hr />
                                    </Col>
                                </Row>
                                <Row className="mt-16">
                                    <Col xs={12} className={"mt-32 ml-32"}>
                                        <Flex>
                                            <Title md className={"mr-32"}>
                                                Кубический метр почты:{" "}
                                            </Title>
                                            <Text xl>
                                                <NumericFormat
                                                    displayType="text"
                                                    value={get(
                                                        STATISTICS_DATA,
                                                        "data.totalCbm",
                                                        ""
                                                    )}
                                                    thousandSeparator
                                                />
                                            </Text>
                                        </Flex>
                                    </Col>
                                    <Col xs={12} className={"mt-32"}>
                                        <StatisticsBarChart
                                            data={get(
                                                STATISTICS_DATA,
                                                "data.manifestPostStatistics",
                                                []
                                            )}
                                            dataKey={"cbm"}
                                        />
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <Row className={"mt-64"}>
                                <Col xs={12} align="center">
                                    <Text xl medium>
                                        Пожалуйста, выберите необходимые
                                        параметры в фильтре.
                                    </Text>
                                </Col>
                            </Row>
                        )}
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};
export default MyUHLStatisticsContainer;
