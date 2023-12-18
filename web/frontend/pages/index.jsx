import {
    Page,
    Layout,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import Analytics from "./Dashboard/Analytics.jsx";
import QuickSetup from "./Dashboard/QuickSetup";
import AppActivation from "./Dashboard/AppActivation";
import Plan from "./Dashboard/Plan";

export default function HomePage() {
    const { t } = useTranslation();
    const helpAction = { content: "Help", url: "/help" };
    return (
        <Page fullWidth>
            <TitleBar title={t("HomePage.title")} primaryAction={helpAction} />
            <Layout>
                <AppActivation />
                <Plan />
            </Layout>
            <Analytics />
            <QuickSetup />
        </Page>
    );
}
