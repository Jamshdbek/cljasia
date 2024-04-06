import request from "../api";

class ManagementApiService {

    static GetAllManagementOperators = ( params) => {
            return request.get(`/api/user-web/v1/users`, { params: { ...params } });
    };
    static GetAllManagementOperatorsType = (id) => {
            return request.get(`/api/user-web/v1/users?accountTypeId=${id}`);
    };
    static PostManagementOperator = (params) => {
        return request.post("/api/user-web/v1/add", params);
    };
    static GetManagementOperator = (id, params) => {
        return request.get(`/api/user-web/v1/users/${id}`, { params: { ...params } });
    };
    static EditManagementOperator = (params) => {
        console.log(params, "Param")
        return request.put(`/api/user-web/v1/update`, params);
    };


    
   

}

export default ManagementApiService;
