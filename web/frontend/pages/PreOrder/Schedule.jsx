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

export default function Schedule() {
    return (
        <>
            <BlockStack gap="500">
                <Text variant="headingXl" as="h4">
                    Pre Order Schedule Settings
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
