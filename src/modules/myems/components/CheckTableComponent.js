import { BaseCheckbox, Flex, Loader, Text } from "components";
import Barcode from "react-barcode";
import { get } from "lodash";
import { dateFormatDefault } from "../../../utils/index"
import styled from "styled-components";
import moment from "moment";


const CheckReceiptTable = styled.div`
    width: 100%;
    font-size: 13px;
    font-weight: bold;
    line-height: 140%;
    letter-spacing: -1px;
    font-family: 'Noto Sans KR', 'Noto Sans SC', 'Microsoft Yahei', sans-serif ,
'Noto Sans KR', 'Noto Sans SC', 'Microsoft Yahei', sans-serif, sans-serif;
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        border: 1px solid #000;
        padding:2px 6px;
        font-weight: 400;
        color: inherit;
    }
`;
const CheckTableComponent = ({
    data
}) => {
    return (<>
        <CheckReceiptTable>

            <table>

                <tr>
                    <td colSpan={2} rowSpan={3}
                        style={{ border: 0, width: '50px' }}>
                        <div style={{ fontsize: '10px' }}>Item No.<br />우편물 번호</div>
                    </td>

                    <td
                        colSpan={5}
                        style={{ marginRight: '30px', width: '500px', border: 0 }}
                        rowSpan={3}
                    >
                        <Barcode
                            width={2}
                            height={50}
                            value={get(data, 'code', '')}
                            textPosition='top' />
                    </td>
                    <td colSpan={8} style={{ border: "none", height: '10px' }}></td>

                </tr>
                <tr>
                    {/* <td colSpan={2} rowSpan={2} style={{border:'0'}}></td> */}
                    <td colSpan={4} className={"text-center"}>
                        <Text small bold>Date & Time Posted 접수년월일시</Text>
                    </td>
                    <td colSpan={4} className={"text-center"}>
                        {dateFormatDefault(get(data, "createdAt", null), 'xl')}
                    </td>
                </tr>
                <tr>
                    {/* <td colSpan={2} style={{border:'0'}}></td> */}
                    <td colSpan={4} className={"text-center"}>
                      <Text small bold>Post office code 우편용국기호</Text> 
                    </td>
                    <td colSpan={4} className={"text-center"}>
                       <Text small bold >10015</Text> 
                    </td>
                </tr>
                <tr>
                    <td rowSpan={3} style={{ width: '60px' }} >
                        From <br />
                        보<br />
                        내<br />
                        는<br /><br />

                        사<br />
                        람<br />
                    </td>
                    <td colSpan={5}>
                        <Text primary bold>
                            {" "}
                            Tel. No:{" "}
                        </Text>{" "}
                        <Text bold large lightDark> {get(data, "senderTelNo1", "-")} </Text>
                    </td>
                    <td rowSpan={3} style={{ width: '50px' }} >
                        To <br /> <br />
                        받 <br /> <br />

                        는 <br /> <br />

                        사<br /><br />

                        람<br /><br />
                    </td>
                    <td colSpan={7}>
                        <Text primary bold >
                            {" "}
                            Tel. No:{" "}
                        </Text>{" "}
                        <Text bold large lightDark> {"+" + get(data, "receiveTelNo", "-")} </Text>
                    </td>
                </tr>
                <tr>
                    <td colSpan={5}>
                        <Text primary bold>
                            {" "}
                            Name:{" "}
                        </Text>{" "}
                        <Text bold large lightDark> {get(data, "sender", "-")} </Text>
                    </td>
                    <td colSpan={7}>
                        <Text primary bold>
                            {" "}
                            Name:{" "}
                        </Text>{" "}
                        <Text bold large lightDark> {get(data, "receiveName", "-")} </Text>
                    </td>
                </tr>
                <tr>
                    <td colSpan={5} >
                        <Text primary bold >
                            Address:{" "}
                        </Text>{" "}
                        <Text bold large lightDark> {get(data, "senderAdd1", "-")} {" "} {get(data, "senderAdd2", "-")} </Text>
                        <br /> <br /> <br /> <br /> <br /><br />
                        <Flex justify="space-around">
                            <div>
                                <Text primary bold>
                                    {" "}
                                    Postal code:{" "}
                                </Text>{" "}
                                <Text bold large lightDark>
                                    {" "}
                                    {get(data, "senderZipCode", '')}{" "}
                                </Text>
                            </div>
                            <div>
                                <Text primary bold >
                                    {" "}
                                    Rep. of KOREA{" "}
                                </Text>
                            </div>
                        </Flex>
                    </td>
                    <td colSpan={10}  >
                        <Text primary bold>
                            Address:{" "}
                        </Text>{" "}
                        <Text bold large lightDark> {get(data, "receiveAdd2", "")} {get(data, "receiveAdd3", "")} </Text>
                        <br /> <br /> <br /><br /><br /><br /> <br />
                        <Flex justify="space-around">
                            <div>
                                <Text primary bold>

                                    Postal code:{" "}
                                </Text>{" "}
                                <Text bold large lightDark>
                                    {" "}
                                    {get(data, "receiveZipCode", '')}{" "}
                                </Text>
                            </div>
                            <div>
                                <Text primary bold>
                                    {" "}
                                    Country:{" "}
                                </Text>
                                <Text bold large lightDark>
                                    {" "}
                                    {get(data, "countryName", "-")}{" "}
                                </Text>
                            </div>
                        </Flex>
                    </td>
                </tr>

                {/* <br/> */}
                <tr>
                    <td colSpan={9}>
                        <Text large bold style={{ float: 'left', paddingLeft: '6px' }}>Customs Declaration 세관신고서</Text>
                        <Text large bold style={{ float: 'right', paddingRight: '6px' }}>CN23</Text>
                    </td>
                    <td colSpan={2} style={{ width: '450px' }}>
                        <span style={{
                            display: 'inline-block',
                            paddingLeft: '6px',
                            float: 'left',
                            fontSize: '12px',
                            lineHeight: 1.2
                        }}>Actual Weight<br />실제중량</span>
                        <span style={{
                            display: 'inline-block',
                            fontSize: '18px',
                            paddingRight: '6px',
                            fontWeight: 'bold',
                            float: 'right',
                            color: '#585757'
                        }}  > {get(data, 'totWeight', '')}{"g "}</span>
                    </td>
                    <td colSpan={3} style={{ width: '300px' }}>
                        <span style={{

                            display: 'inline-block',
                            paddingRight: '6px',
                            float: 'left',
                            fontSize: '12px',
                            lineHeight: 1.2
                        }}>Postage <br /> 우편요금 </span>
                        <span style={{
                            display: 'inline-block',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            float: 'right',
                            color: '#585757'
                        }}  >{get(data, 'price', '')}{" ₩ "}</span>

                    </td>
                </tr>
                <tr style={{ fontSize: '10px' }}>
                    <td colSpan={3}>
                        <Text xs bold >Contents 내용 품명(반드시 영문으로 구체적으로 기재)</Text>
                    </td>
                    <td><Text xs bold>Quantity <br />
                        (개수)</Text></td>
                    <td><Text xs bold>Net Weight <br />
                        (순중량)</Text></td>
                    <td><Text xs bold>Value <br />
                        (가격:US$)</Text></td>
                    <td colSpan={2}>
                        <Text xs bold>HS Tariff <br />
                            Number(Hs)</Text>
                    </td>
                    <td > <Text bold xs>Country of <br />
                        Origin(생산지)</Text></td>
                    <td colSpan={2}>
                        <Text xs bold style={{

                            display: 'inline-block',
                            paddingRight: '6px',
                            float: 'left',
                            lineHeight: 1.2
                        }}>Volume Weight <br /> 부피중량 </Text>
                        <Text bold large lightDark>
                            {get(data, "volumeWeight", "-")}{"g "}
                        </Text>
                    </td>
                    <td colSpan={3}>
                        <span style={{

                            display: 'inline-block',
                            paddingRight: '6px',
                            float: 'left',
                            fontSize: '12px',
                            lineHeight: 1.2
                        }}>가로*세로*높이(cm) </span>
                        <Text bold large lightDark>
                            {get(data, "boxHeight", "-")} * {get(data, "boxLength", "-")} * {get(data, "boxWidth", "-")}
                        </Text>
                    </td>
                </tr>
                <tr style={{ fontSize: '12px' }}>
                    <td colSpan={3}>
                      <Text xs bold>{get(data, 'productDTOList[0].contents', '')}</Text>  
                    </td>
                    <td><Text xs bold>{get(data, 'productDTOList[0].number', '')}</Text></td>
                    <td><Text xs bold>{get(data, 'productDTOList[0].weight', '')}</Text></td>
                    <td><Text xs bold>{get(data, 'productDTOList[0].value', '')}</Text></td>
                    <td colSpan={2}><Text xs bold>{get(data, 'productDTOList[0].hs_code', '')}</Text></td>
                    <th><Text xs bold>{get(data, 'productDTOList[0].value', null) ? "KR" : "-"}</Text></th>
                    <td colSpan={2} rowSpan={2}>
                        Guarantee Service <br /> 배달보장서비스(도착국가기준) <br /> (신청시 인터넷우체국 확인가능)
                    </td>
                    <td rowSpan={2}>
                        Country code <br /> 도착국명 약호
                    </td>
                    <td rowSpan={2} style={{ fontSize: '28px', fontWeight: 'bold', color: 'black' }}>{get(data, 'countryCd', '')[0]}</td>
                    <td rowSpan={2} style={{ fontSize: '28px', fontWeight: 'bold', color: 'black' }}>{get(data, 'countryCd', '')[1]}</td>
                </tr>
                <tr style={{ fontSize: '12px' }}>
                    <td colSpan={3} >
                     <Text xs bold>{get(data, 'productDTOList[1].contents', '-')}</Text> 
                    </td>
                    <td><Text xs bold>{get(data, 'productDTOList[1].number', '-')}</Text></td>
                    <td><Text xs bold>{get(data, 'productDTOList[1].weight', '-')}</Text></td>
                    <td><Text xs bold>{get(data, 'productDTOList[1].value', '-')}</Text></td>
                    <td colSpan={2}><Text xs bold>{get(data, 'productDTOList[1].hs_code', '-')}</Text></td>
                    <th><Text xs bold>{get(data, 'productDTOList[1].value', null) ? "KR" : "-"}</Text></th>
                </tr>
                <tr style={{ fontSize: '12px' }} >
                    <td colSpan={3}>
                       <Text xs bold> {get(data, 'productDTOList[2].contents', '-')}</Text>
                    </td>
                    <td><Text xs bold>{get(data, 'productDTOList[2].number', '-')}</Text></td>
                    <td><Text xs bold>{get(data, 'productDTOList[2].weight', '-')}</Text></td>
                    <td><Text xs bold>{get(data, 'productDTOList[2].value', '-')}</Text></td>
                    <td colSpan={2}><Text xs bold>{get(data, 'productDTOList[2].hs_code', '-')}</Text></td>
                    <td><Text xs bold>{get(data, 'productDTOList[2].value', null) ? "KR" : "-"}</Text></td>
                    <td colSpan={2} rowSpan={2}  >
                        요금납부방법 및 기타 <br />
                        <label style={{ display: 'flex', marginLeft: '6px' }} >
                            <><input type="checkbox" />
                                <span>현금수납</span></>
                            <>(<input type="checkbox" style={{ marginLeft: '5px' }} />
                                <span>감액 시 표시</span>)</>
                        </label>
                        <label style={{ display: 'flex', marginLeft: '6px', padding: '5px 0' }} >

                        </label>
                        <label style={{ display: 'flex', marginLeft: '6px' }} >
                            <input type="checkbox" defaultChecked />
                            <span>요금후납</span>
                        </label>
                    </td>
                    <td colSpan={3} rowSpan={2}>
                        Signature 담당자서명
                    </td>
                </tr>
                <tr style={{ fontSize: '12px' }}>
                    <td colSpan={3}>
                        {get(data, 'productDTOList[3].contents', '-')}
                    </td>
                    <td colSpan={1}>{get(data, 'productDTOList[3].number', '-')}</td>
                    <td colSpan={1}>{get(data, 'productDTOList[3].weight', '-')}</td>
                    <td>{get(data, 'productDTOList[3].value', '-')}</td>
                    <td colSpan={2}>{get(data, 'productDTOList[3].hs_code', '-')}</td>
                    <td>{get(data, 'productDTOList[3].hs_code', null) ? "KR" : "-"}</td>
                </tr>
                <tr style={{ fontSize: '12px' }}>
                    <td colSpan={5}>
                        <Flex justify={"center"}
                            style={{ letterSpacing: '-0.5px' }}
                        >
                            <label style={{ display: 'flex', gap: '2px' }} >
                                <input
                                    type='checkbox'
                                    value={'Sample'}
                                    checked={get(data, 'productType', '') == 'Sample'}
                                />
                                <span>Sample상품견본</span>
                            </label>
                            <label style={{ display: 'flex', gap: '2px' }} >
                                <input
                                    type='checkbox'
                                    value={'Gift'}
                                    checked={get(data, 'productType', '') == 'Gift'}
                                />
                                <span>Gift선물</span>
                            </label>
                            <label style={{ display: 'flex', gap: '2px' }} >
                                <input
                                    type='checkbox'
                                    value={'Merchandise'}
                                    checked={get(data, 'productType', '') == 'Merchandise'}
                                />
                                <span>Merchandise상품 </span>
                            </label>
                            <label style={{ display: 'flex', gap: '2px' }} >
                                <input
                                    type='checkbox'
                                    value={"Document"}
                                    checked={get(data, 'productType', '') == "Document"}

                                />
                                <span>수출면장건 </span>
                            </label>
                        </Flex></td>
                    <td colSpan={4} rowSpan={2}>
                        Signature 발송인 서명(세관신고서, <br />
                        보험이용여부,받는사람 전화번호 기재필)
                    </td>
                    <td colSpan={2} rowSpan={2} justify={'center'}>
                        보험이용여부(음식물, 전자제품 불가)
                        (Shipping insurance)
                        <Flex style={{ gap: '14px' }}>
                            <label style={{ display: 'flex', gap: '5px' }} >
                                <input
                                    name='bollen'
                                    type="checkbox"
                                    disabled
                                />
                                <span>YES</span>
                            </label>
                            <label style={{ display: 'flex', gap: '15px' }} >
                                <input
                                    name='bollen'
                                    type="checkbox"
                                    checked={get(data, "checked", true)}
                                />
                                {console.log(data)}
                                <span>NO</span>
                            </label>
                        </Flex>
                    </td>
                    <td colSpan={3} rowSpan={2}>   보험가액(Insurance value)</td>
                </tr>
                <tr>
                    <td colSpan={5} style={{ fontSize: '12px' }}>
                        <span style={{
                            display: 'inlineBlock',
                            padding: '0 0 4px 0',
                            marginLeft: '6px',
                            borderBottom: '1px solid #000'
                        }}>
                            순번(Specify each shipment. Shipment No.)</span>
                        <span style={{
                            display: 'inline-block',
                            position: 'relative',
                            top: '10px',
                            fontWeight: 'bold'
                        }}>:
                        </span>
                        <span style={{
                            display: 'inline-block',
                            position: 'relative',
                            top: '8px',
                            fontWeight: 'bold'
                        }}>:
                        </span>&nbsp;
                        <span style={{
                            display: 'inline-block',
                            padding: '0 0 4px 0',
                            marginLeft: '4px',
                            borderBottom: '1px solid #000'
                        }}>
                            &nbsp;(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
                            번째&nbsp;</span><br />
                        <span style={{
                            display: 'inline-block',
                            marginLeft: '46px'
                        }}>총물수(Total item quantity)
                        </span>&nbsp;<span style={{
                            display: 'inline-block',
                            marginLeft: '52px'
                        }}>&nbsp;(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)개
                        </span>
                    </td>
                </tr>

            </table>

        </CheckReceiptTable>
    </>)
}

export default CheckTableComponent