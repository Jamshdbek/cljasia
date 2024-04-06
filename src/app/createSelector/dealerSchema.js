import { createSelector } from "@reduxjs/toolkit";
import { get } from "lodash";

const dealerSchema = createSelector(
    (store) => get(store, "dealer.dealersPrices.data.dealersPrices.data", []),
    (data) =>
        data.map((dealer) => ({
            label: `${dealer.name} ${dealer.lastName}`,
            value: dealer.id,
        }))
);

export default dealerSchema;
