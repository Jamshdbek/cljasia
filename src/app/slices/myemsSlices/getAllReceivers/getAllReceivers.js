import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MyemsApiService } from "services/apiServices";



const initialState = {
    data: { loading: false, myemslAllPostsUsers: [], error: "", pagination: {} },
    filter: {
        page: 1,
        size: 10,
        search:"",
    },
    find:null
};

export const UsersSelectedByPhone = createAsyncThunk(
    "myemslAllPostsUsers/UsersSelectedByPhone",
    async (params) => {
        const request = await MyemsApiService.getReceivers(params);
        const respond = await request.data;
        return respond;
    }
);

const myemslAllPostsUsersSlice = createSlice({
    name: "myemslAllPostsUsers",
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
                myemslAllPostsUsers: [],
                error: "",
                pagination: {},
            };
        });
        builder.addCase(UsersSelectedByPhone.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                myemslAllPostsUsers: actions.payload.data.data.map((item) => ({
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
                myemslAllPostsUsers: [],
                error: actions.error.message,
            };
        });
    },
});

export const { handleChangeFilter, handleClearFilter,handleFind } =
    myemslAllPostsUsersSlice.actions;
export default myemslAllPostsUsersSlice.reducer;
