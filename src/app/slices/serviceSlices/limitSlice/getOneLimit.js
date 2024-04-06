import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, serviceLimit: [], error: "" },
};

export const fetchAllServiceLimit = createAsyncThunk(
    "addServiceLimit/fetchAllServiceLimit",
    async (params) => {
        const request = await ServiceApiService.GetOneServiceLimit(params);
        const respond = await request.data;
        return respond;
    }
);

const getOneLimit = createSlice({
    name: "allServiceLimit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServiceLimit.pending, (state) => {
            state.data = {
                loading: true,
                serviceLimit: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServiceLimit.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                serviceLimit: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServiceLimit.rejected, (state, actions) => {
            state.data = {
                loading: false,
                serviceLimit: [],
                error: actions.error.message,
            };
        });
    },
});

export default getOneLimit.reducer;
