import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyuhlApiService from "services/apiServices/myuhl";

const initialState = {
    data: { loading: false, courierCompanies: [], error: "" },
};

export const fetchCourierCompanies = createAsyncThunk(
    "courierCompanies/fetchCourierCompanies",
    async (params) => {
        const request = await MyuhlApiService.GetCourierCompanies(params);
        const respond = await request.data;
        return respond;
    }
);

const manifestCourierCompaniesSlice = createSlice({
    name: "courierCompanies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCourierCompanies.pending, (state) => {
            state.data = {
                loading: true,
                courierCompanies: [],
                error: "",
            };
        });
        builder.addCase(fetchCourierCompanies.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                courierCompanies: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchCourierCompanies.rejected, (state, actions) => {
            state.data = {
                loading: false,
                courierCompanies: [],
                error: actions.error.message,
            };
        });
    },
});

export default manifestCourierCompaniesSlice.reducer;
