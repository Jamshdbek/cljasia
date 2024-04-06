import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, unionBy } from "lodash";
import moment from "moment";
import HomeApiService from "services/apiServices/home";

let absentData = [];

for (let i = 1; i <= 12; i++) {
    const date = moment().subtract(i, "month");
    absentData.push({
        month: `${date.month() + 1}`,
        price: "0",
        year: `${date.year()}`,
    });
}

const initialState = {
    data: {
        loading: false,
        monthlyStatistics: [],
        error: "",
    },
    absentData,
};

export const fetchMonthlyStatistics = createAsyncThunk(
    "monthlyStatistics/fetchMonthlyStatistics",
    async () => {
        const request = await HomeApiService.GetHomeMonthlyStatistics();
        const respond = await request.data;
        return respond;
    }
);

const monthlyStatisticsSlice = createSlice({
    name: "monthlyStatistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMonthlyStatistics.pending, (state) => {
            state.data = {
                loading: true,
                monthlyStatistics: [],
                error: "",
            };
        });
        builder.addCase(fetchMonthlyStatistics.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                monthlyStatistics: {
                    ...actions.payload,
                    data: unionBy(
                        [
                            ...actions.payload.data.reverse(),
                            ...state.absentData,
                        ],
                        "month"
                    ).reverse(),
                },
                error: "",
            };
        });
        builder.addCase(fetchMonthlyStatistics.rejected, (state, actions) => {
            state.data = {
                loading: false,
                monthlyStatistics: [],
                error: actions.error.message,
            };
        });
    },
});

export default monthlyStatisticsSlice.reducer;
