import { BaseBreadcrumb, BaseButton, Content, Flex, FormWrapper, Text, Title } from "components";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import FormSenderMyems from "../components/FormSenderMyems";
import ContentParcelMyems from "../components/ContentParcelMyems";
import ReceiverParcelMyems from "../components/ReceiverParcelMyems";
import SvmCalculatorMyems from "../components/SvmCalculatorMyems";
import { changePostItem, clearPostData } from "app/slices/myemsSlices/addPostMyems/addPostMyems";
import { useDispatch, useSelector } from "react-redux";
import { MyemsApiService } from "services/apiServices";
import { createSelector } from "@reduxjs/toolkit";
import { get, isEmpty, isEqual } from "lodash";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import history from "router/history";
import { postCreateReceiverSchema, postCreateReceiverDocSchema } from "utils/schema/myEmsSchema/myEmsSchema";
import ContentDocument from "../components/ContentDocument";
import BaseModal from "components/modal";
import UserReceiverSearch from "../components/UsersReceiverSearch";




const AddMyEMSParcelContainer = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const newPostData = useSelector(
        (store) => store.myems.addPostMyems.newPost
    );
    const [newDetails, setNewDetails] = useState({})
    useEffect(() => {
        MyemsApiService.newDetails().then((res) => {
            if (res && res.data)
                setNewDetails(res.data.data)
        }).catch(err => { console.log(err) })
    }, [])



    const receiverInfo = {
        ...get(newPostData, "to", {}),
        senderPhoneNumber: get(newPostData, "senderPhoneNumber", ""),
        senderName: get(newPostData, "senderName", ""),
        passport: get(newPostData, "passport", ""),
        pinfl: get(newPostData, "pinfl", ""),
        price: get(newPostData, "price", ""),
        unitValue: get(newPostData, "unitValue", ""),
        postClassification: get(newPostData, 'postClassification', 1)
    };

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

   

    const svmData = {
        height: get(newPostData, "height", ""),
        width: get(newPostData, "width", ""),
        length: get(newPostData, "length", ""),
        cbm: get(newPostData, "cbm", ""),
    };
    const contentParcelData = {
        postProducts: get(newPostData, "postProducts", []),
        product_type: newPostData.to.product_type
    };
    const createData = async () => {

        const products = await newPostData.postProducts.filter((value) => {
            return value.productName !== ''
        })

        const newProducts = await products.map(element => {
            return {
                contents: element.productName,
                number: (element.quantity),
                value: (element.price),
                weight: (element.gramm),
                hs_code: (element.hsCode)
            }
        })
        const request = await {
            countryCd: newPostData?.to.countryCd.split(" ")[0],
            countryName: newPostData?.to.countryCd.split(" ")[1],
            totWeight: (newPostData.to.totWeight),
            sender: newDetails.name,
            senderZipCode: newDetails.postalCode,
            senderAdd1: newDetails.address1,
            senderAdd2: newDetails.address2,
            senderTelNo1: newDetails.phoneNumber,
            receiveZipCode: (newPostData.to.index),
            receiveName: newPostData.to.name,
            receiveAdd2: newPostData.to.address1,
            receiveAdd3: newPostData.to.address2,
            receiveTelNo: (newPostData.to.phoneNumber),
            postClassification: newPostData.postClassification,
            price: newPostData.price,
            productDTOList: newProducts,
            boxHeight: newPostData.height,
            boxLength: newPostData.length,
            boxWidth: newPostData.width,
            volumeWeight: newPostData?.cbm
        }
        await MyemsApiService.createPost(request).then((res) => {
            if (res && res.data && res.data.success) {
                history.goBack();
                dispatch(clearPostData());
                toast.success("Success");
            }
            else {
                toast.warning(res.data.data.description);
            }

        })
    }

    const [postData, setPostData] = useState('')
    const [maxWeight, setMaxWeght] = useState(30000)
    const [getDeliveyCost, setGetDeliveyCost] = useState({
        countryCd: '',
        volumeWeight: 0,
        totWeight: 0
    });
    const priceCalculator = (svm) => {
        setLoading(true)
        if (get(getDeliveyCost, 'countryCd', ''))
            MyemsApiService.getDeliveyCost({
                countryCd: get(getDeliveyCost, 'countryCd', '').split(' ')[0],
                totWeight: svm,
                id: get(newPostData, 'postClassification', 1),
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false)
                    setPostData(res.data.data)
                    dispatchNewPostInfo({ name: "price", value: res.data.data })
                }
                else {
                    setLoading(false)
                    toast.warning(res.data.data.description)
                }
            })
    }
    const [isPhoneNumberSearch,setIsPhoneNumberSearch] = useState(false)

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,

    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            receiveTelNo: get(receiverInfo, "phoneNumber", ""),
            receiverPostalCode: get(receiverInfo, "index", ""),
            totWeight: get(receiverInfo, "totWeight", ""),
            price: get(receiverInfo, "price", ""),
            receiverSenderName: get(receiverInfo, "senderName", ""),
            receiverUnitValue: get(receiverInfo, 'totWeight', ""),
            receiverName: get(receiverInfo, "name", ""),
            receiveAdd2: get(receiverInfo, "address1", ""),
            receiveAdd3: get(receiverInfo, "address1", ""),
            countryCd: get(receiverInfo, 'countryCd', ""),
            boxLength: get(svmData, "length", ""),
            boxWidth: get(svmData, "width", ""),
            boxHeight: get(svmData, "height", ""),
            volumeWeight: get(svmData, "cbm", ""),
            productName0: get(contentParcelData, "postProducts[0].productName", ""),
            quantity0: get(contentParcelData, "postProducts[0].quantity", ""),
            gramm0: get(contentParcelData, 'postProducts[0].gramm', ""),
            productPrice0: get(contentParcelData, "postProducts[0].price", ""),
        },
        validationSchema: postCreateReceiverSchema,
        onSubmit: createData,
    });

    return (
        <>

            <Container fluid>
                <BaseModal modalIsOpen={isPhoneNumberSearch}>
                  <UserReceiverSearch setIsPhoneNumberSearch={setIsPhoneNumberSearch}/>
                </BaseModal>
                <FormWrapper onSubmit={handleSubmit} >
                    <Row>
                        <Col xs={12} className={"mb-8"}>
                            <BaseBreadcrumb
                                items={[
                                    {
                                        id: 1,
                                        name: "Почта ",
                                        url: "/myems/parcels",
                                    },
                                    {
                                        id: 2,
                                        name: "Добавить",
                                        url: "/myems/parcels/add",
                                    },
                                ]}
                            />
                        </Col>
                        <Col xs={12}>
                            <Content style={{ padding: "0 15px" }} onSubmit={createData}>
                                <Row>
                                    <Col xs={6}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            borderBottom: "1px solid #E8E8E8",
                                            padding: "20px 50px"
                                        }} >
                                        <Flex style={{ gap: '30px' }}>
                                            <Text>Классификация</Text>
                                            <label>
                                                <input
                                                    style={{ margin: '0 10px' }}
                                                    type="radio"
                                                    name="Classification"
                                                    checked={get(newPostData, 'postClassification', 1) == 1}
                                                    onChange={() => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                value: 1,
                                                                name: "postClassification",
                                                            }
                                                        )
                                                        setMaxWeght(30000)
                                                    }}
                                                />
                                                ЕМС </label>
                                            <label>
                                                <input
                                                    style={{ margin: '0 10px ' }}
                                                    type="radio"
                                                    name="Classification"
                                                    checked={get(newPostData, 'postClassification', 1) == 2}
                                                    onChange={() => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                value: 2,
                                                                name: "postClassification",
                                                            }
                                                        )
                                                        setMaxWeght(70000)
                                                    }} />
                                                Премиум </label>
                                        </Flex>
                                    </Col>
                                    <Col xs={6}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            borderBottom: "1px solid #E8E8E8",
                                            padding: "20px 50px"
                                        }} >
                                    </Col>
                                </Row>
                                <Row
                                    style={{
                                        borderBottom: "1px solid #E8E8E8",
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    <Col
                                        xs={6}
                                        align={"center"}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            padding: "20px",
                                        }}
                                    >
                                        <Title>Отправитель</Title>
                                    </Col>
                                    <Col xs={6} align={"center"}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            padding: "20px",
                                        }}>
                                        <Title>Получатель</Title>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        xs={6}
                                        style={{
                                            borderRight: '1px solid #E8E8E8',
                                            borderBottom: '1px solid #E8E8E8',
                                            padding: "20px 50px",
                                        }}
                                    >
                                        <Row style={{
                                            margin: '16px -50px',
                                            padding: "0 0 10px",
                                        }}>
                                            <Col
                                                xs={12}
                                            >

                                                <FormSenderMyems
                                                    newDetails={newDetails}
                                                    setNewDetails={setNewDetails}

                                                    setFieldValue={(name, value) => {
                                                        setFieldValue({ name, value })
                                                    }}
                                                />
                                            </Col>
                                        </Row>



                                    </Col>
                                    <Col
                                        xs={6}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            borderBottom:"1px solid #E8E8E8",
                                            padding: "20px 50px",
                                        }}>
                                        <Row
                                            style={{
                                                margin: "0 -50px",
                                                padding: "0 0 20px",
                                            }}
                                        >
                                            <Col xs={12}>
                                                <ReceiverParcelMyems
                                                    setIsPhoneNumberSearch={setIsPhoneNumberSearch}
                                                    zIndex={isPhoneNumberSearch}
                                                    handleBlur={handleBlur}
                                                    priceCalculator={priceCalculator}
                                                    setGetDeliveyCost={setGetDeliveyCost}
                                                    getDeliveyCost={getDeliveyCost}
                                                    touched={touched}
                                                    errors={errors}
                                                    data={receiverInfo}
                                                    postData={postData}
                                                    svmData={svmData}
                                                    maxWeight={maxWeight}
                                                    setFieldValue={(
                                                        name,
                                                        e
                                                    ) =>
                                                        setFieldValue(
                                                            name,
                                                            e
                                                        )
                                                    }
                                                    handleChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                    handleChangetotWeight={(
                                                        value
                                                    ) => {
                                                        (value < maxWeight) ?
                                                            dispatchNewPostInfo(
                                                                {
                                                                    id: "to",
                                                                    name: "totWeight",
                                                                    value,
                                                                }) : toast.warning(
                                                                    `Вес посылки не должен превышать ${maxWeight} граммов`
                                                                );

                                                    }}
                                                    changePhoneNumber={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "to",
                                                                value,
                                                                name: "phoneNumber",
                                                            }
                                                        );
                                                    }}
                                                    handleChangecountryCd={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "to",
                                                                name: "countryCd",
                                                                value,
                                                            }
                                                        );
                                                    }}
                                                    handleChangeRecieverPost={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "to",
                                                                name: "index",
                                                                value,
                                                            }
                                                        );
                                                    }}
                                                    handleChangePrice={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                name: "price",
                                                                value,
                                                            }
                                                        );
                                                    }}
                                                    handleChangeName={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "to",
                                                                name: "name",
                                                                value,
                                                            }
                                                        );
                                                    }}
                                                    changeReceiverAddress1={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "to",
                                                                name: "address2",
                                                                value: value,
                                                            }
                                                        );
                                                    }}
                                                    changeReceiverAddress2={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "to",
                                                                name: "address3",
                                                                value: value,
                                                            }
                                                        );
                                                    }}

                                                    handleChangeRegion={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "to",
                                                                name: "regionId",
                                                                value,
                                                            }
                                                        );
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row
                                    style={{
                                        // borderBottom: "1px solid #E8E8E8",
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    <Col
                                        xs={6}
                                        align={"center"}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            borderBottom: "1px solid #E8E8E8",
                                            padding: "20px",
                                        }}
                                    >
                                        <Title>   Описание содержимого</Title>
                                    </Col>
                                        <Col xs={6} align={"center"}
                                            style={{
                                                borderRight: "1px solid #E8E8E8",
                                                borderBottom: "1px solid #E8E8E8",
                                                padding: "20px",
                                            }}>
                                            <Title>Вес (грамм) калькулятор</Title>
                                        </Col>
                                </Row>
                                <Row
                                    style={{
                                        borderBottom: "1px solid #E8E8E8",
                                    }}
                                >
                                    <Col xs={6}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            borderBottom: "1px solid #E8E8E8",
                                            padding: "20px 50px",
                                        }}>
                                        <Row style={{
                                            margin: "0 -50px",
                                            padding: "20px 0 0"
                                        }}>
                                            <Col xs={12}>
                                                <ContentParcelMyems
                                                    touched={touched}
                                                    errors={errors}
                                                    data={contentParcelData}
                                                    setFieldValue={(
                                                        name,
                                                        e
                                                    ) =>
                                                        setFieldValue(
                                                            name,
                                                            e
                                                        )
                                                    }
                                                    dispatchProductType={(value) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "to",
                                                                name: 'product_type',
                                                                value
                                                            }
                                                        )
                                                    }}

                                                    changeContentParcel={(
                                                        item
                                                    ) => {
                                                        dispatchNewPostInfo(
                                                            {
                                                                id: "postProducts",
                                                                ...item,
                                                            }
                                                        );
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={6}>
                                        <Row
                                            style={{
                                                margin: "0 -15px",
                                            }}
                                        >
                                            <Col xs={12}
                                                style={{
                                                    borderRight: '1px solid #E8E8E8',
                                                    padding: "20px 50px",
                                                }}
                                            >
                                                <SvmCalculatorMyems
                                                    data={svmData}
                                                    touched={touched}
                                                    priceCalculator={priceCalculator}
                                                    setGetDeliveyCost={setGetDeliveyCost}
                                                    getDeliveyCost={getDeliveyCost}
                                                    errors={errors}
                                                    setFieldValue={(
                                                        name,
                                                        e
                                                    ) =>
                                                        setFieldValue(
                                                            name,
                                                            e
                                                        )
                                                    }
                                                    handleDispatchSVM={(
                                                        value
                                                    ) => {
                                                        if (value <= maxWeight)
                                                            dispatchNewPostInfo(
                                                                {
                                                                    name: "cbm",
                                                                    value,
                                                                }
                                                            )
                                                        else {
                                                            toast.warning(
                                                                `Вес посылки не должен превышать ${maxWeight} граммов`
                                                            );
                                                        }
                                                    }
                                                    }
                                                    handleChangeLength={(
                                                        value
                                                    ) => {
                                                        // if (value )
                                                        dispatchNewPostInfo(
                                                            {
                                                                name: "length",
                                                                value,
                                                            }
                                                        );
                                                        // else toast.warning(
                                                        //     `Вес посылки не должен превышать ${3000} граммов`
                                                        // );
                                                    }}
                                                    handleChangeWidth={(
                                                        value
                                                    ) => {
                                                        // if (value )
                                                        dispatchNewPostInfo(
                                                            {
                                                                name: "width",
                                                                value,
                                                            }
                                                        );
                                                        // else toast.warning(
                                                        //     `Вес посылки не должен превышать ${3000} граммов`
                                                        // );
                                                    }}
                                                    handleChangeHeight={(
                                                        value
                                                    ) => {
                                                        // if (value )
                                                        dispatchNewPostInfo(
                                                            {
                                                                name: "height",
                                                                value,
                                                            }
                                                        );
                                                        // else
                                                        //     toast.warning(
                                                        //         `Вес посылки не должен превышать ${3000} граммов`
                                                        //     );
                                                    }}
                                                />

                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col
                                        xs={12}
                                        className={"mt-32 mb-32"}
                                        align="center"
                                    >
                                        <BaseButton
                                            green
                                            type="submit"
                                        >
                                            Добавить
                                        </BaseButton>
                                    </Col>
                                </Row>
                            </Content>
                        </Col>
                    </Row>
                </FormWrapper>
            </Container>
        </>
    );
}

export default AddMyEMSParcelContainer