import {
    SkeletonPage,
    Page,
    Layout,
    Card,
    SkeletonBodyText,
    SkeletonThumbnail,
    BlockStack,
    Text,
    Button,
} from "@shopify/polaris";

export default function ProductsTableSkeleton({ title, has_button, button_title }) {
    const elements = Array.from({ length: 5 });
    return (
        <Page fullWidth>
            <BlockStack gap="500">
                <div class="container mx-auto">
                    <div class="flex items-center justify-between mb-5">
                        <Text variant="headingXl" as="h4">
                            {title}
                        </Text>
                        {has_button && <Button variant="primary">{button_title}</Button>}
                    </div>

                    <hr class="border-t border-gray-200 mb-5" />

                    <div class="bg-white p-4 rounded-lg shadow">
                        <div class="animate-pulse">
                            <div class="flex mb-3">
                                <div class="h-7 w-10 bg-gray-300 rounded mr-3"></div>
                                <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                <div class="h-7 w-1/6 bg-gray-300 rounded"></div>
                            </div>

                            {elements.map((_, index) => (
                                <div class="flex mb-3" key={index}>
                                    <div class="h-7 w-10 bg-gray-300 rounded mr-3"></div>
                                    <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div class="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div className="flex h-7 w-1/6">
                                        <div class="h-7 w-1/2 bg-gray-300 rounded mr-3"></div>
                                        <div class="h-7 w-1/2 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </BlockStack>
        </Page>
    );
}
