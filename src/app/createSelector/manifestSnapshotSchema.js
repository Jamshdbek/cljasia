import { createSelector } from "@reduxjs/toolkit";
import { get } from "lodash";

const manifestSnapshotSchema = createSelector(
    (store) => get(store, "common.manifestSnapshots.data", []),
    (data) => data
);

export default manifestSnapshotSchema;
