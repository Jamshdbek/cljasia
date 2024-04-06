import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { get } from "lodash";
import { Header } from "components";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleLocationIdentify } from "app/slices/myuhlSlices/manifestAllSlice/manifestAllSlice";

const MainLayout = ({ children }) => {
    const user = get({}, "auth.user", {});
    const location = useLocation();
    const dispatch = useDispatch();
    const [route, setRoute] = useState({
        current: location && location.pathname,
        previous: location && location.pathname,
    });

    const handleRoute = useCallback(() => {
        setRoute((prev) => ({
            current: location && location.pathname,
            previous: prev.current,
        }));
    }, [location]);

    useEffect(() => {
        handleRoute();
    }, [handleRoute]);

    const handleLocation = useCallback(() => {
        dispatch(handleLocationIdentify(route));
    }, [dispatch, route]);

    useEffect(() => {
        handleLocation();
    }, [handleLocation]);

    return (
        <>
            <Header user={user} />
            <ToastContainer />
            {children}
        </>
    );
};
// const mapStateToProps = (state) => {
//     return {
//         user: get(state, "auth.user", {}),
//     };
// };
export default MainLayout;
