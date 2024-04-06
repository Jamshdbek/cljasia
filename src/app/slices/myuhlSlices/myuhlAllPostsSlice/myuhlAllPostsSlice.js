import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forEach, forInRight, get, iteratee } from "lodash";
import moment from "moment";
import MyuhlApiService from "services/apiServices/myuhl";

const initialState = {
    data: { loading: false, myuhlAllPosts: [], error: "", pagination: {} },
    filter: {
        page: 0,
        size: 25,
        uhlCode: null,
        status: null,
        locationId: null,
        countryId: null,
        fromDate: moment().subtract(2, "month").format("YYYY-MM-DD"),
        toDate: moment().add(1, "days").format("YYYY-MM-DD"),
        dealerId: null,
    },
};

export const fetchMyuhlAllPosts = createAsyncThunk(
    "myuhlAllPosts/fetchMyuhlAllPosts",
    async (params) => {
        const request = await MyuhlApiService.GetMyuhlAllPosts(params);
        const respond = await request.data;
        return respond;
    }
);

const myuhlAllPostsSlice = createSlice({
    name: "inspectionsAll",
    initialState,
    reducers: {
        handleChangeFilter: (state, actions) => {
            state.filter = {
                ...state.filter,
                [actions.payload.name]: actions.payload.value,
            };
        },

        handleClearFilter: (state) => {
            state.filter = {
                ...state.filter,
                uhlCode: null,
                page:0,
                size:25,
                status: null,
                locationId: null,
                countryId: null,
                fromDate: moment().subtract(2, "month").format("YYYY-MM-DD"),
                toDate: moment().add(1, "days").format("YYYY-MM-DD"),
                dealerId: null,
            };
        },
        handleChangeCheckbox: (state, actions) => {
            state.data = {
                ...state.data,
                myuhlAllPosts: state.data.myuhlAllPosts.map((item) =>
                    actions.payload === item.id
                        ? { ...item, checked: !item.checked }
                        : actions.payload.all === "all"
                        ? { ...item, checked: !actions.payload.check }
                        : item
                ),
            };
        },
        handleCheckParcel: (state, actions) => {
            state.data = {
                ...state.data,
                myuhlAllPosts: (() => {
                    const { index, firstCheckedIndex, id, hotKeyPressed, all } =
                        actions.payload;

                    if (firstCheckedIndex != null && hotKeyPressed) {
                        const updatedCheckboxes = state.data.myuhlAllPosts.map(
                            (checkbox, i) => {
                                if (
                                    (i >= firstCheckedIndex && i <= index) ||
                                    (i >= index && i <= firstCheckedIndex)
                                ) {
                                    return { ...checkbox, checked: true };
                                }
                                return checkbox;
                            }
                        );
                        return updatedCheckboxes;
                    } else {
                        return state.data.myuhlAllPosts.map((item) =>
                            id === item.id
                                ? { ...item, checked: !item.checked }
                                : all === "all"
                                ? { ...item, checked: !actions.payload.check }
                                : item
                        );
                    }
                })(),
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyuhlAllPosts.pending, (state) => {
            state.data = {
                loading: true,
                myuhlAllPosts: [],
                error: "",
                pagination: {},
            };
        });
        builder.addCase(fetchMyuhlAllPosts.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                myuhlAllPosts: actions.payload.data.data.map((item) => ({
                    ...item,
                    checked: false,
                })),
                error: "",
                pagination: actions.payload.data.paginationData,
            };
            state.filter = {
                ...state.filter,
                page: actions.payload.data.paginationData.currentPageNumber,
                size: actions.payload.data.paginationData.pageSize,
            };
        });
        builder.addCase(fetchMyuhlAllPosts.rejected, (state, actions) => {
            state.data = {
                loading: false,
                myuhlAllPosts: [],
                error: actions.error.message,
            };
        });
    },
});

export const {
    handleChangeFilter,
    handleClearFilter,
    handleChangeCheckbox,
    handleCheckParcel,
} = myuhlAllPostsSlice.actions;
export default myuhlAllPostsSlice.reducer;
