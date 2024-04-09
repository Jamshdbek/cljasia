import React, { memo, useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Title,
    Loader,
    FormWrapper,
    ContentLoader,
    Flex,
    BaseInput,
} from "components";
import FormSenderMyuhl from "../components/FormSenderMyuhl";
import ContentParcelMyuhl from "../components/ContentParcelMyuhl";
import ReceiverParcelMyuhl from "../components/ReceiverParcelMyuhl";
import SvmCalculatorMyuhl from "../components/SvmCalculatorMyuhl";
import { useDispatch, useSelector } from "react-redux";
import {
    handleClearFilter,
    UsersSelectedByPhone,
} from "app/slices/myuhlSlices/myuhlUsersSelectedByPhone/UsersSelectedByPhoneNumber";
import {
    changePostItem,
    clearPostData,
    fetchSenderInfo,
    handleSaveCostumesCode,
    updatePostData,
} from "app/slices/myuhlPostSlices/createPostSlice/createPostSlice";
import { get, isEmpty, isEqual } from "lodash";
import { MyuhlPostApiService } from "services/apiServices";
import { toast } from "react-toastify";
import history from "router/history";
import MyuhlApiService from "services/apiServices/myuhl";
import { createSelector } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { postCreateReceiverSchema } from "utils/schema/myUhlSchemas/myUhlSchemas";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { fetchAllServiceLimit } from "app/slices/serviceSlices/limitSlice/getOneLimit";
import {
    clearRegionsData,
    clearStates,
} from "app/slices/commonSlices/regionsSlice";
import UsersSelectedByPhoneNumber from "../components/UsersSelectedByPhoneNumber";
import BaseModal from "components/modal";
import { handleChangeFilter } from "app/slices/myuhlSlices/myuhlUsersSelectedByPhone/UsersSelectedByPhoneNumber";

