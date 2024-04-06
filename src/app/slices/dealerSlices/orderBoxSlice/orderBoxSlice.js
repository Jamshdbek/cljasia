import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DealerApiService } from "services/apiServices";

const initialState = {
    data: { loading: false,
    dataBox: [],
    error: "",
        pagination: {}
    },
     filter: {
        page: 0,
        size: 10,
    },

};

export const fetchBoxOrderData = createAsyncThunk(
    "dealerBoxOrder/fetchBoxOrderData",
    async (params) => {
        const request = await DealerApiService.GetBoxOrder(params);
        const respond = await request.data;
        return respond.data;
    }
);

const orderBoxSlice = createSlice({
    name: "dealerBoxOrder",
    initialState,
    reducers: {
        setFilter: (state, actions) => {
            state.filter = {
                ...state.filter,
                [actions.payload.name]: actions.payload.value,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBoxOrderData.pending, (state) => {
            state.loading = true;

        });
        builder.addCase(fetchBoxOrderData.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                dataBox: actions.payload,
                error: "",
                pagination: actions.payload.data.paginationData,
            };
            state.filter = {
                ...state.filter,
                page: actions.payload.paginationData.currentPageNumber+1,
                size: actions.payload.paginationData.pageSize,
            };

        });
        builder.addCase(fetchBoxOrderData.rejected, (state, actions) => {
            state.loading = false;
            state.data = {};
            state.error = actions.error.message;
        });
    },
});
export const { setFilter} =
    orderBoxSlice.actions;
export default orderBoxSlice.reducer;
