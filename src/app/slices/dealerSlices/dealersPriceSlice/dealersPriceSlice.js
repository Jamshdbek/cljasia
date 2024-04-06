import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DealerApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, dealersPrices: [], error: "" },
};

export const fetchAllDealersPrices = createAsyncThunk(
    "allDealersPrcies/fetchAllDealersPrcies",
    async () => {
        const request = await DealerApiService.GetAllDealersPrices();
        const respond = await request.data;
        return respond;
    }
);

const dealersPriceSlice = createSlice({
    name: "allDealersPrcies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllDealersPrices.pending, (state) => {
            state.data = {
                loading: true,
                dealersPrices: [],
                error: "",
            };
        });
        builder.addCase(fetchAllDealersPrices.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                dealersPrices: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllDealersPrices.rejected, (state, actions) => {
            state.data = {
                loading: false,
                dealersPrices: [],
                error: actions.error.message,
            };
        });
    },
});

export default dealersPriceSlice.reducer;
