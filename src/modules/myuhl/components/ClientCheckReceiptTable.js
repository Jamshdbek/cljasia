import { Loader, QRCodeGenerator } from "components";
import { get } from "lodash";
import moment from "moment";
import { dateFormatDefault } from "../../../utils/index"
import { NumericFormat } from "react-number-format";
import styled from "styled-components";

const CheckReceiptTable = styled.div`
    width: 100%;
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        border: 1px solid #0000;
        padding: 12px 0 12px 5px;
        font-weight: 400;
        color: inherit;
    }
`;

const ClientCheckReceiptTable = ({ data, isDataFetched, companyData }) => {
    moment.locale("en");
    return (
        <CheckReceiptTable>
            {isDataFetched && <Loader />}
            <table>
                <thead>
                    <tr>
                        <th colSpan={2} style={{ fontSize: "18px" }}>
                            {"Receipt("} {dateFormatDefault(get(data, "createdAt", null))} {")"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>code</td>
                        <td>{get(data, "postCode", "-")}</td>
                    </tr>
                    <tr>
                        <td>Sender</td>
                        <td>{get(companyData, "companyName", "-")}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{get(data, "to.countryName", "-")}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{get(data, "unitValue", 0)} gramm</td>
                    </tr>
                    <tr>
                        <td>Postage</td>
                        <td>
                            <NumericFormat
                                displayType="text"
                                value={get(data, "price", 0)}
                                prefix={"¥ "}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Receiver</td>
                        <td>{get(data, "to.name", "-")}</td>
                    </tr>
                    <tr>
                        <td>Destination address</td>
                        <td>{get(data, "to.address", "-")}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <QRCodeGenerator
                                value={`${get(data, "postCode", "")}`}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </CheckReceiptTable>
    );
};

export default ClientCheckReceiptTable;
