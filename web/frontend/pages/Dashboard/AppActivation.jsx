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
import { CheckIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
export default function AppActivation() {
    const [open, setOpen] = useState(false);
    const handleToggle = useCallback(() => setOpen((open) => !open), []);
    return (
        <Layout.Section>
            <Banner onDismiss={() => {}} 
                tone="info"
                title="Setup guide"
            >
                <div className="flex items-start justify-between">

                    {/* <ButtonGroup variant="segmented">
                        <Button>Enable Theme Extension</Button>
                        <Button
                            onClick={handleToggle}
                            ariaExpanded={open}
                            ariaControls="basic-collapsible"
                        >
                            Manual Guide
                        </Button>
                    </ButtonGroup> */}
                </div>
                
                <div className="flex flex-col items-start">
                    <div className="flex mb-2 [&>span]:text-white [&>span]:bg-black [&>span]:rounded-full [&>span]:mr-2">
                        <Icon source={CheckIcon} />
                        <p>
                            Enable the theme extension. Theme extension MUST be
                            active for preorder button to display.
                        </p>
                    </div>

                    <div className="flex mb-2 [&>span]:text-white [&>span]:bg-black [&>span]:rounded-full [&>span]:mr-2">
                        <Icon source={CheckIcon} />
                        <p>
                            Add products to the preorder list on the 'preorders'
                            page.
                        </p>
                    </div>

                    <div className="flex [&>span]:text-white [&>span]:bg-black [&>span]:rounded-full [&>span]:mr-2">
                        <Icon source={CheckIcon} />
                        <p>Manage your preorders on the 'orders' page.</p>
                    </div>
                </div>


                <div className="flex">
                    <div className="my-3 p-5 bg-slate-100 w-full rounded-lg">
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
            </Banner>
        </Layout.Section>
    );
}
