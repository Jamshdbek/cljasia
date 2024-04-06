import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Auth } from "services/auth";
import Theme from "./theme";
import Router from "router";
import store, { persistor } from "app/store";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Auth>
                    <Theme>
                        <Router />
                    </Theme>
                </Auth>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
