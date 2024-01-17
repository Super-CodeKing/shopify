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
    Form,
    FormLayout,
    TextField,
    Box,
    List
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks";

export default function Schedule() {
    const fetch = useAuthenticatedFetch();
    const today = new Date();

    const [isPreOrderActive, setIsPreOrderActive] = useState(true);
    const [checkedProductPage, setCheckedProductPage] = useState(true);
    const [checkedCollectionPage, setCheckedCollectionPage] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const [editStartDate, setEditStartDate] = useState(today);
    const [editEndDate, setEditEndDate] = useState(
        new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    );
    const [hasEndDate, setHasEndDate] = useState(true);
    const [hasRestockDate, setHasRestockDate] = useState(false)

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
                    <Card padding={0}>
                        <div className="pb-3 pt-5 px-5">
                            <Text variant="headingMd" as="h6">Pre Order Start, End & Restock Date</Text>
                            <Text>Best way to set a start and end date for all products. Then if you need to change then do it on product setup page.</Text>
                        </div>
                        <div className="pb-3 pt-3 px-5">
                            <Form>
                                <FormLayout>

                                    <div className="flex">
                                        <div className="flex-1 mr-3">
                                            <TextField
                                                label="Start Date"
                                                type="date"
                                                value={editStartDate
                                                    .toISOString()
                                                    .slice(0, 10)}
                                                onChange={(e) =>
                                                    changeEditStartDate(e)
                                                }
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextField
                                                label="End Date"
                                                type="date"
                                                value={editEndDate
                                                    .toISOString()
                                                    .slice(0, 10)}
                                                onChange={(e) =>
                                                    changeEditEndDate(e)
                                                }
                                                disabled={hasEndDate}
                                            />
                                            <Checkbox
                                                label="No End Date"
                                                checked={hasEndDate}
                                                onChange={() =>
                                                    setHasEndDate(!hasEndDate)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1 mr-3">
                                            <TextField
                                                label="Estimated Restock Date"
                                                type="date"
                                                value={editStartDate
                                                    .toISOString()
                                                    .slice(0, 10)}
                                                onChange={(e) =>
                                                    changeEditStartDate(e)
                                                }
                                                disabled={hasRestockDate}
                                            />
                                            <Checkbox
                                                label="No Restock Date"
                                                checked={hasRestockDate}
                                                onChange={() =>
                                                    setHasRestockDate(!hasRestockDate)
                                                }
                                            />
                                        </div>
                                        <div className="flex-1">
                                        </div>
                                    </div>
                                </FormLayout>
                            </Form>
                        </div>
                        <div className="mt-5">
                            <Box
                                background="bg-surface-secondary"
                                paddingBlock="300"
                                paddingInline="600"
                            >
                                <BlockStack gap="200">
                                <Text as="h3" variant="headingSm" fontWeight="medium">
                                    Note
                                </Text>
                                <List>
                                    <List.Item><strong>Start Date:</strong> When you want to take pre orders.</List.Item>
                                    <List.Item><strong>End Date:</strong> When you want to stop taking pre orders.</List.Item>
                                    <List.Item><strong>Restock Date:</strong> When you will be able to deliver or restock those products.</List.Item>
                                </List>
                                </BlockStack>
                            </Box>
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
