import { useState } from "react";
import TextFieldWithDatePicker from "../../../components/TextFieldWithDatePicker";
import { 
    Frame, 
    Modal,
    Form,
    FormLayout,
    TextField,
    Checkbox
} from "@shopify/polaris";

export default function EditProductFormModal({active, onClose, product}) {
    console.log("Edit Product Details: ", product);
    const [startDate, setStartDate] = useState(product?.start_date);
    const [endDate, setEndDate] = useState(product?.end_date);
    const [hasEndDate, setHasEndDate] = useState(product?.has_end_date);
    const [restockDate, setRestockDate] = useState(product?.restock_date);
    const [hasRestockDate, setHasRestockDate] = useState(product?.has_restock_date);
    const [checkDisplayMessage, setCheckDisplayMessage] = useState(product?.display_message);
    const [checkDisplayBadge, setCheckDisplayBadge] = useState(product?.display_badge);

    const updateEditProductData = async () => {
        console.log("New Value: ", restockDate);
        // const formData = new FormData();

        // let endDate = null;
        // let restockDate = null; 

        // if(editHasEndDate) {
        //     endDate = null;
        // } else {
        //     endDate = editEndDate.toISOString();
        // }

        // if(editHasRestockDate) {
        //     restockDate = null;
        // } else {
        //     restockDate = editRestockDate.toISOString();
        // }

        // let displayMessage = editCheckDisplayMessage;
        // if (editCheckDisplayMessage) {
        //     displayMessage = 1;
        // } else {
        //     displayMessage = 0;
        // }

        // let displayBadge = editCheckDisplayBadge;
        // if (editCheckDisplayBadge) {
        //     displayBadge = 1;
        // } else {
        //     displayBadge = 0;
        // }

        // formData.append("id", editProductData.id);
        // formData.append("product_id", editProductData.product_id);
        // formData.append("variant_id", editProductData.variant_id);
        // formData.append("title", editProductData.title);
        // formData.append("start_date", editStartDate.toISOString());
        // formData.append("end_date", endDate);
        // formData.append("has_end_date", editHasEndDate)
        // formData.append("restock_date", restockDate);
        // formData.append("has_restock_date", editHasRestockDate);
        // formData.append("display_message", displayMessage);
        // formData.append("display_badge", displayBadge);

        // const response = await fetch("/api/coming-soon/products/update", {
        //     method: "POST",
        //     body: formData ? formData : JSON.stringify(data),
        // });

        // if (!response.ok) {
        //     throw new Error(`HTTP error ${response.status}`);
        // }

        // if (response.ok) {
        //     setToastContent("Product Updated Successfully.");
        //     toggleToastActive(true);
        //     getComingSoonProducts();
        //     setEditModalActive(false);
        // }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div style={{ height: "500px" }} className="absolute">
            <Frame>
                <Modal
                    open={active}
                    onClose={() => handleClose() }
                    title="Edit Coming Soon Product Settings"
                    primaryAction={{
                        content: "Close",
                        onAction: () => handleClose(),
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
                                    value={product.title}
                                    readOnly
                                />

                                <div className="flex">
                                    <div className="flex-1 mr-3">
                                        <TextFieldWithDatePicker
                                            label={"Start Date"}
                                            initialDate={startDate}
                                            setDate={setStartDate}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <TextFieldWithDatePicker
                                            label={"End Date"}
                                            initialDate={endDate}
                                            setDate={setEndDate}
                                        />
                                        <Checkbox
                                            label="No End Date"
                                            checked={hasEndDate}
                                            onChange={() => setHasEndDate(!hasEndDate)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-end">
                                    <div className="flex-1 mr-3">
                                        <TextFieldWithDatePicker
                                            label={"Restock Date"}
                                            initialDate={restockDate}
                                            setDate={setRestockDate}
                                        />
                                        <Checkbox
                                            label="No Restock Date"
                                            checked={hasRestockDate}
                                            onChange={() => setHasRestockDate(!hasRestockDate)}
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex-1 mr-3">
                                            <Checkbox
                                                label="Display Message"
                                                checked={checkDisplayMessage}
                                                onChange={() => changeEditDisplayMessage()}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Checkbox
                                                label="Display Badge"
                                                checked={checkDisplayBadge}
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
