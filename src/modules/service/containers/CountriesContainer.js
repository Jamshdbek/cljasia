import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { ReactSVG } from "react-svg";
import ThreePoint from "../../../assets/images/icons/border-menu-three-dots.svg";
import removeIcon from "assets/images/icons/deleteIcon.svg";

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
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServiceAllCountries } from "app/slices/serviceSlices/allCountriesSlice/allCountriesSlice";
import { ServiceApiService } from "services/apiServices";
import { toast } from "react-toastify";

const CountriesContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const serviceAllCountries = useSelector((store) =>
        get(store, "service.allCountries.data.serviceAllCountries", [])
    );
    const [loading, setLoading] = useState(false);

    const isFetched = get(serviceAllCountries, "success", false);
    const data = get(serviceAllCountries, "data", []);

    useEffect(() => {
        dispatch(fetchAllServiceAllCountries());
    }, []);

    const deleteCountryData = (id) => {
        try {
            setLoading(true);
            ServiceApiService.DeleteCountryData(id).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    toast.success("Success");
                    dispatch(fetchAllServiceAllCountries());
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.success(res.data.message);
                }
            });
        } catch (e) {}
    };

    return (
        <Container fluid>
            {loading && <Loader />}
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Сервис", url: "/service" },
                            {
                                id: 2,
                                name: "Страны",
                                url: "/service/countries",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row>
                            <Col xs={12} className={"mb-16"}>
                                <Row align={"center"}>
                                    <Col xs={12} className={"text-right"}>
                                        <Flex justify={"flex-end"}>
                                            <BaseButton
                                                primary
                                                handleClick={() =>
                                                    history.push(
                                                        "/service/countries/add"
                                                    )
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
                                            // "Удалить",
                                            "ID",
                                            "Наименование",
                                            "Код",
                                            "Статус",
                                            "Действия",
                                        ]}
                                    >
                                        {!isEmpty(data) ? (
                                            data.map((item, index) => (
                                                <tr key={get(item, "id", null)}>
                                                    {/* <td>
                                                        <ReactSVG
                                                            src={removeIcon}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                deleteCountryData(
                                                                    get(
                                                                        item,
                                                                        "id",
                                                                        null
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </td> */}
                                                    <td>
                                                        {" "}
                                                        {get(
                                                            item,
                                                            "id",
                                                            null
                                                        )}{" "}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        {get(
                                                            item,
                                                            "name",
                                                            null
                                                        )}{" "}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        {get(
                                                            item,
                                                            "code",
                                                            null
                                                        )}{" "}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        {get(
                                                            item,
                                                            "isActive"
                                                        ) == true ? (
                                                            <Text
                                                                xs
                                                                medium
                                                                success
                                                            >
                                                                Active
                                                            </Text>
                                                        ) : (
                                                            <Text
                                                                xs
                                                                medium
                                                                danger
                                                            >
                                                                Inactive
                                                            </Text>
                                                        )}{" "}
                                                    </td>
                                                    <td>
                                                        <ReactSVG
                                                            onClick={() =>
                                                                history.push({
                                                                    pathname:
                                                                        "/service/countries/edit/" +
                                                                        get(
                                                                            item,
                                                                            "id",
                                                                            null
                                                                        ),
                                                                    state: {
                                                                        id: get(
                                                                            item,
                                                                            "id",
                                                                            null
                                                                        ),
                                                                    },
                                                                })
                                                            }
                                                            src={ThreePoint}
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
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default CountriesContainer;
