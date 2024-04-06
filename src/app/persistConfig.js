import localStorage from "redux-persist/lib/storage";

// root persist reducers
const rootPersistConfig = {
    key: "root",
    storage: localStorage,
    blacklist: [
        "home",
        "service",
        "dealer",
        "management",
        "common",
        "myuhlPost",
        "settings",
        "myuhl",
        "myems",
    ], // those reducers will not be persisted
    whiteList: [], // those reducers will be persisted only
};

export default rootPersistConfig;
