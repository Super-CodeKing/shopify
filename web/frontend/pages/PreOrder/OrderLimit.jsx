import {
    Badge,
    BlockStack,
    Card,
    IndexTable,
    Text,
    useBreakpoints,
    useIndexResourceState,
    Divider,
    Button,
} from "@shopify/polaris";

export default function OrderLimit() {
    return (
        <>
            <BlockStack gap="500">
                <Text variant="headingXl" as="h4">
                    Pre Order Limit
                </Text>

                <Divider borderColor="border" />
                <Card>
                    <Text as="h2" variant="bodyMd">
                        Content inside a card
                    </Text>
                </Card>
            </BlockStack>
        </>
    );
}
