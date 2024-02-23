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
        <div className="table-skeleton [&>div>div]:pt-0">
            <Page fullWidth>
                <BlockStack gap="500">
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between mb-5">
                            <Text variant="headingXl" as="h4">
                                {title}
                            </Text>
                            {has_button && <Button variant="primary">{button_title}</Button>}
                        </div>

                        <hr className="border-t border-gray-200 mb-5" />

                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="animate-pulse">
                                <div className="flex mb-3">
                                    <div className="h-7 w-10 bg-gray-300 rounded mr-3"></div>
                                    <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                    <div className="h-7 w-1/6 bg-gray-300 rounded"></div>
                                </div>

                                {elements.map((_, index) => (
                                    <div className="flex mb-3" key={index}>
                                        <div className="h-7 w-10 bg-gray-300 rounded mr-3"></div>
                                        <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                        <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                        <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                        <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                        <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                        <div className="h-7 w-1/6 bg-gray-300 rounded mr-3"></div>
                                        <div className="flex h-7 w-1/6">
                                            <div className="h-7 w-1/2 bg-gray-300 rounded mr-3"></div>
                                            <div className="h-7 w-1/2 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </BlockStack>
            </Page>
        </div>
    );
}
