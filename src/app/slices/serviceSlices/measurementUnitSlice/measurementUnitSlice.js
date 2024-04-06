import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, serviceMeasurementUnit: [], error: "" },
};

export const fetchAllServiceMeasurementUnit = createAsyncThunk(
    "addServiceMeasurementUnit/fetchAllServiceMeasurementUnit",
    async () => {
        const request = await ServiceApiService.GetAllServiceMeasurementUnit();
        const respond = await request.data;
        return respond;
    }
);

const measurementUnitSlice = createSlice({
    name: "allServiceMeasurementUnit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServiceMeasurementUnit.pending, (state) => {
            state.data = {
                loading: true,
                serviceMeasurementUnit: [],
                error: "",
            };
        });
        builder.addCase(fetchAllServiceMeasurementUnit.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                serviceMeasurementUnit: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllServiceMeasurementUnit.rejected, (state, actions) => {
            state.data = {
                loading: false,
                serviceMeasurementUnit: [],
                error: actions.error.message,
            };
        });
    },
});

export default measurementUnitSlice.reducer;
