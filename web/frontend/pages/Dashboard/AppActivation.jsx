import {
    Layout,
    Text,
    AccountConnection,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
export default function AppActivation() {
    const [appEmbededActivated, setAppEmbededActivated] = useState(false);
    const accountName = appEmbededActivated ? "Jane Appleseed" : "";

    const handleAction = useCallback(() => {
        setAppEmbededActivated((appEmbededActivated) => !appEmbededActivated);
    }, []);

    const buttonText = appEmbededActivated ? "Disconnect" : "Connect";
    const details = appEmbededActivated
        ? "Account connected"
        : "No account connected";
    return (
        <Layout.Section variant="oneHalf">
            <div className="mb-3">
                <Text variant="headingLg" as="h5">
                    App Activation
                </Text>
            </div>
            <AccountConnection
                accountName={accountName}
                connected={appEmbededActivated}
                title="Current Status"
                action={{
                    content: buttonText,
                    onAction: handleAction,
                }}
            />
        </Layout.Section>
    );
}
