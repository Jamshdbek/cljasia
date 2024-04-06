import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { flatten, get } from "lodash";
import CommonService from "services/apiServices/common";

const initialState = {
    loading: false,
    regions: [],
    error: "",
    isFetched: false,
    districts: [],
    regionPostalCode: "",
    districtCostumeCode: "",
};

export const fetchRegions = createAsyncThunk(
    "regions/fetchCountries",
    async (id) => {
        const request = await CommonService.AllRegions(id);
        const respond = await request.data;
        return respond;
    }
);

const countriesSlice = createSlice({
    name: "regions",
    initialState,
    reducers: {
        getDistricts: (state, actions) => {
            state.districts = flatten(
                get(state, "regions.regions", [])
                    .map(
                        (region) =>
                            region.id === actions.payload && region.district
                    )
                    .filter((item) => item)
            );
            state.regionPostalCode = get(state, "regions.regions", []).find(
                (region) => region.id === actions.payload
            );
        },
        getDistrictCostumeCode: (state, actions) => {
            state.districtCostumeCode = state.districts.find(
                (item) => item.id == actions.payload
            );
        },
        clearRegionsData: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRegions.fulfilled, (state, actions) => {
            state.loading = false;
            state.regions = actions.payload.data;
            state.isFetched = actions.payload.success;
            state.error = "";
        });
        builder.addCase(fetchRegions.rejected, (state, actions) => {
            state.loading = false;
            state.regions = [];
            state.isFetched = actions.payload.success;
            state.error = actions.error.message;
        });
    },
});

export const { getDistricts, getDistrictCostumeCode, clearRegionsData } =
    countriesSlice.actions;
export default countriesSlice.reducer;
