import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DealerApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, dataCityDealersPrices: [], error: "" },
};

export const fetchDataCityDealersPrices = createAsyncThunk(
    "DataCityDealersPrices/fetchDataCityDealersPrices",
    async (param) => {
        const request = await DealerApiService.GetDataCityDealersPrices(param);
        const respond = await request.data;
        return respond;
    }
);

const DataCityDealersPriceSlice = createSlice({
    name: "dataCityDealersPrices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataCityDealersPrices.pending, (state) => {
            state.data = {
                loading: true,
                dataCityDealersPrices: [],
                error: "",
            };
        });
        builder.addCase(fetchDataCityDealersPrices.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                dataCityDealersPrices: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchDataCityDealersPrices.rejected, (state, actions) => {
            state.data = {
                loading: false,
                dataCityDealersPrices: [],
                error: actions.error.message,
            };
        });
    },
});

export default DataCityDealersPriceSlice.reducer;
