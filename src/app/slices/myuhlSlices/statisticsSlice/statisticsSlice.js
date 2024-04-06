import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, includes } from "lodash";
import MyuhlApiService from "services/apiServices/myuhl";

const initialState = {
    isFetched: false,
    data: [],
    error: "",
};

export const fetchStatisticsData = createAsyncThunk(
    "statisticsSlice/fetchStatisticsData",
    async (params) => {
        const { from, to, manifestId, countryId } = params;
        const request = includes(Object.keys(params), "from")
            ? await MyuhlApiService.GetStatisticsByDate({ from, to, countryId })
            : await MyuhlApiService.GetStatisticsByManifest({
                  manifestId,
                  countryId,
              });
        const respond = await request.data;
        return respond;
    }
);

const statisticsSlice = createSlice({
    name: "statisticsSlice",
    initialState,
    reducers: {
        handleResetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStatisticsData.pending, (state) => {
            state.isFetched = false;
        });
        builder.addCase(fetchStatisticsData.fulfilled, (state, actions) => {
            state.isFetched = true;
            state.data = {
                ...actions.payload.data,
                manifestPostStatistics:
                    actions.payload.data.manifestPostStatistics.map((item) => ({
                        ...item,
                        cbm: get(item, "cbm", "").toFixed(6),
                    })),
            };
            state.error = "";
        });
        builder.addCase(fetchStatisticsData.rejected, (state, actions) => {
            state.isFetched = true;
            state.data = [];
            state.error = actions.error.message;
        });
    },
});

export const { handleResetState } = statisticsSlice.actions;
export default statisticsSlice.reducer;
