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
    TextField,
    Select,
    Tag,
    Toast
} from "@shopify/polaris";
import { DeleteIcon, ChevronRightIcon, ChevronLeftIcon, SearchIcon } from "@shopify/polaris-icons";
import ProductsTableSkeleton from "./Skeleton/ProductsTableSkeleton";
import { useAuthenticatedFetch } from "../../hooks";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../../assets/requested-stock.css'
import { 
    setRequestedProducts as setRequestedProductsRedux, 
    setRequestedProductsCount as setRequestedProductsCountRedux
} from "../../store/reducers/RequestStock";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function RequestedProducts() {
    
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const shopName = useSelector((state) => state.requeststock.shopName);
    const requestedProductsRedux = useSelector((state) => state.requeststock.requestedProducts);
    const countRequestedProducts = useSelector((state) => state.requeststock.requestedProductsCount);
    
    const [requestedProducts, setRequestedProducts] = useState([]);
    const [filteredRequestedProducts, setFilteredRequestedProducts] = useState([]);
    const [requestedProductsCount, setRequestedProductsCount] = useState(0);
    const [isLoadingRequestedProducts, setIsLoadingRequestedProducts] = useState(false);
    
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchCategory, setSearchCategory] = useState('product_title');

    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredRequestedProducts.length);
    const paginatedData = filteredRequestedProducts.slice(startIndex, endIndex);

    const [toastContent, setToastContent] = useState("");
    const [toastActive, setToastActive] = useState(false);
    const toggleToastActive = () => setToastActive((toastActive) => !toastActive);
    const toastMarkup = toastActive ? (<Toast content={toastContent} onDismiss={toggleToastActive} />):null;

    const [buttonLoading, setButtonLoading] = useState(false);

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

    const handleDeleteClick = (id, product_id) => {
        setDeleteId(id);
        setDeleteProductId(product_id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsLoadingRequestedProducts(true);
        deleteProductFromPreOrderList(deleteId, deleteProductId);
    };

    const rowMarkup = paginatedData?.map(
        (
            {
                id,
                product_id,
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
                        <Button variant="plain"  onClick={() => handleDeleteClick(id, product_id)}>
                        <Icon source={DeleteIcon} tone="critical" />
                        </Button>
                    </div>
                </IndexTable.Cell>
            </IndexTable.Row>
        )
    );

    const handleSearchBySelectChange = (value) => setSearchCategory(value)

    const searchByOptions = [
        {label: 'Product Title', value: 'product_title'},
        {label: 'Customer Name', value: 'customer_name'},
        {label: 'Customer Email', value: 'customer_email'},
        {label: 'Customer Phone', value: 'customer_phone'},
      ];
      
    const rowsPerPage = [
        {label: '5', value: 5},
        {label: '10', value: 10},
        {label: '20', value: 20},
        {label: '50', value: 50},
    ]; 
    
    const getRequestedProducts = async () => {
        const response = await fetch(`/api/request-stock/requested-products`);
        if (response.ok) {
          const products = await response.json();
          setRequestedProducts(products);
          setFilteredRequestedProducts(products);
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

    const deleteProductFromPreOrderList = async (id, product_id) => {
        const formData = new FormData();

        formData.append("id", id);
        formData.append("product_id", product_id);

        const response = await fetch("/api/request-stock/requested-products/destroy", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastContent("Product Deleted from List Successfully.");
            setToastActive(true);
            console.log(toastActive);
            getRequestedProducts();
        }

        setIsLoadingRequestedProducts(false);
    };

    const handleExport = async () => {
        setButtonLoading(true)
        await fetch("/api/request-stock/requested-products/export", {
            method: 'GET',
            headers: {
              'Content-Type': 'text/csv'
            }
        }).then(response => {
            return response.blob();
          }).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Requested_Products.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setButtonLoading(false)
          })
          .catch(error => {
            setButtonLoading(false)
            console.error('Error exporting data:', error);
          });
      };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleSearch = (term) => {
        setSearchText(term);
        const filtered = requestedProducts.filter((item) =>
          Object.values(item).join(' ').toLowerCase().includes(term.toLowerCase())
        );
        setFilteredRequestedProducts(filtered);
    };

    useEffect(() => {
        setIsLoadingRequestedProducts(true);
        if(requestedProductsRedux?.length === 0) {
            getRequestedProducts();
            getRequestedProductsCount();
        }
        else {
            setRequestedProducts(requestedProductsRedux);
            setFilteredRequestedProducts(requestedProductsRedux)
            setRequestedProductsCount(countRequestedProducts)
            setIsLoadingRequestedProducts(false);
        }
    }, []);

    return (
        <div className="orders [&>div>div]:pt-0">
            <Frame>
                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    title="Confirm deletion"
                    message="Are you sure you want to delete this item? This action cannot be undone."
                    confirmButtonLabel="Delete"
                />
                {toastMarkup}
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
                                            loading={buttonLoading}
                                            onClick={() => handleExport()}
                                        >
                                            Export
                                        </Button>
                                    </div>
                                </div>

                                <Divider borderColor="border" />
                                <Card>
                                    <div className="pb-3">
                                        <div className="flex pb-2">
                                            <div className="flex-1 mr-2">
                                                <TextField
                                                    onChange={handleSearch}
                                                    value={searchText}
                                                    prefix={<Icon source={SearchIcon} tone="base" />}
                                                    placeholder="Search"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <Select
                                                label="Search by"
                                                labelInline
                                                options={searchByOptions}
                                                onChange={handleSearchBySelectChange}
                                                value={searchCategory}
                                            />
                                            
                                        </div>
                                        <Divider />
                                        <div className="py-1">
                                            <Tag>{`Selected: ${searchByOptions.find(option => option.value === searchCategory)?.label}`}</Tag>
                                        </div>
                                        <Divider />
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
                                        {isLoadingRequestedProducts == false && requestedProducts?.length === 0 && (
                                            <p>Empty</p>
                                        )}
                                    </IndexTable>
                                    <nav class="flex items-center flex-column flex-wrap md:flex-row pt-4" aria-label="Table navigation">
                                        
                                        <span class="text-sm font-normal mr-auto text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                            Showing 
                                            <span class="font-semibold text-gray-500 dark:text-white mx-1">
                                                <span>{startIndex + 1}</span>
                                                <span> - </span>
                                                <span>{endIndex}</span>
                                            </span>
                                            of <span class="font-semibold text-gray-500 dark:text-white" x-text="linkCount">{countRequestedProducts}</span>
                                        </span>
                                        <Select
                                            label="Rows Per Page"
                                            labelInline
                                            options={rowsPerPage}
                                            onChange={(e) => setItemsPerPage(parseInt(e))}
                                            value={itemsPerPage}
                                        />
                                        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 ml-3">
                                            <li>
                                                <button
                                                    disabled={currentPage === 1}
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                                ><Icon
                                                    source={ChevronLeftIcon}
                                                    tone="base"
                                                /></button>
                                            </li>
                                            <li>
                                                <button
                                                    disabled={Math.ceil(filteredRequestedProducts.length/itemsPerPage) === currentPage}
                                                    onClick={() => handlePageChange(currentPage + 1)}
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
