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
import SkeletonOrderLimit from "./Skeleton/OrderLimit";
import { useDispatch, useSelector } from "react-redux";
import { setPreOrderLimit } from "../../store/reducers/PreOrder";
export default function OrderLimit() {

    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const preOrderLimitRedux = useSelector((state) => state.preorder.preOrderLimit);
    const [loading, setLoading] = useState(false);

    const [toastActive, setToastActive] = useState(false);
    const [limitSelected, setLimitSelected] = useState(['daily-limit']);
    const handleChoiceListChange = useCallback((value) => {
        setLimitSelected(value);
    },[]);
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

    const setOrderLimitData = (data) => {
        if(data.type[0] === "no-limit" ) {
            setLimitSelected(["no-limit"]);
            setPreOrderTotalLimit(0);
            setPreOrderDailyLimit(0);
        }
        else if(data.type[0] === 'daily-limit') {
            setLimitSelected(["daily-limit"]);
            setPreOrderDailyLimit(Number(data.daily_limit))
            setPreOrderTotalLimit(0)
        }
        else if(data.type[0] === 'total-limit') {
            setLimitSelected(["total-limit"]);
            setPreOrderDailyLimit(0);
            setPreOrderTotalLimit(Number(data.total_limit))
        }
    }

    const isDataChanged = useCallback(() => {
        let flagLimitSelected = false;
        let flagDailyLimit = false;
        let flagTotalLimit = false;

        if(Object.keys(preOrderLimitRedux).length !== 0)
        {
            if(limitSelected[0] != preOrderLimitRedux.type[0]) flagLimitSelected = true;
            if(preOrderDailyLimit != preOrderLimitRedux.daily_limit) flagDailyLimit = true;
            if(preOrderTotalLimit != preOrderLimitRedux.total_limit) flagTotalLimit = true;
        }
        if(flagLimitSelected || flagDailyLimit || flagTotalLimit) {
            return true;
        }
        return false;
    }, [limitSelected, preOrderDailyLimit, preOrderTotalLimit, preOrderLimitRedux]);

    const getPreOrderLimitSettings = async () => {
        const response = await fetch("/api/preorder/limit");
        if (response.ok) {
            const preOrderLimitSettings = await response.json();
            const settings = JSON.parse(preOrderLimitSettings?.limit);
            dispatch(setPreOrderLimit({
                'type': settings.type,
                'daily_limit': settings.daily_limit,
                'total_limit': settings.total_limit
            }));
            setOrderLimitData(settings);
            setLoading(false)
        } else {
            setLoading(false);
            console.log("Error in Activaing Pre Order: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    }

    const savePreOrderLimit = async () => {
        setLoading(true);

        const formData = new FormData();
        let limit = {};

        if(limitSelected[0] === 'no-limit') {
            limit = JSON.stringify({
                'type': ['no-limit'],
                'daily_limit': 0,
                'total_limit': 0
            });
        }

        else if(limitSelected[0] === 'daily-limit') {
            limit = JSON.stringify({
                'type': ['daily-limit'],
                'daily_limit': preOrderDailyLimit,
                'total_limit': 0
            });
        }

        else if(limitSelected[0] === 'total-limit') {
            limit = JSON.stringify({
                'type': ['total-limit'],
                'daily_limit': 0,
                'total_limit': preOrderTotalLimit
            });
        }
        formData.append("limit", limit);

        const response = await fetch("/api/preorder/limit", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            setLoading(false);
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            toggleToastActive(true);
            getPreOrderLimitSettings();
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true)
        if(Object.keys(preOrderLimitRedux).length === 0) getPreOrderLimitSettings();
        else {
            console.log("Inside useEffect: ");
            console.log(preOrderLimitRedux);
            setOrderLimitData(preOrderLimitRedux);
            setLoading(false);
        };
    }, []);

    return (
        <div className="orderlimit [&>div>div]:pt-0">
            {loading === true && <SkeletonOrderLimit title="Order Limit Settings" />}
            {loading === false && <Page fullWidth>
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
                        disabled={!isDataChanged()}
                        onClick={() => savePreOrderLimit()}
                    >
                        Save
                    </Button>
                    <Frame>{toastMarkup}</Frame>
                </div>
            </Page>}
        </div>
    );
}
