import { Col, Container, Row } from 'react-grid-system'

import { BaseBreadcrumb, BaseButton, BaseSelect, Content, ContentLoader, Flex, FormWrapper } from 'components'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePostItem, clearPostData } from 'app/slices/myuhlPostSlices/createPostSlice/createPostSlice'
import { MyemsApiService } from 'services/apiServices'
import { get, isEmpty } from 'lodash'
import styled, { css } from 'styled-components'
import { toast } from 'react-toastify'
import history from "router/history";
import BaseModal from 'components/modal'
import UserReceiverSearch from '../components/UsersReceiverSearch'
import MyEMSParcelCompoent from '../components/MyEMSParcelComponent'
import MyEmsHsCode from '../components/MyEmsHsCode'
import StateRestrictions from '../components/StateRestrictions'
import ProductCoutPost from '../components/ProductsCounterPost'



const AddMyEMSContainer = () => {
    const [maxWeight, setMaxWeght] = useState(30000)
    const dispatch = useDispatch()
    const newPostData = useSelector(
        (store) => store.myems.addPostMyems.newPost
    );
    const [NationInfo, setNationInfo] = useState([])
    useEffect(() => {
        MyemsApiService.getNationList(get(newPostData, 'postClassification', 1)).then((res) => {
            if (res && res.data && res.data.success) {
                setNationInfo(res.data.data);
            }
        }).catch((error) =>
            error
        )
    }, [])



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
    const [loading,setLoding] = useState(false)
    useEffect(() => {
        setLoding(true)
        MyemsApiService.newDetails().then((res) => {
            // console.log('res',res)
            if (res && res.data && res.data.success) {
               
                dispatchNewPostInfo({
                    id: 'from',
                    name: 'name',
                    value: res.data.data.name
                })
                dispatchNewPostInfo({
                    id: 'from',
                    name: 'index',
                    value: res.data.data.postalCode
                })
                dispatchNewPostInfo({
                    id: 'from',
                    name: 'address1',
                    value: res.data.data.address1
                })
                dispatchNewPostInfo({
                    id: 'from',
                    name: 'address2',
                    value: res.data.data.address2
                })
                dispatchNewPostInfo({
                    id: 'from',
                    name: 'address3',
                    value: res.data.data.address3
                })
                dispatchNewPostInfo({
                    id: 'from',
                    name: 'phoneNumber1',
                    value: res.data.data.phoneNumber.split('-')[0].substring(1)
                })
                dispatchNewPostInfo({
                    id: 'from',
                    name: 'phoneNumber2',
                    value: res.data.data.phoneNumber.split('-')[1]
                })
                dispatchNewPostInfo({
                    id: 'from',
                    name: 'phoneNumber3',
                    value: res.data.data.phoneNumber.split('-')[2]
                })
            }
            // setDetails(res.data.data)
        }).catch(err => { console.log(err) })

        return ()=>{
            setLoding(false)
        }
    }, [])



    useEffect(() => {
        get(newPostData, 'width', '') &&
            get(newPostData, 'length', '') &&
            get(newPostData, 'height', '') &&
            dispatchNewPostInfo({
                name: 'cbm',
                value: ((Number(get(newPostData, 'width', '')) *
                    Number(get(newPostData, 'length', '')) *
                    Number(get(newPostData, 'height', ''))) / 6).toFixed(),
            })
    },
        [
            get(newPostData, 'width', ''),
            get(newPostData, 'length', ''),
            get(newPostData, 'height', ''),

        ])
    const [postData, setPostData] = useState('')
    // useEffect(() => { fetchDetails() }, [fetchDetails])
    useEffect(() => {
        (get(newPostData, 'to.totWeight', '') || get(newPostData, 'cbm', '')) &&
            get(newPostData, 'to.countryCd', '') &&
            MyemsApiService.getDeliveyCost({
                countryCd: get(newPostData, 'to.countryCd', '').split(' ')[0],
                totWeight: Number(get(newPostData, 'cbm', '')) > Number(get(newPostData, 'to.totWeight', '')) ?
                    get(newPostData, 'cbm', '') : get(newPostData, 'to.totWeight', ''),
                id: get(newPostData, 'postClassification', 1),
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    // setLoading(false)
                    setPostData(res.data.data)
                    dispatchNewPostInfo({ name: "price", value: res.data.data })
                }
                else {
                    // setLoading(false)
                    toast.warning(res.data.data.description)
                }
            })
    },
        [
            get(newPostData, 'to.totWeight', ''),
            get(newPostData, 'to.countryCd', ''),
            get(newPostData, 'cbm', '')
        ])
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
            countryName: newPostData?.to.countryCd.substring(3,newPostData?.to.countryCd.length),
            totWeight: (newPostData.to.totWeight),
            sender: newPostData.from.name,
            senderZipCode: newPostData.from.index,
            senderAdd1: newPostData.from.address1,
            senderAdd2: newPostData.from.address2,
            senderAdd3: newPostData.from.address3,
            senderPhone: "+" + newPostData.from.phoneNumber1 + "-"
                + newPostData.from.phoneNumber2 + "-" + newPostData.from.phoneNumber3,
            receiveZipCode: (newPostData.to.index),
            receiveName: newPostData.to.name,
            receiveAdd1: newPostData.to.address1,
            receiveAdd2: newPostData.to.address2,
            receiveAdd3: newPostData.to.address3,
            receiveTelNo: (newPostData.to.phoneNumber),
            postClassification: newPostData.postClassification,
            price: newPostData.price,
            productDTOList: newProducts,
            productType: newPostData.to.product_type,
            boxHeight: newPostData.height,
            boxLength: newPostData.length,
            boxWidth: newPostData.width,
            volumeWeight: newPostData?.cbm
        }
        await MyemsApiService.createPost(request)
            .then((res) => {
                if (res && res.data && res.data.success) {
                    history.goBack();
                    dispatch(clearPostData());
                    toast.success("Success");
                }
                else {
                    toast.warning(res.data.data.description);
                }

            }).catch((err)=>{
                console.log(err)
            })
    }
    const [isPhoneNumberSearch, setIsPhoneNumberSearch] = useState(false)
    const [isHScode, setIsHScode] = useState(false)
    const [isRestrictions, setIsRestrictions] = useState(false)
    const [isProductCount, setIsProductCout] = useState(false)
    
    // const {

    //     values,
    //     errors,
    //     touched,
    //     handleBlur,
    //     handleChange,
    //     handleSubmit,
    //     setFieldValue,

    // } = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         receiveTelNo: get(receiverInfo, "phoneNumber", ""),
    //         receiverPostalCode: get(receiverInfo, "index", ""),
    //         totWeight: get(receiverInfo, "totWeight", ""),
    //         price: get(receiverInfo, "price", ""),
    //         receiverSenderName: get(receiverInfo, "senderName", ""),
    //         receiverUnitValue: get(receiverInfo, 'totWeight', ""),
    //         receiverName: get(receiverInfo, "name", ""),
    //         receiveAdd2: get(receiverInfo, "address1", ""),
    //         receiveAdd3: get(receiverInfo, "address1", ""),
    //         countryCd: get(receiverInfo, 'countryCd', ""),
    //         boxLength: get(svmData, "length", ""),
    //         boxWidth: get(svmData, "width", ""),
    //         boxHeight: get(svmData, "height", ""),
    //         volumeWeight: get(svmData, "cbm", ""),
    //         productName0: get(contentParcelData, "postProducts[0].productName", ""),
    //         quantity0: get(contentParcelData, "postProducts[0].quantity", ""),
    //         gramm0: get(contentParcelData, 'postProducts[0].gramm', ""),
    //         productPrice0: get(contentParcelData, "postProducts[0].price", ""),
    //     },
    //     validationSchema: postCreateReceiverSchema,
    //     onSubmit: createData,
    // });
   

   return <Container fluid>
    {!loading ? <Flex
                style={{ marginTop: "15%" }}
                justify="center"

            >
                <ContentLoader />
            </Flex> :
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
            <Col xs={6}>
                <BaseModal
                    modalIsOpen={isPhoneNumberSearch}>
                    <UserReceiverSearch setIsPhoneNumberSearch={setIsPhoneNumberSearch} />
                </BaseModal>
                <BaseModal
                    width={'400px'}
                    height={'250px'}
                    modalIsOpen={isProductCount}
                >
                    <ProductCoutPost 
                    createData={createData} 
                    setIsProductCout={setIsProductCout}
                    productCouter = {get(newPostData,'postProducts',[])}
                     />
                </BaseModal>
            </Col>
            <Col xs={6}>
                <BaseModal
                    width={'800px'}
                    modalIsOpen={isHScode}>
                    <MyEmsHsCode
                        setIsHScode={setIsHScode}
                    />
                </BaseModal>
                <BaseModal
                    width={'800px'}
                    modalIsOpen={isRestrictions}>
                    <StateRestrictions
                        setIsRestrictions={setIsRestrictions}
                        NationInfo={NationInfo}
                    />
                </BaseModal>
            </Col>
            <Col xs={12}>
                <MyEMSParcelCompoent
                    newPostData={newPostData}
                    setIsRestrictions={setIsRestrictions}
                    dispatchNewPostInfo={dispatchNewPostInfo}
                    createData={createData}
                    maxWeight={maxWeight}
                    NationInfo={NationInfo}
                    setIsPhoneNumberSearch={setIsPhoneNumberSearch}
                    setIsHScode={setIsHScode}
                />
            </Col>
            <Col xs={12} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <BaseButton
                    green
                    className={"mr-8"}
                    onClick={() => setIsProductCout(true)}
                >
                    Добавить
                </BaseButton>
            </Col>
        </Row>}
    </Container>


}

export default AddMyEMSContainer