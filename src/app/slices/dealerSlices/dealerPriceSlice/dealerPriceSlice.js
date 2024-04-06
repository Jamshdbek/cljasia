import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DealerApiService } from "services/apiServices";

const initialState = {
    loading: false,
    token: {},
    error: "",
};

export const fetchAllPriceData = createAsyncThunk(
    "dealerPrice/fetchAllPriceData",
    async () => {
        const request = await DealerApiService.GetAllData();
        const data = await request.data;
        return request.data;
    }
);

const dealerPriceSlice = createSlice({
    name: "dealerPrice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPriceData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllPriceData.fulfilled, (state, actions) => {
            state.loading = false;
            state.token = actions.payload;
            state.error = "";
        });
        builder.addCase(fetchAllPriceData.rejected, (state, actions) => {
            state.loading = false;
            state.token = {};
            state.error = actions.error.message;
        });
    },
});

export default dealerPriceSlice.reducer;
