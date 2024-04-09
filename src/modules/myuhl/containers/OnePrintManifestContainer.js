import React, { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-grid-system";
import { get, isEmpty } from "lodash";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Text,
    ContentLoader,
    Flex,
    table,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllManifests } from "app/slices/myuhlSlices/manifestAllSlice/manifestAllSlice";
import { Link } from "react-router-dom";
import { fetchCourierCompanies } from "app/slices/myuhlSlices/manifestCourierCompaniesSlice/manifestCourierCompaniesSlice";
import styled from "styled-components";
import moment from "moment";
import ReactToPrint from "react-to-print/lib";
import { useRef } from "react";
import { NumericFormat } from "react-number-format";

const PrintManifestsTable = styled.div`
    width: 100%;
    table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
    }
    th,
    td {
        border: 1px solid #000;
        word-wrap: break-word;
        padding: 12px 0 12px 5px;
        font-weight: 500;
        font-size: 12px;
        color: #000;
    }
`;

const OnePrintManifestContainer = () => {
    const dispatch = useDispatch();
    const manifestListRef = useRef();

    const reysNumber = useSelector(
        (store) => store.myuhl.manifestAllSlice.reysNumber
    );

    const manifestsAllData = useSelector((store) =>
        get(store, "myuhl.manifestOneSlice.data.manifestOne.data", [])
    );

    const isManifestsAllDataFetched = useSelector((store) =>
        get(store, "myuhl.manifestOneSlice.data.loading", true)
    );

    useEffect(() => {
        dispatch(fetchCourierCompanies());
    }, []);

    const isCourierCompaniesFetched = useSelector((store) =>
        get(store, "myuhl.manifestCourierCompaniesSlice.data.loading", true)
    );

    const ToCourierCompanies = useSelector((store) =>
        get(
            store,
            "myuhl.manifestCourierCompaniesSlice.data.courierCompanies.data.[0]",
            []
        )
    );

    const FromCourierCompanies = useSelector((store) =>
        get(
            store,
            "myuhl.manifestCourierCompaniesSlice.data.courierCompanies.data[1]",
            []
        )
    );

    const manfiestWTotal = useMemo(() => {
        const rslt = {};
        rslt["code"] = "Total";
        rslt["totalProductPrice"] = manifestsAllData
            .map((manifest) => ({
                ...manifest,
                postProducts: get(manifest, "postProducts", []).reduce(
                    (accumulator, currentValue) =>
                        accumulator + +currentValue.price,
                    0
                ),
            }))
            .reduce(
                (accumulator, currentValue) =>
                    accumulator + +currentValue.postProducts,
                0
            );
        rslt["weight"] = manifestsAllData.reduce(
            (total, item) => total + +item.weight,
            0
        );

        return [...manifestsAllData, rslt];
    }, [manifestsAllData]);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={12} className={"mb-8"}>
                        <BaseBreadcrumb
                            items={[
                                {
                                    id: 1,
                                    name: "Манифест",
                                    url: "/email/manifest",
                                },
                                {
                                    id: 2,
                                    name: "Распечатать",
                                    url: "/email/manifest/print",
                                },
                            ]}
                        />
                    </Col>
                </Row>
                {!isManifestsAllDataFetched && !isCourierCompaniesFetched ? (
                    <Row>
                        <Col xs={12} align="center" ref={manifestListRef}>
                            <Content
                                style={{
                                    width: "1000px",
                                    border: "none",
                                    borderShadow: "none",
                                }}
                            >
                                <Row justify="space-around" className="mt-32">
                                    <Col xs={4} className="card">
                                        <Text bold>
                                            Courier company's name and address{" "}
                                        </Text>{" "}
                                        {get(ToCourierCompanies, "name", "")}{" "}
                                        {get(ToCourierCompanies, "address", "")}{" "}
                                    </Col>
                                    <Col xs={4} className="card">
                                        <Text bold>
                                            Courier company's name and address
                                        </Text>{" "}
                                        {get(FromCourierCompanies, "name", "")}{" "}
                                        {get(
                                            FromCourierCompanies,
                                            "address",
                                            ""
                                        )}{" "}
                                    </Col>
                                </Row>
                                <Row className={"mb-32 mt-64"}>
                                    <Col xs={12}>
                                        <PrintManifestsTable>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={9}>
                                                            <Text bold>
                                                                {" "}
                                                                Name of
                                                                documents in
                                                                cargo manifest/
                                                                Перечень
                                                                сведений,
                                                                указываемых в
                                                                манифесте{" "}
                                                            </Text>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan={9}>
                                                            {/* <Text
                                                                xs
                                                                dark
                                                                bold
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    left: "8px",
                                                                }}
                                                            >
                                                                Номер рейса:{" "}
                                                                {reysNumber}
                                                            </Text> */}
                                                            <Text bold>
                                                                {" "}
                                                                Waybill name/
                                                                Номер
                                                                транспортной
                                                                накладной -{" "}
                                                                {reysNumber}
                                                            </Text>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>№</th>
                                                        <th>
                                                            Invoice numbers/
                                                            Номера инфойсов
                                                        </th>
                                                        <th>
                                                            {" "}
                                                            Receiver's name/
                                                            Ф.И.О получателя
                                                        </th>
                                                        <th>
                                                            PINFL / ПИНФЛ
                                                            получателя
                                                        </th>
                                                        <th>
                                                            Passport number/
                                                            Серия и № паспорта
                                                            получателя
                                                        </th>
                                                        <th>
                                                            Gross weight (kg) /
                                                            Вес брутто посылки
                                                            (кг)
                                                        </th>
                                                        <th>
                                                            Total price in $ /
                                                            Итого цена $
                                                        </th>
                                                        <th>
                                                            items/ Наименования
                                                        </th>
                                                        <th>Address/ Адресс</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {!isEmpty(
                                                        manfiestWTotal
                                                    ) ? (
                                                        manfiestWTotal.map(
                                                            (item, index) => (
                                                                <tr
                                                                    key={
                                                                        index +
                                                                        1
                                                                    }
                                                                >
                                                                    <td>
                                                                        {get(
                                                                            item,
                                                                            "code",
                                                                            ""
                                                                        ) !=
                                                                        "Total"
                                                                            ? index +
                                                                              1
                                                                            : ""}
                                                                    </td>
                                                                    <td>
                                                                        {get(
                                                                            item,
                                                                            "code",
                                                                            ""
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {get(
                                                                            item,
                                                                            "receiver",
                                                                            ""
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {get(
                                                                            item,
                                                                            "pinfl",
                                                                            ""
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {get(
                                                                            item,
                                                                            "passport",
                                                                            ""
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <NumericFormat
                                                                            displayType="text"
                                                                            value={
                                                                                get(
                                                                                    item,
                                                                                    "weight",
                                                                                    0
                                                                                ) /
                                                                                1000
                                                                            }
                                                                            thousandSeparator={
                                                                                true
                                                                            }
                                                                            fixedDecimalScale={
                                                                                true
                                                                            }
                                                                            decimalScale={
                                                                                2
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <NumericFormat
                                                                            displayType="text"
                                                                            value={get(
                                                                                item,
                                                                                "totalProductPrice",
                                                                                0
                                                                            )}
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
                                                                        {!isEmpty(
                                                                            get(
                                                                                item,
                                                                                "postProducts",
                                                                                []
                                                                            )
                                                                        ) ? (
                                                                            get(
                                                                                item,
                                                                                "postProducts",
                                                                                []
                                                                            ).map(
                                                                                (
                                                                                    item,
                                                                                    index
                                                                                ) => (
                                                                                    <a
                                                                                        key={
                                                                                            index +
                                                                                            1
                                                                                        }
                                                                                    >
                                                                                        {get(
                                                                                            item,
                                                                                            "productName",
                                                                                            ""
                                                                                        )}
                                                                                        <br></br>
                                                                                    </a>
                                                                                )
                                                                            )
                                                                        ) : (
                                                                            <>

                                                                            </>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {get(
                                                                            item,
                                                                            "address",
                                                                            ""
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                    ) : (
                                                        <tr>
                                                            <td>1</td>
                                                            <td>2</td>
                                                            <td>3</td>
                                                            <td>4</td>
                                                            <td>5</td>
                                                            <td>6</td>
                                                            <td>7</td>
                                                            <td>8</td>
                                                            <td>9</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </PrintManifestsTable>
                                    </Col>
                                </Row>
                                <Row className="mt-64 mb-16 ml-8">
                                    <Text>
                                        SIGNATURE AND STAMP/ ПОДПИСЬ И ПЕЧАТЬ
                                    </Text>
                                </Row>
                                <Row className="mt-8 mb-64 ml-8">
                                    <Text>
                                        Description/ Примечание:
                                        __________________________________________{" "}
                                    </Text>
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
            <Row>
                {!isManifestsAllDataFetched && !isCourierCompaniesFetched ? (
                    <Col xs={12} className={"mt-32 mb-64"} align="center">
                        <ReactToPrint
                            trigger={() => {
                                return <BaseButton primary>Печать</BaseButton>;
                            }}
                            content={() => manifestListRef.current}
                            pageStyle={"print"}
                            documentTitle={"Манифест лист"}
                        />
                    </Col>
                ) : (
                    <></>
                )}
            </Row>
        </>
    );
};

export default OnePrintManifestContainer;
