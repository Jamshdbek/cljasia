import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice/loginSlice";

const reducers = combineReducers({
    user: loginSlice,
});

export default reducers;
