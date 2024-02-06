import {
    Badge,
    BlockStack,
    Card,
    TextField,
    Text,
    Page,
    Divider,
    Button,
    Banner,
    ColorPicker,
    RadioButton,
    Popover,
    hsbToHex,
    hexToRgb,
    rgbToHsb,
    RangeSlider,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import '../../assets/preorder.css'
import ToggleColorActivator from "../../components/ToggleColorActivator";

export default function BadgeDesign() {
    const emptyToastProps = { content: null };
    const fetch = useAuthenticatedFetch();

    const [toastProps, setToastProps] = useState(emptyToastProps);
    const [ribbonBadgePosition, setRibbonBadgePosition] = useState("top-right");
    const [ribbonBadgeText, setRibbonBadgeText] = useState("Pre Order");
    const [ribbonBadgeTextColor, setRibbonBadgeTextColor] = useState({hue: 120,brightness: 1,saturation: 1,});
    
    const [backgroundColorPickerActive, setBackgroundColorPickerActive] = useState(false);
    const [badgeTextColorPickerActive, setBackgroundHoverColorPickerActive] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });

    const [backgroundHexColor, setBackgroundHexColor] = useState("#121212");
    const [badgeTextColor, setBadgeTextColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [badgeTextHexColor, setBadgeTextHexColor] = useState("#ffffff");
    const [buttonFontSizeValue, setButtonFontSizeValue] = useState(16);

    const [ribbonRightLeftValue, setRibbonRightLeftValue] = useState(-25);

    const toggleBackgroundColorPicker = () => {
        setBackgroundColorPickerActive(!backgroundColorPickerActive);
    };

    const toggleBadgeTextColorPicker = () => {
        setBackgroundHoverColorPickerActive(!badgeTextColorPickerActive);
    };

    const changeButtonFontSize = (value) => setButtonFontSizeValue(value);

    const handleBackgroundColorChange = (newColor) => {
        const hexColor = hsbToHex(newColor);
        setBackgroundColor(newColor);
        setBackgroundHexColor(hexColor);
    };

    const handleBadgeTextColorChange = (newColor) => {
        const hexColor = hsbToHex(newColor);
        setBadgeTextHexColor(hexColor);
        setBadgeTextColor(newColor);
    };

    const handleBadgeTextColorChangeFromInput = (newColor) => {
        const rgbColor = hexToRgb(newColor);
        const hsbColor = rgbToHsb(rgbColor);
        setBadgeTextHexColor(newColor)
        setBadgeTextColor(hsbColor);
    };

    const handleBackgroundColorChangeFromInput = (newColor) => {
        const rgbColor = hexToRgb(newColor);
        const hsbColor = rgbToHsb(rgbColor);
        setBackgroundHexColor(newColor)
        setBackgroundColor(hsbColor);
    };

    const changeRibbonBadgePosition = useCallback((event, ribbonBadgePosition) => {
            setRibbonBadgePosition(ribbonBadgePosition), [];
        }
    );

    const changeRibbonBadgeText = useCallback((newValue) => setRibbonBadgeText(newValue),[]);

    const changeRibbonBadgeTextColor = useCallback((newValue) => {
        setRibbonBadgeTextColor(newValue);
    }, []);

    const toastMarkup = toastProps.content && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    );

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
            
        } else {
            setToastContent("Something went wrong");
            setIsErrorToast(true);
            setShowToast(true);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        //getPreOrderDisplayMessage();
    }, []);

    return (
        <>
            {toastMarkup}
            <div className="display-message [&>div>div]:pt-0">
                <Page fullWidth>
                    <BlockStack gap="500">
                        <Text variant="headingXl" as="h4">
                            Pre Order Badge Design
                        </Text>
                        <Divider borderColor="border" />
                    </BlockStack>
                    <div className="flex mt-5">
                        <div className="flex-1 mr-5">
                            <BlockStack gap="500">
                                <Card>
                                <TextField
                                    label="Badge Text"
                                    value={ribbonBadgeText}
                                    onChange={changeRibbonBadgeText}
                                    autoComplete="off"
                                />
                                <p className="mt-5">Badge Position</p>
                                <div className="flex">
                                    <div className="grow">
                                        <RadioButton
                                            label="Top Left"
                                            checked={ribbonBadgePosition === "top-left"}
                                            id="preOrderRibbonTopLeft"
                                            name="preOrderRibbonBadgePosition"
                                            onChange={(event) =>
                                                changeRibbonBadgePosition(
                                                    event,
                                                    "top-left"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="grow">
                                        <RadioButton
                                            label="Top Right"
                                            id="preOrderRibbonTopRight"
                                            name="preOrderRibbonBadgePosition"
                                            checked={
                                                ribbonBadgePosition === "top-right"
                                            }
                                            onChange={(event) =>
                                                changeRibbonBadgePosition(
                                                    event,
                                                    "top-right"
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex mb-3">
                                    <div className="grow">
                                        <RadioButton
                                            label="Bottom Left"
                                            checked={
                                                ribbonBadgePosition === "bottom-left"
                                            }
                                            id="preOrderRibbonBottomLeft"
                                            name="preOrderRibbonBadgePosition"
                                            onChange={(event) =>
                                                changeRibbonBadgePosition(
                                                    event,
                                                    "bottom-left"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="grow">
                                        <RadioButton
                                            label="Bottom Right"
                                            id="preOrderRibbonBottomRight"
                                            name="preOrderRibbonBadgePosition"
                                            checked={
                                                ribbonBadgePosition === "bottom-right"
                                            }
                                            onChange={(event) =>
                                                changeRibbonBadgePosition(
                                                    event,
                                                    "bottom-right"
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <p className="mt-5 mb-1">Text Color</p>
                                <div className="flex">
                                    <div className="my-3 flex-1 mr-3">
                                        <div className="relative w-full">
                                            <div
                                                className="pr-5"
                                                style={{
                                                    position: "absolute",
                                                    left: "5px",
                                                    bottom: "5px",
                                                    zIndex: "99",
                                                }}
                                            >
                                                <Popover
                                                    active={backgroundColorPickerActive}
                                                    activator={<ToggleColorActivator toggleColorFunction={() => toggleBackgroundColorPicker()} color={backgroundHexColor}/>}
                                                    onClose={() =>toggleBackgroundColorPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleBackgroundColorChange(e)}
                                                            color={backgroundColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    type="text"
                                                    autoComplete="off"
                                                    label="Background Color"
                                                    value={backgroundHexColor}
                                                    onChange={handleBackgroundColorChangeFromInput}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-3 flex-1">
                                        <div className="relative w-full">
                                            <div
                                                className="pr-5"
                                                style={{
                                                    position: "absolute",
                                                    left: "5px",
                                                    bottom: "5px",
                                                    zIndex: "99",
                                                }}
                                            >
                                                <Popover
                                                    active={badgeTextColorPickerActive}
                                                    activator={<ToggleColorActivator toggleColorFunction={() => toggleBadgeTextColorPicker()} color={badgeTextHexColor}/>}
                                                    onClose={() => toggleBadgeTextColorPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleBadgeTextColorChange(e)}
                                                            color={badgeTextColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Badge Text Color"
                                                    value={badgeTextHexColor}
                                                    onChange={handleBadgeTextColorChangeFromInput}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <div className="py-2">
                                        <Text>Font Size</Text>
                                    </div>
                                    <RangeSlider
                                        value={buttonFontSizeValue}
                                        onChange={changeButtonFontSize}
                                        output
                                    />
                                    <div className="mt-1">
                                        <Banner>You will not show any effect of Font Size.</Banner>
                                    </div>
                                </div>
                                </Card>
                            </BlockStack>
                        </div>
                        <div className="flex-1">
                            <div>
                                <div className="flex">
                                    <div
                                        className="box w-full"
                                        style={{
                                        backgroundImage: `url('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center center', // Center the background image
                                        }}
                                    >
                                        {ribbonBadgePosition === "top-left" && (
                                        <div className="ribbon ribbon-top-left">
                                            <span 
                                                style={{ 
                                                    color: `${badgeTextHexColor}`, 
                                                    fontSize: `${buttonFontSizeValue}px`,
                                                    backgroundColor: `${backgroundHexColor}`
                                                }}
                                            >
                                                {ribbonBadgeText}
                                            </span>
                                        </div>
                                        )}
                                        {ribbonBadgePosition === "top-right" && (
                                        <div className="ribbon ribbon-top-right">
                                            <span 
                                                style={{ 
                                                    color: `${badgeTextHexColor}`, 
                                                    fontSize: `${buttonFontSizeValue}px`,
                                                    left: `${ribbonRightLeftValue}px`,
                                                    backgroundColor: `${backgroundHexColor}`
                                                }}
                                            >
                                                {ribbonBadgeText}
                                            </span>
                                        </div>
                                        )}
                                        {ribbonBadgePosition === "bottom-left" && (
                                        <div className="ribbon ribbon-bottom-left">
                                            <span 
                                                style={{ 
                                                    color: `${badgeTextHexColor}`,
                                                    fontSize: `${buttonFontSizeValue}px`,
                                                    backgroundColor: `${backgroundHexColor}`
                                                }}
                                            >
                                                {ribbonBadgeText}
                                            </span>
                                        </div>
                                        )}
                                        {ribbonBadgePosition === "bottom-right" && (
                                        <div className="ribbon ribbon-bottom-right">
                                            <span 
                                                style={{ 
                                                    color: `${badgeTextHexColor}`,
                                                    fontSize: `${buttonFontSizeValue}px`,
                                                    backgroundColor: `${backgroundHexColor}`
                                                }}
                                            >
                                                {ribbonBadgeText}
                                            </span>
                                        </div>
                                        )}
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
                </Page>
            </div>
        </>
    );
}
