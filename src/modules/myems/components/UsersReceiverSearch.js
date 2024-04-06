import { changePostItem } from "app/slices/myemsSlices/addPostMyems/addPostMyems"
import { UsersSelectedByPhone, handleChangeFilter, handleClearFilter, handleFind } from "app/slices/myemsSlices/getAllReceivers/getAllReceivers"
import { BaseButton, BaseInput, BasePagination, BaseSelect, BaseTable, ContentLoader, Flex, Text } from "components"
import { get, isEmpty, isEqual } from "lodash"
import { useEffect } from "react"
import { Col, Container, Row } from "react-grid-system"
import { useDispatch, useSelector } from "react-redux"



const UserReceiverSearch = ({
    setIsPhoneNumberSearch,
}) => {
    const dispatch = useDispatch()
    const dispatchNewPostInfo = ({ value, name, id, index }) => {
        dispatch(
            changePostItem({
                value,
                name,
                id,
                index,
            })
        );
    };
    const { filter, data, find } = useSelector((store) =>
        get(store, 'myems.myemslAllPostsUsersSlice', ''))
    useEffect(() => {
        dispatch(UsersSelectedByPhone(filter))
    }, [filter.size, filter.page])

    const findDataById = async (id) => {
        const foundData = await get(data, 'myemslAllPostsUsers', []).find(item => item.id === id);
        console.log(foundData)
        dispatch(handleFind(foundData));
        
        dispatchNewPostInfo({
            id: "to",
            value: get(foundData, 'phoneNumber', ''),
            name: "phoneNumber",
        })
        dispatchNewPostInfo({
            id: "to",
            value: get(foundData, 'countryCode', ''),
            name: "countryCd",
        })
        dispatchNewPostInfo({
            id: "to",
            name: "index",
            value: get(foundData, 'zipCode', ''),
        });
        dispatchNewPostInfo({
            id: "to",
            name: "name",
            value: get(foundData, 'name', ''),
        });
        dispatchNewPostInfo({
            id: "to",
            name: "address1",
            value: get(foundData, 'address1', ''),
        });
        dispatchNewPostInfo({
            id: "to",
            name: "address2",
            value: get(foundData, 'address2', ''),
        });
        dispatchNewPostInfo({
            id: "to",
            name: "address3",
            value: get(foundData, 'address3', ''),
        });
        setIsPhoneNumberSearch(false)
        handleClear()
    }
    const handleClear = () => {
        dispatch(handleClearFilter())
        dispatch(UsersSelectedByPhone({
            page: 0,
            size: 10,
            search: ''
        }))

    }
    const handleSearch = () => {
        dispatch(UsersSelectedByPhone(filter))
    }

    return <>
        <Container >
            <Row style={{ marginTop: '-15px', marginRight: '-25px' }}>
                <Col xs={12}>
                    <Flex justify={'end'}>
                        <h6 style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => {
                            setIsPhoneNumberSearch(false)
                            handleClear()
                        }}>x</h6>
                    </Flex>
                </Col>
            </Row>
        </Container>
        <Container >
            <Row>
                <Col xs={6}>
                    <BaseInput
                        onChange={(e) => {
                            dispatch(handleChangeFilter({
                                name: 'search',
                                value: e.target.value
                            }))
                        }}
                        value={get(filter, 'search', '')}
                        onKeyDown={(e) => {
                            isEqual(get(e, 'key', ''), 'Enter') && handleSearch()
                        }}

                        width={'100%'}
                        placeholder="Поиск по номера телефона/ФИО..." />
                </Col>
                <Col xs={6}>
                    <Flex justify={'end'} style={{ gap: '10px' }}>
                        <BaseButton
                            handleClick={handleSearch}
                            primary>Поиск</BaseButton>
                        <BaseButton handleClick={handleClear} danger>Сбросить</BaseButton>
                    </Flex>
                </Col>
            </Row>
            <Row className="mt-32">
                <Col xs={12}>
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
                                    'ФИО (Получатель)',
                                    'Страна',
                                    'Регион',
                                    'Город',
                                    'Адрес',
                                    'Печать'
                                ]}
                            >
                                {
                                    !isEmpty(get(data, 'myemslAllPostsUsers', [])) ?
                                        get(data, 'myemslAllPostsUsers', []).map((item, index) => {
                                            return <tr key={index}>
                                                <td>{get(item, 'phoneNumber', '')}</td>
                                                <td>{get(item, 'name', '')}</td>
                                                <td>{get(item, 'countryCode', '').split(' ')[0]}</td>
                                                <td>{get(item, 'address1', '')}</td>
                                                <td>{get(item, 'address2', '')}</td>
                                                <td>{get(item, 'address3', '')}</td>
                                                <td>
                                                    <BaseButton
                                                        handleClick={() =>
                                                            findDataById(get(item, 'id', '')
                                                            )}
                                                        bordered>Выбрать</BaseButton>
                                                </td>
                                            </tr>
                                        }) : (
                                            <tr>
                                                <td colSpan={14}>
                                                    No data
                                                </td>
                                            </tr>
                                        )
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

export default UserReceiverSearch