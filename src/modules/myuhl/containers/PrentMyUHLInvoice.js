import { BaseBreadcrumb, BaseButton, Content, Flex, Text } from 'components'
import { get } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system'
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import MyuhlApiService from 'services/apiServices/myuhl';
import styled from 'styled-components';
const CheckReceiptTable = styled.div`
    width: 100%;
    @media print {
        height: fit-content;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        border: 1px solid #000;
        padding:6px 6px;
        font-weight: 600;
        color: inherit;
    }
`;
const PrentMyUHLInvoice = () => {
    const clientCheckRef = useRef();
    const allPostsData = useSelector((store) =>
        get(store, "myuhl.myuhlAllPostsSlice.data.myuhlAllPosts", [])
    );
    const checkedPostData = allPostsData.filter(item => item.checked)
    const [data, setData] = useState()
    useEffect(() => {
        MyuhlApiService.GetCourierCompanies()
            .then(({ data }) => {
                if (data.success) {
                    setData(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
 
    const numberFormat = (item)=>{
        let phoneNum = '';
    get(item, 'to.phoneNumber', '').forEach((val)=>{
        phoneNum+=val.value+','
    })
    return phoneNum
}
// console.log*()
    const postProductList = (postProducts) => {
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
                productName += product[i][j].productName + `${product[i].length - 1 != j ? ', ' : ''}`;
                quantity += product[i][j].quantity + `${product[i].length - 1 != j ? ', ' : ''}`;
                price += product[i][j].price + `${product[i].length - 1 != j ? ', ' : ''}`;
                hsCode += product[i][j].hsCode + `${product[i].length - 1 != j ? ', ' : ''}`;

            }
            productsArray.push({
                productName,
                quantity,
                price,
                hsCode
            })

        }
        if (productsArray.length >= 5)
            return productsArray
        else
            return [
                ...productsArray,
                {
                    id: "1000000000",
                    productName: "",
                    quantity: "",
                    hsCode: "",
                    price: "",
                },
                {
                    id: "1000000001",
                    productName: "",
                    quantity: "",
                    hsCode: "",
                    price: "",
                },
                {
                    id: "1000000002",
                    productName: "",
                    quantity: "",
                    hsCode: "",
                    price: "",
                },
                {
                    id: "1000000003",
                    productName: "",
                    quantity: "",
                    hsCode: "",
                    price: "",
                },
                {
                    id: "1000000004",
                    productName: "",
                    quantity: "",
                    hsCode: "",
                    price: "",
                },
            ].slice(0, 5)
    }
    return <Container >
        <Row>
            <Col xs={12} className={"mb-4"}>
                <BaseBreadcrumb
                    items={[
                        {
                            id: 1,
                            name: "Почта (MyUHL)",
                            url: "/myuhl/parcels",
                        },
                        {
                            id: 2,
                            name: "Invoice",
                            url: "/myuhl/parcels/invoice",
                        },
                    ]}
                />
            </Col>
            <Flex justify={'center'} style={{ width: '100%' }}>
                <div style={{
                    width: '1000px',
                    // padding:'10px 0',
                }} ref={clientCheckRef} align="center">
                    {checkedPostData?.map((item, index) => {
                        return <Content
                            key={get(item, 'id', '')}
                            style={{
                                width: "1000px",
                                border: "none",
                                borderShadow: "none",

                                marginTop: index != 0 ? '50px' : "",

                            }} >
                            <Row justify="space-around" className="">
                                <Col xs={4} className="card">
                                    <Text bold>
                                        COURIER COMPANY’S NAME ANDADRESS/ MY UHL LTD
                                    </Text>
                                    {get(data, 'data[0].name', '')}{" "}
                                    {get(data, 'data[0].address', '')}
                                </Col>
                                <Col xs={4} className="card">
                                    <Text bold>
                                        COURIER COMPANY’S NAME AND SCRIPT LLC
                                    </Text>
                                    {get(data, 'data[1].name', '')}{" "}
                                    {get(data, 'data[1].address', '')}
                                </Col>
                                <Col xs={12} className='mt-8'>
                                    <Text className='text-center' xl bold>
                                        INVOICE   №{" "}{get(item, 'postCode', '')}{" "} <br />
                                        CЧЕТ-ФАКТУРА (ИНВОЙС)
                                    </Text>
                                </Col>
                            </Row>
                            <Row className=''>
                                <Col xs={12}>
                                    <CheckReceiptTable>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '50%' }}>Sender/ Ф.И.О. отправителя:</td>
                                                    <td col>{get(item, 'from.name', '')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Receiver/Получатель:</td>
                                                    <td>{get(item, 'to.name', '')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Receiver’s address/Адрес получателя:</td>
                                                    <td>
                                                        {get(item, 'to.countryName', '')}{" "}
                                                        {get(item, 'to.address', '')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Phone number/Тел номер получателя: </td>
                                                    <td>
                                                        {get(item, 'to.phoneNumber', '')}
                                                    {/* if(get(item, 'to.phoneNumber', '').substring(0, 2) == '99')
                                                        {
                                                            "+" + get(item, 'to.phoneNumber', '').substring(0, 3) +
                                                            " " + get(item, 'to.phoneNumber', '').substring(3, 5) +
                                                            " " + get(item, 'to.phoneNumber', '').substring(5, 8) +
                                                            " " + get(item, 'to.phoneNumber', '').substring(8, 10) +
                                                            " " + get(item, 'to.phoneNumber', '').substring(10, 12)
                                                        }

                                                        else if(get(item, 'to.phoneNumber', '').substring(0, 2) == '82')
                                                        {"+" + get(item, 'to.phoneNumber', '').substring(0, 2) +
                                                            " " + get(item, 'to.phoneNumber', '').substring(2, 5) +
                                                            " " + get(item, 'to.phoneNumber', '').substring(5, 9) +
                                                            " " + get(item, 'to.phoneNumber', '').substring(9, 13)
                                                        }
                                                        else if(get(item, 'to.phoneNumber', '').substring(0, 1) == '7')
                                                        {"+" + get(item, 'to.phoneNumber', '').substring(0, 1) +
                                                            " (" + get(item, 'to.phoneNumber', '').substring(1, 4) +
                                                            ") " + get(item, 'to.phoneNumber', '').substring(4, 7) +
                                                            "-" + get(item, 'to.phoneNumber', '').substring(7, 9) +
                                                            "-" + get(item, 'to.phoneNumber', '').substring(9, 11)
                                                        } */}
                                                      
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Passport number/Паспорт получателя:</td>
                                                    <td>{get(item, 'passport', '')}{" "}/{" "}{get(item, 'pinfl', '')}</td>
                                                </tr>
                                                <tr>
                                                    <td>By order*/По поручению*</td>
                                                    <td style={{ fontWeight: '400' }}>
                                                        Не обязательно для заполнения. Указывается полное наименование и
                                                        реквизиты если имеется контрактодержатель (контрагент, и/или
                                                        поручитель)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Contract number*/Номер контракта*
                                                    </td>
                                                    <td style={{ fontWeight: '400' }}>
                                                        Не обязательно для заполнения. Указывается номер и дата
                                                        внешнеторгового контракта (если имеется)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Waybill name/Номер накладной*
                                                    </td>
                                                    <td style={{ fontWeight: '400' }}>

                                                        Не обязательно для заполнения. Указывается номер транспортной
                                                        накладной   в соответствии с Международными Конвенциями
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Delivery terms (INCOTERMS)/Условия поставки
                                                        (ИНКОТЕРМС)*
                                                    </td>
                                                    <td style={{ fontWeight: '400' }}>

                                                        Не обязательно для заполнения. Указываются условия поставки в
                                                        соответствии с правилами ИНКОТЕРМС 2000 или 2010

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </CheckReceiptTable>
                                </Col>
                                <Col xs={12} className='mt-8'>
                                    <CheckReceiptTable>
                                        <table>
                                            <tr>
                                                <td colSpan={7} style={{ textAlign: 'center' }}>
                                                    <Text xl bold> Name of goods/Перечень товаров</Text>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> № </td>
                                                <td style={{ width: '300%' }}> Name/Наименование </td>
                                                <td>Quantity/Количество</td>
                                                <td>Netweight/ Вес нетто</td>
                                                <td>Gross weight/ Вес брутто</td>
                                                <td>Price/Цена за единицу</td>
                                                <td>Total price/ Цена</td>

                                                {

                                                }</tr>
                                            {postProductList(get(item, 'postProducts', [])).map((value, id) => {
                                                return <tr key={id}>
                                                    <td>{id + 1}.</td>
                                                    <td>{get(value, 'productName', '')}</td>
                                                    <td>{get(value, 'quantity', '')}</td>
                                                    <td>{get(value, '.', '')}</td>
                                                    <td>{get(value, '.', '')}</td>
                                                    <td>{get(value, '.', '')}</td>
                                                    <td>{get(value, 'price', '')}</td>
                                                </tr>
                                            })
                                            }
                                            <tr>


                                                <td>ㅤ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>ㅤ</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} style={{ textAlign: 'center' }}>
                                                    TOTAL/ИТОГО
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td>{(get(item, 'unitValue', 0) / 1000).toFixed(2)}</td>
                                                <td></td>
                                                <td>
                                                    {get(item, 'postProducts', []).reduce((a, b) => a + b.price, 0)}
                                                </td>

                                            </tr>
                                        </table>
                                    </CheckReceiptTable>
                                </Col>
                                <Col xs={12} className='mt-8'>
                                    <Text justify={'center'} bold>SHIPPER’S or SENDER’S SIGNATURE AND STAMP/
                                        <br />
                                        DATE
                                    </Text>

                                </Col>
                                <Col xs={12}>
                                    <br />
                                    <Text style={{ textAlign: 'start', paddingLeft: '30px' }}>
                                        _________________________________________________________________________________ <br />
                                        Declaration Statement: I hereby certify that the information on this invoice is true and correct and the contents and value of this shipment is
                                        as stated above <br />
                                        <br />
                                        * - Optional fields/Поля, не обязательные для заполнения

                                    </Text>
                                </Col>
                            </Row>

                        </Content>
                    })}
                </div>
                <div className='mt-16 mb-16' style={{ height: '100%', marginLeft: '20px' }}>
                    <ReactToPrint
                        trigger={() => {
                            return <BaseButton primary>Печать</BaseButton>;
                        }}
                        content={() => clientCheckRef.current}
                        pageStyle={"print"}
                        height={'80vh'}
                        documentTitle={"Чек"}
                    />
                </div>
            </Flex>
        </Row>
    </Container>
}

export default PrentMyUHLInvoice