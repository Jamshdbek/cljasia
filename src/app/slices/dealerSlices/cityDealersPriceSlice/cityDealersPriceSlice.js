import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DealerApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, cityDealersPrices: [], error: "" },
};

export const fetchCityDealersPrices = createAsyncThunk(
    "addCityDealersPrices/fetchCityDealersPrices",
    async (id) => {
        const request = await DealerApiService.GetCityDealersPrices(id);
        const respond = await request.data;
        return respond;
    }
);

const cityDealersPriceSlice = createSlice({
    name: "cityDealersPrices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCityDealersPrices.pending, (state) => {
            state.data = {
                loading: true,
                cityDealersPrices: [],
                error: "",
            };
        });
        builder.addCase(fetchCityDealersPrices.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                cityDealersPrices: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchCityDealersPrices.rejected, (state, actions) => {
            state.data = {
                loading: false,
                cityDealersPrices: [],
                error: actions.error.message,
            };
        });
    },
});

export default cityDealersPriceSlice.reducer;
