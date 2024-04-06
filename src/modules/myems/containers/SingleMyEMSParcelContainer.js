import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BaseBreadcrumb, BaseButton, Content, ContentLoader, Flex, Text, Title } from "components";
import { Col, Container, Row } from "react-grid-system";

import SingleReceiverParcel from "../components/singlemyems/SingleReceiverParcel";
import { useEffect } from "react";
import { MyemsApiService } from "services/apiServices";
import { useState } from "react";
import { get } from "lodash";
import SingleFormSenter from "../components/singlemyems/SingleFormSenter";
import SingleContentParcel from "../components/singlemyems/SingleContentParcel";
import SingleSvmCalculator from "../components/singlemyems/SingleSvmCalculator";
import { dateFormat } from "utils";
import { toast } from "react-toastify";
import SingleContentDocument from "../components/singlemyems/SingleContentDoc";
import MyEMSParcelCompoent from "../components/MyEMSParcelComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePostLogs } from "app/slices/myemsSlices/singlePostMyems/singlePostMyems";
const SingleMyEMSParcelContiainer = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    // const [data, setData] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        dispatch(fetchSinglePostLogs(id))
    }, [id])
    const newPostData = useSelector((state) => state.myems.singlePostMyems.data.singlePostLogs)
    const load = useSelector((state) => state.myems.singlePostMyems.data.loading)


    const hustory = useHistory()
    const deletedPost = (id) => {
        MyemsApiService.deletedPostmyEms(id)
        .then((res) => {
            if (res && res.data && res.data.success) {
                toast.success("Success");
                hustory.goBack();

            } else {
                toast.warning(res.data.data);
            }
        })
        .catch(err=>{
            console.log("erroer",err)
        })
    }
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
    return (
        <>
            {load ? <Flex
                style={{ marginTop: "15%" }}
                justify="center"

            >
                <ContentLoader />
            </Flex> :
                <Container fluid>
                    <Row>
                        <Col xs={12} className={"mb-8"}>
                            <BaseBreadcrumb
                                items={[
                                    {
                                        id: 1,
                                        name: "Почта (MyEMS)",
                                        url: "/myems/parcels",
                                    },
                                    {
                                        id: 2,
                                        name: `${newPostData.postCode}`,
                                        url: "/myems/parcels/edit",
                                    },
                                ]}
                            />
                        </Col>
                        <Col xs={12}>
                            <MyEMSParcelCompoent 
                            NationInfo={NationInfo}  
                            newPostData={newPostData} 
                            disabled={true} />
                        </Col>
                        <Col xs={12} align='center' className="mb-16">
                        <BaseButton
                    danger
                    className={"mr-8"}
                    handleClick={() => deletedPost(id)}
                >
                    Deleted
                </BaseButton>
                        </Col>
                    </Row>
                </Container>}

        </>
    );
}

export default SingleMyEMSParcelContiainer