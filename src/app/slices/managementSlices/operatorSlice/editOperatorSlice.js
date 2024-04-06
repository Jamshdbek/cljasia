import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ManagementApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, managementOperator: [], error: "" },
};

export const fetchManagementOperator = createAsyncThunk(
    "managementOperator/fetchManagementOperator",
    async (params) => {
        console.log(params, "Params")
        const request = await ManagementApiService.GetManagementOperator(params);
        const respond = await request.data;
        return respond;
    },

);

const editOperatorSlice = createSlice({
    name: "ManagementOperator",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchManagementOperator.pending, (state) => {
            state.data = {
                loading: true,
                managementOperator: [],
                error: "",
            };
        });
        builder.addCase(fetchManagementOperator.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                managementOperator: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchManagementOperator.rejected, (state, actions) => {
            state.data = {
                loading: false,
                managementOperator: [],
                error: actions.error.message,
            };
        });
    },
});

export default editOperatorSlice.reducer;
