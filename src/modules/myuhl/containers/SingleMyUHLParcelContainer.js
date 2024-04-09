import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import {
  BaseBreadcrumb,
  Content,
  BaseButton,
  Title,
  ContentLoader,
  BaseTable,
  Text,
  Flex,
} from "components";
import { dateFormatDefault } from "../../../utils/index";
import FormSenderMyuhl from "../components/FormSenderMyuhl";
import ContentParcelMyuhl from "../components/ContentParcelMyuhl";
import ReceiverParcelMyuhl from "../components/ReceiverParcelMyuhl";
import SvmCalculatorMyuhl from "../components/SvmCalculatorMyuhl";
import { useDispatch, useSelector } from "react-redux";
import { get, isEmpty } from "lodash";
import { fetchPostInfo } from "app/slices/myuhlPostSlices/editPostSlice";
import { Link, useParams } from "react-router-dom";
import { fetchSinglePostLogs } from "app/slices/myuhlSlices/singlePostLogsSlice/singlePostLogsSlice";
import { dateFormat } from "utils";
import nodata_icon from "assets/images/picture/no-data.png";
const EditMyUHLParcelContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPostInfo(id));
  }, [id]);

  const postData = useSelector(
    (store) => store.myuhlPost.editMyuhlPost.postData
  );
  console.log("postData", postData);
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

  useEffect(() => {
    dispatch(fetchSinglePostLogs(id));
  }, [id]);

  const singlePostLogs = useSelector(
    (store) => store.myuhl.singlePostLogsSlice.data.singlePostLogs.data
  );
  const isLogsLoading = useSelector(
    (store) => store.myuhl.singlePostLogsSlice.data.loading
  );

  return (
    <Container fluid>
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
                name: `${get(postData, "postCode", "")}`,
                url: "/email/parcels/edit",
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <Content>
            {isFetchedPostData && !isLogsLoading ? (
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
                    <Title>{get(postData, "postCode", "")}</Title>
                  </Col>
                  <Col xs={6} align={"center"}>
                    <Title>
                      {dateFormatDefault(get(postData, "createdAt", ""))}
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
                        borderBottom: "1px solid #E8E8E8",
                        margin: "0 -50px",
                        padding: "0 0 20px",
                      }}
                    >
                      <Col xs={12}>
                        <FormSenderMyuhl initialData={senderInfo} disabled />
                      </Col>
                    </Row>
                    <Row
                      style={{
                        borderBottom: "1px solid #E8E8E8",
                        margin: "0 -50px",
                        padding: 20,
                      }}
                    >
                      <Col xs={12} align={"center"}>
                        <Title>Описание содержимого</Title>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        margin: "0 -50px",
                        padding: "10px 0 0",
                      }}
                    >
                      <Col xs={12}>
                        <ContentParcelMyuhl data={contentParcelData} disabled />
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
                        borderBottom: "1px solid #E8E8E8",
                        margin: "0 -50px",
                        padding: "0 0 20px",
                      }}
                    >
                      <Col xs={12}>
                        <ReceiverParcelMyuhl data={receiverInfo} disabled />
                      </Col>
                    </Row>
                    <Row
                      style={{
                        borderBottom: "1px solid #E8E8E8",
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
                        <SvmCalculatorMyuhl data={svmData} disabled />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className={"mt-32 mb-32"} align="center">
                    <Link to={`/email/parcels/edit/${id}`}>
                      <BaseButton primary>Редактировать</BaseButton>
                    </Link>
                  </Col>
                </Row>
              </>
            ) : (
              <Flex style={{ marginTop: "15%" }} justify="center">
                <ContentLoader />
              </Flex>
            )}
          </Content>

          <Content className={"mt-32"} height={"400px"}>
            {!isLogsLoading ? (
              <Row className={"mb-16"}>
                <Col xs={12}>
                  {isFetchedPostData ? (
                    <BaseTable
                      tableHeader={["Дата и время", "Статус", "Местоположение"]}
                    >
                      {!isEmpty(singlePostLogs) ? (
                        singlePostLogs.map((item, index) => (
                          <tr key={index + 1}>
                            <td>{dateFormat(get(item, "createdAt", "-"))}</td>
                            <td>
                              {get(item, "status") === "SORTING" ? (
                                <Text xs> Sorting </Text>
                              ) : get(item, "status") ===
                                "DELIVER_IN_PROCESS" ? (
                                <Text xs> Deliver in Process </Text>
                              ) : get(item, "status") === "DELIVERED" ? (
                                <Text xs> Delivered </Text>
                              ) : get(item, "status") === "CUSTOM_CLEARANCE" ? (
                                <Text xs> Custom Clearance </Text>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td> {get(item, "location", "-")} </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={12}>
                            <p>нет данных</p>
                          </td>
                        </tr>
                      )}
                    </BaseTable>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            ) : (
              <></>
            )}
          </Content>
        </Col>
      </Row>
    </Container>
  );
};

export default EditMyUHLParcelContainer;
