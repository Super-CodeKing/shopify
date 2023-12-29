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

export default function ProductTable() {
    const orders = [
        {
            id: "1020",
            order: "#1020",
            date: "Jul 20 at 4:34pm",
            customer: "Jaydon Stanton",
            total: "$969.44",
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
        {
            id: "1019",
            order: "#1019",
            date: "Jul 20 at 3:46pm",
            customer: "Ruben Westerfelt",
            total: "$701.19",
            paymentStatus: (
                <Badge progress="partiallyComplete">Partially paid</Badge>
            ),
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
        {
            id: "1018",
            order: "#1018",
            date: "Jul 20 at 3.44pm",
            customer: "Leo Carder",
            total: "$798.24",
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
    ];

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(orders);

    const resourceName = {
        singular: "order",
        plural: "orders",
    };

    const rowMarkup = orders.map(
        (
            {
                id,
                order,
                date,
                customer,
                total,
                paymentStatus,
                fulfillmentStatus,
            },
            index
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {order}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{date}</IndexTable.Cell>
                <IndexTable.Cell>{customer}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" alignment="end" numeric>
                        {total}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
                <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
            </IndexTable.Row>
        )
    );
    return (
        <>
            <BlockStack gap="500">
                <div className="flex">
                    <Text variant="headingXl" as="h4">
                        Product List
                    </Text>
                    <div className="ml-auto">
                        <Button variant="primary">Add Product</Button>
                    </div>
                </div>

                <Divider borderColor="border" />
                <Card>
                    <IndexTable
                        condensed={useBreakpoints().smDown}
                        resourceName={resourceName}
                        itemCount={orders.length}
                        selectedItemsCount={
                            allResourcesSelected
                                ? "All"
                                : selectedResources.length
                        }
                        onSelectionChange={handleSelectionChange}
                        headings={[
                            { title: "Title" },
                            { title: "Start Date" },
                            { title: "End Date" },
                            { title: "Order Limit" },
                            { title: "Restock Alert" },
                            { title: "Actions" },
                        ]}
                    >
                        {rowMarkup}
                    </IndexTable>
                </Card>
            </BlockStack>
        </>
    );
}
