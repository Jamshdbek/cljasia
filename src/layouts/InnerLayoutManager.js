import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HomeInnerLayout from "modules/home/layouts/HomeInnerLayout";
import MyUhlInnerLayout from "modules/myuhl/layouts/MyUHLInnerLayout";
import MyemsInnerLayout from "modules/myems/layouts/MyEMSInnerLayout";
import ManagementInnerLayout from "modules/management/layouts/ManagementInnerLayout";
import ServiceInnerLayout from "modules/service/layouts/ServiceInnerLayout";
import DealerInnerLayout from "modules/dealer/layouts/DealerInnerLayout";
import SettingsInnerLayout from "modules/settings/layouts/SettingsInnerLayout";

class LayoutManager extends Component {
    getLayout = (pathname) => {
        if (pathname === "/") {
            return "home";
        }
        if (/^\/email(?=\/|$)/i.test(pathname)) {
            return "email";
        }
        if (/^\/management(?=\/|$)/i.test(pathname)) {
            return "management";
        }
        if (/^\/service(?=\/|$)/i.test(pathname)) {
            return "service";
        }
        if (/^\/dealer(?=\/|$)/i.test(pathname)) {
            return "dealer";
        }
        if (/^\/settings(?=\/|$)/i.test(pathname)) {
            return "settings";
        }

        return "home";
    };

    getLayouts = () => {
        return {
            home: HomeInnerLayout,
            email: MyUhlInnerLayout,
            myems:MyemsInnerLayout,
            management: ManagementInnerLayout,
            service: ServiceInnerLayout,
            dealer: DealerInnerLayout,
            settings: SettingsInnerLayout,
        };
    };

    render() {
        const {
            children,
            location: { pathname },
        } = this.props;
        const Layout = this.getLayouts()[this.getLayout(pathname)];
        return (
            <>
                <Layout>{children}</Layout>
            </>
        );
    }
}

export default withRouter(LayoutManager);
