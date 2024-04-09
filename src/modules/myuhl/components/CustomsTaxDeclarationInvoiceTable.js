import { Collapse, Flex, QRCodeGenerator, Text } from "components";
import { get, isEmpty } from "lodash";
import moment from "moment";
import styled from "styled-components";

const CustomsDeclarationInvoiceTable = styled.div`
    width: 100%;
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        border: 1px solid #000;
        padding: 7px 0 7px 5px;
        font-weight: 400;
    }
`;

const CustomsTaxDeclarationInvoiceTable = ({ data, companyData }) => {
    const postProducts = get(data, "postProducts", []);

    let sumOfPostProducts = postProducts.reduce(
        (total, item) => total + item.price,
        0
    );
    let phoneNum='';
    get(data,'to.phoneNumber',[]).forEach((val)=>{
        phoneNum+=val.value+'  '
    })
    return (
        <CustomsDeclarationInvoiceTable>
            <table>
                <thead>
                    <tr>
                        <th colSpan={5}>
                            <Text xl bold>
                                {" "}
                                Customs Declaration / Invoice{" "}
                            </Text>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={2} colSpan={2}>
                            <Text bold>1. Shipper/Exporter</Text>
                            <br />
                            {get(companyData, "companyName", "")},{" "}
                            {get(companyData, "companyAddress", "")},
                            {get(companyData, "location.label", "")},{" "}
                            {get(companyData, "country.label", "")}
                            <br />
                            <br />
                            {get(companyData, "companyPhoneNumber", "")}
                        </td>
                        <td
                            colSpan={2}
                            style={{
                                verticalAlign: "baseline",
                            }}
                        >
                            <Text bold xs>
                                6. Carrier{" "}
                            </Text>
                        </td>
                        <td>
                            <Text bold>7. Sailing on or about </Text>
                            <br />
                            {moment(get(data, "createdAt", null)).format(
                                "DD/MM/YYYY"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Text bold>8. No & date of invoice </Text>
                            <br />{" "}
                            {moment(get(data, "createdAt", null)).format(
                                "DD/MM/YYYY"
                            )}
                            {get(data, "postCode", "")}
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={2} colSpan={2}>
                            <Text bold>2. For account & risk of Messers</Text>
                            <br />
                            {get(data, "to.name", "")},{" "}
                            {get(data, "to.address", "")},{" "}
                            {phoneNum}
                        </td>
                        <td colSpan={3}>
                            <Text bold>9. No & date of L/C </Text>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Text bold> 10. L/C Issuing Bank </Text>
                        </td>
                    </tr>
                    <tr>
                        <td
                            colSpan={2}
                            style={{
                                verticalAlign: "baseline",
                            }}
                        >
                            <Text bold xs>
                                3. Notify party
                            </Text>
                            <br />
                            <br />
                        </td>
                        <td
                            rowSpan={2}
                            colSpan={3}
                            style={{
                                verticalAlign: "baseline",
                            }}
                        >
                            <Text xs bold>
                                {" "}
                                11. Remarks{" "}
                            </Text>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Text bold>4. Port of bording </Text>
                            <br />
                            {get(data, "from.countryName", "")}
                        </td>
                        <td>
                            <Text bold>5. Final Destination </Text>
                            <br /> {get(data, "to.countryName", "")}
                        </td>
                    </tr>
                    <tr>
                        <td style={{width:'250px'}}>
                            <Text bold>12. Description Goods </Text>
                        </td>
                        <td>
                            <Text bold>13. Quantity Unit </Text>
                        </td>
                        <td>
                            <Text bold>14. Amount </Text>
                        </td>
                        <td>
                            <Text bold> HS code </Text>
                        </td>
                        <td style={{width:'20px'}}></td>
                    </tr>
                    <tr>
                        <td>
                            {postProducts.map((postProduct) => (
                                <>
                                    <Text xs>
                                        {get(postProduct, "productName", "")}
                                        {get(postProduct, "quantity", "")
                                            ? `(${get(
                                                  postProduct,
                                                  "quantity",
                                                  ""
                                              )})`
                                            : ""}
                                    </Text>{" "}
                                </>
                            ))}
                        </td>
                        <td>
                            {postProducts.reduce(
                                (total, item) => total + item.quantity,
                                0
                            )}
                        </td>
                        <td>
                            {postProducts.reduce(
                                (total, item) => total + +item.price,
                                0
                            )}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <Flex justify="space-around">
                                <div>
                                    <Text bold className="mr-16">
                                        {" "}
                                        Total{" "}
                                    </Text>{" "}
                                    {sumOfPostProducts} USD
                                </div>
                                <div>
                                    <Text bold className="mr-16">
                                        {" "}
                                        Signed by{" "}
                                    </Text>{" "}
                                    {get(companyData, "companyName", "-")}
                                </div>
                            </Flex>
                        </td>
                    </tr>
                </tbody>
            </table>
        </CustomsDeclarationInvoiceTable>
    );
};

export default CustomsTaxDeclarationInvoiceTable;