import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { MyuhlPostApiService } from "services/apiServices";

const initialState = {
    data: { loading: false, myuhlAllPostsUsers: [], error: "", pagination: {} },
    filter: {
        page: 1,
        size: 10,
        search:"",
    },
    find:null
};

export const UsersSelectedByPhone = createAsyncThunk(
    "myuhlAllPostsUsers/UsersSelectedByPhone",
    async (params) => {
        const request = await MyuhlPostApiService.GetUsersSelectedByPhone(params);
        const respond = await request.data;
        return respond;
    }
);

const myuhlAllPostsUsersSlice = createSlice({
    name: "myuhlAllPostsUsers",
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
                search:"",
            };
        },
        handleFind: (state, action) => {
            state.find = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(UsersSelectedByPhone.pending, (state) => {
            state.data = {
                loading: true,
                myuhlAllPostsUsers: [],
                error: "",
                pagination: {},
            };
        });
        builder.addCase(UsersSelectedByPhone.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                myuhlAllPostsUsers: actions.payload.data.data.map((item) => ({
                    ...item,
                    checked: false,
                })),
                error: "",
                pagination: actions.payload.data.paginationData,
            };
            state.filter = {
                ...state.filter,
                page: actions.payload.data.paginationData.currentPageNumber+1,
                size: actions.payload.data.paginationData.pageSize,
            };
        });
        builder.addCase(UsersSelectedByPhone.rejected, (state, actions) => {
            state.data = {
                loading: false,
                myuhlAllPostsUsers: [],
                error: actions.error.message,
            };
        });
    },
});

export const { handleChangeFilter, handleClearFilter,handleFind } =
    myuhlAllPostsUsersSlice.actions;
export default myuhlAllPostsUsersSlice.reducer;
