import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommonService } from "services/apiServices";

const initialState = {
    data: { loading: false, toCountries: [], error: "" },
};

export const fetchToCountries = createAsyncThunk(
    "toCountries/fetchToCountries",
    async (id) => {
        const request = await CommonService.GetToCountries(id);
        const respond = await request.data;
        return respond;
    }
);


const toCountriesSlice = createSlice({
    name: "toCountries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToCountries.pending, (state) => {
            state.data = {
                loading: true,
                toCountries: [],
                error: "",
            };
        });
        builder.addCase(fetchToCountries.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                toCountries: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchToCountries.rejected, (state, actions) => {
            state.data = {
                loading: false,
                toCountries: [],
                error: actions.error.message,
            };
        });
    },
});

export default toCountriesSlice.reducer;
