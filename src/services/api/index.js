import axios from "axios";
import config from "../../config";
import history from "router/history";
import { toast } from "react-toastify";
import { get } from "lodash";
import { removeToken } from "app/slices/authSlices/loginSlice/loginSlice";

const request = axios.create({
    baseURL: config.API_ROOT,
    params: {},
});

let store;

export const injectStore = (_store) => {
    store = _store;
};

request.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const token = store.getState();
            if (
                get(token,'auth','') &&

                get(token,'auth.user','') &&

                get(token,'auth.user','')  &&
                get(token,'auth.user.token.data.token','')
            ) {
                config.headers.Authorization = `Bearer ${get(token,'auth.user.token.data.token','')}`;
            }
        }
        return config;
    },
    (error) => {
        console.log(error);
    }
);

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const statusCode = get(error, "response.status", "");
        if (statusCode === 401) {
            const dispatch = store;
            dispatch.dispatch(removeToken());
            history.push("/auth");
        }
        if (statusCode === 500) {
            toast.error("Server error please try again");
        }

        if (statusCode === 409) {
            toast.warning(get(error, "response.data.data.description"));
            // return error.response;
        }

        if (statusCode === 400) {
            toast.warning(get(error, "response.data.data.description"));
            return error.response;
        }
        if (statusCode === 1024) {
            toast.warning(get(error, "You cannot create Super Admin"));
            return error.response;
        }

        return Promise.reject(error);
    }
);

export default request;
