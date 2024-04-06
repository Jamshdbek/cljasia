import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CommonService from "services/apiServices/common";

const initialState = {
    loading: false,
    data: [],
    error: "",
    isFetched: false,
};

export const fetchManifestSnapshots = createAsyncThunk(
    "manifestSnapshots/fetchManifestSnapshots",
    async () => {
        const request = await CommonService.GetAllManifestSnapshots();
        const respond = await request.data;
        return respond;
    }
);

const manifestSnapshotsSlice = createSlice({
    name: "manifestSnapshots",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchManifestSnapshots.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchManifestSnapshots.fulfilled, (state, actions) => {
            state.loading = false;
            state.data = actions.payload.data.map((item) => ({
                value: item.id,
                label: item.flight,
            }));
            state.isFetched = actions.payload.success;
            state.error = "";
        });
        builder.addCase(fetchManifestSnapshots.rejected, (state, actions) => {
            state.loading = false;
            state.data = [];
            state.isFetched = actions.payload.success;
            state.error = actions.error.message;
        });
    },
});

export default manifestSnapshotsSlice.reducer;
