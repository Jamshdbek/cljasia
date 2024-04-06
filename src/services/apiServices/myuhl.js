import request from "../api";

class MyuhlApiService {
    static GetAllClients = (params) => {
        return request.get("/api/user/v1/clients", { params: { ...params } });
    };
    static GetAllInspections = (params) => {
        return request.get("/inspection/v1", { params: { ...params } });
    };

    static RemoveInspect = (id) => {
        return request.delete(`/api/v1/posts/${id}`);
    };

    static GetMyuhlAllPosts = (params) => {
        return request.get("/api/v1/posts", { params: { ...params } });
    };

    static CalculatePostPrice = (params) => {
        return request.post("/api/v1/calculating", params);
    };

    static UpdatePostData = (params) => {
        return request.put("/api/v1/update-post", params);
    };

    static ChangeLocationPosts = (params) => {
        return request.put("/api/v1/set-location", params);
    };

    static DispatchInspection = (params) => {
        return request.put("/inspection/v1", params);
    };

    static GetAllManifests = () => {
        return request.get("/api/v1/manifests");
    };

    static GetOneManifests = (id) => {
        return request.get(`/api/v1/manifests/${id}`);
    };

    static DeleteManifestData = (id) => {
        return request.delete(`/api/manifest/v1/remove/${id}`);
    };

    static PostManifestData = (params) => {
        return request.post("/api/v1/manifest", params);
    };

    static DeleteUserData = (id) => {
        return request.delete(`/api/user/${id}`);
    };

    static GetSinglePostLogs = (id) => {
        return request.get(`/api/v1/history-locations/${id}`);
    };

    static GetCourierCompanies = () => {
        return request.get("/api/v1/courier-companies");
    };

    static PostManifestCompanyData = (params) => {
        return request.post("/api/v1/courier-company-update", params);
    };

    static RemovePost = (id) => {
        return request.delete(`/api/v1/posts/${id}`);
    };
    static GetStatisticsByDate = (params) => {
        return request.get(`/api/v1/statistics`, { params: { ...params } });
    };

    static GetStatisticsByManifest = (params) => {
        return request.get(`/api/v1/manifest-statistic`, {
            params: { ...params },
        });
    };
}

export default MyuhlApiService;
