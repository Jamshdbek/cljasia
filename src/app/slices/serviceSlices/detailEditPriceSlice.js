import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "lodash";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: {
        loading: false,
        currentPrice: [],
        error: "",
        isFetched: false,
    },
};

export const fetchSinglePriceData = createAsyncThunk(
    "detailEditPrice/fetchSinglePriceData",
    async (id) => {
        const request = await ServiceApiService.DetailPriceInfo(id);
        const respond = await request.data;
        return respond;
    }
);

const detailEditPriceSlice = createSlice({
    name: "detailEditPrice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSinglePriceData.pending, (state) => {
            state.data = {
                loading: true,
                currentPrice: [],
                error: "",
            };
        });
        builder.addCase(fetchSinglePriceData.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                currentPrice: get(actions, "payload.data", {}),
                error: "",
                isFetched: get(actions, "payload.success", ""),
            };
        });
        builder.addCase(fetchSinglePriceData.rejected, (state, actions) => {
            state.data = {
                loading: false,
                currentPrice: [],
                error: actions.error.message,
                isFetched: get(actions, "payload.success", ""),
            };
        });
    },
});
export const {} = detailEditPriceSlice.actions;
export default detailEditPriceSlice.reducer;
