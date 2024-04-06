import React from "react";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";
import logo from "assets/images/icons/logo.svg";
import { useEffect } from "react";

const App = () => {
    const notify = () => toast.success("Works");
    return (
        <div >
            <p>Cljasia</p>
            <button onClick={notify}></button>
            <ReactSVG src={logo} />
        </div>
    );
};

export default App;
