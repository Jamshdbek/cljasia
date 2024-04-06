import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyuhlApiService from "services/apiServices/myuhl";

const initialState = {
    data: { loading: false, singlePostLogs: [], error: "" },
};

export const fetchSinglePostLogs = createAsyncThunk(
    "singlePostLogs/fetchAllInspections",
    async (params) => {
        const request = await MyuhlApiService.GetSinglePostLogs(params);
        const respond = await request.data;
        return respond;
    }
);

const singlePostLogsSlice = createSlice({
    name: "singlePostLogsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSinglePostLogs.pending, (state) => {
            state.data = {
                loading: true,
                singlePostLogs: [],
                error: "",
            };
        });
        builder.addCase(fetchSinglePostLogs.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                singlePostLogs: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchSinglePostLogs.rejected, (state, actions) => {
            state.data = {
                loading: false,
                singlePostLogs: [],
                error: actions.error.message,
            };
        });
    },
});

export default singlePostLogsSlice.reducer;
