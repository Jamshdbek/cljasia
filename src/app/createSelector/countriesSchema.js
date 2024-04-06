import { createSelector } from "@reduxjs/toolkit";
import { get } from "lodash";

const countriesSchema = createSelector(
    (store) => store.common.countries.countries,
    (countries) =>
        countries
            .filter((country) => country.isActive)
            .map((country) => ({
                value: get(country, "id", ""),
                label: get(country, "name", ""),
            }))
);

export default countriesSchema;
