import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import MyemsApiService from "services/apiServices/myems";


const initialState = {
    data: { loading: false, myemsAllPosts: [], error: "", pagination: {} },
    filter: {
        page: 0,
        size: 10,
        emsCode: '',
        receiveName:'',
        timeDifference:1,
        status: null,
        locationId: null,
        countryCd: null,
        fromDate: moment().subtract(1, "month").format("YYYY-MM-DD"),
        toDate: moment().add(1, "days").format("YYYY-MM-DD"),
        dealerId: null,
    },
};

export const fetchMyemsAllPosts = createAsyncThunk(
    "myemsAllPosts/fetchMyemsAllPosts",
    async (params) => {
        const request = await MyemsApiService.GetMyemsAllPosts(params);
        const respond = await request.data;
        return respond;
    }
);


const myemsAllPostsSlice = createSlice({
    name: "myemsAllPosts",
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
                emsCode: '',
                receiveName:'',
                status: null,
                locationId: null,
                countryCd: null,
                timeDifference:1,
                fromDate: moment().subtract(2, "month").format("YYYY-MM-DD"),
                toDate: moment().add(1, "days").format("YYYY-MM-DD"),
                dealerId: null,
            };
        },
        handleChangeCheckbox: (state, actions) => {
          
            state.data = {
                ...state.data,
                myemsAllPosts: state.data.myemsAllPosts.map((item) =>
                    actions.payload === item.id
                        ? { ...item, checked: !item.checked }
                        : actions.payload.all === "all"
                        ? { ...item, checked: !actions.payload.check }
                        : item
                ),
            };
        },
       
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyemsAllPosts.pending, (state) => {
            state.data = {
                loading: true,
                myemsAllPosts: [],
                error: "",
                pagination: {},
            };
        });
        builder.addCase(fetchMyemsAllPosts.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                myemsAllPosts: actions.payload.data.data.map((item) => ({
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
        builder.addCase(fetchMyemsAllPosts.rejected, (state, actions) => {
            state.data = {
                loading: false,
                myemsAllPosts: [],
                error: actions.error.message,
            };
        });
    },
});

export const { handleChangeFilter, handleClearFilter, handleChangeCheckbox } =
    myemsAllPostsSlice.actions;
export default myemsAllPostsSlice.reducer;
