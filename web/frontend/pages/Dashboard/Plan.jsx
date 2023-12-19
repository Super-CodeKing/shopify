import { Layout, MediaCard, VideoThumbnail, Text } from "@shopify/polaris";
import { useCallback, useState } from "react";
export default function Plan() {
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
                    Video Guideline
                </Text>
            </div>
            <MediaCard
                title="How to setup Modern Pre Order"
                primaryAction={{
                    content: "Learn more",
                    onAction: () => {},
                }}
                description={`Thank you for installing our app. If you'd like to get familiar with the app and setup, watch our demo video here.`}
                popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
            >
                <VideoThumbnail
                    videoLength={80}
                    thumbnailUrl="https://burst.shopifycdn.com/photos/blank-notebook-on-creative-workspace.jpg?width=1850"
                    onClick={() => console.log("clicked")}
                />
            </MediaCard>
        </Layout.Section>
    );
}
