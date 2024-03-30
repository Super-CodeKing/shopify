import { Layout, MediaCard, VideoThumbnail, Text, Card } from "@shopify/polaris";
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
        <Layout.Section>
            <div className="mt-7 mb-2">
                <Text variant="headingLg" as="h5">
                    Video Guideline
                </Text>

                <div className="mt-2 flex">
                    <div className="mr-3 flex-1">
                        <Card padding={0}>
                            <div class="relative w-full h-full">
                                <img class="rounded-lg w-full object-cover" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <img class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="https://img.icons8.com/color/60/youtube-play.png" alt="youtube-play" />
                            </div>
                        </Card>
                    </div>

                    <div className="mr-3 flex-1">
                        <Card padding={0}>
                            <div class="relative w-full h-full">
                                <img class="rounded-lg w-full object-cover" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <img class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="https://img.icons8.com/color/60/youtube-play.png" alt="youtube-play" />
                            </div>
                        </Card>
                    </div>

                    <div className="flex-1">
                        <Card padding={0}>
                            <div class="relative w-full h-full">
                                <img class="rounded-lg w-full object-cover" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                <img class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="https://img.icons8.com/color/60/youtube-play.png" alt="youtube-play" />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout.Section>
    );
}
