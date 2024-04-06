import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommonService } from "services/apiServices";

const initialState = {
    data: { loading: false, accountTypes: [], error: "" },
};

export const fetchAccountTypes = createAsyncThunk(
    "accountTypes/fetchAccountTypes",
    async () => {
        const request = await CommonService.GetAccountTypes();
        const respond = await request.data;
        return respond;
    }
);

const accountTypesSlice = createSlice({
    name: "accountTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAccountTypes.pending, (state) => {
            state.data = {
                loading: true,
                accountTypes: [],
                error: "",
            };
        });
        builder.addCase(fetchAccountTypes.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                accountTypes: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAccountTypes.rejected, (state, actions) => {
            state.data = {
                loading: false,
                accountTypes: [],
                error: actions.error.message,
            };
        });
    },
});

export default accountTypesSlice.reducer;
