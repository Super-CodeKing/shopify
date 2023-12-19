import { Page, Layout, Text, Divider } from "@shopify/polaris";
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
            <div className="pb-3">
                <Text variant="heading2xl" as="h3">
                    Welcome to Pre Order of Deque Lab
                </Text>
            </div>
            <Divider />
            <div className="my-5">
                <Layout>
                    <AppActivation />
                    <Plan />
                </Layout>
                <Analytics />
                <QuickSetup />
            </div>
        </Page>
    );
}
