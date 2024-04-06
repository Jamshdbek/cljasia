import { BaseCheckbox, Flex, Logo, QRCodeGenerator, Text } from "components";
import logo from "assets/images/icons/logo.svg";
import { dateFormatDefault } from "../../../utils/index"
import {  get } from "lodash";
import moment from "moment";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import myuhlLogo from "assets/images/picture/myuhllogo_ne.png";
import { useEffect } from "react";

const CustomDeclarationTable = styled.div`
    width: 100%;
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        border: 1px solid #000;
        padding: 5px 0 5px 5px;
        font-weight: 400;
    }
`;

const CustomsDeclarationTable = ({ data, companyData }) => {
    const postProducts = get(data, "postProducts", []);
    const productsArray = []

    const product = []
    const lngthPostPr = Math.ceil(postProducts.length / 5);
    for (let i = 0; i < postProducts.length; i += lngthPostPr) {
        let qismasi = postProducts.slice(i, i + lngthPostPr);
        product.push(qismasi);
    }
    for (let i = 0; i < product.length; i++) {
        let productName = ''
        let quantity = ''
        let price = ''
        let hsCode = ''
        for (let j = 0; j < product[i].length; j++) {
            productName += product[i][j].productName + `${product[i].length-1!=j?', ':''}`;
            quantity += product[i][j].quantity + `${product[i].length-1!=j?', ':''}`;
            price += product[i][j].price + `${product[i].length-1!=j?', ':''}`;
            hsCode += product[i][j].hsCode + `${product[i].length-1!=j?', ':''}`;

        }
        productsArray.push({
            productName,
            quantity,
            price,
            hsCode
        })

    }

    let phoneNum='';
    get(data,'to.phoneNumber',[])?.forEach((val)=>{
        phoneNum+=val.value+','
    })
//   console.log("postProducts",postProducts)
//   console.log("productsArray",productsArray)
    function onlyOne(name, checkbox) {
        checkbox = checkbox.target;
        var checkboxes = document.getElementsByName(name);
        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false;
        });
    }

    return (
        <CustomDeclarationTable>
            <table>
                <tr>
                    <td
                        colSpan={6}
                        style={{ border: "none", alignItems: "start" }}
                        rowSpan={2}
                    >
                        <Flex align="start" justify="start">
                            <QRCodeGenerator
                                value={`${get(data, "postCode", "")}`}
                                className="ml-32"
                            />
                            <div className="mr-16">
                                <Text xxl className="mr-32 ml-32">
                                    {" "}
                                    {get(data, "postCode", "-")}{" "}
                                </Text>
                                <div className="mt-16 ml-32">
                                    {/* <ReactSVG src={logo} /> */}
                                    <img
                                        src={myuhlLogo}
                                        alt={"logo"}
                                        width={150}
                                    />
                                </div>
                            </div>
                        </Flex>
                    </td>
                    <td colSpan={4} className={"text-center"}>
                        Date & Time Posted
                    </td>
                    <td colSpan={4} className={"text-center"}>
                        {/* {moment(get(data, "createdAt", null)).format(
                            "DD/MM/YYYY"
                        )}

                        <br />
                        {moment(get(data, "createdAt", null)).format(
                            "hh:mm:ss"
                        )} */}
                        {dateFormatDefault(get(data, "createdAt", null))}
                    </td>
                </tr>
                <tr>
                    <td
                        colSpan={4}
                        className={"text-center"}
                        style={{ width: "25%" }}
                    >
                        Post office code
                    </td>
                    <td
                        colSpan={4}
                        className={"text-center"}
                        style={{ width: "25%" }}
                    >
                        {get(data, "from.index", "-")}
                    </td>
                </tr>
                <tr>
                    <td rowSpan={3} style={{ borderBottom: 0 }}>
                        From
                    </td>
                    <td colSpan={4}>
                        <Text primary bold>
                            {" "}
                            Tel. No:{" "}
                        </Text>{" "}
                        <Text> {get(data, "from.phoneNumber", "-")} </Text>
                    </td>
                    <td rowSpan={3} style={{ borderBottom: 0 }}>
                        To
                    </td>
                    <td colSpan={7}>
                        <Text primary bold>
                            {" "}
                            Tel. No:{" "}
                        </Text>{" "}
                        <Text> {phoneNum.substring(0,phoneNum.length-1)} </Text>
                    </td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <Text primary bold>
                            {" "}
                            Name:{" "}
                        </Text>{" "}
                        <Text> {get(data, "from.name", "-")} </Text>
                    </td>
                    <td colSpan={7}>
                        <Text primary bold>
                            {" "}
                            Name:{" "}
                        </Text>{" "}
                        <Text> {get(data, "to.name", "-")} </Text>
                    </td>
                </tr>
                <tr>
                    <td colSpan={4} style={{ borderBottom: 0 }}>
                        <Text primary bold>
                            {" "}
                            Address:{" "}
                        </Text>{" "}
                        <Text> {get(data, "from.address", "-")} </Text>
                        <br /> <br />
                        <Flex justify="space-around">
                            <div>
                                <Text primary bold>
                                    {" "}
                                    Postal code:{" "}
                                </Text>{" "}
                                <Text bold xl>
                                    {" "}
                                    {get(data, "from.index")}{" "}
                                </Text>
                            </div>
                            <div>
                                <Text primary bold>
                                    {" "}
                                    {get(data, "from.countryName", "-")}{" "}
                                </Text>
                            </div>
                        </Flex>
                    </td>
                    <td colSpan={7} style={{ borderBottom: 0 }}>
                        <Text primary bold>
                            {" "}
                            Address:{" "}
                        </Text>{" "}
                        <Text> {get(data, "to.address")} </Text>
                        <br /> <br />
                        <Flex justify="space-around">
                            <div>
                                <Text primary bold>
                                    {" "}
                                    Postal code:{" "}
                                </Text>{" "}
                                <Text bold xl>
                                    {" "}
                                    {get(data, "to.index")}{" "}
                                </Text>
                            </div>
                            <div>
                                <Text primary bold>
                                    {" "}
                                    {get(data, "to.countryName", "-")}{" "}
                                </Text>
                            </div>
                        </Flex>
                    </td>
                </tr>
            </table>
            <table>
                {/* Costume Declaration, weight, post */}
                <tr>
                    <td colSpan={9} className={"text-center"}>
                        <Text bold>Customs Declaration</Text>
                    </td>
                    <td colSpan={3}>
                        Weight: {get(data, "unitValue", 0)} gramm{" "}
                    </td>
                    <td colSpan={3}>
                        Postage:
                        <NumericFormat
                            displayType="text"
                            value={get(data, "price", 0)}
                            prefix={"₩ "}
                            thousandSeparator={true}
                            decimalScale={0}
                            fixedDecimalScale={true}
                        />
                    </td>
                </tr>
                {/* Costume Declaration, weight, post */}

                {/* content */}
                <tr>
                    <td colSpan={4}>
                        <Text xs>Contents</Text>
                    </td>
                    <td>
                        <Text xs>Quantity</Text>
                    </td>
                    <td>
                        <Text xs>Net weight</Text>
                    </td>
                    <td style={{ width: "65px" }}>
                        <Text xs>Value</Text>
                    </td>
                    <td>
                        <Text xs>HS Code </Text>
                    </td>
                    <td>
                        <Text xs>Country </Text>
                    </td>
                    <td rowSpan={2} colSpan={3}>
                        Guarantee Service
                    </td>
                    <td rowSpan={2}>Country code </td>
                    <td rowSpan={2}>
                        <Text xxl bold>
                            {get(data, "to.countryCode", "-").charAt(0)}
                        </Text>
                    </td>
                    <td rowSpan={2}>
                        <Text xxl bold>
                            {get(data, "to.countryCode", "-").charAt(1)}
                        </Text>
                    </td>
                </tr>
                {postProducts.length <= 5 ?
                    <>
                        <tr>
                            <td colSpan={4}>
                                <Text xs>
                                    {get(postProducts[0], "productName", "")}
                                </Text>
                                <br />
                            </td>
                            <td>
                            <Text xs>
                                {get(postProducts[0], "quantity", "")}
                                </Text>
                            </td>
                            <td>  <Text xs> {get(postProducts[0], "weight", "")}</Text></td>
                            <td>  <Text xs>{get(postProducts[0], "price", "")}</Text></td>
                            <td>  <Text xs>{get(postProducts[0], "hsCode", "")}</Text></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td colSpan={4}>
                            <Text xs>
                                {get(postProducts[1], "productName", "")}
                                </Text>
                                <br />
                            </td>
                            <td>  <Text xs>{get(postProducts[1], "quantity", "")}</Text></td>
                            <td></td>
                            <td>  <Text xs>{get(postProducts[1], "price", "")}</Text></td>
                            <td>  <Text xs>{get(postProducts[1], "hsCode", "")}</Text></td>
                            <td></td>
                            <td
                                rowSpan={4}
                                colSpan={3}
                                style={{
                                    fontSize: "12px",
                                    verticalAlign: "baseline",
                                }}
                            >
                                After Payment
                            </td>
                            <td
                                rowSpan={4}
                                colSpan={5}
                                style={{
                                    fontSize: "12px",
                                    verticalAlign: "baseline",
                                }}
                            >
                                Signature
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                            <Text xs>
                                {get(postProducts[2], "productName", "")}
                                </Text>
                                <br />
                            </td>
                            <td><Text xs>{get(postProducts[2], "quantity", "")}</Text></td>
                            <td></td>
                            <td><Text xs>{get(postProducts[2], "price", "")}</Text></td>
                            <td><Text xs>{get(postProducts[2], "hsCode", "")}</Text></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                            <Text xs>  {get(postProducts[3], "productName", "")}</Text>
                                <br />
                            </td>
                            <td><Text xs>{get(postProducts[3], "quantity", "")}</Text></td>
                            <td></td>
                            <td><Text xs>{get(postProducts[3], "price", "")}</Text></td>
                            <td><Text xs>{get(postProducts[3], "hsCode", "")}</Text></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                            <Text xs>{get(postProducts[4], "productName", "")}</Text>
                                <br />
                            </td>
                            <td><Text xs>{get(postProducts[4], "quantity", "")}</Text></td>
                            <td></td>
                            <td><Text xs>{get(postProducts[4], "price", "")}</Text></td>
                            <td><Text xs>{get(postProducts[4], "hsCode", "")}</Text></td>
                            <td></td>
                        </tr> </> :
                    <>
                    <tr>
                        <td colSpan={4}>
                            <Text xs>
                                {get(productsArray[0], "productName", "")}
                            </Text>
                            <br />
                        </td>
                        <td>
                          <Text xs>
                            {get(productsArray[0], "quantity", "")}
                            </Text>
                        </td>
                        <td>   <Text xs>{get(productsArray[0], "weight", "")}</Text></td>
                        <td>  <Text xs>{get(productsArray[0], "price", "")}</Text></td>
                        <td>  <Text xs>{get(productsArray[0], "hsCode", "")}</Text></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td colSpan={4}>
                        <Text xs> {get(productsArray[1], "productName", "")}</Text>
                            <br />
                        </td>
                        <td>  <Text xs>{get(productsArray[1], "quantity", "")}</Text></td>
                        <td></td>
                        <td>  <Text xs>{get(productsArray[1], "price", "")}</Text></td>
                        <td>  <Text xs>{get(productsArray[1], "hsCode", "")}</Text></td>
                        <td></td>
                        <td
                            rowSpan={4}
                            colSpan={3}
                            style={{
                                fontSize: "12px",
                                verticalAlign: "baseline",
                            }}
                        >
                            After Payment
                        </td>
                        <td
                            rowSpan={4}
                            colSpan={5}
                            style={{
                                fontSize: "12px",
                                verticalAlign: "baseline",
                            }}
                        >
                            Signature
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        <Text xs>  {get(productsArray[2], "productName", "")}</Text>
                            <br />
                        </td>
                        <td>  <Text xs>{get(productsArray[2], "quantity", "")}</Text></td>
                        <td></td>
                        <td>  <Text xs>{get(productsArray[2], "price", "")}</Text></td>
                        <td>  <Text xs>{get(productsArray[2], "hsCode", "")}</Text></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                              <Text xs>{get(productsArray[3], "productName", "")}</Text>
                            <br />
                        </td>
                        <td>  <Text xs>{get(productsArray[3], "quantity", "")}</Text></td>
                        <td></td>
                        <td>  <Text xs>{get(productsArray[3], "price", "")}</Text></td>
                        <td>  <Text xs>{get(productsArray[3], "hsCode", "")}</Text></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                              <Text xs>{get(productsArray[4], "productName", "")}</Text>
                            <br />
                        </td>
                        <td>  <Text xs>{get(productsArray[4], "quantity", "")}</Text></td>
                        <td></td>
                        <td>  <Text xs>{get(productsArray[4], "price", "")}</Text></td>
                        <td>  <Text xs>{get(productsArray[4], "hsCode", "")}</Text></td>
                        <td></td>
                    </tr> </>
                    }


                {/* content */}

                {/* shipment */}
                <tr>
                    <td colSpan={4}>
                        <label
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                        >
                            Sample
                            <input
                                type="checkbox"
                                name="shipment"
                                onClick={(e) => onlyOne("shipment", e)}
                                className="ml-2"
                            />
                        </label>
                        <label
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                            className="ml-8"
                        >
                            Gift
                            <input
                                type="checkbox"
                                name="shipment"
                                defaultChecked
                                onClick={(e) => onlyOne("shipment", e)}
                                className="ml-2"
                            />
                        </label>
                        <label
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                            className="ml-8"
                        >
                            Merchandise
                            <input
                                type="checkbox"
                                name="shipment"
                                onClick={(e) => onlyOne("shipment", e)}
                                className="ml-2"
                            />
                        </label>
                    </td>
                    <td colSpan={3} rowSpan={2}>
                        Signature {get(companyData, "companyName", "-")}
                    </td>
                    <td
                        rowSpan={2}
                        colSpan={3}
                        style={{
                            fontSize: "12px",
                            verticalAlign: "baseline",
                        }}
                    >
                        Shipping Insurance
                        <br />
                        <label
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                            className="mt-8"
                        >
                            Yes
                            <input
                                type="checkbox"
                                name="insurance"
                                onClick={(e) => onlyOne("insurance", e)}
                                className="ml-2"
                            />
                        </label>
                        <label
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                            className="ml-8"
                        >
                            No
                            <input
                                type="checkbox"
                                name="insurance"
                                checked={true}
                                onClick={(e) => onlyOne("insurance", e)}
                                className="ml-2"
                            />
                        </label>
                    </td>
                    <td
                        rowSpan={2}
                        colSpan={5}
                        style={{
                            fontSize: "12px",
                            verticalAlign: "baseline",
                        }}
                    >
                        Insurance Value
                    </td>
                </tr>
                <tr>
                    <td colSpan={4}>Specify Each shipment</td>
                </tr>
                {/* shipment */}
            </table>
        </CustomDeclarationTable>
    );
};

export default CustomsDeclarationTable;
