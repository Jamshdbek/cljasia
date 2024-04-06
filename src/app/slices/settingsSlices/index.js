import { combineReducers } from "@reduxjs/toolkit";
import companyInfoSlice from "./companyInfoSlice/companyInfoSlice";

const reducers = combineReducers({
    companyInfoSlice: companyInfoSlice,
});

export default reducers;
