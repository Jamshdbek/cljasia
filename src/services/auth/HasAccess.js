import React from "react";
import { Consumer } from "context";

const HasAccess = ({ children }) => {
    return (
        <>
            <Consumer>{(props) => children(props)}</Consumer>
        </>
    );
};

export default HasAccess;
