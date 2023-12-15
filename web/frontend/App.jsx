import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
    AppBridgeProvider,
    QueryProvider,
    PolarisProvider,
} from "./components";

export default function App() {
    // Any .tsx or .jsx files in /pages will become a route
    // See documentation for <Routes /> for more info
    const pages = import.meta.globEager(
        "./pages/**/!(*.test.[jt]sx)*.([jt]sx)"
    );
    const { t } = useTranslation();

    return (
        <PolarisProvider>
            <BrowserRouter>
                <AppBridgeProvider>
                    <QueryProvider>
                        <NavigationMenu
                            navigationLinks={[
                                {
                                    label: "Dashboard",
                                    destination: "/",
                                },
                                {
                                    label: "Pre Order",
                                    destination: "/preorder",
                                },
                                {
                                    label: "Coming Soon",
                                    destination: "/coming-soon",
                                },
                                {
                                    label: "Request Stock",
                                    destination: "/request-stock",
                                },
                                {
                                    label: "Stock Counter",
                                    destination: "/stock-counter",
                                },
                                {
                                    label: "Get a Quote",
                                    destination: "/get-quote",
                                },
                                {
                                    label: t("NavigationMenu.pageName"),
                                    destination: "/pagename",
                                },
                            ]}
                        />
                        <Routes pages={pages} />
                    </QueryProvider>
                </AppBridgeProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
}
