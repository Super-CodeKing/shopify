import {
    Icon,
    BlockStack,
    Card,
    IndexTable,
    Text,
    useIndexResourceState,
    Divider,
    Button,
    Checkbox,
    Page,
    Toast,
    Frame,
} from "@shopify/polaris";
import { EditIcon, DeleteIcon } from "@shopify/polaris-icons";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";
import ProductsTableSkeleton from "./Skeleton/ProductsTableSkeleton";
import { useAuthenticatedFetch } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "../../store/reducers/ComingSoon";
import EditProductFormModal from "./Modal/EditProduct";

export default function ProductTable() {
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();
    const productListRedux = useSelector((state) => state.comingsoon.productList)

    const [checked, setChecked] = useState(true);
    const [openResourcePicker, setOpenResourcePicker] = useState(false);
    const [comingSoonProducts, setComingSoonProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(true);
    const [initialSelectedProductIds, setInitialSelectedProductIds] = useState([]);
    const [toastContent, setToastContent] = useState("");
    const [editProductData, setEditProductData] = useState(null);

    const toggleToastActive = useCallback(() => setToastActive((toastActive) => !toastActive),[]);

    const toastMarkup = toastActive ? (
        <Toast content={toastContent} onDismiss={toggleToastActive} />
    ) : null;

    const handleChange = () => {
        setChecked(!checked);
    };

    const comingSoonDataProcess = (data) => {
        let processData = [];
        for (let i = 0; i < data.length; i++) {
            let dataObject = {
                product_id: data[i].id,
                variant_id: "",
                title: data[i].title,
                start_date: new Date(),
                end_date: "",
                has_end_date: 1,
                restock_date: "",
                has_restock_date: 1,
                display_message: 0,
                display_badge: 0,
            };
            processData.push(dataObject);
        }
        return processData;
    };

    const saveSelectedProducts = async (data) => {
        const processedComingSoonProductData = comingSoonDataProcess(data);
        const response = await fetch("/api/coming-soon/products/store", {
            method: "POST",
            body: JSON.stringify(processedComingSoonProductData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastContent("Product Saved Successfully.");
            toggleToastActive(true);
            getComingSoonProducts();
        }
    };

    const tableDateFormat = (date) => {
        return date == null ? null: new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const deleteProductFromPreOrderList = async (id, product_id) => {
        const formData = new FormData();

        formData.append("id", id);
        formData.append("product_id", product_id);

        const response = await fetch("/api/preorder/products/destroy", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastContent("Product Deleted from List Successfully.");
            toggleToastActive(true);
            getComingSoonProducts();
        }
        console.log(id + " " + product_id);
    };

    const selectProduct = (SelectPayload) => {
        setOpenResourcePicker(false);
        let productPayload = SelectPayload.selection;

        let mainProductPayloadAfterCuttingSelectedBefore = [];

        for (let i = 0; i < productPayload.length; i++) {
            let alreadyHas = 0;
            for (let j = 0; j < initialSelectedProductIds.length; j++) {
                if (productPayload[i].id == initialSelectedProductIds[j].id) {
                    alreadyHas = 1;
                    break;
                }
            }

            if (!alreadyHas) {
                mainProductPayloadAfterCuttingSelectedBefore.push(
                    productPayload[i]
                );
            }
        }
        saveSelectedProducts(mainProductPayloadAfterCuttingSelectedBefore);
    };

    const cancelResourcePicker = () => {
        setOpenResourcePicker(false);
        console.log("Cancelled....");
    };

    const activeResourcePicker = () => {
        setOpenResourcePicker(true);
    };

    function editProductFormComingSoonList(productData) {
        setEditProductData(productData);
        if(productData != null) setEditModalActive(true);
    }

    const handleCloseProductEditModal = () => {
        console.log("Closing-------------------");
        setEditProductData(null);
        setEditModalActive(false);
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(comingSoonProducts);

    const resourceName = {
        singular: "product",
        plural: "products",
    };

    const rowMarkup = comingSoonProducts.map(({
            id,
            product_id,
            title,
            start_date,
            end_date,
            has_end_date,
            restock_date,
            has_restock_date,
            display_message,
            display_badge,
        },index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {title}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{ start_date ? tableDateFormat(start_date) : "Not set"}</IndexTable.Cell>
                <IndexTable.Cell>{end_date ? tableDateFormat(end_date) : "Not set"}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" numeric alignment="justify">
                        {restock_date ? tableDateFormat(restock_date) : "Not Set"}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Checkbox
                        checked={display_message}
                        onChange={handleChange}
                    />
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Checkbox checked={display_badge} onChange={handleChange} />
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <div className="flex space-x-1">
                        <Button
                            onClick={() =>
                                editProductFormComingSoonList(comingSoonProducts[index])
                            }
                        >
                            <Icon source={EditIcon} tone="base" />
                        </Button>
                        <Button
                            onClick={() =>
                                deleteProductFromPreOrderList(id, product_id)
                            }
                        >
                            <Icon source={DeleteIcon} tone="base" />
                        </Button>
                    </div>
                </IndexTable.Cell>
            </IndexTable.Row>
        )
    );

    const getComingSoonProducts = async () => {
        const response = await fetch("/api/coming-soon/products");
        if (response.ok) {
            const comingSoonProducts = await response.json();
            const products = comingSoonProducts.data;
            dispatch(setProductList(products));
            setComingSoonProducts(products);
            const productIds = products.map((item) => ({
                id: item.product_id,
            }));
            setInitialSelectedProductIds(productIds);
            setIsLoadingProducts(false);
        } else {
            console.log("Error in Activaing Pre Order: ", response);
            setIsLoadingProducts(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        setIsLoadingProducts(true);
        if(productListRedux.length === 0) getComingSoonProducts();
        else {
            setComingSoonProducts(productListRedux);
            const productIds = productListRedux.map((item) => ({
                id: item.product_id,
            }));
            setInitialSelectedProductIds(productIds);
            setIsLoadingProducts(false);
        } 
    }, []);

    return (
        <>
            {editProductData != null && <EditProductFormModal 
                active={editModalActive}
                onSuccess={getComingSoonProducts}
                onClose={handleCloseProductEditModal}
                product={editProductData}
            />}
            <Frame>
                {toastMarkup}
                {isLoadingProducts && (
                    <ProductsTableSkeleton title={"Product List"} has_button={true} button_title={"Add Product"}/>
                )}
                {!isLoadingProducts && (
                    <div className="product-table [&>div>div]:pt-0">
                        <Page fullWidth>
                            <BlockStack gap="500">
                                <ResourcePicker
                                    resourceType="Product"
                                    open={openResourcePicker}
                                    selectMultiple
                                    showVariants={false}
                                    onCancel={() => cancelResourcePicker()}
                                    initialSelectionIds={initialSelectedProductIds}
                                    onSelection={(SelectPayload) =>
                                        selectProduct(SelectPayload)
                                    }
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
                                        resourceName={resourceName}
                                        itemCount={comingSoonProducts.length}
                                        selectedItemsCount={
                                            allResourcesSelected
                                                ? "All"
                                                : selectedResources.length
                                        }
                                        onSelectionChange={() =>
                                            handleSelectionChange()
                                        }
                                        headings={[
                                            { title: "Title" },
                                            { title: "Start Date" },
                                            { title: "End Date" },
                                            { title: "Estimated Restock Date" },
                                            { title: "Display Message" },
                                            { title: "Display Badge" },
                                            { title: "Actions" },
                                        ]}
                                    >
                                        {comingSoonProducts.length > 0 && rowMarkup}
                                        {comingSoonProducts.length === 0 && <p>Empty</p>}
                                    </IndexTable>
                                </Card>
                            </BlockStack>
                        </Page>
                    </div>
                )}
            </Frame>
        </>
    );
}
