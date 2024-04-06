import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, servicePrices: [], error: "" },
};

export const fetchAllServicePricesDetail = createAsyncThunk(
    "priceDetail/fetchAllServicePricesDetail",
    async (params) => {
        console.log(params)
        const request = await ServiceApiService.DetailPriceInfo(params);
        const respond = await request.data;
        return respond;
    }
);

const priceDetail = createSlice({
    name: "priceDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServicePricesDetail.pending, (state) => {
            state.data = {
                loading: true,
                servicePrices: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServicePricesDetail.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                servicePrices: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServicePricesDetail.rejected, (state, actions) => {
            state.data = {
                loading: false,
                servicePrices: [],
                error: actions.error.message,
            };
        });
    },
});

export default priceDetail.reducer;
