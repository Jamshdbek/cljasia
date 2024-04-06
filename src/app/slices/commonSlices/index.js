import { combineReducers } from "@reduxjs/toolkit";
import countriesSlice from "./countriesSlice";
import regionsSlice from "./regionsSlice";
import userMeSlice from "./userMeSlice";
import accountTypesSlice from "./accountTypesSlice";
import activeLocationsSlice from "./activeLocationsSlice";
import toCountriesSlice from "./toCountriesSlice";
import manifestSnapshotsSlice from "./manifestSnapshotsSlice";
const reducers = combineReducers({
    countries: countriesSlice,
    regions: regionsSlice,
    userMe: userMeSlice,
    accountTypes: accountTypesSlice,
    activeLocations: activeLocationsSlice,
    toCountries: toCountriesSlice,
    manifestSnapshots: manifestSnapshotsSlice,
});

export default reducers;
