import React from "react";
import {
    BrowserRouter as WebRouter,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import history from "./history";
import { AuthLoader, IsAuth, IsGuest, HasAccess } from "services/auth";
import {
    ForbiddenPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    MyUHLParcelsPage,
    MyUHLUsersPage,
    MyUHLStatisticsPage,
    MyUHLInspectionsPage,
    MyUHLManifestPage,
    OperatorsPage,
    MeasurementUnitsPage,
    CategoriesPage,
    CountriesPage,
    PricesPage,
    LocationPage,
    // StatusesPage,
    AddOperatorsPage,
    EditOperatorsPage,
    AddMeasurementUnitsPage,
    EditMeasurementUnitsPage,
    AddCategoriesPage,
    EditCategoriesPage,
    AddCountriesPage,
    EditCountriesPage,
    AddPricesPage,
    ShowPricesPage,
    EditPricesPage,
    AddLocationPage,
    EditLocationPage,
    DealerPricePage,
    AddDealerPricePage,
    OrderBoxPage,
    PaymentPage,
    AddMyUHLParcelPage,
    EditMyUHLParcelPage,
    PrentMyUHLInvoicePage,
    ClientCheckPage,
    TaxPage,
    ForgotPasswordPage,
    SetPasswordPage,
    CityDealerPage,
    ShowCityDealerPage,
    SingleMyUHLParcelPage,
    LogoutPage,
    LimitContainerPage,
    EditLimitContainerPage,
    EditDealerContainer,
    // MyEMS
    MyEMSParcelsPage,
    EditMyEMSParcelsPage,
    AddMyEMSParcelPage,
    SingleMyEMSParcelsPage,
    NalogCheckMyemnsPage,
    ClientCheckMyemsPage,
    AllCheckMyemsPage
} from "modules";

import InnerLayoutManager from "../layouts/InnerLayoutManager";
import LayoutManager from "../layouts/LayoutManager";
import MyAccountPage from "modules/settings/pages/MyAccountPage";
import CompanyInfoPage from "modules/settings/pages/CompanyInfoPage";
import PrintManifestPage from "modules/myuhl/pages/PrintManifestPage";
import OnePrintManifestPage from "modules/myuhl/pages/OnePrintManifestPage";

const Router = () => {
    return (
        <WebRouter history={history}>
            <AuthLoader>
                <LayoutManager>
                    <IsAuth>
                        <InnerLayoutManager>
                            <HasAccess>
                                {({ userCan, pages }) => (
                                    <Switch>
                                        <Route
                                            path={"/"}
                                            exact
                                            render={() =>
                                                userCan(pages, "HOME") ? (
                                                    <HomePage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        {/* MyUHL pages */}
                                        <Route
                                            path={["/email", "/email/parcels"]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_PARCELS"
                                                ) ? (
                                                    <MyUHLParcelsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/parcels/add",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_PARCELS_ADD"
                                                ) ? (
                                                    <AddMyUHLParcelPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/parcels/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_PARCELS_EDIT"
                                                ) ? (
                                                    <EditMyUHLParcelPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />

                                        <Route
                                            path={[
                                                "/email",
                                                "/email/parcels/single/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_SINGLE_PARCEL"
                                                ) ? (
                                                    <SingleMyUHLParcelPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/parcels/clientcheck/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_PARCELS_CLIENTCHECK"
                                                ) ? (
                                                    <ClientCheckPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/parcels/tax/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_PARCELS_TAX"
                                                ) ? (
                                                    <TaxPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={["/email", "/email/users"]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_USERS"
                                                ) ? (
                                                    <MyUHLUsersPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/statistics",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_STATISTICS"
                                                ) ? (
                                                    <MyUHLStatisticsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/inspections",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_INSPECTIONS"
                                                ) ? (
                                                    <MyUHLInspectionsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={["/email", "/email/manifest"]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_MANIFEST"
                                                ) ? (
                                                    <MyUHLManifestPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/manifest/print",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_MANIFEST_PRINT"
                                                ) ? (
                                                    <PrintManifestPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/manifest/oneprint",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYUHL_MANIFEST_PRINT"
                                                ) ? (
                                                    <OnePrintManifestPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route path={[
                                            '/email',
                                            '/email/parcels/invoice',]}
                                            exact
                                            render={() => userCan(pages, "MYUHL_INVOICE_PARCEL") ? (
                                                <PrentMyUHLInvoicePage />
                                            ) : (
                                                <ForbiddenPage />
                                            )}
                                        />

                                        {/* MyEMS pages */}
                                        <Route
                                            path={["/myems", "/myems/parcels"]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYEMS_PARCELS"
                                                ) ? (
                                                    <MyEMSParcelsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/email",
                                                "/email/parcels/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYEMS_PARCELS_EDIT"
                                                ) ? (
                                                    <EditMyEMSParcelsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/myems",
                                                "/myems/parcels/single/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYEMS_SINGLE_PARCEL"
                                                ) ? (
                                                    <SingleMyEMSParcelsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/myems",
                                                "/myems/parcels/nalog/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYEMS_PARCELS_NALOG_CHECK"
                                                ) ? (
                                                    <NalogCheckMyemnsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/myems",
                                                "/myems/parcels/check/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYEMS_PARCELS_CLENT_CHECK"
                                                ) ? (
                                                    <ClientCheckMyemsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/myems",
                                                "/myems/parcels/printcheck",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYEMS_PARCELS_ALL_CHECK"
                                                ) ? (
                                                    <AllCheckMyemsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />

                                        <Route
                                            path={[
                                                "/myems",
                                                "/myems/parcels/add"
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MYEMS_PARCELS_ADD"
                                                ) ? (
                                                    <AddMyEMSParcelPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }

                                        />
                                        {/* Management deparments */}

                                        <Route
                                            path={[
                                                "/management",
                                                "/management/operators",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MANAGEMENT_OPERATORS"
                                                ) ? (
                                                    <OperatorsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/management",
                                                "/management/operators/add",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MANAGEMENT_OPERATORS_ADD"
                                                ) ? (
                                                    <AddOperatorsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/management",
                                                "/management/operators/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "MANAGEMENT_OPERATORS_EDIT"
                                                ) ? (
                                                    <EditOperatorsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        {/* Services department pages */}
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/measurementunits",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_MEASUREMENTUNITS"
                                                ) ? (
                                                    <MeasurementUnitsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/measurementunits/add",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_MEASUREMENTUNITS_ADD"
                                                ) ? (
                                                    <AddMeasurementUnitsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/measurementunits/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_MEASUREMENTUNITS_EDIT"
                                                ) ? (
                                                    <EditMeasurementUnitsPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/categories",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_CATEGORIES"
                                                ) ? (
                                                    <CategoriesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/categories/add",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_CATEGORIES_ADD"
                                                ) ? (
                                                    <AddCategoriesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/categories/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_CATEGORIES_EDIT"
                                                ) ? (
                                                    <EditCategoriesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/countries",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_COUNTRIES"
                                                ) ? (
                                                    <CountriesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/countries/add",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_COUNTRIES_ADD"
                                                ) ? (
                                                    <AddCountriesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/countries/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_COUNTRIES_EDIT"
                                                ) ? (
                                                    <EditCountriesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/prices",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_PRICES"
                                                ) ? (
                                                    <PricesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/prices/add",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_PRICES_ADD"
                                                ) ? (
                                                    <AddPricesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/prices/show/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_PRICES_SHOW"
                                                ) ? (
                                                    <ShowPricesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/prices/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_PRICES_EDIT"
                                                ) ? (
                                                    <EditPricesPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/location",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_LOCATION"
                                                ) ? (
                                                    <LocationPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/location/add",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_LOCATION_ADD"
                                                ) ? (
                                                    <AddLocationPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/location/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_LOCATION_EDIT"
                                                ) ? (
                                                    <EditLocationPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/limit",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_LIMIT"
                                                ) ? (
                                                    <LimitContainerPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/service",
                                                "/service/limit/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SERVICE_LIMIT_EDIT"
                                                ) ? (
                                                    <EditLimitContainerPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        {/* Dearls Department Pages */}
                                        <Route
                                            path={[
                                                "/dealer",
                                                "/dealer/dealerprice",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "DEALER_DEALERPRICE"
                                                ) ? (
                                                    <DealerPricePage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/dealer",
                                                "/dealer/dealerprice/citydealer/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "DEALER_DEALERPRICE_CITYDEALER"
                                                ) ? (
                                                    <CityDealerPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/dealer",
                                                "/dealer/dealerprice/citydealer/show/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "DEALER_DEALERPRICE_CITYDEALER_SHOW"
                                                ) ? (
                                                    <ShowCityDealerPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/dealer",
                                                "/dealer/dealerprice/citydealer/edit/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "DEALER_DEALERPRICE_CITYDEALER_EDIT"
                                                ) ? (
                                                    <EditDealerContainer />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/dealer",
                                                "/dealer/dealerprice/add/:id",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "DEALER_DEALERPRICE_ADD"
                                                ) ? (
                                                    <AddDealerPricePage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/dealer",
                                                "/dealer/orderbox",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "DEALER_ORDERBOX"
                                                ) ? (
                                                    <OrderBoxPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/dealer",
                                                "/dealer/payment",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "DEALER_PAYMENT"
                                                ) ? (
                                                    <PaymentPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/settings",
                                                "/settings/profile",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SETTINGS_PROFILE"
                                                ) ? (
                                                    <MyAccountPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={[
                                                "/settings",
                                                "/settings/companyinfo",
                                            ]}
                                            exact
                                            render={() =>
                                                userCan(
                                                    pages,
                                                    "SETTINGS_COMPANY_INFO"
                                                ) ? (
                                                    <CompanyInfoPage />
                                                ) : (
                                                    <ForbiddenPage />
                                                )
                                            }
                                        />
                                        <Route
                                            path={"/logout"}
                                            exact
                                            render={() => <LogoutPage />}
                                        />
                                        <Route
                                            path={"/404"}
                                            exact
                                            component={NotFoundPage}
                                        />
                                        <Redirect to={"/"} />
                                    </Switch>
                                )}
                            </HasAccess>
                        </InnerLayoutManager>
                    </IsAuth>
                    <IsGuest>
                        <Switch>
                            <Route path={"/auth"} exact component={LoginPage} />
                            <Route
                                path={"/auth/forgot-password"}
                                exact
                                component={ForgotPasswordPage}
                            />
                            <Route
                                path={"/auth/set-password/:uid"}
                                exact
                                component={SetPasswordPage}
                            />
                            <Redirect to={"/auth"} />
                        </Switch>
                    </IsGuest>
                </LayoutManager>
            </AuthLoader>
        </WebRouter>
    );
};

export default Router;
