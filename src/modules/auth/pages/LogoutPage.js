import { removeToken } from "app/slices/authSlices/loginSlice/loginSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import history from "router/history";

const LogoutPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(removeToken());
        history.push("/");
    }, []);
    return <>Logout</>;
};

export default LogoutPage;