const AddMyUHLParcelContainer = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();
    const [userInfo, setUserInfo] = useState({});
    const limitValue = useSelector((store) =>
        get(store, "service.getOneLimit.data.serviceLimit.data", "")
    );
    const unitLimit = get(limitValue, "limitValue", 3000);
    const newPostData = useSelector(
        (store) => store.myuhlPost.myuhlPostCreate.newPost
    );
    const [isPhoneNumberSearch, setIsPhoneNumberSearch] = useState(false)
    const costumeCodes = useSelector(
        (store) => store.myuhlPost.myuhlPostCreate.regionDistrictCostumeCodes
    );
    const newPostSchema = createSelector(
        (store) => store.myuhlPost.myuhlPostCreate.newPost,
        (newPost) => {
            return {
                ...newPost,
                postProducts: newPost.postProducts.filter((item) => {
                    let result = true;
                    for (const key in item) {
                        if (isEmpty(item[key]) && !isEqual(key, "hsCode")) {
                            result = false;
                        }
                    }
                    return result;
                }),
            };
        }
    );

    const postDataToSubmit = useSelector(newPostSchema);

    const isFetchedSenderInfo = useSelector(
        (store) => store.myuhlPost.myuhlPostCreate.isFetched
    );

    const senderInfo = {
        ...get(newPostData, "from", {}),
        postCode: get(newPostData, "postCode", ""),
    };

    const receiverInfo = {
        ...get(newPostData, "to", {}),
        senderPhoneNumber: get(newPostData, "senderPhoneNumber", ""),
        senderName: get(newPostData, "senderName", ""),
        passport: get(newPostData, "passport", ""),
        pinfl: get(newPostData, "pinfl", ""),
        price: get(newPostData, "price", ""),
        unitValue: get(newPostData, "unitValue", ""),
    };

    const svmData = {
        height: get(newPostData, "height", ""),
        width: get(newPostData, "width", ""),
        length: get(newPostData, "length", ""),
        cbm: get(newPostData, "cbm", ""),
    };
    const contentParcelData = {
        postProducts: get(newPostData, "postProducts", []),
    };
    const dispatchSearchUser = async (phone) => {
        setLoading(true);
        try {
            const newPhone = phone.substring(1);
            MyuhlPostApiService.GetClientInfo({ phone: newPhone }).then(
                (res) => {
                    if (res && res.data && res.data.success) {
                        setLoading(false);
                        setUserInfo(res.data.data);
                        dispatch(
                            updatePostData({
                                name: "senderName",
                                value: get(res, "data.data.name", ""),
                            })
                        );
                    } else if (res && res.data && !res.data.success) {
                        setLoading(false);
                        toast.error(res.data.message);
                    }
                }
            );
        } catch (e) { }
    };
    const [isDisabled, setIsDisabled] = useState(false)
    const [searchPhoneNum,setSearchPhoneNum] = useState()
    const dispatchCreatePost = () => {
        setLoading(true);
        // Disable the button before making the request
        setIsDisabled(true);
        let pohneNum = ''
        get(postDataToSubmit, "to.phoneNumber", [])?.forEach((val) => {
            pohneNum += val?.value + ','
        })
        MyuhlPostApiService.CreateNewPost({
            ...postDataToSubmit,
            to: {
                ...postDataToSubmit.to,
                address: `${
                    get(postDataToSubmit, "to.address", "").split("(")[0]
                }${costumeCodes}`,
                phoneNumber: pohneNum.substring(0,pohneNum.length-1)
            },
        }).then((res) => {
            setIsDisabled(false);
            if (res && res.data && res.data.success) {
                history.goBack();
                toast.success("Success");
                dispatch(clearPostData());
                dispatch(handleClearFilter());
                dispatch(
                    UsersSelectedByPhone({
                        page: 0,
                        size: 10,
                        search: "",
                    })
                );
            } else if (res && res.data && !res.data.success) {
                toast.error(res.data.data.description);
            }

        }).catch((e) => {
            setIsDisabled(false)
        })
    };

    useEffect(() => {
        dispatch(fetchSenderInfo());
        dispatch(handleSaveCostumesCode(""));
        dispatch(clearRegionsData());
        dispatch(fetchAllServiceLimit(1));
    }, []);

    useEffect(() => {
        dispatch(clearPostData());
    }, [pathname]);
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
            // receiverPhoneNumber: pohneNum,
            receiverPassport: get(receiverInfo, "passport", ""),
            receiverCountry: get(receiverInfo, "countryId", ""),
            receiverPINFL: get(receiverInfo, "pinfl", ""),
            receiverPostalCode: get(receiverInfo, "index", ""),
            receiverUnitValue: get(receiverInfo, "unitValue", ""),
            receiverUnitPrice: get(receiverInfo, "price", ""),
            receiverSenderName: get(receiverInfo, "senderName", ""),
            receiverName: get(receiverInfo, "name", ""),
            receiverRegion: get(receiverInfo, "regionId", ""),
            receiverDistrict: get(receiverInfo, "districtId", ""),
            receiverAddress: get(receiverInfo, "address", ""),
            receiverSenderPhoneNumber: get(receiverInfo, "senderPhoneNumber", ""),
            SVMlength: get(svmData, "length", ""),
            SVMwidth: get(svmData, "width", ""),
            SVMheight: get(svmData, "height", ""),
            SVMValue: get(svmData, "cbm", ""),
            productName0: get(
                contentParcelData,
                "postProducts[0].productName",
                ""
            ),
            quantity0: get(contentParcelData, "postProducts[0].quantity", ""),
            hsCode0: get(contentParcelData, "postProducts[0].hsCode", ""),
            productPrice0: get(contentParcelData, "postProducts[0].price", ""),
        },
        validationSchema: postCreateReceiverSchema,
        onSubmit: dispatchCreatePost,
    });
    const [limit, setLimit] = useState(-1)

    const remainingLimit = (value) => {

        MyuhlPostApiService.GetRemainingLimitPost({ 'passport': value })
            .then((res) => {
                if (res.data.success) {
                    setLimit(Number(res.data.data))
                }
            })
            .catch(err => {
                console.log(err.data)
            })

    }


    const calculatePostPrice = () => {
        if (get(newPostData, "unitValue", "")) {
            try {
                MyuhlApiService.CalculatePostPrice({
                    fromCountryId: get(newPostData, "from.countryId", ""),
                    toCountryId: get(newPostData, "to.countryId", ""),
                    unitId: 1,
                    unitAmount: get(newPostData, "unitValue", ""),
                }).then((res) => {
                    if (res && res.data && res.data.success) {
                        dispatch(
                            updatePostData({
                                name: "price",
                                value: get(res, "data.data", ""),
                            })
                        );
                    } else if (res && res.data && !res.data.success) {
                        toast.warning(res.data.data.description);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    };
    useEffect(() => {
        if (touched.receiverUnitValue) {
            calculatePostPrice();
        }
    }, [newPostData.unitValue, touched.receiverUnitValue]);
    moment.locale("en");
    return (
        <Container fluid>
            < BaseModal modalIsOpen={isPhoneNumberSearch}>
                <UsersSelectedByPhoneNumber searchPhoneNum={searchPhoneNum} setIsPhoneNumberSearch={setIsPhoneNumberSearch} remainingLimit={remainingLimit} />
            </BaseModal>
            {isFetchedSenderInfo ? (
                <>
                    {/* {loading && <Loader />} */}
                    <FormWrapper onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} className={"mb-8"}>
                                <BaseBreadcrumb
                                    items={[
                                        {
                                            id: 1,
                                            name: "Почта ",
                                            url: "/email/parcels",
                                        },
                                        {
                                            id: 2,
                                            name: "Добавить",
                                            url: "/email/parcels/add",
                                        },
                                    ]}
                                />
                            </Col>
                            <Col xs={12}>
                                <Content style={{ padding: "0 15px" }}>
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
                                                borderRight:
                                                    "1px solid #E8E8E8",
                                                padding: "20px",
                                            }}
                                        >
                                            <Title>
                                                {get(
                                                    newPostData,
                                                    "postCode",
                                                    ""
                                                )}
                                            </Title>
                                        </Col>
                                        <Col xs={6} align={"center"}>
                                            <Title>
                                                {moment(new Date()).format(
                                                    "YYYY/MM/DD h:mm:ss A"
                                                )}
                                            </Title>
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
                                                borderRight:
                                                    "1px solid #E8E8E8",
                                                padding: "20px",
                                            }}
                                        >
                                            <Title>Отправитель</Title>
                                        </Col>
                                        <Col xs={6} align={"center"}>
                                            <Title>Получатель</Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col
                                            xs={6}
                                            style={{
                                                borderRight:
                                                    "1px solid #E8E8E8",
                                                borderBottom:
                                                    "1px solid #E8E8E8",
                                                padding: "20px 50px",
                                            }}
                                        >
                                            <Row
                                                style={{
                                                    borderBottom:
                                                        "1px solid #E8E8E8",
                                                    margin: "0 -50px",
                                                    padding: "0 0 20px",
                                                }}
                                            >
                                                <Col xs={12}>
                                                    <FormSenderMyuhl
                                                        initialData={senderInfo}
                                                        dispatchPhoneNumber={(
                                                            value
                                                        ) =>
                                                            dispatchNewPostInfo(
                                                                {
                                                                    id: "from",
                                                                    value,
                                                                    name: "phoneNumber",
                                                                }
                                                            )
                                                        }
                                                        dispatchFullName={(
                                                            value
                                                        ) =>
                                                            dispatchNewPostInfo(
                                                                {
                                                                    id: "from",
                                                                    value,
                                                                    name: "name",
                                                                }
                                                            )
                                                        }
                                                        dispatchIndexCode={(
                                                            value
                                                        ) =>
                                                            dispatchNewPostInfo(
                                                                {
                                                                    id: "from",
                                                                    value,
                                                                    name: "index",
                                                                }
                                                            )
                                                        }
                                                        dispatchAddress={(
                                                            value
                                                        ) =>
                                                            dispatchNewPostInfo(
                                                                {
                                                                    id: "from",
                                                                    value: value
                                                                        .target
                                                                        .value,
                                                                    name: "address",
                                                                }
                                                            )
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                            <Row
                                                style={{
                                                    borderBottom:
                                                        "1px solid #E8E8E8",
                                                    margin: "0 -50px",
                                                    padding: 20,
                                                }}
                                            >
                                                <Col xs={12} align={"center"}>
                                                    <Title>
                                                        Описание содержимого
                                                    </Title>
                                                </Col>
                                            </Row>
                                            <Row
                                                style={{
                                                    margin: "0 -50px",
                                                    padding: "10px 0  0",
                                                    // height:'40vh'
                                                }}
                                            >
                                                <Col xs={12} >
                                                    <ContentParcelMyuhl
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
                                        <Col
                                            xs={6}
                                            style={{
                                                borderRight:
                                                    "1px solid #E8E8E8",
                                                borderBottom:
                                                    "1px solid #E8E8E8",
                                                padding: "20px 50px",
                                            }}
                                        >
                                            <Row
                                                style={{
                                                    borderBottom:
                                                        "1px solid #E8E8E8",
                                                    margin: "0 -50px",
                                                    padding: "0 0 20px",
                                                }}
                                            >
                                                <Col xs={12}>
                                                    <ReceiverParcelMyuhl
                                                        handleBlur={handleBlur}
                                                        touched={touched}
                                                        errors={errors}
                                                        data={receiverInfo}
                                                        zIndex={isPhoneNumberSearch}
                                                        setIsPhoneNumberSearch={setIsPhoneNumberSearch}
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
                                                        dispatchSearchUser={() =>

                                                            dispatchSearchUser(
                                                                get(
                                                                    receiverInfo,
                                                                    "senderPhoneNumber",
                                                                    ""
                                                                )
                                                            )
                                                        }
                                                        limit={limit}
                                                        handleChangeWeight={(
                                                            value
                                                        ) => {
                                                            if (
                                                                value <
                                                                unitLimit
                                                            ) {
                                                                dispatchNewPostInfo(
                                                                    {
                                                                        name: "unitValue",
                                                                        value,
                                                                    }
                                                                );
                                                            } else {
                                                                toast.warning(
                                                                    `Вес посылки не должен превышать ${unitLimit} граммов`
                                                                );
                                                            }
                                                        }}
                                                        changeSenderPhoneNumber={(
                                                            item
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    name: "senderPhoneNumber",
                                                                    value: item,
                                                                }
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
                                                            setSearchPhoneNum(value)
                                                            // dispatch(
                                                            //     handleChangeFilter(
                                                            //         { name: "search", value: value[0].value }
                                                            //     )
                                                            // )

                                                        }}
                                                        handleChangePassword={(
                                                            value
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    name: "passport",
                                                                    value,
                                                                }
                                                            );
                                                            if (value.length == 9) {
                                                                remainingLimit(value)

                                                            }
                                                            if (value.length < 9) setLimit(-1)
                                                        }}
                                                        handleChangeCountry={(
                                                            value
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    id: "to",
                                                                    name: "countryId",
                                                                    value,
                                                                }
                                                            );
                                                        }}
                                                        handleChangePinfl={(
                                                            value
                                                        ) => {
                                                            if (value.length > 14) {
                                                                toast.warn('PINFL cannot be larger than 14 in size')
                                                            } else
                                                                dispatchNewPostInfo(
                                                                    {
                                                                        name: "pinfl",
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
                                                        handleChangeSenderName={(
                                                            value
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    name: "senderName",
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
                                                        changeReceiverAddress={(
                                                            value
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    id: "to",
                                                                    name: "address",
                                                                    value: value,
                                                                }
                                                            );
                                                        }}
                                                        handleChangeDistrict={(
                                                            value
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    id: "to",
                                                                    name: "districtId",
                                                                    value,
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
                                                        costumeCodes={
                                                            costumeCodes
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                            <Row
                                                style={{
                                                    borderBottom:
                                                        "1px solid #E8E8E8",
                                                    margin: "0 -50px",
                                                    padding: 20,
                                                }}
                                            >
                                                <Col xs={12} align={"center"}>
                                                    <Title>
                                                        CBM калькулятор
                                                    </Title>
                                                </Col>
                                            </Row>
                                            <Row
                                                style={{
                                                    margin: "0 -50px",
                                                }}
                                            >
                                                <Col xs={12}>
                                                    <SvmCalculatorMyuhl
                                                        data={svmData}
                                                        touched={touched}
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
                                                        ) =>
                                                            dispatchNewPostInfo(
                                                                {
                                                                    name: "cbm",
                                                                    value,
                                                                }
                                                            )
                                                        }
                                                        handleChangeLength={(
                                                            value
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    name: "length",
                                                                    value,
                                                                }
                                                            );
                                                        }}
                                                        handleChangeWidth={(
                                                            value
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    name: "width",
                                                                    value,
                                                                }
                                                            );
                                                        }}
                                                        handleChangeHeight={(
                                                            value
                                                        ) => {
                                                            dispatchNewPostInfo(
                                                                {
                                                                    name: "height",
                                                                    value,
                                                                }
                                                            );
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
                                                // handleClick={() => dispatchCreatePost()}
                                                type="submit"
                                                disabled={isDisabled}
                                            >
                                                Добавить
                                            </BaseButton>
                                        </Col>
                                    </Row>
                                </Content>
                            </Col>
                        </Row>
                    </FormWrapper>
                </>
            ) : (
                <Content>
                    <ContentLoader />
                </Content>
            )}
        </Container>
    );
};

export default memo(AddMyUHLParcelContainer);
