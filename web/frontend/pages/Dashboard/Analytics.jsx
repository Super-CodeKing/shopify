import { Card, Grid, Text } from "@shopify/polaris";

export default function Analytics() {
    return (
        <>
            <div className="mb-3 pt-7">
                <Text variant="headingLg" as="h5">
                    Analytics
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
                                        0
                                    </Text>
                                    <p>Last 30 days</p>
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
                                        Get a Quote
                                    </Text>
                                    <Text variant="heading2xl" as="h2">
                                        0
                                    </Text>
                                    <p>Last 30 days</p>
                                </div>
                                <img
                                    className="ml-auto"
                                    width="48"
                                    height="48"
                                    src="https://img.icons8.com/fluency/48/quote.png"
                                    alt="Get a Quote"
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
                                        0
                                    </Text>
                                    <p>Last 30 days</p>
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
