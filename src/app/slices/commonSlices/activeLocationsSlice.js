import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommonService } from "services/apiServices";

const initialState = {
    data: { loading: false, activeLocations: [], error: "" },
};

export const fetchActiveLocations = createAsyncThunk(
    "activeLocations/fetchActiveLocations",
    async () => {
        const request = await CommonService.GetActiveLocations();
        const respond = await request.data;
        return respond;
    }
);

const activeLocationsSlice = createSlice({
    name: "activeLocations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchActiveLocations.pending, (state) => {
            state.data = {
                loading: true,
                activeLocations: [],
                error: "",
            };
        });
        builder.addCase(fetchActiveLocations.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                activeLocations: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchActiveLocations.rejected, (state, actions) => {
            state.data = {
                loading: false,
                activeLocations: [],
                error: actions.error.message,
            };
        });
    },
});

export default activeLocationsSlice.reducer;
