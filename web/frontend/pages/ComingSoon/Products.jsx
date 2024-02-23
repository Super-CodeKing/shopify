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
    Modal,
    Page,
    Toast,
    Frame,
    Form,
    FormLayout,
    TextField,
} from "@shopify/polaris";
import { EditIcon, DeleteIcon } from "@shopify/polaris-icons";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";
import ProductsTableSkeleton from "./Skeleton/ProductsTableSkeleton";
import { useAuthenticatedFetch } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "../../store/reducers/ComingSoon";

export default function ProductTable() {
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();
    const today = new Date();
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
    const [editStartDate, setEditStartDate] = useState(today);
    const [editEndDate, setEditEndDate] = useState(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));
    const [editHasEndDate, setEditHasEndDate] = useState(true);
    const [editRestockDate, setEditRestockDate] = useState(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));
    const [editHasRestockDate, setEditHasRestockDate] = useState(true);
    const [editCheckDisplayMessage, setEditCheckDisplayMessage] = useState(false);
    const [editCheckDisplayBadge, setEditCheckDisplayBadge] = useState(false);

    const toggleToastActive = useCallback(() => setToastActive((toastActive) => !toastActive),[]);

    const changeEditStartDate = (e) => {
        setEditStartDate(new Date(e));
    };

    const changeEditEndDate = (e) => {
        setEditEndDate(new Date(e));
    };

    const changeEditRestockDate = (event) => {
        setEditRestockDate(new Date(event));
    };

    const changeEditDisplayMessage = () => {
        setEditCheckDisplayMessage(!editCheckDisplayMessage);
    };

    const changeEditDisplayBadge = () => {
        setEditCheckDisplayBadge(!editCheckDisplayBadge);
    };

    const updateEditProductData = async () => {
        const formData = new FormData();

        let endDate = null;
        let restockDate = null; 

        if(editHasEndDate) {
            endDate = null;
        } else {
            endDate = editEndDate.toISOString();
        }

        if(editHasRestockDate) {
            restockDate = null;
        } else {
            restockDate = editRestockDate.toISOString();
        }

        let displayMessage = editCheckDisplayMessage;
        if (editCheckDisplayMessage) {
            displayMessage = 1;
        } else {
            displayMessage = 0;
        }

        let displayBadge = editCheckDisplayBadge;
        if (editCheckDisplayBadge) {
            displayBadge = 1;
        } else {
            displayBadge = 0;
        }

        formData.append("id", editProductData.id);
        formData.append("product_id", editProductData.product_id);
        formData.append("variant_id", editProductData.variant_id);
        formData.append("title", editProductData.title);
        formData.append("start_date", editStartDate.toISOString());
        formData.append("end_date", endDate);
        formData.append("has_end_date", editHasEndDate)
        formData.append("restock_date", restockDate);
        formData.append("has_restock_date", editHasRestockDate);
        formData.append("display_message", displayMessage);
        formData.append("display_badge", displayBadge);

        const response = await fetch("/api/coming-soon/products/update", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastContent("Product Updated Successfully.");
            toggleToastActive(true);
            getComingSoonProducts();
            setEditModalActive(false);
        }
    };

    const dateFormatForEdit = (date) => {
        return date == null? null: editStartDate.toISOString().slice(0, 10)
    }

    const toastMarkup = toastActive ? (
        <Toast content={toastContent} onDismiss={toggleToastActive} />
    ) : null;

    function EditProductFormModal() {
        return (
            <div style={{ height: "500px" }} className="absolute">
                <Frame>
                    <Modal
                        open={editModalActive}
                        onClose={() => setEditModalActive(false)}
                        title="Edit Coming Soon Product Settings"
                        primaryAction={{
                            content: "Close",
                            onAction: () => setEditModalActive(false),
                        }}
                        secondaryActions={{
                            content: "Submit",
                            onAction: () => updateEditProductData(),
                        }}
                    >
                        <Modal.Section>
                            <Form>
                                <FormLayout>
                                    <TextField
                                        label="Product Title"
                                        type="text"
                                        value={editProductData.title}
                                        readOnly
                                    />

                                    <div className="flex">
                                        <div className="flex-1 mr-3">
                                            <TextField
                                                label="Start Date"
                                                type="date"
                                                value={dateFormatForEdit(editStartDate)}
                                                onChange={(e) =>
                                                    changeEditStartDate(e)
                                                }
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextField
                                                label="End Date"
                                                type="date"
                                                value={dateFormatForEdit(editEndDate)}
                                                onChange={(e) => changeEditEndDate(e)}
                                                disabled={editHasEndDate}
                                            />
                                            <Checkbox
                                                label="No End Date"
                                                checked={editHasEndDate}
                                                onChange={() => setEditHasEndDate(!editHasEndDate)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-end">
                                        <div className="flex-1 mr-3">
                                            <TextField
                                                label="Restock Date"
                                                type="date"
                                                value={dateFormatForEdit(editRestockDate)}
                                                disabled={editHasRestockDate}
                                                onChange={changeEditRestockDate}
                                            />
                                            <Checkbox
                                                label="No Restock Date"
                                                checked={editHasRestockDate}
                                                onChange={() => setEditHasRestockDate(!editHasRestockDate) }
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col">
                                            <div className="flex-1 mr-3">
                                                <Checkbox
                                                    label="Display Message"
                                                    checked={editCheckDisplayMessage}
                                                    onChange={() => changeEditDisplayMessage()}
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <Checkbox
                                                    label="Display Badge"
                                                    checked={ editCheckDisplayBadge}
                                                    onChange={() => changeEditDisplayBadge()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </FormLayout>
                            </Form>
                        </Modal.Section>
                    </Modal>
                </Frame>
            </div>
        );
    }

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
        console.log(data);
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

    const editProductFromComingSoonList = (productData) => {
        console.log(productData);
        setEditProductData(productData);


        if (productData.start_date) {
            setEditStartDate(new Date(productData.start_date));
        }

        if(productData.has_end_date == 0) {
            setEditHasEndDate(false);
        } else {
            setEditHasEndDate(true);
        }

        if (productData.end_date && productData.has_end_date) {
            setEditEndDate(new Date(productData.end_date));
        } else if(productData.end_date && productData.has_end_date) {
            setEditEndDate(null);
        } else if(!productData.end_date) {
            setEditEndDate(null);
        }

        if(productData.has_restock_date == 0) {
            setEditHasRestockDate(false);
        } else {
            setEditHasRestockDate(true);
        }

        if (productData.display_message) {
            setEditCheckDisplayMessage(productData.display_message);
        }

        if (productData.display_badge) {
            setEditCheckDisplayBadge(productData.display_badge);
        }

        if (productData.restock_date && productData.has_restock_date == 0) {
            setEditRestockDate(new Date(productData.restock_date));
        } else if(productData.restock_date && productData.has_restock_date == 1) {
            setEditRestockDate(null);
        } else if(!productData.restock_date) {
            setEditRestockDate(null);
        }

        toggleModal();
    };

    const toggleModal = () => {
        setEditModalActive(true);
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(comingSoonProducts);

    const resourceName = {
        singular: "product",
        plural: "products",
    };

    const rowMarkup = comingSoonProducts.map(
        (
            {
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
                                editProductFromComingSoonList({
                                    id: id,
                                    product_id: product_id,
                                    title: title,
                                    start_date: start_date,
                                    end_date: end_date,
                                    has_end_date: has_end_date,
                                    restock_date: restock_date,
                                    has_restock_date: has_restock_date,
                                    display_message: display_message,
                                    display_badge: display_badge,
                                })
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
            {editProductData != null && <EditProductFormModal />}
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
