import { BaseBreadcrumb, BaseButton, Content, Title } from "components";
import React,{ useEffect } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useParams } from "react-router-dom";
import FormSenderMyems from "../components/FormSenderMyems";
import ContentParcelMyems from "../components/ContentParcelMyems";
import ReceiverParcelMyems from "../components/ReceiverParcelMyems";
import SvmCalculatorMyems from "../components/SvmCalculatorMyems";
// import { fetchPostInfo } from "app/slices/myemsSlices/singlePostMyems";
import { useDispatch, useSelector } from "react-redux";


const EditMyEMSParcelContiainer = () => {
  const { id } = useParams()
  console.log(id)

  return (
    <>
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
                {
                  id: 2,
                  name: "Редактировать",
                  url: "/myems/parcels/edit",
                },
              ]}
            />
          </Col>
          <Col xs={12}>
            <Content style={{ padding: "0 15px" }}>
              <Row
                style={{ borderBottom: "1px solid #E8E8E8" }}
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
                    UHL10000925KR
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
                    borderRight: '1px solid #E8E8E8',
                    borderBottom: '1px solid #E8E8E8',
                    padding: "20px 50px",
                  }}
                >
                  <Row style={{
                    borderBottom: "1px solid #E8E8E8",
                    margin: '0 -50px',
                    padding: "0 0 20px",
                  }}>
                    <Col
                      xs={12}
                    >
                      <FormSenderMyems />
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

                  <Row style={{
                    margin: "0 -50px",
                    padding: "10px 0 0"
                  }}>
                    <Col xs={12}>
                      <ContentParcelMyems
                        data={[
                          { id: 87, productName: 'Phone', quantity: 1, hsCode: '465u7', price: 1000 },
                          { id: '1000000000', productName: '', quantity: '', hsCode: '', price: '' },
                          { id: '1000000001', productName: '', quantity: '', hsCode: '', price: '' }
                        ]}
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
                  }}>
                  <Row
                    style={{
                      borderBottom: "1px solid #E8E8E8",
                      margin: "0 -50px",
                      padding: "0 0 20px",
                    }}
                  >
                    <Col xs={12}>
                      <ReceiverParcelMyems />
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
                      <SvmCalculatorMyems />
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
                  // handleClick={() =>
                  //   dispatchCreatePost()
                  // }
                  >
                    Обновить
                  </BaseButton>
                </Col>
              </Row>
            </Content>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditMyEMSParcelContiainer