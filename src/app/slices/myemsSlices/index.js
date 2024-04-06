import { combineReducers } from "@reduxjs/toolkit";
import myemsAllPostsSlice from "./myemsAllPostsSlice/myemsAllPostsSlice";
import singlePostMyems from "./singlePostMyems/singlePostMyems";
import addPostMyems from "./addPostMyems/addPostMyems";
import myemslAllPostsUsersSlice from './getAllReceivers/getAllReceivers'

const reducers = combineReducers({
    myemsAllPostsSlice: myemsAllPostsSlice,
    singlePostMyems: singlePostMyems,
    addPostMyems:addPostMyems,
    myemslAllPostsUsersSlice:myemslAllPostsUsersSlice
});

export default reducers;