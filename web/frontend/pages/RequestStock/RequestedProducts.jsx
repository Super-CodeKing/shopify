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
    TextField
} from "@shopify/polaris";
import { DeleteIcon, ChevronRightIcon, ChevronLeftIcon, SearchIcon } from "@shopify/polaris-icons";
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
    const countRequestedProducts = useSelector((state) => state.requeststock.requestedProductsCount);
    
    const [take, setTake] = useState(5);
    const [requestedProducts, setRequestedProducts] = useState([]);
    const [requestedProductsCount, setRequestedProductsCount] = useState(0);
    const [isLoadingRequestedProducts, setIsLoadingRequestedProducts] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Number(Math.ceil(countRequestedProducts/take));
    const [showingFrom, setShowingFrom] = useState(1);
    const [showingTo, setShowingTo] = useState(5);
    const [searchWithProductTitle, setSearchWithProductTitle] = useState('');

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
    

    const getRequestedProducts = async (page = 1, take = 5) => {
        console.log(page);
        const response = await fetch(`/api/request-stock/requested-products?page=${page}&take=${take}`);
        if (response.ok) {
          const products = await response.json();
          setRequestedProducts(products);
          dispatch(setRequestedProductsRedux(products));
          setIsLoadingRequestedProducts(false);
        } else {
          console.log("Error in Activating Pre Order: ", response);
          setIsLoadingRequestedProducts(false);
          throw new Error(`HTTP error ${response.status}`);
        }
      };

    const getRequestedProductsCount = async () => {
        const response = await fetch("/api/request-stock/requested-products/count");
        if (response.ok) {
            const productsCount = await response.json();
            setRequestedProductsCount(productsCount);
            dispatch(setRequestedProductsCountRedux(productsCount));
            setIsLoadingRequestedProducts(false);
        } else {
            console.log("Error in Activaing Pre Order: ", response);
            setIsLoadingRequestedProducts(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    const fetchData = (pageNumber) => {
        setIsLoadingRequestedProducts(true)
        setCurrentPage(pageNumber);
        setShowingFrom(((currentPage-1)*take) == 0 ? 1 : ((currentPage-1)*take));
        setShowingTo(((currentPage-1)*take) + take);
        getRequestedProducts(currentPage, take);
    }

    const searchOnRequestedProducts = (e) => {
        console.log(e);
    }

    useEffect(() => {
        setIsLoadingRequestedProducts(true);
        if(requestedProductsRedux?.length === 0) {
            getRequestedProducts();
            getRequestedProductsCount();
        }
        else {
            setRequestedProducts(requestedProductsRedux);
            setRequestedProductsCount(countRequestedProducts)
            setIsLoadingRequestedProducts(false);
        }
    }, []);

    return (
        <div className="orders [&>div>div]:pt-0">
            <Frame>
                {isLoadingRequestedProducts && (
                    <ProductsTableSkeleton title={"Requested Products"} />
                )}
                {!isLoadingRequestedProducts && (
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
                                    <div className="pb-3">
                                        <TextField
                                            onChange={searchOnRequestedProducts}
                                            value={searchWithProductTitle}
                                            prefix={<Icon source={SearchIcon} tone="base" />}
                                            placeholder="Search"
                                            autoComplete="off"
                                        />
                                    </div>
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
                                    >
                                        {requestedProducts?.length > 0 && rowMarkup}
                                        {requestedProducts?.length === 0 && (
                                            <p>Empty</p>
                                        )}
                                    </IndexTable>
                                    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                            Showing 
                                            <span class="font-semibold text-gray-500 dark:text-white">
                                                <span>{' ' + showingFrom}</span>
                                                <span> - </span>
                                                <span>{showingTo + ' '}</span>
                                            </span>
                                            of <span class="font-semibold text-gray-500 dark:text-white" x-text="linkCount">{countRequestedProducts}</span>
                                        </span>
                                        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                            <li>
                                                <button 
                                                    onClick={() => fetchData(currentPage > 1 ? currentPage-1: currentPage)} 
                                                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                                ><Icon
                                                    source={ChevronLeftIcon}
                                                    tone="base"
                                                /></button>
                                            </li>
                                            <li>
                                                <button 
                                                    onClick={() => fetchData(currentPage < totalPages ? currentPage+1 : currentPage)}
                                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                                                ><Icon
                                                    source={ChevronRightIcon}
                                                    tone="base"
                                                /></button>
                                            </li>
                                        </ul>
                                    </nav>
                                </Card>
                            </BlockStack>
                        </Page>
                    </div>
                )}
            </Frame>
        </div>
    );
}
