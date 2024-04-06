import { combineReducers } from "@reduxjs/toolkit";
import operatorSlice from "./operatorSlice/operatorSlice";
import editOperatorSlice from "./operatorSlice/editOperatorSlice";
const reducers = combineReducers({
    operatorSlice: operatorSlice,
    editOperatorSlice: editOperatorSlice
});

export default reducers;
