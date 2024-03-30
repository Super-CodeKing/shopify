import { Card, Grid, Text } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setCountComingSoon, setCountPreOrder, setCountRequestStock } from "../../store/reducers/Dashboard";
import { useEffect, useState } from "react";

export default function Analytics() {

    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const [preOrder, setPreOrder] = useState(0);
    const [comingSoon, setComingSoon] = useState(0);
    const [requestStock, setRequestStock] = useState(0);

    const countPreOrderRedux = useSelector((state) => state.dashboard.countPreOrder);
    const countComingSoonRedux = useSelector((state) => state.dashboard.countComingSoon);
    const countRequestStockRedux = useSelector((state) => state.dashboard.countRequestStock);
    
    const setCountSummary = () => {
        setPreOrder(countPreOrderRedux);
        setComingSoon(countComingSoonRedux);
        setRequestStock(countRequestStockRedux);
    }
    
    const getDashboardSummary = async () => {
        const response = await fetch("/api/summary");

        if (response.ok) {
            const summary = await response.json();
            
            dispatch(setCountPreOrder(summary.pre_order));
            dispatch(setCountComingSoon(summary.coming_soon));
            dispatch(setCountRequestStock(summary.request_stock));

            setCountSummary();
        }
        else {
            throw new Error(`HTTP error ${response.status}`);
        }
    }

    useEffect(() => {
        if(countPreOrderRedux === null && countComingSoonRedux === null && countRequestStockRedux === null)
        getDashboardSummary();
        else
        setCountSummary()
    })
    return (
        <>
            <div className="mt-7 mb-2">
                <Text variant="headingLg" as="h5">
                    Summary
                </Text>
            </div>
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                        <div className="flex">
                            <div className="flex w-full items-center">
                                <div className="flex flex-col">
                                    <Text variant="headingMd" as="h2">
                                        Pre Order
                                    </Text>
                                    <Text variant="heading2xl" as="h2">
                                        {preOrder}
                                    </Text>
                                </div>
                                <img
                                    className="ml-auto"
                                    width="48"
                                    height="48"
                                    src="https://img.icons8.com/external-flaticons-flat-flat-icons/48/external-pre-order-gaming-ecommerce-flaticons-flat-flat-icons.png"
                                    alt="external-pre-order-gaming-ecommerce-flaticons-flat-flat-icons"
                                />
                            </div>
                        </div>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                        <div className="flex">
                            <div className="flex w-full items-center">
                                <div className="flex flex-col">
                                    <Text variant="headingMd" as="h2">
                                        Coming Soon
                                    </Text>
                                    <Text variant="heading2xl" as="h2">
                                        {comingSoon}
                                    </Text>
                                </div>
                                <img
                                    className="ml-auto"
                                    width="48"
                                    height="48"
                                    src="https://img.icons8.com/papercut/48/future.png"
                                    alt="Coming Soon"
                                />
                            </div>
                        </div>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                        <div className="flex">
                            <div className="flex w-full items-center">
                                <div className="flex flex-col">
                                    <Text variant="headingMd" as="h2">
                                        Request Stock
                                    </Text>
                                    <Text variant="heading2xl" as="h2">
                                        {requestStock}
                                    </Text>
                                </div>
                                <img
                                    className="ml-auto"
                                    width="48"
                                    height="48"
                                    src="https://img.icons8.com/ultraviolet/48/add-property.png"
                                    alt="add-property"
                                />
                            </div>
                        </div>
                    </Card>
                </Grid.Cell>
            </Grid>
        </>
    );
}
