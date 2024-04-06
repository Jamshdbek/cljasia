import { combineReducers } from "@reduxjs/toolkit";
import createPostSlice from "./createPostSlice/createPostSlice";
import editPostSlice from "./editPostSlice";

const reducers = combineReducers({
    myuhlPostCreate: createPostSlice,
    editMyuhlPost: editPostSlice,
});

export default reducers;
