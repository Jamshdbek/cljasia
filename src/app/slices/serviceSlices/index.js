import { combineReducers } from "@reduxjs/toolkit";
import addCountriesSlice from "./AddCountriesSlice/addCountriesSlice";
import allCountriesSlice from "./allCountriesSlice/allCountriesSlice";
import measurementUnitSlice from "./measurementUnitSlice/measurementUnitSlice";
import pricesSlice from "./pricesSlice/pricesSlice";
import locationsSlice from "./locationsSlice/locationsSlice";
import categoriesSlice from "./categoriesSlice/categoriesSlice";
import statusesSlice from "./statusesSlice/statusesSlice";
import addPriceSlice from "./addPriceSlice/addPriceSlice";
import countryEditSlice from "./countryEditSlice/countryEditSlice";
import detailEditPriceSlice from "./detailEditPriceSlice";
import priceDetail from "./priceDeatail/priceDetail";
import limitsSlice from "./limitSlice/limitSlice"
import getOneLimit from "./limitSlice/getOneLimit";
const reducers = combineReducers({
    serviceMeasurementUnit: measurementUnitSlice,
    countries: addCountriesSlice,
    allCountries: allCountriesSlice,
    servicePrices: pricesSlice,
    serviceLocations: locationsSlice,
    serviceCategories: categoriesSlice,
    serviceStatuses: statusesSlice,
    addPrice: addPriceSlice,
    countryEdit: countryEditSlice,
    detailEditPrice: detailEditPriceSlice,
    priceDetail: priceDetail,
    limitsSlice: limitsSlice,
    getOneLimit: getOneLimit
});

export default reducers;
