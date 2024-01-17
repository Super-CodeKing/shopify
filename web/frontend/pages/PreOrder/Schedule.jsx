import {
    BlockStack,
    Button,
    Card,
    Divider,
    Checkbox,
    Text,
    Toast,
    Frame,
    Page,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks";

export default function Schedule() {
    const fetch = useAuthenticatedFetch();

    const [isPreOrderActive, setIsPreOrderActive] = useState(true);
    const [checkedProductPage, setCheckedProductPage] = useState(true);
    const [checkedCollectionPage, setCheckedCollectionPage] = useState(false);
    const [toastActive, setToastActive] = useState(false);

    const changePreOrderStatus = () => setIsPreOrderActive(!isPreOrderActive);
    const activeOnProductPage = () => setCheckedProductPage(!checkedProductPage);
    const activeOnCollectionPage = () => setCheckedCollectionPage(!checkedCollectionPage);

    const toggleToastActive = useCallback(() => setToastActive((toastActive) => !toastActive),[]);

    const toastMarkup = toastActive ? (
        <Toast content="Schedule Data Saved Successfully!" onDismiss={toggleToastActive} />
    ) : null;

    const setActivationData = (preOrderInitData) => {
        let activation = preOrderInitData.active === 1 ? true : false;
        setIsPreOrderActive(activation);

        let poc = preOrderInitData.active_on_collection;
        let pop = preOrderInitData.active_on_product;

        if (poc === 1 && pop === 1) {
            setCheckedProductPage(true);
            setCheckedCollectionPage(true);
        } else if (poc === 1 && pop === 0) {
            setCheckedProductPage(false);
            setCheckedCollectionPage(true);
        } else if (poc === 0 && pop === 1) {
            setCheckedProductPage(true);
            setCheckedCollectionPage(false);
        } else {
            setCheckedProductPage(false);
            setCheckedCollectionPage(false);
        }
    };

    const getPreOrderInitSettings = async () => {
        const response = await fetch("/api/preorder/init");

        if (response.ok) {
            const preOrderInitData = await response.json();
            console.log("Get Pre Order Init Data ", preOrderInitData);
            setActivationData(preOrderInitData);
        } else {
            console.log("Error in Activaing Pre Order: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    const savePreOrderInitActivation = async () => {
        const formData = new FormData();
        formData.append("active", isPreOrderActive);
        formData.append("active_on_product", checkedProductPage);
        formData.append("active_on_collection", checkedCollectionPage);

        const response = await fetch("/api/preorder/save", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            toggleToastActive(true);
            getPreOrderInitSettings();
        }
    };

    useEffect(() => {
        getPreOrderInitSettings();
    }, []);

    return (
        <>
            <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Schedule for Pre Order
                    </Text>
                    <Divider borderColor="border" />
                    <Card>
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <Text variant="headingMd" as="h5">
                                    Activation Status
                                </Text>
                                <p>
                                    Current Status:{" "}
                                    {isPreOrderActive && (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ml-1">
                                            On
                                        </span>
                                    )}
                                    {!isPreOrderActive && (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ml-1">
                                            Off
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="ml-auto">
                                {isPreOrderActive && (
                                    <Button
                                        variant="primary"
                                        tone="critical"
                                        onClick={() => changePreOrderStatus()}
                                    >
                                        Deactive
                                    </Button>
                                )}
                                {!isPreOrderActive && (
                                    <Button
                                        variant="primary"
                                        onClick={() => changePreOrderStatus()}
                                    >
                                        Active
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center">
                            <div className="flex flex-col w-full">
                                <div>
                                    <Text variant="headingMd" as="h6">
                                        Where to show
                                    </Text>
                                    <Text>
                                        You will be able to active this on Product
                                        page and Collection page.{" "}
                                    </Text>
                                    <div className="mt-3 mb-2">
                                        <Divider borderColor="border" />
                                    </div>
                                </div>
                                <div className="mt-1 flex flex-col">
                                    <div className="pb-1">
                                        <Checkbox
                                            label="Product Page"
                                            checked={checkedProductPage}
                                            onChange={() => activeOnProductPage()}
                                        />
                                    </div>

                                    <Checkbox
                                        label="Collection Page"
                                        checked={checkedCollectionPage}
                                        onChange={() => activeOnCollectionPage()}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </BlockStack>
                <div className="mt-3">
                    <Button
                        variant="primary"
                        size="large"
                        onClick={() => savePreOrderInitActivation()}
                    >
                        Save
                    </Button>
                    <Frame>{toastMarkup}</Frame>
                </div>
            </Page>
        </>
    );
}
