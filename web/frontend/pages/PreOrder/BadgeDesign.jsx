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
    
    const [backgroundColorPickerActive, setBackgroundColorPickerActive] = useState(false);
    const [badgeTextColorPickerActive, setBackgroundHoverColorPickerActive] = useState(false);
    const [badgeCornerColorPickerActive, setBadgeCornerColorPickerActive] = useState(false);

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
    const [badgeFontSizeValue, setBadgeFontSizeValue] = useState(16);

    const toggleBackgroundColorPicker = () => {
        setBackgroundColorPickerActive(!backgroundColorPickerActive);
    };

    const toggleBadgeTextColorPicker = () => {
        setBackgroundHoverColorPickerActive(!badgeTextColorPickerActive);
    };

    const changeBadgeFontSize = (value) => setBadgeFontSizeValue(value);

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

    const toastMarkup = toastProps.content && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    );

    const savePreOrderBadgeDesign = async () => {
        const formData = new FormData();

        formData.append("text", ribbonBadgeText);
        formData.append("position", ribbonBadgePosition);
        formData.append("bg_color", backgroundHexColor);
        formData.append("text_color", badgeTextHexColor);
        formData.append("font_size", badgeFontSizeValue)

        const response = await fetch("/api/preorder/badge-design", {
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
                content: "Pre Order Badge Design Saved Successfully!"
            });
        }
    }

    const getPreOrderBadgeDesign = async () => {
        const response = await fetch("/api/preorder/badge-design");

        if (response.ok) {
            const preOrderBadgeDesign = await response.json();
            console.log("Badge Design: ", preOrderBadgeDesign);
            if(Object.keys(preOrderBadgeDesign).length !== 0) {
                setRibbonBadgeText(preOrderBadgeDesign.text);
                setRibbonBadgePosition(preOrderBadgeDesign.position);
                setBackgroundHexColor(preOrderBadgeDesign.bg_color);
                setBadgeTextHexColor(preOrderBadgeDesign.text_color);
                setBadgeFontSizeValue(preOrderBadgeDesign.font_size);
            } 
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        getPreOrderBadgeDesign();
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
                                        value={badgeFontSizeValue}
                                        onChange={changeBadgeFontSize}
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
                            <div className="h-full">
                                <div className="flex h-full">
                                    <div
                                        className="rounded-lg relative overflow-hidden h-full bg-white border w-full"
                                        style={{
                                        backgroundImage: `url('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center center', // Center the background image
                                        }}
                                    >
                                        {ribbonBadgePosition === "top-left" && (
                                        <div className="absolute left-0 top-0 h-16 w-16">
                                            <div
                                                style={{ 
                                                    color: `${badgeTextHexColor}`,
                                                    fontSize: `${badgeFontSizeValue}px`,
                                                    backgroundColor: `${backgroundHexColor}`
                                                }}
                                                class="absolute transform rotate-[-45deg] text-center font-semibold py-2 left-[-40px] top-[20px] w-[170px] shadow">
                                                <span 
                                                    style={{ 
                                                        color: `${badgeTextHexColor}`,
                                                        fontSize: `${badgeFontSizeValue}px`,
                                                    }}
                                                >
                                                    {ribbonBadgeText}
                                                </span>
                                            </div>
                                        </div>
                                        )}
                                        {ribbonBadgePosition === "top-right" && (
                                        <div class="absolute right-0 top-0 h-16 w-16">
                                            <div
                                                style={{ 
                                                    color: `${badgeTextHexColor}`,
                                                    fontSize: `${badgeFontSizeValue}px`,
                                                    backgroundColor: `${backgroundHexColor}`
                                                }}
                                                class="absolute transform rotate-45 text-center font-semibold py-2 right-[-40px] top-[20px] w-[170px] shadow">
                                                <span 
                                                    style={{ 
                                                        color: `${badgeTextHexColor}`,
                                                        fontSize: `${badgeFontSizeValue}px`,
                                                    }}
                                                >
                                                    {ribbonBadgeText}
                                                </span>
                                            </div>
                                        </div>
                                        )}
                                        {ribbonBadgePosition === "bottom-left" && (
                                        <div class="absolute left-0 bottom-0 h-28 w-28">
                                            <div
                                                style={{ 
                                                    color: `${badgeTextHexColor}`,
                                                    fontSize: `${badgeFontSizeValue}px`,
                                                    backgroundColor: `${backgroundHexColor}`
                                                }}
                                                class="absolute transform rotate-45 text-center font-semibold py-2 left-[-40px] top-[50px] w-[170px] shadow">
                                                <span 
                                                    style={{ 
                                                        color: `${badgeTextHexColor}`,
                                                        fontSize: `${badgeFontSizeValue}px`,
                                                    }}
                                                >
                                                    {ribbonBadgeText}
                                                </span>
                                            </div>
                                        </div>
                                        )}
                                        {ribbonBadgePosition === "bottom-right" && (
                                        <div class="absolute right-0 bottom-0 h-28 w-28">
                                            <div
                                                style={{ 
                                                    color: `${badgeTextHexColor}`,
                                                    fontSize: `${badgeFontSizeValue}px`,
                                                    backgroundColor: `${backgroundHexColor}`
                                                }}
                                                class="absolute transform rotate-[-45deg] text-center font-semibold py-2 right-[-40px] top-[50px] w-[170px] shadow">
                                                <span 
                                                    style={{ 
                                                        color: `${badgeTextHexColor}`,
                                                        fontSize: `${badgeFontSizeValue}px`,
                                                    }}
                                                >
                                                    {ribbonBadgeText}
                                                </span>
                                            </div>
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
                            onClick={() => savePreOrderBadgeDesign()}
                        >
                            Save
                        </Button>
                    </div>
                </Page>
            </div>
        </>
    );
}
