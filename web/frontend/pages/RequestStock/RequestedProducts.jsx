import {
    BlockStack,
    Card,
    IndexTable,
    Text,
    Icon,
    useIndexResourceState,
    Divider,
    Button,
    Page,
    Frame,
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import ProductsTableSkeleton from "./Skeleton/ProductsTableSkeleton";
import { useAuthenticatedFetch } from "../../hooks";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
    setRequestedProducts as setRequestedProductsRedux, 
    setRequestedProductsCount as setRequestedProductsCountRedux
} from "../../store/reducers/RequestStock";

export default function RequestedProducts() {
    
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const shopName = useSelector((state) => state.requeststock.shopName);
    const requestedProductsRedux = useSelector((state) => state.requeststock.requestedProducts);
    const countRequestedProducts = useSelector((state) => state.requeststock.requestedProductsCount)
    const [take, setTake] = useState(5);
    const [requestedProducts, setRequestedProducts] = useState([]);
    const [requestedProductsCount, setRequestedProductsCount] = useState(0);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const updatePagination = (currentPage, totalCount) => {
        const hasNext = currentPage * take < totalCount;
        const hasPrevious = currentPage > 1;
      
        return {
          hasNext,
          onNext: hasNext ? () => getPreOrderOrders(currentPage + 1) : null,
          hasPrevious,
          onPrevious: hasPrevious ? () => getPreOrderOrders(currentPage - 1) : null,
        };
      };

    
    const [pagination, setPagination] = useState(updatePagination(currentPage, requestedProductsCount)); // Initial pagination state

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(requestedProducts);

    const resourceName = {
        singular: "order",
        plural: "orders",
    };

    const getOrderLink = (id) => {
        if(shopName) return `https://admin.shopify.com/store/${shopName}/orders/${id}`
        else return '#';
    }

    function wrapTextAfterThreeWords(title) {
        return title.split(' ').reduce((acc, word, index) => {
          if (index % 3 === 0 && index !== 0) {
            acc.push(<br key={index} />);
          } else {
            acc.push(index > 0 ? ' ' : '');
            acc.push(word);
          }
          return acc;
        }, []);
    }

    const rowMarkup = requestedProducts?.map(
        (
            {
                id,
                variant_id,
                product_title,
                product_quantity,
                created_at,
                customer_name,
                customer_email,
                customer_phone,
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
                        <a href={getOrderLink(id)} target="_blank">
                            {wrapTextAfterThreeWords(product_title)}
                        </a>
                    </Text>
                </IndexTable.Cell>
                
                <IndexTable.Cell><Text>{product_quantity}</Text></IndexTable.Cell>
                
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
                
                <IndexTable.Cell>{customer_name ?? "No Customer"}</IndexTable.Cell>
                <IndexTable.Cell><Text as="span">{customer_email}</Text></IndexTable.Cell>
                <IndexTable.Cell><Text as="span">{customer_phone}</Text></IndexTable.Cell>
                <IndexTable.Cell><Text as="span">{message}</Text></IndexTable.Cell>
                <IndexTable.Cell className="float-right">
                    <div class="flex items-end">
                        <Button variant="plain">
                        <Icon source={DeleteIcon} tone="critical" />
                        </Button>
                    </div>
                </IndexTable.Cell>
            </IndexTable.Row>
        )
    );
    

    const getPreOrderOrders = async (page = 1, take = 5) => {
        const response = await fetch(`/api/request-stock/requested-products?page=${page}&take=${take}`);
        if (response.ok) {
          const products = await response.json();
          getRequestedProductsCount(); // Assuming this function handles total count
          setRequestedProducts(products);
          dispatch(setRequestedProductsRedux(products));
          setIsLoadingOrders(false);
        } else {
          console.log("Error in Activating Pre Order: ", response);
          setIsLoadingOrders(false);
          throw new Error(`HTTP error ${response.status}`);
        }
      };

    const getRequestedProductsCount = async () => {
        const response = await fetch("/api/request-stock/requested-products/count");
        if (response.ok) {
            const productsCount = await response.json();
            console.log(productsCount);
            setRequestedProductsCount(productsCount);
            dispatch(setRequestedProductsCountRedux(productsCount));
            setIsLoadingOrders(false);
        } else {
            console.log("Error in Activaing Pre Order: ", response);
            setIsLoadingOrders(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    

    const handleNext = () => {
        if (pagination.hasNext) {
          setCurrentPage(currentPage + 1);
          getPreOrderOrders(currentPage + 1); // Fetch data for next page
          setPagination(updatePagination(currentPage + 1, totalCount));
        }
      };
    
      const handlePrevious = () => {
        if (pagination.hasPrevious) {
          setCurrentPage(currentPage - 1);
          getPreOrderOrders(currentPage - 1); // Fetch data for previous page
          setPagination(updatePagination(currentPage - 1, totalCount));
        }
      };

    useEffect(() => {
        setIsLoadingOrders(true);
        if(requestedProductsRedux?.length === 0) getPreOrderOrders();
        else {
            setRequestedProducts(requestedProductsRedux);
            setRequestedProductsCount(countRequestedProducts)
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
                                        itemCount={requestedProducts?.length}
                                        selectedItemsCount={
                                            allResourcesSelected
                                                ? "All"
                                                : selectedResources.length
                                        }
                                        onSelectionChange={() =>
                                            handleSelectionChange()
                                        }
                                        headings={[
                                            { title: "Product Title" },
                                            { title: "Ordered Quantity"},
                                            { title: "Request Time"},
                                            { title: "Customer Name" },
                                            { title: "Email" },
                                            { title: "Phone" },
                                            { title: "Message" },
                                            { title: "Actions"}
                                        ]}
                                        // pagination={{
                                        //     hasNext: true,
                                        //     onNext: () => {},
                                        //     hasPrevious: true,
                                        //     onPrevious: () => {}
                                        // }}
                                    >
                                        {requestedProducts?.length > 0 && rowMarkup}
                                        {requestedProducts?.length === 0 && (
                                            <p>Empty</p>
                                        )}
                                    </IndexTable>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button onClick={handlePrevious} disabled={!pagination.hasPrevious}>
                                        Previous
                                        </Button>
                                        <Button onClick={handleNext} disabled={!pagination.hasNext}>
                                        Next
                                        </Button>
                                    </div>
                                </Card>
                            </BlockStack>
                        </Page>
                    </div>
                )}
            </Frame>
        </div>
    );
}
