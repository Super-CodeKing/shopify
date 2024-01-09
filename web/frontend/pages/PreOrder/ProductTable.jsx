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
    Modal,
    Page,
    Toast,
    Frame,
    Form,
    FormLayout,
    TextField,
    Box,
    Popover,
    DatePicker,
} from "@shopify/polaris";
import { EditMajor, DeleteMajor } from "@shopify/polaris-icons";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";
import ProductsTableSkeleton from "./ProductsTableSkeleton";
import { useAuthenticatedFetch } from "../../hooks";

export default function ProductTable() {
    const fetch = useAuthenticatedFetch();
    const today = new Date();

    const [checked, setChecked] = useState(true);
    const [openResourcePicker, setOpenResourcePicker] = useState(false);
    const [preOrderProducts, setPreOrderProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(true);
    const [initialSelectedProductIds, setInitialSelectedProductIds] = useState(
        []
    );
    const [toastContent, setToastContent] = useState("");
    const [editProductData, setEditProductData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [editStartDate, setEditStartDate] = useState(today);
    const [editEndDate, setEditEndDate] = useState(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));
    const [hasEndDate, setHasEndDate] = useState(false);
    const [editCheckDisplayMessage, setEditCheckDisplayMessage] = useState()
    const [editCheckDisplayBadge, setEditCheckDisplayBadge] = useState()

    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        []
    );

    const changeEditStartDate = (e) => {
        setEditStartDate(new Date(e));
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
                        onClose={toggleModal}
                        title="Edit Pre Order Product Settings"
                        primaryAction={{
                            content: "Close",
                            onAction: toggleModal,
                        }}
                        secondaryActions={{
                            content: "Submit",
                            onAction: toggleModal
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
                                                value={editStartDate.toISOString().slice(0, 10)}
                                                onChange={(e) => changeEditStartDate(e)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextField
                                                label="End Date"
                                                type="date"
                                                value={editEndDate.toISOString().slice(0,10)}
                                                onChange={(e) => setEditEndDate(e.target.value)}
                                                disabled={hasEndDate}
                                            />
                                            <Checkbox label="No End Date" checked={hasEndDate} onChange={() => setHasEndDate(!hasEndDate)}/>
                                        </div>
                                    </div>

                                    <div className="flex items-end">
                                        <div className="flex-1 mr-3">
                                            <TextField
                                                label="Order Limit"
                                                type="number"
                                                value={editProductData.order_limit ?? 0}
                                                onChange={() => changeEditOrderLimit()}
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col self-end">
                                            <div className="flex-1 mr-3">
                                                <Checkbox label="Display Message" checked={editProductData.display_message} onChange={() => changeEditDisplayMessage()}/>
                                            </div>

                                            <div className="flex-1">
                                                <Checkbox label="Display Badge" checked={editProductData.display_badge} onChange={() => changeEditDisplayBadge()}/>
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

    const saveSelectedProducts = async (data) => {
        const formData = new FormData();

        formData.append("product_id", data.id);
        formData.append("variant_id", "");
        formData.append("title", data.title);
        formData.append("start_date", new Date().toISOString());
        formData.append("end_date", "");
        formData.append("order_limit", "");
        formData.append("display_message", 0);
        formData.append("display_badge", 0);

        const response = await fetch("/api/preorder/products/store", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastContent("Product Saved Successfully.");
            toggleToastActive(true);
            getPreOrderProducts();
        }
    };

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
            getPreOrderProducts();
        }
        console.log(id + " " + product_id);
    };

    const selectProduct = (SelectPayload) => {
        setOpenResourcePicker(false);
        let productPayload = SelectPayload.selection;
        for (let i = 0; i < productPayload.length; i++) {
            saveSelectedProducts(productPayload[i]);
        }
    };
    const cancelResourcePicker = () => {
        setOpenResourcePicker(false);
        console.log("Cancelled....");
    };
    const activeResourcePicker = () => {
        console.log("Active Resource Picker", openResourcePicker);
        setOpenResourcePicker(true);
    };

    const editProductFromPreOrderList = (productData) => {
        console.log(productData);
        setEditProductData(productData);
        if(productData.start_date) {
            setEditStartDate(new Date(productData.start_date))
        }

        if(productData.end_date) {
            setEditEndDate(new Date(productData.end_date))
            setHasEndDate(false)
        }

        if(productData.display_message) {
            setEditCheckDisplayMessage(productData.display_message)
        }

        if(productData.display_badge) {
            setEditCheckDisplayBadge(productData.display_badge)
        }

        toggleModal();
    };

    const toggleModal = useCallback(
        () => setEditModalActive((editModalActive) => !editModalActive),
        []
    );

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(preOrderProducts);

    const resourceName = {
        singular: "order",
        plural: "orders",
    };

    const rowMarkup = preOrderProducts.map(
        (
            {
                id,
                product_id,
                title,
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
                        {title}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{start_date ?? "Not set"}</IndexTable.Cell>
                <IndexTable.Cell>{end_date ?? "Not set"}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" numeric alignment="justify">
                        {order_limit ?? "Unlimited"}
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
                                editProductFromPreOrderList({
                                    id: id,
                                    product_id: product_id,
                                    title: title,
                                    start_date: start_date,
                                    end_date: end_date,
                                    order_limit: order_limit,
                                    display_message: display_message,
                                    display_badge: display_badge,
                                })
                            }
                        >
                            <Icon source={EditMajor} tone="base" />
                        </Button>
                        <Button
                            onClick={() =>
                                deleteProductFromPreOrderList(id, product_id)
                            }
                        >
                            <Icon source={DeleteMajor} tone="base" />
                        </Button>
                    </div>
                </IndexTable.Cell>
            </IndexTable.Row>
        )
    );

    const getPreOrderProducts = async () => {
        const response = await fetch("/api/preorder/products");
        if (response.ok) {
            const preOrderProducts = await response.json();
            const products = preOrderProducts.data;
            setPreOrderProducts(products);
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
        getPreOrderProducts();
    }, []);

    return (
        <>
            {editProductData != null && <EditProductFormModal />}
            <Frame>
                {toastMarkup}
                {isLoadingProducts && preOrderProducts.length === 0 && (
                    <ProductsTableSkeleton title={"Product List"} />
                )}
                {!isLoadingProducts && preOrderProducts.length > 0 && (
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
                                    itemCount={preOrderProducts.length}
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
                                        { title: "Order Limit" },
                                        { title: "Display Message" },
                                        { title: "Display Badge" },
                                        { title: "Actions" },
                                    ]}
                                >
                                    {preOrderProducts.length > 0 && rowMarkup}
                                </IndexTable>
                            </Card>
                        </BlockStack>
                    </Page>
                )}
            </Frame>
        </>
    );
}
