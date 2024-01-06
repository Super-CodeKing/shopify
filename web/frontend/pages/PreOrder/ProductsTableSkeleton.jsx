import {
    SkeletonPage,
    Layout,
    Card,
    SkeletonBodyText,
    SkeletonThumbnail,
} from "@shopify/polaris";

export default function ProductsTableSkeleton({ title }) {
    const elements = Array.from({ length: 5 });
    return (
        <SkeletonPage title={title} primaryAction fullWidth>
            <Layout>
                <Layout.Section>
                    <Card>
                        {elements.map((_, index) => (
                            <div key={index} className="flex items-center justify-between [&>div]:mx-3 [&>div:nth-child(1)]:w-52 my-3">
                                <SkeletonThumbnail size="extraSmall" />
                                <SkeletonBodyText lines={1} />
                                <SkeletonBodyText lines={1} />
                                <SkeletonBodyText lines={1} />
                                <SkeletonBodyText lines={1} />
                                <SkeletonBodyText lines={1} />
                                <SkeletonBodyText lines={1} />
                                <SkeletonBodyText lines={1} />
                            </div>
                        ))}
                    </Card>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    );
}
