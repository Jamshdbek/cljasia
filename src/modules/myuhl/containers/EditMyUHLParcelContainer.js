import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Title,
    Loader,
    ContentLoader,
} from "components";
import FormSenderMyuhl from "../components/FormSenderMyuhl";
import ContentParcelMyuhl from "../components/ContentParcelMyuhl";
import ReceiverParcelMyuhl from "../components/ReceiverParcelMyuhl";
import SvmCalculatorMyuhl from "../components/SvmCalculatorMyuhl";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { get, isEmpty, isEqual } from "lodash";
import { MyuhlPostApiService } from "services/apiServices";
import { toast } from "react-toastify";
import history from "router/history";
import {
    changeEditPostItem,
    fetchPostInfo,
    updateEditPostData,
} from "app/slices/myuhlPostSlices/editPostSlice";
import { useParams } from "react-router-dom";
import MyuhlApiService from "services/apiServices/myuhl";
import { fetchAllServiceLimit } from "app/slices/serviceSlices/limitSlice/getOneLimit";

const EditMyUHLParcelContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        dispatch(fetchPostInfo(id));
    }, [id]);

    const districtCustomsCode = useSelector((store) =>
        get(store, "common.regions.districtCostumeCode.customsCode", "")
    );

    const regionCustomsCode = useSelector((store) =>
        get(store, "common.regions.regionPostalCode.customsCode", "")
    );

    const postData = useSelector(
        (store) => store.myuhlPost.editMyuhlPost.postData
    );
    // console.log("postData",postData)
    const isFetchedPostData = useSelector(
        (store) => store.myuhlPost.editMyuhlPost.isFetched
    );
    const senderInfo = {
        ...get(postData, "from", {}),
        postCode: get(postData, "postCode", ""),
    };
    const receiverInfo = {
        ...get(postData, "to", {}),
        senderPhoneNumber: get(postData, "senderPhoneNumber", ""),
        senderName: get(postData, "senderName", ""),
        passport: get(postData, "passport", ""),
        pinfl: get(postData, "pinfl", ""),
        price: get(postData, "price", ""),
        unitValue: get(postData, "unitValue", ""),
    };
    const svmData = {
        height: get(postData, "height", ""),
        width: get(postData, "width", ""),
        length: get(postData, "length", ""),
        cbm: get(postData, "cbm", ""),
    };
    const contentParcelData = {
        postProducts: get(postData, "postProducts", []),
    };
    const limitValue = useSelector((store) =>
        get(store, "service.getOneLimit.data.serviceLimit.data", "")
    );

    const unitLimit = get(limitValue, "limitValue", 3000);
    const dispatchSearchUser = async (phone) => {
        setLoading(true);
        try {
            const newPhone = phone;
            MyuhlPostApiService.GetClientInfo({
                phone: newPhone.substring(1),
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    setUserInfo(res.data.data);
                    dispatch(
                        updateEditPostData({
                            name: "senderName",
                            value: get(res, "data.data.name", ""),
                        })
                    );
                    dispatch(
                        updateEditPostData({
                            name: "clientId",
                            value: get(res, "data.data.id", ""),
                        })
                    );
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.success(get(res, "data.message", ""));
                }
            });
        } catch (e) {}
    };

    const calculatePostPrice = () => {
        // setLoading(true);
        if (get(postData, "unitValue", "")) {
            try {
                MyuhlApiService.CalculatePostPrice({
                    fromCountryId: get(postData, "from.countryId", ""),
                    toCountryId: get(postData, "to.countryId", ""),
                    unitId: 1,
                    unitAmount: get(postData, "unitValue", ""),
                }).then((res) => {
                    if (res && res.data && res.data.success) {
                        // setLoading(false);
                        dispatch(
                            updateEditPostData({
                                name: "price",
                                value: get(res, "data.data", ""),
                            })
                        );
                    } else if (res && res.data && !res.data.success) {
                        // setLoading(false);
                        toast.error(get(res, "data.message", ""));
                    }
                });
            } catch (e) {}
        }
    };

    useEffect(() => {
        dispatch(fetchAllServiceLimit(1));
        calculatePostPrice();
    }, [postData.unitValue]);

    const costumeCodes = useSelector(
        (store) => store.myuhlPost.myuhlPostCreate.regionDistrictCostumeCodes
    );

    const newPostSchema = createSelector(
        (store) => store.myuhlPost.editMyuhlPost.postData,
        (postData) => {
            // return postData;
            return {
                ...postData,
                postProducts: postData.postProducts.filter((item) => {
                    let result = true;
                    for (const key in item) {
                        if (
                            isEmpty(item[key].toString()) &&
                            !isEqual(key, "hsCode")
                        ) {
                            result = false;
                        }
                    }
                    return result;
                }),
            };
        }
    );

    const postDataToSubmit = useSelector(newPostSchema);
  
    const dispatchCreatePost = () => {
        setLoading(true);
        let phoneNum=''
        get(postDataToSubmit, "to.phoneNumber", []).forEach((val)=>{
            phoneNum+=val.value+','
        })
        try {
            MyuhlApiService.UpdatePostData({
                ...postDataToSubmit,
                to: {
                    ...postDataToSubmit.to,
                    address: `${
                        get(postDataToSubmit, "to.address", "").split("(")[0]
                    }${costumeCodes}`,
                    phoneNumber: phoneNum.substring(0,phoneNum.length-1)
                },
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    history.goBack();
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.error(get(res, "data.message", ""));
                }
            });
        } catch (e) {}
    };

    const dispatchNewPostInfo = ({ value, name, id, index }) => {
        dispatch(
            changeEditPostItem({
                value,
                name,
                id,
                index,
            })
        );
    };

    const [fieldValue, setFieldValue] = useState();

    return (
        <Container fluid>
            {loading && <Loader />}
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
                                name: "Редактировать",
                                url: "/email/parcels/edit",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content style={{ padding: "0 15px" }}>
                        {isFetchedPostData ? (
                            <>
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
                                        <Title>
                                            {get(postData, "postCode", "")}
                                        </Title>
                                    </Col>
                                    <Col xs={6} align={"center"}>
                                        <Title>2022/12/14 5:12:05 PM</Title>
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
                                    <Col xs={6} align={"center"}>
                                        <Title>Получатель</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col
                                        xs={6}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            borderBottom: "1px solid #E8E8E8",
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
                                                        dispatchNewPostInfo({
                                                            id: "from",
                                                            value,
                                                            name: "phoneNumber",
                                                        })
                                                    }
                                                    dispatchFullName={(value) =>
                                                        dispatchNewPostInfo({
                                                            id: "from",
                                                            value,
                                                            name: "name",
                                                        })
                                                    }
                                                    dispatchIndexCode={(
                                                        value
                                                    ) =>
                                                        dispatchNewPostInfo({
                                                            id: "from",
                                                            value,
                                                            name: "index",
                                                        })
                                                    }
                                                    dispatchAddress={(value) =>
                                                        dispatchNewPostInfo({
                                                            id: "from",
                                                            value: value.target
                                                                .value,
                                                            name: "address",
                                                        })
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
                                                padding: "10px 0 0",
                                            }}
                                        >
                                            <Col xs={12}>
                                                <ContentParcelMyuhl
                                                    data={contentParcelData}
                                                    setFieldValue={(name, e) =>
                                                        setFieldValue({
                                                            name,
                                                            e,
                                                        })
                                                    }
                                                    changeContentParcel={(
                                                        item
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            id: "postProducts",
                                                            ...item,
                                                        });
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col
                                        xs={6}
                                        style={{
                                            borderRight: "1px solid #E8E8E8",
                                            borderBottom: "1px solid #E8E8E8",
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
                                                    setFieldValue={(name, e) =>
                                                        setFieldValue({
                                                            name,
                                                            e,
                                                        })
                                                    }
                                                    editable
                                                    data={receiverInfo}
                                                    dispatchSearchUser={() =>
                                                        dispatchSearchUser(
                                                            get(
                                                                receiverInfo,
                                                                "senderPhoneNumber",
                                                                ""
                                                            )
                                                        )
                                                    }
                                                    handleChangeWeight={(
                                                        value
                                                    ) => {
                                                        if (value < unitLimit) {
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
                                                        dispatchNewPostInfo({
                                                            name: "senderPhoneNumber",
                                                            value: item,
                                                        });
                                                    }}
                                                    changePhoneNumber={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            id: "to",
                                                            value,
                                                            name: "phoneNumber",
                                                        });
                                                    }}
                                                    handleChangePassword={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            name: "passport",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangeCountry={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            id: "to",
                                                            name: "countryId",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangePinfl={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            name: "pinfl",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangeRecieverPost={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            id: "to",
                                                            name: "index",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangePrice={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            name: "price",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangeSenderName={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            name: "senderName",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangeName={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            id: "to",
                                                            name: "name",
                                                            value,
                                                        });
                                                    }}
                                                    changeReceiverAddress={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            id: "to",
                                                            name: "address",
                                                            value: value,
                                                        });
                                                    }}
                                                    handleChangeDistrict={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            id: "to",
                                                            name: "districtId",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangeRegion={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            id: "to",
                                                            name: "regionId",
                                                            value,
                                                        });
                                                    }}
                                                    costumeCodes={costumeCodes}
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
                                                <Title>CBM калькулятор</Title>
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
                                                    setFieldValue={(name, e) =>
                                                        setFieldValue({
                                                            name,
                                                            e,
                                                        })
                                                    }
                                                    handleDispatchSVM={(
                                                        value
                                                    ) =>
                                                        dispatchNewPostInfo({
                                                            name: "cbm",
                                                            value,
                                                        })
                                                    }
                                                    handleChangeLength={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            name: "length",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangeWidth={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            name: "width",
                                                            value,
                                                        });
                                                    }}
                                                    handleChangeHeight={(
                                                        value
                                                    ) => {
                                                        dispatchNewPostInfo({
                                                            name: "height",
                                                            value,
                                                        });
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
                                            handleClick={() =>
                                                dispatchCreatePost()
                                            }
                                        >
                                            Обновить
                                        </BaseButton>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <ContentLoader />
                        )}
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default EditMyUHLParcelContainer;
