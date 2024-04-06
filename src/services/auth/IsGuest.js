import { Consumer } from "context";

const IsGuest = ({ children }) => {
    return (
        <>
            <Consumer>
                {({ isAuthenticated = false }) => {
                    return !isAuthenticated ? children : null;
                }}
            </Consumer>
        </>
    );
};

export default IsGuest;
