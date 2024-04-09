import { Container, Row, Col } from "react-grid-system";
import React, { useRef, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
    BaseBreadcrumb,
    Content,
    BaseTable,
    ContentLoader,
    BaseButton,
    Flex,
    BaseInput,
    BaseSelect,
    BaseDatePicker,
    Text,
    BasePagination,
    BaseCheckbox,
    Loader,
    FormWrapper,
} from "components";

import { toast } from "react-toastify";
// import { myEmsDate, dateFormat } from "../../../utils/index";
import { dateFormat, dateFormatDefault } from "../../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import {
    fetchMyemsAllPosts,
    handleChangeFilter,
    handleClearFilter,
    handleChangeCheckbox
} from "app/slices/myemsSlices/myemsAllPostsSlice/myemsAllPostsSlice"
import { HasAccess } from "services/auth";
import { get, isEmpty } from "lodash";
import { Link, useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";
import moment from "moment";
import { useEffect } from "react";
import { clearPostData } from "app/slices/myemsSlices/addPostMyems/addPostMyems";
import { MyemsApiService } from "services/apiServices";
import zipcelx from 'zipcelx'

const MyEMSParcelsContainer = () => {
    const history = useHistory();
    const [checkAllPosts, setCheckAllPosts] = useState(false)
    const dispatch = useDispatch();

    const refStatus = useRef();
    const refCountry = useRef();
    const CheckRef = useRef()
    // const refCreator = useRef();


    const clearStatusSelect = () => {
        refStatus.current.clearValue();
    };
    const clearCountrySelect = () => {
        refCountry.current.clearValue();
    };
    // const clearCreatorSelect = () => {
    //     refCreator.current.clearValue();
    // };
    const allPostsData = useSelector((store) => get(store, 'myems.myemsAllPostsSlice.data.myemsAllPosts', []))

    const [active, setActive] = useState(true)
    const [clear, setClear] = useState("");
    const [nationInfo, setNationInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const paginationData = useSelector((store) =>
        get(store, "myems.myemsAllPostsSlice.data.pagination", [])
    );
    const isCheckedParcelsSchema = createSelector(
        (store) =>
            get(store, "myems.myemsAllPostsSlice.data.myemsAllPosts", []),
        (myemsAllPosts) => {
            const arr = myemsAllPosts.filter((item) => item.checked);
            return !isEmpty(arr);
        }
    );
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        handleApply();
        setLoading(false)
    };
    const handleApply = () => {

        dispatch(fetchMyemsAllPosts(filter));

    };
    const clearSelect = () => {
        dispatch(handleClearFilter());
        dispatch(
            fetchMyemsAllPosts({
                size: filter.size,
                page: filter.page,
                emsCode: null,
                status: null,
                locationId: null,
                countryCd: null,
                fromDate: moment().subtract(2, "month").format("YYYY-MM-DD"),
                toDate: moment().add(1, "days").format("YYYY-MM-DD"),
            })
        );
        // clearLocationSelect();
        clearStatusSelect();
        clearCountrySelect();
        // clearCreatorSelect();
        setClear('');

    };
    const isUnCheckedParcelsSchema = createSelector(
        (store) =>
            get(store, "myems.myemsAllPostsSlice.data.myemsAllPosts", []),
        (myemsAllPosts) => {
            const arr = myemsAllPosts.filter((item) => !item.checked);
            return !isEmpty(arr);
        }
    );
    const isCheckedParcels = useSelector(isCheckedParcelsSchema);
    const isUncheckedParcels = useSelector(isUnCheckedParcelsSchema);
    const isLoading = useSelector((state) =>
        get(state, 'myems.myemsAllPostsSlice.data.loading', false)
    )
    const totalPages = get(paginationData, "totalPages", null);
    const current = get(paginationData, "currentPageNumber", null)
    const filter = useSelector(
        (store) => store.myems.myemsAllPostsSlice.filter
    );
    useEffect(() => {
        document.title = "Почта ";
    }, []);
    useEffect(() => {

        dispatch(fetchMyemsAllPosts(filter));

    }, [filter.page, filter.size]);
    const handleAddPrice = () => {

        history.push("/myems/parcels/add");

    };
    const newPostData = useSelector(
        (store) => store.myems.addPostMyems.newPost
    );
    useEffect(() => {
        setLoading(true)
        MyemsApiService.getNationList(get(newPostData, 'postClassification', 1)).then((res) => {
            if (res && res.data && res.data.success) {
                setLoading(false)
                setNationInfo(res.data.data);

            }
        }).catch((error) =>
            error
        )
        return () => {
            setLoading(true)
        }
    }, [])
    const nationArray = nationInfo?.map(item => {
        return {
            label: get(item, "nationFm", "-"),
            value: get(item, "nationCode", "-"),
        };
    })
    const timeDifference = [
        { label: "1 day", value: moment().subtract(0, "days").format("YYYY-MM-DD") },
        { label: "1 week", value: moment().subtract(7, "days").format("YYYY-MM-DD") },
        { label: "1 month", value: moment().subtract(1, "month").format("YYYY-MM-DD") },
        { label: "3 month", value: moment().subtract(3, "month").format("YYYY-MM-DD") },
    ]
    const handelExportToExcel = (evt) => {
        const newData = allPostsData.map((data,index)=>{
            if (data.checked){
                return {
                    id:index+1,
                    ems:'EMS',
                    val:'비서류',
                    reservationNumber:get(data, "reservationNumber", "-") + "ㅤ",
                    code:get(data, "code", "-"),
                    date1:dateFormatDefault(get(data, "createdAt", "-")).props.children.props.children[0],
                    date2:dateFormatDefault(get(data, "createdAt", "-")).props.children.props.children[3],
                    totWeight:get(data, "totWeight", "-"),
                    volumeWeight:get(data, "volumeWeight", "-"),
                    sender:get(data, 'sender', "-"),
                    receiverName:get(data, 'receiveName', "-"),
                    recevieTelNo:"+" + get(data, 'receiveTelNo', "-") + "ㅤ",
                    countryCd:get(data, 'countryCd', "-"),
                    countryName:get(data, 'countryName', "-"),
                    receiveZipCode:get(data, 'receiveZipCode', "-"),
                    address:get(data, 'receiveAdd1', "-")+" "+get(data, 'receiveAdd2', "-")+" "+get(data, 'receiveAdd3', "-"),
                    yoq:' ',
                    code1: get(data, 'code', '-'),
                    num:'N',
                    nol:'0',
                    yoq1:" ",
                    senderTelNo1:get(data, 'senderTelNo1', '-') + "ㅤ",
                    senderZipCode1:get(data, 'senderZipCode', '-'),
                    senderAdd:get(data, 'senderAdd1', '-')+" "+get(data, 'senderAdd2', '')+" "+get(data, 'senderAdd2', ''), 
                    boxHeight:get(data, 'boxHeight', '-'),
                    boxWidth:get(data, 'boxWidth', '-') ,
                    boxLength:get(data, 'boxLength', '-') ,
                }
            }
        })
        const headData =
        [
            "순번",
            "우편물구분",
            "우편물종류",
            "예약번호",
            "등기번호",
            "등록일자",
            "등록시간",
            "중량(g)",
            "부피중량(g)",
            "예상요금",
            "발송인명",
            "수취인명",
            "수취인 전화번호",
            "수취인 국가코드",
            "수취인 국가명",
            "수취인 우편번호",
            "수취인 이메일",
            "보험가입여부",
            "보험가입금액",
            "고객주문번호",
            "수취인 주소",
            "승인번호",
            "발송인 전화번호",
            "발송인 주소",
            "박스가로길이(cm)",
            "박스세로길이(cm)",
            "박스높이(cm)"

        ].map((col) => ({
            value: col,
            type: "string",
        }));
        const bodyData = newData.map((item) =>
            Object.values(item).map((value) => ({ value, type: typeof value }))
        );
        const config = {
            filename: new Date().toISOString(),
            // new Date().toString().substring(8,23),
            sheet: { data: [headData, ...bodyData] },
        };
        zipcelx(config);
    };

    return (
        <>
            {/* {loading && <Loader />} */}
            <Container fluid>

                <Row>
                    <Col xs={12} className={"mb-8"}>
                        <BaseBreadcrumb
                            items={[
                                {
                                    id: 1,
                                    name: "Почта ",
                                    url: "/myems/parcels",
                                },
                            ]}
                        />
                    </Col>
                    <div style={{
                        display: 'none'
                    }}>
                        <Col xs={12}>
                            <table id={'table-to-xls'}>
                                <thead>
                                    <tr>
                                        <th>
                                            순번
                                        </th>
                                        <th>
                                            우편물구분
                                        </th>
                                        <th>
                                            우편물종류
                                        </th>
                                        <th >
                                            예약번호
                                        </th>
                                        <th>
                                            등기번호
                                        </th>
                                        <th>
                                            등록일자
                                        </th>
                                        <th>
                                            등록시간
                                        </th>
                                        <th>
                                            중량(g)
                                        </th>
                                        <th>
                                            부피중량(g)
                                        </th>
                                        <th>
                                            예상요금
                                        </th>
                                        <th>
                                            발송인명
                                        </th>
                                        <th>
                                            수취인명
                                        </th>

                                        <th>
                                            수취인 전화번호
                                        </th>
                                        <th>
                                            수취인 국가코드
                                        </th>
                                        <th>
                                            수취인 국가명
                                        </th>
                                        <th>수취인 우편번호</th>
                                        <th>
                                            수취인 이메일
                                        </th>
                                        <th>
                                            보험가입여부
                                        </th>
                                        <th>
                                            보험가입금액
                                        </th>
                                        <th>
                                            고객주문번호
                                        </th>
                                        <th>수취인 주소</th>
                                        <th>승인번호</th>
                                        <th>발송인 전화번호</th>
                                        <th>발송인 주소</th>
                                        <th>
                                            박스가로길이(cm)
                                        </th>
                                        <th>
                                            박스세로길이(cm)
                                        </th>
                                        <th>
                                            박스높이(cm)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontWeight: 'lighter' }}>
                                    {allPostsData?.map((data, index) => {
                                        if (data.checked)
                                            return <tr key={index + 1}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    EMS
                                                </td>
                                                <td>
                                                    비서류
                                                </td>
                                                <td >
                                                    {get(data, "reservationNumber", "-") + "ㅤ"}
                                                </td>
                                                <td>
                                                    {get(data, "code", "-")}
                                                </td>
                                                <td>
                                                    {dateFormatDefault(get(data, "createdAt", "-")).props.children.props.children[0]}
                                                </td>
                                                <td>
                                                    {dateFormatDefault(get(data, "createdAt", "-")).props.children.props.children[3]}
                                                </td>
                                                <td>
                                                    {get(data, "totWeight", "-")}
                                                </td>
                                                <td>
                                                    {get(data, "volumeWeight", "-")}
                                                </td>
                                                <td>
                                                    {get(data, 'sender', "-")}
                                                </td>
                                                <td>
                                                    {get(data, 'receiveName', "-")}
                                                </td>
                                                <td>
                                                    {"+" + get(data, 'receiveTelNo', "-") + "."}
                                                </td>
                                                <td>
                                                    {get(data, 'countryCd', "-")}
                                                </td>
                                                <td>
                                                    {get(data, 'countryName', "-")}
                                                </td>
                                                <td>
                                                    {get(data, 'receiveZipCode', "-")}
                                                </td>
                                                <td>
                                                    {get(data, 'receiveAdd2', "-")}{" "}{get(data, 'receiveAdd3', "-")}
                                                </td>
                                                <td>{" "}</td>
                                                <td>
                                                    {get(data, 'code', '-')}
                                                </td>
                                                <td>N</td>
                                                <td>0</td>
                                                <td>{" "}</td>
                                                <td>
                                                    {get(data, 'senderTelNo1', '-') + "."}
                                                </td>
                                                <td>
                                                    {get(data, 'senderZipCode', '-')}
                                                </td>
                                                <td>
                                                    {get(data, 'senderAdd1', '-')}{" "} {get(data, 'senderAdd2', '')}
                                                </td>
                                                <td>
                                                    {get(data, 'boxHeight', '-')}
                                                </td>
                                                <td>
                                                    {get(data, 'boxWidth', '-')}
                                                </td>
                                                <td>
                                                    {get(data, 'boxLength', '-')}
                                                </td>
                                            </tr>
                                    })}
                                </tbody>
                            </table>
                        </Col>
                    </div>
                    <Col xs={12} className="mr-2">

                        <Content style={{ minHeight: "70vh" }}>
                            <Row className={"mb-8"}>


                                <Col
                                    xs={12}
                                    className={"text-right"}
                                >
                                    <>
                                        <BaseButton
                                            tangerine
                                            className={"mr-8"}
                                            disabled={!isCheckedParcels}
                                            onClick={handelExportToExcel}
                                        >
                                            Скачать в Excel
                                        </BaseButton>
                                        {/* <ReactHTMLTableToExcel
                                            id="table-xls-button"
                                            className={
                                                isCheckedParcels
                                                    ? "active-download-table-xls-button mr-8"
                                                    : "download-table-xls-button mr-8"
                                            }
                                            table="table-to-xls"
                                            filename={moment(
                                                new Date()
                                            ).format(
                                                "YYYY_MM_DD_HH_mm"
                                            )}
                                            sheet={moment(
                                                new Date()
                                            ).format(
                                                "YYYY_MM_DD_HH_mm"
                                            )}
                                            buttonText="Скачать в Excel"
                                            filetype="xls"
                                        /> */}

                                        <BaseButton
                                            className={"mr-8"}
                                            primary
                                            disabled={!isCheckedParcels}
                                            onClick={() => {
                                                history.push("/myems/parcels/printcheck");
                                            }}
                                        >
                                            Печать
                                        </BaseButton>
                                        <BaseButton
                                            green
                                            className={"mr-8"}
                                            onClick={() => {

                                                handleAddPrice();
                                                dispatch(clearPostData());
                                            }}
                                        >
                                            Добавить
                                        </BaseButton>
                                    </>
                                </Col>
                                {/* </HasAccess> */}
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <hr />
                                </Col>
                            </Row>
                            <FormWrapper onSubmit={handleSubmit}>
                                <Row className={"mb-8 mt-8"}>
                                    <Col xs={9}>
                                        <Flex>
                                            <BaseInput
                                                width={"200px"}
                                                placeholder={
                                                    "Поиск по Коду ..."
                                                }
                                                value={get(filter, 'emsCode', '')}
                                                handleInput={(value) => {
                                                    // setClear(value);
                                                    dispatch(
                                                        handleChangeFilter({
                                                            name: "emsCode",
                                                            value: value,
                                                        })
                                                    );
                                                }}
                                                margin={"0 6px 0 6px"}
                                            />
                                            <BaseInput
                                                width={"200px"}
                                                placeholder={
                                                    "Поиск по Получатель ..."
                                                }
                                                value={get(filter, 'receiveName', '')}
                                                handleInput={(value) => {
                                                    // setClear(value);
                                                    dispatch(
                                                        handleChangeFilter({
                                                            name: "receiveName",
                                                            value: value,
                                                        })
                                                    );
                                                }}
                                                margin={"0 6px 0 6px"}
                                            />
                                            <BaseSelect
                                                ref={refCountry}
                                                value={get(
                                                    filter,
                                                    "countryCd",
                                                    null
                                                )}
                                                margin={"0 6px 0 6px"}
                                                width={"300px"}
                                                placeholder="Страна"
                                                options={nationArray}
                                                isSearchable={true}
                                                handleChange={(value) => {
                                                    dispatch(
                                                        handleChangeFilter({
                                                            name: "countryCd",
                                                            value: value,
                                                        })
                                                    );
                                                }}
                                            />
                                            <BaseDatePicker
                                                value={get(
                                                    filter,
                                                    "fromDate",
                                                    null
                                                )}
                                                handleDate={(value) => {
                                                    dispatch(
                                                        handleChangeFilter({
                                                            name: "fromDate",
                                                            value: moment(
                                                                value
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            ),
                                                        })
                                                    );
                                                }}
                                                margin={"0 6px 0 6px"}
                                                placeholder={"Начало"}
                                            />
                                            <BaseDatePicker
                                                value={get(
                                                    filter,
                                                    "toDate",
                                                    null
                                                )}
                                                handleDate={(value) => {
                                                    dispatch(
                                                        handleChangeFilter({
                                                            name: "toDate",
                                                            value: moment(
                                                                value
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            ),
                                                        })
                                                    );
                                                }}
                                                margin={"0 6px 0 6px"}
                                                placeholder={"Конец"}
                                            />

                                            <BaseSelect
                                                ref={refCountry}
                                                value={get(
                                                    filter,
                                                    "timeDifference",
                                                    null
                                                )}
                                                margin={"0 6px 0 6px"}
                                                width={"300px"}
                                                placeholder="разница"
                                                options={timeDifference}
                                                handleChange={(value) => {
                                                    dispatch(
                                                        handleChangeFilter({
                                                            name: "fromDate",
                                                            value: value,
                                                        })
                                                    );
                                                    dispatch(
                                                        handleChangeFilter({
                                                            name: "timeDifference",
                                                            value: value,
                                                        })
                                                    );
                                                }}
                                            />
                                        </Flex>
                                    </Col>
                                    <Col xs={3} className={"text-right"}>
                                        <BaseButton
                                            type="submit"
                                            handleClick={handleApply}
                                            primary
                                            className={"mr-8"}
                                        >
                                            Поиск
                                        </BaseButton>
                                        <BaseButton
                                            handleClick={() => { clearSelect() }}
                                            danger
                                            className={"mr-8"}
                                        >
                                            Сбросить
                                        </BaseButton>
                                    </Col>
                                    <Col xs={0.5}></Col>
                                </Row>
                            </FormWrapper>
                            <Row className={"mb-32"}>
                                <Col xs={12}>
                                    {(loading || isLoading) ? <Flex
                                        style={{ marginTop: "15%" }}
                                        justify="center"
                                    >
                                        <ContentLoader />
                                    </Flex> :
                                        <BaseTable
                                            // tableHeader={[

                                            // ]}
                                            myemsPage
                                        >
                                            <tr>
                                                <th style={{ paddingBottom: "4px", width: '8px' }}>
                                                    <BaseCheckbox
                                                        checked={checkAllPosts}
                                                        handleChange={() => {
                                                            setCheckAllPosts(
                                                                !checkAllPosts
                                                            );

                                                            dispatch(
                                                                handleChangeCheckbox(
                                                                    {
                                                                        check: checkAllPosts,
                                                                        all: "all",
                                                                    }
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </th>
                                                <th >
                                                    Создал
                                                </th>
                                                <th >Номер брони</th>
                                                <th>Код</th>
                                                <th>Дата (год/месяц/день)</th>
                                                <th>Вес (г)</th>
                                                <th>объемный вес(г)</th>
                                                <th>Цена</th>
                                                <th>цена содержания</th>
                                                <th>Получатель</th>
                                                <th>Страна</th>
                                                <th>Номер телефона</th>
                                                <th>Печать</th>
                                                <th>Печать</th>
                                            </tr>
                                            {(!isEmpty(allPostsData)) ?
                                                allPostsData?.map((item, index) => {
                                                    return (

                                                        <tr key={get(item, 'id', null)}>

                                                            <td style={{ width: '8px' }}>
                                                                <BaseCheckbox
                                                                    checked={get(
                                                                        item,
                                                                        "checked",
                                                                        false
                                                                    )}
                                                                    handleChange={() => {
                                                                        setActive(
                                                                            false
                                                                        );

                                                                        dispatch(
                                                                            handleChangeCheckbox(
                                                                                get(
                                                                                    item,
                                                                                    "id",
                                                                                    ""
                                                                                )
                                                                            )
                                                                        );
                                                                    }}
                                                                />
                                                            </td>
                                                            <td >
                                                                {get(
                                                                    item,
                                                                    "creator",
                                                                    "-"
                                                                )}
                                                            </td>
                                                            <td>
                                                                {get(item, "reservationNumber", "-")}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/myems/parcels/single/${get(
                                                                        item,
                                                                        "id",
                                                                        null
                                                                    )}`}
                                                                    className={
                                                                        "link_color"
                                                                    }
                                                                >
                                                                    {get(
                                                                        item,
                                                                        "code",
                                                                        "-"
                                                                    )}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                {dateFormat(
                                                                    get(
                                                                        item,
                                                                        "createdAt",
                                                                        "-"
                                                                    )
                                                                )}
                                                            </td>

                                                            <td >
                                                                {get(
                                                                    item,
                                                                    "totWeight",
                                                                    "-"
                                                                )}
                                                            </td>
                                                            <td>
                                                                {get(item, "volumeWeight", "-") ? get(item, "volumeWeight", "-") : '-'}
                                                            </td>
                                                            <td>
                                                                {get(
                                                                    item,
                                                                    'price',
                                                                    "-"
                                                                )}
                                                            </td>
                                                            <td>
                                                                {get(item, "productPrice", "-")}
                                                            </td>
                                                            <td>
                                                                {get(item, 'receiveName', "-")}
                                                            </td>
                                                            <td >
                                                                {get(
                                                                    item,
                                                                    'countryCd',
                                                                    "-"
                                                                )}
                                                            </td>
                                                            <td scope="col">
                                                                { get(
                                                                    item,
                                                                    'receiveTelNo',
                                                                    "-"
                                                                )}
                                                            </td>

                                                            <td>
                                                                <Link
                                                                    to={`/myems/parcels/check/${get(
                                                                        item,
                                                                        "id",
                                                                        null
                                                                    )}`}
                                                                    target="_blank"
                                                                >
                                                                    <BaseButton
                                                                        bordered
                                                                        width={
                                                                            "fit-content"
                                                                        }
                                                                        fontSize={
                                                                            "12px"
                                                                        }
                                                                    >
                                                                        Клиент
                                                                    </BaseButton>
                                                                </Link>
                                                                {/* <BaseButton>Печать</BaseButton> */}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/myems/parcels/nalog/${get(
                                                                        item,
                                                                        "id",
                                                                        null
                                                                    )}`}
                                                                    target="_blank"
                                                                >
                                                                    <BaseButton
                                                                        bordered
                                                                        width={
                                                                            "fit-content"
                                                                        }
                                                                        fontSize={
                                                                            "12px"
                                                                        }
                                                                    >
                                                                        Налог
                                                                    </BaseButton>
                                                                </Link>
                                                                {/* <BaseButton>Печать</BaseButton> */}
                                                            </td>
                                                        </tr>)
                                                }) : (
                                                    <tr>
                                                        <td colSpan={14}>
                                                            No data
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </BaseTable>}
                                </Col>
                            </Row>
                            {totalPages > 0 && (
                                <Row
                                    align={"center"}
                                    className={"pagination_position"}
                                >

                                    <Col xs={4}>
                                        <Flex>
                                            <Text>Show</Text>
                                            <BaseSelect
                                                handleChange={(value) => {
                                                    dispatch(
                                                        handleChangeFilter({
                                                            name: "size",
                                                            value: value,
                                                        })
                                                    );
                                                }}
                                                options={[
                                                    { value: 5, label: 5 },
                                                    { value: 10, label: 10 },
                                                    { value: 25, label: 25, },
                                                    { value: 50, label: 50 },
                                                ]}
                                                value={get(filter, "size", 10)}
                                                margin={"0 12px 0 12px"}
                                                width={"80px"}
                                                placeholder={"Count"}
                                            />
                                            <Text>on the page</Text>
                                        </Flex>
                                    </Col>
                                    <Col xs={8}>
                                        <BasePagination
                                            current={current}
                                            onChange={({ selected }) => {
                                                dispatch(
                                                    handleChangeFilter({
                                                        name: "page",
                                                        value: selected,
                                                    })
                                                );
                                            }}
                                            pageCount={totalPages}
                                        />
                                    </Col>
                                </Row>)}
                        </Content>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyEMSParcelsContainer