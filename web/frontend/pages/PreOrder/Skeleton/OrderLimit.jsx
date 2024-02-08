import {
    Page,
    SkeletonPage,
    Layout,
    Card,
    SkeletonBodyText,
    Text,
    SkeletonDisplayText,
    BlockStack
} from "@shopify/polaris";
import React from "react";

export default function SkeletonOrderLimit({ title, has_button, button_title }) {
    return (
        <div className="table-skeleton [&>div>div]:pt-0">
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

                        <div className="flex">
                            <div className="flex flex-col flex-1">
                                <div class="bg-white pl-4 pt-4 pb-1 pr-1 rounded-lg shadow flex-1">
                                    <div class="animate-pulse">
                                        <div class="flex mb-3">
                                            <div class="h-10 w-full bg-gray-300 rounded mr-3"></div>
                                        </div>

                                        <div class="flex mb-3">
                                            <div class="h-10 w-full bg-gray-300 rounded mr-3"></div>
                                        </div>

                                        <div class="flex mb-3">
                                            <div class="h-10 w-full bg-gray-300 rounded mr-3"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white pl-4 pt-4 pb-1 pr-1 rounded-lg shadow mt-5">
                                    <div class="animate-pulse">
                                        <div class="flex mb-3">
                                            <div class="h-5 w-10 bg-gray-300 rounded mr-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BlockStack>
            </Page>
        </div>
    );
}
