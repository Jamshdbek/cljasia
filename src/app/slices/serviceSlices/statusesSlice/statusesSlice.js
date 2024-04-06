import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, serviceStatuses: [], error: "" },
};

export const fetchAllServiceStatuses = createAsyncThunk(
    "addServiceStatus/fetchAllServiceStatuses",
    async () => {
        const request = await ServiceApiService.GetAllServiceStatuses();
        const respond = await request.data;
        return respond;
    }
);

const statusesSlice = createSlice({
    name: "allServiceStatuses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServiceStatuses.pending, (state) => {
            state.data = {
                loading: true,
                serviceStatuses: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServiceStatuses.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                serviceStatuses: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServiceStatuses.rejected, (state, actions) => {
            state.data = {
                loading: false,
                serviceStatuses: [],
                error: actions.error.message,
            };
        });
    },
});

export default statusesSlice.reducer;
