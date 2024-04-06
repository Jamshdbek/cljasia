import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import rootPersistConfig from "./persistConfig";
import serviceSlices from "app/slices/serviceSlices";
import authSlices from "app/slices/authSlices";
import dealerSlice from "app/slices/dealerSlices";
import managementSlice from "app/slices/managementSlices";
import commonSlice from "app/slices/commonSlices";
import settingsSlice from "app/slices/settingsSlices";
import myuhlSlices from "app/slices/myuhlSlices";
import myuhlPostSlice from "app/slices/myuhlPostSlices";
import homeSlices from "app/slices/homeSlices";
import myemsSlices from "app/slices/myemsSlices"
const rootReducer = combineReducers({
    auth: authSlices,
    home: homeSlices,
    myuhl: myuhlSlices,
    myems: myemsSlices,
    service: serviceSlices,
    dealer: dealerSlice,
    management: managementSlice,
    common: commonSlice,
    settings: settingsSlice,
    myuhlPost: myuhlPostSlice,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
