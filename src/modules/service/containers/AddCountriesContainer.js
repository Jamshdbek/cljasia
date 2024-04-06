import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-grid-system";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    Flex,
    Collapse,
    AddCollapse,
    SubInfoBox,
    Title,
    Text,
    FormInput,
    Loader,
    FormWrapper,
} from "components";
import { get } from "lodash";
import {
    handleAddCountry,
    handleAddDistrict,
    handleChangeCode,
    handleChangeDistrict,
    handleChangeDistrictCode,
    handleChangeIndex,
    handleChangeRegion,
    handleClearInitialDistrict,
    handleClearInitialInfo,
    handleDeleteCountry,
    handleDeleteDistrict,
    handleEditCountry,
    handleEditDistrict,
    clearCountries,
} from "app/slices/serviceSlices/AddCountriesSlice/addCountriesSlice";
import { useFormik } from "formik";
import { addCountrySchema } from "utils/schema/serviceSchemas/serviceSchemas";
import { createSelector } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";
import { toast } from "react-toastify";
import history from "router/history";

const AddCountriesContainer = () => {
    const dispatch = useDispatch();
    const countries = useSelector((store) =>
        get(store, "service.countries.countries", [])
    );

    const regions = createSelector(
        (store) => store.service.countries.countries,
        (countries) => {
            const request = countries.map((item) => ({
                name: get(item, "region", null),
                postalCode: get(item, "regionIndex", null),
                customCode: get(item, "regionCode", null),
                districts: get(item, "districts", []).map((district) => ({
                    name: get(district, "district", null),
                    customCode: get(district, "districtCode", null),
                })),
            }));
            return request;
        }
    );

    const dataToSubmit = useSelector(regions);

    const countryName = useSelector(
        (store) => store.service.countries.countryName
    );
    const countryCode = useSelector(
        (store) => store.service.countries.countryCode
    );
    const countryInitialInfo = useSelector(
        (store) => store.service.countries.countryInitialInfo
    );
    const districtInitialInfo = useSelector(
        (store) => store.service.countries.districtInitial
    );

    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        try {
            setLoading(true);
            ServiceApiService.PostServiceCountries({
                regions: [...dataToSubmit],
                ...values,
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    dispatch(clearCountries());
                    history.goBack();
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    setLoading(true);
                    toast.success(res.data.message);
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
        useFormik({
            initialValues: {
                countryName: "",
                code: "",
            },
            onSubmit,
            validationSchema: addCountrySchema,
        });

    const [editCountryData, setEditCountryData] = useState({});

    const innerFunctionOne = useCallback(() => {
        dispatch(handleEditCountry(editCountryData));
    }, [editCountryData]);

    useEffect(() => {
        innerFunctionOne();
    }, [innerFunctionOne]);

    const [editDistrictData, setEditDistrictData] = useState({});

    const innerFunctionTwo = useCallback(() => {
        dispatch(handleEditDistrict(editDistrictData));
    }, [editDistrictData]);

    useEffect(() => {
        innerFunctionTwo();
    }, [innerFunctionTwo]);
    return (
        <Container fluid>
            {loading && <Loader />}
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Сервис", url: "/service" },
                            {
                                id: 2,
                                name: "Страны",
                                url: "/service/countries",
                            },
                            {
                                id: 3,
                                name: "Добавить",
                                url: "/service/countries/add",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <FormWrapper onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12}>
                                    <Row>
                                        <Col xs={6}>
                                            <FormInput
                                                label={"Наименование"}
                                                name={"countryName"}
                                                type={"text"}
                                                value={get(
                                                    values,
                                                    "countryName",
                                                    ""
                                                )}
                                                handleOnChange={handleChange}
                                                handleOnBlur={handleBlur}
                                                error={
                                                    touched.countryName &&
                                                    errors.countryName
                                                }
                                                left={4}
                                                right={8}
                                                className={"ml-32"}
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <FormInput
                                                label={"Код страны"}
                                                name={"code"}
                                                type={"text"}
                                                value={get(values, "code", "")}
                                                handleOnChange={handleChange}
                                                handleOnBlur={handleBlur}
                                                error={
                                                    touched.code && errors.code
                                                }
                                                left={4}
                                                right={8}
                                            />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xs={12} className="mt-16">
                                    <hr />
                                </Col>
                                <Col xs={12}>
                                    <Text
                                        xl
                                        medium
                                        dark
                                        className="ml-64 mt-16 mb-16"
                                    >
                                        Регионы
                                    </Text>
                                </Col>
                                <Col xs={12}>
                                    {countries.map((item, index) => (
                                        <Collapse
                                            key={index + 1}
                                            region={get(item, "region", "")}
                                            regionIndex={get(
                                                item,
                                                "regionIndex",
                                                ""
                                            )}
                                            id={get(item, "id", "")}
                                            regionCode={get(
                                                item,
                                                "regionCode",
                                                ""
                                            )}
                                            setEditCountryData={
                                                setEditCountryData
                                            }
                                            district={get(
                                                districtInitialInfo,
                                                "district",
                                                ""
                                            )}
                                            districtCode={get(
                                                districtInitialInfo,
                                                "districtCode",
                                                ""
                                            )}
                                            dispatchRemove={() =>
                                                dispatch(
                                                    handleDeleteCountry(
                                                        get(item, "id", "")
                                                    )
                                                )
                                            }
                                            handleChangeDistrict={(e) =>
                                                dispatch(
                                                    handleChangeDistrict(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                            handleChangeDistrictCode={(e) =>
                                                dispatch(
                                                    handleChangeDistrictCode(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                            dispatchDistrict={() => {
                                                dispatch(
                                                    handleAddDistrict({
                                                        ...districtInitialInfo,
                                                        id: get(item, "id", ""),
                                                    })
                                                );
                                                dispatch(
                                                    handleClearInitialDistrict()
                                                );
                                            }}
                                            className={"mt-8"}
                                        >
                                            {get(item, "districts", []).map(
                                                (district) => (
                                                    <SubInfoBox
                                                        key={index + 1}
                                                        districtId={get(
                                                            district,
                                                            "id",
                                                            ""
                                                        )}
                                                        regionId={get(
                                                            item,
                                                            "id",
                                                            ""
                                                        )}
                                                        setEditDistrictData={
                                                            setEditDistrictData
                                                        }
                                                        district={get(
                                                            district,
                                                            "district",
                                                            ""
                                                        )}
                                                        districtCode={get(
                                                            district,
                                                            "districtCode",
                                                            ""
                                                        )}
                                                        dispatchChanges={
                                                            handleEditDistrict
                                                        }
                                                        dispatchRemoveItem={() =>
                                                            dispatch(
                                                                handleDeleteDistrict(
                                                                    get(
                                                                        district,
                                                                        "id",
                                                                        ""
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    />
                                                )
                                            )}
                                        </Collapse>
                                    ))}

                                    <AddCollapse
                                        className={"mt-8"}
                                        regionValue={get(
                                            countryInitialInfo,
                                            "region",
                                            ""
                                        )}
                                        indexRegion={get(
                                            countryInitialInfo,
                                            "regionIndex",
                                            ""
                                        )}
                                        codeRegion={get(
                                            countryInitialInfo,
                                            "regionCode",
                                            ""
                                        )}
                                        handleChangeRegion={(e) =>
                                            dispatch(
                                                handleChangeRegion(
                                                    e.target.value
                                                )
                                            )
                                        }
                                        handleChangeIndex={(e) =>
                                            dispatch(
                                                handleChangeIndex(
                                                    e.target.value
                                                )
                                            )
                                        }
                                        handleChangeCode={(e) =>
                                            dispatch(
                                                handleChangeCode(e.target.value)
                                            )
                                        }
                                        dispatchRegionInfo={() => {
                                            dispatch(handleClearInitialInfo());
                                            dispatch(
                                                handleAddCountry(
                                                    countryInitialInfo
                                                )
                                            );
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-64">
                                <Col xs={12} align={"center"}>
                                    <BaseButton
                                        primary
                                        // handleClick={onSubmit}
                                        type="submit"
                                    >
                                        Добавить
                                    </BaseButton>
                                </Col>
                            </Row>
                        </FormWrapper>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default AddCountriesContainer;
