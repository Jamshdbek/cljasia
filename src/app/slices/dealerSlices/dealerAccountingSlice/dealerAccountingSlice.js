import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DealerApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, dealersAccounting: [], error: "" },
    filter:{
        dealerId: 0,
        year: '',
        month: '',
        date: ''
    }
};

export const fetchDealersAccounting = createAsyncThunk(
    "dealersAccounting/fetchDealersAccounting",
    async (params) => {
        const request = await DealerApiService.GetDealersAccounting(params);
        const respond = await request.data;
        return respond;
    }
);

const dealerAccountingSlice = createSlice({
    name: "cityDealersPrices",
    initialState,
    reducers: {
        handleChangeFilter: (state, actions) => {
            state.filter = {
                ...state.filter,
                [actions.payload.name]: actions.payload.value,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDealersAccounting.pending, (state) => {
            state.data = {
                loading: true,
                dealersAccounting: [],
                error: "",
            };
        });
        builder.addCase(fetchDealersAccounting.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                dealersAccounting: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchDealersAccounting.rejected, (state, actions) => {
            state.data = {
                loading: false,
                dealersAccounting: [],
                error: actions.error.message,
            };
        });
    },
});
export const { handleChangeFilter} =
dealerAccountingSlice.actions;
export default dealerAccountingSlice.reducer;
