import {
    Badge,
    BlockStack,
    Card,
    IndexTable,
    Text,
    useBreakpoints,
    Page,
    Divider,
    Button,
} from "@shopify/polaris";

export default function DisplayMessage() {
    return (
        <div className="display-message [&>div>div]:pt-0">
            <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Display Message on Product Page
                    </Text>
                    <Divider borderColor="border" />
                    <Card>
                        <Text variant="headingMd" as="h6">Select Template</Text>
                        <Text>We have provided some templates for your quick start.</Text>
                    </Card>
                    <Card>
                        <Text variant="headingMd" as="h6">Design your own</Text>
                        <Text>Best way to build it based on your business demand.</Text>
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
                </div>
            </Page>
        </div>
    );
}
