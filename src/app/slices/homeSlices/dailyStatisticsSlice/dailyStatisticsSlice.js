import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HomeApiService from "services/apiServices/home";

const initialState = {
    data: { loading: false, dailyStatistics: [], error: "" },
};

export const fetchDailyStatistics = createAsyncThunk(
    "dailyStatistics/fetchDailyStatistics",
    async () => {
        const request = await HomeApiService.GetHomeDailyStatistics();
        const respond = await request.data;
        return respond;
    }
);

const dailyStatisticsSlice = createSlice({
    name: "dailyStatistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDailyStatistics.pending, (state) => {
            state.data = {
                loading: true,
                dailyStatistics: [],
                error: "",
            };
        });
        builder.addCase(fetchDailyStatistics.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                dailyStatistics: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchDailyStatistics.rejected, (state, actions) => {
            state.data = {
                loading: false,
                dailyStatistics: [],
                error: actions.error.message,
            };
        });
    },
});

export default dailyStatisticsSlice.reducer;
