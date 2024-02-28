import { useEffect, useState } from "react";
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
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hasEndDate, setHasEndDate] = useState(0);
    const [restockDate, setRestockDate] = useState('');
    const [hasRestockDate, setHasRestockDate] = useState(0);
    const [checkDisplayMessage, setCheckDisplayMessage] = useState(0);
    const [checkDisplayBadge, setCheckDisplayBadge] = useState(0);

    const updateEditProductData = async () => {
        const formData = new FormData();

        formData.append("id", product?.id);
        formData.append("product_id", product?.product_id);
        formData.append("variant_id", product?.variant_id);
        formData.append("title", product?.title);

        console.log("Start Date: ", startDate);
        console.log("Start Date Type: ", typeof startDate);

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

    const setEditProductData = () => {
        setStartDate(product?.start_date);
        setEndDate(product?.end_date);
        setHasEndDate(product?.has_end_date);
        setRestockDate(product?.restock_date);
        setHasRestockDate(product?.has_restock_date);
        setCheckDisplayMessage(product?.display_message);
        setCheckDisplayBadge(product?.display_badge);
    }

    useEffect(() => {
        setEditProductData();
    })

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
                        <div className="mx-2">
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
                                                isDisabled={hasEndDate}
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
                                                isDisabled={hasRestockDate}
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
                                                    onChange={() => setCheckDisplayMessage(!checkDisplayMessage)}
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <Checkbox
                                                    label="Display Badge"
                                                    checked={checkDisplayBadge}
                                                    onChange={() => setCheckDisplayBadge(!checkDisplayBadge)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </FormLayout>
                            </Form>
                        </div>
                    </Modal.Section>
                </Modal>
            </Frame>
        </div>
    );
}
