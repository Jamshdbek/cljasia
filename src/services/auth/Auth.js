import { Provider } from "context";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { hasAccess } from "utils";

const Auth = ({ children }) => {
    const userData = useSelector((store) => store.auth.user);
    return (
        <Provider
            value={{
                isAuthenticated: get(userData, "isAuthenticated", false),
                isFetched: get(userData, "isFetched", false),
                user: {},
                isAdmin: get(userData, "token.data.isAdmin", false),
                departments: [
                    { name: "HOME" },
                    { name: "LOGIN" },
                    { name: "MYUHL" },
                    { name: "MYEMS" },
                    { name: "MANAGEMENT" },
                    { name: "SERVICE" },
                    { name: "DEALER" },
                    { name: "PROFILE" },
                ],
                pages: [
                    { name: "HOME" },
                    { name: "LOGIN" },
                    // MyUHL PAGES
                    { name: "MYUHL_PARCELS" },
                    { name: "MYUHL_PARCELS_ADD" },
                    { name: "MYUHL_PARCELS_EDIT" },
                    { name: "MYUHL_PARCELS_CLIENTCHECK" },
                    { name: "MYUHL_PARCELS_TAX" },
                    { name: "MYUHL_USERS" },
                    { name: "MYUHL_STATISTICS" },
                    { name: "MYUHL_INSPECTIONS" },
                    { name: "MYUHL_MANIFEST" },
                    { name: "MYUHL_MANIFEST_PRINT" },
                    { name: "MYUHL_SINGLE_PARCEL" },
                    { name: "MYUHL_INVOICE_PARCEL" },
                    //MyEMS PAGES
                    { name: "MYEMS_PARCELS" },
                    { name: "MYEMS_SINGLE_PARCEL" },
                    { name: "MYEMS_PARCELS_EDIT" },
                    { name: "MYEMS_PARCELS_ADD" },
                    { name: "MYEMS_PARCELS_CLENT_CHECK" },
                    { name: "MYEMS_PARCELS_NALOG_CHECK" },
                    { name: "MYEMS_PARCELS_ALL_CHECK" },
                    // MANAGEMENT PAGES
                    { name: "MANAGEMENT_CATEGORYACCOUNTS" },
                    { name: "MANAGEMENT_CATEGORYACCOUNTS_ADD" },
                    { name: "MANAGEMENT_OPERATORS" },
                    { name: "MANAGEMENT_OPERATORS_ADD" },
                    { name: "MANAGEMENT_OPERATORS_EDIT" },

                    // SERVICE PAGES
                    { name: "SERVICE_MEASUREMENTUNITS" },
                    { name: "SERVICE_MEASUREMENTUNITS_ADD" },
                    { name: "SERVICE_MEASUREMENTUNITS_EDIT" },
                    { name: "SERVICE_CATEGORIES" },
                    { name: "SERVICE_CATEGORIES_ADD" },
                    { name: "SERVICE_CATEGORIES_EDIT" },
                    { name: "SERVICE_COUNTRIES" },
                    { name: "SERVICE_COUNTRIES_ADD" },
                    { name: "SERVICE_COUNTRIES_EDIT" },
                    { name: "SERVICE_PRICES" },
                    { name: "SERVICE_PRICES_ADD" },
                    { name: "SERVICE_PRICES_SHOW" },
                    { name: "SERVICE_PRICES_EDIT" },
                    { name: "SERVICE_LOCATION" },
                    { name: "SERVICE_LOCATION_ADD" },
                    { name: "SERVICE_LOCATION_EDIT" },
                    { name: "SERVICE_LIMIT" },
                    { name: "SERVICE_LIMIT_EDIT" },

                    // DEALERS PAGES
                    { name: "DEALER_DEALERPRICE" },
                    { name: "DEALER_DEALERPRICE_ADD" },
                    { name: "DEALER_DEALERPRICE_CITYDEALER" },
                    { name: "DEALER_DEALERPRICE_CITYDEALER_SHOW" },
                    { name: "DEALER_DEALERPRICE_CITYDEALER_EDIT" },
                    { name: "DEALER_ORDERBOX" },
                    { name: "DEALER_PAYMENT" },

                    // SETTINGS PAGES
                    { name: "SETTINGS_PROFILE" },
                    { name: "SETTINGS_COMPANY_INFO" },
                ],
                permissions: [],
                userCan: (items = [], can = "") => {
                    return hasAccess(items, can);
                },
            }}
        >
            {children}
        </Provider>
    );
};

export default Auth;
