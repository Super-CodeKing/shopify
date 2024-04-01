import { useNavigate, TitleBar, Loading, useNavigationHistory } from "@shopify/app-bridge-react";
import { Card, Button, Grid, Page, Text } from "@shopify/polaris";
import { useEffect, useState } from "react";
import Switch from "../../components/Switch";
import { useAuthenticatedFetch } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setQuickStartData } from "../../store/reducers/Dashboard";

export default function QuickSetup() {

    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const quickStartRedux = useSelector((state) => state.dashboard.quickStart);

    const [quickStart, setQuickStart] = useState(null);
    const { push } = useNavigationHistory();
    const navigate = useNavigate();
    const changeQuickSetup = (active) => {
        setQuickStart(active);
        saveQuickStart(active)
    }

    const getQuickStarts = async () => {
        const response = await fetch("/api/quick-start");
        if (response.ok) {
            const data = await response.json();

            if(data?.pre_order === 1) {
                setQuickStart('pre-order')
                dispatch(setQuickStartData('pre-order'));
            } else if(data?.coming_soon === 1) {
                setQuickStart('coming-soon');
                dispatch(setQuickStartData('coming-soon'));
            } else if(data?.request_stock === 1) {
                setQuickStart('request-stock');
                dispatch(setQuickStartData('request-stock'));
            }
            
        } else {
            // setLoading(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    }

    const saveQuickStart = async (quickStartValue) => {
   
        let preOrder = 0;
        let comingSoon = 0;
        let requestStock = 0;

        if(quickStartValue === 'pre-order') {
            preOrder = 1;
            comingSoon = 0;
            requestStock = 0;
        } else if(quickStartValue === 'coming-soon') {
            preOrder = 0;
            comingSoon = 1;
            requestStock = 0;
        } else if(quickStartValue === 'request-stock') {
            preOrder = 0;
            comingSoon = 0;
            requestStock = 1;
        }

        const formData = new FormData();
        formData.append("pre_order", preOrder);
        formData.append("coming_soon", comingSoon);
        formData.append("request_stock", requestStock);

        const response = await fetch("/api/quick-start", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            setToastProps({
                content: "Something went wrong!",
                error: true,
            });
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastProps({
                content: "Quick Start Activated!"
            });
        }
    }

    const handleDetailSetup = (page) => {
        push({ pathname: "/" + page });
        navigate("/" + page);
    };

    useEffect(() => {
        if(quickStartRedux == null)
        getQuickStarts();
        else setQuickStart(quickStartRedux);
    }, [])
    return (
        <>
            <div className="mb-3">
                <Text variant="headingLg" as="h5">
                    Quick Start
                </Text>
                <Text>
                    If you want to setup product wise, then you have to go every details page.
                </Text>
            </div>
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                        <div className="flex flex-col">
                            <div className="flex justify-between w-full items-center">
                                <Text variant="headingMd" as="h2">
                                    Pre Order
                                </Text>
                                <Switch checked={quickStart === 'pre-order'}
                                onChange={() => {
                                    const newQuickStart = quickStart === 'pre-order' ? null : 'pre-order';
                                    changeQuickSetup(newQuickStart);
                                }} />
                            </div>
                            <div className="flex mt-2 items-center">
                                <div className="flex-1 ml-auto">
                                    <Button fullWidth onClick={() => handleDetailSetup('preorder')}>
                                        Details Settings
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                        <div className="flex flex-col">
                            <div className="flex w-full items-center justify-between">
                                <Text variant="headingMd" as="h2">
                                    Coming Soon
                                </Text>

                                <Switch checked={quickStart === 'coming-soon' ? true: false}
                                onChange={() => {
                                    const newQuickStart = quickStart === 'coming-soon' ? null : 'coming-soon';
                                    changeQuickSetup(newQuickStart);
                                }} />
                            </div>
                            
                            <div className="flex mt-2 items-center">
                                <div className="flex-1 ml-auto">
                                    <Button fullWidth onClick={() => handleDetailSetup('comingsoon')}>
                                        Details Settings
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                        <div className="flex flex-col">
                            <div className="flex w-full items-center justify-between">
                                <Text variant="headingMd" as="h2">
                                    Request Stock
                                </Text>
                                <Switch checked={quickStart === 'request-stock' ? true: false}
                                onChange={() => {
                                    const newQuickStart = quickStart === 'request-stock' ? null : 'request-stock';
                                    changeQuickSetup(newQuickStart);
                                }} />
                            </div>
                            
                            <div className="mt-2">
                                <div className="flex-1 ml-auto">
                                    <Button fullWidth onClick={() => handleDetailSetup('requeststock')}>
                                        Details Settings
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid.Cell>
                
            </Grid>
        </>
    );
}
