import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { get } from "lodash";

const initialState = {
    countryName: "",
    countryCode: "",

    countries: [],
    countryInitialInfo: {
        region: "",
        regionIndex: "",
        regionCode: "",
    },
    districtInitial: {
        district: "",
        districtCode: "",
    },
};

const addCountriesSlice = createSlice({
    name: "service/addCountries",
    initialState,
    reducers: {
        handleChangeCountryName: (state, actions) => {
            state.countryName = {
                ...state.countryName,
                countryName: actions.payload,
            };
        },
        handleChangeCountryCode: (state, actions) => {
            state.countryCode = {
                ...state.countryCode,
                countryCode: actions.payload,
            };
        },

        handleChangeRegion: (state, actions) => {
            state.countryInitialInfo = {
                ...state.countryInitialInfo,
                region: actions.payload,
            };
        },
        handleChangeIndex: (state, actions) => {
            state.countryInitialInfo = {
                ...state.countryInitialInfo,
                regionIndex: actions.payload,
            };
        },
        handleChangeCode: (state, actions) => {
            state.countryInitialInfo = {
                ...state.countryInitialInfo,
                regionCode: actions.payload,
            };
        },
        handleClearInitialInfo: (state) => {
            state.countryInitialInfo = {
                region: "",
                regionIndex: "",
                regionCode: "",
            };
        },
        handleAddCountry: (state, actions) => {
            state.countries = [
                ...state.countries,
                { ...actions.payload, id: uuidv4() },
            ];
        },
        handleDeleteCountry: (state, actions) => {
            state.countries = state.countries.filter(
                (item) => item.id !== actions.payload
            );
        },
        handleChangeDistrict: (state, actions) => {
            state.districtInitial = {
                ...state.districtInitial,
                district: actions.payload,
            };
        },
        handleChangeDistrictCode: (state, actions) => {
            state.districtInitial = {
                ...state.districtInitial,
                districtCode: actions.payload,
            };
        },
        handleClearInitialDistrict: (state) => {
            state.districtInitial = {
                district: "",
                districtCode: "",
            };
        },
        handleAddDistrict: (state, actions) => {
            state.countries = state.countries.map((country) =>
                get(country, "id", "") === get(actions, "payload.id", null)
                    ? {
                          ...country,
                          districts: [
                              ...get(country, "districts", []),
                              { ...actions.payload, id: uuidv4() },
                          ],
                      }
                    : country
            );
        },
        handleDeleteDistrict: (state, actions) => {
            state.countries = state.countries.map((country) => ({
                ...country,
                districts: get(country, "districts", []).filter(
                    (item) => item.id !== actions.payload
                ),
            }));
        },
        handleEditCountry: (state, actions) => {
            state.countries = state.countries.map((item) =>
                item.id === actions.payload.id
                    ? {
                          ...item,
                          region: actions.payload.region,
                          regionIndex: actions.payload.regionIndex,
                          regionCode: actions.payload.regionCode,
                      }
                    : item
            );
        },

        handleEditDistrict: (state, actions) => {
            state.countries = get(state, "countries", []).map((country) =>
                country.id === actions.payload.regionId
                    ? {
                          ...country,
                          districts: get(country, "districts", []).map(
                              (district) =>
                                  district.id === actions.payload.districtId
                                      ? {
                                            ...district,
                                            district: actions.payload.district,
                                            districtCode:
                                                actions.payload.districtCode,
                                        }
                                      : district
                          ),
                      }
                    : country
            );
        },
        clearCountries: (state) => {
            state.countries = [];
        },
    },
});

export const {
    handleChangeCountryName,
    handleChangeCountryCode,
    handleChangeRegion,
    handleChangeIndex,
    handleChangeCode,
    handleClearInitialInfo,
    handleAddCountry,
    handleDeleteCountry,
    handleChangeDistrict,
    handleChangeDistrictCode,
    handleClearInitialDistrict,
    handleAddDistrict,
    handleDeleteDistrict,
    handleEditCountry,
    handleEditDistrict,
    clearCountries,
} = addCountriesSlice.actions;
export default addCountriesSlice.reducer;
