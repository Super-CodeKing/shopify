import {
    BlockStack,
    Card,
    IndexTable,
    Text,
    Badge,
    useIndexResourceState,
    Divider,
    Button,
    Page,
    Frame,
} from "@shopify/polaris";
import ProductsTableSkeleton from "./Skeleton/ProductsTableSkeleton";
import { useAuthenticatedFetch } from "../../hooks";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRequestedProducts } from "../../store/reducers/RequestStock";

export default function RequestedProducts() {
    
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const shopName = useSelector((state) => state.requeststock.shopName);
    const requestedProductsRedux = useSelector((state) => state.requeststock.requestedProducts);

    const [preOrderOrders, setPreOrderOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(preOrderOrders);

    const resourceName = {
        singular: "order",
        plural: "orders",
    };

    const getOrderLink = (id) => {
        if(shopName)
        return `https://admin.shopify.com/store/${shopName}/orders/${id}`
        else
        return '#';
    }

    const rowMarkup = preOrderOrders.map(
        (
            {
                id,
                variant_id,
                product_title,
                quantity,
                created_at,
                customer,
                email,
                phone,
                message
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
                        <a href={getOrderLink(id)} target="_blank">{product_title}</a>
                    </Text>
                </IndexTable.Cell>
                
                <IndexTable.Cell><Text>{quantity}</Text></IndexTable.Cell>
                
                <IndexTable.Cell>
                    {new Date(created_at).toLocaleString("en-US", {
                        timeZone: "America/New_York",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    }) ?? "Not set"}
                </IndexTable.Cell>
                
                <IndexTable.Cell>{customer ?? "No Customer"}</IndexTable.Cell>
                <IndexTable.Cell><Text as="span">{email}</Text></IndexTable.Cell>
                <IndexTable.Cell><Text as="span">{phone}</Text></IndexTable.Cell>
                <IndexTable.Cell><Text as="span">{message}</Text></IndexTable.Cell>

            </IndexTable.Row>
        )
    );

    const getPreOrderOrders = async () => {
        const response = await fetch("/api/request-stock/requested-products");
        if (response.ok) {
            const orders = await response.json();
            setPreOrderOrders(orders.orders);
            dispatch(setRequestedProducts(orders.orders));
            setIsLoadingOrders(false);
        } else {
            console.log("Error in Activaing Pre Order: ", response);
            setIsLoadingOrders(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        setIsLoadingOrders(true);
        if(requestedProductsRedux.length === 0) getPreOrderOrders();
        else {
            setPreOrderOrders(requestedProductsRedux);
            setIsLoadingOrders(false);
        }
    }, []);

    return (
        <div className="orders [&>div>div]:pt-0">
            <Frame>
                {isLoadingOrders && (
                    <ProductsTableSkeleton title={"Requested Products"} />
                )}
                {!isLoadingOrders && (
                    <div className="[&>div>div]:pt-0">
                        <Page fullWidth>
                            <BlockStack gap="500">
                                <div className="flex">
                                    <Text variant="headingXl" as="h4">
                                        Requested Products
                                    </Text>
                                    <div className="ml-auto">
                                        <Button
                                            variant="primary"
                                            onClick={() => activeResourcePicker()}
                                        >
                                            Export
                                        </Button>
                                    </div>
                                </div>

                                <Divider borderColor="border" />
                                <Card>
                                    <IndexTable
                                        resourceName={resourceName}
                                        itemCount={preOrderOrders.length}
                                        selectedItemsCount={
                                            allResourcesSelected
                                                ? "All"
                                                : selectedResources.length
                                        }
                                        onSelectionChange={() =>
                                            handleSelectionChange()
                                        }
                                        headings={[
                                            { title: "ID" },
                                            { title: "Product Title" },
                                            { title: "Customer" },
                                            { title: "Total" },
                                            { title: "Payment Status" },
                                            { title: "Items" },
                                        ]}
                                    >
                                        {preOrderOrders.length > 0 && rowMarkup}
                                        {preOrderOrders.length === 0 && (
                                            <p>Empty</p>
                                        )}
                                    </IndexTable>
                                </Card>
                            </BlockStack>
                        </Page>
                    </div>
                )}
            </Frame>
        </div>
    );
}
