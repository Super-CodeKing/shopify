import { ColorPicker, Popover, RangeSlider, Text, TextField } from "@shopify/polaris";
import ToggleColorActivator from "../../components/ToggleColorActivator";
import { useState } from "react";

export default function ButtonSettings({
    requestStockButtonText,
    setRequestStockButtonText,
    backgroundHexColor,
    setBackgroundHexColor,
    backgroundHoverHexColor,
    setBackgroundHoverHexColor,
    textHexColor,
    setTextHexColor,
    textHoverHexColor,
    setTextHoverHexColor,
    borderHexColor,
    setBorderHexColor,
    borderHoverHexColor,
    setBorderHoverHexColor,
    borderWidth,
    setBorderWidth,
    buttonHeight,
    setButtonHeight,
    buttonWidth,
    setButtonWidth,
    buttonRadiusValue,
    setButtonRadiusValue,
    buttonFontSizeValue,
    setButtonFontSizeValue,
    handleBackgroundColorChange,
    handleBackgroundHoverColorChange,
    handleTextColorChange,
    handleTextHoverColorChange,
    handleBorderColorChange,
    handleBorderHoverColorChange,
    changeBorderWidth,
    changeButtonRadius,
    changeButtonFontSize,
}) {
    const [backgroundColorPickerActive, setBackgroundColorPickerActive] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [backgroundHoverColor, setBackgroundHoverColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [textColor, setTextColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [textHoverColor, setTextHoverColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [borderColor, setBorderColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [borderHoverColor, setBorderHoverColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });

    const [backgroundHoverColorPickerActive, setBackgroundHoverColorPickerActive] = useState(false);
    const [textColorPickerActive, setTextColorPickerActive] = useState(false);
    const [textHoverColorPickerActive, setTextHoverColorPickerActive] = useState(false);
    const [borderColorPickerActive, setBorderColorPickerActive] = useState(false);
    const [borderHoverColorPickerActive, setBorderHoverColorPickerActive] = useState(false);

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

    const handleBackgroundHoverColorChangeFromInput = (newColor) => {
        const rgbColor = hexToRgb(newColor);
        const hsbColor = rgbToHsb(rgbColor);
        setBackgroundHoverHexColor(newColor)
        setBackgroundHoverColor(hsbColor);
    };

    return (
        <div className="my-5">
            <TextField
                label="Button Text"
                type="text"
                autoComplete="off"
                placeholder="Request for Stock"
                value={requestStockButtonText}
                onChange={(e) => setRequestStockButtonText(e)}
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
        </div>
    )
}