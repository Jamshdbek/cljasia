import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyuhlApiService from "services/apiServices/myuhl";

const initialState = {
    data: { loading: false, myuhlAllClients: [], error: "", pagination: {} },
    filter: {
        page: 1,
        size: 10,
    },
};

export const fetchAllClients = createAsyncThunk(
    "myuhlAllClients/fetchAllClients",
    async (params) => {
        try {
            
            const request = await MyuhlApiService.GetAllClients(params);
            const respond = await request.data;
            return respond;
        } catch (error) {
            console.log(error , "Error getting clients")
        }
    }
);

const myuhlAllClientsSlice = createSlice({
    name: "myuhlAllClients",
    initialState,
    reducers: {
        handleChangeFilter: (state, actions) => {
            state.filter = {
                ...state.filter,
                [actions.payload.name]: actions.payload.value,
            };
        },
        handleClearFilter:(state)=>{
            state.filter={
                ...state.filter,
                search:''
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllClients.pending, (state) => {
            state.data = {
                loading: true,
                myuhlAllClients: [],
                error: "",
                pagination: {},
            };
        });
        builder.addCase(fetchAllClients.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                myuhlAllClients: actions.payload,
                error: "",
                pagination: actions.payload.data.paginationData,
            };
            state.filter = {
                ...state.filter,
                page: actions.payload.data.paginationData.currentPageNumber+1,
                size: actions.payload.data.paginationData.pageSize,
            };
        });
        builder.addCase(fetchAllClients.rejected, (state, actions) => {
            state.data = {
                loading: false,
                myuhlAllClients: [],
                error: actions.error.message,
            };
        });
    },
});
export const { handleChangeFilter, handleClearFilter } =
    myuhlAllClientsSlice.actions;
export default myuhlAllClientsSlice.reducer;
