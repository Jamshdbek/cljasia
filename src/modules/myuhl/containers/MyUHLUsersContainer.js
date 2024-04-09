import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { get, isEmpty } from "lodash";
import {
    BaseBreadcrumb,
    Content,
    BaseTable,
    ContentLoader,
    BaseButton,
    BaseInput,
    Flex,
    Text,
    BaseSelect,
    BasePagination,
} from "components";
import { fetchAllClients, handleChangeFilter,handleClearFilter } from "app/slices/myuhlSlices/myuhlAllClients/myuhlAllClients";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateFormat } from "utils";
import { ReactSVG } from "react-svg";
import deleteIcon from "../../../../src/assets/images/icons/deleteIcon.svg";
import { toast } from "react-toastify";
import { useState } from "react";
import MyuhlApiService from "services/apiServices/myuhl";

const MyUhlUsersContainer = () => {
    const isFetched = true;
    const dispatch = useDispatch();
    const allClientsDate = useSelector((store) =>
        get(store, "myuhl.myuhlAllClientsSlice.data.myuhlAllClients.data", [])
    );
    const userList = allClientsDate.data;
    const [searchFilter , setFilter] = useState({search:""})
    const filter = useSelector(
        (store) => get(store, "myuhl.myuhlAllClientsSlice.filter", {})
    );

    useEffect(() => {
        dispatch(fetchAllClients(filter));
    }, [filter.size, filter.page]);
    const [loading, setLoading] = useState(false);
    const deleteClient = (id) => {
        try {
            setLoading(true);
            MyuhlApiService.DeleteUserData(id).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    toast.success("Success");
                    dispatch(fetchAllClients());
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.success(res.data.message);
                }
            }); 
        } catch (e) { console.log(e) }
    };
    const handleClear = () =>{
        dispatch(handleClearFilter())
        setFilter({...searchFilter,search:''})
        // dispatch(fetchAllClients(''))
        // console.log("clc")
    }
    
    useEffect(() => {
        dispatch(fetchAllClients(searchFilter))
    }, [searchFilter.search])

    useEffect(() => {
        dispatch(fetchAllClients(1));
        document.title = "Пользователи"
    }, []);
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            {
                                id: 1,
                                name: "Пользователи",
                                url: "/email/users",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content style={{ minHeight: "70vh" }}>
                        <Row style={{ alignItems: "center" }}></Row>
                        <Row className={"mb-8"}>
                            <Col xs={0.5}></Col>
                            <Col xs={4}>
                                <BaseInput
                                   value ={get(filter,'search','')}
                                    handleInput={(val) => {
                                        setFilter((searchFilter) => ({
                                            ...searchFilter,
                                            search: val,
                                        }));
                                        dispatch(handleChangeFilter({name:'search',value:val}))
                                    }}
                                    width="100%"
                                    placeholder={
                                        "Поиск по номеру телефона, ФИО или Email"
                                    }
                                    margin={"0 5px 0 0"}
                                />
                            </Col>
                            <Col xs={7} className={"text-right"}>
                                <BaseButton className={"mr-8"} primary>
                                    Поиск
                                </BaseButton>
                                <BaseButton danger className={"mr-2"} onClick={handleClear}>
                                    Сбросить
                                </BaseButton>
                            </Col>
                            <Col xs={0.5}></Col>
                        </Row>
                        <Row className={"mb-32"}>
                            <Col xs={12}>
                                {isFetched ? (
                                    <BaseTable
                                        tableHeader={[
                                            "Дата регистрации (год/месяц/день)",
                                            "Получатель",
                                            "К-во отправлений",
                                            "Email",
                                            "Номер телефона",
                                            "Устройство",
                                            "Удалить",
                                        ]}
                                    >
                                        {!isEmpty(userList) ? (
                                            userList.map((item, index) => (
                                                <tr key={index + 1}>
                                                    <td>
                                                        {dateFormat(
                                                            get(
                                                                item,
                                                                "createdAt",
                                                                "-"
                                                            )
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(item, "name", "-")}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "sendPostCount",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "email",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "phoneNumber",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "deviceType",
                                                            "-"
                                                        )}
                                                    </td>

                                                    <td>
                                                        <ReactSVG
                                                            onClick={() =>
                                                                deleteClient(
                                                                    get(
                                                                        item,
                                                                        "id",
                                                                        null
                                                                    )
                                                                )
                                                            }
                                                            src={deleteIcon}
                                                            className={
                                                                "cursor-pointer"
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={12}>No data</td>
                                            </tr>
                                        )}
                                    </BaseTable>
                                ) : (
                                    <ContentLoader />
                                )}
                            </Col>
                        </Row>
                        {get(allClientsDate, "paginationData.totalPages", 1) >
                            0 && (
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
                                                        handleChangeFilter({
                                                            name: "size",
                                                            value: value,
                                                        })
                                                    )
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
                                        current={get(filter, "page", 1)-1}
                                        value={get(filter, "page", 1)}

                                            onChange={({ selected }) => {
                                                dispatch(
                                                    handleChangeFilter({
                                                        name: "page",
                                                        value: selected+1,
                                                    })
                                                );
                                            }}
                                            pageCount={get(
                                                allClientsDate,
                                                "paginationData.totalPages",
                                                0
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

export default MyUhlUsersContainer;
