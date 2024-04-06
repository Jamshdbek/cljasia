import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HomeApiService from "services/apiServices/home";

const initialState = {
    data: { loading: false, filterStatistics: [], error: "" },
};

export const fetchFilterStatistics = createAsyncThunk(
    "filterStatistics/fetchFilterStatistics",
    async (params) => {
        const request = await HomeApiService.GetHomeFilterStatistics(params);
        const respond = await request.data;
        return respond;
    }
);

const filterStatisticsSlice = createSlice({
    name: "filterStatistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilterStatistics.pending, (state) => {
            state.data = {
                loading: true,
                filterStatistics: [],
                error: "",
            };
        });
        builder.addCase(fetchFilterStatistics.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                filterStatistics: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchFilterStatistics.rejected, (state, actions) => {
            state.data = {
                loading: false,
                filterStatistics: [],
                error: actions.error.message,
            };
        });
    },
});

export default filterStatisticsSlice.reducer;
