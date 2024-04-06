import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, serviceLimits: [], error: "" },
};

export const fetchAllServiceLimits = createAsyncThunk(
    "addServiceLimit/fetchAllServiceLimits",
    async (params) => {
        const request = await ServiceApiService.GetAllServiceLimit(params);
        const respond = await request.data;
        return respond;
    }
);

const limitsSlice = createSlice({
    name: "allServiceLimit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServiceLimits.pending, (state) => {
            state.data = {
                loading: true,
                serviceLimits: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServiceLimits.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                serviceLimits: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServiceLimits.rejected, (state, actions) => {
            state.data = {
                loading: false,
                serviceLimits: [],
                error: actions.error.message,
            };
        });
    },
});

export default limitsSlice.reducer;
