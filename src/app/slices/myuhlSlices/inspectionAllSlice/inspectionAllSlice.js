import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyuhlApiService from "services/apiServices/myuhl";
import SettingsApiService from "services/apiServices/settings";

const initialState = {
    data: { loading: false, inspectionsAll: [], error: "" },
    filter: {
        size: 10,
        page: 1,
        search: ''
    }
};

export const fetchAllInspections = createAsyncThunk(
    "inspectionsAll/fetchAllInspections",
    async (params) => {
        console.log(params)
        const request = await MyuhlApiService.GetAllInspections(params);
        const respond = await request.data;
        return respond;
    }
);

const companyInfoSlice = createSlice({
    name: "inspectionsAll",
    initialState,
    reducers: {
        handleChangeFilter: (state, actions) => {
            state.filter = {
                ...state.filter,
                [actions.payload.name]: actions.payload.value,
            };
        },
        handleClearFilter: (state, actions) => {
            state.filter = {
                ...state.filter,
                'search': '',
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllInspections.pending, (state) => {
            state.data = {
                loading: true,
                inspectionsAll: [],
                error: "",
            };
        });
        builder.addCase(fetchAllInspections.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                inspectionsAll: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchAllInspections.rejected, (state, actions) => {
            state.data = {
                loading: false,
                inspectionsAll: [],
                error: actions.error.message,
            };
        });
    },
});
export const {
    handleChangeFilter,
    handleClearFilter,
} = companyInfoSlice.actions;
export default companyInfoSlice.reducer;
