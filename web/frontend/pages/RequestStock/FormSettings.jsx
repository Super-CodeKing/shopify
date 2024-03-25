import { TextField, Button, Banner, Checkbox, Text, Card, Popover, ColorPicker, hsbToHex,
    hexToRgb,
    rgbToHsb, Frame, Toast } from "@shopify/polaris";
import ToggleColorActivator from "../../components/ToggleColorActivator";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import '../../assets/requested-stock.css';
import { setFormInheritFromTheme, setFormSettings } from "../../store/reducers/RequestStock";
import SkeletonBodyWithDisplay from "./Skeleton/SkeletonBodyWithDisplay";

export default function FormSettings({}) {
    const dispatch = useDispatch();
    const fetch = useAuthenticatedFetch();
    
    const formSettingsRedux = useSelector((state) => state.requeststock.formSettings);
    const formInheritFromThemeRedux = useSelector((state) => state.requeststock.formInheritFromTheme);

    const [isLoading, setIsLoading] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const [isInheritFromTheme, setIsInheritFromTheme] = useState(true);

    const [nameLabel, setNameLabel] = useState("Your Name");
    const [namePlaceholder, setNamePlaceholder] = useState("Mike Tyson");

    const [emailLabel, setEmailLabel] = useState("Your Email");
    const [emailPlaceholder, setEmailPlaceholder] = useState("email@example.com");

    const [activePhone, setActivePhone] = useState(true);
    const [phoneLabel, setPhoneLabel] = useState("Your Phone");
    const [phonePlaceholder, setPhonePlaceholder] = useState("+1-202-555-1234");

    const [quantityLabel, setQuantityLabel] = useState("Quantity");
    const [quantityPlaceholder, setQuantityPlaceholder] = useState(1);

    const [messageLabel, setMessageLabel] = useState("Your Message");
    const [messagePlaceholder, setMessagePlaceholder] = useState("Write Notes");

    const [submitButtonText, setSubmitButtonText] = useState("Submit Request");

    const [buttonBackgroundColor, setButtonBackgroundColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });

    const [buttonBackgroundHexColor, setButtonBackgroundHexColor] = useState("#121212");

    const [backgroundColorPickerActive, setBackgroundColorPickerActive] = useState(false);
    const toggleBackgroundColorPicker = () => {
        setBackgroundColorPickerActive(!backgroundColorPickerActive);
    };

    const handleBackgroundColorChange = (newColor) => {
        if(newColor)
        {
            const hexColor = hsbToHex(newColor);
            setButtonBackgroundColor(newColor);
            setButtonBackgroundHexColor(hexColor);
        }
    };

    const handleBackgroundColorChangeFromInput = (newColor) => {
        if(newColor)
        {
            const rgbColor = hexToRgb(newColor);
            const hsbColor = rgbToHsb(rgbColor);
            setButtonBackgroundHexColor(newColor)
            setButtonBackgroundColor(hsbColor);
        }
    };

    const [textColor, setTextColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });

    const [textHexColor, setTextHexColor] = useState("#fff");

    const [textColorPickerActive, setTextColorPickerActive] = useState(false);
    const toggleTextColorPicker = () => {
        setTextColorPickerActive(!backgroundColorPickerActive);
    };

    const handleTextColorChange = (newColor) => {
        if(newColor)
        {
            const hexColor = hsbToHex(newColor);
            setTextColor(newColor);
            setTextHexColor(hexColor);
        }
    };

    const handleTextColorChangeFromInput = (newColor) => {
        if(newColor)
        {
            const rgbColor = hexToRgb(newColor);
            const hsbColor = rgbToHsb(rgbColor);
            setTextHexColor(newColor)
            setTextColor(hsbColor);
        }
    };

    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        []
    );

    const isDataChanged = useCallback(() => {
        if(formInheritFromThemeRedux != isInheritFromTheme) return true;
        if(formSettingsRedux?.nameLabel != nameLabel) return true;
        if(formSettingsRedux?.namePlaceholder != namePlaceholder) return true;
        if(formSettingsRedux?.emailLabel != emailLabel) return true;
        if(formSettingsRedux?.emailPlaceholder != emailPlaceholder) return true;
        if(formSettingsRedux?.phoneLabel != phoneLabel) return true;
        if(formSettingsRedux?.phonePlaceholder != phonePlaceholder) return true;
        if(formSettingsRedux?.quantityLabel != quantityLabel) return true;
        if(formSettingsRedux?.quantityPlaceholder != quantityPlaceholder) return true;
        if(formSettingsRedux?.messageLabel != messageLabel) return true;
        if(formSettingsRedux?.messagePlaceholder != messagePlaceholder) return true;
        if(formSettingsRedux?.submitButtonText != submitButtonText) return true;
        if(formSettingsRedux?.submitButtonBgColor != buttonBackgroundHexColor) return true;
        if(formSettingsRedux?.submitButtonTextColor != textHexColor) return true;
        return false
    }, [formInheritFromThemeRedux, formSettingsRedux, nameLabel, namePlaceholder, emailLabel, emailPlaceholder, phoneLabel, phonePlaceholder,
    quantityLabel, quantityPlaceholder, messageLabel, messagePlaceholder, submitButtonText, buttonBackgroundHexColor, textColor])

    const toastMarkup = toastActive ? (
        <Toast
            content="Button Text and Color Settings Saved Successfully!"
            onDismiss={toggleToastActive}
        />
    ) : null;

    const setFormSettingsState = (settings) => {
        if(settings !== null && settings !== 'undefined' && Object.keys(settings).length !== 0)
        {
            setNameLabel(settings?.nameLabel);
            setNamePlaceholder(settings?.namePlaceholder);
            setEmailLabel(settings?.emailLabel);
            setEmailPlaceholder(settings?.emailPlaceholder);
            setPhoneLabel(settings?.phoneLabel);
            setPhonePlaceholder(settings?.phonePlaceholder);
            setQuantityLabel(settings?.quantityLabel);
            setQuantityPlaceholder(settings?.quantityPlaceholder);
            setMessageLabel(settings?.messageLabel);
            setMessagePlaceholder(settings?.messagePlaceholder);
            setSubmitButtonText(settings?.submitButtonText);
            handleBackgroundColorChangeFromInput(settings?.submitButtonBgColor);
            handleTextColorChangeFromInput(settings?.submitButtonTextColor);
        }
    }

    const getRequestStockFormSettings = async () => {
        const response = await fetch("/api/request-stock/settings");
        if (response.ok) {
            const requestStockFormSettings = await response.json();
            
            dispatch(setFormSettings(JSON.parse(requestStockFormSettings?.form)));
            dispatch(setFormInheritFromTheme(requestStockFormSettings?.form_inherit_from_theme));

            setIsInheritFromTheme(requestStockFormSettings?.form_inherit_from_theme);
            setFormSettingsState(JSON.parse(requestStockFormSettings?.form));

            setIsLoading(false);
        } else {
            setIsLoading(false);
            console.log("Error in Activaing Pre Order: ", response);
            throw new Error(`HTTP error ${response.status}`);
        }
    }

    const saveRequestStockFormSettings = async () => {
        const formSettingsData = JSON.stringify({
            'nameLabel': nameLabel,
            'namePlaceholder': namePlaceholder,
            'emailLabel': emailLabel,
            'emailPlaceholder': emailPlaceholder,
            'phoneLabel': phoneLabel,
            'phonePlaceholder': phonePlaceholder,
            'quantityLabel': quantityLabel,
            'quantityPlaceholder': quantityPlaceholder,
            'messageLabel': messageLabel,
            'messagePlaceholder': messagePlaceholder,
            'submitButtonText': submitButtonText,
            'submitButtonBgColor': buttonBackgroundHexColor,
            'submitButtonTextColor': textHexColor
        })

        const formData = new FormData();
        formData.append("form_inherit_from_theme", isInheritFromTheme);
        formData.append("form_settings", formSettingsData);

        const response = await fetch("/api/request-stock/form-settings", {
            method: "POST",
            body: formData ? formData : JSON.stringify(data),
        });

        if (!response.ok) {
            setIsLoading(false);
            throw new Error(`HTTP error ${response.status}`);
        }

        if (response.ok) {
            toggleToastActive(true);
            getRequestStockFormSettings();
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);

        if(formInheritFromThemeRedux === null && Object.keys(formSettingsRedux).length === 0)
        getRequestStockFormSettings();
        
        else if((formInheritFromThemeRedux === 1) && Object.keys(formSettingsRedux).length === 0)
        getRequestStockFormSettings();

        else 
        {
            console.log("Coming from Redux: ", formSettingsRedux);
            setFormSettingsState(formSettingsRedux);
            setIsInheritFromTheme(formInheritFromThemeRedux);
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {isLoading === true && <SkeletonBodyWithDisplay />}
            {isLoading === false && <div className="pt-3">
                <div className="flex">
                    <div className="flex-1 mr-5">
                        <div className="mb-3">
                            <Card>
                                <Checkbox
                                    label="Inherit Design from Theme"
                                    checked={isInheritFromTheme}
                                    onChange={() =>
                                        setIsInheritFromTheme(!isInheritFromTheme)
                                    }
                                />
                                <div className="mt-1">
                                    <Banner>
                                        <Text>
                                            If inherit from theme is activated, then others design settings will not work.
                                        </Text>
                                    </Banner>
                                </div>
                            </Card>

                            <div className="mt-5">
                                <Card>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <TextField
                                                label="Name Label"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Your Name"
                                                value={nameLabel}
                                                onChange={(e) => setNameLabel(e)}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <TextField
                                                label="Name Placeholder"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Mike Tyson"
                                                value={namePlaceholder}
                                                onChange={(e) => setNamePlaceholder(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex mt-5">
                                        <div className="flex-1">
                                            <TextField
                                                label="Email Label"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Your Email"
                                                value={emailLabel}
                                                onChange={(e) => setEmailLabel(e)}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <TextField
                                                label="Email Placeholder"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="email@example.com"
                                                value={emailPlaceholder}
                                                onChange={(e) => setEmailPlaceholder(e)}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>


                            <div className="mt-5">
                                <Card>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <TextField
                                                label="Phone Label"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Your Phone"
                                                value={phoneLabel}
                                                onChange={(e) => setPhoneLabel(e)}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <TextField
                                                label="Phone Placeholder"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="+1-202-555-1234"
                                                value={phonePlaceholder}
                                                onChange={(e) => setPhonePlaceholder(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex mt-5">
                                        <div className="flex-1">
                                            <TextField
                                                label="Quantity Label"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Product Quantity"
                                                value={quantityLabel}
                                                onChange={(e) => setQuantityLabel(e)}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <TextField
                                                label="Quantity Placeholder"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="1"
                                                value={quantityPlaceholder}
                                                onChange={(e) => setQuantityPlaceholder(e)}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="mt-5">
                                <Card>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <TextField
                                                label="Message Label"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Your Message"
                                                value={messageLabel}
                                                onChange={(e) => setMessageLabel(e)}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <TextField
                                                label="Message Placeholder"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Write Notes"
                                                value={messagePlaceholder}
                                                onChange={(e) => setMessagePlaceholder(e)}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="mt-5">
                                <Card>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <TextField
                                                label="Button Text"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Submit Request"
                                                value={submitButtonText}
                                                onChange={(e) => setSubmitButtonText(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex mt-5">
                                        <div className="mb-3 flex-1 mr-3">
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
                                                        activator={<ToggleColorActivator toggleColorFunction={() => toggleBackgroundColorPicker()} color={buttonBackgroundHexColor}/>}
                                                        onClose={() =>toggleBackgroundColorPicker()}
                                                    >
                                                        <Popover.Pane>
                                                            <ColorPicker
                                                                onChange={(e) => handleBackgroundColorChange(e)}
                                                                color={buttonBackgroundColor}
                                                            />
                                                        </Popover.Pane>
                                                    </Popover>
                                                </div>
                                                <div className="paddingLeftTextField">
                                                    <TextField
                                                        type="text"
                                                        autoComplete="off"
                                                        label="Background Color"
                                                        value={buttonBackgroundHexColor}
                                                        onChange={handleBackgroundColorChangeFromInput}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 flex-1">
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
                                                        value={textHexColor}
                                                        onChange={handleTextColorChangeFromInput}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="border-dashed border-2 border-indigo-600 h-full flex items-center justify-center rounded-md">
                            <form class="p-5 mx-auto">
                                <div className="flex">
                                    <div class="mb-5 flex-1 mr-3">
                                        <label 
                                            for="fullName" 
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >{ nameLabel }</label>
                                        <input 
                                            type="text" 
                                            id="fullName" 
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                            placeholder={namePlaceholder} 
                                            required 
                                        />
                                    </div>
                                    <div class="mb-5 flex-1">
                                        <label 
                                            for="email" 
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >{ emailLabel }</label>

                                        <input 
                                            type="email" 
                                            id="email" 
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                            placeholder={emailPlaceholder} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div class="mb-5 flex-1 mr-3">
                                        <label 
                                            for="phone" 
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >{phoneLabel}</label>
                                        <input 
                                            type="text" 
                                            id="phone" 
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                            placeholder={phonePlaceholder}
                                            required 
                                        />
                                    </div>
                                    <div class="mb-5 flex-1">
                                        <label 
                                            for="quantity" 
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >{quantityLabel}</label>
                                        <input 
                                            type="number" 
                                            id="quantity" 
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                            required 
                                            placeholder={quantityPlaceholder}
                                        />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label 
                                        for="message" 
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >{messageLabel}</label>
                                    <textarea 
                                        id="message" 
                                        rows="4" 
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder={messagePlaceholder}></textarea>
                                </div>

                                <div className="w-full flex">
                                    <button
                                        style={{
                                            backgroundColor: buttonBackgroundHexColor,
                                            color: textHexColor
                                        }}
                                        type="submit" 
                                        class="mx-auto focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >{submitButtonText}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-0">
                    <Button
                        variant="primary"
                        size="large"
                        disabled={!isDataChanged()}
                        onClick={() => saveRequestStockFormSettings()}
                    >
                        Save
                    </Button>
                </div>

                <Frame>{toastMarkup}</Frame>
            </div>}
        </>
    )
}