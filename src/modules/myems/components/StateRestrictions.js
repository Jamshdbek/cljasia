import { Container, Row, Col } from "react-grid-system"
import { BaseTextarea, Flex } from "components"
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from "react"
import { MyemsApiService } from "services/apiServices"
import { get } from "lodash"
import styled from "styled-components"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"

const TableBase = styled.table`
   width: 100%;
        border-collapse: collapse;
    th{
        border: 1px solid #000;
        padding: 6px 0 6px 3px;
        font-weight: 800;
    }
    td {
        border: 1px solid #000;
        padding: 6px 0 6px 3px;
        font-weight: 400;
        text-align: center;
        color: inherit;
    }
`

const StateRestrictions = ({
    setIsRestrictions,
    NationInfo,
}) => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState()
    useEffect(() => {
        MyemsApiService.getNationDetails(search)
            .then(res => {
                if (res && res.data && res.data.success)
                    setData(res.data.data)
            })
    }, [search])
    const sendcondnoteFunction = (item,areanm='') => {
    const arrayTabs =  get(item, `${areanm?'areanm':'sendcondnote'}`, '').split('ㅇ').slice(1).map((val, id) => 
    id == 0 ? 
    "ㅇ"+ val
    + "\n\n"
     : 
    "ㅇ"+ val
     + '\n\n'
    );

    let sendcondnoteSum=''
    arrayTabs.forEach(val=>{
        sendcondnoteSum+=val;
    })
    return sendcondnoteSum
}
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Flex justify={'end'}>
                        <h6 style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => {
                            setIsRestrictions(false)
                        }}>x</h6>
                    </Flex>
                </Col>
                <Col xs={12}>
                    <div>
                        도착국 {" "}
                        <select onChange={(e) => {
                            setSearch(e.target.value)
                        }} 
                         value={search}
                        >
                            <option value={''} disabled="disabled">select</option>
                            {NationInfo?.map((item, id) => {
                                return <option key={id} value={item.nationCode}>{item.nationFm}</option>
                            })}
                        </select>
                    </div>
                </Col>
                <Col xs={12} className="mt-16 p-16">
                    <TableBase>
                        <tr >
                            <th>요금적용지역</th>
                            <td>{get(data, 'emsApplyGetEMS.nationcd', '') + " "} 지역</td>
                            <th>취급지역</th>
                            <td>전지역</td>
                            <th>도착통지</th>
                            <td>취급</td>
                        </tr>
                        <tr>
                            <th>최대규격</th>
                            <td colSpan={3}>
                                {get(data, 'emsApplyGetEMS.maxDefaultCodeName', '')}
                            </td>
                            <th>제한중량(g)</th>
                            <td>{get(data, 'emsApplyGetEMS.limitWeight', '')}</td>
                        </tr>
                        <tr>
                            <th>배달횟수</th>
                            <td>{get(data, 'emsApplyGetEMS.deliverySeq', '')}</td>
                            <th>배달소요일수(서류)	</th>
                            <td>{get(data, 'emsApplyGetEMS.deliveryReqDayNumber', '')}</td>
                            <th>배달불능시 보관기간</th>
                            <td>{get(data, 'emsApplyGetEMS.storageDays', '')}</td>
                        </tr>
                        <tr>
                            <th>배달불가요일</th>
                            <td>{get(data, 'emsApplyGetEMS.deliveryNonAbleWeekDay', '')}</td>
                            <th>세관신고서 작성기준</th>
                            <td>{get(data, 'emsApplyGetEMS.standardsDeclarationForm', '')}</td>
                            <th>기타서류작성</th>
                            <td>{get(data, 'emsApplyGetEMS.payeeHandlingCode', '')}</td>
                        </tr>
                    </TableBase>
                </Col>
                <Col xs={12} className="mt-16 p-16">
                    <Flex>
                        <p>긴급공지</p>
                        <a style={{
                            textDecoration:'none',
                            color:'white',
                            padding:'2px 8px',
                            backgroundColor:'rgba(255, 0, 0,0.60)'
                        }}
                            href='https://ems.epost.go.kr/front.Introduction04pop.postal'
                            target="_blank">
                            보낼수 있는 물품/ 보낼수 없는 물품
                        </a>

                        <a
                        style={{
                            textDecoration:'none',
                            color:'white',
                            padding:'2px 8px',
                            backgroundColor:'rgba(255, 0, 0,0.60)',
                            marginLeft:'10px'
                        }}
                            href='https://ems.epost.go.kr/ems/front/survey/pafao04b09.jsp'
                            target="_blank">
                            국가별 공통사항
                        </a>
                    </Flex>
                    <textarea
                        style={{
                            width: '100%',
                            height: '100px',
                            marginTop: '10px'
                        }}
                        value={sendcondnoteFunction(get(data, 'emsApplyGetServiceArea', ''),'areanm')}
                    />
                </Col>
                <Col xs={12} className="mt-16 p-16">
                    <Tabs>
                        <TabList>
                            <Tab style={{ border: '0.5px solid', borderRadius: '2px' }}>접수 시 주의사항</Tab>
                            <Tab style={{ border: '0.5px solid', borderRadius: '2px' }}>금지·제한품목</Tab>
                            <Tab style={{ border: '0.5px solid', borderRadius: '2px' }}>배달특이사항</Tab>
                            <Tab style={{ border: '0.5px solid', borderRadius: '2px' }}>세관·통관사항</Tab>
                            {get(data, 'emsApplyGetSendCondNote', []).length >= 5 && <Tab style={{ border: '0.5px solid', borderRadius: '2px' }}>추가의</Tab>}
                        </TabList>
                        {/* {console.log(get(data, 'emsApplyGetSendCondNote[0].sendcondnote', '').split('ㅇ'))s} */}
                        {

                            get(data, 'emsApplyGetSendCondNote', [])?.map((item, index) => {
                                return (
                                    <TabPanel style={{ width: '100%', height: '200px', marginTop: '10px' }}>
                                        {/* {console.log(get(item, 'sendcondnote', []).split('ㅇ'))} */}
                                        <textarea
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                marginTop: '-11px'
                                            }}
                                            key={index}
                                            value={sendcondnoteFunction(item)}
                                        />
                                    </TabPanel>)
                            })
                        }

                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

export default StateRestrictions