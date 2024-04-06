import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { get, isEmpty } from "lodash";
import { AuthApiService } from "services/apiServices";

const initialState = {
    loading: false,
    token: {},
    error: "",
    user: null,
    isAuthenticated: false,
    isFetched: true,
};

export const userLogin = createAsyncThunk(
    "login/userLogin",
    async (params, thunkAPI) => {
        const request = await AuthApiService.SignIn(params);
        // const request = await axios.post(
        //     "https://dev-api.my-uhl.com/auth/v1/login",
        //     params
        // );

        const data = await get(request, "data", "");
        return data;
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        removeToken: (state) => {
            state.isAuthenticated = false;
            state.isFetched = true;
            state.token = {};
            state.error = "";
            state.user = null;
            state.loading = false;
        },
        updatedUserComing: (state, actions) => {
            state.token = {
                ...state.token,
                data: { ...state.token.data, isFirstTime: actions.payload },
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.isFetched = false;
        });
        builder.addCase(userLogin.fulfilled, (state, actions) => {
            state.loading = false;
            state.token = actions.payload;
            state.error = "";
            state.isAuthenticated = true;
            state.isFetched = true;
        });
        builder.addCase(userLogin.rejected, (state, actions) => {
            state.loading = false;
            state.token = {};
            state.error = actions.error.message;
            state.isAuthenticated = false;
            state.isFetched = true;
        });
    },
});

export const { removeToken, updatedUserComing } = loginSlice.actions;
export default loginSlice.reducer;
