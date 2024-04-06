import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ManagementApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, managementOperators: [], error: "" },
};

export const fetchAllManagementOperators = createAsyncThunk(
    "managementOperators/fetchAllManagementOperators",
    async (params) => {
        const request = await ManagementApiService.GetAllManagementOperators(params);
        const respond = await request.data;
        return respond;
    },
 
);
export const fetchAllManagementOperatorsType = createAsyncThunk(
    "managementOperators/fetchAllManagementOperators",
    async (id) => {
        const request = await ManagementApiService.GetAllManagementOperatorsType(id);
        const respond = await request.data;
        return respond;
    },

);

const operatorSlice = createSlice({
    name: "allManagementOperators",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllManagementOperators.pending, (state) => {
            state.data = {
                loading: true,
                managementOperators: [],
                error: "",
            };
        });
        builder.addCase(fetchAllManagementOperators.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                managementOperators: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllManagementOperators.rejected, (state, actions) => {
            state.data = {
                loading: false,
                managementOperators: [],
                error: actions.error.message,
            };
        });
    },
});

export default operatorSlice.reducer;
