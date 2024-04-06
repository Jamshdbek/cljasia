import request from "../api";

class CommonService {
    static AllCountries = () => {
        return request.get("/country/v1");
    };

    static AllRegions = (id) => {
        return request.get(`/country/v1/${id}`);
    };

    static GetUserMe = () => {
        return request.get("/api/user-web/v1/me");
    };

    static GetAccountTypes = () => {
        return request.get("/account/v1/accounts");
    };

    static GetActiveLocations = () => {
        return request.get("/location/v1/locations");
    };

    static GetToCountries = (id) => {
        return request.get(`/country/v1/to-countries/${id}`);
    };

    static GetCountries = () => {
        return request.get(`/country/v1/countries`);
    };

    static GetAllManifestSnapshots = () => {
        return request.get(`/api/v1/snapshots`);
    };
}

export default CommonService;
