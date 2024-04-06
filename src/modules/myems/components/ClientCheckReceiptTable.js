import { Loader, QRCodeGenerator, Text } from "components";
import { get } from "lodash";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import styled from "styled-components";
import Barcode from "react-barcode";
import { dateFormatDefault } from "../../../utils/index"
const CheckReceiptTable = styled.div`
    width: 100%;
    font-size: 13px;
    font-weight: bold;
    line-height: 140%;
    font-family: 'Noto Sans KR', 'Noto Sans SC', 'Microsoft Yahei', sans-serif ,
'Noto Sans KR', 'Noto Sans SC', 'Microsoft Yahei', sans-serif, sans-serif;
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        border: 1px solid #000;
        padding: 12px 0 12px 5px;
        font-weight: 400;
        color: inherit;
        font-size: 14px;
    }
`;


const ClientCheckReceiptTable = ({ data}) => {
    moment.locale("en");
 
    return (
        <CheckReceiptTable>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2} style={{ fontSize: "16px" }}>
                        <Text large  dark> 영수증 </Text>{" "}
                            {dateFormatDefault( get(data, "createdAt", "Receipt"),'large')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{width:'80px'}}>
                            <Text xs medium>등기번호</Text></td>
                        <td><Text small medium>{get(data, "code", "-")}</Text></td>
                    </tr>
                    <tr>
                        <td>발송인명</td>
                        <td>{get(data,'sender','')}</td>
                    </tr>
                    <tr>
                        <td>국가명</td>
                        <td>{get(data, "countryName", "-")}</td>
                    </tr>
                    <tr>
                        <td>중량</td>
                        <td>{get(data, "totWeight", 0)} g</td>
                    </tr>
                    <tr>
                        <td>우편요금</td>
                        <td>
                            <NumericFormat
                                displayType="text"
                                value={get(data, "price", 0)}
                                prefix={"$ "}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>수취인명</td>
                        <td>{get(data, "receiveName", "-")}</td>
                    </tr>
                    <tr>
                        <td>수취인주소</td>
                        <td>{get(data, "receiveAdd2", "-")}{" "}{get(data, "receiveAdd3", "-")}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} >
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <Barcode
                             displayValue={false}
                            width={2}
                            height={50}
                                value={`${get(data, "code", "")}`}
                            />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </CheckReceiptTable>
    );
};

export default ClientCheckReceiptTable;
