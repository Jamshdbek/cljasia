import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, isEmpty } from "lodash";
import { ServiceApiService } from "services/apiServices";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    data: {
        loading: false,
        currentCountryData: [],
        error: "",
        isFetched: false,
    },
    singleCountryUpdates: {
        name: "",
        code: "",
        isActive: true,
    },
    regionInitialValues: {},
    singleRegionUpdates: {
        id: "",
        region: "",
        regionIndex: "",
        regionCode: "",
    },
    districtInitialValues: {},
    singleDistrictUpdates: {
        district: "",
        districtCode: "",
        districtId: "",
        regionId: "",
    },
    currentUpdates: [],
    newRegions: [],
};

export const fetchAllServiceCountryEdit = createAsyncThunk(
    "allServiceCountryEdit/fetchAllServiceCountryEdit",
    async (param) => {
        const request = await ServiceApiService.GetAllServiceCountryEdit(param);
        const respond = await request.data;
        return respond;
    }
);

const countryEditSlice = createSlice({
    name: "allServiceCountryEdit",
    initialState,
    reducers: {
        editCountryData: (state, actions) => {
            state.singleCountryUpdates = actions.payload;
        },
        editRegionData: (state, actions) => {
            state.singleRegionUpdates = actions.payload;
        },
        editDistrictData: (state, actions) => {
            state.singleDistrictUpdates = actions.payload;
        },
        handleAddCountry: (state, actions) => {
            state.countries = [
                ...state.countries,
                { ...actions.payload, id: uuidv4() },
            ];
        },
        setCountryData: (state, actions) => {
            state.currentUpdates = {
                ...get(state, "currentUpdates", []),
                name: get(actions, "payload.name", ""),
                code: get(actions, "payload.code", ""),
                isActive: true,
            };
        },
        setCurrentRegionUpdates: (state) => {
            state.currentUpdates = {
                ...state.currentUpdates,
                regions: get(state, "currentUpdates.regions", []).map(
                    (region) =>
                        region.id === state.singleRegionUpdates.id
                            ? {
                                  ...region,
                                  name: get(
                                      state,
                                      "singleRegionUpdates.region",
                                      ""
                                  ),
                                  postalCode: get(
                                      state,
                                      "singleRegionUpdates.regionIndex",
                                      ""
                                  ),
                                  customsCode: get(
                                      state,
                                      "singleRegionUpdates.regionCode",
                                      ""
                                  ),
                              }
                            : region
                ),
            };
        },
        setCurrentDistrictUpdates: (state) => {
            state.currentUpdates = {
                ...state.currentUpdates,
                regions: get(state, "currentUpdates.regions", []).map(
                    (region) =>
                        region.id === state.singleDistrictUpdates.regionId
                            ? {
                                  ...region,
                                  district: get(region, "district", []).map(
                                      (district) =>
                                          district.id ===
                                          state.singleDistrictUpdates.districtId
                                              ? {
                                                    ...district,
                                                    name: get(
                                                        state,
                                                        "singleDistrictUpdates.district",
                                                        ""
                                                    ),
                                                    customsCode: get(
                                                        state,
                                                        "singleDistrictUpdates.districtCode",
                                                        ""
                                                    ),
                                                }
                                              : district
                                  ),
                              }
                            : region
                ),
            };
        },
        setRegionInitialValues: (state, actions) => {
            state.regionInitialValues = get(
                state,
                "data.currentCountryData.regions",
                []
            ).find((item) => item.id === actions.payload);
        },
        cancelRegionUpdates: (state) => {
            state.currentUpdates = {
                ...state.currentUpdates,
                regions: state.currentUpdates.regions.map((region) =>
                    region.id === state.regionInitialValues.id
                        ? {
                              ...region,
                              name: state.regionInitialValues.name,
                              postalCode: state.regionInitialValues.postalCode,
                              customsCode:
                                  state.regionInitialValues.customsCode,
                          }
                        : region
                ),
            };
        },
        setDistrictInitialValues: (state, actions) => {
            state.districtInitialValues = get(
                state,
                "data.currentCountryData.regions",
                []
            )
                .find((region) => region.id === actions.payload.regionId)
                .district.find(
                    (district) => district.id === actions.payload.districtId
                );
        },
        cancelDistrictUpdates: (state) => {
            state.currentUpdates = {
                ...state.currentUpdates,
                regions: state.currentUpdates.regions.map((region) => ({
                    ...region,
                    district: get(region, "district", []).map((district) =>
                        district.id === state.districtInitialValues.id
                            ? {
                                  ...district,
                                  name: state.districtInitialValues.name,
                                  customsCode:
                                      state.districtInitialValues.customsCode,
                              }
                            : district
                    ),
                })),
            };
            state.singleDistrictUpdates = {
                ...state.singleDistrictUpdates,
                district: state.districtInitialValues.name,
                districtCode: state.districtInitialValues.customsCode,
            };
        },
        addNewRegion: (state, actions) => {
            state.currentUpdates = {
                ...state.currentUpdates,
                regions: [...state.currentUpdates.regions, actions.payload],
            };
        },
        addNewDistrict: (state, actions) => {
            state.currentUpdates = {
                ...state.currentUpdates,
                regions: state.currentUpdates.regions.map((region) =>
                    region.id === actions.payload.id
                        ? {
                              ...region,
                              district: isEmpty(region.district)
                                  ? [actions.payload.district]
                                  : [
                                        ...region.district,
                                        actions.payload.district,
                                    ],
                          }
                        : region
                ),
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllServiceCountryEdit.pending, (state) => {
            state.data = {
                loading: true,
                currentCountryData: [],
                error: "",
            };
        });
        builder.addCase(
            fetchAllServiceCountryEdit.fulfilled,
            (state, actions) => {
                state.data = {
                    loading: false,
                    currentCountryData: get(actions, "payload.data", {}),
                    error: "",
                    isFetched: get(actions, "payload.success", ""),
                };
                state.currentUpdates = get(actions, "payload.data", {});
                state.singleCountryUpdates = {
                    name: get(actions, "payload.data.name"),
                    code: get(actions, "payload.data.code"),
                    isActive: true,
                };
            }
        );
        builder.addCase(
            fetchAllServiceCountryEdit.rejected,
            (state, actions) => {
                state.data = {
                    loading: false,
                    currentCountryData: [],
                    error: actions.error.message,
                    isFetched: get(actions, "payload.success", ""),
                };
            }
        );
    },
});
export const {
    editCountryData,
    editRegionData,
    editDistrictData,
    setCurrentRegionUpdates,
    setCurrentDistrictUpdates,
    setCountryData,
    setRegionInitialValues,
    cancelRegionUpdates,
    setDistrictInitialValues,
    cancelDistrictUpdates,
    addNewRegion,
    addNewDistrict,
} = countryEditSlice.actions;
export default countryEditSlice.reducer;
