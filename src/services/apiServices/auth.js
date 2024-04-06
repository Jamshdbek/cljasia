import request from "../api";

class AuthApiService {
    static SignIn = (params) => {
        return request.post("/auth/v1/login", params);
    };
}

export default AuthApiService;
