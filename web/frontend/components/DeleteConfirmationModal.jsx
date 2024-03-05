import React, { useState } from "react";
import { Button, Modal, Text } from "@shopify/polaris";

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm action",
    message = "Are you sure you want to perform this action?",
    confirmButtonLabel = "Confirm",
    cancelButtonLabel = "Cancel",
}) {
    return (
        <>
            <Modal open={isOpen} onClose={onClose} title={title}>
                <Modal.Section>
                    <Text>{message}</Text>
                </Modal.Section>
                <Modal.Section>
                    <div className="flex justify-end">
                        <Button onClick={onClose}>{cancelButtonLabel}</Button>
                        <div className="ml-2">
                            <Button
                                variant="primary" 
                                tone="critical"
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                {confirmButtonLabel}
                            </Button>
                        </div>
                    </div>
                </Modal.Section>
            </Modal>
        </>
    );
}
