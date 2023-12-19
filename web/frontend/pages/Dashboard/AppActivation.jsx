import {
    Layout,
    Text,
    Banner,
    Button,
    Collapsible,
    Card,
    Icon,
    Divider,
    ButtonGroup,
} from "@shopify/polaris";
import { ChevronDownMinor, TickMinor } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
export default function AppActivation() {
    const [open, setOpen] = useState(true);
    const handleToggle = useCallback(() => setOpen((open) => !open), []);
    return (
        <Layout.Section variant="oneHalf">
            <div className="mb-3">
                <Text variant="headingLg" as="h5">
                    Initial Setup
                </Text>
            </div>
            <Card>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <Text as="h2" variant="headingSm">
                            Setup guide
                        </Text>

                        <p className="pb-3">
                            Use this personalized guide to set up and running.
                        </p>

                        
                    </div>

                    <ButtonGroup variant="segmented">
                        <Button>Enable Theme Extension</Button>
                        <Button
                            onClick={handleToggle}
                            ariaExpanded={open}
                            ariaControls="basic-collapsible"
                        >
                            Manual Guide
                        </Button>
                    </ButtonGroup>
                </div>
                <Divider />
                <div className="pt-3 flex flex-col items-start">
                    <div className="flex mb-2 [&>span]:text-white [&>span]:bg-black [&>span]:rounded-full [&>span]:mr-2">
                        <Icon source={TickMinor} />
                        <p>
                            Enable the theme extension. Theme extension MUST be
                            active for preorder button to display.
                        </p>
                    </div>

                    <div className="flex mb-2 [&>span]:text-white [&>span]:bg-black [&>span]:rounded-full [&>span]:mr-2">
                        <Icon source={TickMinor} />
                        <p>
                            Add products to the preorder list on the 'preorders'
                            page.
                        </p>
                    </div>

                    <div className="flex [&>span]:text-white [&>span]:bg-black [&>span]:rounded-full [&>span]:mr-2">
                        <Icon source={TickMinor} />
                        <p>Manage your preorders on the 'orders' page.</p>
                    </div>
                </div>
                <Collapsible
                    open={open}
                    id="basic-collapsible"
                    transition={{
                        duration: "500ms",
                        timingFunction: "ease-in-out",
                    }}
                    expandOnPrint
                >
                    <div className="my-3">
                        <Banner onDismiss={() => {}}>
                            <p>
                                If theme app extension could not be enabled
                                automatically, please enable it manually with
                                the following steps:
                            </p>
                            <p className="pt-2">
                                1. From your Shopify admin, go to <strong>Sales Channel
                                > Online store</strong>
                            </p>
                            <p className="pt-2">2. Click on <strong>Customize</strong> button</p>
                            <p className="pt-2">3. Click on <strong>App embeds</strong> tab</p>
                            <p className="pt-2">
                                4. Enable <strong>Pre order</strong> theme extension
                            </p>
                            <p className="pt-2">5. Click on <strong>Save</strong> button</p>
                        </Banner>
                    </div>
                </Collapsible>
            </Card>
        </Layout.Section>
    );
}
