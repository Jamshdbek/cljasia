import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, servicePrices: [], error: "" },
};

export const fetchAllServicePrices = createAsyncThunk(
    "addServicePrices/fetchAllServicePrices",
    async () => {
        const request = await ServiceApiService.GetAllServicePrices();
        const respond = await request.data;
        console.log("respond",respond)
        return respond;
    }
);

const pricesSlice = createSlice({
    name: "allServicePrices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServicePrices.pending, (state) => {
            state.data = {
                loading: true,
                servicePrices: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServicePrices.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                servicePrices: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServicePrices.rejected, (state, actions) => {
            state.data = {
                loading: false,
                servicePrices: [],
                error: actions.error.message,
            };
        });
    },
});

export default pricesSlice.reducer;
