import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CommonService from "services/apiServices/common";
import { isEqual } from "lodash";

const initialState = {
    loading: false,
    countries: [],
    error: "",
    isFetched: false,
};

export const fetchCountries = createAsyncThunk(
    "countries/fetchCountries",
    async () => {
        const request = await CommonService.AllCountries();
        const respond = await request.data;
        return respond;
    }
);

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCountries.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCountries.fulfilled, (state, actions) => {
            state.loading = false;
            state.countries = actions.payload.data.sort((a, b) => {
                if (!isEqual(a.code, "UZ") || isEqual(b.code, "UZ")) {
                    return 1
                } else {
                    return -1
                }
            });
            state.isFetched = actions.payload.success;
            state.error = "";
        });
        builder.addCase(fetchCountries.rejected, (state, actions) => {
            state.loading = false;
            state.countries = [];
            state.isFetched = actions.payload.success;
            state.error = actions.error.message;
        });
    },
});

export default countriesSlice.reducer;
