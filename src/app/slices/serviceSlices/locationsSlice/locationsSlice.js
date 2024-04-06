import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, serviceLocations: [], error: "" },
};

export const fetchAllServiceLocations = createAsyncThunk(
    "addServiceLocations/fetchAllServiceLocations",
    async () => {
        const request = await ServiceApiService.GetAllServiceLocations();
        const respond = await request.data;
        return respond;
    }
);

const locationsSlice = createSlice({
    name: "allServiceLocations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServiceLocations.pending, (state) => {
            state.data = {
                loading: true,
                serviceLocations: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServiceLocations.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                serviceLocations: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServiceLocations.rejected, (state, actions) => {
            state.data = {
                loading: false,
                serviceLocations: [],
                error: actions.error.message,
            };
        });
    },
});

export default locationsSlice.reducer;
