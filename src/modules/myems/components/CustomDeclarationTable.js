import { Flex, Text } from "components";
import { get } from "lodash";
import moment from "moment";
import styled from "styled-components";
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
        vertical-align: top;
        border: 1px solid #000;
        padding: 6px 0 6px 3px;
        font-weight: 400;
        color: inherit;
    }
`;

const ClientCheckReceiptTable = ({ data }) => {
    moment.locale("en");
    return (
        <CheckReceiptTable>
            <table>
                <thead>
                    <tr>
                        <th colSpan={6} style={{ fontSize: "18px" }}>
                            <Text bold lightDark >  Customs Declaration(CN23) / Invoice</Text>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3} rowSpan={2}>
                            <Text bold lightDark>①Shipper/Exporter</Text> <br />
                            {get(data, 'sender', '')} <br />
                            {get(data, 'senderAdd1', '')}{" "} {get(data, 'senderAdd2', '')} <br /> <br />
                            {get(data, 'senderTelNo1', '')}
                        </td>
                        <td>
                            <Text bold lightDark>⑥Carrier</Text>
                        </td>
                        <td colSpan={2}>
                            <Text bold lightDark>⑦Sailing on or about</Text>

                            {moment(get(data, 'createdAt', '')).format('YYYY-MM-DD')}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Text bold lightDark>⑧No & date of invoice</Text> <br />
                            {moment(get(data, 'createdAt', '')).format('YYYY-MM-DD')}
                            {" "}{get(data, 'code', '')}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} rowSpan={2}>
                            <Text bold lightDark>②For account & risk of Messers</Text> <br />
                            {get(data, 'receiveName', '')} <br />
                            {get(data, 'receiveAdd2', '')}{" "}{get(data, 'receiveAdd3', '')} <br /> <br />
                            {"+" + get(data, 'receiveTelNo', '')}
                        </td>
                        <td colSpan={3}>
                            <Text bold lightDark>⑨No & date of L/C</Text>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Text bold lightDark>⑩L/C Issuing Bank</Text>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Text bold lightDark>③Notify party</Text>
                        </td>
                        <td colSpan={3} rowSpan={2}>
                            <Text bold lightDark>⑪Remarks</Text>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <Text bold lightDark >④Port of loading</Text> <br />
                            KOREA
                        </td>
                        <td colSpan={2}>
                            <Text bold lightDark >
                                ⑤Final destination
                            </Text> <br />
                            {get(data, 'countryName', '')}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <Text bold lightDark>⑫Description of Goods</Text>
                        </td>
                        <td >
                            <Text bold lightDark>⑬Quantity/Unit</Text>
                        </td>
                        <td >
                            <Text bold lightDark>⑭Unit-Price</Text>
                        </td>
                        <td >
                            <Text bold lightDark>⑮Amount</Text>
                        </td>
                        <td colSpan={2}>
                            <Text bold lightDark>HS-code</Text>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            {get(data, 'productDTOList[0].contents', '-')} <br />
                            {get(data, 'productDTOList[1].contents', '-')} <br />
                            {get(data, 'productDTOList[2].contents', '-')}
                        </td>
                        <td >
                            {get(data, 'productDTOList[0].weight', '-')}/{get(data, 'productDTOList[0].value', '-')} <br />
                            {get(data, 'productDTOList[1].weight', '-')}/{get(data, 'productDTOList[1].value', '-')}  <br />
                            {get(data, 'productDTOList[2].weight', '-')}/{get(data, 'productDTOList[2].value', '-')}
                        </td>
                        <td >
                            <span>USD</span>
                        </td>
                        <td >
                            {"USD " + get(data, 'productDTOList[0].value', '-')} <br />
                            {"USD " + get(data, 'productDTOList[1].value', '-')} <br />
                            {"USD " + get(data, 'productDTOList[2].value', '-')}
                        </td>
                        <td colSpan={2}>
                            {get(data, 'productDTOList[0].hs_code', '-')} <br />
                            {get(data, 'productDTOList[1].hs_code', '-')} <br />
                            {get(data, 'productDTOList[2].hs_code', '-')}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6}>
                            <Flex style={{ gap: '10px' }}>
                                <Text bold lightDark>Total</Text>
                                <span>{get(data, 'price', '')}{" ¥"}</span>
                                <Text bold lightDark>Signed by</Text>
                                <span>{get(data, 'sender', '')}</span>
                            </Flex>
                        </td>
                    </tr>
                </tbody>
            </table>
        </CheckReceiptTable>
    );
};

export default ClientCheckReceiptTable;
