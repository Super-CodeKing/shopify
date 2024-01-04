import {
    Icon,
    BlockStack,
    Card,
    IndexTable,
    Text,
    useBreakpoints,
    useIndexResourceState,
    Divider,
    Button,
    Checkbox,
} from "@shopify/polaris";
import { EditMajor, DeleteMajor } from "@shopify/polaris-icons";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

export default function ProductTable() {
    const [checked, setChecked] = useState(true);
    const [openResourcePicker, setOpenResourcePicker] = useState(false)

    const handleChange = () => {
        setChecked(!checked);
    };

    const selectProduct = (SelectPayload) => {
        setOpenResourcePicker(false)
        console.log(SelectPayload);
    };
    const cancelResourcePicker = () => {
        setOpenResourcePicker(false);
    };
    const activeResourcePicker = () => {
        console.log("Active Resource Picker", openResourcePicker);
        setOpenResourcePicker(true);
    };

    const orders = [
        {
            id: "1020",
            product_title: "The Collection Snowboard: Liquid",
            start_date: "Jul 20, 2023",
            end_date: "Jul 27, 2023",
            order_limit: 10,
            display_message: (
                <Checkbox checked={checked} onChange={handleChange} />
            ),
            display_badge: (
                <Checkbox checked={checked} onChange={handleChange} />
            ),
        },
        {
            id: "1021",
            product_title: "The Collection Snowboard: Silver",
            start_date: "Jul 20, 2023",
            end_date: "Jul 27, 2023",
            order_limit: 10,
            display_message: (
                <Checkbox checked={checked} onChange={handleChange} />
            ),
            display_badge: (
                <Checkbox checked={checked} onChange={handleChange} />
            ),
        },
        {
            id: "1022",
            product_title: "The Collection Snowboard: Gold",
            start_date: "Jul 20, 2023",
            end_date: "Jul 27, 2023",
            order_limit: 10,
            display_message: (
                <Checkbox checked={checked} onChange={handleChange} />
            ),
            display_badge: (
                <Checkbox checked={checked} onChange={handleChange} />
            ),
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
                product_title,
                start_date,
                end_date,
                order_limit,
                display_message,
                display_badge,
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
                        {product_title}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{start_date}</IndexTable.Cell>
                <IndexTable.Cell>{end_date}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" numeric alignment="justify">
                        {order_limit}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{display_message}</IndexTable.Cell>
                <IndexTable.Cell>{display_badge}</IndexTable.Cell>
                <IndexTable.Cell>
                    <div className="flex">
                        <Icon source={EditMajor} tone="base" />
                        <Icon source={DeleteMajor} tone="base" />
                    </div>
                </IndexTable.Cell>
            </IndexTable.Row>
        )
    );

    const getPreOrderProducts = () => {
        
    }

    useEffect( () => {
        getPreOrderProducts();
    }, []);

    return (
        <>
            <BlockStack gap="500">
                <ResourcePicker 
                    resourceType="Product" 
                    open={openResourcePicker}
                    selectMultiple 
                    onCancel={() => cancelResourcePicker()}
                    onSelection={(SelectPayload) => selectProduct(SelectPayload)}
                />
                <div className="flex">
                    <Text variant="headingXl" as="h4">
                        Product List
                    </Text>
                    <div className="ml-auto">
                        <Button
                            variant="primary"
                            onClick={() => activeResourcePicker()}
                        >
                            Add Product
                        </Button>
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
                            { title: "Display Message" },
                            { title: "Display Badge" },
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
