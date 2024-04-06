import request from "../api";

class ServiceApiService {
    static GetAllServiceMeasurementUnit = () => {
        return request.get("/unit/v1");
    };
    //    /api/v1/get-price-details/
    static PostServiceMeasurementUnit = (params) => {
        return request.post("/unit/v1", params);
    };

    static PutEditServiceMeasurementUnit = (params) => {
        return request.put(`/unit/v1/${params.id}`, {
            name: params.name,
        });
    };

    static GetAllServiceCategories = () => {
        return request.get("/api/v1/categories");
    };

    static PostServiceCategory = (params) => {
        return request.post("/api/v1/create-category", params);
    };

    static PutEditServiceCategory = (params) => {
        return request.put(`/api/v1/update-category/${params.id}`, {
            name: params.name,
        });
    };

    static GetAllServiceAllCountries = () => {
        return request.get("/country/v1");
    };

    static PostServiceCountries = (params) => {
        return request.post("/country/v1", params);
    };

    static GetAllServiceCountryEdit = (id) => {
        return request.get(`/country/v1/${id}`);
    };

    static PutEditServiceCountries = (params) => {
        return request.put(`/location/v1/${params.id}`, params);
    };

    static GetAllServicePrices = () => {
        return request.get("/api/v1/prices");
    };

    static PostServicePrice = (params) => {
        return request.post("/api/v1/create-price-details", params);
    };

    static GetAllServiceLocations = () => {
        return request.get("/location/v1");
    };

    static PostServiceLocation = (params) => {
        return request.post("/location/v1", params);
    };

    static PutEditServiceLocation = (params) => {
        return request.put(`/location/v1/${params.id}`, {
            name: params.name,
            isActive: params.isActive,
            status:params.status,
        });
    };

    static GetAllServiceStatuses = () => {
        return request.get("/status/v1");
    };

    static PostServiceStatus = (params) => {
        return request.post("/status/v1", params);
    };

    static PutEditServiceStatus = (params) => {
        return request.put(`/status/v1/${params.id}`, {
            name: params.name,
            isActive: params.isActive,
            
        });
    };

    static UpdateCountryData = (id, params) => {
        return request.put(`/country/v1/${id}`, params);
    };

    static UpdateRegionData = (id, params) => {
        return request.put(`/country/v1/region/${id}`, params);
    };

    static UpdateDistrictData = (id, params) => {
        return request.put(`/country/v1/district/${id}`, params);
    };

    static DeleteCountryData = (id) => {
        return request.delete(`/country/v1/${id}`);
    };

    static DetailPriceInfo = (id) => {
        return request.get(`/api/v1/get-price-details/${id}`);
    };

    static GetAllServiceLimit = () => {
        return request.get(`/api/v1/limits`);
    };
    static GetOneServiceLimit = (id) => {
        return request.get(`/api/v1/limits/${id}`);
    };
    static PutServiceLimit = (params) => {
        return request.put(`/api/v1/limits`, params);
    };

    static EditNewRegion = (id, params) => {
        return request.post(`/country/v1/region/${id}`, params);
    };

    static RemoveNewRegion = (id) => {
        return request.delete(`/country/v1/region/${id}`);
    };

    static EditNewDistrict = (id, params) => {
        return request.post(`/country/v1/district/${id}`, params);
    };

    static RemoveNewDistrict = (id) => {
        return request.delete(`/country/v1/district/${id}`);
    };
}

export default ServiceApiService;
