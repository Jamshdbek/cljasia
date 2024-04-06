import { createSelector } from "@reduxjs/toolkit";
import { get } from "lodash";

const districtsSchema = createSelector(
    (store) => get(store, "common.regions.districts", []),
    (districts) =>
        districts.map((district) => ({
            label: district.name,
            value: district.id,
        }))
);

export default districtsSchema;
