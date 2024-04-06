import { createSelector } from "@reduxjs/toolkit";
import { get } from "lodash";

const regionSchema = createSelector(
    (store) => get(store, "common.regions.regions.regions", []),
    (regions) =>
        regions.map((region) => ({
            label: region.name,
            value: region.id,
        }))
);

export default regionSchema;
