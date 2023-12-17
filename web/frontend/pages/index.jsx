import {
    Card,
    Page,
    Layout,
    Image,
    Link,
    AccountConnection,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import Analytics from "./Dashboard/Analytics.jsx";
import QuickSetup from "./Dashboard/QuickSetup";
import { useCallback, useState } from "react";

export default function HomePage() {
    const { t } = useTranslation();
    const helpAction = { content: "Help", url: "/help" };
    const [appEmbededActivated, setAppEmbededActivated] = useState(false);
    const accountName = appEmbededActivated ? 'Jane Appleseed' : '';

    const handleAction = useCallback(() => {
      setConnected((appEmbededActivated) => !appEmbededActivated);
    }, []);

    const buttonText = appEmbededActivated ? 'Disconnect' : 'Connect';
    const details = appEmbededActivated ? 'Account connected' : 'No account connected';

    return (
        <Page fullWidth>
            <TitleBar title={t("HomePage.title")} primaryAction={helpAction} />
            <Layout>
                <Layout.Section>
                    <AccountConnection
                        accountName={accountName}
                        connected={appEmbededActivated}
                        title="Embed Modern Pre Order into your Theme"
                        action={{
                            content: buttonText,
                            onAction: handleAction,
                        }}
                        details={details}
                    />
                </Layout.Section>
            </Layout>
            <Analytics />
            <QuickSetup />
        </Page>
    );
}
