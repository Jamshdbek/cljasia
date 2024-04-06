import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, serviceCategories: [], error: "" },
};

export const fetchAllServiceCategories = createAsyncThunk(
    "addServiceCategories/fetchAllServiceCategories",
    async () => {
        const request = await ServiceApiService.GetAllServiceCategories();
        const respond = await request.data;
        return respond;
    }
);

const categoriesSlice = createSlice({
    name: "allServiceCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServiceCategories.pending, (state) => {
            state.data = {
                loading: true,
                serviceCategories: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServiceCategories.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                serviceCategories: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServiceCategories.rejected, (state, actions) => {
            state.data = {
                loading: false,
                serviceCategories: [],
                error: actions.error.message,
            };
        });
    },
});

export default categoriesSlice.reducer;
