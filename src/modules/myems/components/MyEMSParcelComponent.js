import { FormWrapper, Flex } from "components"
import { get } from "lodash"
import { Col } from "react-grid-system"
import { toast } from "react-toastify"
import styled, { css } from "styled-components"
import { dateFormatDefault } from "../../../utils/index";
import bg_img from '../../../assets/images/picture/bg-image.jpg'
import moment from "moment"
const styleTable = props => css`
  .table-add {  
    background-size: 100%;
    width: 1000px;
    height: 760px;
    border: 2px solid;
    border-style: solid solid dashed solid;
    background-image: url(${bg_img});
  }

  .table-add table {
    max-width: 1000px;
    margin-top: 100px;
  }
  .table-add table tr td input{
     border: 1.8px solid rgba(1,1,1,0.9);
     font-family: 'Noto Sans KR', 'Noto Sans SC', 'Microsoft Yahei', sans-serif !important;
  }
 
`
const StyledDiv = styled.div`
  ${styleTable}
`;




const MyEMSParcelCompoent = ({
    newPostData,
    setIsHScode,
    dispatchNewPostInfo,
    createData,
    maxWeight,
    NationInfo,
    setIsPhoneNumberSearch,
    disabled,
    setIsRestrictions

}) => {
    console.log(newPostData)
    return (
        <StyledDiv >
            <Col xs={12} style={{
                width: '100%',
            }}>
                <FormWrapper align={'center'} style={{
                    align: 'center'
                }}>


                    <div className='table-add'>
                        <table >
                            <tr>

                                <td colSpan={4} style={{ width: '50%', paddingLeft: '150px' }}>
                                    <input
                                        style={{
                                            textAlign: 'center',
                                            height: '30px',
                                            padding: '10px',
                                            fontSize: '20px'
                                        }}
                                        type='text'
                                        value={get(newPostData, 'postCode', false) ? get(newPostData, 'postCode', '') : 'EG000000000KR'}
                                        disabled />
                                </td>
                                <td colSpan={2} style={{ width: '25%' }}>
                                    {!newPostData.createdAt ?
                                        <input disabled={disabled} style={{
                                            height: '18px',
                                            marginTop: '38px',
                                            width: '150px',
                                            marginLeft: '38px',
                                            marginRight: '80px',
                                            // paddingRight:'40px'
                                        }}
                                            value={new Date().toISOString().substring(0, 10)}
                                            type={'date'}
                                        // value={)}
                                        /> :
                                        <div style={{
                                            height: '18px',
                                            marginTop: '38px',
                                            width: '310px',
                                            marginLeft: '45px',
                                            marginRight: '-90px',
                                        }}>
                                            {moment(
                                                moment
                                                    .utc(moment(get(newPostData, 'createdAt', '')).format("YYYY.MM.DD HH:mm"), "YYYY.MM.DD HH:mm")
                                                    .local()
                                                    .format("YYYY.MM.DD HH:mm")
                                            ).format('YYYYㅤㅤMMㅤㅤDDㅤㅤHH:MM')}
                                        </div>
                                    }


                                    {/* {console.log("d",get(newPostData,'createdAt',''))} */}
                                </td>
                                <td colSpan={2} style={{ width: '25%' }}>
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            width: '216px',
                                            fontSize: '18px',
                                            fontWeight: '500',
                                            paddingTop: '34px'
                                        }}
                                    >1000114</p>
                                </td>
                            </tr>
                            <tr >
                                <td colSpan={4} style={{
                                    width: '50%',
                                }}>
                                    <Flex style={{ marginLeft: '180px' }}>
                                        {"+"}<input disabled={disabled}
                                            style={{
                                                width: '40px',
                                                // marginTop: '5px',

                                                height: '20px',
                                                backgroundColor: !get(newPostData, 'from.phoneNumber1', true) && 'rgba(255, 0, 0,0.30)',
                                                border: !get(newPostData, 'from.phoneNumber1', true) && '2px solid rgba(255,0,0,0.4)',
                                            }}
                                            value={get(newPostData, 'from.phoneNumber1', '')}
                                            onInput={(e) => {
                                                if (e.target.value.length <= 4)
                                                    dispatchNewPostInfo({
                                                        id: 'from',
                                                        name: 'phoneNumber1',
                                                        value: e.target.value
                                                    })
                                            }}
                                            type='tel'
                                        />{" - "}
                                        <input disabled={disabled}
                                            style={{
                                                // marginTop: '5px',
                                                width: '40px',
                                                // margin:'0 20px',
                                                height: '20px',
                                                backgroundColor: !get(newPostData, 'from.phoneNumber2', true) && 'rgba(255, 0, 0,0.30)',
                                                border: !get(newPostData, 'from.phoneNumber2', true) && '2px solid rgba(255,0,0,0.4)',
                                            }}
                                            value={get(newPostData, 'from.phoneNumber2', '')}
                                            onInput={(e) => {
                                                if (e.target.value.length <= 4)
                                                    dispatchNewPostInfo({
                                                        id: 'from',
                                                        name: 'phoneNumber2',
                                                        value: e.target.value
                                                    })
                                            }}
                                            type='tel'
                                        />{" - "}
                                        <input disabled={disabled}
                                            style={{
                                                width: '40px',
                                                marginTop: '',
                                                // marginLeft: '180px',
                                                height: '20px',
                                                backgroundColor: !get(newPostData, 'from.phoneNumber3', true) && 'rgba(255, 0, 0,0.30)',
                                                border: !get(newPostData, 'from.phoneNumber3', true) && '2px solid rgba(255,0,0,0.4)',
                                            }}
                                            value={get(newPostData, 'from.phoneNumber3', '')}
                                            onInput={(e) => {
                                                if (e.target.value.length <= 4)
                                                    dispatchNewPostInfo({
                                                        id: 'from',
                                                        name: 'phoneNumber3',
                                                        value: e.target.value
                                                    })
                                            }}
                                            type='tel'
                                        />
                                    </Flex>
                                </td>
                                <td colSpan={4} style={{
                                    width: '50%'
                                }}>
                                    <input disabled={disabled}
                                        value={get(newPostData, 'to.phoneNumber', '')}
                                        onInput={(
                                            value
                                        ) => {
                                            dispatchNewPostInfo(
                                                {
                                                    id: "to",
                                                    value: value.target.value,
                                                    name: "phoneNumber",
                                                }
                                            );
                                        }}
                                        style={{
                                            width: '25%',
                                            marginTop: '3px',
                                            marginLeft: '180px',
                                            height: '28px',
                                            backgroundColor: !get(newPostData, 'to.phoneNumber', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'to.phoneNumber', true) && '2px solid rgba(255,0,0,0.4)',
                                        }}
                                        placeholder="수취인 연락처"
                                        type='tel'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4} style={{
                                    width: '50%'
                                }}>
                                    <input disabled={disabled}
                                        style={{
                                            marginTop: '3px',
                                            marginLeft: '180px',
                                            height: '28px',
                                            backgroundColor: !get(newPostData, 'from.name', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'from.name', true) && '2px solid rgba(255,0,0,0.4)',
                                        }}
                                        type='text'
                                        value={get(newPostData, 'from.name', '')}
                                        onInput={(e) => {
                                            dispatchNewPostInfo({
                                                id: 'from',
                                                name: 'name',
                                                value: e.target.value
                                            })
                                        }}
                                        placeholder="발송인 이름"

                                    />
                                </td>
                                <td colSpan={4} style={{
                                    width: '50%'
                                }}>
                                    <input disabled={disabled}
                                        style={{
                                            marginTop: '3px',
                                            marginLeft: '180px',
                                            height: '28px',
                                            backgroundColor: !get(newPostData, 'to.name', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'to.name', true) && '2px solid rgba(255,0,0,0.4)',
                                        }}
                                        value={get(newPostData, 'to.name', '')}
                                        onInput={(
                                            e
                                        ) => {
                                            // let efrstE = '';
                                            // e.target.value.forEach((val,index,arr)=>{
                                            //    if(arr[index]==' ')
                                            //     efrstE+=arr[index+1].toUpperCase()
                                            // })
                                            // console.log(efrstE)
                                            dispatchNewPostInfo(
                                                {
                                                    id: "to",
                                                    name: "name",
                                                    value: e.target.value.toUpperCase(),
                                                }
                                            );
                                        }}
                                        type='text'
                                        placeholder="수취인 이름"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: '50%'
                                }} colSpan={4}>
                                    <input disabled={disabled}
                                        style={{
                                            width: '120px',
                                            marginTop: '10px',
                                            height: '22px',
                                            marginLeft: '180px',
                                            backgroundColor: !get(newPostData, 'from.postalCode', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'from.postalCode', true) && '2px solid rgba(255,0,0,0.4)',
                                        }}
                                        type='text'
                                        onInput={(e) => {
                                            dispatchNewPostInfo({
                                                id: 'from',
                                                name: 'index',
                                                value: e.target.value
                                            })
                                        }}
                                        value={get(newPostData, 'from.index', '')}
                                        placeholder="우편번호" />
                                    {/* <input disabled={disabled} style={{ width: '25%', marginTop: '10px', border: '0', padding: '2px 0' }}
                                 type='button' value="우편번호 찾기" /> */}
                                </td>
                                <td style={{
                                    width: '50%'
                                }} colSpan={4}>
                                    <input disabled={disabled} style={{
                                        width: '120px',
                                        marginTop: '10px',
                                        height: '22px',
                                        marginLeft: '180px',
                                        backgroundColor: !get(newPostData, 'to.index', true) && 'rgba(255, 0, 0,0.30)',
                                        border: !get(newPostData, 'to.index', true) && '2px solid rgba(255,0,0,0.4)',
                                    }}
                                        value={get(newPostData, 'to.index', '')}
                                        onInput={(e) => {
                                            dispatchNewPostInfo({
                                                id: 'to',
                                                name: 'index',
                                                value: e.target.value
                                            })
                                        }}
                                        type='text'
                                        placeholder="수취인 우편번호" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: '50%'
                                }} colSpan={4}>

                                    <input disabled={disabled}
                                        onInput={(e) => {
                                            dispatchNewPostInfo({
                                                id: 'from',
                                                name: 'address1',
                                                value: e.target.value
                                            })
                                        }}
                                        value={get(newPostData, 'from.address1', '')}
                                        type='text'
                                        placeholder='지역'
                                        style={{
                                            marginLeft: '180px',
                                            width: '240px',
                                            height: '23px',
                                            marginBottom: '2px',
                                            backgroundColor: !get(newPostData, 'from.address1', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'from.address1', true) && '2px solid rgba(255,0,0,0.4)',
                                        }} />
                                    <input disabled={disabled}
                                        onInput={(e) => {
                                            dispatchNewPostInfo({
                                                id: 'from',
                                                name: 'address2',
                                                value: e.target.value
                                            })
                                        }}
                                        value={get(newPostData, 'from.address2', '')}
                                        type='text'
                                        placeholder='도시'
                                        style={{
                                            marginLeft: '180px',
                                            width: '240px',
                                            height: '23px',
                                            marginBottom: '2px',
                                            backgroundColor: !get(newPostData, 'from.address2', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'from.address2', true) && '2px solid rgba(255,0,0,0.4)',
                                        }} />
                                    <input
                                        disabled={disabled}
                                        onInput={(e) => {
                                            dispatchNewPostInfo({
                                                id: 'from',
                                                name: 'address3',
                                                value: e.target.value
                                            })
                                        }}
                                        value={get(newPostData, 'from.address3', '')}
                                        type='text'
                                        placeholder='주소'
                                        style={{
                                            marginLeft: '180px',
                                            width: '240px',
                                            height: '23px',
                                            marginBottom: '2px',
                                            backgroundColor: !get(newPostData, 'from.address3', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'from.address3', true) && '2px solid rgba(255,0,0,0.4)',
                                        }} />

                                </td>
                                <td style={{
                                    width: '50%'
                                }} colSpan={4}>
                                    <input disabled={disabled}
                                        onInput={(
                                            value
                                        ) => {
                                            dispatchNewPostInfo(
                                                {
                                                    id: "to",
                                                    name: "address1",
                                                    value: value.target.value,
                                                }
                                            );
                                        }}
                                        value={get(newPostData, 'to.address1', '')}
                                        type='text'
                                        placeholder='지역'
                                        style={{
                                            marginLeft: '180px',
                                            width: '240px',
                                            height: '23px',
                                            marginBottom: '2px',
                                            backgroundColor: !get(newPostData, 'to.address1', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'to.address1', true) && '2px solid rgba(255,0,0,0.4)',
                                        }} />
                                    <input disabled={disabled}
                                        onInput={(
                                            value
                                        ) => {
                                            dispatchNewPostInfo(
                                                {
                                                    id: "to",
                                                    name: "address2",
                                                    value: value.target.value,
                                                }
                                            );
                                        }}
                                        value={get(newPostData, 'to.address2', '')}
                                        type='text'
                                        placeholder='도시'
                                        style={{
                                            marginLeft: '180px',
                                            width: '240px',
                                            height: '23px',
                                            marginBottom: '2px',
                                            backgroundColor: !get(newPostData, 'to.address2', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'to.address2', true) && '2px solid rgba(255,0,0,0.4)',
                                        }} />
                                    <input disabled={disabled}
                                        onInput={(
                                            value
                                        ) => {
                                            dispatchNewPostInfo(
                                                {
                                                    id: "to",
                                                    name: "address3",
                                                    value: value.target.value,
                                                }
                                            );
                                        }}
                                        value={get(newPostData, 'to.address3', '')}
                                        type='text'
                                        placeholder='주소'
                                        style={{
                                            marginLeft: '180px',
                                            width: '240px',
                                            height: '23px',
                                            marginBottom: '2px',
                                            backgroundColor: !get(newPostData, 'to.address3', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'to.address3', true) && '2px solid rgba(255,0,0,0.4)',
                                        }} />
                                </td>
                            </tr>
                            <tr >
                                <td colSpan={4}>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'end',
                                        marginTop: '15px'
                                    }}>
                                        {/* <input disabled={disabled} type='button' style={{
                                        marginLeft: '180px',
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(1,1,1,0.1)',
                                        padding: '5px 10px',
                                        fontSize: '14px',

                                    }} value={'보내는 사람 불러오기'} /> */}
                                    </div>
                                </td>
                                <td colSpan={4}>
                                    <div style={{
                                        width: '(0%',
                                        display: 'flex',
                                        justifyContent: 'end',
                                        marginTop: '15px',
                                        paddingRight: '50px'
                                    }}>
                                        <input disabled={disabled} type='button'
                                            onClick={() => setIsPhoneNumberSearch(true)}
                                            value={'보내는 사람 불러오기'} style={{
                                                // marginLeft: '150px',
                                                cursor: 'pointer',
                                                backgroundColor: 'rgba(1,1,1,0.1)',
                                                padding: '5px 10px',
                                                fontSize: '14px',

                                            }} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4}></td>
                                <td colSpan={2}>
                                <div style={{
                                        marginTop: '10px',
                                        // display: 'filex',
                                        // justifyContent:'center',
                                        // width: '100%',
                                        marginRight: '-40px',
                                        marginLeft:'130px'
                                    }}>
                                        <h3 style={{
                                            backgroundColor: 'yellow',
                                            textAlign: 'center',
                                            // marginRight: '-60px',
                                            // width: '150px',
                                            paddingLeft: '20px',
                                            padding: '5px'
                                        }}> = {Number(get(newPostData, 'cbm', '')) > Number(get(newPostData, 'to.totWeight', '')) ?
                                            (Number(get(newPostData, 'cbm', '')) / 1000).toFixed(3) : (Number(get(newPostData, 'to.totWeight', '')) / 1000).toFixed(3)} kg</h3>

                                    </div>
                                </td>
                                <td colSpan={1}>
                                 

                                </td>
                                <td colSpan={1}>
                                    <select
                                        style={{
                                            width: '157px',
                                            marginLeft: '-53px',
                                            marginTop: '10px',
                                            height: '24px',
                                            backgroundColor: !get(newPostData, 'to.countryCd', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'to.countryCd', true) && '2px solid rgba(255,0,0,0.4)',
                                        }}
                                        disabled={disabled}
                                        name="pets"
                                        id="pet-select"
                                        value={!disabled?get(newPostData, 'to.countryCd', ''):get(newPostData, 'to.countryCd', '')+" "+get(newPostData, 'to.countryName', '')} // value ni ishlatamiz
                                        onChange={(e) => {
                                            dispatchNewPostInfo({
                                                id: "to",
                                                name: "countryCd",
                                                value: e.target.value,
                                            });
                                        }}
                                    >
                                        <option value={''} disabled="disabled">select</option>
                                        {NationInfo?.map((item) => {
                                            return (
                                                <option value={item.nationCode + " " + item.nationFm}>
                                                    [{item.nationCode}]{item.nationName + " {" + item.nationFm + "}"}
                                                </option>
                                            );
                                        })}
                                    </select>

                                </td>
                            </tr>
                            <tr>
                                <td colSpan={6}></td>
                                <td>
                                    <>   <input disabled={disabled}
                                        style={{
                                            width: '60%',
                                            marginLeft: '-20px',
                                            marginTop: '13px',
                                            height: '25px',
                                            backgroundColor: !get(newPostData, 'to.totWeight', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'to.totWeight', true) && '2px solid rgba(255,0,0,0.4)',
                                        }}
                                        type='text'
                                        value={get(newPostData, 'to.totWeight', '')}
                                        onInput={(
                                            value
                                        ) => {
                                            (Number(value.target.value) < maxWeight) ?
                                                dispatchNewPostInfo(
                                                    {
                                                        id: "to",
                                                        name: "totWeight",
                                                        value: Number(value.target.value)
                                                    }) : toast.warning(
                                                        `Вес посылки не должен превышать ${maxWeight} граммов`
                                                    );

                                        }}
                                    /> g </>
                                </td>
                                <td style={{ marginTop: '10px' }}>
                                    <input style={{
                                        marginLeft: '30px',
                                        width: '50%',
                                        marginTop: '13px',
                                        height: '25px',
                                        backgroundColor: !get(newPostData, 'price', true) && 'rgba(255, 0, 0,0.30)',
                                        border: !get(newPostData, 'price', true) && '2px solid rgba(255,0,0,0.4)',
                                    }}
                                        type='text'
                                        disabled
                                        value={get(newPostData, 'price', '')}
                                        handleChangePrice={(
                                            value
                                        ) => {
                                            dispatchNewPostInfo(
                                                {
                                                    name: "price",
                                                    value: value.target.value,
                                                }
                                            );
                                        }}
                                    />
                                </td>
                                {/* <td>ㅤ</td> */}
                            </tr>
                            <tr  >
                                <td colSpan={6}></td>
                                <td style={{ marginTop: '100px' }}>
                                    <input disabled={disabled}
                                        onClick={() => setIsHScode(true)}
                                        style={{
                                            width: '100px',
                                            marginLeft: '-70px',
                                            marginTop: '13px',
                                            height: '35px',
                                            cursor: 'pointer'
                                        }}
                                        value={'HS code 검색'}
                                        type='button' />
                                </td>
                                <td style={{ marginTop: '10px' }}>
                                    <input disabled={disabled} style={{
                                        width: '60px',
                                        marginTop: '10px',
                                        fontSize: '30px',
                                        marginLeft: '56px',
                                        height: '44px',
                                    }}
                                        value={get(newPostData, 'to.countryCd', '').split(" ")[0]}
                                        type='text' />

                                </td>
                                {/* <td>ㅤ</td> */}
                            </tr>
                            <tr>
                                <td colSpan={6}>
                                    {get(newPostData, 'postProducts', []).map((item, index) => {
                                        return <div key={index} style={{
                                            display: 'flex',
                                            gap: '5px',
                                            marginTop: index === 0 ? '-25px' : '5px',

                                        }}>
                                            <input disabled={disabled} type='text'
                                                placeholder="내용품명"
                                                style={{
                                                    width: '247px',
                                                    height: '30px',
                                                    marginLeft: '55px',
                                                    backgroundColor: index == 0 && !get(item, 'productName', true) && 'rgba(255, 0, 0,0.30)',
                                                    border: index == 0 && !get(item, 'productName', true) && '2px solid rgba(255,0,0,0.4)',

                                                }}
                                                value={get(item, 'productName', '')}
                                                onInput={(e) => {
                                                    dispatchNewPostInfo({
                                                        id: 'postProducts',
                                                        ...{
                                                            value: e.target.value,
                                                            name: "productName",
                                                            index,
                                                        }
                                                    });
                                                }}
                                            />
                                            <input disabled={disabled} type='text'
                                                value={get(item, 'quantity', '')}
                                                onInput={(e) => {
                                                    dispatchNewPostInfo({
                                                        id: 'postProducts',
                                                        ...{
                                                            value: e.target.value,
                                                            name: "quantity",
                                                            index,
                                                        }
                                                    });
                                                }}
                                                placeholder="개수"
                                                style={{
                                                    textAlign: 'center',
                                                    width: '60px',
                                                    backgroundColor: index == 0 && !get(item, 'quantity', true) && 'rgba(255, 0, 0,0.30)',
                                                    border: index == 0 && !get(item, 'quantity', true) && '2px solid rgba(255,0,0,0.4)',
                                                }} />
                                            <input disabled={disabled} type='text'
                                                value={get(item, 'gramm', '')}
                                                onInput={(e) => {
                                                    dispatchNewPostInfo({
                                                        id: 'postProducts',
                                                        ...{
                                                            value: e.target.value,
                                                            name: "gramm",
                                                            index,
                                                        }
                                                    });
                                                }}
                                                placeholder="순중량"
                                                style={{
                                                    textAlign: 'center',
                                                    width: '60px',
                                                    backgroundColor: index == 0 && !get(item, 'gramm', true) && 'rgba(255, 0, 0,0.30)',
                                                    border: index == 0 && !get(item, 'gramm', true) && '2px solid rgba(255,0,0,0.4)',
                                                }} />
                                            <input
                                                disabled={disabled}
                                                type='text'
                                                value={get(item, 'price', '')}
                                                onInput={(e) => {
                                                    dispatchNewPostInfo({
                                                        id: 'postProducts',
                                                        ...{
                                                            value: e.target.value,
                                                            name: "price",
                                                            index,
                                                        }
                                                    });
                                                }}
                                                placeholder='USD'
                                                style={{
                                                    width: '60px',
                                                    marginLeft: '3px',
                                                    textAlign: 'center',
                                                    backgroundColor: index == 0 && !get(item, 'price', true) && 'rgba(255, 0, 0,0.30)',
                                                    border: index == 0 && !get(item, 'price', true) && '2px solid rgba(255,0,0,0.4)',
                                                }} />
                                            <input
                                                disabled={disabled}
                                                type='text'
                                                value={get(item, 'hsCode', '')}
                                                onInput={(e) => {
                                                    dispatchNewPostInfo({
                                                        id: 'postProducts',
                                                        ...{
                                                            value: e.target.value,
                                                            name: "hsCode",
                                                            index,
                                                        }
                                                    });
                                                }}
                                                placeholder='HScode' style={{
                                                    width: '70px',
                                                    textAlign: 'center',
                                                }} />
                                        </div>
                                    })}
                                    <div style={{
                                        display: 'flex',
                                        gap: '5px',
                                        marginTop: '15px'
                                    }}>
                                        <input disabled={disabled} type='button'
                                            value={'세관신고서 품목 불러오기'}
                                            style={{
                                                width: '200px',
                                                height: '30px',
                                                marginLeft: '55px'
                                            }} />

                                    </div>
                                </td>
                                <td >
                                    <div style={{
                                        marginTop: '10px',
                                        marginLeft: '-97px',
                                        gap: '5px'
                                    }}>
                                        <span>특별항공운송수수료</span>
                                        <div style={{ fontWeight: 'bold', marginTop: '20px' }}>
                                            가로 <input disabled={disabled}
                                                style={{
                                                    width: '60px',
                                                    fontSize: '16px',
                                                    backgroundColor: !get(newPostData, 'width', true) && 'rgba(255, 0, 0,0.30)',
                                                    border: !get(newPostData, 'width', true) && '2px solid rgba(255,0,0,0.4)',
                                                }}
                                                type='text'
                                                value={get(newPostData, 'width', '')}
                                                onInput={(e) => {
                                                    dispatchNewPostInfo({
                                                        name: 'width',
                                                        value: e.target.value
                                                    })
                                                }}
                                            /> cm
                                        </div>
                                        <div style={{ fontWeight: 'bold', marginTop: '3px' }}>
                                            세로 <input disabled={disabled}
                                                style={{
                                                    width: '60px',
                                                    fontSize: '16px',
                                                    backgroundColor: !get(newPostData, 'length', true) && 'rgba(255, 0, 0,0.30)',
                                                    border: !get(newPostData, 'length', true) && '2px solid rgba(255,0,0,0.4)',
                                                }}
                                                type='text'
                                                value={get(newPostData, 'length', '')}
                                                onInput={(e) => {
                                                    dispatchNewPostInfo({
                                                        name: 'length',
                                                        value: e.target.value
                                                    })
                                                }}
                                            /> cm
                                        </div>
                                        <div style={{ fontWeight: 'bold', marginTop: '3px' }}>
                                            높이 <input disabled={disabled}
                                                style={{
                                                    width: '60px',
                                                    fontSize: '16px',
                                                    backgroundColor: !get(newPostData, 'height', true) && 'rgba(255, 0, 0,0.30)',
                                                    border: !get(newPostData, 'height', true) && '2px solid rgba(255,0,0,0.4)',
                                                }}
                                                type='text'
                                                value={get(newPostData, 'height', '')}
                                                onInput={(e) => {
                                                    dispatchNewPostInfo({
                                                        name: 'height',
                                                        value: e.target.value
                                                    })
                                                }}
                                            /> cm
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style={{
                                        marginTop: '0px'
                                    }}>
                                        <input disabled={disabled} style={{
                                            width: '120px',
                                            marginLeft: '-14px',
                                            marginTop: '15px',
                                            height: '30px',
                                            fontSize: '20px',
                                            marginBottom: '26px'
                                        }} type='text' /> <br />
                                        <span style={{ marginLeft: '20px', }}> 체적중량</span> <br />
                                        <input disabled={disabled} style={{
                                            marginLeft: '10px',
                                            height: '30px',
                                            width: '100px',
                                            backgroundColor: !get(newPostData, 'cbm', true) && 'rgba(255, 0, 0,0.30)',
                                            border: !get(newPostData, 'cbm', true) && '2px solid rgba(255,0,0,0.4)',
                                        }}
                                            type='text'
                                            value={get(newPostData, 'cbm', '')}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={6}>
                                    <div style={{
                                        display: 'flex',
                                        marginLeft: '180px',
                                        marginTop: '15px',
                                        gap: '10px'
                                    }}>
                                        <label>
                                            <input 
                                            // disabled={disabled}
                                                onChange={() =>
                                                    !disabled&&dispatchNewPostInfo({
                                                        id: 'to',
                                                        name: 'product_type',
                                                        value: 'Sample'
                                                    })
                                                }
                                                checked={get(newPostData, 'to.product_type', '') == 'Sample'}
                                                type='checkbox' />
                                            Sample 상품견본
                                        </label>
                                        <label>
                                            <input 
                                            // disabled={disabled}
                                                onChange={() =>
                                                    !disabled&& dispatchNewPostInfo({
                                                        id: 'to',
                                                        name: 'product_type',
                                                        value: 'Gift'
                                                    })
                                                }
                                                checked={get(newPostData, 'to.product_type', '') == 'Gift'}

                                                type='checkbox' />
                                            Gift 선물
                                        </label>
                                        <label>
                                            <input 
                                            // disabled={disabled}
                                                onChange={() =>
                                                    !disabled&& dispatchNewPostInfo({
                                                        id: 'to',
                                                        name: 'product_type',
                                                        value: 'Merchandise'
                                                    })
                                                }
                                                checked={get(newPostData, 'to.product_type', '') == 'Merchandise'}

                                                type='checkbox' />
                                            Merchandise 상품
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>

                    <div style={{
                        width: '1000px',
                        backgroundColor: 'rgba(1,1,1,0.05)',
                        marginTop: '-20px',
                        padding: '20px 50px',
                        border: '2px solid',
                        // borderStyle: 'solid',
                        // borderTopStyle: 'none',
                        borderStyle: 'none solid solid solid',
                        marginBottom: '30px',
                        // borderWidth:'1px'
                    }}>
                        <h3 style={{ fontWeight: 'bold', borderBottom: '2px solid' }}><span style={{ fontSize: '30px', fontWeight: 'bold' }}>∗</span>접수하기 전에 꼭 읽어주세요</h3>
                        <ul style={{ marginLeft: '50px', fontWeight: '20px', gap: '10px' }}>
                            <li style={{ marginTop: '10px' }}>
                                우편물의 중량은 g 단위로 입력해 주세요. ( 1kg = 1000g )
                            </li>
                            <li style={{ marginTop: '10px' }}>
                                프리미엄 배송을 원하실 경우 MyEMS 사무실( ☎ 010.2144.3820 )로 연락주시기 바랍니다
                                <input disabled={disabled} type='button'
                                    onClick={() => setIsRestrictions(true)}
                                    value={'서류접수'} style={{
                                        backgroundColor: 'green',
                                        padding: '5px 10px',
                                        marginLeft: '5px',
                                        cursor: 'pointer',
                                        border: 'none',
                                        color: 'white'
                                    }} />
                                <input disabled={disabled} type='button' value={'프리미엄접수'} style={{
                                    backgroundColor: 'green',
                                    marginLeft: '5px',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    color: 'white'
                                }} />
                            </li>
                            <li style={{ marginTop: '10px' }}>
                                발송인 주소 입력시 정확한 주소 기입을 위해
                                [ 우편번호 찾기 ]를 사용해 주세요.
                            </li>
                            <li style={{ marginTop: '10px' }}>
                                내용품명은 영문으로 작성해 주세요. 가격은 USD로 입력해 주세요.
                            </li>
                            <li style={{ marginTop: '10px' }}>
                                Hs code는 통일 상품 분류기호로 HS code 검색을 이용하시면 됩니다.
                            </li>
                        </ul>
                    </div>

                </FormWrapper>
            </Col>
        </StyledDiv>
    )
}
export default MyEMSParcelCompoent