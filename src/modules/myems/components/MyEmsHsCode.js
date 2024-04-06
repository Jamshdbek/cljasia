import { Col, Container, Row } from 'react-grid-system'
import { BaseButton, BaseInput, BaseTable, Flex } from 'components'
import { useEffect, useState } from 'react'
import { MyemsApiService } from 'services/apiServices'
import { get, isEmpty } from 'lodash'
const MyEmsHsCode = ({ setIsHScode }) => {
    const [searchState, setSearchState] = useState({ search0: '', search1: '', type: 0 })
    const [data, setData] = useState()
    const [radio, setRadio] = useState(false)
    useEffect(() => {
        MyemsApiService.searchHsDB('')
            .then((res) => {
                if (res && res.data && res.data.success)
                    setData(res.data)

            })
    }, [])
    const handleSearch = () => {
        setIndex(null)
        radio ? MyemsApiService.searchHsCode({
            type: searchState.type,
            search: searchState.search0 != '' ? searchState.search0 : searchState.search1
        })
            .then((res) => {
                if (res && res.data && res.data.success)
                    setData(res.data)

            }) : MyemsApiService.searchHsDB(searchState.search0)
                .then((res) => {
                    if (res && res.data && res.data.success)
                        setData(res.data)

                }).catch(err => {
                    console.log(err)
                })
    }
    const handleSearchcheck = () => {
        setIndex(null)
        MyemsApiService.searchHsDB('')
            .then((res) => {
                if (res && res.data && res.data.success)
                    setData(res.data)

            })
    }
    const handleClear = () => {
        setSearchState({ search1: '', search0: '', type: 0 })
        setData([])
    }
    const [index, setIndex] = useState()
    const copyHsCode = (hsCode, id) => {
        // Clipboardga nusxalash funktsiyasi
        setIndex(id)
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = hsCode;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    };
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Flex justify={'end'}>
                        <h6 style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => {
                            setIsHScode(false)
                        }}>x</h6>
                    </Flex>
                </Col>
                <Col xs={12} >
                    <div style={{ padding: '10px' }}>
                        <label onChange={() => {
                            setRadio(false)
                            handleClear()
                            handleSearchcheck()
                        }}>Local{" "}
                            <input
                                checked={!radio}
                                type='radio' name='radio' />
                        </label>
                        <label
                            onChange={() => {
                                setRadio(true)
                                handleClear()
                            }
                            } style={{ marginLeft: '20px' }}>
                            Global{" "}
                            <input type='radio' checked={radio} name='radio' />
                        </label>
                    </div>
                </Col>
                <Col xs={12} className='mt-8'>
                    <Flex justify={'space-between'}>
                        <div>
                            <BaseInput
                                style={{ width: '200px' }}
                                onKeyDown={(e) => {
                                    console.log(e)
                                    e.code == 'Enter' &&
                                        handleSearch()
                                }}
                                placeholder='Name search'
                                disabled={searchState.search1 != ''}
                                value={searchState.search0}
                                handleInput={(value) => {
                                    setSearchState({ ...searchState, search0: value, type: 0 })
                                }} />
                            {radio && <BaseInput

                                style={{ width: '200px', marginLeft: '15px' }}
                                onKeyDown={(e) => {
                                    console.log(e)
                                    e.code == 'Enter' &&
                                        handleSearch()
                                }}
                                placeholder='HS code search'
                                disabled={searchState.search0 != ''}
                                value={searchState.search1}
                                handleInput={(value) => {
                                    setSearchState({ ...searchState, search1: value, type: 1 })
                                }} />}</div>
                        <div>

                            <BaseButton
                                handleClick={handleSearch}
                                primary>Поиск</BaseButton>
                            <BaseButton
                                style={{ marginLeft: '15px' }}
                                handleClick={handleClear}
                                danger>Сбросить</BaseButton>
                        </div>
                    </Flex>
                </Col>
                <Col xs={12}>
                    <BaseTable tableHeader={[
                        'HS code',
                        'Name',
                        // 'Выбрать'
                    ]}>{
                            !isEmpty(get(data, 'data', [])) ?
                                get(data, 'data', []).map((item, id) => {
                                    return <tr key={id}>
                                        <td>
                                            {get(item, 'hsCode', '')}{"ㅤㅤ"}
                                            <span style={{ cursor: 'pointer' }} onClick={() => copyHsCode(item.hsCode, id)}>
                                                {index != id ? <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z" />
                                                </svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                                    </svg>}
                                            </span>

                                        </td>
                                        <td>{get(item, 'productName', '')}</td>
                                    </tr>
                                }) : (
                                    <tr>
                                        <td colSpan={14}>
                                            No data
                                        </td>
                                    </tr>
                                )
                        }
                    </BaseTable>
                </Col>
            </Row>
        </Container>
    )
}

export default MyEmsHsCode