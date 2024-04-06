import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "lodash";
import MyuhlApiService from "services/apiServices/myuhl";
import SettingsApiService from "services/apiServices/settings";

const initialState = {
    data: { loading: false, manifestOne: [], error: "" },
};

export const fetchOneManifests = createAsyncThunk(
    "manifestOne/fetchOneManifests",
    async (params) => {
        const request = await MyuhlApiService.GetOneManifests(params);
        const respond = await request.data;
        return respond;
    }
);

const manifestOneSlice = createSlice({
    name: "manifestOne",
    initialState,
    reducers: {
        handleDeleteManifest: (state, actions) => {
            state.data = {
                ...state.data,
                manifestOne: {
                    ...state.data.manifestOne,
                    data: get(state, "data.manifestOne.data", []).filter(
                        (item) => item.postId !== actions.payload
                    ),
                },
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOneManifests.pending, (state) => {
            state.data = {
                loading: true,
                manifestOne: [],
                error: "",
            };
        });
        builder.addCase(fetchOneManifests.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                manifestOne: actions.payload,
            };
        });
        builder.addCase(fetchOneManifests.rejected, (state, actions) => {
            state.data = {
                loading: false,
                manifestOne: [],
                error: actions.error.message,
            };
        });
    },
});

export const { handleDeleteManifest } = manifestOneSlice.actions;
export default manifestOneSlice.reducer;
