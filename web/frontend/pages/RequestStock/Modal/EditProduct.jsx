import { useCallback, useEffect, useState } from "react";
import TextFieldWithDatePicker from "../../../components/TextFieldWithDatePicker";
import { 
    Frame, 
    Modal,
    Form,
    FormLayout,
    TextField,
    Checkbox,
    Toast
} from "@shopify/polaris";
import { useAuthenticatedFetch } from "../../../hooks";

export default function EditProductFormModal({active, onSuccess, onClose, product}) {
    const fetch = useAuthenticatedFetch();

    const [toastActive, setToastActive]                     = useState(false);
    const [toastContent, setToastContent]                   = useState("");
    const [startDate, setStartDate]                         = useState('');
    const [endDate, setEndDate]                             = useState('');
    const [hasEndDate, setHasEndDate]                       = useState(0);
    const [restockDate, setRestockDate]                     = useState('');
    const [hasRestockDate, setHasRestockDate]               = useState(0);
    const [checkDisplayMessage, setCheckDisplayMessage]     = useState(0);
    const [checkDisplayBadge, setCheckDisplayBadge]         = useState(0);

    const toggleToastActive = useCallback(() => setToastActive((toastActive) => !toastActive),[]);

    const falsyValueModifier = (value) => {
        let hasValue = 0;
        
        if(value == false || value == 'false' || value == 0) hasValue = 0;
        else if(value == true || value == 'true' || value == 1) hasValue = 1;
        
        return hasValue;
    }

    const updateEditProductData = async () => {
        const formData = new FormData();

        formData.append("id", product?.id);
        formData.append("product_id", product?.product_id);
        formData.append("variant_id", product?.variant_id);
        formData.append("title", product?.title);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("no_end_date", falsyValueModifier(hasEndDate));
        formData.append("restock_date", restockDate);
        formData.append("no_restock_date", falsyValueModifier(hasRestockDate));
        formData.append("display_message", falsyValueModifier(checkDisplayMessage));
        formData.append("display_badge", falsyValueModifier(checkDisplayBadge));

        const response = await fetch("/api/request-stock/products/update", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastContent("Product Updated Successfully.");
            toggleToastActive(true);
            onSuccess();
            handleClose(2);
        }
    };

    const toastMarkup = toastActive ? (
        <Toast content={toastContent} onDismiss={toggleToastActive} />
    ) : null;

    const handleClose = (notFromSubmit = 1) => {
        onClose(notFromSubmit);
    };

    const setEditProductData = () => {
        setStartDate(product?.start_date);
        setEndDate(product?.end_date);
        setHasEndDate(product?.no_end_date);
        setRestockDate(product?.restock_date);
        setHasRestockDate(product?.no_restock_date);
        setCheckDisplayMessage(product?.display_message);
        setCheckDisplayBadge(product?.display_badge);
    }

    useEffect(() => {
        setEditProductData();
    }, [])

    return (
        <div style={{ height: "500px" }} className="absolute">
            <Frame>
                {toastMarkup}
                <Modal
                    open={active}
                    onClose={() => handleClose() }
                    title="Edit Request Stock Product Settings"
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
