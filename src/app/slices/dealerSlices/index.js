import { combineReducers } from "@reduxjs/toolkit";
// import dealerPriceSlice from "./dealerPriceSlice/dealerPriceSlice";
import dealersPriceSlice from "./dealersPriceSlice/dealersPriceSlice";
import cityDealersPriceSlice from "./cityDealersPriceSlice/cityDealersPriceSlice";
import dataCityDealersPriceSlice from "./DataCityDealersPriceSlice/DataCityDealersPriceSlice";
import addDealerPriceSlice from "./addDealerPriceSlice/addDealerPriceSlice";
import dealerAccountingSlice from "./dealerAccountingSlice/dealerAccountingSlice";
import orderBoxSlice from "./orderBoxSlice/orderBoxSlice";
import orderBoxPrice from "./orderBoxSlice/orderBoxPrice";

const reducers = combineReducers({
    dealersPrices: dealersPriceSlice,
    cityDealersPrices: cityDealersPriceSlice,
    dataCityDealersPrices: dataCityDealersPriceSlice,
    addDealerPrice: addDealerPriceSlice,
    dealersAccounting: dealerAccountingSlice,
    orderBox: orderBoxSlice,
    orderBoxPrice: orderBoxPrice
});

export default reducers;
