import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "lodash";
import MyuhlApiService from "services/apiServices/myuhl";
import SettingsApiService from "services/apiServices/settings";

const initialState = {
    data: { loading: false, manifestAll: [], error: "" },
    reysNumber: "",
    routes: {},
};

export const fetchAllManifests = createAsyncThunk(
    "manifestAll/fetchAllManifests",
    async (params) => {
        const request = await MyuhlApiService.GetAllManifests(params);
        const respond = await request.data;
        return respond;
    }
);

const manifestAllSlice = createSlice({
    name: "manifestAll",
    initialState,
    reducers: {
        handleDeleteManifest: (state, actions) => {
            state.data = {
                ...state.data,
                manifestAll: {
                    ...state.data.manifestAll,
                    data: get(state, "data.manifestAll.data", []).filter(
                        (item) => item.postId !== actions.payload
                    ),
                },
            };
        },
        handleChooseManifest: (state, actions) => {
            state.data = {
                ...state.data,
                manifestAll: {
                    ...state.data.manifestAll,
                    data: get(state, "data.manifestAll.data", []).map((item) =>
                        actions.payload === item.postId
                            ? { ...item, checked: !item.checked }
                            : actions.payload.all === "all"
                            ? { ...item, checked: !actions.payload.check }
                            : item
                    ),
                },
            };
        },
        handleReysNumber: (state, actions) => {
            state.reysNumber = actions.payload;
        },
        handleLocationIdentify: (state, actions) => {
            state.routes = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllManifests.pending, (state) => {
            state.data = {
                loading: true,
                manifestAll: [],
                error: "",
            };
        });
        builder.addCase(fetchAllManifests.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                manifestAll: {
                    ...actions.payload,
                    data: actions.payload.data.map((item) => ({
                        ...item,
                        checked: false,
                    })),
                },
                error: "",
            };
        });
        builder.addCase(fetchAllManifests.rejected, (state, actions) => {
            state.data = {
                loading: false,
                manifestAll: [],

                error: actions.error.message,
            };
        });
    },
});

export const {
    handleDeleteManifest,
    handleChooseManifest,
    handleReysNumber,
    handleLocationIdentify,
} = manifestAllSlice.actions;
export default manifestAllSlice.reducer;
