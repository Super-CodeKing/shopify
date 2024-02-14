import {
    BlockStack,
    Button,
    Card,
    Divider,
    Checkbox,
    TextField,
    Text,
    Toast,
    Frame,
    Page,
    ColorPicker,
    RangeSlider,
    Popover,
    hsbToHex,
    hexToRgb,
    rgbToHsb,
    Banner
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks";
import "../../assets/preorder.css";
import ToggleColorActivator from "../../components/ToggleColorActivator";
import SkeletonBodyWithDisplay from "./Skeleton/SkeletonBodyWithDisplay";
export default function ColorNText() {
    const fetch = useAuthenticatedFetch();
    const [toastActive, setToastActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const [backgroundColor, setBackgroundColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [backgroundHexColor, setBackgroundHexColor] = useState("#121212");
    const [backgroundHoverColor, setBackgroundHoverColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [backgroundHoverHexColor, setBackgroundHoverHexColor] = useState("#121212");
    const [textColor, setTextColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [textHexColor, setTextHexColor] = useState("#fff");
    const [textHoverColor, setTextHoverColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [textHoverHexColor, setTextHoverHexColor] = useState("#fff");
    const [borderColor, setBorderColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [borderHexColor, setBorderHexColor] = useState("#fff");
    const [borderHoverColor, setBorderHoverColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [borderHoverHexColor, setBorderHoverHexColor] = useState("#fff");
    const [buttonHeight, setButtonHeight] = useState(40);
    const [buttonWidth, setButtonWidth] = useState(420);
    const [buttonRadiusValue, setButtonRadiusValue] = useState(32);
    const [isInheritFromTheme, setIsInheritFromTheme] = useState(true);
    const [preOrderButtonText, setPreOrderButtonText] = useState("Pre Order");
    const [buttonFontSizeValue, setButtonFontSizeValue] = useState(16);
    const [backgroundColorPickerActive, setBackgroundColorPickerActive] = useState(false);
    const [backgroundHoverColorPickerActive, setBackgroundHoverColorPickerActive] = useState(false);
    const [textColorPickerActive, setTextColorPickerActive] = useState(false);
    const [textHoverColorPickerActive, setTextHoverColorPickerActive] = useState(false);
    const [borderColorPickerActive, setBorderColorPickerActive] = useState(false);
    const [borderHoverColorPickerActive, setBorderHoverColorPickerActive] = useState(false);
    const [borderWidth, setBorderWidth] = useState(0);
    const [isHover, setIsHover] = useState(false);

    const changeButtonRadius = (value) => setButtonRadiusValue(value);
    const changeButtonFontSize = (value) => setButtonFontSizeValue(value);
    const changeBorderWidth = (value) => setBorderWidth(value);

    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        []
    );

    const toggleBackgroundColorPicker = () => {
        setBackgroundColorPickerActive(!backgroundColorPickerActive);
    };

    function HexToHsb(color) {
        const rgbColor = hexToRgb(color);
        const hsbColor = rgbToHsb(rgbColor);
        return hsbColor
    }

    const handleBackgroundColorChange = (newColor) => {
        const hexColor = hsbToHex(newColor);
        setBackgroundColor(newColor);
        setBackgroundHexColor(hexColor);
    };

    const handleTextColorChange = (newTextColor) => {
        const hexColor = hsbToHex(newTextColor);
        setTextColor(newTextColor);
        setTextHexColor(hexColor);
    }

    const handleTextHoverColorChange = (newTextHoverColor) => {
        const hexColor = hsbToHex(newTextHoverColor);
        setTextHoverColor(newTextHoverColor);
        setTextHoverHexColor(hexColor);
    }

    const handleBorderColorChange = (newBorderColor) => {
        const hexColor = hsbToHex(newBorderColor);
        setBorderColor(newBorderColor);
        setBorderHexColor(hexColor);
    }

    const handleBorderHoverColorChange = (newBorderHoverColor) => {
        const hexColor = hsbToHex(newBorderHoverColor);
        setBorderHoverColor(newBorderHoverColor);
        setBorderHoverHexColor(hexColor);
    }

    const toggleBackgroundHoverColorPicker = () => {
        setBackgroundHoverColorPickerActive(!backgroundHoverColorPickerActive);
    };

    const toggleTextColorPicker = () => {
        setTextColorPickerActive(!textColorPickerActive);
    }

    const toggleTextHoverColorPicker = () => {
        setTextHoverColorPickerActive(!textHoverColorPickerActive);
    }

    const toggleBorderColorPicker = () => {
        setBorderColorPickerActive(!borderColorPickerActive);
    }

    const toggleBorderHoverColorPicker = () => {
        setBorderHoverColorPickerActive(!borderHoverColorPickerActive);
    }

    const handleBackgroundHoverColorChange = (newColor) => {
        const hexColor = hsbToHex(newColor);
        setBackgroundHoverHexColor(hexColor);
        setBackgroundHoverColor(newColor);
    };

    const handleBackgroundHoverColorChangeFromInput = (newColor) => {
        const rgbColor = hexToRgb(newColor);
        const hsbColor = rgbToHsb(rgbColor);
        setBackgroundHoverHexColor(newColor)
        setBackgroundHoverColor(hsbColor);
    };

    const handleBackgroundColorChangeFromInput = (newColor) => {
        const rgbColor = hexToRgb(newColor);
        const hsbColor = rgbToHsb(rgbColor);
        setBackgroundHexColor(newColor)
        setBackgroundColor(hsbColor);
    };

    const handleTextColorChangeFormInput = (newHexColor) => {
        const rgbColor = hexToRgb(newHexColor);
        const hsbColor = rgbToHsb(rgbColor);
        setTextHexColor(newHexColor)
        setTextColor(hsbColor);
    }

    const handleTextHoverColorChangeFormInput = (newTextHexColor) => {
        const rgbColor = hexToRgb(newTextHexColor);
        const hsbColor = rgbToHsb(rgbColor);
        setTextHoverHexColor(newTextHexColor)
        setTextHoverColor(hsbColor);
    }

    const handleBorderColorChangeFormInput = (newBorderHexColor) => {
        const rgbColor = hexToRgb(newBorderHexColor);
        const hsbColor = rgbToHsb(rgbColor);
        setBorderHexColor(newBorderHexColor)
        setBorderColor(hsbColor);
    }

    const handleBorderHoverColorChangeFormInput = (newBorderHoverHexColor) => {
        const rgbColor = hexToRgb(newBorderHoverHexColor);
        const hsbColor = rgbToHsb(rgbColor);
        setBorderHoverHexColor(newBorderHoverHexColor)
        setBorderHoverColor(hsbColor);
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    function makeColorNTextSettings() {
        return JSON.stringify({
            'button_text' : preOrderButtonText,
            'button_bg_color': backgroundHexColor,
            'button_bg_hover_color': backgroundHoverHexColor,
            'button_text_color': textHexColor,
            'button_text_hover_color': textHoverHexColor,
            'button_border_hex_color': borderHexColor,
            'button_border_hover_hex_color': borderHoverHexColor,
            'button_border_width': borderWidth,
            'button_height': buttonHeight,
            'button_width': buttonWidth,
            'button_border_radius': buttonRadiusValue,
            'button_font_size': buttonFontSizeValue
        })
    }

    function setColorNTextSettings(settings) {
        setPreOrderButtonText(settings.button_text);

        setBackgroundHexColor(settings.button_bg_color);
        setBackgroundColor(HexToHsb(settings.button_bg_color));
        setBackgroundHoverHexColor(settings.button_bg_hover_color);
        setBackgroundHoverColor(HexToHsb(settings.button_bg_color));

        setTextColor(HexToHsb(settings.button_bg_color));
        setTextHexColor(settings.button_text_color);
        setTextHoverHexColor(settings.button_text_hover_color);
        setTextHoverColor(HexToHsb(settings.button_bg_color));

        setBorderColor(HexToHsb(settings.button_border_hex_color));
        setBorderHexColor(settings.button_border_hex_color);
        setBorderHoverHexColor(settings.button_border_hover_hex_color);
        setBorderHoverColor(HexToHsb(settings.button_border_hover_hex_color));

        setBorderWidth(settings.button_border_width);
        setButtonHeight(settings.button_height);
        setButtonWidth(settings.button_width);
        setButtonRadiusValue(settings.button_border_radius);
        setButtonFontSizeValue(settings.button_font_size);
    }

    const toastMarkup = toastActive ? (
        <Toast
            content="Button Text and Color Settings Saved Successfully!"
            onDismiss={toggleToastActive}
        />
    ) : null;

    const getPreOrderButtonSettings = async () => {
        const response = await fetch("/api/preorder/colorntext");
        if (response.ok) {
            const preOrderButtonSettings = await response.json();
            if(preOrderButtonSettings && preOrderButtonSettings['settings'] == null) {
                setIsInheritFromTheme(true);
            } else if(preOrderButtonSettings.settings) {
                const settings = JSON.parse(preOrderButtonSettings.settings);
                setIsInheritFromTheme(preOrderButtonSettings.inherit_from_theme)
                setColorNTextSettings(settings);
            }
            setLoading(false)
        } else {
            setLoading(false);
            console.log("Error in Activaing Pre Order: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    }

    const savePreOrderButtonNTextColor = async () => {
        let colorNTextSettings = makeColorNTextSettings();

        console.log("Settings: ", colorNTextSettings);
        const formData = new FormData();
        formData.append("inherit_from_theme", isInheritFromTheme);
        formData.append("settings", colorNTextSettings);

        const response = await fetch("/api/preorder/colorntext", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            toggleToastActive(true);
        }
    };

    useEffect(() => {
        setLoading(true);
        getPreOrderButtonSettings();
    }, []);

    return (
        <div  className="color-n-text [&>div>div]:pt-0">
            {loading === true && <SkeletonBodyWithDisplay title="Color Settings"/>}
            {loading === false && <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Button Settings
                    </Text>
                    <Divider borderColor="border" />
                </BlockStack>
                
                 <div className="mt-5">
                    <div className="flex">
                        <div className="flex-1 mr-5">
                            <div className="mb-3">
                                <Card>
                                    <Checkbox
                                        label="Inherit Design from Theme"
                                        checked={isInheritFromTheme}
                                        onChange={() =>
                                            setIsInheritFromTheme(
                                                !isInheritFromTheme
                                            )
                                        }
                                    />
                                    <div className="mt-1">
                                        <Banner>
                                            <p>
                                                If inherit from theme is activated, then others design settings will not work.
                                            </p>
                                        </Banner>
                                    </div>
                                </Card>
                            </div>
                            <Card>
                                <TextField
                                    label="Button Text"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Pre Order"
                                    value={preOrderButtonText}
                                    onChange={(e) => setPreOrderButtonText(e)}
                                />

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
                                                    active={backgroundHoverColorPickerActive}
                                                    activator={<ToggleColorActivator toggleColorFunction={() => toggleBackgroundHoverColorPicker()} color={backgroundHoverHexColor}/>}
                                                    onClose={() => toggleBackgroundHoverColorPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleBackgroundHoverColorChange(e)}
                                                            color={backgroundHoverColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Background Hover Color"
                                                    value={backgroundHoverHexColor}
                                                    onChange={handleBackgroundHoverColorChangeFromInput}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-1 mr-3 mb-3">
                                        <div className="relative w-full">
                                            <div className="pr-5"
                                                style={{
                                                    position: "absolute",
                                                    left: "5px",
                                                    bottom: "5px",
                                                    zIndex: "99",
                                                }}
                                            >
                                                <Popover
                                                    active={textColorPickerActive}
                                                    activator={<ToggleColorActivator toggleColorFunction={() => toggleTextColorPicker()} color={textHexColor}/>}
                                                    onClose={() => toggleTextColorPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleTextColorChange(e)}
                                                            color={textColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Text Color"
                                                    autoComplete="off"
                                                    value={textHexColor}
                                                    onChange={handleTextColorChangeFormInput}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 mb-3">
                                        <div className="relative w-full">
                                            <div className="pr-5"
                                                style={{
                                                    position: "absolute",
                                                    left: "5px",
                                                    bottom: "5px",
                                                    zIndex: "99",
                                                }}
                                            >
                                                <Popover
                                                    active={textHoverColorPickerActive}
                                                    activator={<ToggleColorActivator toggleColorFunction={() => toggleTextHoverColorPicker()} color={textHoverHexColor}/>}
                                                    onClose={() => toggleTextHoverColorPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleTextHoverColorChange(e)}
                                                            color={textHoverColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Text Hover Color"
                                                    autoComplete="off"
                                                    value={textHoverHexColor}
                                                    onChange={handleTextHoverColorChangeFormInput}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-1 mr-3">
                                        <div className="relative w-full">
                                            <div className="pr-5"
                                                style={{
                                                    position: "absolute",
                                                    left: "5px",
                                                    bottom: "5px",
                                                    zIndex: "99",
                                                }}
                                            >
                                                <Popover
                                                    active={borderColorPickerActive}
                                                    activator={<ToggleColorActivator toggleColorFunction={() => toggleBorderColorPicker()} color={borderHexColor}/>}
                                                    onClose={() => toggleBorderColorPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleBorderColorChange(e)}
                                                            color={borderColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Border Color"
                                                    autoComplete="off"
                                                    value={borderHexColor}
                                                    onChange={handleBorderColorChangeFormInput}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="relative w-full">
                                            <div className="pr-5"
                                                style={{
                                                    position: "absolute",
                                                    left: "5px",
                                                    bottom: "5px",
                                                    zIndex: "99",
                                                }}
                                            >
                                                <Popover
                                                    active={borderHoverColorPickerActive}
                                                    activator={<ToggleColorActivator toggleColorFunction={() => toggleBorderHoverColorPicker()} color={borderHoverHexColor}/>}
                                                    onClose={() => toggleBorderHoverColorPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleBorderHoverColorChange(e)}
                                                            color={borderHoverColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Border Hover Color"
                                                    autoComplete="off"
                                                    value={borderHoverHexColor}
                                                    onChange={handleBorderHoverColorChangeFormInput}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-full mr-3">
                                        <div className="py-2">
                                            <Text>Border Width</Text>
                                        </div>
                                        <RangeSlider
                                            value={borderWidth}
                                            onChange={changeBorderWidth}
                                            output
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-1 mr-3">
                                        <TextField
                                            label="Button Height"
                                            type="number"
                                            autoComplete="off"
                                            suffix="px"
                                            value={buttonHeight}
                                            onChange={(e) => setButtonHeight(e)}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <TextField
                                            label="Button Width"
                                            type="number"
                                            autoComplete="off"
                                            suffix="px"
                                            value={buttonWidth}
                                            onChange={(e) => setButtonWidth(e)}
                                        />
                                    </div>
                                </div>



                                <div className="flex">
                                    <div className="w-full mr-3">
                                        <div className="py-2">
                                            <Text>Button Radius</Text>
                                        </div>
                                        <RangeSlider
                                            value={buttonRadiusValue}
                                            onChange={changeButtonRadius}
                                            output
                                        />
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
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="flex-1">
                            <div className="border-dashed border-2 border-indigo-600 h-full flex items-center justify-center rounded-md">
                                <button className={`text-white font-bold py-2 px-4 rounded flex items-center justify-center`} style={{ 
                                    backgroundColor: isHover? backgroundHoverHexColor : backgroundHexColor,
                                    height: buttonHeight + 'px',
                                    width: buttonWidth + 'px',
                                    fontSize: buttonFontSizeValue + 'px',
                                    borderRadius: buttonRadiusValue + 'px',
                                    color: isHover? textHoverHexColor: textHexColor,
                                    borderColor: isHover ? borderHoverHexColor: borderHexColor,
                                    borderWidth: borderWidth + 'px'
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                >
                                    {preOrderButtonText}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Button
                            variant="primary"
                            size="large"
                            onClick={() => savePreOrderButtonNTextColor()}
                        >
                            Save
                        </Button>
                    </div>

                    <Frame>{toastMarkup}</Frame>
                </div>
            </Page>}
        </div>
    );
}
