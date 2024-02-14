import {
    Badge,
    BlockStack,
    Card,
    TextField,
    Text,
    Page,
    Divider,
    Button,
    Select,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import SkeletonBodyWithDisplay from "./Skeleton/SkeletonBodyWithDisplay";

export default function DisplayMessage() {
    const emptyToastProps = { content: null };
    const fetch = useAuthenticatedFetch();
    const [loading, setLoading] = useState(false);
    
    const displayMessageExample = [
        "📢 10% discount on Pre Order",
        "Limited Time ⌚",
        "🎉 Cash on Delivery",
    ];

    const alignmentOptions = [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
    ];

    const positionOptions = [
        { label: "Before Pre-Order Button", value: "before-preorder-button" },
        { label: "After Pre-Order Button", value: "after-preorder-button" },
    ];

    const [toastProps, setToastProps] = useState(emptyToastProps);
    const [selectedMessageIndex, setSelectedMessageIndex] = useState(0);
    const [displayMessage, setDisplayMessage] = useState("");
    const [selectPosition, setSelectPosition] = useState("before-preorder-button");
    const [selectAlignment, setSelectAlignment] = useState("left");

    const toastMarkup = toastProps.content && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    );

    const handleChangeDisplayMessageExample = (index) => {
        setSelectedMessageIndex(index);
        setDisplayMessage(displayMessageExample[index]);
    };

    const changeDisplayMessage = (message) => {
        setDisplayMessage(message);
    };

    const changeMessagePosition = (position) => {
        setSelectPosition(position);
    };

    const changeMessageAlignment = (alignment) => {
        setSelectAlignment(alignment);
    };

    const savePreOrderDisplayMessage = async () => {
        const formData = new FormData();
        formData.append("message", displayMessage);
        formData.append("position", selectPosition);
        formData.append("alignment", selectAlignment);

        const response = await fetch("/api/preorder/display-message", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            setToastProps({
                content: "Something went wrong!",
                error: true,
            });
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastProps({
                content: "Pre Order Display Message Saved Successfully!"
            });
        }
    }

    const getPreOrderDisplayMessage = async () => {
        const response = await fetch("/api/preorder/display-message");

        if (response.ok) {
            const preOrderDisplayMessage = await response.json();
            console.log("Display Message: ", preOrderDisplayMessage);
            if(Object.keys(preOrderDisplayMessage).length !== 0) {
                setDisplayMessage(preOrderDisplayMessage.message);
                setSelectPosition(preOrderDisplayMessage.position);
                setSelectAlignment(preOrderDisplayMessage.alignment);
            } else {
                setDisplayMessage(displayMessageExample[0]);
                setSelectPosition(positionOptions[0].value);
                setSelectAlignment(alignmentOptions[0].value);
            }
            setLoading(false)
        } else {
            setLoading(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        setLoading(true);
        getPreOrderDisplayMessage();
    }, []);

    return (
        <>
            {toastMarkup}
            <div className="display-message [&>div>div]:pt-0">
                {loading === true && <SkeletonBodyWithDisplay title="Display Message Settings" />}
                {loading === false && <Page fullWidth>
                    <BlockStack gap="500">
                        <Text variant="headingXl" as="h4">
                            Display Message on Product Page
                        </Text>
                        <Divider borderColor="border" />
                    </BlockStack>
                    <div className="flex mt-5">
                        <div className="flex-1 mr-5">
                            <BlockStack gap="500">
                                <Card>
                                    <Text variant="headingMd" as="h6">
                                        Select Template
                                    </Text>
                                    <Text>
                                        We have provided some templates for your
                                        quick start. You will be able to use any
                                        symbol or emoji here.
                                    </Text>
                                    <div className="mt-3 mb-3">
                                        {displayMessageExample.map(
                                            (message, index) => (
                                                <p
                                                    className={`my-3 ${
                                                        selectedMessageIndex ===
                                                        index
                                                            ? "border border-1 border-indigo-400"
                                                            : "border"
                                                    }`}
                                                >
                                                    <p
                                                        key={index}
                                                        className={`p-2 m-1 cursor-pointer`}
                                                        onClick={() =>
                                                            handleChangeDisplayMessageExample(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        {message}
                                                    </p>
                                                </p>
                                            )
                                        )}
                                    </div>

                                    <TextField
                                        label="Edit selected template"
                                        value={displayMessage}
                                        onChange={(e) => changeDisplayMessage(e)}
                                        multiline={4}
                                        autoComplete="off"
                                    />

                                    <div className="flex my-3">
                                        <div className="mr-5 flex-1">
                                            <Select
                                                label="Position"
                                                options={positionOptions}
                                                onChange={changeMessagePosition}
                                                value={selectPosition}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Select
                                                label="Alignment"
                                                options={alignmentOptions}
                                                onChange={changeMessageAlignment}
                                                value={selectAlignment}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </BlockStack>
                        </div>
                        <div className="flex-1">
                            <div className="border-dashed border-2 border-indigo-600 h-full rounded-md flex items-center">
                                <div className="flex mx-auto">
                                    <img
                                        className="flex-1 w-32 mr-5"
                                        src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081"
                                        alt="Placeholder Image"
                                    />
                                    <div className="flex-1">
                                        <div className="flex flex-col">
                                            <Text as="h4" variant="headingLg">
                                                The 3p Fulfilled Snowboard
                                            </Text>
                                            <Text>$2,629.95</Text>
                                            <div className="py-2">
                                                <Text>Quantity</Text>
                                                <div className="w-fit flex flex-wrap border border-gray-300 px-2 py-1 rounded-full my-1">
                                                    <p className="px-2">-</p>
                                                    <p className="px-2">1</p>
                                                    <p className="px-2">+</p>
                                                </div>
                                            </div>
                                            {selectPosition ==
                                                "before-preorder-button" && (
                                                <p
                                                    style={{
                                                        textAlign:
                                                            selectAlignment ===
                                                            "right"
                                                                ? "right"
                                                                : selectAlignment ===
                                                                "center"
                                                                ? "center"
                                                                : "left",
                                                    }}
                                                >
                                                    {displayMessage}
                                                </p>
                                            )}
                                            <button
                                                className={`text-white font-bold my-2 py-2 px-4 rounded-full flex items-center justify-center bg-black`}
                                            >
                                                Pre Order
                                            </button>
                                            {selectPosition ==
                                                "after-preorder-button" && (
                                                <p
                                                    style={{
                                                        textAlign:
                                                            selectAlignment ===
                                                            "right"
                                                                ? "right"
                                                                : selectAlignment ===
                                                                "center"
                                                                ? "center"
                                                                : "left",
                                                    }}
                                                >
                                                    {displayMessage}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <Button
                            variant="primary"
                            size="large"
                            onClick={() => savePreOrderDisplayMessage()}
                        >
                            Save
                        </Button>
                    </div>
                </Page>}
            </div>
        </>
    );
}
