import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { get, includes, isEmpty, isNull } from "lodash";
import moment from "moment";
import edit from "../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../assets/images/icons/deleteIcon.svg";

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
  NoData,
} from "components";
import image1 from "../../../assets/images/picture/Check_fill.png";
import image2 from "../../../assets/images/picture/Check_ring_light@3x.png";
import { ReactSVG } from "react-svg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServiceAllCountries } from "app/slices/serviceSlices/allCountriesSlice/allCountriesSlice";
import _ from "lodash";
import { fetchAllServiceLocations } from "app/slices/serviceSlices/locationsSlice/locationsSlice";
import {
  fetchMyuhlAllPosts,
  handleChangeFilter,
  handleClearFilter,
  handleChangeCheckbox,
  handleCheckParcel,
} from "app/slices/myuhlSlices/myuhlAllPostsSlice/myuhlAllPostsSlice";
import { NumericFormat } from "react-number-format";
import { dateFormat } from "../../../utils/index";
import MyuhlApiService from "services/apiServices/myuhl";
import { toast } from "react-toastify";
import { createSelector } from "@reduxjs/toolkit";
import { HasAccess } from "services/auth";
import { fetchActiveLocations } from "app/slices/commonSlices/activeLocationsSlice";
import { fetchUserMe } from "app/slices/commonSlices/userMeSlice";
import { fetchAllDealersPrices } from "app/slices/dealerSlices/dealersPriceSlice/dealersPriceSlice";
import dealerSchema from "app/createSelector/dealerSchema";
import "moment/locale/ru";
import { fetchCountries } from "app/slices/commonSlices/countriesSlice";
import nodata_icon from "assets/images/picture/no-data.png";
const MyUHLParcelsContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const refLocation = useRef();
  const refStatus = useRef();
  const refCountry = useRef();
  const refCreator = useRef();
  const [isActiveButton, setIsActiveButton] = useState(false);
  // const active = useRef(false)
  const clearLocationSelect = () => {
    refLocation.current.clearValue();
  };
  const clearStatusSelect = () => {
    refStatus.current.clearValue();
  };
  const clearCountrySelect = () => {
    refCountry.current.clearValue();
  };
  const clearCreatorSelect = () => {
    refCreator.current.clearValue();
  };
  const filter = useSelector((store) => store.myuhl.myuhlAllPostsSlice.filter);

  useEffect(() => {
    dispatch(fetchMyuhlAllPosts(filter));
  }, [filter.size, filter.page]);
  useEffect(() => {
    dispatch(fetchAllServiceAllCountries());
    dispatch(fetchAllServiceLocations());
    dispatch(fetchActiveLocations());
    dispatch(fetchAllDealersPrices());
    dispatch(fetchMyuhlAllPosts(filter));
  }, []);

  useEffect(() => {
    dispatch(fetchUserMe());
  }, []);

  const userMe = useSelector((store) =>
    get(store, "common.userMe.data.userMe.data", [])
  );

  const countrydata = useSelector((store) =>
    get(store, "common.countries.countries", [])
  );
  const countryOptions = _.map(countrydata, function map(item) {
    return {
      label: get(item, "name", "-"),
      value: get(item, "id", "-"),
    };
  });

  let dealerOptions = useSelector(dealerSchema);
  dealerOptions = [{ label: "All", value: "0" }, ...dealerOptions];

  const locations = useSelector((store) =>
    get(store, "service.serviceLocations.data.serviceLocations.data", [])
  );

  const locationOptions = _.map(locations, function map(item) {
    return {
      label: get(item, "name", "-"),
      value: get(item, "id", "-"),
    };
  });

  const activeLocations = useSelector((store) =>
    get(store, "common.activeLocations.data.activeLocations.data", [])
  );

  const activeLocationOptions = _.map(activeLocations, function map(item) {
    return {
      label: get(item, "name", "-"),
      value: get(item, "id", "-"),
    };
  });
  const [loading, setLoading] = useState(false);
  const [locationToChange, setLocationToChange] = useState(null);

  const refLocationToChange = useRef();
  const locationSchema = createSelector(
    (store) => get(store, "myuhl.myuhlAllPostsSlice.data.myuhlAllPosts", []),
    (myuhlAllPosts) =>
      myuhlAllPosts.filter((item) => item.checked).map((item) => item.id)
  );
  const isAdminSchema = createSelector(
    (store) => get(store, "myuhl.myuhlAllPostsSlice.data.myuhlAllPosts", []),
    (myuhlAllPosts) => {
      const arr = myuhlAllPosts
        .filter((item) => item.checked)
        .map((item) => item.isAdmin);

      return includes(arr, true);
    }
  );
  const isCheckedParcelsSchema = createSelector(
    (store) => get(store, "myuhl.myuhlAllPostsSlice.data.myuhlAllPosts", []),
    (myuhlAllPosts) => {
      const arr = myuhlAllPosts.filter((item) => item.checked);
      return !isEmpty(arr);
    }
  );
  const isUnCheckedParcelsSchema = createSelector(
    (store) => get(store, "myuhl.myuhlAllPostsSlice.data.myuhlAllPosts", []),
    (myuhlAllPosts) => {
      const arr = myuhlAllPosts.filter((item) => !item.checked);
      return !isEmpty(arr);
    }
  );
  const isCheckedParcels = useSelector(isCheckedParcelsSchema);
  const isUncheckedParcels = useSelector(isUnCheckedParcelsSchema);
  const [checkAllPosts, setCheckAllPosts] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    setCheckAllPosts(!isUncheckedParcels);
    dispatch(fetchCountries());
    if (isUncheckedParcels === false && allPostsData.length === 0) {
      setCheckAllPosts(false);
    }
  }, [isUncheckedParcels]);
  const locationToSubmit = useSelector(locationSchema);
  const isAdmin = useSelector(isAdminSchema);

  const dispatchChangeLocation = () => {
    setLoading(true);
    // try {
    MyuhlApiService.ChangeLocationPosts({
      locationId: locationToChange,
      postIds: locationToSubmit,
    })
      .then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          toast.success("Success");
          setLocationToChange(null);
          dispatch(
            handleChangeCheckbox({
              check: true,
              all: "all",
            })
          );
          dispatch(fetchMyuhlAllPosts(filter));
          refLocationToChange.current.clearValue();
        } else if (res && res.data && !res.data.success) {
          setLoading(false);
          toast.error(res.data.description);
          setLocationToChange(null);
          dispatch(
            handleChangeCheckbox({
              check: true,
              all: "all",
            })
          );
          dispatch(fetchMyuhlAllPosts(filter));
          refLocationToChange.current.clearValue();
        }
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.response.data.data.description);
        setLocationToChange(null);
        dispatch(
          handleChangeCheckbox({
            check: true,
            all: "all",
          })
        );
        dispatch(fetchMyuhlAllPosts(filter));
        refLocationToChange.current.clearValue();
      });
  };
  const dispatchInspections = () => {
    setLoading(true);
    try {
      MyuhlApiService.DispatchInspection({
        ids: locationToSubmit,
      }).then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          if (isAdmin) {
            toast.warning(
              "Main admin's parcels will not appear on inspections"
            );
          } else {
            toast.success("Success");
          }
          dispatch(
            handleChangeCheckbox({
              check: true,
              all: "all",
            })
          );
        } else if (res && res.data && !res.data.success) {
          setLoading(false);
          toast.error(res.data.message);
        }
      });
    } catch (e) {}
  };

  const allPostsData = useSelector((store) =>
    get(store, "myuhl.myuhlAllPostsSlice.data.myuhlAllPosts", [])
  );
  const paginationData = useSelector((store) =>
    get(store, "myuhl.myuhlAllPostsSlice.data.pagination", [])
  );
  const isLoading = useSelector((store) =>
    get(store, "myuhl.myuhlAllPostsSlice.data.loading", false)
  );
  const totalPages = get(paginationData, "totalPages", null);
  const [clear, setClear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApply();
  };
  const handleApply = () => {
    dispatch(fetchMyuhlAllPosts(filter));
  };
  useEffect(() => {
    return () => {
      dispatch(handleClearFilter());
    };
  }, []);
  const clearSelect = () => {
    dispatch(handleClearFilter());
    dispatch(
      fetchMyuhlAllPosts({
        size: filter.size,
        page: filter.page,
        uhlCode: null,
        status: null,
        locationId: null,
        countryId: null,
        fromDate: moment().subtract(2, "month").format("YYYY-MM-DD"),
        toDate: moment().add(1, "days").format("YYYY-MM-DD"),
      })
    );
    clearLocationSelect();
    clearStatusSelect();
    clearCountrySelect();
    clearCreatorSelect();
    setClear("");
  };
  const [active, setActive] = useState(true);
  const handleAddPrice = () => {
    if (!get(userMe, "hasPrice")) {
      toast.warning("Super admin should add country prices for you");
    } else {
      history.push("/email/parcels/add");
    }
  };
  useEffect(() => {
    if (locationToChange === null) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }, [locationToChange]);

  useEffect(() => {
    document.title = "Почта ";
  }, []);

  const removePost = (id) => {
    setLoading(true);
    try {
      MyuhlApiService.RemovePost(id).then((res) => {
        if (res && res.data && res.data.success) {
          setLoading(false);
          dispatch(fetchMyuhlAllPosts(filter));
        } else if (res && res.data && !res.data.success) {
          setLoading(false);
          // toast.error(res.data.message);
        }
      });
    } catch (e) {}
  };

  // function to check between checked boxes
  const [hotKeyPressed, setHotKeyPressed] = useState(false);
  const [firstCheckedIndex, setFirstCheckedIndex] = useState(null);
  const inputRef = useRef(null);

  const handleSetFirstCheck = (index) => {
    // if (isNull(firstCheckedIndex)) {
    setFirstCheckedIndex(index);
    // }
  };

  useEffect(() => {
    window.addEventListener("keydown", () => setHotKeyPressed(true));
    window.addEventListener("keyup", () => {
      setHotKeyPressed(false);
      setFirstCheckedIndex(null);
    });

    if (!hotKeyPressed) {
      return () => {
        window.addEventListener("keydown", () => setHotKeyPressed(true));
      };
    }
    if (hotKeyPressed) {
      return () => {
        window.addEventListener("keyup", () => setHotKeyPressed(false));
      };
    }
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      {loading && <Loader />}
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
              ]}
            />
          </Col>

          <Col xs={12}>
            <Content style={{ minHeight: "70vh" }}>
              <Row className={"mb-8"}>
                <HasAccess>
                  {({ isAdmin }) =>
                    isAdmin && (
                      <>
                        <Col xs={2}>
                          <BaseSelect
                            ref={refLocationToChange}
                            value={locationToChange}
                            options={activeLocationOptions}
                            handleChange={(e) => setLocationToChange(e)}
                            margin={"0 12px 0 12px"}
                            width={"180px"}
                            placeholder="Местоположение"
                            isClearable={true}
                          />
                        </Col>
                        <Col xs={2}>
                          <BaseButton
                            danger
                            className={"mr-2"}
                            handleClick={dispatchChangeLocation}
                            disabled={
                              !isCheckedParcels
                                ? true
                                : !isNull(locationToChange)
                                ? false
                                : true
                            }
                          >
                            Изменить
                          </BaseButton>
                        </Col>
                      </>
                    )
                  }
                </HasAccess>
                <HasAccess>
                  {({ isAdmin }) =>
                    isAdmin ? (
                      <Col xs={8} className={"text-right"}>
                        <>
                          {
                            <BaseButton
                              tangerine
                              disabled={!isCheckedParcels}
                              className={"mr-8"}
                              handleClick={dispatchInspections}
                            >
                              Инспекция
                            </BaseButton>
                          }

                          <BaseButton
                            className={"mr-8"}
                            disabled={!isCheckedParcels}
                            onClick={() => {
                              history.push("/email/parcels/invoice");
                            }}
                            primary
                          >
                            Отчет
                          </BaseButton>
                          <BaseButton
                            disabled={!isCheckedParcels}
                            primary
                            className={"mr-8"}
                          >
                            Печать
                          </BaseButton>
                          <BaseButton
                            className={"text-right"}
                            green
                            handleClick={handleAddPrice}
                          >
                            Добавить
                          </BaseButton>
                        </>
                      </Col>
                    ) : (
                      <Col>
                        <BaseButton
                          className={"text-right"}
                          style={{ float: "right" }}
                          green
                          handleClick={handleAddPrice}
                        >
                          Добавить
                        </BaseButton>
                      </Col>
                    )
                  }
                </HasAccess>
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
                        value={clear}
                        handleInput={(value) => {
                          setClear(value);
                          dispatch(
                            handleChangeFilter({
                              name: "uhlCode",
                              value: value,
                            })
                          );
                        }}
                        width={"200px"}
                        placeholder={"Поиск по Коду и ФИО ..."}
                        margin={"0 6px 0 6px"}
                      />
                      <BaseSelect
                        ref={refLocation}
                        value={get(filter, "locationId", null)}
                        handleChange={(value) => {
                          dispatch(
                            handleChangeFilter({
                              name: "locationId",
                              value: value,
                            })
                          );
                        }}
                        options={locationOptions}
                        margin={"0 6px 0 6px"}
                        width={"300px"}
                        placeholder="Местоположение"
                      />
                      <HasAccess>
                        {({ isAdmin }) =>
                          isAdmin && (
                            <BaseSelect
                              ref={refCreator}
                              value={get(filter, "dealerId", null)}
                              isClearable={true}
                              handleChange={(value) => {
                                dispatch(
                                  handleChangeFilter({
                                    name: "dealerId",
                                    value: value,
                                  })
                                );
                              }}
                              options={dealerOptions}
                              margin={"0 6px 0 6px"}
                              width={"300px"}
                              placeholder="Создал"
                            />
                          )
                        }
                      </HasAccess>

                      <BaseSelect
                        ref={refStatus}
                        value={get(filter, "status", null)}
                        handleChange={(value) => {
                          dispatch(
                            handleChangeFilter({
                              name: "status",
                              value: value,
                            })
                          );
                        }}
                        options={[
                          {
                            label: "Sorting",
                            value: "SORTING",
                          },
                          {
                            label: "Deliver in Process",
                            value: "DELIVER_IN_PROCESS",
                          },
                          {
                            label: "Custom Clearance",
                            value: "CUSTOM_CLEARANCE",
                          },
                          {
                            label: "Delivered",
                            value: "DELIVERED",
                          },
                        ]}
                        margin={"0 6px 0 6px"}
                        placeholder="Статус"
                      />
                      <BaseSelect
                        ref={refCountry}
                        value={get(filter, "countryId", null)}
                        handleChange={(value) => {
                          dispatch(
                            handleChangeFilter({
                              name: "countryId",
                              value: value,
                            })
                          );
                        }}
                        options={countryOptions}
                        margin={"0 6px 0 6px"}
                        placeholder="Страна"
                      />
                      <BaseDatePicker
                        value={get(filter, "fromDate", null)}
                        handleDate={(value) => {
                          dispatch(
                            handleChangeFilter({
                              name: "fromDate",
                              value: moment(value).format("YYYY-MM-DD"),
                            })
                          );
                        }}
                        margin={"0 6px 0 6px"}
                        placeholder={"Начало"}
                      />
                      <BaseDatePicker
                        value={get(filter, "toDate", null)}
                        handleDate={(value) => {
                          dispatch(
                            handleChangeFilter({
                              name: "toDate",
                              value: moment(value).format("YYYY-MM-DD"),
                            })
                          );
                        }}
                        margin={"0 6px 0 6px"}
                        placeholder={"Конец"}
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
                      handleClick={() => clearSelect()}
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
                  {!isLoading ? (
                    <BaseTable
                      minWidth={"1px"}
                      tableHeader={[
                        {
                          name: (
                            <BaseCheckbox
                              checked={checkAllPosts}
                              handleChange={() => {
                                setCheckAllPosts(!checkAllPosts);
                                dispatch(
                                  handleChangeCheckbox({
                                    check: checkAllPosts,
                                    all: "all",
                                  })
                                );
                              }}
                            />
                          ),
                          maxWidth: "35px",
                        },
                        "Запись Манифест",
                        "Создал",
                        "Дата (год/месяц/день)",
                        "Код",
                        "Получатель",
                        "Страна",
                        "Вес (грамм)",
                        "Цена",
                        "CLJASIA Цена ",
                        "Местоположение",
                        "Статус",
                        "Печать",
                        "Печать",
                        "Изменить",
                        "Удалить",
                      ]}
                      myuhlPage
                    >
                      {!isEmpty(allPostsData) ? (
                        allPostsData.map((item, index) => (
                          <tr key={get(item, "id", null)}>
                            <td>
                              <BaseCheckbox
                                checked={get(item, "checked", false)}
                                handleChange={() => {
                                  setActive(false);
                                  handleSetFirstCheck(index);
                                  dispatch(
                                    handleCheckParcel({
                                      index,
                                      firstCheckedIndex,
                                      id: get(item, "id", ""),
                                      hotKeyPressed,
                                    })
                                  );
                                }}
                                onClick={() =>
                                  dispatch(
                                    handleCheckParcel({
                                      index,
                                      firstCheckedIndex,
                                    })
                                  )
                                }
                              />
                            </td>
                            <td>
                              {get(item, "isRecorded", false) ? (
                                <img
                                  style={{
                                    width: "25px",
                                  }}
                                  src={`${image1}`}
                                />
                              ) : (
                                <img
                                  style={{
                                    width: "25px",
                                  }}
                                  src={`${image2}`}
                                />
                              )}
                            </td>
                            <td>{get(item, "creator", "-")}</td>
                            <td>{dateFormat(get(item, "createdAt", "-"))}</td>
                            <td>
                              <Link
                                to={`/email/parcels/single/${get(
                                  item,
                                  "id",
                                  null
                                )}`}
                                className={"link_color"}
                              >
                                {get(item, "postCode", "-")}
                              </Link>
                            </td>
                            <td>{get(item, "to.name", "-")}</td>
                            <td>{get(item, "to.countryCode", "-")}</td>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={get(item, "unitValue", "-")}
                                thousandSeparator={true}
                                fixedDecimalScale={true}
                              />
                            </td>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={get(item, "price", "")}
                                prefix={"¥"}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                              />
                            </td>
                            <td>
                              <NumericFormat
                                displayType="text"
                                value={get(item, "basePrice", "")}
                                prefix={"¥"}
                                thousandSeparator={true}
                                decimalScale={0}
                                fixedDecimalScale={true}
                              />
                            </td>
                            <td>{get(item, "location.label", "-")}</td>
                            <td>
                              {get(item, "status") === "SORTING" ? (
                                <Text lightDark xs>
                                  {" "}
                                  Sorting{" "}
                                </Text>
                              ) : get(item, "status") ===
                                "DELIVER_IN_PROCESS" ? (
                                <Text lightDark xs>
                                  {" "}
                                  Deliver in Process{" "}
                                </Text>
                              ) : get(item, "status") === "DELIVERED" ? (
                                <Text lightDark xs>
                                  {" "}
                                  Delivered{" "}
                                </Text>
                              ) : get(item, "status") === "CUSTOM_CLEARANCE" ? (
                                <Text lightDark xs>
                                  Custom Clearance
                                </Text>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              <Link
                                to={`/email/parcels/clientcheck/${get(
                                  item,
                                  "id",
                                  null
                                )}`}
                                target="_blank"
                              >
                                <BaseButton
                                  bordered
                                  width={"fit-content"}
                                  fontSize={"12px"}
                                >
                                  Клиент
                                </BaseButton>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/email/parcels/tax/${get(
                                  item,
                                  "id",
                                  null
                                )}`}
                                target="_blank"
                              >
                                <BaseButton
                                  bordered
                                  width={"fit-content"}
                                  fontSize={"12px"}
                                >
                                  Налог
                                </BaseButton>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/email/parcels/edit/${get(
                                  item,
                                  "id",
                                  null
                                )}`}
                              >
                                <ReactSVG
                                  src={edit}
                                  className={"cursor-pointer"}
                                />
                              </Link>
                            </td>
                            <td>
                              {isDelete === get(item, "id", null) ? (
                                <>
                                  {get(item, "canDelete", false) && (
                                    <BaseButton
                                      green
                                      xs
                                      onClick={() =>
                                        removePost(get(item, "id", null))
                                      }
                                    >
                                      Удалить
                                    </BaseButton>
                                  )}
                                  {get(item, "canDelete", false) && (
                                    <BaseButton
                                      style={{
                                        marginTop: 10,
                                      }}
                                      danger
                                      xs
                                      onClick={() => setIsDelete(false)}
                                      className={"ml-4"}
                                    >
                                      Отменить
                                    </BaseButton>
                                  )}
                                </>
                              ) : (
                                get(item, "canDelete", false) && (
                                  <ReactSVG
                                    src={deleteIcon}
                                    className={"cursor-pointer"}
                                    onClick={() => {
                                      setIsDelete(get(item, "id", null));
                                    }}
                                  />
                                )
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={16}>
                            <NoData />
                          </td>
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
                <Row align={"center"} className={"pagination_position"}>
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
                        value={get(filter, "size", 10)}
                        options={[
                          { value: 5, label: 5 },
                          { value: 10, label: 10 },
                          {
                            value: 25,
                            label: 25,
                          },
                          { value: 50, label: 50 },
                        ]}
                        margin={"0 12px 0 12px"}
                        width={"80px"}
                        placeholder={"Count"}
                      />
                      <Text>on the page</Text>
                    </Flex>
                  </Col>
                  <Col xs={8}>
                    <BasePagination
                      current={get(filter, "page", 0)}
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
                </Row>
              )}
            </Content>
          </Col>
        </Row>
        <input ref={inputRef} style={{ visibility: "hidden" }} />
      </Container>
    </>
  );
};

export default MyUHLParcelsContainer;
