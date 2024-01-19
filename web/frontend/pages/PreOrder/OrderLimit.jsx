import {
    Page,
    BlockStack,
    Card,
    Toast,
    Text,
    useBreakpoints,
    Frame,
    Divider,
    Button,
    Banner,
    ChoiceList,
    TextField,
    List,
    Bleed,
    Box
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { useAuthenticatedFetch } from "../../hooks";
export default function OrderLimit() {
    const fetch = useAuthenticatedFetch();
    const [toastActive, setToastActive] = useState(false);
    const [limitSelected, setLimitSelected] = useState(['daily-limit']);
    const handleChoiceListChange = useCallback((value) => setLimitSelected(value),[]);
    const [preOrderDailyLimit, setPreOrderDailyLimit] = useState(0);
    const [preOrderTotalLimit, setPreOrderTotalLimit] = useState(0);
    const handleDailyLimitChange = useCallback((value) => setPreOrderDailyLimit(value),[]);
    const handleTotalLimitChange = useCallback((value) => setPreOrderTotalLimit(value),[]);

    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        []
    );

    const toastMarkup = toastActive ? (
        <Toast content="Order Limit Saved Successfully!" onDismiss={toggleToastActive} />
    ) : null;

    const renderChildrenDailyLimit = useCallback(
        (isSelected) =>
          isSelected && (
            <TextField
              label="Minimum Quantity"
              labelHidden
              value={preOrderDailyLimit}
              onChange={handleDailyLimitChange}
              autoComplete="off"
            />
          ),
        [handleDailyLimitChange, preOrderDailyLimit],
      );

    const renderChildrenTotalLimit = useCallback(
        (isSelected) =>
            isSelected && (
            <TextField
                label="Minimum Quantity"
                labelHidden
                value={preOrderTotalLimit}
                onChange={handleTotalLimitChange}
                autoComplete="off"
            />
            ),
        [handleTotalLimitChange, preOrderTotalLimit],
    );

    const getPreOrderLimitSettings = async () => {
        const response = await fetch("/api/preorder/limit");
        if (response.ok) {
            const preOrderLimitSettings = await response.json();
            if(preOrderLimitSettings === "no-limit" ) {
                setLimitSelected(["no-limit"]);
            } else {
                const settings = JSON.parse(preOrderLimitSettings.limit);
                if(settings.type[0] === 'daily-limit') {
                    setLimitSelected(["daily-limit"]);
                    setPreOrderDailyLimit(Number(settings.daily_limit))
                } else if(settings.type[0] === 'total-limit') {
                    setLimitSelected(["total-limit"]);
                    setPreOrderTotalLimit(Number(settings.total_limit))
                }
            }
        } else {
            console.log("Error in Activaing Pre Order: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    }

    const savePreOrderLimit = async () => {
        const formData = new FormData();
        const limit = JSON.stringify({
            'type': limitSelected,
            'daily_limit': preOrderDailyLimit,
            'total_limit': preOrderTotalLimit
        })
        formData.append("limit", limit);

        const response = await fetch("/api/preorder/limit", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            toggleToastActive(true);
            getPreOrderLimitSettings();
        }
    }

    useEffect(() => {
        getPreOrderLimitSettings()
    }, [])
    return (
        <div className="orderlimit [&>div>div]:pt-0">
            <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Order Limit
                    </Text>
                    <Divider borderColor="border" />
                    <div className="">
                        <Card padding={0}>
                            <div className="pb-3 pt-5 px-5">
                                <Text variant="headingMd" as="h6">Select Limit</Text>
                                <Text>Best way to set a regular limit for all products. Then if you need to change then do it on product setup page.</Text>
                            </div>
                            <div className="mt-0 w-1/2 px-5">
                                
                                <ChoiceList
                                    title="Select Limit"
                                    titleHidden
                                    choices={[
                                        {
                                            label: 'No Limit', 
                                            value: 'no-limit'
                                        },
                                        {
                                            label: 'Daily Limit', 
                                            value: 'daily-limit',
                                            renderChildren: renderChildrenDailyLimit
                                        },
                                        {
                                            label: 'Total Limit', 
                                            value: 'total-limit',
                                            renderChildren: renderChildrenTotalLimit
                                        },
                                    ]}
                                    selected={limitSelected}
                                    onChange={handleChoiceListChange}
                                />
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
                                        <List.Item><strong>Daily Limit:</strong> Cap daily pre-orders to protect inventory.</List.Item>
                                        <List.Item><strong>Total Limit:</strong> Overall pre orders to maintain inventory</List.Item>
                                    </List>
                                    </BlockStack>
                                </Box>
                            </div>
                        </Card>
                    </div>
                </BlockStack>
                <div className="mt-3">
                    <Button
                        variant="primary"
                        size="large"
                        onClick={() => savePreOrderLimit()}
                    >
                        Save
                    </Button>
                    <Frame>{toastMarkup}</Frame>
                </div>
            </Page>
        </div>
    );
}
