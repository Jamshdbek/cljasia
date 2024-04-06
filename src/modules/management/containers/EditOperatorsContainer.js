import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Col, Container, Row } from "react-grid-system";
import _, { get } from "lodash";
import {
  BaseBreadcrumb,
  Content,
  BaseButton,
  FormInput,
  FormSelector,
  FormWrapper,
  Loader,
} from "components";
import { editOperatorsSchema } from "utils/schema/managementSchemas/managementSchema";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagementOperator } from "app/slices/managementSlices/operatorSlice/editOperatorSlice";
import { ManagementApiService } from "services/apiServices";
import { toast } from "react-toastify";
import history from "router/history";

const EditOperatorsContainer = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const OperatorData = useSelector((store) =>
    get(store, "management.editOperatorSlice.data.managementOperator.data")
  );

  const accountTypesData = useSelector((store) =>
    get(store, "common.accountTypes.data.accountTypes.data", [])
  );

  const accountsTypeOptions = _.map(accountTypesData, function map(item) {
    return {
      label: get(item, "accountName", "-"),
      value: get(item, "id", "-"),
    };
  });
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        id: get(OperatorData, "id", 1),
        name: get(OperatorData, "name", ""),
        lastName: get(OperatorData, "lastName", ""),
        email: get(OperatorData, "email", ""),
        password: get(OperatorData, "password", "").substring(1,8),
        copyPassword: get(OperatorData, "password", "").substring(1,8),
        accountTypeId: get(OperatorData, "accountTypeId", null),
        isBlocked: get(OperatorData, "isBlocked", null),
      },

      validationSchema: editOperatorsSchema,
    });
  const dispatchUpdateOperator = () => {
    setLoading(true);
    ManagementApiService.EditManagementOperator(values)
      .then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          history.goBack();
          toast.success("Success");
        } else if (res && res.data && !res.data.success) {
          setLoading(true);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err, "Error");
      });
  };
  useEffect(() => {
    dispatch(fetchManagementOperator(id));
  }, [id]);

  return (
    <Container fluid>
      {/* {loading && <Loader/> } */}
      <Row>
        <Col xs={12} className={"mb-8"}>
          <BaseBreadcrumb
            items={[
              { id: 1, name: "Менеджмент", url: "/management" },
              {
                id: 2,
                name: "Операторы",
                url: "/management/operators",
              },
              {
                id: 3,
                name: "Редактировать",
                url: "/management/operators/edit",
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <Content>
            <Row className="mt-32 ml-64">
              <Col xs={12}>
                <FormWrapper>
                  <FormInput
                    label={"Имя"}
                    name={"name"}
                    type={"text"}
                    value={get(values, "name", "")}
                    handleOnChange={handleChange}
                    handleOnBlur={handleBlur}
                    error={touched.firstName && errors.firstName}
                    left={2}
                    right={6}
                  />
                  <FormInput
                    label={"Фамилия"}
                    name={"lastName"}
                    type={"text"}
                    value={get(values, "lastName", "")}
                    handleOnChange={handleChange}
                    handleOnBlur={handleBlur}
                    error={touched.lastName && errors.lastName}
                    left={2}
                    right={6}
                  />
                  <FormInput
                    style={{ opacity: 0.7 }}
                    disabled={true}
                    label={"Email"}
                    name={"email"}
                    type={"email"}
                    grey
                    value={get(values, "email", "")}
                    handleOnChange={handleChange}
                    handleOnBlur={handleBlur}
                    error={touched.email && errors.email}
                    left={2}
                    right={6}
                  />
                  <FormInput
                    label={"Пароль"}
                    name={"password"}
                    type={"password"}
                    value={get(values, "password", "")}
                    handleOnChange={handleChange}
                    handleOnBlur={handleBlur}
                    error={touched.password && errors.password}
                    left={2}
                    right={6}
                  />
                  <FormInput
                    label={"Пароль еще раз"}
                    name={"copyPassword"}
                    type={"password"}
                    value={get(values, "copyPassword", "")}
                    handleOnChange={handleChange}
                    handleOnBlur={handleBlur}
                    error={touched.repeatpassword && errors.repeatpassword}
                    left={2}
                    right={6}
                  />
                  <FormSelector
                    label={"Категория аккаунта"}
                    name={"accountTypeId"}
                    value={get(values, "accountTypeId", "")}
                    placeholder={get(values, "accountTypeId", "")}
                    defaultValue={get(values, "accountTypeId", "")}
                    error={touched.accountTypeId && errors.accountTypeId}
                    handleChange={(e) => {
                      setFieldValue("accountTypeId", e);
                    }}
                    options={accountsTypeOptions}
                    left={2}
                    right={6}
                  />
                  <FormSelector
                    label={"Статус"}
                    name={"status"}
                    value={get(values, "isBlocked", "")}
                    placeholder={"Active / Inactive"}
                    error={touched.status && errors.status}
                    handleChange={(e) => setFieldValue("isBlocked", e)}
                    options={[
                      {
                        value: false,
                        label: "Active",
                      },
                      {
                        value: true,
                        label: "Inactive",
                      },
                    ]}
                    left={2}
                    right={6}
                  />
                  <Row className="mt-32">
                    <Col xs={12} align={"center"}>
                      <BaseButton
                        primary
                        handleClick={() => dispatchUpdateOperator()}
                      >
                        Изменять
                      </BaseButton>
                    </Col>
                  </Row>
                </FormWrapper>
              </Col>
            </Row>
          </Content>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOperatorsContainer;
