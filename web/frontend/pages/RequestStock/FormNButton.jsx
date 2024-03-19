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
    Banner,
    ButtonGroup
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import "../../assets/preorder.css";
import ToggleColorActivator from "../../components/ToggleColorActivator";
import SkeletonBodyWithDisplay from "./Skeleton/SkeletonBodyWithDisplay";
import { useDispatch, useSelector } from "react-redux";
import { setButtonSettings, setInheritFromTheme, setFormSettings } from "../../store/reducers/RequestStock";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import ButtonSettings from "./ButtonSettings";

export default function FormAndButton() {
    
    const dispatch = useDispatch();
    const fetch = useAuthenticatedFetch();
    
    const buttonSettingsRedux = useSelector((state) => state.requeststock.buttonSettings);
    const formSettingsRedux = useSelector((state) => state.requeststock.formSettings);
    const inheritFromThemeRedux = useSelector((state) => state.requeststock.inheritFromTheme);

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
    const [requestStockButtonText, setRequestStockButtonText] = useState("Request for Stock");
    const [buttonFontSizeValue, setButtonFontSizeValue] = useState(16);
    const [backgroundColorPickerActive, setBackgroundColorPickerActive] = useState(false);
    const [backgroundHoverColorPickerActive, setBackgroundHoverColorPickerActive] = useState(false);
    const [textColorPickerActive, setTextColorPickerActive] = useState(false);
    const [textHoverColorPickerActive, setTextHoverColorPickerActive] = useState(false);
    const [borderColorPickerActive, setBorderColorPickerActive] = useState(false);
    const [borderHoverColorPickerActive, setBorderHoverColorPickerActive] = useState(false);
    const [borderWidth, setBorderWidth] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const [buttonOrFormActiveIndex, setButtonOrFormIndex] = useState(0);

    const changeButtonRadius = (value) => setButtonRadiusValue(value);
    const changeButtonFontSize = (value) => setButtonFontSizeValue(value);
    const changeBorderWidth = (value) => setBorderWidth(value);

    const changeButtonOrFormActiveIndex = useCallback(
        (index) => {
          if (buttonOrFormActiveIndex === index) return;
          setButtonOrFormIndex(index);
        },
        [buttonOrFormActiveIndex],
      );

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


    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    function makeColorNTextSettings() {
        return JSON.stringify({
            'button_text'                   : requestStockButtonText,
            'button_bg_color'               : backgroundHexColor,
            'button_bg_hover_color'         : backgroundHoverHexColor,
            'button_text_color'             : textHexColor,
            'button_text_hover_color'       : textHoverHexColor,
            'button_border_hex_color'       : borderHexColor,
            'button_border_hover_hex_color' : borderHoverHexColor,
            'button_border_width'           : borderWidth,
            'button_height'                 : buttonHeight,
            'button_width'                  : buttonWidth,
            'button_border_radius'          : buttonRadiusValue,
            'button_font_size'              : buttonFontSizeValue
        })
    }

    function setButtonColorNTextSettings(settings) {
        if(settings != null)
        {
            setRequestStockButtonText(settings.button_text);

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
    }

    function setFormColorNTextSettings(settings) {

    }

    const isDataChanged = useCallback(() => {
        let flagInheritFromTheme = false;
        let flagComingSoonButtonText = false;
        let flagBackgroundHexColor = false;
        let flagBackgroundHoverHexColor = false;
        let flagTextHexColor = false;
        let flagTextHoverHexColor = false;
        let flagBorderHexColor = false;
        let flagBorderHoverHexColor = false;
        let flagBorderWidth = false;
        let flagButtonHeight = false;
        let flagButtonWidth = false;
        let flagButtonRadiusValue = false;
        let flagButtonFontSizeValue = false;

        if(inheritFromThemeRedux !== isInheritFromTheme) {
            flagInheritFromTheme = true;
        }

        if (buttonSettingsRedux?.button_text !== requestStockButtonText) {
            flagComingSoonButtonText = true;
        }
        
        if (buttonSettingsRedux?.button_bg_color !== backgroundHexColor) {
            flagBackgroundHexColor = true;
        }
        
        if (buttonSettingsRedux?.button_bg_hover_color !== backgroundHoverHexColor) {
            flagBackgroundHoverHexColor = true;
        }
        
        if (buttonSettingsRedux?.button_border_hex_color !== borderHexColor) {
            flagBorderHexColor = true;
        }
        
        if (buttonSettingsRedux?.button_border_hover_hex_color !== borderHoverHexColor) {
            flagBorderHoverHexColor = true;
        }
        
        if (buttonSettingsRedux?.button_border_radius != buttonRadiusValue) {
            flagButtonRadiusValue = true;
        }
        
        if (buttonSettingsRedux?.button_border_width != borderWidth) {
            flagBorderWidth = true;
        }
        
        if (buttonSettingsRedux?.button_font_size != buttonFontSizeValue) {
            flagButtonFontSizeValue = true;
        }
        
        if (buttonSettingsRedux?.button_height != buttonHeight) {
            flagButtonHeight = true;
        }
        
        if (buttonSettingsRedux?.button_text_color !== textHexColor) {
            flagTextHexColor = true;
        }
        
        if (buttonSettingsRedux?.button_text_hover_color !== textHoverHexColor) {
            flagTextHoverHexColor = true;
        }
        
        if (buttonSettingsRedux?.button_width != buttonWidth) {
            flagButtonWidth = true;
        }

        if (
            flagComingSoonButtonText || 
            flagBackgroundHexColor || 
            flagBackgroundHoverHexColor || 
            flagTextHexColor || 
            flagTextHoverHexColor || 
            flagBorderHexColor || 
            flagBorderHoverHexColor || 
            flagBorderWidth || 
            flagButtonHeight || 
            flagButtonWidth || 
            flagButtonRadiusValue || 
            flagButtonFontSizeValue ||
            flagInheritFromTheme
        )  {
            return true;
        }
        return false;
    }, [
        requestStockButtonText, 
        backgroundHexColor, 
        backgroundHoverHexColor, 
        textHexColor, 
        textHoverHexColor, 
        borderHexColor, 
        borderHoverHexColor,
        borderWidth,
        buttonHeight,
        buttonWidth,
        buttonRadiusValue,
        buttonFontSizeValue,
        buttonSettingsRedux,
        isInheritFromTheme,
        inheritFromThemeRedux
    ]);


    const toastMarkup = toastActive ? (
        <Toast
            content="Button Text and Color Settings Saved Successfully!"
            onDismiss={toggleToastActive}
        />
    ) : null;

    const getRequestStockSettings = async () => {
        const response = await fetch("/api/request-stock/settings");
        if (response.ok) {
            const requestStockSettings = await response.json();
            
            const buttonSettings = requestStockSettings?.button === null ? null : JSON.parse(requestStockSettings?.button);
            const formSettings = requestStockSettings?.form === null ? null : JSON.parse(requestStockSettings?.form);
            
            dispatch(setButtonSettings(buttonSettings));
            dispatch(setFormSettings(formSettings));
            dispatch(setInheritFromTheme(requestStockSettings?.inherit_from_theme));
            
            setIsInheritFromTheme(requestStockSettings?.inherit_from_theme);
            setButtonColorNTextSettings(buttonSettings);
            setFormColorNTextSettings(formSettings);
            
            setLoading(false);
        } else {
            setLoading(false);
            console.log("Error in Activaing Request Stock: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    }

    const savePreOrderButtonNTextColor = async () => {
        setLoading(true);
        let colorNTextSettings = makeColorNTextSettings();
        const formData = new FormData();
        
        formData.append("inherit_from_theme", isInheritFromTheme);
        formData.append("settings", colorNTextSettings);

        const response = await fetch("/api/coming-soon/colorntext", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            setLoading(false);
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            toggleToastActive(true);
            getRequestStockSettings();
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        if(inheritFromThemeRedux === null && Object.keys(buttonSettingsRedux).length === 0) 
        {
            getRequestStockSettings();
        } 
        else if(inheritFromThemeRedux === true && Object.keys(buttonSettingsRedux).length === 0) 
        {
            getRequestStockSettings();
        }
        else 
        {
            setColorNTextSettings(buttonSettingsRedux);
            setIsInheritFromTheme(inheritFromThemeRedux);
            setLoading(false);
        }
    }, []);

    return (
        <div  className="color-n-text [&>div>div]:pt-0">
            {loading === true && <SkeletonBodyWithDisplay title="Color Settings"/>}
            {loading === false && <Page fullWidth>
                <BlockStack gap="500">
                    <Text variant="headingXl" as="h4">
                        Request Stock Form & Button Settings
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

                                <ButtonGroup variant="segmented" fullWidth>
                                    <Button
                                        pressed={buttonOrFormActiveIndex === 0}
                                        onClick={() => changeButtonOrFormActiveIndex(0)}
                                    >
                                        Button
                                    </Button>
                                    <Button
                                        pressed={buttonOrFormActiveIndex === 2}
                                        onClick={() => changeButtonOrFormActiveIndex(2)}
                                    >
                                        Form
                                    </Button>
                                </ButtonGroup>

                                <ButtonSettings
                                    requestStockButtonText={requestStockButtonText}
                                    setRequestStockButtonText={setRequestStockButtonText}
                                    backgroundHexColor={backgroundHexColor}
                                    setBackgroundHexColor={setBackgroundHexColor}
                                    backgroundHoverHexColor={backgroundHoverHexColor}
                                    setBackgroundHoverHexColor={setBackgroundHoverHexColor}
                                    textHexColor={textHexColor}
                                    setTextHexColor={setTextHexColor}
                                    textHoverHexColor={textHoverHexColor}
                                    setTextHoverHexColor={setTextHoverHexColor}
                                    borderHexColor={borderHexColor}
                                    setBorderHexColor={setBorderHexColor}
                                    borderHoverHexColor={borderHoverHexColor}
                                    setBorderHoverHexColor={setBorderHoverHexColor}
                                    borderWidth={borderWidth}
                                    setBorderWidth={setBorderWidth}
                                    buttonHeight={buttonHeight}
                                    setButtonHeight={setButtonHeight}
                                    buttonWidth={buttonWidth}
                                    setButtonWidth={setButtonWidth}
                                    buttonRadiusValue={buttonRadiusValue}
                                    setButtonRadiusValue={setButtonRadiusValue}
                                    buttonFontSizeValue={buttonFontSizeValue}
                                    setButtonFontSizeValue={setButtonFontSizeValue}
                                    handleBackgroundColorChange={handleBackgroundColorChange}
                                    handleBackgroundHoverColorChange={handleBackgroundHoverColorChange}
                                    handleTextColorChange={handleTextColorChange}
                                    handleTextHoverColorChange={handleTextHoverColorChange}
                                    handleBorderColorChange={handleBorderColorChange}
                                    handleBorderHoverColorChange={handleBorderHoverColorChange}
                                    changeBorderWidth={changeBorderWidth}
                                    changeButtonRadius={changeButtonRadius}
                                    changeButtonFontSize={changeButtonFontSize}
                                />
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
                                    {requestStockButtonText}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Button
                            variant="primary"
                            size="large"
                            disabled={!isDataChanged()}
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
