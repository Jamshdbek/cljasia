import React, { useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { get, isEqual, isEmpty } from "lodash";

import {
  BaseBreadcrumb,
  Content,
  BaseButton,
  BaseSelect,
  BaseTable,
  Flex,
  Text,
  ContentLoader,
  BaseInput,
  BasePagination,
  Loader,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInspections , handleClearFilter,handleChangeFilter } from "app/slices/myuhlSlices/inspectionAllSlice/inspectionAllSlice";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { ReactSVG } from "react-svg";
import editIcon from "../../../../src/assets/images/icons/edit.svg";
import deleteIcon from "../../../../src/assets/images/icons/deleteIcon.svg";
import { Link } from "react-router-dom";
import { dateFormat } from "utils";
import MyuhlApiService from "services/apiServices/myuhl";

const MyUHLInspectionsContainer = () => {
  const dispatch = useDispatch();

  const inspectionsAllData = useSelector((store) =>
    get(store, "myuhl.inspectionAllSlice.data.inspectionsAll.data", [])
  );

  const paginationData = useSelector((store) =>
    get(
      store,
      "myuhl.inspectionAllSlice.data.inspectionsAll.data.paginationData",
      []
    )
  );

  const isFetched = useSelector((store) =>
    get(store, "myuhl.inspectionAllSlice.data.inspectionsAll.success", false)
  );
 const filter = useSelector((store) => 
   store.myuhl.inspectionAllSlice.filter
 )
  const totalPages = get(paginationData, "totalPages", null);
  const pageSize = get(paginationData, "pageSize", null);
  const pageNumber = get(paginationData, "currentPageNumber", null);
  const [isDelete, setIsDelete] = useState(false);



  const [collapsedRowId, setCollapsedRowId] = useState(null);

  const [clear, setClear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    dispatch(
      fetchAllInspections({
        search: filter.search,
        size: filter.size,
        page: filter.page,
      })
    );
  };

  const clearSearch = () => {
    dispatch(
      fetchAllInspections({
        search: null,
        size: filter.size,
        page: filter.page,
      })
    );

    dispatch(handleClearFilter())
    setClear("");
  };

  useEffect(() => {
    handleSearch();
  }, [filter.size, filter.page]);

  useEffect(() => {
    document.title = "Инспекция";
  }, []);

  const removeInspect = (id) => {
    setLoading(true);
    try {
      MyuhlApiService.RemoveInspect(id).then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          dispatch(
            fetchAllInspections({
              search: filter.search,
              size: filter.size,
              page: filter.page,
            })
          );
        } else if (res && res.data && !res.data.success) {
          setLoading(false);
        }
      });
    } catch (e) {}
  };

  const kgColFun = (gram) => {
    return gram / 1000;
  };
  return (
    <Container fluid>
      {/* {loading && <Loader />} */}
      <Row>
        <Col xs={12} className={"mb-8"}>
          <BaseBreadcrumb
            items={[
              {
                id: 1,
                name: "Инспекция",
                url: "/financials/sales",
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <Content>
            <Row style={{ alignItems: "center" }}></Row>
            <Row className={"mb-8"}>
              <Col xs={0.5}></Col>
              <Col xs={3}>
                <BaseInput
                  value={get(filter,'search','')}

                  handleInput={(val) => {
                    setClear(val);
                    dispatch(handleChangeFilter({name:'search',value:val}))
                  }}
                  width="100%"
                  placeholder={"Поиск по коду, или ФИО"}
                  margin={"0 5px 0 0"}
                />
              </Col>
              <Col xs={8} className={"text-right"}>
                <BaseButton
                  className={"mr-8"}
                  primary
                  handleClick={handleSearch}
                >
                  Поиск
                </BaseButton>
                <BaseButton danger className={"mr-2"} handleClick={clearSearch}>
                  Сбросить
                </BaseButton>
              </Col>
              <Col xs={0.5}></Col>
            </Row>
            <Row className="mb-32">
              <Col xs={12}>
                {isFetched ? (
                  <BaseTable
                    tableHeader={[
                      "Дата (год/месяц/день)",
                      "Количество",
                      "Вес",
                      "Цена",
                    ]}
                  >
                    {!isEmpty(inspectionsAllData) ? (
                      inspectionsAllData.data.map((item, index) => (
                        <>
                          <tr
                            key={index + 300}
                            className={"cursor-pointer"}
                            onClick={() =>
                              setCollapsedRowId((id) =>
                                get(item, "id", null) == id
                                  ? null
                                  : get(item, "id", null)
                              )
                            }
                          >
                            <td>{dateFormat(get(item, "date", "-"))}</td>
                            <td>{get(item, "count", "")}</td>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={kgColFun(get(item, "quantity", ""))}
                                thousandSeparator={true}
                                fixedDecimalScale={true}
                              />{" "}
                              кг
                            </td>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={get(item, "price", "")}
                                prefix={"₩ "}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                              />
                            </td>
                          </tr>
                          {isEqual(collapsedRowId, get(item, "id")) && (
                            <tr>
                              <td colSpan={4}>
                                <BaseTable
                                  className="mt-16 mb-16 light-border"
                                  tableHeader={[
                                    "Дата (год/месяц/день)",
                                    "Код",
                                    "Получатель",
                                    "Страна",
                                    "Вес (грамм)",
                                    "Цена",
                                    "Изменить",
                                    "Удалить",
                                  ]}
                                >
                                  {get(item, "posts", []) &&
                                    get(item, "posts", []).map(
                                      (post, index) => (
                                        <tr key={index + 1}>
                                          <td>
                                            {dateFormat(get(post, "date", "-"))}
                                          </td>
                                          <td>
                                            <Link
                                              to={`/myuhl/parcels/single/${get(
                                                post,
                                                "id",
                                                null
                                              )}`}
                                              className={"link_color"}
                                            >
                                              {get(post, "code", "")}
                                            </Link>
                                          </td>

                                          <td>{get(post, "name", "")}</td>
                                          <td>
                                            {get(post, "countryCode", "")}
                                          </td>
                                          <td>
                                            <NumericFormat
                                              displayType="text"
                                              value={get(post, "quantity", "")}
                                              thousandSeparator={true}
                                              fixedDecimalScale={true}
                                            />{" "}
                                            {"грамм"}
                                          </td>
                                          <td>
                                            <NumericFormat
                                              displayType="text"
                                              value={get(post, "price", "")}
                                              prefix={"₩ "}
                                              thousandSeparator={true}
                                              decimalScale={0}
                                              fixedDecimalScale={true}
                                            />
                                          </td>
                                          <td>
                                            <Link
                                              to={`/myuhl/parcels/edit/${get(
                                                post,
                                                "id",
                                                null
                                              )}`}
                                            >
                                              <ReactSVG
                                                src={editIcon}
                                                className={"cursor-pointer"}
                                              />
                                            </Link>
                                          </td>
                                          <td>
                                            {isDelete ===
                                            get(post, "id", null) ? (
                                              <>
                                                {
                                                  <BaseButton
                                                    green
                                                    xs
                                                    onClick={() =>
                                                      removeInspect(
                                                        get(post, "id", null)
                                                      )
                                                    }
                                                  >
                                                    Удалить
                                                  </BaseButton>
                                                }
                                                <BaseButton
                                                  style={{
                                                    marginTop: 10,
                                                  }}
                                                  danger
                                                  xs
                                                  onClick={() =>
                                                    setIsDelete(false)
                                                  }
                                                  className={"ml-4"}
                                                >
                                                  Отменить
                                                </BaseButton>
                                              </>
                                            ) : (
                                              !get(
                                                post,
                                                "cannotDelete",
                                                false
                                              ) && (
                                                <ReactSVG
                                                  src={deleteIcon}
                                                  className={"cursor-pointer"}
                                                  onClick={() => {
                                                    setIsDelete(
                                                      get(post, "id", null)
                                                    );
                                                  }}
                                                />
                                              )
                                            )}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                </BaseTable>
                              </td>
                            </tr>
                          )}
                        </>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10}>No data</td>
                      </tr>
                    )}
                  </BaseTable>
                ) : (
                  <Flex style={{ marginTop: "15%" }} justify="center">
                    <ContentLoader />
                  </Flex>
                )}
              </Col>
            </Row>
            {totalPages > 0 && (
              <Row align={"center"}>
                <Col xs={4}>
                  <Flex>
                    <Text>Show</Text>
                    <BaseSelect
                      // disabled
                      handleChange={( value ) => {
                        dispatch(handleChangeFilter({name:'size',value:value}))
                      }}
                      options={[
                        { value: 5, label: 5 },
                        { value: 10, label: 10 },
                        {
                          value: 25,
                          label: 25,
                        },
                        { value: 50, label: 50 },
                      ]}
                      value={get(filter, "size", 10)}
                      margin={"0 12px 0 12px"}
                      width={"80px"}
                    />
                    <Text>on the page</Text>
                  </Flex>
                </Col>
                <Col xs={8}>
                  <BasePagination
                    current={pageNumber}
                    value={get(filter,'page',10)}
                    onChange={({ selected }) => {
                      dispatch(handleChangeFilter({name:'page',value:selected+1}))
                    }}
                    pageCount={totalPages}
                  />
                </Col>
              </Row>
            )}
          </Content>
        </Col>
      </Row>
    </Container>
  );
};
export default MyUHLInspectionsContainer;
