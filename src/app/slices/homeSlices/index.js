import { combineReducers } from "@reduxjs/toolkit";
import dailyStatisticsSlice from "./dailyStatisticsSlice/dailyStatisticsSlice";
import monthlyStatisticsSlice from "./monthlyStatisticsSlice/monthlyStatisticsSlice";
import filterStatisticsSlice from "./filterStatisticsSlice/filterStatisticsSlice";

const reducers = combineReducers({
    dailyStatisticsSlice: dailyStatisticsSlice,
    monthlyStatisticsSlice: monthlyStatisticsSlice,
    filterStatisticsSlice: filterStatisticsSlice,
});

export default reducers;
