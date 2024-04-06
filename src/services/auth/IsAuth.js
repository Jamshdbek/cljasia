import { Consumer } from "context";

const IsAuth = ({ children }) => {
    return (
        <>
            <Consumer>
                {({ isAuthenticated = false }) => {
                    return isAuthenticated ? children : null;
                }}
            </Consumer>
        </>
    );
};

export default IsAuth;
