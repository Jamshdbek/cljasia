import request from "../api";

class SettingsApiService {
    static GetCompanyInfo = () => {
        return request.get("/api/user-web/v1/company");
    };
    static PostAccountInfo = (params) => { 
        return request.put("/api/user-web/v1/user-name", params)
    }
    static PasswordChange = (params) => { 
        return request.put("/api/user-web/v1/user-password" , params)
    }
    static PutCompanyInfo = (params) => {
        console.log(params, "THIS IS THE Params");
        return request.put("/api/user-web/v1/company", params);
    };
}


export default SettingsApiService;
