import { useNavigate, TitleBar, Loading, useNavigationHistory } from "@shopify/app-bridge-react";
import { Card, Button, Grid, Page, Text } from "@shopify/polaris";
import { useState } from "react";
import Switch from "../../components/Switch";

export default function QuickSetup() {
    const [quickStart, setQuickStart] = useState(null);
    const { push } = useNavigationHistory();
    const navigate = useNavigate();
    const changeQuickSetup = (active) => {
        setQuickStart(active);
    }

    const handleDetailSetup = (page) => {
        push({ pathname: "/" + page });
        navigate("/" + page);
    };
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
