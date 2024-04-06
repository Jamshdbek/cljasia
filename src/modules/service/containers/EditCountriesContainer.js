import React, { useEffect, useState } from "react";
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
    Text,
    FormInput,
    Loader,
    FormWrapper,
    ContentLoader,
    BaseInput,
} from "components";
import { get } from "lodash";
import { createSelector } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import {
    cancelRegionUpdates,
    editCountryData,
    editDistrictData,
    editRegionData,
    fetchAllServiceCountryEdit,
    setCountryData,
    setCurrentDistrictUpdates,
    setCurrentRegionUpdates,
    setDistrictInitialValues,
    setRegionInitialValues,
    cancelDistrictUpdates,
    addNewRegion,
    addNewDistrict,
} from "app/slices/serviceSlices/countryEditSlice/countryEditSlice";
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
import { ServiceApiService } from "services/apiServices";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

const EditCountriesContainer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentCountry = useSelector((store) =>
        get(store, "service.countryEdit.currentUpdates", [])
    );
    const isFetched = useSelector((store) =>
        get(store, "service.countryEdit.data.isFetched", false)
    );

    const countryInitialInfo = useSelector(
        (store) => store.service.countries.countryInitialInfo
    );
    const districtInitialInfo = useSelector(
        (store) => store.service.countries.districtInitial
    );
    useEffect(() => {
        dispatch(fetchAllServiceCountryEdit(id));
    }, [id]);

    const [loading, setLoading] = useState(false);

    const handleCountryNameChange = (val) => {
        dispatch(
            setCountryData({
                name: val,
                code: get(currentCountry, "code", ""),
                
            })
        );
        dispatch(
            editCountryData({
                name: val,
                code: get(currentCountry, "code", ""),
            })
        );
    };

    const handleCountryCodeChange = (val) => {
        dispatch(
            setCountryData({
                code: val,
                name: get(currentCountry, "name", ""),
            })
        );
        dispatch(
            editCountryData({
                code: val,
                name: get(currentCountry, "name", ""),
            })
        );
    };

    const countryDataToSubmit = useSelector((store) =>
        get(store, "service.countryEdit.singleCountryUpdates", "")
    );

    const submitCountryChanges = () => {
        try {
            setLoading(true);
            ServiceApiService.UpdateCountryData(id, {...countryDataToSubmit , isActive:true}).then(
                (res) => {
                    if (res && res.data && res.data.success) {
                        setLoading(false);
                        toast.success("Success");
                    } else if (res && res.data && !res.data.success) {
                        setLoading(false);
                        toast.success(res.data.message);
                    }
                }
            );
        } catch (e) {}
    };

    const [regionDataChanges, setRegionDataChanges] = useState({});
    useEffect(() => {
        dispatch(editRegionData(regionDataChanges));
        dispatch(setCurrentRegionUpdates());
    }, [regionDataChanges]);

    const createRegionDataToSubmit = createSelector(
        (store) => store.service.countryEdit.singleRegionUpdates,
        (singleRegionUpdates) => singleRegionUpdates
    );

    const regionDataToSubmit = useSelector(createRegionDataToSubmit);
    const submitRegionChanges = () => {
        try {
            setLoading(true);
            ServiceApiService.UpdateRegionData(
                get(regionDataToSubmit, "id", ""),
                {
                    name: get(regionDataToSubmit, "region", ""),
                    postalCode: get(regionDataToSubmit, "regionIndex", ""),
                    customsCode: get(regionDataToSubmit, "regionCode", ""),
                }
            ).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.success(res.data.message);
                }
            });
        } catch (e) {}
    };

    const [districtDataChanges, setDistrictDataChanges] = useState({});
    useEffect(() => {
        dispatch(editDistrictData(districtDataChanges));
        dispatch(setCurrentDistrictUpdates());
    }, [districtDataChanges]);

    const districtDataToSubmit = useSelector(
        (store) => store.service.countryEdit.singleDistrictUpdates
    );
    const submitDistrictChanges = () => {
        try {
            setLoading(true);
            ServiceApiService.UpdateDistrictData(
                get(districtDataToSubmit, "districtId", ""),
                {
                    name: get(districtDataToSubmit, "district", ""),
                    customsCode: get(districtDataToSubmit, "districtCode", ""),
                }
            ).then((res) => {
                if (res && res.data && res.data.success) {
                    setLoading(false);
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    setLoading(false);
                    toast.success(res.data.message);
                }
            });
        } catch (e) {}
    };

    const handleAddRegion = () => {
        try {
            ServiceApiService.EditNewRegion(id, {
                name: get(countryInitialInfo, "region", ""),
                postalCode: get(countryInitialInfo, "regionIndex", ""),
                customsCode: get(countryInitialInfo, "regionCode", ""),
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    dispatch(addNewRegion(res.data.data));
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const removeNewRegion = (regId) => {
        try {
            ServiceApiService.RemoveNewRegion(regId).then((res) => {
                if (res && res.data && res.data.success) {
                    dispatch(fetchAllServiceCountryEdit(id));
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleAddRegionDistrict = (regId) => {
        try {
            ServiceApiService.EditNewDistrict(regId, {
                name: get(districtInitialInfo, "district", ""),
                customsCode: get(districtInitialInfo, "districtCode", ""),
            }).then((res) => {
                if (res && res.data && res.data.success) {
                    dispatch(
                        addNewDistrict({ district: res.data.data, id: regId })
                    );
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const removeNewDistrict = (disId) => {
        try {
            ServiceApiService.RemoveNewDistrict(disId).then((res) => {
                if (res && res.data && res.data.success) {
                    dispatch(fetchAllServiceCountryEdit(id));
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

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
                                name: "Просмотр",
                                url: "/service/countries/edit/",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        {isFetched ? (
                            <FormWrapper>
                                <Row>
                                    <Col xs={12}>
                                        <Row
                                            justify={"center"}
                                            align={"center"}
                                        >
                                            <Col xs={2}>
                                                <Text>Наименование</Text>
                                            </Col>
                                            <Col xs={3}>
                                                <BaseInput
                                                    type={"text"}
                                                    value={get(
                                                        currentCountry,
                                                        "name",
                                                        ""
                                                    )}
                                                    handleInput={(val) =>
                                                        handleCountryNameChange(
                                                            val
                                                        )
                                                    }
                                                    width={"230px"}
                                                />
                                            </Col>
                                            <Col xs={2}>
                                                <Text>Код страны</Text>
                                            </Col>
                                            <Col xs={3}>
                                                <BaseInput
                                                    type={"text"}
                                                    value={get(
                                                        currentCountry,
                                                        "code",
                                                        ""
                                                    )}
                                                    handleInput={(val) =>
                                                        handleCountryCodeChange(
                                                            val
                                                        )
                                                    }
                                                    width={"230px"}
                                                />
                                            </Col>
                                            <Col
                                                xs={2}
                                                align={"end"}
                                                justify={"end"}
                                            >
                                                <BaseButton
                                                    primary
                                                    handleClick={
                                                        submitCountryChanges
                                                    }
                                                >
                                                    Сохранить
                                                </BaseButton>
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
                                        {get(currentCountry, "regions", []).map(
                                            (country, index) => (
                                                <Collapse
                                                    editable
                                                    key={index + 1}
                                                    id={get(country, "id", "")}
                                                    dispatchEditDefaultData={() => {
                                                        dispatch(
                                                            editRegionData({
                                                                id: get(
                                                                    country,
                                                                    "id",
                                                                    ""
                                                                ),
                                                                region: get(
                                                                    country,
                                                                    "name",
                                                                    ""
                                                                ),
                                                                regionIndex:
                                                                    get(
                                                                        country,
                                                                        "postalCode",
                                                                        ""
                                                                    ),
                                                                regionCode: get(
                                                                    country,
                                                                    "customsCode",
                                                                    ""
                                                                ),
                                                            })
                                                        );
                                                        dispatch(
                                                            setRegionInitialValues(
                                                                get(
                                                                    country,
                                                                    "id",
                                                                    ""
                                                                )
                                                            )
                                                        );
                                                    }}
                                                    submitEditableForm={() =>
                                                        submitRegionChanges()
                                                    }
                                                    cancelEditableForm={() => {
                                                        dispatch(
                                                            cancelRegionUpdates()
                                                        );
                                                    }}
                                                    regionCode={get(
                                                        country,
                                                        "customsCode",
                                                        ""
                                                    )}
                                                    regionIndex={get(
                                                        country,
                                                        "postalCode",
                                                        ""
                                                    )}
                                                    region={get(
                                                        country,
                                                        "name",
                                                        ""
                                                    )}
                                                    setEditCountryData={
                                                        setRegionDataChanges
                                                    }
                                                    dispatchRemove={() =>
                                                        removeNewRegion(
                                                            get(
                                                                country,
                                                                "id",
                                                                ""
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
                                                    handleChangeDistrictCode={(
                                                        e
                                                    ) =>
                                                        dispatch(
                                                            handleChangeDistrictCode(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    dispatchDistrict={() => {
                                                        handleAddRegionDistrict(
                                                            get(
                                                                country,
                                                                "id",
                                                                ""
                                                            )
                                                        );
                                                        dispatch(
                                                            handleClearInitialDistrict()
                                                        );
                                                    }}
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
                                                    className={"mt-8"}
                                                >
                                                    {!isEmpty(
                                                        get(
                                                            country,
                                                            "district",
                                                            []
                                                        )
                                                    ) &&
                                                        get(
                                                            country,
                                                            "district",
                                                            []
                                                        ).map(
                                                            (
                                                                district,
                                                                index
                                                            ) => (
                                                                <SubInfoBox
                                                                    editable
                                                                    key={
                                                                        index +
                                                                        1
                                                                    }
                                                                    districtId={get(
                                                                        district,
                                                                        "id",
                                                                        ""
                                                                    )}
                                                                    regionId={get(
                                                                        country,
                                                                        "id",
                                                                        ""
                                                                    )}
                                                                    district={get(
                                                                        district,
                                                                        "name",
                                                                        ""
                                                                    )}
                                                                    districtCode={get(
                                                                        district,
                                                                        "customsCode",
                                                                        ""
                                                                    )}
                                                                    setEditDistrictData={
                                                                        setDistrictDataChanges
                                                                    }
                                                                    dispatchEditDefaultData={() => {
                                                                        dispatch(
                                                                            editDistrictData(
                                                                                {
                                                                                    districtId:
                                                                                        get(
                                                                                            district,
                                                                                            "id",
                                                                                            ""
                                                                                        ),
                                                                                    regionId:
                                                                                        get(
                                                                                            country,
                                                                                            "id",
                                                                                            ""
                                                                                        ),
                                                                                    district:
                                                                                        get(
                                                                                            district,
                                                                                            "name",
                                                                                            ""
                                                                                        ),
                                                                                    districtCode:
                                                                                        get(
                                                                                            district,
                                                                                            "customsCode",
                                                                                            ""
                                                                                        ),
                                                                                }
                                                                            )
                                                                        );
                                                                        dispatch(
                                                                            setDistrictInitialValues(
                                                                                {
                                                                                    districtId:
                                                                                        get(
                                                                                            district,
                                                                                            "id",
                                                                                            ""
                                                                                        ),
                                                                                    regionId:
                                                                                        get(
                                                                                            country,
                                                                                            "id",
                                                                                            ""
                                                                                        ),
                                                                                }
                                                                            )
                                                                        );
                                                                    }}
                                                                    submitEditableForm={() =>
                                                                        submitDistrictChanges()
                                                                    }
                                                                    cancelEditableForm={() => {
                                                                        dispatch(
                                                                            cancelDistrictUpdates()
                                                                        );
                                                                    }}
                                                                    dispatchRemoveItem={() =>
                                                                        removeNewDistrict(
                                                                            get(
                                                                                district,
                                                                                "id",
                                                                                ""
                                                                            )
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                </Collapse>
                                            )
                                        )}
                                    </Col>
                                    <Col xs={12}>
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
                                                    handleChangeCode(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                            dispatchRegionInfo={() => {
                                                handleAddRegion();
                                                dispatch(
                                                    handleClearInitialInfo()
                                                );
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </FormWrapper>
                        ) : (
                            <ContentLoader />
                        )}
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

export default EditCountriesContainer;
