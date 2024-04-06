import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommonService } from "services/apiServices";

const initialState = {
    data: { loading: false, userMe: [], error: "" },
};

export const fetchUserMe = createAsyncThunk(
    "userMe/fetchUserMe",
    async () => {
        const request = await CommonService.GetUserMe();
        const respond = await request.data;
        return respond;
    }
);

const userMeSlice = createSlice({
    name: "userMe",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserMe.pending, (state) => {
            state.data = {
                loading: true,
                userMe: [],
                error: "",
            };
        });
        builder.addCase(fetchUserMe.fulfilled, (state, actions) => {
            state.data = {
                loading: false,
                userMe: actions.payload,
                error: "",
            };
        });
        builder.addCase(fetchUserMe.rejected, (state, actions) => {
            state.data = {
                loading: false,
                userMe: [],
                error: actions.error.message,
            };
        });
    },
});

export default userMeSlice.reducer;
