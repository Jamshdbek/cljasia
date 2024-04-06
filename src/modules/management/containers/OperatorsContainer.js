import React, { useEffect, useState } from "react";
import _, { filter, get, isEmpty } from "lodash";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { ReactSVG } from "react-svg";
import ThreePoint from "../../../assets/images/icons/border-menu-three-dots.svg";

import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    BaseSelect,
    BaseTable,
    Flex,
    ContentLoader,
    BaseInput,
    Text,
    BasePagination,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import {  fetchAllManagementOperators, fetchAllManagementOperatorsType } from "app/slices/managementSlices/operatorSlice/operatorSlice";
import { dateFormat } from "utils";
import { CommonService } from "services/apiServices";
import { type } from "@testing-library/user-event/dist/type";
import { fetchAccountTypes } from "app/slices/commonSlices/accountTypesSlice";


const OperatorsContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const managementOperators = useSelector((store) =>
        get(store, "management.operatorSlice.data.managementOperators", [])
    );
    const paginationData = useSelector((store) =>
        get(store, "management.operatorSlice.data.managementOperators.data.paginationData", [])
    );

    const isFetched = get(managementOperators, "success", false);
    const { data } = get(managementOperators, "data", []);

    const [filter, setFilter] = useState({
        page: "", search:"" , id:''
    })
   
    useEffect(() => {
        document.title = "Менеджмент | Операторы"
    }, [])

   
 useEffect(() => {
      
     dispatch(fetchAccountTypes())
        dispatch(fetchAllManagementOperators(filter));

    }, [filter.page, filter.search]);
    useEffect(() => {
        dispatch(fetchAllManagementOperatorsType(filter.id))
    },[filter.id])
   
   
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Менеджмент", url: "/management" },
                            {
                                id: 2,
                                name: "Операторы",
                                url: "/management/operators",
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
                                        <Flex justify={"flex-start"}>
                                            <BaseSelect
                                               
                                                handleChange={(e) =>{
                                                    setFilter((filter) => ({
                                                        ...filter,
                                                        id: e,
                                                    }))
                                                }}
                                                defaultValue={' '}
                                                options={[
                                                    {
                                                        label: "Super Admin",
                                                        value:1
                                                    },
                                                    {
                                                        label: "Dealer",
                                                        value: 2,
                                                        
                                                    },
                                                    {
                                                        label: "All",
                                                        value: ' '
                                                    },
                                                ]}
                                                margin={"0 12px 0 12px"}
                                                width={"180px"}
                                                placeholder="All"
                                            />
                                            <BaseInput
                                                handleInput={(val) => {
                                                    setFilter((filter) => ({
                                                        ...filter,
                                                        search: val,
                                                    }));
                                                }}
                                                placeholder={
                                                    "Search by name/email/id ..."
                                                }
                                                margin={"0 5px 0 0"}
                                            />
                                        </Flex>
                                    </Col>
                                    <Col xs={4} className={"text-right"}>
                                        <Flex justify={"flex-end"}>
                                            <BaseButton
                                                primary
                                                handleClick={() =>
                                                    history.push(
                                                        "/management/operators/add"
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
                                            "ID",
                                            "Имя",
                                            "Фамилия",
                                            "Email",
                                            "Категория",
                                            "Добавлено",
                                            "Последний сеанс",
                                            "Статус",
                                            "Действие",
                                        ]}
                                    >
                                        {!isEmpty(data) ? (
                                            data.map((item, index) => (
                                                <tr key={get(item, "id", null)}>
                                                    <td> {get(item, "id", null)} </td>
                                                    <td> {get(item, "name", null)} </td>
                                                    <td> {get(item, "lastName", null)} </td>
                                                    <td> {get(item, "email", null)} </td>
                                                    <td> {get(item, "accountTypeName", null)} </td>

                                                    <td style={{ minWidth: "120px" }}>
                                                        {get(
                                                            item,
                                                            "createdTime"
                                                        ) ? (
                                                            <Text xs dark>
                                                                {dateFormat(
                                                                    get(
                                                                        item,
                                                                        "createdTime"
                                                                    )
                                                                )}
                                                            </Text>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td style={{ minWidth: "120px" }}>
                                                        {get(
                                                            item,
                                                            "lastActionTime"
                                                        ) ? (
                                                            <Text xs>
                                                                {dateFormat(
                                                                    get(
                                                                        item,
                                                                        "lastActionTime"
                                                                    )
                                                                )}
                                                            </Text>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(item, "isBlocked") === true ?
                                                        (<Text xs medium danger >
                                                            Inactive
                                                        </Text>) : (<Text xs medium success >
                                                            Active
                                                        </Text>)} </td>
                                                    <td>
                                                        <Link
                                                            to={
                                                                "/management/operators/edit/" + get(item, "id", null)
                                                            }
                                                        >
                                                            <ReactSVG
                                                                src={ThreePoint}
                                                                className={
                                                                    "cursor-pointer"
                                                                }
                                                            />
                                                        </Link>
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
                        {get(paginationData, "totalPages") > 0 && (
                            <Row
                                align={"center"}
                                className={"pagination_position"}
                            >
                                <Col xs={4}>
                                </Col>
                                <Col xs={8}>
                                    <BasePagination
                                        current={get(paginationData, "currentPageNumber", 0)}
                                        onChange={({ selected }) => {
                                            setFilter((filter) => ({
                                                ...filter,
                                                page: selected
                                            }))
                                        }}
                                        pageCount={get(paginationData, "totalPages", 0)}
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

export default OperatorsContainer;
