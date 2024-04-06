import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DealerApiService } from "services/apiServices";

const initialState = {
    loading: false,
    boxPrices: [],
    error: "",
};

export const fetchBoxOrderPriceData = createAsyncThunk(
    "dealerBoxOrder/fetchBoxOrderPriceData",
    async () => {
        const request = await DealerApiService.GetBoxPrice();
        const respond = await request.data;
        return respond.data;
    }
);

const orderBoxPrice = createSlice({
    name: "dealerBoxOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBoxOrderPriceData.pending, (state, actions) => {
            state.loading = true;
        });
        builder.addCase(fetchBoxOrderPriceData.fulfilled, (state, actions) => {
            state.boxPrices = actions.payload;
            state.error = "";
        });
        builder.addCase(fetchBoxOrderPriceData.rejected, (state, actions) => {
            state.loading = false;
            state.boxPrices = [];
            state.error = actions.error.message;
        });
    },
});

export default orderBoxPrice.reducer;
