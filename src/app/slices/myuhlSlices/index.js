import { combineReducers } from "@reduxjs/toolkit";
import myuhlAllPostsSlice from "./myuhlAllPostsSlice/myuhlAllPostsSlice";
import inspectionAllSlice from "./inspectionAllSlice/inspectionAllSlice";
import manifestAllSlice from "./manifestAllSlice/manifestAllSlice";
import manifestOneSlice from "./manifestAllSlice/manifestOneSlice";
import myuhlAllPostsUsersSlice from './myuhlUsersSelectedByPhone/UsersSelectedByPhoneNumber'
import singlePostLogsSlice from "./singlePostLogsSlice/singlePostLogsSlice";
import manifestCourierCompaniesSlice from "./manifestCourierCompaniesSlice/manifestCourierCompaniesSlice";
import myuhlAllClientsSlice from "./myuhlAllClients/myuhlAllClients";
import statisticsSlice from "./statisticsSlice/statisticsSlice";

const reducers = combineReducers({
    inspectionAllSlice: inspectionAllSlice,
    myuhlAllPostsSlice: myuhlAllPostsSlice,
    manifestAllSlice: manifestAllSlice,
    manifestOneSlice: manifestOneSlice,
    singlePostLogsSlice: singlePostLogsSlice,
    manifestCourierCompaniesSlice: manifestCourierCompaniesSlice,
    myuhlAllClientsSlice: myuhlAllClientsSlice,
    statisticsSlice: statisticsSlice,
    myuhlAllPostsUsersSlice:myuhlAllPostsUsersSlice
});

export default reducers;
