import { createSlice } from "@reduxjs/toolkit";
import { get, isEqual } from "lodash";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    priceList: [],
    initialValues: { region: "", price: "" },
};

const addPriceSlice = createSlice({
    name: "serviceAllCountries",
    initialState,
    reducers: {
        addPrice: (state) => {
            state.priceList = [
                ...state.priceList,
                { ...state.initialValues, id: uuidv4() },
            ];
            state.initialValues = { region: "", price: "" };
        },
        removePrice: (state, actions) => {
            state.priceList = get(state, "priceList", []).filter(
                (item) => item.id !== actions.payload
            );
        },
        changeRegion: (state, actions) => {
            state.initialValues = {
                ...state.initialValues,
                region: get(actions, "payload.region", ""),
            };
        },
        changePrice: (state, actions) => {
            state.initialValues = {
                ...state.initialValues,
                price: get(actions, "payload.price", ""),
            };
        },
        editRegionPrice: (state, actions) => {
            state.priceList = state.priceList.map(
                (item) =>
                    isEqual(item.id, get(actions, "payload.id", "")) && {
                        ...item,
                        region: actions.payload.region,
                        price: actions.payload.price,
                    }
            );
        },
    },
});

export const {
    changeRegion,
    changePrice,
    addPrice,
    removePrice,
    editRegionPrice,
} = addPriceSlice.actions;

export default addPriceSlice.reducer;
