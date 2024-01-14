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
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../hooks";
import "../../assets/preorder.css";
import ToggleColourActivator from "../../components/ToggleColourActivator";
export default function ColourNText() {
    const [toastActive, setToastActive] = useState(false);
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
    const [textColour, setTextColour] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [textHexColour, setTextHexColour] = useState("#fff");
    const [textHoverColour, setTextHoverColour] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [textHoverHexColour, setTextHoverHexColour] = useState("#fff");
    const [borderColour, setBorderColour] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [borderHexColour, setBorderHexColour] = useState("#fff");
    const [borderHoverColour, setBorderHoverColour] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [borderHoverHexColour, setBorderHoverHexColour] = useState("#fff");
    const [buttonHeight, setButtonHeight] = useState(40);
    const [buttonWidth, setButtonWidth] = useState(420);
    const [buttonRadiusValue, setButtonRadiusValue] = useState(32);
    const [isInheritFromTheme, setIsInheritFromTheme] = useState(true);
    const [preOrderButtonText, setPreOrderButtonText] = useState("Pre Order");
    const [buttonFontSizeValue, setButtonFontSizeValue] = useState(16);
    const [backgroundColorPickerActive, setBackgroundColorPickerActive] = useState(false);
    const [backgroundHoverColorPickerActive, setBackgroundHoverColorPickerActive] = useState(false);
    const [textColourPickerActive, setTextColourPickerActive] = useState(false);
    const [textHoverColourPickerActive, setTextHoverColourPickerActive] = useState(false);
    const [borderColourPickerActive, setBorderColourPickerActive] = useState(false);
    const [borderHoverColourPickerActive, setBorderHoverColourPickerActive] = useState(false);
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

    const handleBackgroundColorChange = (newColor) => {
        const hexColor = hsbToHex(newColor);
        setBackgroundColor(newColor);
        setBackgroundHexColor(hexColor);
    };

    const handleTextColourChange = (newTextColour) => {
        const hexColour = hsbToHex(newTextColour);
        setTextColour(newTextColour);
        setTextHexColour(hexColour);
    }

    const handleTextHoverColourChange = (newTextHoverColour) => {
        const hexColour = hsbToHex(newTextHoverColour);
        setTextHoverColour(newTextHoverColour);
        setTextHoverHexColour(hexColour);
    }

    const handleBorderColourChange = (newBorderColour) => {
        const hexColour = hsbToHex(newBorderColour);
        setBorderColour(newBorderColour);
        setBorderHexColour(hexColour);
    }

    const handleBorderHoverColourChange = (newBorderHoverColour) => {
        const hexColour = hsbToHex(newBorderHoverColour);
        setBorderHoverColour(newBorderHoverColour);
        setBorderHoverHexColour(hexColour);
    }

    const toggleBackgroundHoverColorPicker = () => {
        setBackgroundHoverColorPickerActive(!backgroundHoverColorPickerActive);
    };

    const toggleTextColourPicker = () => {
        setTextColourPickerActive(!textColourPickerActive);
    }

    const toggleTextHoverColourPicker = () => {
        setTextHoverColourPickerActive(!textHoverColourPickerActive);
    }

    const toggleBorderColourPicker = () => {
        setBorderColourPickerActive(!borderColourPickerActive);
    }

    const toggleBorderHoverColourPicker = () => {
        setBorderHoverColourPickerActive(!borderHoverColourPickerActive);
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

    const handleTextColourChangeFormInput = (newHexColour) => {
        const rgbColor = hexToRgb(newHexColour);
        const hsbColor = rgbToHsb(rgbColor);
        setTextHexColour(newHexColour)
        setTextColour(hsbColor);
    }

    const handleTextHoverColourChangeFormInput = (newTextHexColour) => {
        const rgbColor = hexToRgb(newTextHexColour);
        const hsbColor = rgbToHsb(rgbColor);
        setTextHoverHexColour(newTextHexColour)
        setTextHoverColour(hsbColor);
    }

    const handleBorderColourChangeFormInput = (newBorderHexColour) => {
        const rgbColor = hexToRgb(newBorderHexColour);
        const hsbColor = rgbToHsb(rgbColor);
        setBorderHexColour(newBorderHexColour)
        setBorderColour(hsbColor);
    }

    const handleBorderHoverColourChangeFormInput = (newBorderHoverHexColour) => {
        const rgbColor = hexToRgb(newBorderHoverHexColour);
        const hsbColor = rgbToHsb(rgbColor);
        setBorderHoverHexColour(newBorderHoverHexColour)
        setBorderHoverColour(hsbColor);
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    const toastMarkup = toastActive ? (
        <Toast
            content="Button Text and Colour Settings Saved Successfully!"
            onDismiss={toggleToastActive}
        />
    ) : null;

    const savePreOrderButtonNTextColout = () => {
        console.log("Saving...............");
    };

    return (
        <>
            <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Button Settings
                    </Text>
                    <Divider borderColor="border" />
                </BlockStack>
                <div className="mt-3">
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
                                                    activator={<ToggleColourActivator toggleColourFunction={() => toggleBackgroundColorPicker()} color={backgroundHexColor}/>}
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
                                                    activator={<ToggleColourActivator toggleColourFunction={() => toggleBackgroundHoverColorPicker()} color={backgroundHoverHexColor}/>}
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
                                                    active={textColourPickerActive}
                                                    activator={<ToggleColourActivator toggleColourFunction={() => toggleTextColourPicker()} color={textHexColour}/>}
                                                    onClose={() => toggleTextColourPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleTextColourChange(e)}
                                                            color={textColour}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Text Color"
                                                    autoComplete="off"
                                                    value={textHexColour}
                                                    onChange={handleTextColourChangeFormInput}
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
                                                    active={textHoverColourPickerActive}
                                                    activator={<ToggleColourActivator toggleColourFunction={() => toggleTextHoverColourPicker()} color={textHoverHexColour}/>}
                                                    onClose={() => toggleTextHoverColourPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleTextHoverColourChange(e)}
                                                            color={textHoverColour}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Text Hover Color"
                                                    autoComplete="off"
                                                    value={textHoverHexColour}
                                                    onChange={handleTextHoverColourChangeFormInput}
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
                                                    active={borderColourPickerActive}
                                                    activator={<ToggleColourActivator toggleColourFunction={() => toggleBorderColourPicker()} color={borderHexColour}/>}
                                                    onClose={() => toggleBorderColourPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleBorderColourChange(e)}
                                                            color={borderColour}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Border Color"
                                                    autoComplete="off"
                                                    value={borderHexColour}
                                                    onChange={handleBorderColourChangeFormInput}
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
                                                    active={borderHoverColourPickerActive}
                                                    activator={<ToggleColourActivator toggleColourFunction={() => toggleBorderHoverColourPicker()} color={borderHoverHexColour}/>}
                                                    onClose={() => toggleBorderHoverColourPicker()}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={(e) => handleBorderHoverColourChange(e)}
                                                            color={borderHoverColour}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Border Hover Color"
                                                    autoComplete="off"
                                                    value={borderHoverHexColour}
                                                    onChange={handleBorderHoverColourChangeFormInput}
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
                                    color: isHover? textHoverHexColour: textHexColour,
                                    borderColor: isHover ? borderHoverHexColour: borderHexColour,
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
                            onClick={() => savePreOrderButtonNTextColout()}
                        >
                            Save
                        </Button>
                    </div>

                    <Frame>{toastMarkup}</Frame>
                </div>
            </Page>
        </>
    );
}
