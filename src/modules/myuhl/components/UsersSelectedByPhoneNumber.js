import { BaseButton, BaseInput, BasePagination, BaseSelect, BaseTable, ContentLoader, Flex, Text } from "components";
import { useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import {
    handleChangeFilter,
    handleClearFilter,
    UsersSelectedByPhone,
    handleFind
} from "app/slices/myuhlSlices/myuhlUsersSelectedByPhone/UsersSelectedByPhoneNumber";
import { useEffect } from "react";

import { get, isEmpty, isEqual } from "lodash";
import { changePostItem } from "app/slices/myuhlPostSlices/createPostSlice/createPostSlice";
const UsersSelectedByPhoneNumber = ({
    setIsPhoneNumberSearch,
    remainingLimit,
    searchPhoneNum
}) => {
    const dispatch = useDispatch()
    const { filter, data, find } = useSelector(
        (store) => store.myuhl.myuhlAllPostsUsersSlice
    );
    const phoneNumber = useSelector(
        (store) => store.myuhlPost.myuhlPostCreate.newPost.to
    );

    useEffect(() => {
        dispatch(UsersSelectedByPhone({ ...filter, search: get(phoneNumber, 'phoneNumber[0].value', '') }));
        
    }, [filter.size, filter.page, phoneNumber]);
    useEffect(()=>{
        searchPhoneNum.length>0&& dispatch(
            handleChangeFilter(
                { name: "search", value: searchPhoneNum[0].value }
            )
        )
    },[searchPhoneNum])
    const handleSearch = () => {
        dispatch(UsersSelectedByPhone({
            size: 10,
            page: 1,
            search: filter.search
        }));
    }
    const findDataById = async (id) => {
        const foundData = await get(data, 'myuhlAllPostsUsers', []).find(item => item.id === id);

        dispatch(handleFind(foundData));
        remainingLimit(get(foundData, 'passport', ''))
        dispatch(
            changePostItem({
                value: get(foundData, 'address', ''),
                name: 'address',
                id: 'to'
            })
        );
        dispatch(
            changePostItem({
                value: Number(get(foundData, 'countryId', '')),
                name: 'countryId',
                id: 'to'
            })
        );
        dispatch(
            changePostItem({
                value: Number(get(foundData, 'regionId', '')),
                name: 'regionId',
                id: 'to'
            })
        );
        dispatch(
            changePostItem({
                value: Number(get(foundData, 'districtId', '')),
                name: 'districtId',
                id: 'to'
            })
        );

        dispatch(
            changePostItem({
                value: get(foundData, 'pinfl', ''),
                name: 'pinfl',
                // id:'to'
            })
        );
        dispatch(
            changePostItem({
                value: get(foundData, 'name', ''),
                name: 'name',
                id: 'to'
            })
        );
        dispatch(
            changePostItem({
                value: get(foundData, 'passport', ''),
                name: 'passport',
                // id: 'to'
            })
        );
        dispatch(
            changePostItem({
                value: get(foundData, 'phoneNumber', '').split(',').map((val) => {
                    return {
                        value: val,
                        label: val
                    }
                }),
                name: 'phoneNumber',
                id: 'to'
            })
        );
        setIsPhoneNumberSearch(false)
        dispatch(handleClearFilter())
        dispatch(handleClearFilter({
            page: 0,
            size: 10,
            search: ''
        }))
    }
    const handleClear = () => {
        dispatch(handleClearFilter())
        dispatch(UsersSelectedByPhone({
            page: 0,
            size: 10,
            search: ''
        }))

    }
    const handleExit = () => {
        setIsPhoneNumberSearch(false)
        dispatch(handleClearFilter())
        dispatch(UsersSelectedByPhone({
            page: 0,
            size: 10,
            search: ''
        }))
    }
    return <>
        <Container fluid>
            <Row style={{ marginTop: '-15px', marginRight: '-25px' }}>
                <Col xs={12}>
                    <Flex justify={'end'}>
                        <h6 style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => handleExit()}>x</h6>
                    </Flex>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col xs={6}>
                    <BaseInput
                        value={get(filter, 'search', '')}
                        handleInput={(e) => {
                            dispatch(handleChangeFilter({
                                name: 'search',
                                value: e
                            }))

                        }}
                        onKeyDown={(e) => { isEqual(get(e, 'key', ''), 'Enter') && handleSearch() }}

                        width={'100%'}
                        placeholder="Поиск по номера телефона/ФИО/серия паспорта/ПИНФЛ ..." />
                </Col>
                <Col xs={6}>
                    <Flex justify={'end'} style={{ gap: '10px' }}>
                        <BaseButton handleClick={handleSearch} primary>Поиск</BaseButton>
                        <BaseButton handleClick={handleClear} danger>Сбросить</BaseButton>
                    </Flex>
                </Col>
            </Row>
            <Row className="mt-32">
                <Col xs={12} >
                    {
                        get(data, 'loading', false) ?
                            (<Flex
                                style={{ marginTop: "15%" }}
                                justify="center"
                            >
                                <ContentLoader />
                            </Flex>) :
                            (<BaseTable
                                tableHeader={[
                                    'Номер телефона',
                                    'ФИО (Получатель',
                                    'Паспорт/ID карта Серия и номер',
                                    'Страна',
                                    'Регион',
                                    'Город',
                                    'ПИНФЛ',
                                    'Адрес',
                                    'Печать',
                                ]}
                            >
                                {!isEmpty(get(data, 'myuhlAllPostsUsers', [])) ?
                                    get(data, 'myuhlAllPostsUsers', []).map((item, index) => {
                                        return <tr
                                            key={get(item, 'id', '')}
                                        >
                                            <td>{get(item, 'phoneNumber', '').split(',')[0]}</td>
                                            <td>{get(item, 'name', '')}</td>
                                            <td>{get(item, 'passport')}</td>
                                            <td>{get(item, 'countryCode', '')}</td>
                                            <td>{get(item, 'region', '')}</td>
                                            <td>{get(item, 'district', '')}</td>
                                            <td>{get(item, 'pinfl', '')}</td>
                                            <td>{get(item, 'address', '')}</td>
                                            <td>
                                                <BaseButton handleClick={() => findDataById(get(item, 'id', ''))} bordered>Выбрать</BaseButton>
                                            </td>
                                        </tr>

                                    }) :
                                    <tr>
                                        <td colSpan={14}>
                                            No data
                                        </td>
                                    </tr>
                                }
                            </BaseTable>)


                    }
                </Col>
            </Row>
            <Row
                align={"center"}
                className={"mt-32"}
            >
                <Col xs={4}>
                    {get(data, 'pagination.totalPages', '') > 0 && <Flex>

                        <Text>Show</Text>
                        <BaseSelect
                            handleChange={(value) => {
                                dispatch(
                                    handleChangeFilter({
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
                    </Flex>}
                </Col>
                <Col xs={8}>
                    {
                        // get(data, 'pagination.totalPages', '') >= 0 &&
                        <BasePagination
                            current={get(filter, "page", 1) - 1}
                            value={get(filter, "page", 1)}
                            onChange={({ selected }) => {
                                dispatch(
                                    handleChangeFilter({
                                        name: "page",
                                        value: selected + 1,
                                    })
                                );
                            }}
                            pageCount={get(data, 'pagination.totalPages', 0)}
                        />
                    }
                </Col>
            </Row>
        </Container>
    </>
}

export default UsersSelectedByPhoneNumber