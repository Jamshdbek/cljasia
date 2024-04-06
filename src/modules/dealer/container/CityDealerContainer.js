import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { Link, useHistory, useLocation, useParams, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { ReactSVG } from "react-svg";
import glasses from "../../../assets/images/icons/glasses.svg";

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
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityDealersPrices } from "app/slices/dealerSlices/cityDealersPriceSlice/cityDealersPriceSlice";

const CityDealerContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = useParams();
    const { state } = useLocation();
    const dealerId = id;

    const cityDealersPrices = useSelector((store) =>
        get(store, "dealer.cityDealersPrices.data.cityDealersPrices", [])
    );
    const data = get(cityDealersPrices, "data.data", []);
    const isFetched = get(cityDealersPrices, "success", false);

    const toDetail = data.map((id) => {
        return id.toCountryId
    })

    const paginationData = useSelector((store) =>
        get(store, "dealer.cityDealersPrices.data.cityDealersPrices.data.paginationData", [])
    );

    const totalPages = paginationData?.totalPages
    const pageNumber = paginationData?.currentPageNumber;
    const pageSize = paginationData?.pageSize;
    const [filter, setFilter] = useState({
        page: 0,
        size: 10,
    });

    useEffect(() => {
        dispatch(fetchCityDealersPrices(
            {
                dealerId: dealerId,
                size: filter.size,
                page: filter.page
            }));
    }, [filter.size, filter.page, dealerId]);
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Дилер", url: "/dealer" },
                            {
                                id: 2,
                                name: "Дилерская цена",
                                url: "/dealer/dealerprice",
                            },
                            {
                                id: 3,
                                name: `${get(state, "dealerLastName", "")} ${get(state, "dealerName", "")} `,
                                url: "/dealer/dealerprice/citydealer",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row>
                            <Col xs={12} className={"mb-16"}>
                                <Row align={"center"}>
                                    <Col xs={8}>
                                    </Col>
                                    <Col xs={4} className={"text-right"}>
                                        <Flex justify={"flex-end"}>
                                            <BaseButton
                                                primary
                                                handleClick={() =>
                                                    history.push({
                                                        pathname:
                                                            "/dealer/dealerprice/add/" +
                                                            get(
                                                                state,
                                                                "dealerId",
                                                                null
                                                            ),
                                                        state: {
                                                            dealerId: get(
                                                                state,
                                                                "dealerId",
                                                                null
                                                            ),
                                                            dealerName: get(
                                                                state,
                                                                "dealerName",
                                                                null
                                                            ),
                                                            dealerLastName: get(
                                                                state,
                                                                "dealerLastName",
                                                                null
                                                            ),
                                                          
                                                            toCountryIds: toDetail
                                                        },
                                                    })
                                                }
                                            >
                                                Добавить
                                            </BaseButton>
                                        </Flex>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} className={"mb-32"}>
                                {isFetched ? (
                                    <BaseTable
                                        tableHeader={[
                                            "ID",
                                            "Страна отправитель",
                                            "Страна получатель",
                                            "Статус",
                                            "Действие",
                                        ]}
                                    >
                                        {!isEmpty(data) ? (
                                            data.map((item, index) => (
                                                <tr key={index + 1}>
                                                    <td> {get(item, "priceId", null)} </td>
                                                    <td> {get(item, "fromCountryName", null)} </td>
                                                    <td> {get(item, "toCountryName", null)} </td>
                                                    <td> {get(item, "isActive") == true ?
                                                        (<Text xs medium success >
                                                            Active
                                                        </Text>) : (<Text xs medium danger >
                                                            Inactive
                                                        </Text>)} </td>
                                                    <td>
                                                        <ReactSVG
                                                            onClick={() =>
                                                                history.push({
                                                                    pathname:
                                                                        "/dealer/dealerprice/citydealer/show/" +
                                                                        get(
                                                                            item,
                                                                            "priceId",
                                                                            null
                                                                        ),
                                                                    state: {
                                                                        priceId: get(
                                                                            item,
                                                                            "priceId",
                                                                            null
                                                                        ),
                                                                        dealerName: get(
                                                                            item,
                                                                            "dealerName",
                                                                            null
                                                                        ),
                                                                        dealerLastName: get(
                                                                            state,
                                                                            "dealerLastName",
                                                                            null
                                                                        ),

                                                                        dealerId: get(
                                                                            state,
                                                                            "dealerId",
                                                                            null
                                                                        ),
                                                                        fromCountryId: get(
                                                                            item,
                                                                            "fromCountryId",
                                                                            null
                                                                        ),
                                                                        fromCountryName: get(
                                                                            item,
                                                                            "fromCountryName",
                                                                            null
                                                                        ),
                                                                        toCountryId: get(
                                                                            item,
                                                                            "toCountryId",
                                                                            null
                                                                        ),
                                                                        toCountryName: get(
                                                                            item,
                                                                            "toCountryName",
                                                                            null
                                                                        ),
                                                                        isActive: get(
                                                                            item,
                                                                            "isActive",
                                                                            null
                                                                        ),

                                                                    },
                                                                })
                                                            }
                                                            src={glasses}
                                                            className={
                                                                "cursor-pointer"
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={10}>No data</td>
                                            </tr>
                                        )}
                                    </BaseTable>
                                ) : (
                                    <ContentLoader />
                                )}
                            </Col>
                        </Row>
                        {totalPages > 0 && (
                            <Row align={"center"}>
                                <Col xs={4}>
                                    <Flex>
                                        <Text>Show</Text>
                                        <BaseSelect
                                            disabled
                                            handleChange={({ value }) =>
                                                setFilter((filter) => ({
                                                    ...filter,
                                                    size: value,
                                                }))
                                            }
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
                                        current={pageNumber}
                                        onChange={({ selected }) =>
                                            setFilter((filter) => ({
                                                ...filter,
                                                page: selected,
                                            }))
                                        }
                                        pageCount={totalPages}
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

export default CityDealerContainer;
