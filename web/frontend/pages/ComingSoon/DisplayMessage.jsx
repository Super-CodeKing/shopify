import {
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
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import SkeletonBodyWithDisplay from "./Skeleton/SkeletonBodyWithDisplay";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayMessage } from "../../store/reducers/ComingSoon";

export default function DisplayMessage() {
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();
    const displayMessageRedux = useSelector((state) => state.comingsoon.displayMessage);

    const emptyToastProps = { content: null };
    const [loading, setLoading] = useState(false);
    
    const displayMessageExample = [
        "Product will be available soon",
        "⌚ Estimated restock date: 23/01/2024",
        "🎉 Cash on Delivery",
    ];

    const alignmentOptions = [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
    ];

    const positionOptions = [
        { label: "Before Coming Soon Button", value: "before-comingsoon-button" },
        { label: "After Coming Soon Button", value: "after-comingsoon-button" },
    ];

    const [toastProps, setToastProps] = useState(emptyToastProps);
    const [selectedMessageIndex, setSelectedMessageIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [selectPosition, setSelectPosition] = useState("before-comingsoon-button");
    const [selectAlignment, setSelectAlignment] = useState("left");

    const toastMarkup = toastProps.content && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    );

    const handleChangeDisplayMessageExample = (index) => {
        setSelectedMessageIndex(index);
        setMessage(displayMessageExample[index]);
    };

    const changeDisplayMessage = (message) => {
        setMessage(message);
    };

    const changeMessagePosition = (position) => {
        setSelectPosition(position);
    };

    const changeMessageAlignment = (alignment) => {
        setSelectAlignment(alignment);
    };

    const saveComingSoonDisplayMessage = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("message", message);
        formData.append("position", selectPosition);
        formData.append("alignment", selectAlignment);

        const response = await fetch("/api/coming-soon/display-message", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            setToastProps({
                content: "Something went wrong!",
                error: true,
            });
            setLoading(false);
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            setToastProps({
                content: "Coming Soon Display Message Saved Successfully!"
            });
            getComingSoonDisplayMessage();
            setLoading(false);
        }
    }

    const setComingSoonDisplayMessage = (comingSoonDisplayMessage) => {
        if(Object.keys(comingSoonDisplayMessage).length !== 0) {
            setMessage(comingSoonDisplayMessage.message);
            setSelectPosition(comingSoonDisplayMessage.position);
            setSelectAlignment(comingSoonDisplayMessage.alignment);
        } else {
            setMessage(displayMessageExample[0]);
            setSelectPosition(positionOptions[0].value);
            setSelectAlignment(alignmentOptions[0].value);
        }
    }

    const getComingSoonDisplayMessage = async () => {
        const response = await fetch("/api/coming-soon/display-message");
        if (response.ok) {
            const comingSoonDisplayMessage = await response.json();
            dispatch(setDisplayMessage(comingSoonDisplayMessage));
            setComingSoonDisplayMessage(comingSoonDisplayMessage);
            setLoading(false)
        } else {
            setLoading(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    const isDataChanged = useCallback(() => {
        let flagDisplayMessage = false;
        let flagMessagePosition = false;
        let flagMessageAllignment = false;

        if(message !== displayMessageRedux.message){
            flagDisplayMessage = true;
        }

        if(selectPosition !== displayMessageRedux.position) {
            flagMessagePosition = true;
        }

        if(selectAlignment !== displayMessageRedux.alignment) {
            flagMessageAllignment = true;
        }

        if(flagDisplayMessage || flagMessagePosition || flagMessageAllignment) {
            return true;
        }
        return false;
    }, [message, selectPosition, selectAlignment, displayMessageRedux]);

    useEffect(() => {
        setLoading(true);
        if(Object.keys(displayMessageRedux).length === 0) getComingSoonDisplayMessage();
        else {
            setComingSoonDisplayMessage(displayMessageRedux);
            console.log(displayMessageRedux);
            setLoading(false);
        };
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
                                        value={message}
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
                                                "before-comingsoon-button" && (
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
                                                    {message}
                                                </p>
                                            )}
                                            <button
                                                className={`text-white font-bold my-2 py-2 px-4 rounded-full flex items-center justify-center bg-black`}
                                            >
                                                Coming Soon
                                            </button>
                                            {selectPosition ==
                                                "after-comingsoon-button" && (
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
                                                    {message}
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
                            disabled={!isDataChanged()}
                            onClick={() => saveComingSoonDisplayMessage()}
                        >
                            Save
                        </Button>
                    </div>
                </Page>}
            </div>
        </>
    );
}
