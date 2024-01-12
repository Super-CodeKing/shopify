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
    const [editEndDate, setEditEndDate] = useState(
        new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    );
    const [editOrderLimit, setEditOrderLimit] = useState(0);
    const [hasEndDate, setHasEndDate] = useState(true);
    const [editCheckDisplayMessage, setEditCheckDisplayMessage] =
        useState(false);
    const [editCheckDisplayBadge, setEditCheckDisplayBadge] = useState(false);
    const [countSaveProduct, setCountSaveProduct] = useState(0);

    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        []
    );

    const changeEditStartDate = (e) => {
        setEditStartDate(new Date(e));
    };

    const changeEditEndDate = (e) => {
        setEditEndDate(new Date(e));
    };

    const changeEditOrderLimit = (event) => {
        const newValue = Number(event);
        setEditOrderLimit(newValue);
    };

    const changeEditDisplayMessage = () => {
        setEditCheckDisplayMessage(!editCheckDisplayMessage);
    };

    const changeEditDisplayBadge = () => {
        setEditCheckDisplayBadge(!editCheckDisplayBadge);
    };

    const updateEditProductData = async () => {
        const formData = new FormData();
        let endDate = editEndDate.toISOString();

        if (hasEndDate) {
            endDate = null;
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
        formData.append("order_limit", editOrderLimit);
        formData.append("display_message", displayMessage);
        formData.append("display_badge", displayBadge);

        const response = await fetch("/api/preorder/products/update", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastContent("Product Updated Successfully.");
            toggleToastActive(true);
            getPreOrderProducts();
            setEditModalActive(false);
        }
    };

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
                        title="Edit Pre Order Product Settings"
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
                                                value={editStartDate
                                                    .toISOString()
                                                    .slice(0, 10)}
                                                onChange={(e) =>
                                                    changeEditStartDate(e)
                                                }
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextField
                                                label="End Date"
                                                type="date"
                                                value={editEndDate
                                                    .toISOString()
                                                    .slice(0, 10)}
                                                onChange={(e) =>
                                                    changeEditEndDate(e)
                                                }
                                                disabled={hasEndDate}
                                            />
                                            <Checkbox
                                                label="No End Date"
                                                checked={hasEndDate}
                                                onChange={() =>
                                                    setHasEndDate(!hasEndDate)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-end">
                                        <div className="flex-1 mr-3">
                                            <TextField
                                                label="Order Limit"
                                                type="number"
                                                value={editOrderLimit}
                                                onChange={changeEditOrderLimit}
                                                step={1}
                                                min={0}
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col self-end">
                                            <div className="flex-1 mr-3">
                                                <Checkbox
                                                    label="Display Message"
                                                    checked={
                                                        editCheckDisplayMessage
                                                    }
                                                    onChange={() =>
                                                        changeEditDisplayMessage()
                                                    }
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <Checkbox
                                                    label="Display Badge"
                                                    checked={
                                                        editCheckDisplayBadge
                                                    }
                                                    onChange={() =>
                                                        changeEditDisplayBadge()
                                                    }
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

    const preOrderDataProcess = (data) => {
        let processData = [];
        for (let i = 0; i < data.length; i++) {
            let dataObject = {
                product_id: data[i].id,
                title: data[i].title,
                start_date: new Date(),
                end_date: "",
                order_limit: "",
                display_message: 0,
                display_badge: 0,
            };
            processData.push(dataObject);
        }
        return processData;
    };

    const saveSelectedProducts = async (data) => {
        const processedPreOrderProductData = preOrderDataProcess(data);
        const response = await fetch("/api/preorder/products/store", {
            method: "POST",
            body: JSON.stringify(processedPreOrderProductData),
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
        console.log("Active Resource Picker", openResourcePicker);
        setOpenResourcePicker(true);
    };

    const editProductFromPreOrderList = (productData) => {
        setEditProductData(productData);

        if (productData.start_date) {
            setEditStartDate(new Date(productData.start_date));
        }

        if (productData.end_date) {
            setEditEndDate(new Date(productData.end_date));
            setHasEndDate(false);
        }

        if (productData.display_message) {
            setEditCheckDisplayMessage(productData.display_message);
        }

        if (productData.display_badge) {
            setEditCheckDisplayBadge(productData.display_badge);
        }

        if (productData.order_limit) {
            setEditOrderLimit(productData.order_limit ?? 0);
        }

        toggleModal();
    };

    const toggleModal = () => {
        setEditModalActive(true);
    };

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
                <IndexTable.Cell>
                    {new Date(start_date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }) ?? "Not set"}
                </IndexTable.Cell>
                <IndexTable.Cell>{end_date ? new Date(end_date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }) : "Not set"}</IndexTable.Cell>
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
                {isLoadingProducts && (
                    <ProductsTableSkeleton title={"Product List"} has_button={true} button_title={"Add Product"}/>
                )}
                {!isLoadingProducts && (
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
                                    {preOrderProducts.length === 0 && <p>Empty</p>}
                                </IndexTable>
                            </Card>
                        </BlockStack>
                    </Page>
                )}
            </Frame>
        </>
    );
}
