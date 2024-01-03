import {
    BlockStack,
    Button,
    Card,
    Divider,
    OptionList,
    Text,
} from "@shopify/polaris";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks";

export default function Activation() {
    const fetch = useAuthenticatedFetch();
    const [isPreOrderActive, setIsPreOrderStatus] = useState(true);
    const [
        preOrderActivationOnProductOrCollection,
        setPreOrderActivationOnProductOrCollection,
    ] = useState([]);

    const changePreOrderStatus = useCallback(() => {
        setIsPreOrderStatus(!isPreOrderActive);
    });

    const getPreOrderInitSettings = async () => {
        const response = await fetch("/api/preorder/init");

        if (response.ok) {
            const responseData = await response.json();
            console.log("Success: ", responseData);

        } else {
            console.log("Error: ", response);
        }
    };

    const saveActivation = async () => {
        const formData = new FormData();
        formData.append("active", isPreOrderActive);

        let activeOnProduct = true;
        let activeOnCollection = false;

        if (preOrderActivationOnProductOrCollection.length === 2) 
        {
            activeOnProduct = true;
            activeOnCollection = true;

            formData.append("active_on_product", activeOnProduct);
            formData.append("active_on_collection", activeOnCollection);

        } 
        else if (preOrderActivationOnProductOrCollection.length === 1) 
        {
            if (preOrderActivationOnProductOrCollection[0] === "product_page") 
            {
                activeOnProduct = true;
                formData.append("active_on_product", activeOnProduct);
            } 
            else 
            {
                activeOnCollection = true;
                formData.append("active_on_collection", activeOnCollection);
            }
        } 
        else 
        {
            activeOnProduct = false;
            activeOnCollection = false;

            formData.append("active_on_product", activeOnProduct);
            formData.append("active_on_collection", activeOnCollection);
        }

        const response = await fetch("/api/preorder/save", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data), 
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const responseData = await response.json();
        getPreOrderInitSettings();
    };

    useEffect(() => {
        getPreOrderInitSettings();
    }, []);

    return (
        <>
            <BlockStack gap="500">
                <Text variant="headingXl" as="h4">
                    Activation Area
                </Text>
                <Divider borderColor="border" />
                <Card>
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <Text variant="headingMd" as="h5">
                                Activation Status
                            </Text>
                            <p>
                                Current Status:{" "}
                                {isPreOrderActive && (
                                    <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ml-1">
                                        On
                                    </span>
                                )}
                                {!isPreOrderActive && (
                                    <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ml-1">
                                        Off
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="ml-auto">
                            {isPreOrderActive && (
                                <Button
                                    variant="primary"
                                    tone="critical"
                                    onClick={changePreOrderStatus}
                                >
                                    Deactive
                                </Button>
                            )}
                            {!isPreOrderActive && (
                                <Button
                                    variant="primary"
                                    onClick={changePreOrderStatus}
                                >
                                    Active
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center">
                        <div className="flex flex-col w-full">
                            <div>
                                <Text variant="headingMd" as="h6">
                                    Where to show
                                </Text>
                                <Text>
                                    You will be able to active this on Product
                                    page and Collection page.{" "}
                                </Text>
                                <div className="mt-3 mb-2">
                                    <Divider borderColor="border" />
                                </div>
                            </div>
                            <OptionList
                                onChange={
                                    setPreOrderActivationOnProductOrCollection
                                }
                                options={[
                                    {
                                        value: "product_page",
                                        label: "Product Page",
                                    },
                                    {
                                        value: "collection_page",
                                        label: "Collection Page",
                                    },
                                ]}
                                selected={
                                    preOrderActivationOnProductOrCollection
                                }
                                allowMultiple
                            />
                        </div>
                    </div>
                </Card>
            </BlockStack>
            <div className="mt-3">
                <Button
                    variant="primary"
                    size="large"
                    onClick={() => saveActivation()}
                >
                    Save
                </Button>
            </div>
        </>
    );
}
