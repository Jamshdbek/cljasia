import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, serviceAllCountries: [], error: "" },
};

export const fetchAllServiceAllCountries = createAsyncThunk(
    "addServiceCountries/fetchAllServiceCountries",
    async () => {
        const request = await ServiceApiService.GetAllServiceAllCountries();
        const respond = await request.data;
        return respond;
    }
);

const allCountriesSlice = createSlice({
    name: "serviceAllCountries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServiceAllCountries.pending, (state) => {
            state.data = {
                loading: true,
                serviceAllCountries: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServiceAllCountries.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                serviceAllCountries: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServiceAllCountries.rejected, (state, actions) => {
            state.data = {
                loading: false,
                serviceAllCountries: [],
                error: actions.error.message,
            };
        });
    },
});

export default allCountriesSlice.reducer;
