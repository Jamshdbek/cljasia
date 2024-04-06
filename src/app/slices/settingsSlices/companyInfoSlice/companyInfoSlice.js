import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SettingsApiService from "services/apiServices/settings";

const initialState = {
    data: { loading: false, companyInfo: [], error: "" },
};

export const fetchCompanyInfo = createAsyncThunk(
    "companyInfo/fetchCompanyInfo",
    async () => {
        const request = await SettingsApiService.GetCompanyInfo();
        const respond = await request.data;
        return respond;
    }
);

const companyInfoSlice = createSlice({
    name: "companyInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCompanyInfo.pending, (state) => {
            state.data = {
                loading: true,
                companyInfo: [],
                error: "",
            };
        });
        builder.addCase(fetchCompanyInfo.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                companyInfo: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchCompanyInfo.rejected, (state, actions) => {
            state.data = {
                loading: false,
                companyInfo: [],
                error: actions.error.message,
            };
        });
    },
});

export default companyInfoSlice.reducer;
