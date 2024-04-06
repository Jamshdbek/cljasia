import request from "../api";

class MyuhlPostApiService {
    static GetClientInfo = (params) => {
        return request.get("/api/user/v1", { params: { ...params } });
    };

    static GetSenderInfo = () => {
        return request.get("/api/v1/create-post");
    };

    static CreateNewPost = (params) => {
        return request.post("/api/v1/new-post", params);
    };

    static GetSingleMyuhlPost = (id) => {
        return request.get(`/api/v1/single-post/${id}`);
    };
    static GetRemainingLimitPost = (id) => {
        return request.post('/api/v1/remaining-limit', id)
    }
    static GetUsersSelectedByPhone = (params) => {
        return request.get(`/api/v1/receivers?page=${params.page}&size=${params.size}&search=${params.search}`)
    }
}

export default MyuhlPostApiService;
