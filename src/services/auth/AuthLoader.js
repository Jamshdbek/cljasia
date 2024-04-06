import { Loader } from "components";
import { Consumer } from "context";
import store from "app/store";
import { injectStore } from "services/api";
import { useEffect } from "react";

const AuthLoader = ({ children, fallback = () => {} }) => {
    useEffect(() => {
        injectStore(store);
    }, []);

    return (
        <Consumer>
            {({ isFetched = false }) => {
                return isFetched ? children : <Loader />;
            }}
        </Consumer>
    );
};

export default AuthLoader;
