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
    const [textColor, setTextColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [buttonHeight, setButtonHeight] = useState(40);
    const [buttonWidth, setButtonWidth] = useState(420);
    const [buttonRadiusValue, setButtonRadiusValue] = useState(32);
    const [isInheritFromTheme, setIsInheritFromTheme] = useState(true);
    const [preOrderButtonText, setPreOrderButtonText] = useState("Pre Order");
    const [buttonFontSizeValue, setButtonFontSizeValue] = useState(16);
    const [backgroundColorPickerActive, setBackgroundColorPickerActive] = useState(false);
    const [backgroundHoverColorPickerActive, setBackgroundHoverColorPickerActive] = useState(false);

    const changeButtonRadius = (value) => setButtonRadiusValue(value);
    const changeButtonFontSize = (value) => setButtonFontSizeValue(value);
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

    const toggleBackgroundHoverColorPicker = () => {
        setBackgroundHoverColorPickerActive(!backgroundHoverColorPickerActive);
    };

    const handleBackgroundHoverColorChange = (newColor) => {
        const hexColor = hsbToHex(newColor);
        setBackgroundHoverHexColor(hexColor);
        setBackgroundHoverColor(newColor);
    };

    const handleBackgroundHoverColorChangeFromInput = (newColor) => {
        console.log(newColor);
        const rgbColor = hexToRgb(newColor);
        const hsbColor = rgbToHsb(rgbColor);
        console.log("HSB Color: ", hsbColor);
        setBackgroundHoverHexColor(newColor)
        setBackgroundHoverColor(hsbColor);
    };

    const handleBackgroundColorChangeFromInput = (newColor) => {
        const rgbColor = hexToRgb(newColor);
        const hsbColor = rgbToHsb(rgbColor);
        setBackgroundHexColor(newColor)
        setBackgroundColor(hsbColor);
    };

    const backgroundColorPickerActivator = (
        <div
            onClick={toggleBackgroundColorPicker}
            style={{
                backgroundColor: hsbToHex(backgroundColor) ?? "#F8F2F2",
                width: "22px",
                height: "22px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "5px",
            }}
        ></div>
    );

    const backgroundHoverColorPickerActivator = (
        <div
            onClick={toggleBackgroundHoverColorPicker}
            style={{
                backgroundColor: hsbToHex(backgroundHoverColor) ?? "#F8F2F2",
                width: "22px",
                height: "22px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "5px",
            }}
        ></div>
    );

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
                                                    activator={backgroundColorPickerActivator}
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
                                                    activator={backgroundHoverColorPickerActivator}
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

                                {/* <div className="flex">
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
                                                    active={colorPickerActive}
                                                    activator={colorPickerActivator}
                                                    onClose={toggleColorPicker}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={handleColorChange}
                                                            color={backgroundColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Text Color"
                                                    value={hsbToHex(backgroundColor)}
                                                    onChange={(e) => {
                                                        handleTextChange(e, "background");
                                                    }}
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
                                                    active={colorPickerActive}
                                                    activator={colorPickerActivator}
                                                    onClose={toggleColorPicker}
                                                >
                                                    <Popover.Pane>
                                                        <ColorPicker
                                                            onChange={handleColorChange}
                                                            color={backgroundColor}
                                                        />
                                                    </Popover.Pane>
                                                </Popover>
                                            </div>
                                            <div className="paddingLeftTextField">
                                                <TextField
                                                    label="Text Hover Color"
                                                    value={hsbToHex(backgroundColor)}
                                                    onChange={(e) => {
                                                        handleTextChange(e, "background");
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="flex">
                                    <div className="flex-1 mr-3">
                                        <TextField
                                            label="Button Height"
                                            type="number"
                                            autoComplete="off"
                                            suffix="px"
                                            value={buttonHeight}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <TextField
                                            label="Button Width"
                                            type="number"
                                            autoComplete="off"
                                            suffix="px"
                                            value={buttonWidth}
                                        />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <div className="py-2">
                                        <Text>Button Radius</Text>
                                    </div>
                                    <RangeSlider
                                        value={buttonRadiusValue}
                                        label="Value in pixel"
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
                                        label="Value in pixel"
                                        onChange={changeButtonFontSize}
                                        output
                                    />
                                </div>
                            </Card>
                        </div>
                        <div className="flex-1">
                            <div className="border-dashed border-2 border-indigo-600 h-full flex items-center justify-center rounded-md">
                                <button className={`text-white font-bold py-2 px-4 rounded flex items-center justify-center`} style={{ 
                                    backgroundColor: backgroundHexColor,
                                    height: buttonHeight + 'px',
                                    width: buttonWidth + 'px',
                                    fontSize: buttonFontSizeValue + 'px',
                                    borderRadius: buttonRadiusValue + 'px'
                                }}
                                onMouseEnter={() => setBackgroundHexColor(backgroundHoverHexColor)}
                                onMouseLeave={() => setBackgroundHexColor(backgroundHexColor)}
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
